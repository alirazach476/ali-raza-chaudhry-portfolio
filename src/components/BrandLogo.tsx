import { useState } from 'react'

interface BrandLogoProps {
  logo?: string
  alt: string
  className?: string
  onFailed?: () => void
}

function logoCandidates(logo?: string) {
  if (!logo) return []
  const normalized = logo.replace(/\.(png|jpe?g|webp)$/i, '')
  return [`${normalized}.webp`, `${normalized}.png`]
}

export function BrandLogo({
  logo,
  alt,
  className = 'max-w-full max-h-full object-contain',
  onFailed,
}: BrandLogoProps) {
  const candidates = logoCandidates(logo)
  const [index, setIndex] = useState(0)

  if (candidates.length === 0) return null

  return (
    <img
      src={candidates[index]}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => {
        if (index < candidates.length - 1) {
          setIndex(index + 1)
        } else {
          onFailed?.()
        }
      }}
    />
  )
}
