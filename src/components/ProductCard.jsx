import { useState } from 'react'

export default function ProductCard({ product }) {
	const [flipped, setFlipped] = useState(false)

	return (
		<div
			className='w-72 h-96 [perspective:1000px] cursor-pointer'
			onClick={() => setFlipped(!flipped)}
		>
			<div
				className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
					flipped ? 'rotate-y-180' : ''
				}`}
			>
				{/* Front */}
				<div className='absolute w-full h-full bg-white rounded-2xl shadow-lg backface-hidden'>
					<img
						src={product.image}
						alt={product.title}
						className='w-full h-2/3 object-cover rounded-t-2xl'
					/>
					<div className='p-4'>
						<h2 className='text-lg font-bold'>{product.title}</h2>
						<p className='text-sm text-gray-600'>{product.price}</p>
					</div>
				</div>

				{/* Back */}
				<div className='absolute w-full h-full bg-white rounded-2xl shadow-lg rotate-y-180 backface-hidden p-4'>
					<h3 className='text-md font-semibold mb-2'>Описание</h3>
					<p className='text-sm text-gray-700'>{product.description}</p>
				</div>
			</div>
		</div>
	)
}
