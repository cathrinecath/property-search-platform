import { Sparkles } from 'lucide-react'
import { ValuationForm } from '@/components/organisms'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Valuation',
  description: 'Get an AI-powered property valuation estimate for any address in Malaysia.',
}

export default function ValuationPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-8 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
          <Sparkles size={14} />
          Powered by Gemini AI
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Property Valuation</h1>
        <p className="mt-2 text-sm text-slate-500">
          Enter your property details and get an instant AI-powered market estimate.
        </p>
      </div>

      <ValuationForm />
    </div>
  )
}
