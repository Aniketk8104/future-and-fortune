import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
	{
		question: 'What industries do you serve?',
		answer: 'We work with startups, SMBs, and enterprises across tech, finance, healthcare, and more. Our expertise spans diverse sectors, allowing us to understand unique industry challenges and compliance requirements.',
	},
	{
		question: 'How quickly can you fill open positions?',
		answer: 'Our average time-to-hire is 15 days, significantly faster than industry standards. This is achieved through our extensive network, pre-screened candidate pools, and streamlined interview processes.',
	},
	{
		question: 'Do you handle HR compliance globally?',
		answer: 'Yes, we advise on compliant policies, documentation, and audits tailored to your region. We stay current with labor laws across multiple jurisdictions and can help you navigate complex regulatory landscapes.',
	},
	{
		question: 'Can you work alongside our in-house HR team?',
		answer: 'Absolutely. We can augment your internal teams or own the function end-to-end. We\'re flexible and adapt to your organizational structure and existing processes.',
	},
	{
		question: 'What makes your corporate gifting different?',
		answer: 'Our corporate gifting goes beyond generic swag. We create curated, meaningful experiences that align with your brand and values, from welcome kits to milestone celebrations, all managed globally.',
	},
	{
		question: 'How do you measure success?',
		answer: 'We track key metrics including time-to-hire, candidate quality scores, retention rates, and client satisfaction. We provide regular dashboards and reports to ensure transparency and continuous improvement.',
	},
]

function FAQItem({ faq, index, isOpen, onToggle }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6, delay: index * 0.1 }}
			className="glass-card overflow-hidden"
		>
			<button
				onClick={() => onToggle(index)}
				className="w-full px-8 py-6 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
				aria-expanded={isOpen}
			>
				<h3 className="heading-4 text-white pr-8">{faq.question}</h3>
				<div className="flex-shrink-0 text-primary-400">
					{isOpen ? (
						<Minus className="w-6 h-6 transition-transform duration-200" />
					) : (
						<Plus className="w-6 h-6 transition-transform duration-200" />
					)}
				</div>
			</button>

			<AnimatePresence initial={false}>
				{isOpen && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.3, ease: 'easeInOut' }}
						className="overflow-hidden"
					>
						<div className="px-8 pb-6">
							<p className="body-base text-gray-300 leading-relaxed">
								{faq.answer}
							</p>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	)
}

export default function FAQ() {
	const [openIndex, setOpenIndex] = useState(null)

	const handleToggle = (index) => {
		setOpenIndex(openIndex === index ? null : index)
	}

	const scrollWithOffset = (e, href) => {
		if (!href?.startsWith('#')) return
		const id = href.slice(1)
		const section = document.getElementById(id)
		if (!section) return
		e?.preventDefault?.()
		const nav = document.querySelector('nav')
		const navHeight = nav?.offsetHeight || 0
		const anchor = section.querySelector('[data-anchor], h1, h2, h3') || section
		const rect = anchor.getBoundingClientRect()
		const pageY = rect.top + window.pageYOffset
		const y = pageY - (navHeight + 16)
		window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
	}

	return (
		<section id="faq" className="section-padding scroll-mt-24 bg-dark-900/50">
			<div className="container">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center mb-16"
				>
					<div className="inline-flex items-center px-4 py-2 bg-accent-500/10 border border-accent-500/20 rounded-full text-sm font-medium text-accent-400 mb-6">
						FAQ
					</div>
					<h2 className="heading-2 mb-6">Answers to common questions</h2>
					<p className="body-large text-gray-300 max-w-3xl mx-auto">
						Get clarity on our services, process, and how we can help your
						organization grow.
					</p>
				</motion.div>

				<div className="max-w-3xl mx-auto space-y-4">
					{faqs.map((faq, index) => (
						<FAQItem
							key={index}
							faq={faq}
							index={index}
							isOpen={openIndex === index}
							onToggle={handleToggle}
						/>
					))}
				</div>

				{/* Bottom CTA */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.3 }}
					className="text-center mt-16"
				>
					<div className="glass-card p-8 max-w-2xl mx-auto">
						<h3 className="heading-3 mb-4 text-white">
							Still have questions?
						</h3>
						<p className="body-base text-gray-300 mb-6">
							We're here to help. Reach out and we'll get back to you within 24
							hours.
						</p>
						<a href="#contact" className="btn-primary" onClick={(e) => scrollWithOffset(e, '#contact')}>
							Contact us
						</a>
					</div>
				</motion.div>
			</div>
		</section>
	)
}
