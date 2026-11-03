/** Fit score: number first (tabular), bar second. The bar is decorative. */
export function FitScore({ value }: { value: number }) {
  const level = value >= 70 ? 'High' : value >= 50 ? 'Medium' : 'Low'
  const color = value >= 70 ? 'var(--status-offer-fg)' : value >= 50 ? 'var(--status-interview-fg)' : 'var(--text-subtle)'
  return (
    <span className="inline-flex items-center gap-2" title={`${level} fit`}>
      <span className="tabular w-9 text-right font-medium">{value}%</span>
      <span className="h-1.5 w-14 overflow-hidden rounded-full bg-hover" aria-hidden="true">
        <span className="block h-full rounded-full" style={{ width: `${value}%`, background: color }} />
      </span>
      <span className="sr-only">{level} fit</span>
    </span>
  )
}
