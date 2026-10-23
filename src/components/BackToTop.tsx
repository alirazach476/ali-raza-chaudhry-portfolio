import { useEffect, useState } from 'react'
import { MagneticButton } from './MagneticButton'
import { scrollToTop } from '../providers/SmoothScrollProvider'

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <div className="back-to-top fixed bottom-8 right-8 z-[8000]">
      <MagneticButton
        variant="outline"
        onClick={() => scrollToTop()}
        className="!px-4 !py-4 !rounded-full glass"
        aria-label="Back to top"
        strength={0.4}
      >
        ↑
      </MagneticButton>
    </div>
  )
}
