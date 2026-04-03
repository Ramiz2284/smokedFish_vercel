const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim()

function injectGtagScript(id) {
	const script = document.createElement('script')
	script.async = true
	script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
	script.dataset.analytics = 'google-gtag'
	document.head.append(script)
}

export function initAnalytics() {
	if (!measurementId || typeof window === 'undefined') return
	if (window.gtag) return

	window.dataLayer = window.dataLayer || []
	window.gtag = function gtag(...args) {
		window.dataLayer.push(args)
	}

	injectGtagScript(measurementId)
	window.gtag('js', new Date())
	window.gtag('config', measurementId)
}

export function trackEvent(eventName, params = {}) {
	if (!measurementId || typeof window === 'undefined' || !window.gtag) return
	window.gtag('event', eventName, params)
}
