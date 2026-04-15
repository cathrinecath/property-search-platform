import { Property, FilterState } from '@/types'

export function filterProperties(properties: Property[], filters: FilterState): Property[] {
  return properties.filter((p) => {
    if (filters.minPrice !== null && p.price < filters.minPrice) return false
    if (filters.maxPrice !== null && p.price > filters.maxPrice) return false
    if (filters.bedrooms !== null && p.bedrooms < filters.bedrooms) return false
    if (filters.type !== null && p.type !== filters.type) return false
    return true
  })
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-MY', {
    style: 'currency',
    currency: 'MYR',
    maximumFractionDigits: 0,
  }).format(price)
}
