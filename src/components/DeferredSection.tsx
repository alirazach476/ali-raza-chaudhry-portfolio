import { useEffect, useRef, useState, type ReactNode } from 'react'

interface DeferredSectionProps {
  children: ReactNode
  fallback?: ReactNode
  minHeight?: string
  rootMargin?: string
}

export function DeferredSection({
  children,
  fallback = null,
  minHeight = '30vh',
  rootMargin = '300px 0px',
}: DeferredSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin])

  return (
    <div ref={ref} style={visible ? undefined : { minHeight }}>
      {visible ? children : fallback}
    </div>
  )
}
