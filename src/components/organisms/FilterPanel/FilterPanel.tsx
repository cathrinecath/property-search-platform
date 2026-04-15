'use client'

import { useFilterStore } from '@/store'
import { Input, Select, Button } from '@/components/atoms'
import { PropertyType } from '@/types'

const typeOptions = [
  { value: 'Condo', label: 'Condo' },
  { value: 'Terrace', label: 'Terrace' },
  { value: 'Penthouse', label: 'Penthouse' },
  { value: 'Studio', label: 'Studio' },
  { value: 'Bungalow', label: 'Bungalow' },
]

const bedroomOptions = [
  { value: '1', label: '1+' },
  { value: '2', label: '2+' },
  { value: '3', label: '3+' },
  { value: '4', label: '4+' },
]

export default function FilterPanel() {
  const { minPrice, maxPrice, bedrooms, type, setMinPrice, setMaxPrice, setBedrooms, setType, resetFilters } =
    useFilterStore()

  return (
    <div className="flex flex-wrap items-end gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <Input
        id="min-price"
        label="Min Price (MYR)"
        type="number"
        placeholder="e.g. 400000"
        value={minPrice ?? ''}
        onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : null)}
        className="w-40"
      />
      <Input
        id="max-price"
        label="Max Price (MYR)"
        type="number"
        placeholder="e.g. 2000000"
        value={maxPrice ?? ''}
        onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : null)}
        className="w-40"
      />
      <Select
        id="bedrooms"
        label="Bedrooms"
        options={bedroomOptions}
        placeholder="Any"
        value={bedrooms ?? ''}
        onChange={(e) => setBedrooms(e.target.value ? Number(e.target.value) : null)}
        className="w-32"
      />
      <Select
        id="type"
        label="Property Type"
        options={typeOptions}
        placeholder="Any type"
        value={type ?? ''}
        onChange={(e) => setType((e.target.value as PropertyType) || null)}
        className="w-36"
      />
      <Button variant="ghost" size="sm" onClick={resetFilters} className="self-end mb-0.5">
        Reset
      </Button>
    </div>
  )
}
