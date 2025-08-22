import { motion } from 'framer-motion'
import { Clock, Heart, ShieldCheck } from 'lucide-react'

const benefits = [
	{
		icon: Clock,
		title: 'Time-to-hire',
		description:
			'Shorten cycles with calibrated scorecards, sourcing ops, and async scheduling.',
		stat: '60% faster',
	},
	{
		icon: Heart,
		title: 'Retention',
		description:
			'Onboarding playbooks and growth frameworks keep talent engaged and thriving.',
		stat: '92% retention',
	},
	{
		icon: ShieldCheck,
		title: 'Governance',
		description:
			'Audit-ready documentation and policy templates reduce org risk.',
		stat: '100% compliant',
	},
]

export default function WhyUs() {
	return (
		<section
			id="why-us"
			className="section-padding scroll-mt-24 bg-dark-900/50"
		>
			<div className="container">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center mb-16"
				>
					<div className="inline-flex items-center px-4 py-2 bg-accent-500/10 border border-accent-500/20 rounded-full text-sm font-medium text-accent-400 mb-6">
						Why choose us
					</div>
					<h2 className="heading-2 mb-6">
						Compliance-first, human-centered,{' '}
						<span className="gradient-text">data-aware</span>
					</h2>
					<p className="body-large text-gray-300 max-w-3xl mx-auto">
						We combine deep HR expertise with modern technology to deliver
						measurable results that scale with your business.
					</p>
				</motion.div>

				<div className="grid md:grid-cols-3 gap-8">
					{benefits.map((benefit, index) => (
						<motion.div
							key={benefit.title}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							whileHover={{ y: -6 }}
							className="glass-card p-8 text-center card-hover group will-change-transform"
						>
							<div className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 bg-gradient-to-br from-white/8 to-white/0 border border-white/10 shadow-inner">
								<benefit.icon className="w-7 h-7 text-primary-300" />
							</div>

							<h3 className="heading-4 mb-4 text-white">
								{benefit.title}
							</h3>
							<p className="body-base text-gray-300 mb-6">
								{benefit.description}
							</p>

							<div className="text-2xl font-bold gradient-text">
								{benefit.stat}
							</div>
						</motion.div>
					))}
				</div>

				{/* Bottom CTA */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="text-center mt-16"
				>
					<div className="glass-card p-8 max-w-2xl mx-auto">
						<h3 className="heading-3 mb-4 text-white">
							Ready to transform your HR operations?
						</h3>
						<p className="body-base text-gray-300 mb-6">
							Join hundreds of companies that trust Future & Fortune for their
							people operations.
						</p>
						<a
							href="#contact"
							className="btn-primary"
							onClick={(e) => {
								if (!'#contact'.startsWith('#')) return
								e.preventDefault()
								const section = document.getElementById('contact')
								if (!section) return
								const nav = document.querySelector('nav')
								const navHeight = nav?.offsetHeight || 0
								const anchor =
									section.querySelector('[data-anchor], h1, h2, h3') ||
									section
								const rect = anchor.getBoundingClientRect()
								const pageY = rect.top + window.pageYOffset
								const y = pageY - (navHeight + 16)
								window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
							}}
						>
							Get started today
						</a>
					</div>
				</motion.div>
			</div>
		</section>
	)
}
