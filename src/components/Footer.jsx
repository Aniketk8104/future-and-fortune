import { motion } from 'framer-motion'
import { Mail, Phone, Linkedin } from 'lucide-react'
import Logo from './Logo'

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
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/future-fortune-solutions/', icon: Linkedin }
  ]

  return (
    <footer className="relative bg-dark-900/80 border-t border-white/10 mt-20 overflow-hidden">
      {/* subtle glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[120%] h-48 bg-gradient-to-b from-primary-500/10 to-transparent blur-3xl" />

      <div className="container">
        {/* Main footer content */}
        <div className="pb-10 pt-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Brand / About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-6 glass-card p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Logo className="h-8 w-auto" />
                <span className="sr-only">Future & Fortune</span>
              </div>
              <p className="text-gray-300 mb-5">
                Hire smarter. Build compliant HR. Elevate culture. We help modern companies build exceptional people operations.
              </p>

              {/* Aligned contact rows */}
              <div className="space-y-3">
                <a href="mailto:hr@futureandfortune.in" className="flex items-center gap-3 text-gray-300 hover:text-primary-400">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-white/10">
                    <Mail className="w-5 h-5 text-primary-400" />
                  </span>
                  <span className="leading-normal">hr@futureandfortune.in</span>
                </a>
                <a href="tel:+917506125291" className="flex items-center gap-3 text-gray-300 hover:text-primary-400">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-white/10">
                    <Phone className="w-5 h-5 text-primary-400" />
                  </span>
                  <span className="leading-normal">+91 75061 25291 / +91 70831 07764</span>
                </a>
                <div className="flex gap-3 pt-1">
                  <a href="https://www.linkedin.com/company/future-fortune-solutions/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-9 h-9 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10">
                    <Linkedin className="w-5 h-5 text-gray-300" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Links columns */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="lg:col-span-3"
            >
              <h3 className="font-semibold text-white mb-4">Services</h3>
              <ul className="grid grid-cols-1 gap-2">
                {footerLinks[0].links.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-gray-400 hover:text-primary-400" onClick={(e) => scrollWithOffset(e, link.href)}>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-3"
            >
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="grid grid-cols-1 gap-2">
                {footerLinks[1].links.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-gray-400 hover:text-primary-400" onClick={(e) => scrollWithOffset(e, link.href)}>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center sm:justify-between">
            <p className="text-gray-400 text-sm">© {currentYear} Future & Fortune. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="/privacy" className="hover:text-primary-400">Privacy Policy</a>
              <a href="/terms" className="hover:text-primary-400">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
