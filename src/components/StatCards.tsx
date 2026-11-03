import type { Job } from '../types'

export function StatCards({ jobs }: { jobs: Job[] }) {
  const total = jobs.length
  const applied = jobs.filter((j) => j.status !== 'new').length
  const interviews = jobs.filter((j) => j.status === 'interview' || j.status === 'offer').length
  const avgFit = total ? Math.round(jobs.reduce((s, j) => s + j.fit, 0) / total) : 0
  const conversion = applied ? Math.round((interviews / applied) * 100) : 0

  const cards = [
    { label: 'Vacancies tracked', value: total.toString() },
    { label: 'Applied', value: applied.toString() },
    { label: 'Interview rate', value: `${conversion}%`, hint: `${interviews} of ${applied} applications` },
    { label: 'Average fit', value: `${avgFit}%` },
  ]

  return (
    <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {cards.map((c) => (
        <div key={c.label} className="rounded-lg border border-subtle bg-surface p-4">
          <dt className="text-xs font-medium text-muted">{c.label}</dt>
          <dd className="tabular mt-1 text-2xl font-semibold tracking-tight">{c.value}</dd>
          {c.hint && <dd className="mt-0.5 text-xs text-faint">{c.hint}</dd>}
        </div>
      ))}
    </dl>
  )
}
