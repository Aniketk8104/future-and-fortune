import { motion } from 'framer-motion'
import { Users, FileText, MessageCircle, Shield, Gift } from 'lucide-react'

const services = [
	{
		icon: Users,
		title: 'Recruitment',
		description: 'End-to-end talent acquisition: role scoping, sourcing, interviews, and offers.',
		features: ['Tech & non-tech hiring', 'Executive search', 'Interview design & scorecards'],
	},
	{
		icon: FileText,
		title: 'HR Management',
		description: 'Build compliant, efficient HR systems that scale with your company.',
		features: ['Policies, handbooks, SOPs', 'Payroll coordination & attendance', 'Performance & OKRs'],
	},
	{
		icon: MessageCircle,
		title: 'HR Consultation',
		description: 'Strategy and operating models for people, culture, and growth.',
		features: ['Org design & capacity planning', 'Compensation benchmarking', 'Learning & development'],
	},
	{
		icon: Shield,
		title: 'HR Advisory',
		description: 'Compliance-first guidance that keeps your org risk-aware and audit-ready.',
		features: ['Local labor law alignment', 'Policy reviews & audits', 'ER & grievance frameworks'],
	},
	{
		icon: Gift,
		title: 'Corporate Gifting',
		description: 'Curated, on-brand gifting programs that delight candidates and employees.',
		features: ['Welcome kits & swag ops', 'Milestone & festival gifts', 'Global logistics & personalization'],
	},
]

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

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
							<div className="flex items-center justify-between mb-6">
								<div className="p-3 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-xl">
									<service.icon className="w-6 h-6 text-primary-400" />
								</div>
								<div className="w-12 h-12 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
									<div className="w-2 h-2 bg-primary-400 rounded-full" />
								</div>
							</div>

							<h3 className="heading-4 mb-4 text-white">{service.title}</h3>
							<p className="body-base text-gray-300 mb-6">{service.description}</p>

							<ul className="space-y-2">
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
