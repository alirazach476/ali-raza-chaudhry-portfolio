import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionHeading } from '../components/SectionHeading'
import { BrandLogo } from '../components/BrandLogo'
import { EXPERIENCE } from '../data/experience'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

function CompanyBadge({
  initials,
  gradient,
  glow,
  logo,
  company,
}: {
  initials: string
  gradient: string
  glow: string
  logo?: string
  company: string
}) {
  const [error, setError] = useState(false)

  return (
    <div
      className={`experience-badge shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center overflow-hidden p-1.5 bg-gradient-to-br ${gradient} ring-2 ring-white/10`}
      style={{ boxShadow: `0 0 24px ${glow}` }}
    >
      {logo && !error ? (
        <div className="w-full h-full rounded-lg bg-white flex items-center justify-center p-1.5">
          <BrandLogo
            logo={logo}
            alt={`${company} logo`}
            onFailed={() => setError(true)}
          />
        </div>
      ) : (
        <span className="font-display text-sm md:text-base text-white">{initials}</span>
      )}
    </div>
  )
}

function ExperiencePreview({
  preview,
  company,
  url,
  gradient,
}: {
  preview?: string
  company: string
  url?: string
  gradient: string
}) {
  const [error, setError] = useState(false)
  if (!preview || error) return null

  const image = (
    <div className="experience-preview group/preview relative overflow-hidden rounded-xl border border-white/10 bg-black/40">
      <div
        className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${gradient} opacity-80`}
        aria-hidden="true"
      />
      <img
        src={preview}
        alt={`${company} project preview`}
        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/preview:scale-105"
        loading="lazy"
        decoding="async"
        onError={() => setError(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
      <span className="absolute bottom-2 left-2 text-[10px] uppercase tracking-wider text-white/80 font-medium">
        Live preview
      </span>
    </div>
  )

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="experience-preview-link shrink-0 w-full sm:w-auto no-underline"
        data-cursor-hover
      >
        {image}
      </a>
    )
  }

  return <div className="experience-preview-wrap shrink-0 w-full sm:w-auto">{image}</div>
}

function ExperienceCard({ entry }: { entry: (typeof EXPERIENCE)[number] }) {
  const dateRange = entry.endDate
    ? `${entry.startDate} – ${entry.endDate}`
    : `${entry.startDate} – Present`

  const CompanyName = entry.url ? (
    <a
      href={entry.url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-white hover:text-cyan transition-colors duration-300 no-underline"
      data-cursor-hover
    >
      {entry.company}
    </a>
  ) : (
    <span className="text-white">{entry.company}</span>
  )

  return (
    <article
      className={`experience-card group relative glass rounded-2xl p-5 md:p-6 border transition-all duration-500 hover:-translate-y-0.5 ${
        entry.current ? 'border-emerald/30' : 'border-white/8 hover:border-white/14'
      }`}
      style={{ '--experience-glow': entry.glow } as React.CSSProperties}
    >
      {entry.current && (
        <span className="experience-current-badge absolute top-4 right-4 md:top-5 md:right-5 z-10">
          <span className="experience-current-dot" />
          Current
        </span>
      )}

      <div
        className={`absolute top-0 left-5 right-5 md:left-6 md:right-6 h-px bg-gradient-to-r ${entry.gradient} opacity-50 group-hover:opacity-90 transition-opacity duration-500`}
        aria-hidden="true"
      />

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-5">
        <div className="flex gap-4 md:gap-5 flex-1 min-w-0">
          <CompanyBadge
            initials={entry.initials}
            gradient={entry.gradient}
            glow={entry.glow}
            logo={entry.logo}
            company={entry.company}
          />

          <div className="flex-1 min-w-0 pt-0.5">
            <h3 className="font-display text-lg md:text-xl text-white leading-tight pr-16 md:pr-20">
              {entry.role}
            </h3>

            <p className="text-sm text-text-muted mt-1">
              {CompanyName}
              <span className="text-white/25 mx-1.5">·</span>
              <span className="text-cyan/80">{entry.employmentType}</span>
            </p>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2.5 text-xs text-text-muted">
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-violet/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                {dateRange}
                <span className="text-white/20">({entry.duration})</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-cyan/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                {entry.location}
              </span>
            </div>

            {entry.description && (
              <p className="text-sm md:text-[0.9rem] text-[#e8e6f0] leading-relaxed mt-3.5">
                {entry.description}
              </p>
            )}

            <div className="flex flex-wrap gap-1.5 mt-3.5">
              {entry.skills.map((skill) => (
                <span
                  key={skill}
                  className="experience-skill-pill px-2.5 py-1 rounded-full text-[10px] md:text-xs text-white/75 border border-white/10 bg-white/[0.04]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <ExperiencePreview
          preview={entry.preview}
          company={entry.company}
          url={entry.url}
          gradient={entry.gradient}
        />
      </div>
    </article>
  )
}

export function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!timelineRef.current || reduced) return

    const cards = timelineRef.current.querySelectorAll('.experience-card')
    gsap.fromTo(
      cards,
      { opacity: 0, x: -24 },
      {
        opacity: 1,
        x: 0,
        duration: 0.75,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 82%',
          once: true,
        },
      }
    )
  }, [reduced])

  return (
    <section id="experience" className="section-block experience-section overflow-hidden">
      <div className="experience-ambient pointer-events-none" aria-hidden="true">
        <div className="experience-orb experience-orb--violet" />
        <div className="experience-orb experience-orb--cyan" />
      </div>

      <div className="relative max-w-[1400px] mx-auto">
        <SectionHeading
          label="Experience"
          title="Where I've built."
          subtitle="Founder, full-stack, backend, and frontend roles — shipped across education, SaaS, and enterprise."
        />

        <div ref={timelineRef} className="experience-timeline relative space-y-4 md:space-y-5">
          <div className="experience-timeline-line" aria-hidden="true" />

          {EXPERIENCE.map((entry) => (
            <div key={entry.id} className="experience-timeline-item relative pl-0">
              <span
                className={`experience-timeline-node absolute left-0 top-8 w-3 h-3 rounded-full bg-gradient-to-br ${entry.gradient} ring-4 ring-black/80 z-10 hidden md:block`}
                aria-hidden="true"
              />
              <ExperienceCard entry={entry} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
