import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Mail,
  MapPin,
  Send,
  Loader2,
  CheckCircle,
  Phone,
} from 'lucide-react'
import toast from 'react-hot-toast'
import SectionTitle from './SectionTitle'
import api from '../utils/api'

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
  </svg>
)

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
)

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const socialLinks = [
  {
    name: 'WhatsApp',
    icon: WhatsAppIcon,
    url: 'https://wa.me/250795452115',
    color: 'from-green-500 to-green-600',
  },
  {
    name: 'Telegram',
    icon: TelegramIcon,
    url: 'https://t.me/jayd3_12',
    color: 'from-blue-400 to-blue-500',
  },
  {
    name: 'Instagram',
    icon: InstagramIcon,
    url: 'https://www.instagram.com/jayd3_12/',
    color: 'from-pink-500 to-purple-600',
  },
  {
    name: 'Facebook',
    icon: FacebookIcon,
    url: 'https://web.facebook.com/nshimiyimana.nshimiyimanajdamour',
    color: 'from-blue-500 to-blue-700',
  },
  {
    name: 'LinkedIn',
    icon: LinkedInIcon,
    url: 'https://www.linkedin.com/in/nshimiyimana-jean-damour-67a721316/',
    color: 'from-blue-400 to-blue-600',
  },
  {
    name: 'X',
    icon: XIcon,
    url: 'https://x.com/jeandamour157',
    color: 'from-gray-400 to-gray-600',
  },
]

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields')
      return
    }
    setSending(true)
    try {
      await api.post('/messages', formData)
      toast.success('Message sent successfully!')
      setFormData({ name: '', email: '', message: '' })
      setSent(true)
      setTimeout(() => setSent(false), 3000)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send message')
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <SectionTitle
          number="06."
          tag="contact"
          title="Get In Touch"
          subtitle="Have a project in mind or want to collaborate? Let's talk"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="glass-card rounded-2xl p-8 border border-white/10"
            >
              <h3 className="text-xl font-bold text-white mb-6">
                Send a Message
              </h3>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300 disabled:opacity-50"
                >
                  {sending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : sent ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="glass-card rounded-2xl p-8 border border-white/10 flex flex-col items-center text-center">
              <h3 className="text-xl font-bold text-white mb-6">Call Me</h3>

              <motion.div
                className="relative w-32 h-32 mb-6"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0"
                    style={{ rotate: i * 120 }}
                    animate={{ rotate: 360 + i * 120 }}
                    transition={{ duration: 6 + i * 2, repeat: Infinity, ease: 'linear' }}
                  >
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                  </motion.div>
                ))}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border-2 border-dashed border-primary-500/40"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-3 rounded-full border border-accent-500/30"
                />
                <div className="absolute inset-5 rounded-full bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center glow-primary">
                  <Phone className="w-7 h-7 text-white" />
                </div>
              </motion.div>

              <a
                href="tel:+250795452115"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-violet-500/25 hover:scale-105 transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
                +250 795 452 115
              </a>
            </div>

            <div className="glass-card rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6">
                Contact Info
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <a
                      href="mailto:jeandamour157@gmail.com"
                      className="text-white hover:text-primary-400 transition-colors"
                    >
                      jeandamour157@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">WhatsApp</p>
                    <a
                      href="https://wa.me/250795452115"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-green-400 transition-colors"
                    >
                      +250 795 452 115
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Location</p>
                    <p className="text-white">Rwanda</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-8 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-5">
                Connect With Me
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                    >
                      <div
                        className={`w-10 h-10 rounded-lg bg-gradient-to-r ${social.color} flex items-center justify-center group-hover:shadow-lg transition-shadow`}
                      >
                        <Icon />
                      </div>
                      <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">
                        {social.name}
                      </span>
                    </a>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
