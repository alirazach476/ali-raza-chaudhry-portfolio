import { forwardRef } from 'react'

type OptimizedImageProps = Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  'src'
> & {
  /** Path without extension, e.g. `/projects/autozy` */
  baseSrc: string
  fallbackExt?: 'png' | 'jpg' | 'jpeg'
}

export const OptimizedImage = forwardRef<HTMLImageElement, OptimizedImageProps>(
  function OptimizedImage(
    { baseSrc, fallbackExt = 'png', alt = '', loading, fetchPriority, ...props },
    ref
  ) {
    const normalized = baseSrc.replace(/\.(png|jpe?g|webp)$/i, '')
    const fallback = `${normalized}.${fallbackExt}`
    const resolvedLoading = loading ?? (fetchPriority === 'high' ? 'eager' : 'lazy')

    return (
      <picture>
        <source srcSet={`${normalized}.webp`} type="image/webp" />
        <img
          ref={ref}
          src={fallback}
          alt={alt}
          loading={resolvedLoading}
          fetchPriority={fetchPriority}
          decoding={props.decoding ?? 'async'}
          {...props}
        />
      </picture>
    )
  }
)
