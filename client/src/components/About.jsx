import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FolderKanban, Cpu, Briefcase, GraduationCap, Download, MapPin, Mail } from 'lucide-react'
import SectionTitle from './SectionTitle'
import profileImage from '../assets/RRR.jpg'
import cvUrl from '../assets/Nshimiyimana_Jean_Damour_CV_A1_Iron_Steel.docx?url'

const stats = [
  { icon: FolderKanban, value: '15', suffix: '+', label: 'Projects Built', color: 'from-purple-500 to-violet-600' },
  { icon: Cpu, value: '20', suffix: '+', label: 'Technologies', color: 'from-cyan-500 to-blue-600' },
  { icon: Briefcase, value: '3', suffix: '+ yrs', label: 'Experience', color: 'from-violet-500 to-purple-600' },
  { icon: GraduationCap, value: '3.8', suffix: '/4.0', label: 'GPA', color: 'from-purple-500 to-cyan-500' },
];

const currentlyLearning = [
  'Machine Learning', 'TypeScript', 'DevOps', 'GraphQL', 'Next.js', 'System Design',
];

function CountUp({ target, suffix, inView }) {
  const [count, setCount] = useState(0);
  const isDecimal = target.includes('.');

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = parseFloat(target);
    if (start === end) return;
    const duration = 1800;
    const incrementTime = 24;
    const step = (end / duration) * incrementTime;

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(isDecimal ? Math.round(start * 10) / 10 : Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target, inView]);

  return (
    <span>
      {isDecimal ? count.toFixed(1) : count}
      {suffix}
    </span>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-24 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          number="01."
          tag="about"
          title="About Me"
          subtitle="Full-stack developer focused on building reliable, scalable web experiences"
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center mt-16">
          {/* Left — Image */}
          <motion.div
            className="relative flex justify-center"
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={0}
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-violet-500 via-purple-500 to-cyan-500 p-1 shadow-2xl shadow-purple-500/20">
              <div className="w-full h-full rounded-full overflow-hidden bg-gray-900 flex items-center justify-center">
                <img src={profileImage} alt="NSHIMIYIMANA Jean Damour" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Floating status chips */}
            <motion.div
              className="absolute top-6 -right-2 sm:right-4 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gray-900/90 backdrop-blur-md border border-white/10 font-mono text-xs text-gray-300 shadow-lg"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
              </span>
              open_to_work
            </motion.div>
            <motion.div
              className="absolute bottom-8 -left-2 sm:left-2 px-3.5 py-2 rounded-xl bg-gray-900/90 backdrop-blur-md border border-white/10 font-mono text-xs text-accent-300 shadow-lg"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              {'>'} MERN · Python · AI
            </motion.div>
          </motion.div>

          {/* Right — Text */}
          <motion.div
            className="space-y-8"
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={1}
          >
            <div className="space-y-5 text-gray-300 text-lg leading-relaxed">
              <p>
                My name is <span className="text-white font-semibold">NSHIMIYIMANA Jean Damour</span>. I'm a
                Software Development student passionate about building{' '}
                <span className="text-white">innovative, production-ready software</span> —
                from clean UI to robust APIs and AI integration.
              </p>
              <p>
                Starting from raw curiosity, I've worked through Level 3 to Level 5,
                sharpening skills across <span className="text-white">full-stack development</span>,{' '}
                <span className="text-white">databases</span>,{' '}
                <span className="text-white">REST APIs</span>, and{' '}
                <span className="text-white">artificial intelligence</span> — shipping projects
                end-to-end rather than stopping at tutorials.
              </p>
            </div>

            {/* Info strip */}
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
              <span className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-4 h-4 text-primary-400" /> Kigali, Rwanda
              </span>
              <span className="flex items-center gap-2 text-gray-400">
                <Mail className="w-4 h-4 text-primary-400" /> jeandamour157@gmail.com
              </span>
            </div>

            {/* Currently learning */}
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gray-500 mb-3">
                {'//'} currently learning
              </p>
              <div className="flex flex-wrap gap-2">
                {currentlyLearning.map((item) => (
                  <span key={item} className="code-chip">
                    <span className="text-accent-400">+</span> {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map(({ icon: Icon, value, suffix, label, color }, i) => (
                <motion.div
                  key={label}
                  className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 hover:border-white/20 transition-all duration-300"
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  custom={1.5 + i * 0.2}
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                >
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${color} mb-3`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white font-mono">
                    <CountUp target={value} suffix={suffix} inView={inView} />
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{label}</div>
                </motion.div>
              ))}
            </div>

            {/* CV Button */}
            <motion.a
              href={cvUrl}
              download="Nshimiyimana_Jean_Damour_CV.docx"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/20 text-white font-semibold backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <Download className="w-5 h-5" />
              Download CV
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
