import { useEffect, useState } from 'react'
import { GOOGLE_MAPS_REVIEWS_URL } from '../siteContent'

const fallbackData = {
	source: 'fallback',
	displayName: 'Smoked Fish Antalya',
	rating: null,
	userRatingCount: null,
	reviews: [],
	mapsUrl: GOOGLE_MAPS_REVIEWS_URL,
}

function formatReviewCount(value) {
	if (!value) return 'Рейтинг появится после загрузки Google Reviews'
	return `${value} отзывов в Google`
}

function renderStars(value) {
	if (!value) return 'Google Reviews'
	return `${value.toFixed(1)} / 5`
}

function truncateText(text, maxLength = 220) {
	if (!text) return ''
	if (text.length <= maxLength) return text
	return `${text.slice(0, maxLength).trim()}...`
}

function ReviewCard({ review }) {
	return (
		<article className='review-card'>
			<div className='review-card__topline'>
				<div>
					<h3>{review.authorName}</h3>
					<p>{review.relativePublishTimeDescription || 'Отзыв из Google Maps'}</p>
				</div>
				<span className='review-card__rating'>{review.rating ? `${review.rating}★` : '★'}</span>
			</div>
			<p className='review-card__text'>{truncateText(review.text)}</p>
			{review.authorUrl ? (
				<a
					className='review-card__link'
					href={review.authorUrl}
					target='_blank'
					rel='noreferrer'
				>
					Профиль автора в Google
				</a>
			) : null}
		</article>
	)
}

export default function GoogleReviewsSection() {
	const [state, setState] = useState({
		status: 'loading',
		data: fallbackData,
	})

	useEffect(() => {
		let active = true

		async function loadReviews() {
			try {
				const response = await fetch('/api/google-reviews', {
					headers: {
						Accept: 'application/json',
					},
				})

				if (!response.ok) {
					throw new Error(`Reviews request failed with ${response.status}`)
				}

				const payload = await response.json()

				if (!active) return

				setState({
					status: payload.source === 'fallback' ? 'fallback' : 'ready',
					data: {
						...fallbackData,
						...payload,
					},
				})
			} catch {
				if (!active) return
				setState({
					status: 'error',
					data: fallbackData,
				})
			}
		}

		loadReviews()

		return () => {
			active = false
		}
	}, [])

	const { data, status } = state
	const hasReviews = Array.isArray(data.reviews) && data.reviews.length > 0

	return (
		<section className='section section--accent' id='reviews' aria-labelledby='reviews-title'>
			<div className='section-heading'>
				<p className='section-eyebrow'>Отзывы клиентов</p>
				<h2 id='reviews-title'>Что пишут о нас в Google</h2>
				<p>
					Отзывы опубликованы в Google Maps. Ниже показываем актуальный рейтинг,
					количество отзывов и несколько недавних или наиболее заметных отзывов.
				</p>
			</div>

			<div className='reviews-panel'>
				<div className='reviews-summary'>
					<div className='reviews-summary__score'>{data.rating ? data.rating.toFixed(1) : 'Google'}</div>
					<div className='reviews-summary__content'>
						<p className='reviews-summary__label'>Google Reviews</p>
						<h3>{renderStars(data.rating)}</h3>
						<p>{formatReviewCount(data.userRatingCount)}</p>
						{status === 'loading' ? (
							<p className='reviews-summary__status'>Загружаем рейтинг и отзывы из Google Maps...</p>
						) : null}
						{status === 'error' ? (
							<p className='reviews-summary__status'>
								Рейтинг временно недоступен, но отзывы можно открыть прямо в Google Maps.
							</p>
						) : null}
						{status === 'fallback' ? (
							<p className='reviews-summary__status'>
								Подключите официальный Google Places API, чтобы на сайте показывались
								актуальные отзывы автоматически.
							</p>
						) : null}
						<a
							className='button button--primary reviews-summary__button'
							href={data.mapsUrl || GOOGLE_MAPS_REVIEWS_URL}
							target='_blank'
							rel='noreferrer'
						>
							Смотреть все отзывы в Google Maps
						</a>
					</div>
				</div>

				<div className='reviews-grid'>
					{hasReviews
						? data.reviews.map(review => <ReviewCard key={review.id} review={review} />)
						: (
							<article className='review-card review-card--placeholder'>
								<h3>Отзывы из Google появятся здесь</h3>
								<p className='review-card__text'>
									Даже если текст отзывов временно недоступен, ссылка на Google Maps
									всегда остаётся доступной. Это безопасный fallback для продакшена и
									корректной интеграции через официальный API.
								</p>
							</article>
						)}
				</div>
			</div>
		</section>
	)
}
