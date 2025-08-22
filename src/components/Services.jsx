import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { Users, FileText, MessageCircle, Shield, Gift } from 'lucide-react'

const services = [
	{
		icon: Users,
		title: 'Recruitment',
		description: 'End-to-end talent acquisition: role scoping, sourcing, interviews, and offers.',
		features: ['Tech & non-tech hiring', 'Executive search', 'Interview design & scorecards'],
		img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80&auto=format&fit=crop',
	},
	{
		icon: FileText,
		title: 'HR Management',
		description: 'Build compliant, efficient HR systems that scale with your company.',
		features: ['Policies, handbooks, SOPs', 'Payroll coordination & attendance', 'Performance & OKRs'],
		img: 'https://images.unsplash.com/photo-1529336953121-a0ce61a8d526?w=1600&q=80&auto=format&fit=crop',
	},
	{
		icon: MessageCircle,
		title: 'HR Consultation',
		description: 'Strategy and operating models for people, culture, and growth.',
		features: ['Org design & capacity planning', 'Compensation benchmarking', 'Learning & development'],
		img: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=80&auto=format&fit=crop',
	},
	{
		icon: Shield,
		title: 'HR Advisory',
		description: 'Compliance-first guidance that keeps your org risk-aware and audit-ready.',
		features: ['Local labor law alignment', 'Policy reviews & audits', 'ER & grievance frameworks'],
		img: 'https://images.unsplash.com/photo-1523246191815-4fdff97f7a8a?w=1600&q=80&auto=format&fit=crop',
	},
	{
		icon: Gift,
		title: 'Corporate Gifting',
		description: 'Curated, on-brand gifting programs that delight candidates and employees.',
		features: ['Welcome kits & swag ops', 'Milestone & festival gifts', 'Global logistics & personalization'],
		img: 'https://images.unsplash.com/photo-1513097847644-f00cfe868607?w=1600&q=80&auto=format&fit=crop',
	},
]

function MobileServiceCard({ service }) {
	const prefersReduced = useReducedMotion()
	const ref = useRef(null)
	const { scrollYProgress } = useScroll({ target: ref, offset: ['start 65%', 'end 35%'] })
	const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.96])
	const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.65, 1, 0.65])
	const yImg = useTransform(scrollYProgress, [0, 1], [-10, 10])

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 24 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: false, margin: '0px 0px -30% 0px' }}
			transition={{ duration: 0.35, ease: 'easeOut' }}
			className="relative glass-card p-6 mx-1 snap-center overflow-hidden will-change-transform"
			style={prefersReduced ? undefined : { scale, opacity }}
		>
			{/* Subtle image background */}
			<motion.img
				src={service.img}
				alt=""
				aria-hidden="true"
				loading="lazy"
				decoding="async"
				className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-luminosity"
				style={prefersReduced ? undefined : { y: yImg, scale: 1.06 }}
			/>
			<div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />

			{/* Foreground content */}
			<div className="relative z-10">
				<div className="flex items-center gap-3 mb-4">
					<div className="p-3 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-xl ring-1 ring-white/10">
						<service.icon className="w-6 h-6 text-primary-300" />
					</div>
					<h3 className="text-xl font-semibold text-white">{service.title}</h3>
				</div>
				<p className="text-gray-300 mb-4">{service.description}</p>
				<ul className="space-y-2">
					{service.features.map((f, idx) => (
						<li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
							<div className="w-1.5 h-1.5 bg-primary-400 rounded-full mt-2 flex-shrink-0" />
							{f}
						</li>
					))}
				</ul>
			</div>
		</motion.div>
	)
}

export default function Services() {
	return (
		<section id="services" className="section-padding scroll-mt-24 bg-dark-900/50">
			<div className="container">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center mb-16"
				>
					<div className="inline-flex items-center px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full text-sm font-medium text-primary-400 mb-6">
						What we do
					</div>
					<h2 className="heading-2 mb-6">Services tailored to outcomes</h2>
					<p className="body-large text-gray-300 max-w-3xl mx-auto">
						From hiring the right talent to building scalable HR operations and unforgettable corporate gifting.
					</p>
				</motion.div>

				{/* Mobile: page scroll with edge fades (no nested scroller) */}
				<div className="md:hidden relative">
					<div className="space-y-4">
						{services.map((service) => (
							<MobileServiceCard key={service.title} service={service} />
						))}
					</div>
					{/* keep only a subtle top fade; remove bottom fade to avoid black line */}
					<div className="pointer-events-none absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/40 to-transparent" />
				</div>

				{/* Desktop grid */}
				<div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
					{services.map((service, index) => (
						<motion.div
							key={service.title}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							whileHover={{ y: -8, rotateX: 1.5, rotateY: -1.5, boxShadow: '0 20px 40px rgba(14,165,233,0.15)' }}
							whileTap={{ scale: 0.98 }}
							className="glass-card p-8 card-hover group will-change-transform"
						>
							<div className="flex items-center justify-between mb-6 relative z-10">
								<div className="p-3 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-xl ring-1 ring-white/10">
									<service.icon className="w-6 h-6 text-primary-300" />
								</div>
								<div className="w-12 h-12 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
									<div className="w-2 h-2 bg-primary-400 rounded-full" />
								</div>
							</div>

							<h3 className="heading-4 mb-4 text-white relative z-10">{service.title}</h3>
							<p className="body-base text-gray-300 mb-6 relative z-10">{service.description}</p>

							<ul className="space-y-2 relative z-10">
								{service.features.map((feature, featureIndex) => (
									<li key={featureIndex} className="flex items-start gap-2 text-sm text-gray-400">
										<div className="w-1.5 h-1.5 bg-primary-400 rounded-full mt-2 flex-shrink-0" />
										{feature}
									</li>
								))}
							</ul>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}
