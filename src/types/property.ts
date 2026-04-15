export type PropertyType = 'Condo' | 'Terrace' | 'Penthouse' | 'Studio' | 'Bungalow'
export type PropertyStatus = 'For Sale' | 'For Rent' | 'Sold'

export interface Property {
  id: string
  title: string
  address: string
  price: number
  bedrooms: number
  bathrooms: number
  area: number
  type: PropertyType
  status: PropertyStatus
  lat: number
  lng: number
  image: string
  description: string
  amenities: string[]
  yearBuilt: number
}

export interface FilterState {
  minPrice: number | null
  maxPrice: number | null
  bedrooms: number | null
  type: PropertyType | null
}
