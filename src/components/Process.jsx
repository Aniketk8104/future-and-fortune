import { motion } from 'framer-motion'
import { Search, Zap, BarChart } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const steps = [
	{
		number: '01',
		icon: Search,
		title: 'Discovery & mapping',
		description:
			'We align on goals, constraints, and success metrics. Quick win plan + roadmap.',
	},
	{
		number: '02',
		icon: Zap,
		title: 'Execution sprints',
		description:
			'Recruitment pipelines, HR ops setup, and gifting workflows — delivered in agile sprints.',
	},
	{
		number: '03',
		icon: BarChart,
		title: 'Review & scale',
		description:
			'Dashboards, SLA tracking, and continuous optimization for retention and engagement.',
	},
]

export default function Process() {
	// Auto-scroll carousel for mobile
	const scrollerRef = useRef(null)
	const [index, setIndex] = useState(0)

	useEffect(() => {
		const el = scrollerRef.current
		if (!el) return

		const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
		if (prefersReduced) return

		// only run on mobile widths
		const isMobile = () => window.innerWidth < 768
		let timer

		const start = () => {
			if (!isMobile()) return
			stop()
			timer = setInterval(() => {
				setIndex((prev) => {
					const next = (prev + 1) % steps.length
					const w = el.clientWidth
					el.scrollTo({ left: next * w, behavior: 'smooth' })
					return next
				})
			}, 3500)
		}
		const stop = () => {
			if (timer) clearInterval(timer)
		}

		const onResize = () => {
			stop()
			start()
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
		<section id="process" className="section-padding scroll-mt-24">
			<div className="container">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center mb-16"
				>
					<div className="inline-flex items-center px-4 py-2 bg-secondary-500/10 border border-secondary-500/20 rounded-full text-sm font-medium text-secondary-400 mb-6">
						How we work
					</div>
					<h2 className="heading-2 mb-6">Proven process</h2>
					<p className="body-large text-gray-300 max-w-3xl mx-auto">
						Our structured approach ensures successful outcomes through discovery,
						execution, and continuous optimization.
					</p>
				</motion.div>

				{/* Mobile carousel */}
				<div className="md:hidden">
					<div
						ref={scrollerRef}
						className="w-full overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory"
						aria-roledescription="carousel"
						aria-label="Process steps"
					>
						<div className="flex">
							{steps.map((step, i) => (
								<div
									key={step.number}
									className="min-w-full snap-center px-1"
									role="group"
									aria-roledescription="slide"
									aria-label={`${i + 1} of ${steps.length}`}
								>
									<motion.div
										initial={{ opacity: 0, y: 30 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.5 }}
										className="text-center relative glass-card p-6 mx-2 group"
									>
										<span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/12 via-secondary-500/12 to-accent-500/12 opacity-0 group-hover:opacity-100 transition" />
										<div className="relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full text-white font-bold text-lg mb-6 mx-auto">
											<div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full animate-pulse opacity-20" />
											<span className="relative z-10">{step.number}</span>
										</div>
										<h3 className="heading-4 mb-4 text-white relative z-10">{step.title}</h3>
										<p className="body-base text-gray-300 relative z-10">{step.description}</p>
									</motion.div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Desktop grid */}
				<div className="hidden md:block max-w-4xl mx-auto">
					<div className="relative">
						{/* Connection line */}
						<div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500" />

						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
							{steps.map((step, index) => (
								<motion.div
									key={step.number}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.6, delay: index * 0.2 }}
									className="text-center relative glass-card p-6 group"
								>
									<span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/12 via-secondary-500/12 to-accent-500/12 opacity-0 group-hover:opacity-100 transition" />
									{/* Step number circle */}
									<div className="relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full text-white font-bold text-lg mb-6 mx-auto">
										<div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full animate-pulse opacity-20" />
										<span className="relative z-10">{step.number}</span>
									</div>

									<h3 className="heading-4 mb-4 text-white relative z-10">
										{step.title}
									</h3>
									<p className="body-base text-gray-300 relative z-10">
										{step.description}
									</p>
								</motion.div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
