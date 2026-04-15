import { Suspense } from 'react'
import { FilterPanel, PropertyGrid, MapView } from '@/components/organisms'
import propertiesData from '@/data/properties.json'
import { Property } from '@/types'

const properties = propertiesData as Property[]

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Find Your Property</h1>
        <p className="mt-1 text-sm text-slate-500">
          Discover {properties.length} properties across Malaysia
        </p>
      </div>

      <div className="mb-6">
        <FilterPanel />
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="min-w-0 flex-1">
          <Suspense fallback={<p className="text-sm text-slate-500">Loading properties...</p>}>
            <PropertyGrid properties={properties} />
          </Suspense>
        </div>

        <div className="h-[400px] w-full shrink-0 lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)] lg:w-[420px]">
          <MapView properties={properties} />
        </div>
      </div>
    </div>
  )
}
