import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionHeading } from '../components/SectionHeading'
import { TiltCard } from '../components/TiltCard'
import { MagneticButton } from '../components/MagneticButton'
import { ProjectScreenshot } from '../components/ProjectScreenshot'
import { FEATURED_PROJECTS, SELECTED_PROJECTS } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

function FeaturedCard({ project }: { project: (typeof FEATURED_PROJECTS)[number] }) {
  return (
    <div
      className="featured-card glass rounded-2xl overflow-hidden h-full flex flex-col group transition-all duration-500 hover:-translate-y-1"
      style={{ '--featured-glow': project.accent } as React.CSSProperties}
    >
      <div className="relative p-3 pb-0">
        <ProjectScreenshot
          slug={project.slug}
          name={project.name}
          url={project.url}
          gradient={project.gradient}
        />
        <span className="absolute top-5 left-5 z-10 px-2.5 py-1 rounded-full text-[9px] font-semibold tracking-wider uppercase bg-base/90 text-cyan border border-cyan/40 backdrop-blur-sm">
          Featured SaaS
        </span>
      </div>

      <div className="p-6 md:p-7 flex flex-col flex-1">
        <h3 className="font-display text-xl md:text-2xl text-white leading-snug">{project.name}</h3>
        <p className="text-cyan/90 text-sm mt-1 mb-3">{project.tagline}</p>
        <p className="text-text-muted text-sm leading-relaxed mb-4">{project.description}</p>

        <ul className="space-y-2 mb-5">
          {project.features.map((f) => (
            <li key={f} className="text-sm text-white/80 flex items-start gap-2.5">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map((tag) => (
            <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 text-text-muted">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto">
          <MagneticButton as="a" href={project.url} className="!px-6 !py-3 !text-sm" strength={0.25}>
            Live Demo ↗
          </MagneticButton>
        </div>
      </div>
    </div>
  )
}

function SelectedCard({ project }: { project: (typeof SELECTED_PROJECTS)[number] }) {
  return (
    <TiltCard className="h-full">
      <div className="glass rounded-2xl overflow-hidden h-full flex flex-col group hover:border-violet/20 transition-colors duration-500">
        <div className="relative p-3 pb-0">
          <ProjectScreenshot
            slug={project.slug}
            name={project.name}
            url={project.url}
            gradient={project.gradient}
          />
        </div>

        <div className="p-5 md:p-6 flex flex-col flex-1">
          <h3 className="font-display text-lg md:text-xl mb-1.5 text-white leading-snug">{project.name}</h3>
          <p className="text-text-muted text-sm mb-4 leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.map((tag) => (
              <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-text-muted">
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-auto">
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
    </TiltCard>
  )
}

export function Projects() {
  const featuredRef = useRef<HTMLDivElement>(null)
  const selectedRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const animateGrid = (ref: { current: HTMLDivElement | null }) => {
      if (!ref.current || reduced) return
      gsap.fromTo(
        ref.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
        }
      )
    }

    animateGrid(featuredRef)
    animateGrid(selectedRef)
  }, [reduced])

  return (
    <section id="projects" className="section-block">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeading
          label="Featured Projects"
          title="Products I've launched."
          subtitle="Two SaaS products of my own, plus selected client work — all live in production."
        />

        <div className="mb-2">
          <h3 className="font-display text-lg md:text-xl text-white mb-1 flex items-center gap-3">
            <span className="w-8 h-px bg-cyan" />
            Featured SaaS
          </h3>
          <p className="text-text-muted text-sm ml-11">Products built and launched from idea to deploy.</p>
        </div>

        <div ref={featuredRef} className="grid md:grid-cols-2 gap-5 md:gap-6 mb-10 md:mb-12">
          {FEATURED_PROJECTS.map((project) => (
            <FeaturedCard key={project.slug} project={project} />
          ))}
        </div>

        <div className="mb-2">
          <h3 className="font-display text-lg md:text-xl text-white mb-1 flex items-center gap-3">
            <span className="w-8 h-px bg-violet" />
            Selected Projects
          </h3>
          <p className="text-text-muted text-sm ml-11">Client sites and experiments shipped over the years.</p>
        </div>

        <div ref={selectedRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {SELECTED_PROJECTS.map((project) => (
            <SelectedCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
