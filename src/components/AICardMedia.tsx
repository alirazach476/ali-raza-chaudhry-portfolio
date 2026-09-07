import { useState } from 'react'
import { AIDetectionPlaceholder } from './AIDetectionPlaceholder'
import { OptimizedImage } from './OptimizedImage'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface AICardMediaProps {
  name: string
  slug: string
  image?: string
  video?: string
}

export function AICardMedia({ name, slug, image, video }: AICardMediaProps) {
  const [imgError, setImgError] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const reduced = useReducedMotion()

  const imageBase = (image ?? `/ai/${slug}`).replace(/\.(png|jpe?g|webp)$/i, '')

  // Prefer demo video when available
  if (video && !videoError) {
    return (
      <div className="relative w-full aspect-video overflow-hidden bg-black">
        <video
          src={video}
          poster={image?.replace(/\.(png|jpe?g|webp)$/i, '.jpg') ?? `/ai/${slug}.jpg`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
          onError={() => setVideoError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base/50 via-transparent to-transparent pointer-events-none" />
        <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[9px] uppercase tracking-wider font-mono text-cyan border border-cyan/30 bg-base/60">
          Live demo
        </span>
      </div>
    )
  }

  if (!imgError) {
    return (
      <div className="relative w-full aspect-video overflow-hidden">
        <OptimizedImage
          baseSrc={imageBase}
          fallbackExt="jpg"
          alt={`${name} — computer vision demo`}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          width={1200}
          height={675}
          onError={() => setImgError(true)}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(34,211,238,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.08) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="absolute inset-[12%] border border-cyan/30 rounded-sm pointer-events-none">
          <span className="absolute -top-4 left-0 text-[8px] tracking-widest text-cyan font-mono uppercase">
            detecting
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-base/60 via-transparent to-violet/10 pointer-events-none" />
        {!reduced && (
          <div
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/60 to-transparent pointer-events-none"
            style={{ animation: 'scan-line 4s ease-in-out infinite', top: '40%' }}
          />
        )}
      </div>
    )
  }

  return <AIDetectionPlaceholder name={name} />
}
