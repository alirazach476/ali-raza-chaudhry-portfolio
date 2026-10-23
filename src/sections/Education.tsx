import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionHeading } from '../components/SectionHeading'
import { EDUCATION } from '../data/education'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

function EducationCard({ entry }: { entry: (typeof EDUCATION)[number] }) {
  return (
    <article
      className={`portfolio-card group relative glass p-5 md:p-6 ${
        entry.current ? 'border-cyan/30' : ''
      }`}
      style={{ boxShadow: `0 0 36px ${entry.glow}` }}
    >
      {entry.current && (
        <span className="absolute top-4 right-4 md:top-5 md:right-5 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider text-cyan border border-cyan/30 bg-cyan/10">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
          In progress
        </span>
      )}

      <div
        className={`absolute top-0 left-5 right-5 md:left-6 md:right-6 h-px bg-gradient-to-r ${entry.gradient} opacity-50 group-hover:opacity-90 transition-opacity duration-500`}
        aria-hidden="true"
      />

      <div className="flex gap-4 md:gap-5">
        <div
          className={`shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${entry.gradient} ring-2 ring-white/10`}
          style={{ boxShadow: `0 0 24px ${entry.glow}` }}
        >
          <span className="font-display text-sm md:text-base text-white">{entry.initials}</span>
        </div>

        <div className="flex-1 min-w-0 pt-0.5">
          <h3 className="font-display text-lg md:text-xl text-white leading-tight pr-24">
            {entry.degree}
          </h3>
          <p className="text-sm text-text-muted mt-1">
            <span className="text-white">{entry.institution}</span>
            <span className="text-white/25 mx-1.5">·</span>
            <span className="text-cyan/80">{entry.location}</span>
          </p>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2.5 text-xs text-text-muted">
            <span className="inline-flex items-center gap-1.5">
              <svg
                className="w-3.5 h-3.5 text-violet/70"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                />
              </svg>
              {entry.startDate} – {entry.endDate}
            </span>
          </div>

          {entry.description && (
            <p className="text-sm md:text-[0.9rem] text-[#e8e6f0] leading-relaxed mt-3.5">
              {entry.description}
            </p>
          )}

          {entry.highlights && entry.highlights.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3.5">
              {entry.highlights.map((item) => (
                <span key={item} className="portfolio-tag md:text-xs">
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export function Education() {
  const listRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!listRef.current || reduced) return

    gsap.fromTo(
      listRef.current.children,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: listRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    )
  }, [reduced])

  return (
    <section id="education" className="section-block">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeading
          label="Education"
          title="Academic foundation."
          subtitle="Formal training that underpins the systems I build in AI, data, and software."
        />

        <div ref={listRef} className="flex flex-col gap-4 md:gap-5 max-w-3xl">
          {EDUCATION.map((entry) => (
            <EducationCard key={entry.id} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  )
}
