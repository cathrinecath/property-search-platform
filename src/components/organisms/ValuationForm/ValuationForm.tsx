'use client'

import { useState } from 'react'
import { Loader2, Sparkles, RotateCcw } from 'lucide-react'
import { Input, Select, Button } from '@/components/atoms'
import { useValuation } from '@/hooks'
import { formatPrice } from '@/lib'
import { PropertyType } from '@/types'

const typeOptions = [
  { value: 'Condo', label: 'Condo' },
  { value: 'Terrace', label: 'Terrace' },
  { value: 'Penthouse', label: 'Penthouse' },
  { value: 'Studio', label: 'Studio' },
  { value: 'Bungalow', label: 'Bungalow' },
]

const defaultForm = {
  address: '',
  bedrooms: '',
  bathrooms: '',
  area: '',
  type: 'Condo' as PropertyType,
}

export default function ValuationForm() {
  const [form, setForm] = useState(defaultForm)
  const { result, loading, error, estimate, reset } = useValuation()

  function handleChange(field: keyof typeof defaultForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    reset()
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await estimate({
      address: form.address,
      bedrooms: Number(form.bedrooms),
      bathrooms: Number(form.bathrooms),
      area: Number(form.area),
      type: form.type,
    })
  }

  const isValid = form.address && form.bedrooms && form.bathrooms && form.area

  return (
    <div className="mx-auto max-w-2xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <Input
          id="address"
          label="Property Address"
          placeholder="e.g. 123 Jalan Ampang, Kuala Lumpur"
          value={form.address}
          onChange={(e) => handleChange('address', e.target.value)}
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Input
            id="bedrooms"
            label="Bedrooms"
            type="number"
            min={1}
            placeholder="3"
            value={form.bedrooms}
            onChange={(e) => handleChange('bedrooms', e.target.value)}
          />
          <Input
            id="bathrooms"
            label="Bathrooms"
            type="number"
            min={1}
            placeholder="2"
            value={form.bathrooms}
            onChange={(e) => handleChange('bathrooms', e.target.value)}
          />
          <Input
            id="area"
            label="Area (sqft)"
            type="number"
            min={1}
            placeholder="1200"
            value={form.area}
            onChange={(e) => handleChange('area', e.target.value)}
          />
          <Select
            id="type"
            label="Type"
            options={typeOptions}
            value={form.type}
            onChange={(e) => handleChange('type', e.target.value)}
          />
        </div>

        <Button type="submit" disabled={!isValid || loading} className="w-full gap-2">
          {loading ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              Estimating...
            </>
          ) : (
            <>
              <Sparkles size={15} />
              Estimate Value
            </>
          )}
        </Button>
      </form>

      {error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-6 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Estimated Value</h2>
            <button
              onClick={reset}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 transition-colors"
            >
              <RotateCcw size={12} />
              Clear
            </button>
          </div>

          <p className="text-3xl font-bold text-blue-600">{formatPrice(result.estimatedPrice)}</p>

          <div className="mt-2 flex gap-4 text-sm text-slate-500">
            <span>Low: {formatPrice(result.minPrice)}</span>
            <span>·</span>
            <span>High: {formatPrice(result.maxPrice)}</span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-slate-600">{result.reasoning}</p>
        </div>
      )}
    </div>
  )
}
