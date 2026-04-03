/* global process */

import { Buffer } from 'node:buffer'
import crypto from 'node:crypto'

const REPORT_CACHE_TTL_MS = 6 * 60 * 60 * 1000
const REALTIME_CACHE_TTL_MS = 60 * 1000
const TOKEN_SKEW_MS = 60 * 1000
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token'
const GOOGLE_ANALYTICS_SCOPE = 'https://www.googleapis.com/auth/analytics.readonly'

function getCacheStore() {
	if (!globalThis.__analyticsStatsCache) {
		globalThis.__analyticsStatsCache = {
			report: { expiresAt: 0, payload: null },
			realtime: { expiresAt: 0, payload: null },
			token: { expiresAt: 0, value: null },
		}
	}

	return globalThis.__analyticsStatsCache
}

function setCachingHeaders(res) {
	res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
}

function normalizePrivateKey(value) {
	return value?.replace(/\\n/g, '\n').trim() || ''
}

function base64UrlEncode(value) {
	return Buffer.from(value)
		.toString('base64')
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=+$/g, '')
}

function createSignedJwt(email, privateKey) {
	const nowInSeconds = Math.floor(Date.now() / 1000)
	const header = {
		alg: 'RS256',
		typ: 'JWT',
	}
	const payload = {
		iss: email,
		scope: GOOGLE_ANALYTICS_SCOPE,
		aud: GOOGLE_TOKEN_URL,
		exp: nowInSeconds + 3600,
		iat: nowInSeconds,
	}

	const encodedHeader = base64UrlEncode(JSON.stringify(header))
	const encodedPayload = base64UrlEncode(JSON.stringify(payload))
	const unsignedToken = `${encodedHeader}.${encodedPayload}`
	const signature = crypto.createSign('RSA-SHA256').update(unsignedToken).end().sign(privateKey)

	return `${unsignedToken}.${base64UrlEncode(signature)}`
}

async function getAccessToken() {
	const email = process.env.GA_SERVICE_ACCOUNT_EMAIL?.trim()
	const privateKey = normalizePrivateKey(process.env.GA_SERVICE_ACCOUNT_PRIVATE_KEY)

	if (!email || !privateKey) {
		throw new Error('Missing GA service account credentials')
	}

	const cache = getCacheStore()
	if (cache.token.value && cache.token.expiresAt > Date.now()) {
		return cache.token.value
	}

	const assertion = createSignedJwt(email, privateKey)
	const response = await fetch(GOOGLE_TOKEN_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams({
			grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
			assertion,
		}),
	})

	const payload = await response.json()
	if (!response.ok || !payload.access_token) {
		throw new Error(payload.error_description || payload.error || 'Failed to get GA access token')
	}

	cache.token.value = payload.access_token
	cache.token.expiresAt = Date.now() + payload.expires_in * 1000 - TOKEN_SKEW_MS
	return payload.access_token
}

function buildFallbackPayload(reason, debug = null) {
	return {
		source: 'fallback',
		visits: null,
		uniqueVisitors: null,
		activeNow: null,
		updatedAt: new Date().toISOString(),
		reason,
		...(debug ? { debug } : {}),
	}
}

async function runAnalyticsRequest(path, body) {
	const propertyId = process.env.GA_PROPERTY_ID?.trim()
	if (!propertyId) {
		throw new Error('Missing GA property ID')
	}

	const accessToken = await getAccessToken()
	const response = await fetch(
		`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:${path}`,
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		},
	)

	const payload = await response.json()
	if (!response.ok) {
		throw new Error(payload.error?.message || `GA API request failed with ${response.status}`)
	}

	return payload
}

function readMetricValue(response, index = 0) {
	return Number(response?.rows?.[0]?.metricValues?.[index]?.value || 0)
}

async function fetchReportData() {
	const response = await runAnalyticsRequest('runReport', {
		dateRanges: [{ startDate: '2000-01-01', endDate: 'today' }],
		metrics: [{ name: 'sessions' }, { name: 'totalUsers' }],
	})

	return {
		visits: readMetricValue(response, 0),
		uniqueVisitors: readMetricValue(response, 1),
	}
}

async function fetchRealtimeData() {
	const response = await runAnalyticsRequest('runRealtimeReport', {
		metrics: [{ name: 'activeUsers' }],
	})

	return {
		activeNow: readMetricValue(response, 0),
	}
}

async function getStatsPayload() {
	const cache = getCacheStore()
	const now = Date.now()

	let reportData = cache.report.payload
	if (!reportData || cache.report.expiresAt <= now) {
		reportData = await fetchReportData()
		cache.report.payload = reportData
		cache.report.expiresAt = now + REPORT_CACHE_TTL_MS
	}

	let realtimeData = cache.realtime.payload
	if (!realtimeData || cache.realtime.expiresAt <= now) {
		realtimeData = await fetchRealtimeData()
		cache.realtime.payload = realtimeData
		cache.realtime.expiresAt = now + REALTIME_CACHE_TTL_MS
	}

	return {
		source: 'google',
		...reportData,
		...realtimeData,
		updatedAt: new Date().toISOString(),
	}
}

export default async function handler(req, res) {
	if (req.method !== 'GET') {
		res.setHeader('Allow', 'GET')
		return res.status(405).json({ error: 'Method not allowed' })
	}

	setCachingHeaders(res)

	try {
		const payload = await getStatsPayload()
		return res.status(200).json(payload)
	} catch (error) {
		console.error('Analytics stats fetch failed', error)
		return res.status(200).json(
			buildFallbackPayload('google_analytics_error', {
				message: error instanceof Error ? error.message : 'Unknown analytics error',
			}),
		)
	}
}
