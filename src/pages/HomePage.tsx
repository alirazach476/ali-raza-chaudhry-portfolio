import { lazy, Suspense, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollTo } from '../providers/SmoothScrollProvider'
import { DeferredSection } from '../components/DeferredSection'
import { Hero } from '../sections/Hero'

const About = lazy(() => import('../sections/About').then((m) => ({ default: m.About })))
const Skills = lazy(() => import('../sections/Skills').then((m) => ({ default: m.Skills })))
const Experience = lazy(() =>
  import('../sections/Experience').then((m) => ({ default: m.Experience }))
)
const Projects = lazy(() =>
  import('../sections/Projects').then((m) => ({ default: m.Projects }))
)
const AI = lazy(() => import('../sections/AI').then((m) => ({ default: m.AI })))
const Services = lazy(() =>
  import('../sections/Services').then((m) => ({ default: m.Services }))
)
const ResumeCTA = lazy(() =>
  import('../sections/ResumeCTA').then((m) => ({ default: m.ResumeCTA }))
)
const Contact = lazy(() =>
  import('../sections/Contact').then((m) => ({ default: m.Contact }))
)

function SectionFallback({ height = '40vh' }: { height?: string }) {
  return <div className="animate-pulse" style={{ minHeight: height }} aria-hidden="true" />
}

export function HomePage() {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => scrollTo(hash), 500)
      return () => clearTimeout(timer)
    }
  }, [hash])

  return (
    <>
      <Hero />
      <DeferredSection minHeight="50vh">
        <Suspense fallback={<SectionFallback height="50vh" />}>
          <About />
        </Suspense>
      </DeferredSection>
      <DeferredSection>
        <Suspense fallback={<SectionFallback />}>
          <Skills />
        </Suspense>
      </DeferredSection>
      <DeferredSection>
        <Suspense fallback={<SectionFallback />}>
          <Experience />
        </Suspense>
      </DeferredSection>
      <DeferredSection minHeight="60vh">
        <Suspense fallback={<SectionFallback height="60vh" />}>
          <Projects />
        </Suspense>
      </DeferredSection>
      <DeferredSection>
        <Suspense fallback={<SectionFallback />}>
          <AI />
        </Suspense>
      </DeferredSection>
      <DeferredSection>
        <Suspense fallback={<SectionFallback />}>
          <Services />
        </Suspense>
      </DeferredSection>
      <DeferredSection>
        <Suspense fallback={<SectionFallback />}>
          <ResumeCTA />
        </Suspense>
      </DeferredSection>
      <DeferredSection minHeight="50vh">
        <Suspense fallback={<SectionFallback height="50vh" />}>
          <Contact />
        </Suspense>
      </DeferredSection>
    </>
  )
}
