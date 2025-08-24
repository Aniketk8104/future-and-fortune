import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Logo from './Logo'
import { X, MessageCircle } from 'lucide-react'

export default function Navbar({ isHomeProp }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [isHome, setIsHome] = useState(
    typeof window === 'undefined' ? (isHomeProp ?? true) : (isHomeProp ?? window.location.pathname === '/')
  )

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

    const anchor = section.querySelector('[data-anchor], h1, h2, h3') || section
    const rect = anchor.getBoundingClientRect()
    const pageY = rect.top + window.pageYOffset
    const y = pageY - (navHeight + 24)

    requestAnimationFrame(() => {
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
    })
  }

  // rAF-throttled scroll handler for smooth performance
  useEffect(() => {
    if (typeof window === 'undefined') return

    let ticking = false
    const sections = ['home', 'services', 'process', 'why-us', 'faq', 'contact']

    const compute = () => {
      const navHeightVar = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'))
      const navHeight = navHeightVar || (document.querySelector('nav')?.offsetHeight || 0)
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 50)

      const scrollPosition = scrollY + navHeight + 24
      for (const s of sections) {
        const el = document.getElementById(s)
        if (!el) continue
        const { offsetTop, offsetHeight } = el
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(s)
          break
        }
      }
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(() => { compute(); ticking = false })
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', setNavHeightVar)
    setNavHeightVar()
    compute()

    return () => {
      window.removeEventListener('scroll', onScroll)
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

  // Apply offset on initial load when a hash or ?goto is present (robust retry for cross-page nav)
  useEffect(() => {
    if (typeof window === 'undefined') return

    const getNavHeight = () => {
      const cssVar = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'))
      const nav = document.querySelector('nav')
      return (nav?.offsetHeight) || cssVar || 64
    }

    const getTargetFromURL = () => {
      const params = new URLSearchParams(window.location.search)
      const goto = params.get('goto')
      if (goto) return `#${goto}`
      return window.location.hash || null
    }

    const tryScroll = (attempt = 0) => {
      const targetHash = getTargetFromURL()
      if (!targetHash) return
      const id = targetHash.slice(1)
      const target = document.getElementById(id)
      if (!target) {
        if (attempt < 14) requestAnimationFrame(() => tryScroll(attempt + 1))
        return
      }

      const navH = getNavHeight()
      const anchor = target.querySelector('[data-anchor], h1, h2, h3') || target
      scrollWithOffset(null, targetHash)

      setTimeout(() => {
        const params = new URLSearchParams(window.location.search)
        const goto = params.get('goto')
        if (goto) {
          const url = `${window.location.pathname}#${goto}`
          window.history.replaceState({}, '', url)
        }

        const afterTop = anchor.getBoundingClientRect().top
        const desired = navH + 24
        if (Math.abs(afterTop - desired) > 8 && attempt < 14) {
          tryScroll(attempt + 1)
        }
      }, Math.min(100 + attempt * 60, 360))
    }

    const timers = [40, 160, 320].map((t) => setTimeout(() => tryScroll(0), t))
    window.addEventListener('load', () => tryScroll(0), { once: true })

    return () => { timers.forEach(clearTimeout) }
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

  useEffect(() => {
    if (typeof window !== 'undefined' && isHomeProp === undefined) {
      setIsHome(window.location.pathname === '/')
    }
  }, [isHomeProp])

  const navLinks = [
    { href: '#services', label: 'Services' },
    { href: '#process', label: 'Process' },
    { href: '#why-us', label: 'Why Us' },
    { href: '#faq', label: 'FAQ' }
  ]

  const toRootHash = (hash) => `/${hash.startsWith('#') ? hash : '#' + hash}`

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[110000] pointer-events-auto transition-all duration-300 ${
        isScrolled ? 'glass-nav shadow-2xl' : 'bg-transparent'
      }`}>
        <div className="container flex items-center justify-between py-4 relative z-[110001] pointer-events-auto">
          {/* Logo */}
          <motion.a
            href={toRootHash('#home')}
            aria-label="Future & Fortune Solutions — Home"
            className="flex items-center gap-3 text-xl font-bold text-white hover:text-primary-400 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => { if (isHome) { e.preventDefault(); /* smooth scroll on home */ scrollWithOffset(e, '#home') } }}
          >
            <Logo className="h-8 md:h-9 w-auto shrink-0" />
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const targetHref = toRootHash(link.href)
              const isActive = activeSection === link.href.slice(1)
              return (
                <a
                  key={link.href}
                  href={targetHref}
                  className={`text-sm font-medium transition-colors hover:text-primary-400 ${
                    isActive ? 'text-primary-400' : 'text-gray-300'
                  }`}
                  onClick={(e) => { if (isHome) { e.preventDefault(); scrollWithOffset(e, link.href) } }}
                >
                  {link.label}
                </a>
              )
            })}
            <a href={toRootHash('#contact')} className="btn-primary" onClick={(e) => { if (isHome) { e.preventDefault(); scrollWithOffset(e, '#contact') } }}>
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
                <a href={toRootHash('#home')} onClick={(e)=>{ if (isHome) { e.preventDefault(); scrollWithOffset(e,'#home'); } setIsMobileMenuOpen(false) }} className="flex items-center gap-3 text-white/90 hover:text-primary-300">
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
                    const targetHref = toRootHash(link.href)
                    const active = activeSection === link.href.slice(1)
                    return (
                      <li key={link.href}>
                        <a
                          href={targetHref}
                          className={`block w-full rounded-xl px-4 py-4 text-lg font-medium transition-all border ${active ? 'bg-white/5 text-primary-300 border-white/15' : 'text-gray-200 border-transparent hover:text-primary-300 hover:bg-white/5 hover:border-white/10'}`}
                          onClick={(e) => { if (isHome) { e.preventDefault(); scrollWithOffset(e, link.href) } setIsMobileMenuOpen(false) }}
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
                  href={toRootHash('#contact')}
                  className="btn-primary w-full inline-flex justify-center gap-2 shadow-[0_8px_30px_rgba(14,165,233,.25)]"
                  onClick={(e) => { if (isHome) { e.preventDefault(); scrollWithOffset(e, '#contact') } setIsMobileMenuOpen(false) }}
                >
                  Contact
                </a>
                <a
                  href="https://wa.me/917506125291"
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
