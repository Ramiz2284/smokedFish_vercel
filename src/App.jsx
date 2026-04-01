import './App.css'

const WHATSAPP_NUMBER = '905444558407'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`
const MAPS_URL = 'https://maps.app.goo.gl/xRnRg3gnVhYKENgr9'

const trustPoints = [
	'Свежие партии',
	'Напрямую из коптильни',
	'Доставка по Анталии',
]

const benefits = [
	{
		title: 'Коптим сами',
		text: 'Рыба готовится небольшими партиями, без витринного хранения и длинной цепочки посредников.',
	},
	{
		title: 'Вкус без пересола',
		text: 'Мягкая текстура, чистый дым и аккуратный баланс соли, чтобы рыба оставалась мясистой и сочной.',
	},
	{
		title: 'Понятный заказ',
		text: 'Пишите в WhatsApp, уточняем наличие и вес, подтверждаем доставку и быстро отправляем по Анталии.',
	},
	{
		title: 'На стол и в подарок',
		text: 'Подходит для семейного ужина, закусок, завтраков, праздничного стола и подарка без лишней упаковочной мишуры.',
	},
]

const products = [
	{
		id: 'salmon',
		name: 'Копчёный норвежский лосось',
		entity: 'Smoked salmon in Antalya',
		price: '1600₺ / кг',
		image: '/images/somon2.jpg',
		alt: 'Копчёный норвежский лосось в Анталии',
		origin: 'Норвежский лосось с мягкой текстурой и более деликатным вкусом.',
		taste: 'Нежный, маслянистый, с ровным копчением и мягкой солёностью.',
		forWho:
			'Подходит для бутербродов, салатов, праздничной подачи, бранчей и тех, кто любит классический premium smoked salmon.',
		description:
			'Хороший выбор, если хотите нежный копчёный лосось к столу, на подарок или для красивой подачи без лишних поисков по городу.',
		weights: 'Подберём удобный кусок под ваш заказ и сразу скажем, что есть в наличии.',
	},
	{
		id: 'trout',
		name: 'Копчёная форель / Turkish salmon',
		entity: 'Smoked trout in Antalya',
		price: '1100₺ / кг',
		image: '/images/forel1.jpg',
		alt: 'Копчёная форель Turkish salmon в Анталии',
		origin: 'Крупная форель, которую в Турции часто называют Turkish salmon.',
		taste: 'Плотнее по текстуре, насыщенная по вкусу, отлично держит нарезку и подачу на стол.',
		forWho:
			'Хороший выбор, если нужен выразительный вкус smoked trout и более доступная альтернатива норвежскому лососю.',
		description:
			'Отличный вариант на каждый день, если хочется вкусной копчёной рыбы с насыщенным вкусом и более спокойной ценой.',
		weights: 'Поможем выбрать подходящий кусок для семьи, гостей или аккуратной нарезки.',
	},
]

const orderSteps = [
	{
		title: '1. Напишите нам',
		text: 'Откройте WhatsApp и напишите, какую рыбу хотите: smoked salmon или smoked trout.',
	},
	{
		title: '2. Уточним вес и наличие',
		text: 'Скажем, что есть сегодня, и поможем выбрать подходящий вес без лишних сомнений.',
	},
	{
		title: '3. Подтвердим доставку',
		text: 'Быстро согласуем район и удобное время доставки по Анталии.',
	},
	{
		title: '4. Получите заказ',
		text: 'Вы получаете свежую копчёную рыбу напрямую из коптильни в ближайшее доступное время.',
	},
]

const deliveryDistricts = ['Konyaaltı', 'Lara', 'Muratpaşa']

const faqs = [
	{
		question: 'Где купить копчёный лосось в Анталии?',
		answer:
			'Заказать копчёный лосось в Анталии можно напрямую через сайт и WhatsApp. Мы готовим свежие партии и подтверждаем наличие перед доставкой по городу.',
	},
	{
		question: 'Доставляете ли вы по Анталии?',
		answer:
			'Да, мы работаем по Анталии и подтверждаем район доставки при заказе. Чаще всего речь идёт о доставке в Konyaaltı, Lara, Muratpaşa и соседние районы по согласованию.',
	},
	{
		question: 'Что у вас можно заказать?',
		answer:
			'На сайте можно заказать копчёный норвежский лосось и копчёную форель, которую часто называют Turkish salmon. Это две основные позиции для прямого заказа с доставкой по Анталии.',
	},
	{
		question: 'Это действительно норвежский лосось?',
		answer:
			'Да, smoked salmon у нас — это норвежский лосось. Перед заказом мы отдельно подтверждаем наличие, чтобы вы понимали, что именно доступно сегодня.',
	},
	{
		question: 'Чем отличается smoked trout от smoked salmon?',
		answer:
			'Smoked salmon обычно более жирный и мягкий по текстуре. Smoked trout плотнее, насыщеннее по вкусу и часто воспринимается как более доступная альтернатива.',
	},
	{
		question: 'Форель — это Turkish salmon?',
		answer:
			'В Турции крупную форель действительно часто называют Turkish salmon. На сайте мы отдельно объясняем это, чтобы было проще выбрать между smoked trout и норвежским лососем.',
	},
	{
		question: 'Рыба свежая?',
		answer:
			'Да, мы делаем акцент на свежих партиях и не растягиваем продажу одной и той же рыбы надолго. Перед отправкой всегда подтверждаем наличие и детали заказа.',
	},
	{
		question: 'Готовите ли вы небольшими партиями?',
		answer:
			'Да, небольшие партии помогают сохранить вкус, свежесть и аккуратную текстуру. Поэтому рыба ощущается как продукт под заказ, а не как товар с долгого хранения.',
	},
	{
		question: 'Как сделать заказ?',
		answer:
			'Самый быстрый способ — написать в WhatsApp с сайта. Мы уточняем вид рыбы, вес, адрес и подтверждаем доставку в Анталии.',
	},
	{
		question: 'Какой вес можно заказать?',
		answer:
			'Заказ собирается по доступности текущей партии и вашему запросу по весу. Точный вес и формат куска мы согласовываем в переписке перед подтверждением.',
	},
	{
		question: 'Сколько занимает доставка?',
		answer:
			'Точное время зависит от района, загрузки и наличия партии в день заказа. Обычно мы предлагаем ближайшее доступное окно доставки после подтверждения деталей.',
	},
	{
		question: 'Подходит ли smoked trout как более доступная альтернатива?',
		answer:
			'Да, smoked trout часто выбирают как более доступный вариант по сравнению с норвежским smoked salmon. При этом у форели плотная текстура и насыщенный вкус, который хорошо подходит для повседневного стола.',
	},
]

const localBusinessSchema = {
	'@context': 'https://schema.org',
	'@type': 'LocalBusiness',
	name: 'Smoked Fish Antalya',
	description:
		'Direct order of smoked salmon and smoked trout in Antalya with local delivery.',
	areaServed: {
		'@type': 'City',
		name: 'Antalya',
	},
	address: {
		'@type': 'PostalAddress',
		addressLocality: 'Antalya',
		addressCountry: 'TR',
	},
	telephone: `+${WHATSAPP_NUMBER}`,
	url: 'https://smoked-fish-vercel.vercel.app/',
	hasMap: MAPS_URL,
	sameAs: [MAPS_URL],
}

const productSchema = products.map(product => ({
	'@context': 'https://schema.org',
	'@type': 'Product',
	name: product.name,
	description: `${product.description} ${product.origin} ${product.taste}`,
	image: `https://smoked-fish-vercel.vercel.app${product.image}`,
	brand: {
		'@type': 'Brand',
		name: 'Smoked Fish Antalya',
	},
	offers: {
		'@type': 'Offer',
		priceCurrency: 'TRY',
		availability: 'https://schema.org/InStock',
		areaServed: 'Antalya',
		url: 'https://smoked-fish-vercel.vercel.app/',
	},
}))

const faqSchema = {
	'@context': 'https://schema.org',
	'@type': 'FAQPage',
	mainEntity: faqs.map(item => ({
		'@type': 'Question',
		name: item.question,
		acceptedAnswer: {
			'@type': 'Answer',
			text: item.answer,
		},
	})),
}

function CTAGroup({ compact = false }) {
	const message =
		'Здравствуйте! Хочу заказать копчёную рыбу в Анталии: smoked salmon или smoked trout. Подскажите наличие и доставку.'

	return (
		<div className={`cta-group ${compact ? 'cta-group--compact' : ''}`}>
			<a
				className='button button--primary'
				href={`${WHATSAPP_URL}?text=${encodeURIComponent(message)}`}
				target='_blank'
				rel='noreferrer'
			>
				Заказать в WhatsApp
			</a>
			<a className='button button--secondary' href='#products'>
				Смотреть рыбу
			</a>
		</div>
	)
}

function SectionHeading({ eyebrow, title, text, centered = false }) {
	return (
		<div className={`section-heading ${centered ? 'section-heading--centered' : ''}`}>
			{eyebrow ? <p className='section-eyebrow'>{eyebrow}</p> : null}
			<h2>{title}</h2>
			{text ? <p>{text}</p> : null}
		</div>
	)
}

function App() {
	return (
		<>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
			/>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
			/>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
			/>

			<div className='page-shell'>
				<header className='hero'>
					<nav className='topbar' aria-label='Основная навигация'>
						<a className='brand' href='/'>
							Smoked Fish Antalya
						</a>
						<div className='topbar-links'>
							<a href='#products'>Рыба</a>
							<a href='#faq'>FAQ</a>
							<a href={MAPS_URL} target='_blank' rel='noreferrer'>
								Antalya delivery
							</a>
						</div>
					</nav>

					<div className='hero-grid'>
						<div className='hero-copy'>
							<p className='hero-kicker'>Smoked salmon • Smoked trout • Antalya</p>
							<h1>Копчёный лосось в Анталии — свежие партии напрямую из коптильни</h1>
							<p className='hero-lead'>
								Норвежский лосось и копчёная форель с доставкой по Анталии. Легко
								заказать напрямую, быстро понять разницу и выбрать рыбу под ваш вкус.
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
								<img
									src='/images/somon.jpg'
									alt='Свежий копчёный лосось для заказа в Анталии'
								/>
							</div>
							<div className='hero-card__body'>
								<p className='hero-card__label'>Direct order in Antalya</p>
								<h2>Рыба, которую приятно подать и удобно заказать</h2>
								<p>
									Копчёный лосось выбирают за мягкий вкус и нежную текстуру.
									Форель / Turkish salmon берут, когда нужен более яркий вкус и
									хорошая цена на каждый день.
								</p>
								<div className='hero-card__meta'>
									<span>Лосось: 1600₺ / кг</span>
									<span>Форель: 1100₺ / кг</span>
								</div>
							</div>
						</div>
					</div>
				</header>

				<main>
					<section className='section' aria-labelledby='why-buy'>
						<SectionHeading
							eyebrow='Почему покупают у нас'
							title='Свежая копчёная рыба без сложного выбора'
							text='Здесь всё просто: хороший продукт, понятный заказ и доставка по Анталии без лишней суеты.'
						/>
						<div className='benefit-grid'>
							{benefits.map(item => (
								<article className='benefit-card' key={item.title}>
									<h3>{item.title}</h3>
									<p>{item.text}</p>
								</article>
							))}
						</div>
					</section>

					<section className='section section--accent' id='products' aria-labelledby='products-title'>
						<SectionHeading
							eyebrow='Что можно заказать'
							title='Два понятных продукта под разный вкус и бюджет'
							text='Коротко показываем разницу, чтобы вы быстро выбрали подходящий вариант и сразу оформили заказ.'
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
												<strong>Что это:</strong> {product.origin}
											</li>
											<li>
												<strong>Какой вкус:</strong> {product.taste}
											</li>
											<li>
												<strong>Кому понравится:</strong> {product.forWho}
											</li>
											<li>
												<strong>Как выбрать:</strong> {product.weights}
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
							title='Без звонков, сложных форм и долгих согласований'
							text='Маршрут заказа максимально короткий: сообщение, подтверждение веса, доставка.'
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

					<section className='section section--accent' aria-labelledby='delivery-title'>
						<SectionHeading
							eyebrow='Доставка в Анталии'
							title='Локальная доставка по Antalya с подтверждением условий при заказе'
							text='Просто напишите нам, а район, время и детали доставки мы быстро подтвердим в переписке.'
						/>
						<div className='delivery-panel'>
							<div>
								<h3>Районы, которые спрашивают чаще всего</h3>
								<div className='district-list' aria-label='Районы доставки'>
									{deliveryDistricts.map(district => (
										<span key={district}>{district}</span>
									))}
								</div>
							</div>
							<div>
								<h3>Что важно знать перед заказом</h3>
								<ul className='delivery-points'>
									<li>Доставка по Анталии подтверждается после уточнения адреса.</li>
									<li>Свежая партия и ближайшее доступное время согласуются в WhatsApp.</li>
									<li>Условия доставки сообщаем сразу при подтверждении заказа.</li>
								</ul>
							</div>
						</div>
					</section>

					<section className='section' id='faq' aria-labelledby='faq-title'>
						<SectionHeading
							eyebrow='FAQ'
							title='Короткие ответы на вопросы перед заказом'
							text='Собрали самые частые вопросы, чтобы вы сразу понимали, как проходит заказ и что выбрать.'
						/>
						<div className='faq-list'>
							{faqs.map(item => (
								<details className='faq-item' key={item.question}>
									<summary>{item.question}</summary>
									<p>{item.answer}</p>
								</details>
							))}
						</div>
					</section>

					<section className='section final-cta' aria-labelledby='reserve-title'>
						<div className='final-cta__content'>
							<p className='section-eyebrow'>Свежие партии не лежат неделями</p>
							<h2 id='reserve-title'>Напишите сейчас, чтобы забронировать нужный вес</h2>
							<p>
								Если вам нужен копчёный лосось или копчёная форель в Анталии,
								лучше написать сразу. Мы быстро подтвердим наличие, формат куска и
								доставку по вашему району.
							</p>
							<CTAGroup compact />
						</div>
					</section>
				</main>
			</div>
		</>
	)
}

export default App
