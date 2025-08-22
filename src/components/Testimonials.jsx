import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const testimonials = [
	{
		name: 'Sarah Chen',
		role: 'CEO',
		company: 'TechFlow Inc.',
		avatar:
			'https://images.unsplash.com/photo-1494790108755-2616b612b2b5?w=150&h=150&fit=crop&crop=face',
		content:
			'Future & Fortune transformed our hiring process. We went from 60-day cycles to consistent 15-day placements with higher quality candidates.',
		rating: 5,
	},
	{
		name: 'Marcus Johnson',
		role: 'Head of People',
		company: 'Scale Dynamics',
		avatar:
			'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
		content:
			'Their HR advisory service helped us navigate compliance challenges during our international expansion. Absolutely invaluable.',
		rating: 5,
	},
	{
		name: 'Priya Patel',
		role: 'Founder',
		company: 'InnovateX',
		avatar:
			'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
		content:
			'The corporate gifting program boosted our employee satisfaction scores by 40%. Our team actually looks forward to company milestones now.',
		rating: 5,
	},
]

export default function Testimonials() {
	const trackRef = useRef(null)
	const [idx, setIdx] = useState(0)

	useEffect(() => {
		const el = trackRef.current
		if (!el) return

		const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
		if (prefersReduced) return

		const isMobile = () => window.innerWidth < 768
		let timer

		const start = () => {
			if (!isMobile()) return
			stop()
			timer = setInterval(() => {
				setIdx((prev) => {
					const next = prev + 1
					const w = el.clientWidth
					const children = el.querySelectorAll('[data-slide]')
					const count = children.length
					const target = (next % count) * w
					el.scrollTo({ left: target, behavior: 'smooth' })
					return next % count
				})
			}, 4000)
		}
		const stop = () => timer && clearInterval(timer)

		const onResize = () => {
			stop(); start()
		}

		start()
		window.addEventListener('resize', onResize)
		el.addEventListener('touchstart', stop, { passive: true })
		el.addEventListener('mouseenter', stop)
		el.addEventListener('mouseleave', start)
		return () => {
			stop()
			window.removeEventListener('resize', onResize)
			el.removeEventListener('touchstart', stop)
			el.removeEventListener('mouseenter', stop)
			el.removeEventListener('mouseleave', start)
		}
	}, [])

	return (
		<section className="section-padding">
			<div className="container">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center mb-16"
				>
					<div className="inline-flex items-center px-4 py-2 bg-secondary-500/10 border border-secondary-500/20 rounded-full text-sm font-medium text-secondary-400 mb-6">
						Client stories
					</div>
					<h2 className="heading-2 mb-6">Trusted by growing companies</h2>
					<p className="body-large text-gray-300 max-w-3xl mx-auto">
						See how Future & Fortune has helped organizations build better people
						operations and achieve their growth goals.
					</p>
				</motion.div>

				{/* Mobile carousel */}
				<div className="md:hidden">
					<div
						ref={trackRef}
						className="w-full overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory"
						aria-roledescription="carousel"
						aria-label="Testimonials"
					>
						<div className="flex">
							{testimonials.map((testimonial, index) => (
								<div
									key={testimonial.name}
									data-slide
									className="min-w-full snap-center px-1"
									role="group"
									aria-roledescription="slide"
									aria-label={`${index + 1} of ${testimonials.length}`}
								>
									<motion.div
										initial={{ opacity: 0, y: 30 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.6 }}
										whileHover={{ y: -6, boxShadow: '0 16px 32px rgba(168,85,247,0.12)' }}
										whileTap={{ scale: 0.98 }}
										className="glass-card p-8 card-hover will-change-transform"
									>
										<div className="flex justify-between items-start mb-6">
											<Quote className="w-8 h-8 text-primary-400 opacity-50" />
											<div className="flex gap-1">
												{Array.from({ length: testimonial.rating }).map((_, i) => (
													<Star key={i} className="w-4 h-4 fill-accent-400 text-accent-400" />
												))}
											</div>
										</div>
										<blockquote className="body-base text-gray-300 mb-6 leading-relaxed">
											"{testimonial.content}"
										</blockquote>
										<div className="flex items-center gap-4">
											<img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-500/20" />
											<div>
												<div className="font-semibold text-white">{testimonial.name}</div>
												<div className="text-sm text-gray-400">{testimonial.role} at {testimonial.company}</div>
											</div>
										</div>
									</motion.div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Desktop grid */}
				<div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
					{testimonials.map((testimonial, index) => (
						<motion.div
							key={testimonial.name}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							whileHover={{ y: -6, boxShadow: '0 16px 32px rgba(168,85,247,0.12)' }}
							whileTap={{ scale: 0.98 }}
							className="glass-card p-8 card-hover will-change-transform"
						>
							<div className="flex justify-between items-start mb-6">
								<Quote className="w-8 h-8 text-primary-400 opacity-50" />
								<div className="flex gap-1">
									{Array.from({ length: testimonial.rating }).map((_, i) => (
										<Star key={i} className="w-4 h-4 fill-accent-400 text-accent-400" />
									))}
								</div>
							</div>
							<blockquote className="body-base text-gray-300 mb-6 leading-relaxed">
								"{testimonial.content}"
							</blockquote>
							<div className="flex items-center gap-4">
								<img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-500/20" />
								<div>
									<div className="font-semibold text-white">{testimonial.name}</div>
									<div className="text-sm text-gray-400">{testimonial.role} at {testimonial.company}</div>
								</div>
							</div>
						</motion.div>
					))}
				</div>

				{/* Trust indicators: marquee */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="mt-16 pt-10 border-t border-white/10"
				>
					<p className="text-center text-gray-400 mb-6">Trusted by companies of all sizes</p>
					<div className="relative overflow-hidden mask-edge-x group">
						<div className="flex items-center gap-12 whitespace-nowrap animate-marquee will-change-transform">
							{['TechFlow','Scale Dynamics','InnovateX','GrowthCorp','NextGen','ByteBridge','NovaWorks'].map((name) => (
								<span key={`a-${name}`} className="text-2xl sm:text-3xl font-bold text-gray-500/70 hover:text-gray-400 transition-colors select-none">
									{name}
								</span>
							))}
							{/* duplicate for seamless loop */}
							{['TechFlow','Scale Dynamics','InnovateX','GrowthCorp','NextGen','ByteBridge','NovaWorks'].map((name) => (
								<span key={`b-${name}`} className="text-2xl sm:text-3xl font-bold text-gray-500/70 hover:text-gray-400 transition-colors select-none">
									{name}
								</span>
							))}
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	)
}
