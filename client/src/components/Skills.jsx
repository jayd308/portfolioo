import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionTitle from './SectionTitle'
import SkillCard from './SkillCard'

const categories = [
  'All',
  'Frontend',
  'Backend',
  'Database',
  'Programming',
  'Tools',
  'AI',
]

const skillsData = [
  { name: 'HTML', category: 'Frontend', level: 90 },
  { name: 'CSS', category: 'Frontend', level: 85 },
  { name: 'JavaScript', category: 'Frontend', level: 80 },
  { name: 'React.js', category: 'Frontend', level: 75 },
  { name: 'Tailwind CSS', category: 'Frontend', level: 85 },
  { name: 'Node.js', category: 'Backend', level: 75 },
  { name: 'Express.js', category: 'Backend', level: 75 },
  { name: 'REST API', category: 'Backend', level: 80 },
  { name: 'MongoDB', category: 'Database', level: 70 },
  { name: 'PostgreSQL', category: 'Database', level: 60 },
  { name: 'Python', category: 'Programming', level: 65 },
  { name: 'Git', category: 'Tools', level: 80 },
  { name: 'GitHub', category: 'Tools', level: 80 },
  { name: 'VS Code', category: 'Tools', level: 90 },
  { name: 'Postman', category: 'Tools', level: 75 },
  { name: 'Machine Learning', category: 'AI', level: 55 },
  { name: 'AI APIs', category: 'AI', level: 65 },
  { name: 'AI App Dev', category: 'AI', level: 60 },
]

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  const filtered =
    activeCategory === 'All'
      ? skillsData
      : skillsData.filter((s) => s.category === activeCategory)

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <SectionTitle
          title="Skills & Technologies"
          subtitle="Technologies I work with"
        />

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mt-12 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white border-transparent shadow-lg shadow-violet-500/20'
                  : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((skill, i) => (
              <motion.div
                key={skill.name + skill.category}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
              >
                <SkillCard skill={skill} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
