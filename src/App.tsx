import { useCallback, useMemo, useState } from 'react'
import { Button } from './components/Button'
import { FilterBar, type Filters } from './components/FilterBar'
import { JobSidebar } from './components/JobSidebar'
import { JobsTable } from './components/JobsTable'
import { StatCards } from './components/StatCards'
import { EmptyState, ErrorState, TableSkeleton } from './components/States'
import { useJobs } from './hooks/useJobs'
import { useTheme } from './hooks/useTheme'
import type { SortDir, SortKey } from './types'

const defaultFilters: Filters = { query: '', status: 'all', format: 'all' }

export default function App() {
  const { state, items, setStatus, retry } = useJobs()
  const { theme, toggle } = useTheme()
  const [filters, setFilters] = useState<Filters>(defaultFilters)
  const [sort, setSort] = useState<{ key: SortKey; dir: SortDir }>({ key: 'fit', dir: 'desc' })
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const visible = useMemo(() => {
    const q = filters.query.trim().toLowerCase()
    const list = items.filter(
      (j) =>
        (filters.status === 'all' || j.status === filters.status) &&
        (filters.format === 'all' || j.format === filters.format) &&
        (!q || `${j.title} ${j.company} ${j.industry}`.toLowerCase().includes(q)),
    )
    const dir = sort.dir === 'asc' ? 1 : -1
    return [...list].sort((a, b) => {
      if (sort.key === 'fit') return (a.fit - b.fit) * dir
      if (sort.key === 'addedAt') return a.addedAt.localeCompare(b.addedAt) * dir
      return a.company.localeCompare(b.company) * dir
    })
  }, [items, filters, sort])

  const onSort = (key: SortKey) =>
    setSort((s) => (s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: key === 'company' ? 'asc' : 'desc' }))

  const closeSidebar = useCallback(() => setSelectedId(null), [])
  const selected = items.find((j) => j.id === selectedId)
  const filtersActive = filters.query !== '' || filters.status !== 'all' || filters.format !== 'all'

  return (
    <div className="min-h-screen">
      <header className="border-b border-subtle bg-surface">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span aria-hidden="true" className="grid h-7 w-7 place-items-center rounded-md bg-accent text-sm font-bold text-on-accent">J</span>
            <span className="font-semibold">Job Tracker</span>
          </div>
          <Button variant="ghost" onClick={toggle} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>
            {theme === 'light' ? (
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M13.5 9.5A5.5 5.5 0 0 1 6.5 2.5a5.5 5.5 0 1 0 7 7Z" fill="currentColor" /></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="3" fill="currentColor" /><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3 3l1.4 1.4M11.6 11.6 13 13M3 13l1.4-1.4M11.6 4.4 13 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
            )}
            <span className="hidden sm:inline">{theme === 'light' ? 'Dark' : 'Light'} theme</span>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-5 px-4 py-6 sm:px-6">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Vacancies</h1>
          <p className="mt-0.5 text-muted">Where I applied, how well each role fits, and what's blocking me.</p>
        </div>

        {state === 'ready' && items.length > 0 && <StatCards jobs={items} />}

        <section className="overflow-hidden rounded-lg border border-subtle bg-surface">
          {state !== 'error' && items.length > 0 && (
            <div className="border-b border-subtle p-4">
              <FilterBar jobs={items} filters={filters} onChange={setFilters} />
            </div>
          )}

          {state === 'loading' && <TableSkeleton />}
          {state === 'error' && <ErrorState onRetry={retry} />}
          {state === 'ready' && items.length === 0 && (
            <EmptyState title="No vacancies yet" text="Add the first vacancy to start tracking fit, status and blockers." />
          )}
          {state === 'ready' && items.length > 0 && visible.length === 0 && (
            <EmptyState
              title="Nothing matches these filters"
              text="Try another status or clear the search."
              action={filtersActive ? { label: 'Clear filters', onClick: () => setFilters(defaultFilters) } : undefined}
            />
          )}
          {state === 'ready' && visible.length > 0 && (
            <>
              <JobsTable jobs={visible} sort={sort} onSort={onSort} selectedId={selectedId} onSelect={setSelectedId} />
              <p className="tabular border-t border-subtle px-4 py-2.5 text-xs text-muted" aria-live="polite">
                Showing {visible.length} of {items.length}
              </p>
            </>
          )}
        </section>
      </main>

      {selected && (
        <JobSidebar job={selected} onClose={closeSidebar} onStatusChange={(s) => setStatus(selected.id, s)} />
      )}
    </div>
  )
}
