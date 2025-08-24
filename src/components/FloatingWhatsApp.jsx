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
      <span className="absolute -inset-2 rounded-full bg-emerald-500/25 blur-lg opacity-0 group-hover:opacity-100 transition" />
      {/* Button */}
      <span className="relative inline-flex items-center gap-0 sm:gap-3 rounded-full px-3 py-3 sm:px-5 sm:py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-xl ring-1 ring-white/10 hover:from-emerald-600 hover:to-green-700 transition-all animate-[float_6s_ease-in-out_infinite]">
        <MessageCircle className="w-5 h-5" />
        <span className="max-w-0 sm:max-w-[120px] overflow-hidden sm:group-hover:max-w-[160px] transition-[max-width] duration-300 text-sm font-semibold pl-0 sm:pl-1">WhatsApp</span>
      </span>
      <style>{`@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}`}</style>
    </motion.a>
  )
}
