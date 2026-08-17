import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionHeading } from '../components/SectionHeading'
import { CERTIFICATES, type Certificate } from '../data/certificates'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const ISSUER_STYLES: Record<
  Certificate['issuer'],
  { gradient: string; glow: string; badge: string }
> = {
  Coursera: {
    gradient: 'from-blue-500/20 to-indigo-500/10',
    glow: 'rgba(59, 130, 246, 0.18)',
    badge: 'text-blue-300 border-blue-400/30 bg-blue-500/10',
  },
  Udemy: {
    gradient: 'from-violet/20 to-fuchsia/500/10',
    glow: 'rgba(124, 58, 237, 0.18)',
    badge: 'text-violet-300 border-violet/30 bg-violet/10',
  },
  Workcango: {
    gradient: 'from-cyan/20 to-teal-500/10',
    glow: 'rgba(34, 211, 238, 0.18)',
    badge: 'text-cyan border-cyan/30 bg-cyan/10',
  },
}

function CertificateCard({ cert }: { cert: Certificate }) {
  const [imageError, setImageError] = useState(false)
  const styles = ISSUER_STYLES[cert.issuer]

  const cardClass = `certificate-card group glass rounded-2xl overflow-hidden border border-white/10 transition-all duration-500 hover:-translate-y-1 hover:border-white/20 ${
    cert.verifyUrl ? 'no-underline block cursor-pointer' : ''
  }`

  const content = (
    <>
      <div
        className={`certificate-thumb relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${styles.gradient}`}
      >
        {!imageError ? (
          <img
            src={cert.image}
            alt={`${cert.title} certificate`}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
            loading="lazy"
            decoding="async"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-text-muted text-sm px-4 text-center">
            Certificate preview unavailable
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
        <span
          className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${styles.badge}`}
        >
          {cert.issuer}
        </span>
      </div>

      <div className="p-4 md:p-5">
        <p className="text-[10px] uppercase tracking-[0.18em] text-text-muted mb-1.5">
          {cert.provider} · {cert.date}
        </p>
        <h3 className="font-display text-base md:text-lg text-white leading-snug mb-3">
          {cert.title}
        </h3>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {cert.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full text-[10px] text-white/70 border border-white/10 bg-white/[0.04]"
            >
              {tag}
            </span>
          ))}
        </div>
        {cert.verifyUrl ? (
          <span className="inline-flex items-center gap-1.5 text-xs text-cyan group-hover:text-cyan/80 transition-colors">
            Verify credential
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </span>
        ) : (
          <span className="text-xs text-text-muted">Issued credential</span>
        )}
      </div>
    </>
  )

  if (cert.verifyUrl) {
    return (
      <a
        href={cert.verifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Verify ${cert.title} on ${cert.issuer}`}
        className={cardClass}
        style={{ boxShadow: `0 8px 32px ${styles.glow}` }}
        data-cursor-hover
      >
        {content}
      </a>
    )
  }

  return (
    <article className={cardClass} style={{ boxShadow: `0 8px 32px ${styles.glow}` }}>
      {content}
    </article>
  )
}

export function Certificates() {
  const gridRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!gridRef.current || reduced) return

    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 82%',
          once: true,
        },
      }
    )
  }, [reduced])

  return (
    <section id="certificates" className="section-block overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeading
          label="Credentials"
          title="Certificates & training."
          subtitle="Verified courses and professional credentials in Python, cloud, Git, machine learning, and frontend development."
        />

        <div
          ref={gridRef}
          className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5"
        >
          {CERTIFICATES.map((cert) => (
            <CertificateCard key={cert.id} cert={cert} />
          ))}
        </div>
      </div>
    </section>
  )
}
