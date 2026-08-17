import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionHeading } from '../components/SectionHeading'
import { AICardMedia } from '../components/AICardMedia'
import { AI_PROJECTS } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

function AICard({ project }: { project: (typeof AI_PROJECTS)[number] }) {
  return (
    <div className="glass rounded-2xl overflow-hidden group hover:border-cyan/20 transition-colors duration-500 text-text h-full flex flex-col">
      <div className="relative">
        <AICardMedia name={project.name} slug={project.slug} image={project.image} />
        <div className="absolute top-3 right-3 px-2 py-0.5 rounded text-[9px] font-mono bg-base/80 text-cyan border border-cyan/30">
          CV
        </div>
      </div>

      <div className="p-5 md:p-6 flex flex-col flex-1">
        <h3 className="font-display text-base md:text-lg mb-2 leading-snug text-white">{project.name}</h3>
        <p className="text-text-muted text-sm mb-4 leading-relaxed">{project.description}</p>
        <div className="mt-auto flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full border border-cyan/20 text-cyan/80"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export function AI() {
  const gridRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!gridRef.current || reduced) return
    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: gridRef.current, start: 'top 82%', once: true },
      }
    )
  }, [reduced])

  return (
    <section id="ai" className="section-block">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeading
          label="AI / Computer Vision"
          title="Systems that see."
          subtitle="Real-time computer vision and ML built in Python — detection, tracking, counting, and OCR."
        />

        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {AI_PROJECTS.map((project) => (
            <AICard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
