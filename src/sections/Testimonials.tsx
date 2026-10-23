import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionHeading } from '../components/SectionHeading'
import { TESTIMONIALS } from '../data/socialProof'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

function TestimonialAvatar({ initials, name }: { initials: string; name: string }) {
  return (
    <div
      className="w-11 h-11 rounded-full bg-gradient-to-br from-violet to-cyan flex items-center justify-center text-xs font-bold text-white shrink-0 ring-2 ring-white/15"
      aria-label={name}
    >
      {initials}
    </div>
  )
}

export function Testimonials() {
  const gridRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState<string | null>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!gridRef.current || reduced) return
    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: gridRef.current, start: 'top 85%', once: true },
      }
    )
  }, [reduced])

  useEffect(() => {
    if (reduced) return
    const timer = setInterval(() => setActive((a) => (a + 1) % TESTIMONIALS.length), 6000)
    return () => clearInterval(timer)
  }, [reduced])

  useEffect(() => {
    if (!lightbox) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [lightbox])

  return (
    <section id="testimonials" className="section-block">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeading
          compact
          label="Client Reviews"
          title="What clients say."
          subtitle="Verified Fiverr feedback — original reviews with screenshots."
        />

        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-6 md:mb-8">
          {TESTIMONIALS.map((t, i) => (
            <article
              key={`${t.name}-${t.meta ?? i}`}
              className={`portfolio-card relative glass overflow-hidden flex flex-col ${
                active === i && !reduced
                  ? 'border-violet/35 shadow-[0_0_30px_rgba(124,58,237,0.12)]'
                  : ''
              }`}
            >
              {t.screenshot && (
                <button
                  type="button"
                  className="block w-full border-0 bg-transparent p-0 cursor-pointer text-left"
                  onClick={() => setLightbox(t.screenshot!)}
                  data-cursor-hover
                  aria-label={`View ${t.name} review screenshot`}
                >
                  <img
                    src={t.screenshot}
                    alt={`Fiverr review from ${t.name}`}
                    className="w-full h-auto max-h-44 object-cover object-top border-b border-white/8"
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              )}

              <div className="p-5 md:p-6 flex flex-col flex-1">
                <div className="flex items-center gap-1 mb-3 text-amber-300 text-sm" aria-label="5 star rating">
                  {'★★★★★'}
                  <span className="ml-1.5 text-text-muted text-xs font-medium">5.0</span>
                </div>
                <p className="relative text-text-muted text-sm leading-relaxed mb-5 flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  <TestimonialAvatar initials={t.initials} name={t.name} />
                  <div>
                    <p className="text-sm font-medium text-white">{t.name}</p>
                    <p className="text-xs text-text-muted">
                      {t.role} · {t.company}
                    </p>
                    {t.meta && <p className="text-[10px] text-text-muted/70 mt-0.5">{t.meta}</p>}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[25000] flex items-center justify-center p-4 bg-base/90 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Review screenshot"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            className="absolute top-5 right-5 w-10 h-10 rounded-lg border border-white/15 bg-white/5 text-white cursor-pointer"
            onClick={() => setLightbox(null)}
            aria-label="Close"
            data-cursor-hover
          >
            ✕
          </button>
          <img
            src={lightbox}
            alt="Fiverr review screenshot"
            className="max-w-full max-h-[85vh] rounded-xl border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}
