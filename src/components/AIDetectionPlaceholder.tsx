import { useReducedMotion } from '../hooks/useReducedMotion'

interface AIDetectionPlaceholderProps {
  name: string
}

export function AIDetectionPlaceholder({ name }: AIDetectionPlaceholderProps) {
  const reduced = useReducedMotion()

  return (
    <div className="relative w-full aspect-video bg-base overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet/10 via-base to-cyan/10" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(34,211,238,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.15) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="absolute inset-[15%] border border-cyan/40 rounded-sm">
        <span className="absolute -top-5 left-0 text-[9px] tracking-wider text-cyan font-mono uppercase">
          detecting
        </span>
        <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan animate-pulse" />
      </div>

      <div className="absolute inset-[30%_20%] border border-violet/30 rounded-sm opacity-60" />
      <div className="absolute inset-[45%_35%] border border-pink/30 rounded-sm opacity-40" />

      {!reduced && (
        <div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan to-transparent opacity-70"
          style={{ animation: 'scan-line 3s ease-in-out infinite' }}
        />
      )}

      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
        <span className="text-[9px] font-mono text-text-muted truncate">{name}</span>
        <span className="text-[9px] font-mono text-cyan">LIVE</span>
      </div>
    </div>
  )
}
