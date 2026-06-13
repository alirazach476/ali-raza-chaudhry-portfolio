type OptimizedImageProps = Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  'src'
> & {
  /** Path without extension, e.g. `/projects/autozy` */
  baseSrc: string
  fallbackExt?: 'png' | 'jpg' | 'jpeg'
}

export function OptimizedImage({
  baseSrc,
  fallbackExt = 'png',
  alt = '',
  loading,
  fetchPriority,
  ...props
}: OptimizedImageProps) {
  const normalized = baseSrc.replace(/\.(png|jpe?g|webp)$/i, '')
  const fallback = `${normalized}.${fallbackExt}`
  const resolvedLoading = loading ?? (fetchPriority === 'high' ? 'eager' : 'lazy')

  return (
    <picture>
      <source srcSet={`${normalized}.webp`} type="image/webp" />
      <img
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
