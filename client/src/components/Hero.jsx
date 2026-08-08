import { useState, useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Download, Github, Linkedin, Instagram, Send } from 'lucide-react';
import toast from 'react-hot-toast';

const Scene3D = lazy(() => import('./Scene3D'));

const roles = [
  'Software Development Student',
  'MERN Stack Developer',
  'Python Developer',
  'AI Enthusiast',
];

const techStack = [
  'JavaScript', 'TypeScript', 'React.js', 'Node.js', 'Express.js', 'MongoDB',
  'PostgreSQL', 'Python', 'Tailwind CSS', 'REST API', 'Git', 'Three.js',
  'OpenAI', 'Socket.io', 'Vite', 'Docker',
];

const socialLinks = [
  {
    icon: Github,
    href: 'https://github.com/jeandamour157',
    label: 'GitHub',
    color: 'hover:border-gray-400/50 hover:shadow-gray-400/20',
  },
  {
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/nshimiyimana-jean-damour-67a721316/',
    label: 'LinkedIn',
    color: 'hover:border-blue-400/50 hover:shadow-blue-400/20',
  },
  {
    icon: Instagram,
    href: 'https://www.instagram.com/jayd3_12/',
    label: 'Instagram',
    color: 'hover:border-pink-500/50 hover:shadow-pink-500/20',
  },
  {
    icon: Send,
    href: 'https://wa.me/250795452115',
    label: 'WhatsApp',
    color: 'hover:border-green-500/50 hover:shadow-green-500/20',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function Typewriter() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = roles[titleIndex];
    let timeout;

    if (!isDeleting && displayText === currentTitle) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % roles.length);
    } else {
      timeout = setTimeout(
        () => {
          setDisplayText(
            isDeleting
              ? currentTitle.substring(0, displayText.length - 1)
              : currentTitle.substring(0, displayText.length + 1)
          );
        },
        isDeleting ? 35 : 70
      );
    }
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, titleIndex]);

  return (
    <div className="terminal-card">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-white/[0.03]">
        <span className="terminal-dot bg-red-500/80" />
        <span className="terminal-dot bg-yellow-500/80" />
        <span className="terminal-dot bg-green-500/80" />
        <span className="ml-2 font-mono text-[11px] text-gray-400 truncate">
          jean.damour@portfolio: ~
        </span>
      </div>

      {/* Terminal body */}
      <div className="p-4 font-mono text-sm space-y-2.5">
        <div className="flex gap-2">
          <span className="text-accent-400 select-none">$</span>
          <span className="text-gray-200">whoami</span>
        </div>
        <p className="text-gray-400 pl-5">NSHIMIYIMANA Jean Damour</p>

        <div className="flex gap-2">
          <span className="text-accent-400 select-none">$</span>
          <span className="text-gray-200">cat roles.txt</span>
        </div>
        <p className="text-gray-400 pl-5">
          {displayText}
          <span className="caret" />
        </p>

        <div className="flex gap-2">
          <span className="text-accent-400 select-none">$</span>
          <span className="text-gray-200">status --check</span>
        </div>
        <p className="text-green-400/90 pl-5">● open to new opportunities</p>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950"
    >
      {/* Blueprint grid backdrop */}
      <div className="absolute inset-0 bg-grid opacity-60" />

      {/* Gradient blobs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-14 items-center">
          {/* Left: Text */}
          <motion.div
            className="lg:col-span-7 space-y-7"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Status badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 font-mono text-xs text-gray-300">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                available for internships &amp; freelance
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div variants={itemVariants} className="space-y-2">
              <p className="font-mono text-sm text-accent-400 tracking-wide">
                {'>'} hello, my name is
              </p>
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                NSHIMIYIMANA
                <br />
                <span className="text-gradient">Jean Damour</span>
              </h1>
            </motion.div>

            {/* Terminal typewriter */}
            <motion.div variants={itemVariants} className="max-w-lg">
              <Typewriter />
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-gray-400 text-base md:text-lg max-w-xl leading-relaxed"
            >
              I design and build{' '}
              <span className="text-gray-200">modern web applications</span>,{' '}
              <span className="text-gray-200">AI-powered solutions</span>, and
              practical software systems — writing clean, maintainable code with a
              focus on performance and great developer experience.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}
                className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10">View Projects</span>
                <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/20 text-white font-semibold backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
                Contact Me
              </a>

              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  toast('CV coming soon!', { icon: '📄' })
                }}
                className="inline-flex items-center gap-2 px-4 py-3.5 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <Download className="w-4 h-4" />
                CV
              </a>
            </motion.div>

            {/* Socials */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 pt-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gray-500 mr-1">
                find me at
              </span>
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm text-gray-400 hover:text-white hover:-translate-y-0.5 transition-all duration-300 ${color}`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: 3D Scene */}
          <motion.div
            className="lg:col-span-5 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-cyan-600/30 rounded-full blur-3xl animate-pulse" />
              <motion.div
                className="relative w-full h-full rounded-3xl overflow-hidden"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Suspense
                  fallback={
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full border-2 border-primary-500/30 border-t-primary-500 animate-spin" />
                    </div>
                  }
                >
                  <Scene3D />
                </Suspense>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tech marquee */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/5 bg-gray-950/40 backdrop-blur-sm py-3.5 marquee-group">
        <div className="marquee-mask overflow-hidden">
          <div className="animate-marquee flex whitespace-nowrap">
            {[...techStack, ...techStack].map((tech, i) => (
              <span key={i} className="flex items-center mx-6 font-mono text-xs text-gray-500">
                <span className="text-accent-400/70 mr-3">$</span>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 hidden md:flex z-10 flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gray-500">
          scroll
        </span>
        <div className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center">
          <motion.div
            className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
