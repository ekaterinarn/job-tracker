import { useCallback, useEffect, useState } from 'react'
import { jobs as seed } from '../data/jobs'
import type { Job, Status } from '../types'

const STORAGE_KEY = 'job-tracker:statuses'

type LoadState = 'loading' | 'ready' | 'error'

function readSaved(): Record<string, Status> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')
  } catch {
    return {}
  }
}

/**
 * Loads jobs and keeps status changes in localStorage.
 * Simulates a network request so loading and error states can be designed for.
 * Try ?state=error or ?state=empty in the URL to preview those states.
 */
export function useJobs() {
  const [state, setState] = useState<LoadState>('loading')
  const [items, setItems] = useState<Job[]>([])

  const load = useCallback(() => {
    setState('loading')
    const mode = new URLSearchParams(window.location.search).get('state')
    const timer = window.setTimeout(() => {
      if (mode === 'error') return setState('error')
      const saved = readSaved()
      const data = mode === 'empty' ? [] : seed.map((j) => ({ ...j, status: saved[j.id] ?? j.status }))
      setItems(data)
      setState('ready')
    }, 700)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => load(), [load])

  const setStatus = (id: string, status: Status) => {
    setItems((prev) => prev.map((j) => (j.id === id ? { ...j, status } : j)))
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...readSaved(), [id]: status }))
    } catch {
      /* storage unavailable — keep in memory only */
    }
  }

  return { state, items, setStatus, retry: load }
}
