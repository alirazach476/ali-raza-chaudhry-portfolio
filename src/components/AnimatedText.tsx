import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

interface AnimatedTextProps {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  className?: string
  splitBy?: 'lines' | 'words' | 'chars'
  trigger?: boolean
  delay?: number
  stagger?: number
}

export function AnimatedText({
  text,
  as: Tag = 'p',
  className = '',
  splitBy = 'lines',
  trigger = true,
  delay = 0,
  stagger = 0.08,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!containerRef.current || reduced) return

    const el = containerRef.current
    if (trigger) el.classList.add('animated-text-pending')

    const units =
      splitBy === 'words'
        ? text.split(' ')
        : splitBy === 'chars'
          ? text.split('')
          : text.split('\n')

    el.innerHTML = units
      .map((unit, i) => {
        const content = splitBy === 'words' ? unit + (i < units.length - 1 ? '&nbsp;' : '') : unit
        return `<span class="inline-block overflow-hidden ${splitBy === 'lines' ? 'block' : ''}">
          <span class="reveal-unit inline-block">${content}</span>
        </span>`
      })
      .join(splitBy === 'lines' ? '' : '')

    const units_el = el.querySelectorAll('.reveal-unit')

    const anim = gsap.fromTo(
      units_el,
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: 'power3.out',
        stagger,
        delay,
        paused: true,
        onStart: () => el.classList.remove('animated-text-pending'),
      }
    )

    const play = () => {
      if (!anim.isActive()) anim.play()
    }

    let st: ScrollTrigger | undefined
    if (trigger) {
      st = ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: play,
        onEnterBack: play,
      })
      ScrollTrigger.refresh()
      if (ScrollTrigger.isInViewport(el, 0.12)) play()
    } else {
      play()
    }

    return () => {
      anim.kill()
      st?.kill()
      el.classList.remove('animated-text-pending')
    }
  }, [text, splitBy, trigger, delay, stagger, reduced])

  if (reduced) {
    return <Tag className={className}>{text}</Tag>
  }

  return (
    <Tag
      ref={containerRef as React.RefObject<HTMLHeadingElement & HTMLParagraphElement>}
      className={className}
      aria-label={text}
    />
  )
}
