import type { Job, Status, WorkFormat } from '../types'
import { STATUSES } from './StatusBadge'

export interface Filters {
  query: string
  status: Status | 'all'
  format: WorkFormat | 'all'
}

export function FilterBar({
  jobs,
  filters,
  onChange,
}: {
  jobs: Job[]
  filters: Filters
  onChange: (f: Filters) => void
}) {
  const count = (s: Status | 'all') => (s === 'all' ? jobs.length : jobs.filter((j) => j.status === s).length)

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
      <label className="relative block lg:w-72">
        <span className="sr-only">Search by role or company</span>
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-faint">
          <circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10.5 10.5 L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          value={filters.query}
          onChange={(e) => onChange({ ...filters, query: e.target.value })}
          placeholder="Search role or company"
          className="h-9 w-full rounded-md border border-strong bg-surface pr-3 pl-9 text-sm placeholder:text-faint"
        />
      </label>

      <div role="radiogroup" aria-label="Filter by status" className="flex flex-wrap gap-1.5">
        {[{ value: 'all' as const, label: 'All' }, ...STATUSES].map((s) => {
          const active = filters.status === s.value
          return (
            <button
              key={s.value}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange({ ...filters, status: s.value })}
              className={`h-8 rounded-full border px-3 text-sm transition-colors ${
                active ? 'border-accent bg-accent-soft font-medium text-accent' : 'border-subtle bg-surface text-muted hover:bg-hover hover:text-text'
              }`}
            >
              {s.label} <span className="tabular text-faint">{count(s.value)}</span>
            </button>
          )
        })}
      </div>

      <label className="flex items-center gap-2 lg:ml-auto">
        <span className="text-sm text-muted">Format</span>
        <select
          value={filters.format}
          onChange={(e) => onChange({ ...filters, format: e.target.value as Filters['format'] })}
          className="h-9 rounded-md border border-strong bg-surface px-2 text-sm"
        >
          <option value="all">Any</option>
          <option value="remote">Remote</option>
          <option value="hybrid">Hybrid</option>
          <option value="office">Office</option>
        </select>
      </label>
    </div>
  )
}
