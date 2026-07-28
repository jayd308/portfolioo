import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Code2, Database, Globe, Server, Smartphone, Palette,
  Terminal, GitBranch, Cloud, Shield, Cpu, Layers,
} from 'lucide-react';

const iconMap = {
  javascript: Code2, javascriptreact: Code2, react: Code2,
  nodejs: Server, express: Server, python: Terminal,
  mongodb: Database, postgresql: Database, mysql: Database,
  html: Globe, css: Palette, tailwindcss: Palette,
  typescript: Code2, graphql: Database, restapi: Server,
  git: GitBranch, github: GitBranch, docker: Cloud,
  aws: Cloud, firebase: Cloud, figma: Palette,
  redux: Layers, nextjs: Globe, vite: Globe,
  linux: Terminal, java: Code2,
  machinelearning: Cpu, aiapis: Cpu, aiappdev: Cpu,
  cpp: Code2, c: Code2, default: Cpu,
};

function getIcon(name) {
  const key = name.toLowerCase().replace(/[\s.-]/g, '');
  for (const [k, Icon] of Object.entries(iconMap)) {
    if (key.includes(k.replace(/[\s.-]/g, ''))) return Icon;
  }
  return iconMap.default;
}

export default function SkillCard({ skill }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const Icon = getIcon(skill.name);

  const categoryColors = {
    Frontend: 'from-blue-500/20 to-cyan-500/20 text-blue-300 border-blue-500/30',
    Backend: 'from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/30',
    Database: 'from-yellow-500/20 to-orange-500/20 text-yellow-300 border-yellow-500/30',
    DevOps: 'from-red-500/20 to-pink-500/20 text-red-300 border-red-500/30',
    Design: 'from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30',
    Language: 'from-primary-500/20 to-accent-500/20 text-primary-300 border-primary-500/30',
    Tool: 'from-gray-500/20 to-slate-500/20 text-gray-300 border-gray-500/30',
  };

  const badgeClass = categoryColors[skill.category] || categoryColors.Tool;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ scale: 1.03, y: -4 }}
      className="relative group"
    >
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary-500/0 to-accent-500/0 group-hover:from-primary-500/30 group-hover:to-accent-500/30 transition-all duration-500 blur-sm" />

      <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 group-hover:border-primary-500/30 transition-all duration-300">
        {/* Category badge */}
        <div className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-medium bg-gradient-to-r border ${badgeClass}`}>
          {skill.category}
        </div>

        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 border border-white/10 flex items-center justify-center mb-4">
          <Icon size={24} className="text-primary-400 group-hover:text-accent-400 transition-colors" />
        </div>

        {/* Name */}
        <h3 className="text-white font-semibold text-sm mb-3">{skill.name}</h3>

        {/* Progress bar */}
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: `${skill.level || 0}%` } : { width: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
            className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
          />
        </div>
        <p className="text-gray-500 text-xs mt-1.5 text-right">{skill.level}%</p>
      </div>
    </motion.div>
  );
}
