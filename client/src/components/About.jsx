import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BookOpen, Code2, FolderOpen, Cpu, Download } from 'lucide-react'
import toast from 'react-hot-toast'
import SectionTitle from './SectionTitle'
import damour from '../assets/damour.png'

const stats = [
  { icon: BookOpen, value: '1', suffix: '', label: 'Software Development Student', color: 'from-purple-500 to-violet-600' },
  { icon: Code2, value: '3', suffix: '+', label: 'MERN Stack Developer', color: 'from-cyan-500 to-blue-600' },
  { icon: FolderOpen, value: '5', suffix: '+', label: 'Projects Built', color: 'from-violet-500 to-purple-600' },
  { icon: Cpu, value: '15', suffix: '+', label: 'Technologies Learned', color: 'from-purple-500 to-cyan-500' },
];

function CountUp({ target, suffix, inView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = parseInt(target, 10);
    if (start === end) return;
    const duration = 2000;
    const incrementTime = 30;
    const step = (end / duration) * incrementTime;

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target, inView]);

  return (
    <span>
      {count}
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
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="About Me" subtitle="Get to know me" />

        <div className="grid lg:grid-cols-2 gap-16 items-center mt-16">
          {/* Left — Image */}
          <motion.div
            className="relative flex justify-center"
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={0}
          >
            {/* Gradient ring */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-violet-500 via-purple-500 to-cyan-500 p-1 shadow-2xl shadow-purple-500/20">
              <div className="w-full h-full rounded-full overflow-hidden bg-gray-900 flex items-center justify-center">
                <img src={damour} alt="NSHIMIYIMANA Jean Damour" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Floating decorations */}
            {[
              { className: 'absolute -top-4 -right-4 w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/30 backdrop-blur-sm', delay: 0 },
              { className: 'absolute -bottom-4 -left-4 w-14 h-14 rounded-full bg-cyan-500/20 border border-cyan-500/30 backdrop-blur-sm', delay: 1 },
              { className: 'absolute top-1/2 -right-8 w-8 h-8 rounded-lg bg-violet-500/20 border border-violet-500/30 backdrop-blur-sm', delay: 2 },
              { className: 'absolute -bottom-2 right-8 w-10 h-10 rounded-full bg-purple-400/20 border border-purple-400/30 backdrop-blur-sm', delay: 0.5 },
            ].map((item, i) => (
              <motion.div
                key={i}
                className={item.className}
                animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: item.delay,
                  ease: 'easeInOut',
                }}
              />
            ))}
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
                My name is <span className="text-white font-semibold">NSHIMIYIMANA Jean Damour</span>. I am a Software
                Development student passionate about creating innovative software
                solutions.
              </p>
              <p>
                My journey started from curiosity about technology and
                programming. Through continuous learning from Level 3 to Level 5,
                I developed strong skills in full-stack development, databases,
                APIs, and artificial intelligence.
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
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
                  <div className="text-3xl font-bold text-white">
                    <CountUp target={value} suffix={suffix} inView={inView} />
                  </div>
                  <div className="text-sm text-gray-400 mt-1">{label}</div>
                </motion.div>
              ))}
            </div>

            {/* CV Button */}
            <motion.a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                toast('CV coming soon!', { icon: '📄' })
              }}
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
