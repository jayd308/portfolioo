import { lazy, Suspense } from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import Education from '../components/Education'
import Certificates from '../components/Certificates'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Contact from '../components/Contact'
import ParticleBackground from '../components/ParticleBackground'

export default function Home() {
  return (
    <>
      <ParticleBackground />
      <div className="relative z-10">
        <Hero />
        <About />
        <Education />
        <Certificates />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </>
  )
}
