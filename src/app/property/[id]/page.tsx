import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Bed, Bath, Maximize2, MapPin, CalendarDays, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { Badge } from '@/components/atoms'
import { formatPrice } from '@/lib'
import propertiesData from '@/data/properties.json'
import { Property } from '@/types'
import type { Metadata } from 'next'

const properties = propertiesData as Property[]

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const property = properties.find((p) => p.id === id)
  if (!property) return {}
  return {
    title: property.title,
    description: property.description,
  }
}

export function generateStaticParams() {
  return properties.map((p) => ({ id: p.id }))
}

export default async function PropertyDetailPage({ params }: Props) {
  const { id } = await params
  const property = properties.find((p) => p.id === id)

  if (!property) notFound()

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft size={15} />
        Back to listings
      </Link>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Hero Image */}
        <div className="relative h-72 w-full sm:h-96">
          <Image
            src={property.image}
            alt={property.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 900px"
            className="object-cover"
          />
          <div className="absolute left-4 top-4 flex gap-2">
            <Badge label={property.type} variant="info" />
            <Badge label={property.status} variant="success" />
          </div>
        </div>

        <div className="p-6 sm:p-8">
          {/* Title + Price */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{property.title}</h1>
              <div className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                <MapPin size={14} className="shrink-0" />
                {property.address}
              </div>
            </div>
            <p className="text-2xl font-bold text-blue-600 sm:text-right">
              {formatPrice(property.price)}
            </p>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4 sm:grid-cols-4">
            <div className="flex flex-col items-center gap-1">
              <Bed size={20} className="text-blue-500" />
              <span className="text-lg font-semibold text-slate-900">{property.bedrooms}</span>
              <span className="text-xs text-slate-500">Bedrooms</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Bath size={20} className="text-blue-500" />
              <span className="text-lg font-semibold text-slate-900">{property.bathrooms}</span>
              <span className="text-xs text-slate-500">Bathrooms</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Maximize2 size={20} className="text-blue-500" />
              <span className="text-lg font-semibold text-slate-900">
                {property.area.toLocaleString()}
              </span>
              <span className="text-xs text-slate-500">sqft</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <CalendarDays size={20} className="text-blue-500" />
              <span className="text-lg font-semibold text-slate-900">{property.yearBuilt}</span>
              <span className="text-xs text-slate-500">Year Built</span>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <h2 className="mb-2 font-semibold text-slate-900">About this property</h2>
            <p className="text-sm leading-relaxed text-slate-600">{property.description}</p>
          </div>

          {/* Amenities */}
          <div className="mt-6">
            <h2 className="mb-3 font-semibold text-slate-900">Amenities</h2>
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {property.amenities.map((amenity) => (
                <li key={amenity} className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 size={15} className="shrink-0 text-emerald-500" />
                  {amenity}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
