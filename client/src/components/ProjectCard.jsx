import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, Star } from 'lucide-react';

function FeaturedBadge() {
  return (
    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 text-white text-xs font-semibold flex items-center gap-1.5">
      <Star className="w-3 h-3 fill-current" /> Featured
    </div>
  );
}

function Cover({ project, horizontal }) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 ${
        horizontal ? 'md:h-full min-h-56' : 'h-48 md:h-56'
      }`}
    >
      {project.image ? (
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      ) : (
        <div className="w-full h-full relative flex items-center justify-center">
          <div className="absolute inset-0 opacity-20 bg-grid" />
          <div className="relative text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500/60 to-accent-500/60 font-mono">
            {project.title?.slice(0, 2).toUpperCase()}
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-6 gap-3">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm hover:bg-primary-500/30 hover:border-primary-500/50 transition-all"
          >
            <Github size={16} />
            Code
          </a>
        )}
        {project.liveUrl && project.liveUrl !== '#' && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary-500/80 to-accent-500/80 backdrop-blur-md border border-white/20 text-white text-sm hover:from-primary-500 hover:to-accent-500 transition-all"
          >
            <ExternalLink size={16} />
            Live Demo
          </a>
        )}
      </div>

      {project.featured && <FeaturedBadge />}
    </div>
  );
}

function ProjectBody({ project, horizontal }) {
  const hasLiveUrl = project.liveUrl && project.liveUrl !== '#';

  return (
    <div className={`p-5 md:p-6 flex flex-col ${horizontal ? 'md:justify-center' : ''}`}>
      <h3 className="text-white font-bold text-lg mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary-300 group-hover:to-accent-300 transition-all">
        {project.title}
      </h3>

      <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
        {project.description}
      </p>

      {project.technologies?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-gray-400 text-[11px] font-mono"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-3 mt-auto pt-1">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 text-gray-300 text-xs font-medium hover:border-primary-500/50 hover:text-white hover:bg-white/5 transition-all"
          >
            <Github size={14} />
            GitHub
          </a>
        )}
        {hasLiveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-primary-500/20 to-accent-500/20 border border-primary-500/30 text-primary-300 text-xs font-medium hover:from-primary-500/30 hover:to-accent-500/30 hover:text-white transition-all"
          >
            <ExternalLink size={14} />
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
}

export default function ProjectCard({ project, index = 0 }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const horizontal = !!project.featured;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      className={`group relative ${horizontal ? 'md:col-span-2' : ''}`}
    >
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary-500/0 to-accent-500/0 group-hover:from-primary-500/20 group-hover:to-accent-500/20 transition-all duration-500 blur-sm" />

      <div
        className={`relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden group-hover:border-primary-500/30 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:shadow-primary-500/10 ${
          horizontal ? 'md:grid md:grid-cols-2' : ''
        }`}
      >
        <Cover project={project} horizontal={horizontal} />
        <ProjectBody project={project} horizontal={horizontal} />
      </div>
    </motion.div>
  );
}
