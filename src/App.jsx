import { useEffect, useState } from 'react'
import './App.css'

const products = [
	{
		id: 1,
		title: 'Форель холодного копчения',
		image: '/images/forel1.jpg',
		price: '1100₺ / kg',
		description:
			'Форель черноморская, крупная, на местных рынках известна как турецкий лосось. Одна половина рыбы с вырезанным хребтом весит 900-1200 г. Готовим по ГОСТу: сухой посол, вымачивание, сушка и копчение на сливовой щепе.',
		images: ['/images/forel1.jpg', '/images/forel2.jpg', '/images/forel3.jpg'], // Уникальные изображения
	},
	{
		id: 2,
		title: 'Норвежский лосось (семга) холодного копчения',
		image: '/images/somon2.jpg',
		price: '1600₺ / kg',
		description:
			'Норвежский лосось (семга) — крупная рыба, каждая по 5–6 кг. Отличается более жирным и мясистым мясом, нежнее по текстуре, чем у турецкого лосося. Отлично подходит для суши, салатов или бутербродов. Одна половина рыбы с удалённым хребтом весит 1500–1700 г. Готовим по ГОСТу: сухой посол, вымачивание, сушка и копчение на сливовой щепе.',
		images: [
			'/images/somon.jpg',
			'/images/somon2.jpg',
			'/images/somon3.jpg',
			'/images/somon4.jpg',
		], // Уникальные изображения
	},
	{
		id: 3,
		title: 'Домашний медовый квас',
		image: '/images/kvas.jpg',
		price: '100₺ / 1,5 l',
		description:
			'Квас домашний разливной на меду и хлебе. Состав: 70 г меда в каждом литре, хлеб, солод, живая закваска на основе ржаной муки. Я покупаю воду в бутылках по 1,5 литра, из этой воды делаю квас и в эти же бутылки разливаю.',
		images: ['/images/kvas.jpg', '/images/kvas2.jpg', '/images/kvas3.jpg'], // Уникальные изображения
	},
]

const ProductCard = ({ product }) => {
	const [flipped, setFlipped] = useState(false)
	const [currentSlide, setCurrentSlide] = useState(0)
	const [startX, setStartX] = useState(null)

	const handleWhatsAppClick = () => {
		const message = `Здравствуйте, я хочу заказать ${product.title}`
		const phoneNumber = '905444558407'
		const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
			message,
		)}`
		window.open(url, '_blank')
	}

	const handleDotClick = index => {
		setCurrentSlide(index)
	}

	// Обработчики для свайпа
	const handleMouseDown = e => {
		setStartX(e.clientX)
	}

	const handleMouseUp = e => {
		if (startX === null) return
		const endX = e.clientX
		const diff = startX - endX

		if (diff > 50) {
			// Свайп влево
			setCurrentSlide(prev => (prev + 1) % product.images.length)
		} else if (diff < -50) {
			// Свайп вправо
			setCurrentSlide(prev =>
				prev === 0 ? product.images.length - 1 : prev - 1,
			)
		}
		setStartX(null)
	}

	// Обработчики для стрелок
	const handleNext = () => {
		setCurrentSlide(prev => (prev + 1) % product.images.length)
	}

	const handlePrev = () => {
		setCurrentSlide(prev => (prev === 0 ? product.images.length - 1 : prev - 1))
	}

	return (
		<div
			onClick={() => setFlipped(!flipped)}
			className={`product-card ${flipped ? 'flipped' : ''}`}
		>
			{/* Front Side */}
			<div className='product-card-front'>
				<div
					className='slider'
					onMouseDown={handleMouseDown}
					onMouseUp={handleMouseUp}
					onTouchStart={e => setStartX(e.touches[0].clientX)}
					onTouchEnd={e => {
						if (startX === null) return
						const endX = e.changedTouches[0].clientX
						const diff = startX - endX

						if (diff > 50) {
							setCurrentSlide(prev => (prev + 1) % product.images.length)
						} else if (diff < -50) {
							setCurrentSlide(prev =>
								prev === 0 ? product.images.length - 1 : prev - 1,
							)
						}
						setStartX(null)
					}}
				>
					<img
						src={product.images[currentSlide]} // Используем уникальные изображения
						alt={product.title}
						className='product-image'
					/>
					<button
						className='slider-arrow left-arrow'
						onClick={e => {
							e.stopPropagation()
							handlePrev()
						}}
					>
						&#8249;
					</button>
					<button
						className='slider-arrow right-arrow'
						onClick={e => {
							e.stopPropagation()
							handleNext()
						}}
					>
						&#8250;
					</button>
					<div className='slider-dots'>
						{product.images.map((_, index) => (
							<span
								key={index}
								className={`dot ${currentSlide === index ? 'active' : ''}`}
								onClick={e => {
									e.stopPropagation() // Останавливаем переворот карточки
									handleDotClick(index)
								}}
							></span>
						))}
					</div>
				</div>
				<div className='product-info'>
					<h2 className='product-title'>{product.title}</h2>
					<p className='product-price'>{product.price}</p>
				</div>
			</div>

			{/* Back Side */}
			<div className='product-card-back'>
				<h2 className='product-title'>{product.title}</h2>
				<p className='product-description'>{product.description}</p>
				<button
					className='whatsapp-button'
					onClick={e => {
						e.stopPropagation() // Останавливаем переворот карточки
						handleWhatsAppClick()
					}}
				>
					Заказать в WhatsApp
				</button>
			</div>
		</div>
	)
}

const App = () => {
	const [bgLoaded, setBgLoaded] = useState({
		low: false,
		medium: false,
		high: false,
	})

	useEffect(() => {
		// Имитация загрузки фона низкого качества (быстро)
		const lowTimer = setTimeout(() => {
			setBgLoaded(prev => ({ ...prev, low: true }))
		}, 200)

		// Имитация загрузки фона среднего качества
		const mediumTimer = setTimeout(() => {
			setBgLoaded(prev => ({ ...prev, medium: true }))
		}, 800)

		// Имитация загрузки фона высокого качества
		const highTimer = setTimeout(() => {
			setBgLoaded(prev => ({ ...prev, high: true }))
		}, 1400)

		return () => {
			clearTimeout(lowTimer)
			clearTimeout(mediumTimer)
			clearTimeout(highTimer)
		}
	}, [])

	return (
		<>
			<div className='bg-container'>
				<div className='bg-placeholder'></div>
				<div
					className={`bg-low-quality ${bgLoaded.medium ? 'medium-loaded' : ''}`}
				></div>
				<div
					className={`bg-medium-quality ${bgLoaded.high ? 'high-loaded' : ''}`}
				></div>
				<div className='bg-high-quality'></div>
				<div className='bg-overlay'></div>
			</div>
			<div className='app'>
				<h1 className='app-title'>Копчёная рыба и колбаса в Анталии</h1>
				<p className='app-description'>
					Без химии, натуральное копчение каждую неделю. Безопасность — глубокой
					заморозкой до -40°C перед приготовлением.
				</p>
				<a
					href='https://maps.app.goo.gl/xRnRg3gnVhYKENgr9'
					target='_blank'
					rel='noopener noreferrer'
					className='address-button'
				>
					Посмотреть адрес
				</a>
				<div className='product-grid'>
					{products.map(product => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			</div>
		</>
	)
}

export default App
