import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scrollToTop } from '../providers/SmoothScrollProvider'

gsap.registerPlugin(ScrollTrigger)

export function useScrollRefresh() {
  const { pathname } = useLocation()

  useEffect(() => {
    scrollToTop()
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)
    return () => clearTimeout(timer)
  }, [pathname])
}
