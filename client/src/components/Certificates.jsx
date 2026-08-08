import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Award, X, ZoomIn } from 'lucide-react'
import SectionTitle from './SectionTitle'
import jayd from '../assets/jayd.png'
import jayd1 from '../assets/jayd1.png'
import jayd2 from '../assets/jayd2.png'
import jayd6 from '../assets/jayd6.png'

const certificates = [
  { image: jayd, title: 'Certificate 1', issuer: '' },
  { image: jayd1, title: 'Certificate 2', issuer: '' },
  { image: jayd2, title: 'Certificate 3', issuer: '' },
  { image: jayd6, title: 'Certificate 6', issuer: '' },
]

export default function Certificates() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [selected, setSelected] = useState(null)

  return (
    <section id="certificates" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <SectionTitle
          number="03."
          tag="achievements"
          title="Certificates"
          subtitle="Achievements and certifications I've earned"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
              whileHover={{ y: -6 }}
              onClick={() => setSelected(cert)}
              className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="w-4 h-4 text-accent-300" />
                    <h3 className="text-white font-semibold text-sm">{cert.title}</h3>
                  </div>
                  {cert.issuer && <p className="text-xs text-gray-300">{cert.issuer}</p>}
                </div>
                <span className="p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white">
                  <ZoomIn className="w-4 h-4" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute -top-12 right-0 p-2 text-gray-300 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={selected.image}
                alt={selected.title}
                className="w-full rounded-2xl border border-white/10"
              />
              <div className="flex items-center gap-2 mt-3 text-white">
                <Award className="w-5 h-5 text-accent-300" />
                <h3 className="font-semibold">{selected.title}</h3>
                {selected.issuer && <span className="text-sm text-gray-400">— {selected.issuer}</span>}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
