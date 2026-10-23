import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

interface VideoLightboxProps {
  src: string
  title: string
  poster?: string
  onClose: () => void
}

export function VideoLightbox({ src, title, poster, onClose }: VideoLightboxProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [needsTap, setNeedsTap] = useState(false)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === ' ' || e.key === 'k' || e.key === 'K') {
        e.preventDefault()
        const v = videoRef.current
        if (!v) return
        if (v.paused) void v.play().catch(() => setNeedsTap(true))
        else v.pause()
      }
    }
    window.addEventListener('keydown', onKey)

    const v = videoRef.current
    let cancelled = false

    const startPlayback = async () => {
      if (!v || cancelled) return
      try {
        v.currentTime = 0
        // Muted autoplay is allowed; unmute after play starts when possible.
        v.muted = true
        await v.play()
        if (cancelled) return
        v.muted = false
        setNeedsTap(false)
      } catch {
        if (!cancelled) setNeedsTap(true)
      }
    }

    void startPlayback()

    return () => {
      cancelled = true
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
      v?.pause()
    }
  }, [onClose, src])

  const handlePlayClick = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = false
    void v.play()
      .then(() => setNeedsTap(false))
      .catch(() => setNeedsTap(true))
  }

  return createPortal(
    <div
      className="video-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div className="video-lightbox-panel" onClick={(e) => e.stopPropagation()}>
        <div className="video-lightbox-bar">
          <h3 className="video-lightbox-title">{title}</h3>
          <button
            type="button"
            className="video-lightbox-close"
            onClick={onClose}
            aria-label="Close video"
            data-cursor-hover
          >
            ✕
          </button>
        </div>

        <div className="video-lightbox-stage">
          <video
            ref={videoRef}
            key={src}
            src={src}
            poster={poster}
            controls
            playsInline
            preload="auto"
            className="video-lightbox-player"
          />
          {needsTap && (
            <button
              type="button"
              className="video-lightbox-play"
              onClick={handlePlayClick}
              data-cursor-hover
              aria-label={`Play ${title}`}
            >
              ▶ Play
            </button>
          )}
        </div>

        <p className="video-lightbox-hint">Space = play/pause · Esc = close</p>
      </div>
    </div>,
    document.body
  )
}
