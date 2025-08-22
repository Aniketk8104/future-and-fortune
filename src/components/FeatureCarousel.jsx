import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Users, ShieldCheck, Gift, Workflow } from 'lucide-react'

const slides = [
	{
		tag: 'Recruitment',
		title: 'Time-to-hire, slashed',
		desc: 'Calibrated scorecards, sourcing ops, async scheduling — faster, better hires.',
		icon: Users,
		color: 'from-primary-500 to-secondary-500',
	},
	{
		tag: 'HR Ops',
		title: 'Compliance, made calm',
		desc: 'Policies, audits, and documentation that scale across regions without chaos.',
		icon: ShieldCheck,
		color: 'from-sky-500 to-cyan-500',
	},
	{
		tag: 'Advisory',
		title: 'People strategy that sticks',
		desc: 'Org design, compensation, and culture programs to retain your best teams.',
		icon: Workflow,
		color: 'from-violet-500 to-fuchsia-500',
	},
	{
		tag: 'Gifting',
		title: 'Moments employees remember',
		desc: 'Curated corporate gifting that actually delights — on-brand and on-time.',
		icon: Gift,
		color: 'from-amber-500 to-rose-500',
	},
]

export default function FeatureCarousel() {
	const scrollerRef = useRef(null)
	const [index, setIndex] = useState(0)

	// Smooth scroll with navbar offset
	const scrollWithOffset = (href) => {
		if (!href?.startsWith('#')) return
		const id = href.slice(1)
		const section = document.getElementById(id)
		if (!section) return
		const cssVar = parseFloat(
			getComputedStyle(document.documentElement).getPropertyValue('--nav-height')
		)
		const nav = document.querySelector('nav')
		const navHeight = nav?.offsetHeight || cssVar
		const anchor = section.querySelector('[data-anchor], h1, h2, h3') || section
		const rect = anchor.getBoundingClientRect()
		const pageY = rect.top + window.pageYOffset
		const y = pageY - (navHeight + 24)
		window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
	}

	useEffect(() => {
		const el = scrollerRef.current
		if (!el) return

		const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
		if (prefersReduced) return

		let timer
		const children = Array.from(el.querySelectorAll('[data-slide]'))

		const start = () => {
			stop()
			timer = setInterval(() => {
				const next = (indexRef.current + 1) % children.length
				goTo(next)
			}, 3500)
		}
		const stop = () => timer && clearInterval(timer)

		const indexRef = { current: 0 }
		const goTo = (i) => {
			indexRef.current = i
			setIndex(i)
			const slideEl = children[i]
			if (!slideEl) return
			el.scrollTo({ left: slideEl.offsetLeft - 16, behavior: 'smooth' })
		}

		// Sync index on manual scroll
		const onScroll = () => {
			const scrollLeft = el.scrollLeft
			let closest = 0
			let minDist = Infinity
			children.forEach((child, i) => {
				const dist = Math.abs(child.offsetLeft - scrollLeft)
				if (dist < minDist) {
					minDist = dist
					closest = i
				}
			})
			setIndex(closest)
			indexRef.current = closest
		}

		el.addEventListener('scroll', onScroll, { passive: true })
		el.addEventListener('touchstart', stop, { passive: true })
		el.addEventListener('mouseenter', stop)
		el.addEventListener('mouseleave', start)
		start()
		return () => {
			stop()
			el.removeEventListener('scroll', onScroll)
			el.removeEventListener('touchstart', stop)
			el.removeEventListener('mouseenter', stop)
			el.removeEventListener('mouseleave', start)
		}
	}, [])

	return (
		<section className="section-padding pt-8 -mt-6">
			<div className="container">
				<div className="mb-6 flex items-center justify-between">
					<h3 className="heading-3">What we unlock</h3>
					<div className="hidden sm:flex items-center gap-2 text-xs text-gray-400">
						<span>{index + 1}</span>
						<span className="opacity-40">/</span>
						<span>{slides.length}</span>
					</div>
				</div>

				<div
					ref={scrollerRef}
					className="relative overflow-x-auto no-scrollbar mask-edge-x scroll-smooth"
				>
					<div className="flex gap-4 sm:gap-6 px-1">
						{slides.map((s, i) => (
							<motion.article
								key={s.title}
								data-slide
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.4, delay: i * 0.05 }}
								whileHover={{ y: -6 }}
								className="relative min-w-[88%] sm:min-w-[60%] lg:min-w-[32%] glass-card p-5 sm:p-6 group"
							>
								<div
									className={`absolute -inset-px rounded-2xl pointer-events-none bg-gradient-to-r ${s.color} opacity-20`}
								/>
								<div className="relative z-10">
									<div className="inline-flex items-center gap-2 text-xs text-white/70 mb-3">
										<span
											className={`inline-flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br ${s.color} text-white ring-1 ring-white/10`}
										>
											<s.icon className="w-3.5 h-3.5" />
										</span>
										<span className="uppercase tracking-wide">{s.tag}</span>
									</div>
									<h4 className="text-xl sm:text-2xl font-semibold mb-2">
										{s.title}
									</h4>
									<p className="text-gray-300 mb-4">{s.desc}</p>
									<a
										href="#contact"
										onClick={(e) => {
											e.preventDefault()
											scrollWithOffset('#contact')
										}}
										className="inline-flex text-primary-300 hover:text-primary-200 font-medium"
									>
										Learn more →
									</a>
								</div>
							</motion.article>
						))}
					</div>
				</div>

				{/* Dots */}
				<div className="mt-5 flex justify-center gap-2">
					{slides.map((_, i) => (
						<button
							key={i}
							aria-label={`Go to slide ${i + 1}`}
							className={`h-2 w-2 rounded-full transition-all ${
								i === index ? 'bg-primary-400 w-6' : 'bg-white/20'
							}`}
							onClick={() => {
								const el = scrollerRef.current
								const child = el?.querySelectorAll('[data-slide]')[i]
								if (el && child)
									el.scrollTo({ left: child.offsetLeft - 16, behavior: 'smooth' })
							}}
						/>
					))}
				</div>
			</div>
		</section>
	)
}
