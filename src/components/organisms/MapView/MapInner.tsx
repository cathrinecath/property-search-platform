'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import Link from 'next/link'
import { Property } from '@/types'
import { formatPrice } from '@/lib'

function fixLeafletIcons() {
  delete (L.Icon.Default.prototype as any)._getIconUrl // eslint-disable-line @typescript-eslint/no-explicit-any
  L.Icon.Default.mergeOptions({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  })
}

interface MapInnerProps {
  properties: Property[]
}

export default function MapInner({ properties }: MapInnerProps) {
  useEffect(() => {
    fixLeafletIcons()
  }, [])

  const center: [number, number] = [3.1478, 101.6953]

  return (
    <MapContainer
      center={center}
      zoom={12}
      className="h-full w-full rounded-2xl"
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {properties.map((property) => (
        <Marker key={property.id} position={[property.lat, property.lng]}>
          <Popup minWidth={220}>
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-blue-600 text-sm">{formatPrice(property.price)}</p>
              <p className="font-medium text-slate-900 text-sm leading-tight">{property.title}</p>
              <p className="text-slate-500 text-xs">{property.address}</p>
              <div className="flex gap-2 text-xs text-slate-600 mt-1">
                <span>{property.bedrooms} bd</span>
                <span>·</span>
                <span>{property.bathrooms} ba</span>
                <span>·</span>
                <span>{property.area.toLocaleString()} sqft</span>
              </div>
              <Link
                href={`/property/${property.id}`}
                className="mt-2 text-xs font-medium text-blue-600 hover:underline"
              >
                View details →
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
