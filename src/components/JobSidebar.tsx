import { useEffect, useRef } from 'react'
import type { Job, Status } from '../types'
import { Button } from './Button'
import { FitScore } from './FitScore'
import { STATUSES, StatusBadge } from './StatusBadge'

/**
 * Side panel instead of a modal: the table stays visible,
 * so the user keeps context and can move between rows.
 */
export function JobSidebar({
  job,
  onClose,
  onStatusChange,
}: {
  job: Job
  onClose: () => void
  onStatusChange: (status: Status) => void
}) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [job.id, onClose])

  return (
    <>
      <div className="fixed inset-0 z-20 lg:hidden" style={{ background: 'var(--overlay)' }} onClick={onClose} aria-hidden="true" />
      <aside
        role="dialog"
        aria-labelledby="job-title"
        className="fixed inset-y-0 right-0 z-30 flex w-full max-w-md flex-col border-l border-subtle bg-raised"
        style={{ boxShadow: 'var(--shadow-panel)' }}
      >
        <header className="flex items-start justify-between gap-4 border-b border-subtle p-5">
          <div className="min-w-0">
            <p className="text-sm text-muted">{job.company}</p>
            <h2 id="job-title" className="mt-0.5 text-lg leading-snug font-semibold">{job.title}</h2>
          </div>
          <Button ref={closeRef} variant="ghost" aria-label="Close details" onClick={onClose} className="-mr-2 w-9 px-0">
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M4 4 L12 12 M12 4 L4 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </Button>
        </header>

        <div className="flex-1 space-y-6 overflow-y-auto p-5">
          <div className="flex items-center justify-between">
            <FitScore value={job.fit} />
            <StatusBadge status={job.status} />
          </div>

          <label className="block">
            <span className="text-xs font-medium text-muted">Status</span>
            <select
              value={job.status}
              onChange={(e) => onStatusChange(e.target.value as Status)}
              className="mt-1 h-9 w-full rounded-md border border-strong bg-surface px-2 text-sm"
            >
              {STATUSES.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </label>

          <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
            {[
              ['Industry', job.industry],
              ['Format', job.format],
              ['Location', job.location],
              ['Salary', job.salary ?? 'Not stated'],
              ['Source', job.source],
              ['Added', new Date(job.addedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-xs text-muted">{k}</dt>
                <dd className="mt-0.5 first-letter:uppercase">{v}</dd>
              </div>
            ))}
          </dl>

          <section>
            <h3 className="text-xs font-medium text-muted">Blockers</h3>
            {job.blockers.length ? (
              <ul className="mt-2 space-y-1.5">
                {job.blockers.map((b) => (
                  <li key={b} className="flex gap-2 text-sm">
                    <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: 'var(--status-interview-fg)' }} />
                    {b}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-faint">No blockers found.</p>
            )}
          </section>

          {job.notes && (
            <section>
              <h3 className="text-xs font-medium text-muted">Notes</h3>
              <p className="mt-2 text-sm">{job.notes}</p>
            </section>
          )}
        </div>
      </aside>
    </>
  )
}
