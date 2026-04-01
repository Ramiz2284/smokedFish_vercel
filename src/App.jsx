import {
	MAPS_URL,
	WHATSAPP_URL,
	benefits,
	ctaMessage,
	ctaNote,
	deliveryDistricts,
	faqs,
	orderSteps,
	products,
	trustPoints,
} from './siteContent'

function CTAGroup({ compact = false }) {
	return (
		<div className={`cta-cluster ${compact ? 'cta-cluster--compact' : ''}`}>
			<div className={`cta-group ${compact ? 'cta-group--compact' : ''}`}>
				<a
					className='button button--primary'
					href={`${WHATSAPP_URL}?text=${encodeURIComponent(ctaMessage)}`}
					target='_blank'
					rel='noreferrer'
				>
					Заказать в WhatsApp
				</a>
				<a className='button button--secondary' href='#products'>
					Смотреть рыбу
				</a>
			</div>
			<p className='cta-note'>{ctaNote}</p>
		</div>
	)
}

function SectionHeading({ eyebrow, title, text }) {
	return (
		<div className='section-heading'>
			{eyebrow ? <p className='section-eyebrow'>{eyebrow}</p> : null}
			<h2>{title}</h2>
			{text ? <p>{text}</p> : null}
		</div>
	)
}

function App() {
	return (
		<div className='page-shell'>
				<header className='hero'>
					<nav className='topbar' aria-label='Основная навигация'>
						<a className='brand' href='/'>
							Smoked Fish Antalya
						</a>
						<div className='topbar-links'>
							<a href='#products'>Рыба</a>
							<a href='#delivery'>Доставка</a>
							<a href='#faq'>FAQ</a>
						</div>
					</nav>

					<div className='hero-grid'>
						<div className='hero-copy'>
							<p className='hero-kicker'>Antalya • smoked salmon • smoked trout</p>
							<h1>Копчёная семга и форель в Анталии</h1>
							<p className='hero-lead'>
								Норвежский лосось и турецкая форель горячего копчения. Доставка
								по Анталии и прямой заказ в WhatsApp.
							</p>
							<CTAGroup />
							<ul className='trust-list' aria-label='Преимущества'>
								{trustPoints.map(item => (
									<li key={item}>{item}</li>
								))}
							</ul>
						</div>

						<div className='hero-card'>
							<div className='hero-card__media'>
								<img src='/images/somon.jpg' alt='Копчёная семга в Анталии' />
							</div>
							<div className='hero-card__body'>
								<p className='hero-card__label'>Что выбрать</p>
								<h2>Семга для стола и подарка, форель на каждый день</h2>
								<p>
									Семгу чаще выбирают, когда нужен более премиальный вариант.
									Форель берут, когда хочется вкусную рыбу по более спокойной
									цене.
								</p>
								<div className='hero-card__meta'>
									<span>Семга: 1600₺ / кг</span>
									<span>Форель: 1100₺ / кг</span>
								</div>
							</div>
						</div>
					</div>
				</header>

				<main>
					<section className='section' aria-labelledby='why-buy'>
						<SectionHeading
							eyebrow='Почему заказывают у нас'
							title='Понятная рыба без лишней сложности'
							text='Коротко о том, что важно покупателю перед заказом.'
						/>
						<div className='benefit-grid'>
							{benefits.map(item => (
								<article className='benefit-card' key={item.title}>
									<h3>{item.title}</h3>
									<p>{item.text}</p>
								</article>
							))}
						</div>
						<CTAGroup compact />
					</section>

					<section
						className='section section--accent'
						id='products'
						aria-labelledby='products-title'
					>
						<SectionHeading
							eyebrow='Что можно заказать'
							title='Два продукта под разный сценарий покупки'
							text='Сразу видно, что выбрать для подарка, гостей или на каждый день.'
						/>
						<div className='product-grid'>
							{products.map(product => (
								<article className='product-card' key={product.id}>
									<div className='product-card__image'>
										<img src={product.image} alt={product.alt} />
									</div>
									<div className='product-card__content'>
										<div className='product-card__topline'>
											<p className='product-card__entity'>{product.entity}</p>
											<p className='product-card__price'>{product.price}</p>
										</div>
										<h3>{product.name}</h3>
										<p className='product-card__summary'>{product.description}</p>
										<ul className='product-points'>
											<li>
												<strong>Что это:</strong> {product.whatItIs}
											</li>
											<li>
												<strong>Какой вкус:</strong> {product.taste}
											</li>
											<li>
												<strong>Когда выбирают:</strong> {product.forWho}
											</li>
											<li>
												<strong>По весу:</strong> {product.choice}
											</li>
										</ul>
									</div>
								</article>
							))}
						</div>
					</section>

					<section className='section' aria-labelledby='order-title'>
						<SectionHeading
							eyebrow='Как заказать'
							title='Четыре простых шага'
							text='Без звонков, без длинных форм и без лишней переписки.'
						/>
						<div className='steps-grid'>
							{orderSteps.map(step => (
								<article className='step-card' key={step.title}>
									<h3>{step.title}</h3>
									<p>{step.text}</p>
								</article>
							))}
						</div>
					</section>

					<section
						className='section section--accent'
						id='delivery'
						aria-labelledby='delivery-title'
					>
						<SectionHeading
							eyebrow='Доставка по Анталии'
							title='Доставляем по Antalya и уточняем детали сразу при заказе'
							text='Район, время и удобный формат доставки быстро подтверждаем в WhatsApp.'
						/>
						<div className='delivery-panel'>
							<div>
								<h3>Районы, где заказывают чаще всего</h3>
								<div className='district-list' aria-label='Районы доставки'>
									{deliveryDistricts.map(district => (
										<span key={district}>{district}</span>
									))}
								</div>
							</div>
							<div>
								<h3>Что важно знать</h3>
								<ul className='delivery-points'>
									<li>Доставка по Анталии подтверждается при заказе.</li>
									<li>Ответим по наличию, весу и ближайшему времени доставки.</li>
									<li>
										Посмотреть точку на карте можно по{' '}
										<a href={MAPS_URL} target='_blank' rel='noreferrer'>
											ссылке
										</a>
										.
									</li>
								</ul>
							</div>
						</div>
					</section>

					<section className='section' id='faq' aria-labelledby='faq-title'>
						<SectionHeading
							eyebrow='FAQ'
							title='Частые вопросы перед заказом'
							text='Коротко и по делу: что заказать, как заказать и как проходит доставка.'
						/>
						<div className='faq-list'>
							{faqs.map(item => (
								<article className='faq-item' key={item.question}>
									<h3>{item.question}</h3>
									<p>{item.answer}</p>
								</article>
							))}
						</div>
					</section>

					<section className='section final-cta' aria-labelledby='reserve-title'>
						<div className='final-cta__content'>
							<p className='section-eyebrow'>Свежие партии быстро разбирают</p>
							<h2 id='reserve-title'>
								Напишите сейчас, чтобы уточнить наличие и забронировать нужный вес
							</h2>
							<p>
								Если хотите копчёную семгу или форель в Анталии, лучше написать
								сразу. Быстро ответим и подскажем лучший вариант под ваш заказ.
							</p>
							<CTAGroup compact />
						</div>
					</section>
				</main>
			</div>
	)
}

export default App
