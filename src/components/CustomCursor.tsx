import { useEffect, useRef, useState } from 'react'
import { motion, useSpring } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function CustomCursor() {
  const reduced = useReducedMotion()
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)
  const pos = useRef({ x: 0, y: 0 })

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 }
  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)

  useEffect(() => {
    if (reduced || window.matchMedia('(pointer: coarse)').matches) return

    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const enter = () => setHovering(true)
    const leave = () => setHovering(false)

    window.addEventListener('mousemove', move, { passive: true })
    document.addEventListener('mouseenter', () => setVisible(true))
    document.addEventListener('mouseleave', () => setVisible(false))

    const interactives = document.querySelectorAll(
      'a, button, [data-magnetic], [data-cursor-hover], input, textarea, select'
    )
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', enter)
      el.addEventListener('mouseleave', leave)
    })

    const observer = new MutationObserver(() => {
      const els = document.querySelectorAll(
        'a, button, [data-magnetic], [data-cursor-hover], input, textarea, select'
      )
      els.forEach((el) => {
        el.removeEventListener('mouseenter', enter)
        el.removeEventListener('mouseleave', leave)
        el.addEventListener('mouseenter', enter)
        el.addEventListener('mouseleave', leave)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', move)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', enter)
        el.removeEventListener('mouseleave', leave)
      })
      observer.disconnect()
    }
  }, [reduced, visible, x, y])

  if (reduced || typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[10000] mix-blend-difference"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="rounded-full bg-white"
          animate={{
            width: hovering ? 48 : 12,
            height: hovering ? 48 : 12,
          }}
          transition={{ type: 'spring', ...springConfig }}
        />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible ? 0.15 : 0 }}
      >
        <motion.div
          className="rounded-full border border-violet/50"
          animate={{
            width: hovering ? 64 : 32,
            height: hovering ? 64 : 32,
          }}
          transition={{ type: 'spring', damping: 30, stiffness: 200 }}
        />
      </motion.div>
    </>
  )
}
