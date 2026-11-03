import type { Job, SortDir, SortKey } from '../types'
import { FitScore } from './FitScore'
import { StatusBadge } from './StatusBadge'

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })

function SortHeader({
  label,
  sortKey,
  sort,
  onSort,
  align = 'left',
}: {
  label: string
  sortKey: SortKey
  sort: { key: SortKey; dir: SortDir }
  onSort: (key: SortKey) => void
  align?: 'left' | 'right'
}) {
  const active = sort.key === sortKey
  return (
    <th
      scope="col"
      aria-sort={active ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none'}
      className={`px-4 font-medium ${align === 'right' ? 'text-right' : 'text-left'}`}
    >
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        className={`inline-flex items-center gap-1 rounded-sm hover:text-text ${active ? 'text-text' : ''}`}
      >
        {label}
        <span aria-hidden="true" className={active ? 'opacity-100' : 'opacity-30'}>
          {active && sort.dir === 'asc' ? '↑' : '↓'}
        </span>
      </button>
    </th>
  )
}

export function JobsTable({
  jobs,
  sort,
  onSort,
  selectedId,
  onSelect,
}: {
  jobs: Job[]
  sort: { key: SortKey; dir: SortDir }
  onSort: (key: SortKey) => void
  selectedId: string | null
  onSelect: (id: string) => void
}) {
  return (
    <>
      {/* Desktop / tablet: table */}
      <table className="hidden w-full border-collapse text-sm md:table">
        <thead className="sticky top-0 z-10 bg-surface text-xs text-muted">
          <tr className="border-b border-subtle" style={{ height: 36 }}>
            <SortHeader label="Role & company" sortKey="company" sort={sort} onSort={onSort} />
            <th scope="col" className="px-4 text-left font-medium">Industry</th>
            <th scope="col" className="px-4 text-left font-medium">Format</th>
            <SortHeader label="Fit" sortKey="fit" sort={sort} onSort={onSort} />
            <th scope="col" className="px-4 text-left font-medium">Status</th>
            <SortHeader label="Added" sortKey="addedAt" sort={sort} onSort={onSort} align="right" />
          </tr>
        </thead>
        <tbody>
          {jobs.map((j) => {
            const selected = j.id === selectedId
            return (
              <tr
                key={j.id}
                className={`border-b border-subtle transition-colors ${selected ? 'bg-accent-soft' : 'hover:bg-hover'}`}
                style={{ height: 'var(--row-height)' }}
              >
                <td className="max-w-0 px-4 lg:w-[34%]">
                  <button
                    type="button"
                    onClick={() => onSelect(j.id)}
                    aria-label={`Open ${j.title} at ${j.company}`}
                    className="block w-full truncate text-left"
                  >
                    <span className="font-medium">{j.title}</span>
                    <span className="text-muted"> · {j.company}</span>
                  </button>
                </td>
                <td className="truncate px-4 text-muted">{j.industry}</td>
                <td className="px-4 text-muted capitalize">{j.format}</td>
                <td className="px-4"><FitScore value={j.fit} /></td>
                <td className="px-4"><StatusBadge status={j.status} /></td>
                <td className="tabular px-4 text-right whitespace-nowrap text-muted">{formatDate(j.addedAt)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {/* Mobile: the table collapses into a list; secondary columns move under the title */}
      <ul className="divide-y divide-subtle md:hidden">
        {jobs.map((j) => (
          <li key={j.id}>
            <button
              type="button"
              onClick={() => onSelect(j.id)}
              className={`flex w-full flex-col gap-2 px-4 py-3 text-left ${j.id === selectedId ? 'bg-accent-soft' : ''}`}
            >
              <span className="flex items-start justify-between gap-3">
                <span className="min-w-0">
                  <span className="block truncate font-medium">{j.title}</span>
                  <span className="block truncate text-sm text-muted">{j.company} · {j.industry}</span>
                </span>
                <StatusBadge status={j.status} />
              </span>
              <span className="flex items-center justify-between text-sm text-muted">
                <FitScore value={j.fit} />
                <span className="tabular">{formatDate(j.addedAt)}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}
