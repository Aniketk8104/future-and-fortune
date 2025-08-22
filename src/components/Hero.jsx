import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

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
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-24 sm:pt-32 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950" id="home" aria-label="Future & Fortune hero">
      {/* Animated background elements with mobile-safe sizes */}
      <div className="absolute -inset-x-px inset-y-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-10 right-1/6 w-56 h-56 sm:w-96 sm:h-96 bg-secondary-500/10 rounded-full blur-3xl animate-pulse-slow animation-delay-300" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-accent-500/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute -inset-x-px inset-y-0 opacity-[0.02] pointer-events-none">
        <div 
          className="w-full h-full" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-gray-300 mb-8"
          >
            <Sparkles className="w-4 h-4 text-accent-400" />
            Future & Fortune — People-first growth
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="heading-1 mb-6 text-balance !text-4xl sm:!text-5xl lg:!text-6xl"
          >
            Hire smarter.{' '}
            <span className="gradient-text">Build compliant HR.</span>{' '}
            Elevate culture.
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="body-large text-gray-300 max-w-3xl mx-auto mb-12"
          >
            We help modern companies hire smarter, build compliant HR systems, and craft memorable
            employee-gifting experiences—so your teams perform and stay.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 sm:mb-16"
          >
            <a href="#contact" className="btn-primary group" onClick={(e) => scrollWithOffset(e, '#contact')}>
              Book a consultation
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#services" className="btn-secondary" onClick={(e) => scrollWithOffset(e, '#services')}>
              Explore services
            </a>
          </motion.div>

          {/* Removed hero stats preview for a cleaner, consistent fold on all sizes */}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full p-1">
          <div className="w-1 h-3 bg-white/40 rounded-full mx-auto animate-bounce" />
        </div>
      </motion.div>
    </section>
  )
}