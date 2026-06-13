import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { OptimizedImage } from './OptimizedImage'
import { useMouseParallax } from '../hooks/useMouseParallax'
import { useReducedMotion } from '../hooks/useReducedMotion'

const PHOTO_BASE = '/abdullah'

interface HeroPhotoProps {
  immersive?: boolean
}

export function HeroPhoto({ immersive = false }: HeroPhotoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const offset = useMouseParallax({ intensity: immersive ? 20 : 16 })
  const reduced = useReducedMotion()
  const [ready, setReady] = useState(false)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    if (!containerRef.current || reduced || !ready) return
    gsap.fromTo(
      containerRef.current,
      { scale: 1.05, opacity: 0, y: 50 },
      { scale: 1, opacity: 1, y: 0, duration: 1.5, ease: 'power3.out', delay: 0.4 }
    )
  }, [reduced, ready])

  const parallaxStyle = reduced
    ? {}
    : {
        transform: `translate(${offset.x * 0.5}px, ${offset.y * 0.35}px)`,
      }

  const stageClass = immersive ? 'hero-photo-immersive' : 'hero-photo-stage'

  const handleImageReady = () => setReady(true)
  const handleImageError = () => {
    setImageError(true)
    setReady(true)
  }

  if (!ready && !imageError) {
    return (
      <div className={`${stageClass} animate-pulse`} aria-hidden="true">
        <div className="h-[85vh] w-56 bg-white/5 rounded-t-full mx-auto" />
      </div>
    )
  }

  if (imageError) {
    return (
      <div ref={containerRef} className={stageClass} style={parallaxStyle}>
        <div className="glass rounded-2xl p-8 text-center text-sm text-text-muted z-30">
          Run <code className="text-cyan">npm run cutout</code> to process your photo.
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className={stageClass} style={parallaxStyle}>
      <div className="hero-photo-rim hero-photo-rim--immersive" aria-hidden="true" />

      <div className={`hero-photo-inner${reduced ? '' : ' hero-photo-float'}`}>
        <OptimizedImage
          baseSrc={PHOTO_BASE}
          fallbackExt="png"
          alt="Abdullah Yaseen — Full-Stack Developer & AI Engineer"
          width={700}
          height={1000}
          fetchPriority="high"
          decoding="async"
          onLoad={handleImageReady}
          onError={handleImageError}
          className={immersive ? 'hero-photo-cutout--immersive' : 'hero-photo-cutout'}
        />

        <div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background:
              'linear-gradient(90deg, rgba(124,58,237,0.15) 0%, transparent 20%, transparent 80%, rgba(34,211,238,0.12) 100%)',
            mixBlendMode: 'soft-light',
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  )
}
