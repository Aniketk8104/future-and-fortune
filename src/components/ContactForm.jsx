import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, Phone, Clock, MessageCircle } from 'lucide-react'

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await new Promise((r) => setTimeout(r, 1200))
      setSubmitStatus('success')
      setFormData({ name: '', email: '', company: '', message: '' })
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus(null), 5000)
    }
  }

  return (
    <section id="contact" className="section-padding scroll-mt-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full text-sm font-medium text-primary-400 mb-4">
            Get in touch
          </div>
          <h2 className="heading-2 mb-4">Let's build your people advantage</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Tell us briefly what you need. We’ll reply within a business day.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 glass-card p-6 sm:p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="hidden" name="form-name" value="contact" />
              <div className="hidden"><label>Don’t fill <input name="bot-field" /></label></div>

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="group relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="input-modern peer"
                    placeholder=" "
                  />
                  <label htmlFor="name" className="absolute left-3 top-3 px-1 text-gray-400 bg-transparent transition-all pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-focus:text-primary-300 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs">Full Name *</label>
                </div>
                <div className="group relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="input-modern peer"
                    placeholder=" "
                  />
                  <label htmlFor="email" className="absolute left-3 top-3 px-1 text-gray-400 transition-all pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-focus:text-primary-300 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs">Work Email *</label>
                </div>
              </div>

              <div className="group relative">
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="input-modern peer"
                  placeholder=" "
                />
                <label htmlFor="company" className="absolute left-3 top-3 px-1 text-gray-400 transition-all pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-focus:text-primary-300 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs">Company</label>
              </div>

              <div className="group relative">
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="textarea-modern peer"
                  placeholder=" "
                />
                <label htmlFor="message" className="absolute left-3 top-3 px-1 text-gray-400 transition-all pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-focus:text-primary-300 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs">What do you need? *</label>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button type="submit" disabled={isSubmitting} className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Send className="w-5 h-5" />
                      Send Message
                    </div>
                  )}
                </button>
                <a href="https://wa.me/917506125291?text=Hi%2C%20I%E2%80%99d%20like%20to%20talk%20about%20HR%20solutions" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 transition-all shadow-lg">
                  <MessageCircle className="w-5 h-5" /> WhatsApp
                </a>
              </div>

              {submitStatus === 'success' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-green-500/15 border border-green-500/30 rounded-xl text-green-300 text-sm">
                  Thank you! We'll get back to you within 24 hours.
                </motion.div>
              )}
              {submitStatus === 'error' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-red-500/15 border border-red-500/30 rounded-xl text-red-300 text-sm">
                  Something went wrong. Please try again or email us directly.
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="glass-card p-6 shadow-2xl">
              <h3 className="font-semibold text-white mb-4">Contact</h3>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-primary-300" /><a href="mailto:hr@futureandfortune.in" className="hover:text-primary-300">hr@futureandfortune.in</a></div>
                <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-primary-300" /><a href="tel:+917506125291" className="hover:text-primary-300">+91 75061 25291 / +91 70831 07764</a></div>
                <div className="flex items-center gap-3"><Clock className="w-4 h-4 text-primary-300" /><span>Within 24 hours on business days</span></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
