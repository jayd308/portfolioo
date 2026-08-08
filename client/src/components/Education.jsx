import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useRef } from 'react'
import SectionTitle from './SectionTitle'
import { BookOpen, Code2, Brain, Rocket } from 'lucide-react'
import school from '../assets/rszca9c903.jpg'

const timelineData = [
  {
    year: '2019 - 2022',
    title: 'GS Muyanza',
    subtitle: 'Secondary School · S1 - S3',
    description:
      'Built foundational knowledge in mathematics, sciences, and computer literacy. Developed a strong passion for technology and problem-solving.',
    tags: ['Mathematics', 'Sciences', 'Computer Literacy'],
    icon: BookOpen,
    color: 'from-violet-500 to-purple-600',
  },
  {
    year: '2022 - 2023',
    title: 'Level 3 — Programming Fundamentals',
    subtitle: 'Software Development Program',
    description:
      'Programming fundamentals, web development basics, and database introduction. First steps into the world of software engineering.',
    tags: ['HTML', 'CSS', 'JavaScript Basics', 'Database Intro'],
    icon: Code2,
    image: school,
    color: 'from-purple-500 to-fuchsia-600',
  },
  {
    year: '2023 - 2024',
    title: 'Level 4 — Advanced Development',
    subtitle: 'Software Development Program',
    description:
      'Advanced programming concepts, backend development with Node.js and Express, and software engineering principles.',
    tags: ['JavaScript', 'Node.js', 'Express', 'MongoDB', 'REST API'],
    icon: Brain,
    image: school,
    color: 'from-fuchsia-500 to-cyan-500',
  },
  {
    year: '2024 - 2026',
    title: 'Level 5 — Full-Stack & AI',
    subtitle: 'Software Development Program',
    description:
      'Full-stack application development with React, Python programming, Artificial Intelligence, advanced software projects, and professional development practices.',
    tags: ['React.js', 'Python', 'AI/ML', 'Full-Stack MERN', 'DevOps'],
    icon: Rocket,
    image: school,
    color: 'from-cyan-500 to-blue-500',
  },
]

function TimelineItem({ item, index }) {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })
  const isLeft = index % 2 === 0
  const Icon = item.icon

  return (
    <div ref={ref} className="relative flex items-center mb-16 last:mb-0">
      {/* Desktop layout */}
      <div className="hidden md:grid md:grid-cols-[1fr_80px_1fr] w-full items-center">
        {/* Left card */}
        {isLeft ? (
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-end pr-8"
          >
            <div className="glass-card rounded-2xl p-6 max-w-md border border-white/10 hover:border-white/20 transition-all duration-300 group">
              {item.image && (
                <img src={item.image} alt={item.title} className="w-full h-40 object-cover rounded-xl mb-4 border border-white/10" />
              )}
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${item.color} text-white mb-3`}>
                {item.year}
              </div>
              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-primary-400 mb-3">{item.subtitle}</p>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs bg-white/5 text-gray-300 border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <div />
        )}

        {/* Center timeline */}
        <div className="flex flex-col items-center relative">
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className={`w-14 h-14 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center z-10 shadow-lg`}
            style={{
              boxShadow: `0 0 20px rgba(139,92,246,0.3)`,
            }}
          >
            <Icon className="w-6 h-6 text-white" />
          </motion.div>
        </div>

        {/* Right card */}
        {!isLeft ? (
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-start pl-8"
          >
            <div className="glass-card rounded-2xl p-6 max-w-md border border-white/10 hover:border-white/20 transition-all duration-300 group">
              {item.image && (
                <img src={item.image} alt={item.title} className="w-full h-40 object-cover rounded-xl mb-4 border border-white/10" />
              )}
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${item.color} text-white mb-3`}>
                {item.year}
              </div>
              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-primary-400 mb-3">{item.subtitle}</p>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs bg-white/5 text-gray-300 border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <div />
        )}
      </div>

      {/* Mobile layout */}
      <div className="md:hidden flex w-full">
        <div className="flex flex-col items-center mr-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className={`w-12 h-12 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center z-10 shrink-0`}
          >
            <Icon className="w-5 h-5 text-white" />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card rounded-2xl p-5 flex-1 border border-white/10"
        >
          {item.image && (
            <img src={item.image} alt={item.title} className="w-full h-36 object-cover rounded-xl mb-3 border border-white/10" />
          )}
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${item.color} text-white mb-3`}>
            {item.year}
          </div>
          <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
          <p className="text-sm text-primary-400 mb-2">{item.subtitle}</p>
          <p className="text-gray-400 text-sm leading-relaxed mb-3">
            {item.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs bg-white/5 text-gray-300 border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function Education() {
  return (
    <section id="education" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          title="Education Journey"
          subtitle="My academic path to becoming a software engineer"
        />

        <div className="relative mt-16">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-500 via-purple-500 to-cyan-500 transform -translate-x-1/2" />
          {/* Mobile vertical line */}
          <div className="md:hidden absolute left-[23px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-500 via-purple-500 to-cyan-500" />

          {timelineData.map((item, index) => (
            <TimelineItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
