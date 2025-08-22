import { motion } from 'framer-motion'
import { Mail, Phone, Linkedin, Twitter, MessageCircle } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  // Smooth scroll with offset identical to navbar behavior
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

  const footerLinks = [
    {
      title: 'Services',
      links: [
        { name: 'Recruitment', href: '#services' },
        { name: 'HR Management', href: '#services' },
        { name: 'HR Consultation', href: '#services' },
        { name: 'HR Advisory', href: '#services' },
        { name: 'Corporate Gifting', href: '#services' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About', href: '#why-us' },
        { name: 'Process', href: '#process' },
        { name: 'FAQ', href: '#faq' },
        { name: 'Contact', href: '#contact' }
      ]
    }
  ]

  const socialLinks = [
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/future-fortune-solutions/', icon: Linkedin },
    // { name: 'Twitter', href: 'https://twitter.com/futureandfortune', icon: Twitter }
  ]

  return (
    <footer className="bg-dark-900/80 border-t border-white/10 mt-20">
      <div className="container">
        {/* Main footer content */}
        <div className="py-12">
          <div className="grid lg:grid-cols-4 gap-10">
            {/* Brand card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-black">F&F</span>
                </div>
                <span className="text-xl font-bold text-white">Future & Fortune</span>
              </div>
              <p className="text-gray-300 mb-5">
                Hire smarter. Build compliant HR. Elevate culture. We help modern companies build exceptional people operations.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3"><Mail className="w-5 h-5 text-primary-400" /><a href="mailto:hr@futureandfortune.in" className="text-gray-300 hover:text-primary-400">hr@futureandfortune.in</a></div>
                <div className="flex items-center gap-3"><Phone className="w-5 h-5 text-primary-400" /><a href="tel:+917506125291" className="text-gray-300 hover:text-primary-400">+91 75061 25291 / +91 70831 07764</a></div>
                <div className="flex gap-3 pt-2">
                  {socialLinks.map((s) => (
                    <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10">
                      <s.icon className="w-5 h-5 text-gray-400" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Quick links */}
            {footerLinks.map((section, idx) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <h3 className="font-semibold text-white mb-4">{section.title}</h3>
                <ul className="grid grid-cols-1 gap-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a href={link.href} className="text-gray-400 hover:text-primary-400" onClick={(e) => scrollWithOffset(e, link.href)}>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom bar with actions on mobile */}
        <div className="py-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center sm:justify-between">
            <p className="text-gray-400 text-sm">© {currentYear} Future & Fortune. All rights reserved.</p>
            {/* <div className="flex flex-col sm:flex-row gap-3">
              <a href="#contact" className="btn-primary inline-flex justify-center" onClick={(e) => scrollWithOffset(e, '#contact')}>Contact</a>
              <a href="https://wa.me/919137714543" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700">
                <MessageCircle className="w-5 h-5" /> WhatsApp
              </a>
            </div> */}
          </div>
          <div className="mt-4 flex gap-6 text-sm text-gray-400">
            <a href="/privacy" className="hover:text-primary-400">Privacy Policy</a>
            <a href="/terms" className="hover:text-primary-400">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
