import { useState } from 'react'
import { OptimizedImage } from './OptimizedImage'

interface ProjectScreenshotProps {
  slug: string
  name: string
  url: string
  gradient: string
}

function displayUrl(url: string) {
  try {
    return new URL(url).hostname.replace('www.', '')
  } catch {
    return url
  }
}

export function ProjectScreenshot({ slug, name, url, gradient }: ProjectScreenshotProps) {
  const [imgError, setImgError] = useState(false)
  const [usePngFallback, setUsePngFallback] = useState(false)

  if (imgError) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`project-shot-fallback w-full aspect-[16/10] bg-gradient-to-br ${gradient} flex items-center justify-center no-underline`}
        data-cursor-hover
        aria-label={`Open ${name} live site`}
      >
        <span className="font-display text-xl text-white/25">{name}</span>
      </a>
    )
  }

  const frame = (
    <>
      <div className="project-shot-chrome" aria-hidden="true">
        <div className="project-shot-dots">
          <span />
          <span />
          <span />
        </div>
        <div className="project-shot-url">{displayUrl(url)}</div>
      </div>
      <div className="project-shot-viewport">
        {usePngFallback ? (
          <img
            src={`/projects/${slug}.png`}
            alt={`${name} live site preview`}
            className="project-shot-image"
            onError={() => setImgError(true)}
            loading="lazy"
            decoding="async"
            width={1440}
            height={900}
          />
        ) : (
          <OptimizedImage
            baseSrc={`/projects/${slug}`}
            fallbackExt="png"
            alt={`${name} live site preview`}
            className="project-shot-image"
            onError={() => setUsePngFallback(true)}
            loading="lazy"
            decoding="async"
            width={1440}
            height={900}
          />
        )}
        <div className="project-shot-shine" aria-hidden="true" />
        <div className="project-shot-vignette" aria-hidden="true" />
      </div>
    </>
  )

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="project-shot-frame group/frame block no-underline"
      data-cursor-hover
      aria-label={`Open ${name} live site`}
    >
      {frame}
    </a>
  )
}
