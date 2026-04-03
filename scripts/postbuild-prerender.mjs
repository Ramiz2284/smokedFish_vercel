import fs from 'node:fs/promises'
import path from 'node:path'
import {
	GOOGLE_MAPS_REVIEWS_URL,
	MAPS_URL,
	SITE_URL,
	WHATSAPP_URL,
	benefits,
	ctaMessage,
	ctaNote,
	deliveryDistricts,
	faqSchema,
	faqs,
	localBusinessSchema,
	orderSteps,
	productSchema,
	products,
	trustPoints,
} from '../src/siteContent.js'

const escapeHtml = value =>
	String(value)
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;')

const ctaHref = `${WHATSAPP_URL}?text=${encodeURIComponent(ctaMessage)}`

const schemaMarkup = [
	`<script type="application/ld+json">${JSON.stringify(localBusinessSchema)}</script>`,
	`<script type="application/ld+json">${JSON.stringify(productSchema)}</script>`,
	`<script type="application/ld+json">${JSON.stringify(faqSchema)}</script>`,
].join('\n')

const renderCTA = compact => `
	<div class="cta-cluster ${compact ? 'cta-cluster--compact' : ''}">
		<div class="cta-group ${compact ? 'cta-group--compact' : ''}">
			<a class="button button--primary" href="${ctaHref}" target="_blank" rel="noreferrer">Заказать в WhatsApp</a>
			<a class="button button--secondary" href="#products">Смотреть рыбу</a>
		</div>
		<p class="cta-note">${escapeHtml(ctaNote)}</p>
	</div>
`

const renderStatsFallback = () => `
<section class="section stats-section" id="stats" aria-labelledby="stats-title">
	<div class="section-heading">
		<p class="section-eyebrow">Статистика сайта</p>
		<h2 id="stats-title">Сколько людей уже заходили на сайт</h2>
		<p>Показываем общие и realtime-данные из Google Analytics. Цифры обновляются автоматически и помогают понимать текущую активность на сайте.</p>
	</div>
	<div class="stats-grid">
		<article class="stats-card">
			<p class="stats-card__label">Всего посещений</p>
			<h3>—</h3>
			<p class="stats-card__description">Сколько раз открывали сайт с момента запуска аналитики.</p>
		</article>
		<article class="stats-card">
			<p class="stats-card__label">Уникальных гостей</p>
			<h3>—</h3>
			<p class="stats-card__description">Примерное число разных пользователей по данным Google Analytics.</p>
		</article>
		<article class="stats-card">
			<p class="stats-card__label">Сейчас на сайте</p>
			<h3>—</h3>
			<p class="stats-card__description">Оценка активных посетителей в realtime по данным Google Analytics.</p>
		</article>
	</div>
	<p class="stats-note">Статистика появится после того, как Google Analytics накопит первые данные.</p>
</section>
`

const renderReviewsFallback = () => `
<section class="section section--accent" id="reviews" aria-labelledby="reviews-title">
	<div class="section-heading">
		<p class="section-eyebrow">Отзывы клиентов</p>
		<h2 id="reviews-title">Что пишут о нас в Google</h2>
		<p>Отзывы опубликованы в Google Maps. Ниже показываем актуальный рейтинг, количество отзывов и несколько недавних или наиболее заметных отзывов.</p>
	</div>
	<div class="reviews-panel">
		<div class="reviews-summary">
			<div class="reviews-summary__score">Google</div>
			<div class="reviews-summary__content">
				<p class="reviews-summary__label">Google Reviews</p>
				<h3>Отзывы загружаются автоматически</h3>
				<p>После загрузки страницы мы получаем официальный рейтинг и отзывы через Google Places API.</p>
				<p class="reviews-summary__status">Если отзывы временно недоступны, карточку компании всё равно можно открыть прямо в Google Maps.</p>
				<a class="button button--primary reviews-summary__button" href="${GOOGLE_MAPS_REVIEWS_URL}" target="_blank" rel="noreferrer">Смотреть все отзывы в Google Maps</a>
			</div>
		</div>
		<div class="reviews-grid">
			<article class="review-card review-card--placeholder">
				<h3>Отзывы из Google появятся здесь</h3>
				<p class="review-card__text">Это безопасный fallback для продакшена: ключ Google остаётся на сервере, а посетитель всегда может перейти к отзывам в Google Maps.</p>
			</article>
		</div>
	</div>
</section>
`

const prerenderedHtml = `
<div class="page-shell">
	<header class="hero">
		<nav class="topbar" aria-label="Основная навигация">
			<a class="brand" href="/">Smoked Fish Antalya</a>
			<div class="topbar-links">
				<a href="#reviews">Отзывы</a>
				<a href="#products">Рыба</a>
				<a href="#delivery">Доставка</a>
				<a href="#faq">FAQ</a>
			</div>
		</nav>
		<div class="hero-grid">
			<div class="hero-copy">
				<p class="hero-kicker">Antalya • smoked salmon • smoked trout</p>
				<h1>Копчёная семга и форель в Анталии</h1>
				<p class="hero-lead">Норвежский лосось и турецкая форель холодного копчения. Доставка по Анталии и прямой заказ в WhatsApp.</p>
				${renderCTA(false)}
				<ul class="trust-list" aria-label="Преимущества">
					${trustPoints.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
				</ul>
			</div>
			<div class="hero-card">
				<div class="hero-card__media">
					<img src="/images/somon.jpg" alt="Копчёная семга в Анталии" />
				</div>
				<div class="hero-card__body">
					<p class="hero-card__label">Что выбрать</p>
					<h2>Семга для стола и подарка, форель на каждый день</h2>
					<p>Семгу чаще выбирают, когда нужен более премиальный вариант. Форель берут, когда хочется вкусную рыбу по более спокойной цене.</p>
					<div class="hero-card__meta">
						<span>Семга: 1600₺ / кг</span>
						<span>Форель: 1300₺ / кг</span>
					</div>
				</div>
			</div>
		</div>
	</header>
	<main>
		${renderStatsFallback()}
		<section class="section" aria-labelledby="why-buy">
			<div class="section-heading">
				<p class="section-eyebrow">Почему заказывают у нас</p>
				<h2>Понятная рыба без лишней сложности</h2>
				<p>Коротко о том, что важно покупателю перед заказом.</p>
			</div>
			<div class="benefit-grid">
				${benefits
					.map(
						item => `
					<article class="benefit-card">
						<h3>${escapeHtml(item.title)}</h3>
						<p>${escapeHtml(item.text)}</p>
					</article>`,
					)
					.join('')}
			</div>
			${renderCTA(true)}
		</section>
		${renderReviewsFallback()}
		<section class="section section--accent" id="products" aria-labelledby="products-title">
			<div class="section-heading">
				<p class="section-eyebrow">Что можно заказать</p>
				<h2>Два продукта под разный сценарий покупки</h2>
				<p>Сразу видно, что выбрать для подарка, гостей или на каждый день.</p>
			</div>
			<div class="product-grid">
				${products
					.map(
						product => `
					<article class="product-card">
						<div class="product-card__image">
							<img src="${product.image}" alt="${escapeHtml(product.alt)}" />
						</div>
						<div class="product-card__content">
							<div class="product-card__topline">
								<p class="product-card__entity">${escapeHtml(product.entity)}</p>
								<p class="product-card__price">${escapeHtml(product.price)}</p>
							</div>
							<h3>${escapeHtml(product.name)}</h3>
							<p class="product-card__summary">${escapeHtml(product.description)}</p>
							<ul class="product-points">
								<li><strong>Что это:</strong> ${escapeHtml(product.whatItIs)}</li>
								<li><strong>Какой вкус:</strong> ${escapeHtml(product.taste)}</li>
								<li><strong>Когда выбирают:</strong> ${escapeHtml(product.forWho)}</li>
								<li><strong>По весу:</strong> ${escapeHtml(product.choice)}</li>
							</ul>
						</div>
					</article>`,
					)
					.join('')}
			</div>
		</section>
		<section class="section" aria-labelledby="order-title">
			<div class="section-heading">
				<p class="section-eyebrow">Как заказать</p>
				<h2>Четыре простых шага</h2>
				<p>Без звонков, без длинных форм и без лишней переписки.</p>
			</div>
			<div class="steps-grid">
				${orderSteps
					.map(
						step => `
					<article class="step-card">
						<h3>${escapeHtml(step.title)}</h3>
						<p>${escapeHtml(step.text)}</p>
					</article>`,
					)
					.join('')}
			</div>
		</section>
		<section class="section section--accent" id="delivery" aria-labelledby="delivery-title">
			<div class="section-heading">
				<p class="section-eyebrow">Доставка по Анталии</p>
				<h2>Доставляем по Antalya и уточняем детали сразу при заказе</h2>
				<p>Район, время и удобный формат доставки быстро подтверждаем в WhatsApp.</p>
			</div>
			<div class="delivery-panel">
				<div>
					<h3>Районы, где заказывают чаще всего</h3>
					<div class="district-list" aria-label="Районы доставки">
						${deliveryDistricts.map(item => `<span>${escapeHtml(item)}</span>`).join('')}
					</div>
				</div>
				<div>
					<h3>Что важно знать</h3>
					<ul class="delivery-points">
						<li>Доставка по Анталии подтверждается при заказе.</li>
						<li>Ответим по наличию, весу и ближайшему времени доставки.</li>
						<li>Точку на карте и все отзывы можно открыть по <a href="${MAPS_URL}" target="_blank" rel="noreferrer">ссылке</a> или сразу в <a href="${GOOGLE_MAPS_REVIEWS_URL}" target="_blank" rel="noreferrer">Google Maps</a>.</li>
					</ul>
				</div>
			</div>
		</section>
		<section class="section" id="faq" aria-labelledby="faq-title">
			<div class="section-heading">
				<p class="section-eyebrow">FAQ</p>
				<h2>Частые вопросы перед заказом</h2>
				<p>Коротко и по делу: что заказать, как заказать и как проходит доставка.</p>
			</div>
			<div class="faq-list">
				${faqs
					.map(
						item => `
					<article class="faq-item">
						<h3>${escapeHtml(item.question)}</h3>
						<p>${escapeHtml(item.answer)}</p>
					</article>`,
					)
					.join('')}
			</div>
		</section>
		<section class="section final-cta" aria-labelledby="reserve-title">
			<div class="final-cta__content">
				<p class="section-eyebrow">Свежие партии быстро разбирают</p>
				<h2 id="reserve-title">Напишите сейчас, чтобы уточнить наличие и забронировать нужный вес</h2>
				<p>Если хотите копчёную семгу или форель в Анталии, лучше написать сразу. Быстро ответим и подскажем лучший вариант под ваш заказ.</p>
				${renderCTA(true)}
			</div>
		</section>
	</main>
</div>
`

const distIndexPath = path.resolve('dist/index.html')
const currentHtml = await fs.readFile(distIndexPath, 'utf8')
const updatedHtml = currentHtml
	.replace('<!--prerender-schema-->', schemaMarkup)
	.replace('<!--prerender-root-->', prerenderedHtml)

if (updatedHtml === currentHtml) {
	throw new Error('Не удалось внедрить предрендеренный HTML в dist/index.html')
}

await fs.writeFile(distIndexPath, updatedHtml)

console.log(`Prerendered static HTML injected into ${SITE_URL}`)
