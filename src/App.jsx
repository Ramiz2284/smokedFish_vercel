import React, { useState } from 'react'
import './App.css'

const products = [
	{
		id: 1,
		title: 'Форель холодного копчения',
		image: '/images/forel1.jpg',
		price: '800₺ / kg',
		description:
			'Форель черноморская, крупная, на местных рынках известна как турецкий лосось. Одна половина рыбы с вырезанным хребтом весит 900-1200 г. Готовим по ГОСТу: сухой посол, вымачивание, сушка и копчение на сливовой щепе.',
		images: ['/images/forel1.jpg', '/images/forel2.jpg', '/images/forel3.jpg'], // Уникальные изображения
	},
	{
		id: 2,
		title: 'Колбаса куриная горячего копчения',
		image: '/images/kolbasa.jpg',
		price: '500₺ / kg',
		description:
			'Колбаса из куриных бедрышек, очищенных от кожи. Только мясо и специи. Состав: чёрный перец, паприка, соль, мускатный орех, кардамон, острый красный перец, сушёный чеснок. Важно: не содержит нитритной соли. Хранится в замороженном виде.',
		images: [
			'/images/kolbasa.jpg',
			'/images/kolbasa2.jpg',
			'/images/kolbasa3.jpg',
		], // Уникальные изображения
	},
	{
		id: 3,
		title: 'Домашний медовый квас',
		image: '/images/kvas.png',
		price: '100₺ / 1,5 l',
		description:
			'Квас домашний разливной на меду и хлебе. Состав: 70 г меда в каждом литре, хлеб, солод, живая закваска на основе ржаной муки. Я покупаю воду в бутылках по 1,5 литра, из этой воды делаю квас и в эти же бутылки разливаю.',
		images: ['/images/kvas.png', '/images/kvas2.png', '/images/kvas3.png'], // Уникальные изображения
	},
]

const ProductCard = ({ product }) => {
	const [flipped, setFlipped] = useState(false)
	const [currentSlide, setCurrentSlide] = useState(0)

	const handleWhatsAppClick = () => {
		const message = `Здравствуйте, я хочу заказать ${product.title}`
		const phoneNumber = '905444558407'
		const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
			message
		)}`
		window.open(url, '_blank')
	}

	const handleDotClick = index => {
		setCurrentSlide(index)
	}

	return (
		<div
			onClick={() => setFlipped(!flipped)}
			className={`product-card ${flipped ? 'flipped' : ''}`}
		>
			{/* Front Side */}
			<div className='product-card-front'>
				<div className='slider'>
					<img
						src={product.images[currentSlide]} // Используем уникальные изображения
						alt={product.title}
						className='product-image'
					/>
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
	return (
		<div className='app'>
			<h1 className='app-title'>Копчёная рыба и колбаса в Анталии</h1>
			<p className='app-description'>
				Без химии, натуральное копчение каждую неделю. Безопасность — глубокой
				заморозкой до -40°C перед приготовлением.
			</p>
			<div className='product-grid'>
				{products.map(product => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	)
}

export default App
