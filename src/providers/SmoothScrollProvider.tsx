import { useEffect, useRef, type ReactNode } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

interface SmoothScrollProviderProps {
  children: ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    let lenis: Lenis | null = null
    let ticker: ((time: number) => void) | null = null
    let cancelled = false

    const setup = () => {
      if (cancelled) return

      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
      })

      lenisRef.current = lenis
      registerLenis(lenis)
      lenis.on('scroll', ScrollTrigger.update)

      ticker = (time: number) => {
        lenis?.raf(time * 1000)
      }

      gsap.ticker.add(ticker)
      gsap.ticker.lagSmoothing(0)
    }

    const win = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }

    if (win.requestIdleCallback) {
      const id = win.requestIdleCallback(setup, { timeout: 1200 })
      return () => {
        cancelled = true
        win.cancelIdleCallback?.(id)
        if (ticker) gsap.ticker.remove(ticker)
        lenis?.destroy()
        lenisRef.current = null
        registerLenis(null)
      }
    }

    const timer = setTimeout(setup, 120)
    return () => {
      cancelled = true
      clearTimeout(timer)
      if (ticker) gsap.ticker.remove(ticker)
      lenis?.destroy()
      lenisRef.current = null
      registerLenis(null)
    }
  }, [reduced])

  return <>{children}</>
}

let lenisInstance: Lenis | null = null

export function registerLenis(lenis: Lenis | null) {
  lenisInstance = lenis
}

export function scrollToTop() {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { duration: 1.2 })
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

export function scrollTo(target: string | HTMLElement, offset = 0) {
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (!el) return

  const top = el.getBoundingClientRect().top + window.scrollY + offset

  if (lenisInstance) {
    lenisInstance.scrollTo(top, { duration: 1.2 })
  } else {
    window.scrollTo({ top, behavior: 'smooth' })
  }
}
