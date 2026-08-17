import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SKILLS, MARQUEE_KEYWORDS, type SkillGroup } from '../data/content'
import { SectionHeading } from '../components/SectionHeading'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const ACCENTS: Record<SkillGroup['accent'], { text: string; dot: string; hover: string; glow: string }> = {
  violet: { text: 'text-violet-300', dot: 'bg-violet', hover: 'hover:border-violet/40', glow: 'rgba(124,58,237,0.15)' },
  cyan: { text: 'text-cyan', dot: 'bg-cyan', hover: 'hover:border-cyan/40', glow: 'rgba(34,211,238,0.15)' },
  pink: { text: 'text-pink-300', dot: 'bg-pink', hover: 'hover:border-pink/40', glow: 'rgba(244,114,182,0.15)' },
  amber: { text: 'text-amber-300', dot: 'bg-amber-400', hover: 'hover:border-amber/40', glow: 'rgba(245,158,11,0.15)' },
  emerald: { text: 'text-emerald-300', dot: 'bg-emerald-400', hover: 'hover:border-emerald-400/40', glow: 'rgba(52,211,153,0.15)' },
  blue: { text: 'text-blue-300', dot: 'bg-blue-500', hover: 'hover:border-blue-500/40', glow: 'rgba(59,130,246,0.15)' },
}

function Marquee() {
  const reduced = useReducedMotion()
  const items = [...MARQUEE_KEYWORDS, ...MARQUEE_KEYWORDS]

  return (
    <div className="overflow-hidden py-4 mb-8 border-y border-white/6">
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

export function Skills() {
  const gridRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!gridRef.current || reduced) return

    const cards = gridRef.current.querySelectorAll('.skill-group')
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: gridRef.current, start: 'top 82%', once: true },
      }
    )
  }, [reduced])

  return (
    <section id="skills" className="section-block">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeading
          label="Skills"
          title="The full toolkit."
          subtitle="Everything I use to take an idea from first commit to production deploy."
        />

        <Marquee />

        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {SKILLS.map((group) => {
            const accent = ACCENTS[group.accent]
            return (
              <div
                key={group.category}
                className="skill-group glass rounded-2xl p-5 md:p-6 transition-colors duration-500"
                style={{ '--group-glow': accent.glow } as React.CSSProperties}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className={`w-2 h-2 rounded-full ${accent.dot}`} />
                  <h3 className={`text-[11px] tracking-[0.28em] uppercase font-semibold ${accent.text}`}>
                    {group.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-3.5 py-1.5 rounded-full glass text-sm text-text-muted border-white/8 transition-all duration-300 hover:text-text ${accent.hover} cursor-default`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
