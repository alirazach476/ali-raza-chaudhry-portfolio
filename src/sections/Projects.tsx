import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionHeading } from '../components/SectionHeading'
import { TiltCard } from '../components/TiltCard'
import { MagneticButton } from '../components/MagneticButton'
import { AICardMedia } from '../components/AICardMedia'
import { ProjectScreenshot } from '../components/ProjectScreenshot'
import { WEB_PROJECTS, AI_PROJECTS } from '../data/content'
import { hasCaseStudy } from '../data/caseStudies'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

function WebProjectCard({
  project,
}: {
  project: (typeof WEB_PROJECTS)[0]
}) {
  const caseStudy = hasCaseStudy(project.slug)

  const card = (
    <div className="glass rounded-2xl overflow-hidden h-full flex flex-col group hover:border-violet/20 transition-colors duration-500">
      <div className="relative p-3 pb-0">
        <ProjectScreenshot
          slug={project.slug}
          name={project.name}
          url={project.url}
          gradient={project.gradient}
        />
        {caseStudy && (
          <span className="absolute top-5 left-5 z-10 px-2 py-0.5 rounded text-[9px] font-mono bg-base/90 text-violet border border-violet/30 backdrop-blur-sm">
            Case Study
          </span>
        )}
      </div>

      <div className="p-5 md:p-6 flex flex-col flex-1">
        <h3 className="font-display text-lg md:text-xl mb-2 text-white leading-snug">
          {project.name}
        </h3>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-text-muted">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center gap-4">
          {caseStudy && (
            <Link
              to={`/work/${project.slug}`}
              className="text-sm text-violet hover:text-cyan transition-colors font-medium"
              data-cursor-hover
            >
              Read case study →
            </Link>
          )}
          <MagneticButton
            as="a"
            href={project.url}
            variant="ghost"
            className="!px-0 !py-0 text-cyan hover:!text-cyan text-sm font-medium"
            strength={0.2}
          >
            View Live ↗
          </MagneticButton>
        </div>
      </div>
    </div>
  )

  return <TiltCard className="h-full">{card}</TiltCard>
}

function AIProjectCard({
  project,
}: {
  project: (typeof AI_PROJECTS)[0]
}) {
  const caseStudy = hasCaseStudy(project.slug)

  const inner = (
    <>
      <div className="relative">
        <AICardMedia
          name={project.name}
          slug={project.slug}
          image={project.image}
          video={project.video}
        />
        <div className="absolute top-3 right-3 px-2 py-0.5 rounded text-[9px] font-mono bg-base/80 text-cyan border border-cyan/30">
          CV
        </div>
        {caseStudy && (
          <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[9px] font-mono bg-base/80 text-violet border border-violet/30">
            Case Study
          </span>
        )}
      </div>

      <div className="p-5 md:p-6">
        <h3 className="font-display text-base md:text-lg mb-2 leading-snug text-white">
          {project.name}
        </h3>
        <p className="text-text-muted text-sm mb-4 leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full border border-cyan/20 text-cyan/80"
            >
              {tag}
            </span>
          ))}
        </div>
        {caseStudy && (
          <Link
            to={`/work/${project.slug}`}
            className="text-sm text-violet hover:text-cyan transition-colors font-medium"
            data-cursor-hover
          >
            Read case study →
          </Link>
        )}
      </div>
    </>
  )

  if (caseStudy) {
    return (
      <Link
        to={`/work/${project.slug}`}
        className="block glass rounded-2xl overflow-hidden group hover:border-cyan/20 transition-colors duration-500 text-text no-underline"
        data-cursor-hover
      >
        {inner}
      </Link>
    )
  }

  return (
    <div className="glass rounded-2xl overflow-hidden group hover:border-cyan/20 transition-colors duration-500 text-text">
      {inner}
    </div>
  )
}

export function Projects() {
  const webGridRef = useRef<HTMLDivElement>(null)
  const aiGridRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const animateGrid = (ref: { current: HTMLDivElement | null }) => {
      if (!ref.current || reduced) return
      const cards = ref.current.children
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%',
            once: true,
          },
        }
      )
    }

    animateGrid(webGridRef)
    animateGrid(aiGridRef)
  }, [reduced])

  return (
    <section id="projects" className="section-block">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeading
          label="Featured Work"
          title="Shipped & live."
          subtitle="Production websites and real-time AI systems — both built to perform."
          className="!mb-2"
        />

        <div className="mb-2">
          <h3 className="font-display text-lg md:text-xl text-white mb-1 flex items-center gap-3">
            <span className="w-8 h-px bg-violet" />
            Web Development
          </h3>
          <p className="text-text-muted text-sm ml-11">Interfaces that convert — live in production.</p>
        </div>

        <div
          ref={webGridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-8 md:mb-10"
        >
          {WEB_PROJECTS.map((project) => (
            <WebProjectCard key={project.slug} project={project} />
          ))}
        </div>

        <div className="mb-2">
          <h3 className="font-display text-lg md:text-xl gradient-text-warm mb-1 flex items-center gap-3">
            <span className="w-8 h-px bg-cyan" />
            AI & Computer Vision
          </h3>
          <p className="text-text-muted text-sm ml-11">
            Beyond the browser — real-time systems that see.
          </p>
        </div>

        <div
          ref={aiGridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {AI_PROJECTS.map((project) => (
            <AIProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
