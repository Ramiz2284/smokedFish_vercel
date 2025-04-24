import React, { useState } from 'react'
import './App.css'

const products = [
	{
		id: 1,
		title: 'Копчёная форель',
		image: '/images/forel.jpg',
		price: '800₺ / кг',
		description:
			'Свежая форель холодного копчения. Без химии. Глубокая заморозка перед копчением до -40°C.',
	},
	{
		id: 2,
		title: 'Говяжья колбаса',
		image: '/images/kolbasa.jpg',
		price: '450₺ / кг',
		description:
			'Домашняя колбаса из говядины. Пряности, копчение — всё по классике. Без добавок.',
	},
	{
		id: 3,
		title: 'Скумбрия копчёная',
		image: '/images/skumbria.jpg',
		price: '700₺ / кг',
		description:
			'Нежная скумбрия горячего копчения. Сочный вкус, натуральное приготовление.',
	},
]

const ProductCard = ({ product }) => {
	const [flipped, setFlipped] = useState(false)

	const handleWhatsAppClick = () => {
		const message = `Здравствуйте, я хочу заказать ${product.title}`
		const phoneNumber = '905444558407'
		const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
			message
		)}`
		window.open(url, '_blank')
	}

	return (
		<div
			onClick={() => setFlipped(!flipped)}
			className={`product-card ${flipped ? 'flipped' : ''}`}
		>
			{/* Front Side */}
			<div className='product-card-front'>
				<img
					src={product.image}
					alt={product.title}
					className='product-image'
				/>
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
