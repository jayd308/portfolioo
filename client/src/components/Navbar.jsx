import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Code2, TerminalSquare } from 'lucide-react'

const navLinks = [
  { name: 'Home', path: '/', hash: '', id: 'home' },
  { name: 'About', path: '/', hash: 'about', id: 'about' },
  { name: 'Projects', path: '/', hash: 'projects', id: 'projects' },
  { name: 'Skills', path: '/', hash: 'skills', id: 'skills' },
  { name: 'Certificates', path: '/', hash: 'certificates', id: 'certificates' },
  { name: 'Contact', path: '/', hash: 'contact', id: 'contact' },
]

function scrollToSection(hash) {
  if (!hash) { window.scrollTo({ top: 0, behavior: 'smooth' }); return }
  const el = document.getElementById(hash)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
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
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll-spy: highlight the section currently in view
  useEffect(() => {
    if (location.pathname !== '/') return
    const ids = navLinks.map((l) => l.hash).filter(Boolean)
    const onScroll = () => {
      let current = ''
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 140) current = id
      }
      setActive(current || 'home')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [location.pathname])

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
        scrolled ? 'glass border-b border-white/5 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group" aria-label="Home">
          <div className="relative">
            <Code2 className="w-7 h-7 text-primary-400 group-hover:text-accent-400 transition-colors" />
            <span className="absolute -bottom-1 -right-1 w-1.5 h-1.5 rounded-full bg-accent-400 group-hover:animate-pulse" />
          </div>
          <span className="hidden sm:flex flex-col leading-none">
            <span className="font-mono text-sm font-bold text-gradient">jean.damour</span>
            <span className="font-mono text-[10px] text-gray-500 tracking-[0.2em] mt-0.5">~/dev</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = link.id === active
            return (
              <a
                key={link.name}
                href={link.hash ? `/#${link.hash}` : link.path}
                onClick={(e) => handleNavClick(e, link)}
                className={`relative text-sm font-medium transition-colors group ${
                  isActive ? 'text-primary-300' : 'text-gray-400 hover:text-primary-300'
                }`}
              >
                <span className="font-mono text-[10px] text-accent-400/70 mr-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  _
                </span>
                {link.name}
                <span
                  className={`absolute -bottom-1.5 left-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            )
          })}
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 btn-outline text-sm py-2 px-4 font-mono text-xs"
          >
            <TerminalSquare className="w-3.5 h-3.5" />
            admin
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
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
            <div className="py-4 px-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.hash ? `/#${link.hash}` : link.path}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`flex items-center gap-2 py-2.5 px-4 text-sm font-medium rounded-lg transition-colors ${
                    link.id === active
                      ? 'text-primary-300 bg-primary-500/10'
                      : 'text-gray-300 hover:text-primary-300 hover:bg-white/5'
                  }`}
                >
                  <span className="font-mono text-[10px] text-accent-400/70">$</span>
                  {link.name}
                </a>
              ))}
              <Link
                to="/admin"
                className="flex items-center gap-2 py-2.5 px-4 text-sm font-medium text-primary-400 hover:bg-primary-500/10 rounded-lg transition-colors"
              >
                <TerminalSquare className="w-4 h-4" />
                Admin
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
