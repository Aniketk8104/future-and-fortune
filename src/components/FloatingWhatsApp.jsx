import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

export default function FloatingWhatsApp() {
  const url = 'https://wa.me/917506125291?text=Hi%2C%20Future%20%26%20Fortune%20%E2%80%94%20I%27d%20like%20to%20talk%20about%20HR%20solutions.'
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.6 }}
      className="fixed bottom-5 right-4 sm:right-6 z-[150000] group"
    >
      {/* Glow */}
      <span className="absolute -inset-2 rounded-full bg-emerald-500/20 blur-lg opacity-0 group-hover:opacity-100 transition" />
      {/* Button */}
      <span className="relative inline-flex items-center gap-3 rounded-full px-4 py-3 sm:px-5 sm:py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-xl ring-1 ring-white/10 hover:from-emerald-600 hover:to-green-700 transition-all">
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline text-sm font-semibold">WhatsApp</span>
      </span>
    </motion.a>
  )
}
