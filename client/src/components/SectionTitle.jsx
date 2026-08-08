import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function SectionTitle({ number, tag, title, subtitle, align = 'center' }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`mb-14 md:mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      {(number || tag) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`flex items-center gap-3 mb-4 font-mono ${
            align === 'center' ? 'justify-center' : 'justify-start'
          }`}
        >
          {number && <span className="text-primary-400 text-sm">{number}</span>}
          <span className="h-px w-10 bg-gradient-to-r from-primary-500 to-accent-500" />
          {tag && (
            <span className="text-[11px] uppercase tracking-[0.3em] text-gray-500">{tag}</span>
          )}
        </motion.div>
      )}

      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-primary-300 to-accent-400">
          {title}
        </span>
      </h2>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        className={`h-1 w-20 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 mb-4 ${
          align === 'center' ? 'mx-auto' : ''
        }`}
      />

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed"
          style={{ marginLeft: align === 'center' ? 'auto' : undefined, marginRight: align === 'center' ? 'auto' : undefined }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
