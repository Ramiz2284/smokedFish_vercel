/* global process */

const CACHE_TTL_MS = 6 * 60 * 60 * 1000
const FALLBACK_MAPS_URL = 'https://share.google/TruYWAT9NwOFrC2iW'

function getCacheStore() {
	if (!globalThis.__googleReviewsCache) {
		globalThis.__googleReviewsCache = {
			expiresAt: 0,
			payload: null,
		}
	}

	return globalThis.__googleReviewsCache
}

function setCachingHeaders(res) {
	res.setHeader('Cache-Control', 'public, s-maxage=21600, stale-while-revalidate=86400')
}

function buildFallbackPayload(overrides = {}) {
	return {
		source: 'fallback',
		displayName: 'Smoked Fish Antalya',
		rating: null,
		userRatingCount: null,
		reviews: [],
		mapsUrl: process.env.GOOGLE_MAPS_URL || FALLBACK_MAPS_URL,
		updatedAt: new Date().toISOString(),
		...overrides,
	}
}

function normalizeReview(review, index) {
	const text = review?.originalText?.text || review?.text?.text || ''

	return {
		id: review?.name || `review-${index}`,
		authorName: review?.authorAttribution?.displayName || 'Пользователь Google',
		authorUrl: review?.authorAttribution?.uri || '',
		profilePhotoUrl: review?.authorAttribution?.photoUri || '',
		rating: typeof review?.rating === 'number' ? review.rating : null,
		relativePublishTimeDescription: review?.relativePublishTimeDescription || '',
		publishTime: review?.publishTime || '',
		text,
	}
}

async function fetchGoogleReviews() {
	const apiKey = process.env.GOOGLE_MAPS_API_KEY
	const placeId = process.env.GOOGLE_PLACE_ID
	const mapsUrl = process.env.GOOGLE_MAPS_URL || FALLBACK_MAPS_URL

	if (!apiKey || !placeId) {
		return buildFallbackPayload({
			reason: 'missing_google_config',
			mapsUrl,
		})
	}

	const url = new URL(`https://places.googleapis.com/v1/places/${placeId}`)
	url.searchParams.set('languageCode', 'ru')

	const response = await fetch(url, {
		headers: {
			'X-Goog-Api-Key': apiKey,
			'X-Goog-FieldMask':
				'id,displayName,rating,userRatingCount,googleMapsUri,reviews',
		},
	})

	if (!response.ok) {
		const errorText = await response.text()
		throw new Error(`Google Places API failed: ${response.status} ${errorText}`)
	}

	const place = await response.json()

	return {
		source: 'google',
		displayName: place?.displayName?.text || 'Smoked Fish Antalya',
		rating: typeof place?.rating === 'number' ? place.rating : null,
		userRatingCount:
			typeof place?.userRatingCount === 'number' ? place.userRatingCount : null,
		reviews: Array.isArray(place?.reviews)
			? place.reviews.slice(0, 3).map(normalizeReview)
			: [],
		mapsUrl: place?.googleMapsUri || mapsUrl,
		updatedAt: new Date().toISOString(),
	}
}

export default async function handler(req, res) {
	if (req.method !== 'GET') {
		res.setHeader('Allow', 'GET')
		return res.status(405).json({ error: 'Method not allowed' })
	}

	setCachingHeaders(res)

	const cache = getCacheStore()
	const now = Date.now()

	if (cache.payload && cache.expiresAt > now) {
		return res.status(200).json(cache.payload)
	}

	try {
		const payload = await fetchGoogleReviews()
		cache.payload = payload
		cache.expiresAt = now + CACHE_TTL_MS
		return res.status(200).json(payload)
	} catch {
		const fallbackPayload = buildFallbackPayload({
			reason: 'google_api_error',
		})
		return res.status(200).json(fallbackPayload)
	}
}
