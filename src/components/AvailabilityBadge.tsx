import { AVAILABILITY } from '../data/socialProof'

export function AvailabilityBadge({ className = '' }: { className?: string }) {
  if (!AVAILABILITY.available) return null

  return (
    <div
      className={`nav-availability-badge inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-[11px] md:text-xs font-medium tracking-wide ${className}`}
    >
      <span className="nav-availability-dot relative flex h-2.5 w-2.5 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
      </span>
      <span className="nav-availability-text">{AVAILABILITY.label}</span>
    </div>
  )
}
