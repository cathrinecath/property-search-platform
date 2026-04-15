'use client'

import { useFilterStore } from '@/store'
import { filterProperties } from '@/lib'
import { Property } from '@/types'
import { PropertyCard } from '@/components/molecules'
import { SearchX } from 'lucide-react'

interface PropertyGridProps {
  properties: Property[]
}

export default function PropertyGrid({ properties }: PropertyGridProps) {
  const { minPrice, maxPrice, bedrooms, type } = useFilterStore()

  const filtered = filterProperties(properties, { minPrice, maxPrice, bedrooms, type })

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <SearchX size={40} className="mb-3 text-slate-300" />
        <p className="text-lg font-medium text-slate-700">No properties found</p>
        <p className="mt-1 text-sm text-slate-500">Try adjusting your filters</p>
      </div>
    )
  }

  return (
    <div>
      <p className="mb-4 text-sm text-slate-500">{filtered.length} properties found</p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  )
}
