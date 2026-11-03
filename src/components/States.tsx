import { Button } from './Button'

export function TableSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <div role="status" aria-label="Loading vacancies" className="divide-y divide-subtle">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 px-4" style={{ height: 'var(--row-height)' }}>
          <div className="skeleton h-3 w-56" />
          <div className="skeleton h-3 w-28" />
          <div className="skeleton ml-auto h-3 w-20" />
          <div className="skeleton h-5 w-20 rounded-full" />
        </div>
      ))}
    </div>
  )
}

export function EmptyState({
  title,
  text,
  action,
}: {
  title: string
  text: string
  action?: { label: string; onClick: () => void }
}) {
  return (
    <div className="flex flex-col items-center px-6 py-16 text-center">
      <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true" className="mb-4 text-faint">
        <rect x="6" y="9" width="28" height="24" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M6 16 H34" stroke="currentColor" strokeWidth="2" />
        <path d="M14 24 H26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <h2 className="text-base font-semibold">{title}</h2>
      <p className="mt-1 max-w-sm text-muted">{text}</p>
      {action && (
        <Button className="mt-4" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  )
}

export function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div role="alert" className="flex flex-col items-center px-6 py-16 text-center">
      <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true" className="mb-4 text-danger">
        <circle cx="20" cy="20" r="15" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M20 12 V22" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="20" cy="28" r="1.6" fill="currentColor" />
      </svg>
      <h2 className="text-base font-semibold">Couldn't load vacancies</h2>
      <p className="mt-1 max-w-sm text-muted">The data source isn't responding. Your saved statuses are safe — try again in a moment.</p>
      <Button variant="primary" className="mt-4" onClick={onRetry}>
        Try again
      </Button>
    </div>
  )
}
