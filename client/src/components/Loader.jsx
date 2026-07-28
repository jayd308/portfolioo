import { motion } from 'framer-motion';

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-gray-950 flex flex-col items-center justify-center"
    >
      {/* Spinning geometric rings */}
      <div className="relative w-20 h-20 mb-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary-500 border-r-primary-400/50"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-2 rounded-full border-2 border-transparent border-b-accent-500 border-l-accent-400/50"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-4 rounded-full border-2 border-transparent border-t-primary-300"
        />

        {/* Center cube */}
        <motion.div
          animate={{
            rotateX: [0, 360],
            rotateY: [0, 360],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-6 perspective-[200px]"
        >
          <div className="w-full h-full relative" style={{ transformStyle: 'preserve-3d' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/30 to-accent-500/30 border border-primary-500/50 rounded" />
          </div>
        </motion.div>
      </div>

      {/* Loading text */}
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="text-gray-400 text-sm tracking-[0.2em] uppercase font-light"
      >
        Loading
      </motion.div>

      {/* Progress dots */}
      <div className="flex gap-1.5 mt-3">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
          />
        ))}
      </div>
    </motion.div>
  );
}
