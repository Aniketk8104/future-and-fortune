import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Logo from './Logo'
import { X, MessageCircle } from 'lucide-react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  // Keep a CSS var in sync with the real nav height for consistent offsets
  const setNavHeightVar = () => {
    const nav = document.querySelector('nav')
    const h = nav?.getBoundingClientRect().height || 64
    document.documentElement.style.setProperty('--nav-height', `${Math.round(h)}px`)
  }

  // Smooth scroll with offset so headings aren't hidden under the fixed navbar
  const scrollWithOffset = (e, href) => {
    if (!href?.startsWith('#')) return
    const id = href.slice(1)
    const section = document.getElementById(id)
    if (!section) return
    e?.preventDefault?.()

    const computedVar = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 64
    const nav = document.querySelector('nav')
    const navHeight = nav?.offsetHeight || computedVar

    // Prefer a heading or explicit anchor inside the section for nicer alignment
    const anchor = section.querySelector('[data-anchor], h1, h2, h3') || section
    const rect = anchor.getBoundingClientRect()
    const pageY = rect.top + window.pageYOffset

    // Add a slightly larger buffer (24px) to avoid overlap on some Android devices
    const y = pageY - (navHeight + 24)

    // Use rAF to ensure layout is settled on mobile before scrolling
    requestAnimationFrame(() => {
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
    })
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      setNavHeightVar()
      // Update active section based on scroll position (account for nav height)
      const sections = ['home', 'services', 'process', 'why-us', 'faq', 'contact']
      const navHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || (document.querySelector('nav')?.offsetHeight || 0)
      const scrollPosition = window.scrollY + navHeight + 24

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', setNavHeightVar)
    setNavHeightVar()
    handleScroll() // Check initial position

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', setNavHeightVar)
    }
  }, [])

  useEffect(() => {
    // Lock scroll when mobile menu is open
    if (isMobileMenuOpen) {
      const original = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      setNavHeightVar()
      return () => {
        document.body.style.overflow = original
        setNavHeightVar()
      }
    }
  }, [isMobileMenuOpen])

  // Apply offset on initial load when a hash is present
  useEffect(() => {
    if (typeof window === 'undefined') return
    const hash = window.location.hash
    if (hash && document.getElementById(hash.slice(1))) {
      // Wait for layout/React islands to mount
      setTimeout(() => { setNavHeightVar(); scrollWithOffset(null, hash) }, 120)
    }
  }, [])

  useEffect(() => {
    const onHashChange = () => setIsMobileMenuOpen(false)
    const onScroll = () => {
      // keep the nav state updated and ensure the button remains clickable
      setIsScrolled(window.scrollY > 50)
      setNavHeightVar()
    }
    window.addEventListener('hashchange', onHashChange)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('hashchange', onHashChange)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const navLinks = [
    { href: '#services', label: 'Services' },
    { href: '#process', label: 'Process' },
    { href: '#why-us', label: 'Why Us' },
    { href: '#faq', label: 'FAQ' }
  ]

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[110000] pointer-events-auto transition-all duration-300 ${
        isScrolled ? 'glass-nav shadow-2xl' : 'bg-transparent'
      }`}>
        <div className="container flex items-center justify-between py-4 relative z-[110001] pointer-events-auto">
          {/* Logo */}
          <motion.a
            href="#home"
            aria-label="Future & Fortune Solutions — Home"
            className="flex items-center gap-3 text-xl font-bold text-white hover:text-primary-400 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => scrollWithOffset(e, '#home')}
          >
            <Logo className="h-8 md:h-9 w-auto shrink-0" />
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary-400 ${
                  activeSection === link.href.slice(1) ? 'text-primary-400' : 'text-gray-300'
                }`}
                onClick={(e) => scrollWithOffset(e, link.href)}
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" className="btn-primary" onClick={(e) => scrollWithOffset(e, '#contact')}>
              Contact
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className={`lg:hidden text-white p-2 touch-manipulation transition-opacity ${isMobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            onClick={(e) => { e.stopPropagation(); setIsMobileMenuOpen(!isMobileMenuOpen) }}
            onPointerUp={(e) => { e.stopPropagation(); /* fallback for some devices */ }}
            aria-label="Toggle mobile menu"
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenuOpen}
            aria-hidden={isMobileMenuOpen}
          >
            <div className="space-y-2">
              <div className={`w-6 h-0.5 bg-current transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
              <div className={`w-6 h-0.5 bg-current transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <div className={`w-6 h-0.5 bg-current transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu moved OUTSIDE nav to avoid fixed/stacking issues */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[199999] bg-black/55 backdrop-blur-[2px]"
            aria-hidden="true"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="lg:hidden fixed inset-x-2 top-16 bottom-2 rounded-2xl overflow-hidden z-[200000] ring-1 ring-white/10 shadow-2xl backdrop-blur-xl bg-dark-900/85"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="sticky top-0 z-10 px-4 py-3 bg-gradient-to-b from-dark-900/90 to-transparent border-b border-white/10 backdrop-blur-md flex items-center justify-between">
                <a href="#home" onClick={(e)=>{scrollWithOffset(e,'#home'); setIsMobileMenuOpen(false)}} className="flex items-center gap-3 text-white/90 hover:text-primary-300">
                  <Logo className="h-7 w-auto" />
                </a>
                <button
                  type="button"
                  className="p-2 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/5 transition"
                  aria-label="Close menu"
                  onClick={()=>setIsMobileMenuOpen(false)}
                >
                  <X className="w-5 h-5 text-white/80" />
                </button>
              </div>

              {/* Links */}
              <div className="px-3 py-4 overflow-y-auto">
                <ul className="space-y-2">
                  {navLinks.map((link) => {
                    const active = activeSection === link.href.slice(1)
                    return (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          className={`block w-full rounded-xl px-4 py-4 text-lg font-medium transition-all border ${active ? 'bg-white/5 text-primary-300 border-white/15' : 'text-gray-200 border-transparent hover:text-primary-300 hover:bg-white/5 hover:border-white/10'}`}
                          onClick={(e) => { scrollWithOffset(e, link.href); setIsMobileMenuOpen(false) }}
                        >
                          {link.label}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>

              {/* Bottom actions */}
              <div className="mt-auto sticky bottom-0 px-3 pb-3 pt-4 bg-gradient-to-t from-dark-900/95 to-transparent backdrop-blur-md space-y-3">
                <a
                  href="#contact"
                  className="btn-primary w-full inline-flex justify-center gap-2 shadow-[0_8px_30px_rgba(14,165,233,.25)]"
                  onClick={(e) => { scrollWithOffset(e, '#contact'); setIsMobileMenuOpen(false) }}
                >
                  Contact
                </a>
                <a
                  href="https://wa.me/919137714543"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full justify-center items-center px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <MessageCircle className="w-5 h-5" /> WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </>
  )
}
