import { useInView } from 'react-intersection-observer'
import SectionTitle from './SectionTitle'
import ProjectCard from './ProjectCard'

const projectsData = [
  {
    title: 'AI Study Assistant',
    description:
      'AI learning assistant helping students ask questions, summarize notes, and generate quizzes.',
    technologies: ['MERN Stack', 'Gemini API', 'JWT', 'MongoDB'],
    githubUrl: 'https://github.com/jeandamour157/ai-study-assistant',
    liveUrl: '#',
    featured: true,
  },
  {
    title: 'CreatorConnect',
    description:
      'Social platform connecting content creators to collaborate and grow their audiences.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    githubUrl: 'https://github.com/jeandamour157/creatorconnect',
    liveUrl: '#',
    featured: true,
  },
  {
    title: 'Customer Support Chatbot SaaS',
    description:
      'AI chatbot system helping businesses automate customer communication and support.',
    technologies: ['React', 'Node.js', 'AI APIs'],
    githubUrl: 'https://github.com/jeandamour157/chatbot-saas',
    liveUrl: '#',
    featured: false,
  },
  {
    title: 'FoodieApp',
    description:
      'Modern food application built with full-stack technologies for discovering and ordering food.',
    technologies: ['React', 'Node.js', 'MongoDB'],
    githubUrl: 'https://github.com/jeandamour157/foodieapp',
    liveUrl: '#',
    featured: false,
  },
  {
    title: 'AgriConnect Rwanda',
    description:
      'Digital platform supporting agriculture communities with resources, market access, and knowledge sharing.',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    githubUrl: 'https://github.com/jeandamour157/agiconnect-rwanda',
    liveUrl: '#',
    featured: false,
  },
]

export default function Projects() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <SectionTitle
          title="Featured Projects"
          subtitle="A showcase of my recent work"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {projectsData.map((project, index) => (
            <div
              key={project.title}
              className={project.featured ? 'md:col-span-2' : ''}
            >
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
