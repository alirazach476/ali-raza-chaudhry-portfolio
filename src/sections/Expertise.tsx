import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionHeading } from '../components/SectionHeading'
import { EXPERTISE } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: (typeof EXPERTISE)[0]
  isOpen: boolean
  onToggle: () => void
}) {
  const contentRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!contentRef.current || !innerRef.current || reduced) return

    if (isOpen) {
      gsap.to(contentRef.current, {
        height: innerRef.current.scrollHeight,
        duration: 0.8,
        ease: 'power3.inOut',
      })
      gsap.fromTo(
        innerRef.current.children,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.08, delay: 0.15 }
      )
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        duration: 0.6,
        ease: 'power3.inOut',
      })
    }
  }, [isOpen, reduced])

  return (
    <div className="group border-b border-white/8 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-6 py-7 md:py-9 text-left transition-colors duration-300 hover:bg-white/[0.02] px-2 -mx-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-violet/50"
        aria-expanded={isOpen}
      >
        <span className="font-display text-sm text-text-muted w-8 shrink-0">{item.id}</span>
        <span className="font-display text-xl md:text-2xl lg:text-3xl flex-1 group-hover:gradient-text transition-all duration-300">
          {item.title}
        </span>
        <span
          className={`text-2xl text-cyan transition-transform duration-500 ${isOpen ? 'rotate-45' : ''}`}
          aria-hidden="true"
        >
          +
        </span>
      </button>

      <div ref={contentRef} className="overflow-hidden h-0" aria-hidden={!isOpen}>
        <div ref={innerRef} className="pb-8 pl-10 sm:pl-14 pr-4">
          <p className="text-text-muted text-base leading-relaxed mb-5 max-w-2xl">
            {item.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-full text-xs glass text-text-muted hover:text-cyan hover:border-cyan/30 transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function Expertise() {
  const [openIndex, setOpenIndex] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!sectionRef.current || reduced) return

    gsap.fromTo(
      sectionRef.current.querySelectorAll('.accordion-row'),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      }
    )
  }, [reduced])

  return (
    <section id="expertise" className="section-block">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeading
          compact
          label="Expertise"
          title="What I do best."
          subtitle="Four disciplines, one integrated skillset — from pixels to pipelines."
        />

        <div ref={sectionRef} className="glass rounded-2xl px-6 md:px-10 overflow-hidden">
          {EXPERTISE.map((item, i) => (
            <div key={item.id} className="accordion-row relative">
              <div
                className={`absolute inset-0 bg-gradient-to-r from-violet/5 via-indigo/5 to-cyan/5 opacity-0 transition-opacity duration-500 pointer-events-none ${
                  openIndex === i ? 'opacity-100' : ''
                }`}
              />
              <AccordionItem
                item={item}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
