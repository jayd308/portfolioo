import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Code2 } from 'lucide-react'

const navLinks = [
  { name: 'Home', path: '/', hash: '' },
  { name: 'About', path: '/', hash: 'about' },
  { name: 'Projects', path: '/', hash: 'projects' },
  { name: 'Skills', path: '/', hash: 'skills' },
  { name: 'Contact', path: '/', hash: 'contact' },
]

function scrollToSection(hash) {
  if (!hash) { window.scrollTo({ top: 0, behavior: 'smooth' }); return }
  const el = document.getElementById(hash)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }
  )
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const handleNavClick = useCallback((e, link) => {
    e.preventDefault()
    setIsOpen(false)
    if (link.hash) {
      if (location.pathname === '/') {
        scrollToSection(link.hash)
      } else {
        navigate(`/#${link.hash}`)
      }
    } else {
      navigate(link.path)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [location.pathname, navigate])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    if (location.hash) {
      setTimeout(() => scrollToSection(location.hash.replace('#', '')), 100)
    }
  }, [location])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Code2 className="w-7 h-7 text-primary-400 group-hover:text-accent-400 transition-colors" />
          <span className="text-lg font-bold text-gradient hidden sm:inline">JD</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.hash ? `/#${link.hash}` : link.path}
              onClick={(e) => handleNavClick(e, link)}
              className="text-sm font-medium text-gray-400 hover:text-primary-300 transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <Link to="/admin" className="btn-outline text-sm py-2 px-4">
            Admin
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-gray-400 hover:text-primary-300 transition-colors"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass mt-2 mx-4 rounded-xl overflow-hidden"
          >
            <div className="py-4 px-4 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.hash ? `/#${link.hash}` : link.path}
                  onClick={(e) => handleNavClick(e, link)}
                  className="block py-2 px-4 text-sm font-medium text-gray-300 hover:text-primary-300 hover:bg-white/5 rounded-lg transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <Link
                to="/admin"
                className="block py-2 px-4 text-sm font-medium text-primary-400 hover:bg-primary-500/10 rounded-lg transition-colors"
              >
                Admin
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
