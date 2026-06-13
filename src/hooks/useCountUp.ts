import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from './useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function useCountUp(target: number, duration = 2) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!ref.current) return

    if (reduced) {
      setValue(target)
      return
    }

    const obj = { val: 0 }
    const anim = gsap.to(obj, {
      val: target,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        once: true,
      },
      onUpdate: () => setValue(Math.round(obj.val)),
    })

    return () => {
      anim.kill()
    }
  }, [target, duration, reduced])

  return { ref, value }
}
