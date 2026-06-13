import { AVAILABILITY } from '../data/socialProof'

export function AvailabilityBadge({ className = '' }: { className?: string }) {
  if (!AVAILABILITY.available) return null

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[10px] md:text-xs tracking-wide text-text-muted ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
      {AVAILABILITY.label}
    </div>
  )
}
