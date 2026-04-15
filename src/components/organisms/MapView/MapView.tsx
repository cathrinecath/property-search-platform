'use client'

import dynamic from 'next/dynamic'
import { useFilterStore } from '@/store'
import { filterProperties } from '@/lib'
import { Property } from '@/types'

const MapInner = dynamic(() => import('./MapInner'), { ssr: false })

interface MapViewProps {
  properties: Property[]
}

export default function MapView({ properties }: MapViewProps) {
  const { minPrice, maxPrice, bedrooms, type } = useFilterStore()
  const filtered = filterProperties(properties, { minPrice, maxPrice, bedrooms, type })

  return (
    <div className="h-full w-full">
      <MapInner properties={filtered} />
    </div>
  )
}
