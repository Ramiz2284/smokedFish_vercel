import { useEffect, useState } from 'react'

const numberFormatter = new Intl.NumberFormat('ru-RU')

const fallbackData = {
	source: 'fallback',
	visits: null,
	uniqueVisitors: null,
	activeNow: null,
}

const statsConfig = [
	{
		key: 'visits',
		label: 'Всего посещений',
		description: 'Сколько раз открывали сайт с момента запуска аналитики.',
	},
	{
		key: 'uniqueVisitors',
		label: 'Уникальных гостей',
		description: 'Примерное число разных пользователей по данным Google Analytics.',
	},
	{
		key: 'activeNow',
		label: 'Сейчас на сайте',
		description: 'Оценка активных посетителей в realtime по данным Google Analytics.',
	},
]

function formatStatValue(value, status) {
	if (typeof value === 'number') {
		return numberFormatter.format(value)
	}

	if (status === 'loading') return '...'
	return '—'
}

export default function VisitorStatsSection() {
	const [state, setState] = useState({
		status: 'loading',
		data: fallbackData,
	})

	useEffect(() => {
		let active = true

		async function loadStats() {
			try {
				const response = await fetch('/api/analytics-stats', {
					headers: {
						Accept: 'application/json',
					},
				})

				if (!response.ok) {
					throw new Error(`Analytics request failed with ${response.status}`)
				}

				const payload = await response.json()
				if (!active) return

				setState({
					status: payload.source === 'google' ? 'ready' : 'fallback',
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

		loadStats()

		return () => {
			active = false
		}
	}, [])

	return (
		<section className='section stats-section' id='stats' aria-labelledby='stats-title'>
			<div className='section-heading'>
				<p className='section-eyebrow'>Статистика сайта</p>
				<h2 id='stats-title'>Сколько людей уже заходили на сайт</h2>
				<p>
					Показываем общие и realtime-данные из Google Analytics. Цифры
					обновляются автоматически и помогают понимать текущую активность на сайте.
				</p>
			</div>

			<div className='stats-grid'>
				{statsConfig.map(item => (
					<article className='stats-card' key={item.key}>
						<p className='stats-card__label'>{item.label}</p>
						<h3>{formatStatValue(state.data[item.key], state.status)}</h3>
						<p className='stats-card__description'>{item.description}</p>
					</article>
				))}
			</div>

			<p className='stats-note'>
				{state.status === 'ready'
					? 'Данные получены через официальный Google Analytics Data API.'
					: 'Статистика появится после того, как Google Analytics накопит первые данные.'}
			</p>
		</section>
	)
}
