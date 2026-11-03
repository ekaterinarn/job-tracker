import type { Status } from '../types'

export const STATUSES: { value: Status; label: string }[] = [
  { value: 'new', label: 'New' },
  { value: 'applied', label: 'Applied' },
  { value: 'interview', label: 'Interview' },
  { value: 'offer', label: 'Offer' },
  { value: 'rejected', label: 'Rejected' },
]

// Each status has its own shape, so meaning never depends on color alone (WCAG 1.4.1).
function StatusIcon({ status }: { status: Status }) {
  const common = { width: 10, height: 10, viewBox: '0 0 10 10', 'aria-hidden': true } as const
  switch (status) {
    case 'new':
      return <svg {...common}><circle cx="5" cy="5" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
    case 'applied':
      return <svg {...common}><circle cx="5" cy="5" r="4" fill="currentColor" /></svg>
    case 'interview':
      return <svg {...common}><path d="M5 1 L9 5 L5 9 L1 5 Z" fill="currentColor" /></svg>
    case 'offer':
      return <svg {...common}><path d="M1.5 5.2 L4 7.6 L8.6 2.4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
    case 'rejected':
      return <svg {...common}><path d="M2 2 L8 8 M8 2 L2 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
  }
}

export function StatusBadge({ status }: { status: Status }) {
  const label = STATUSES.find((s) => s.value === status)?.label
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap"
      style={{ background: `var(--status-${status}-bg)`, color: `var(--status-${status}-fg)` }}
    >
      <StatusIcon status={status} />
      {label}
    </span>
  )
}
