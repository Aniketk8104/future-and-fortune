import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
	{ number: 50, suffix: '+', label: 'Happy clients' },
	{ number: 95, suffix: '%', label: 'Offer acceptance' },
	{ number: 20, suffix: ' days', label: 'Avg time-to-fill roles' },
	{ number: 12, suffix: '+ years', label: 'Combined expertise' },
]

function Counter({ number, suffix, duration = 1.8 }) {
	const [count, setCount] = useState(0)
	const ref = useRef(null)
	const inView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' })

	useEffect(() => {
		const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
		const el = ref.current
		const visibleFallback = () => {
			if (!el) return false
			const rect = el.getBoundingClientRect()
			return rect.top < window.innerHeight - 40 && rect.bottom > 40
		}

		if (prefersReduced) {
			setCount(number)
			return
		}

		if (!inView && !visibleFallback()) return

		let start = 0
		const end = parseInt(number)
		const totalFrames = Math.max(1, Math.round(duration * 60))
		let frame = 0
		const step = () => {
			frame += 1
			start = Math.round((end * frame) / totalFrames)
			setCount(Math.min(end, start))
			if (frame < totalFrames) requestAnimationFrame(step)
		}
		requestAnimationFrame(step)
	}, [inView, number, duration])

	return (
		<span ref={ref} className="gradient-text tabular-nums">
			{count}
			{suffix}
		</span>
	)
}

export default function Stats() {
	return (
		<section className="section-padding">
			<div className="container">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center mb-12"
				>
					<div className="inline-flex items-center px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full text-sm font-medium text-primary-400 mb-4">
						Our impact
					</div>
					<h2 className="heading-2 mb-4">Numbers that speak volumes</h2>
					<p className="text-gray-300 max-w-2xl mx-auto">
						Results from helping companies build better people operations and hire exceptional talent.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
					{stats.map((stat, index) => (
						<motion.div
							key={stat.label}
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: index * 0.08 }}
							className="glass-card p-5 sm:p-6"
						>
							<div className="text-3xl lg:text-4xl font-bold mb-2">
								<Counter number={stat.number} suffix={stat.suffix} />
							</div>
							<p className="text-gray-400 font-medium">{stat.label}</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}