import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionHeading } from '../components/SectionHeading'
import { APPROACH } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const CARD_ACCENTS = [
  {
    gradient: 'from-violet to-indigo',
    glow: 'rgba(124, 58, 237, 0.25)',
    border: 'hover:border-violet/40',
    stat: '7+ live sites',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
      </svg>
    ),
  },
  {
    gradient: 'from-cyan to-indigo',
    glow: 'rgba(34, 211, 238, 0.2)',
    border: 'hover:border-cyan/40',
    stat: 'Production-ready',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    gradient: 'from-pink to-violet',
    glow: 'rgba(244, 114, 182, 0.2)',
    border: 'hover:border-pink/40',
    stat: 'Real-time CV',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
]

export function Approach() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!sectionRef.current || reduced) return

    const cols = sectionRef.current.querySelectorAll('.approach-col')
    gsap.fromTo(
      cols,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          once: true,
        },
      }
    )
  }, [reduced])

  return (
    <section id="approach" className="section-block overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[50vh] rounded-full opacity-25 blur-[90px]"
          style={{
            background: 'conic-gradient(from 180deg, #7C3AED, #4F46E5, #22D3EE, #F472B6, #7C3AED)',
            animation: reduced ? 'none' : 'mesh-rotate 30s linear infinite',
          }}
        />
      </div>

      <div className="relative max-w-[1400px] mx-auto">
        <SectionHeading
          compact
          label="Approach"
          title="How I work."
          subtitle="Three principles behind every interface and every AI system I ship."
        />

        <div ref={sectionRef} className="grid md:grid-cols-3 gap-4 md:gap-5">
          {APPROACH.map((item, i) => {
            const accent = CARD_ACCENTS[i]
            return (
              <article
                key={item.title}
                className={`approach-col group relative rounded-2xl p-6 md:p-7 border border-white/10 bg-white/[0.04] backdrop-blur-md transition-all duration-500 ${accent.border}`}
                style={{
                  boxShadow: `0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)`,
                }}
              >
                <div
                  className={`absolute top-0 left-6 right-6 h-px bg-gradient-to-r ${accent.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-500`}
                  aria-hidden="true"
                />

                <div className="flex items-start justify-between gap-4 mb-5">
                  <div
                    className={`flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br ${accent.gradient} text-white shadow-lg`}
                    style={{ boxShadow: `0 8px 24px ${accent.glow}` }}
                  >
                    {accent.icon}
                  </div>
                  <span className="text-[10px] tracking-[0.3em] text-white/40 uppercase font-medium">
                    0{i + 1}
                  </span>
                </div>

                <h3 className="font-display text-xl md:text-2xl text-white mb-1 leading-tight">
                  {item.title.replace('.', '')}
                  <span className={`bg-gradient-to-r ${accent.gradient} bg-clip-text text-transparent`}>.</span>
                </h3>

                <p className="text-[11px] uppercase tracking-wider text-cyan/80 mb-4 font-medium">
                  {accent.stat}
                </p>

                <p className="text-[#d4d0de] text-sm md:text-[0.95rem] leading-relaxed">
                  {item.body}
                </p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
