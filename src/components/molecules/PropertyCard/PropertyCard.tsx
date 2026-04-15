import Image from 'next/image'
import Link from 'next/link'
import { Bed, Bath, Maximize2, MapPin } from 'lucide-react'
import { Property } from '@/types'
import { formatPrice } from '@/lib'
import { Badge } from '@/components/atoms'

interface PropertyCardProps {
  property: Property
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link
      href={`/property/${property.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={property.image}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <Badge label={property.type} variant="info" />
        </div>
      </div>

      <div className="flex flex-col gap-2 p-4">
        <p className="text-lg font-semibold text-blue-600">{formatPrice(property.price)}</p>
        <h3 className="font-medium text-slate-900 line-clamp-1">{property.title}</h3>

        <div className="flex items-center gap-1 text-sm text-slate-500">
          <MapPin size={13} className="shrink-0" />
          <span className="line-clamp-1">{property.address}</span>
        </div>

        <div className="mt-1 flex items-center gap-3 text-sm text-slate-600">
          <span className="flex items-center gap-1">
            <Bed size={14} />
            {property.bedrooms}
          </span>
          <span className="text-slate-300">·</span>
          <span className="flex items-center gap-1">
            <Bath size={14} />
            {property.bathrooms}
          </span>
          <span className="text-slate-300">·</span>
          <span className="flex items-center gap-1">
            <Maximize2 size={14} />
            {property.area.toLocaleString()} sqft
          </span>
        </div>
      </div>
    </Link>
  )
}
