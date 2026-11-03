export type Status = 'new' | 'applied' | 'interview' | 'offer' | 'rejected'

export type WorkFormat = 'remote' | 'hybrid' | 'office'

export interface Job {
  id: string
  title: string
  company: string
  industry: string
  format: WorkFormat
  location: string
  salary?: string
  fit: number // 0–100, how well the role matches my profile
  status: Status
  source: string
  addedAt: string // ISO date
  blockers: string[]
  notes?: string
}

export type SortKey = 'fit' | 'addedAt' | 'company'
export type SortDir = 'asc' | 'desc'
