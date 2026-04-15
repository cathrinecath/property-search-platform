'use client'

import { useState } from 'react'
import { ValuationRequest, ValuationResult } from '@/app/api/valuation/route'

interface UseValuationReturn {
  result: ValuationResult | null
  loading: boolean
  error: string | null
  estimate: (data: ValuationRequest) => Promise<void>
  reset: () => void
}

export function useValuation(): UseValuationReturn {
  const [result, setResult] = useState<ValuationResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function estimate(data: ValuationRequest) {
    setLoading(true)
    setError(null)
    setResult(null)

    const res = await fetch('/api/valuation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      setError('Valuation failed. Please try again.')
      setLoading(false)
      return
    }

    const data2: ValuationResult = await res.json()
    setResult(data2)
    setLoading(false)
  }

  function reset() {
    setResult(null)
    setError(null)
  }

  return { result, loading, error, estimate, reset }
}
