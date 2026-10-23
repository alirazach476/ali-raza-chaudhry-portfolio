import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TECH_STACK, MARQUEE_KEYWORDS } from '../data/content'
import { SectionHeading } from '../components/SectionHeading'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

function Marquee() {
  const reduced = useReducedMotion()
  const items = [...MARQUEE_KEYWORDS, ...MARQUEE_KEYWORDS]

  return (
    <div className="overflow-hidden py-4 mb-6 border-y border-white/6">
      <div
        className="flex gap-8 whitespace-nowrap"
        style={reduced ? {} : { animation: 'marquee 40s linear infinite' }}
      >
        {items.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="text-sm md:text-base tracking-wider text-text-muted/60 font-medium uppercase shrink-0"
          >
            {word}
            <span className="mx-4 text-violet/40">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export function TechStack() {
  const gridRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!gridRef.current || reduced) return

    const pills = gridRef.current.querySelectorAll('.tech-pill')
    gsap.fromTo(
      pills,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.03,
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    )
  }, [reduced])

  return (
    <section id="stack" className="section-block">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeading
          title="The stack."
          subtitle="The tools behind every pixel and every prediction."
          className="text-center [&_h2]:text-3xl [&_h2]:md:text-4xl [&_p]:mx-auto"
        />

        <Marquee />

        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {Object.entries(TECH_STACK).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-[10px] tracking-[0.25em] uppercase text-cyan mb-5 font-medium">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="tech-pill px-4 py-2 rounded-full glass text-sm text-text-muted
                      hover:text-text hover:border-violet/30 hover:shadow-[0_0_20px_rgba(124,58,237,0.15)]
                      transition-all duration-300 cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
