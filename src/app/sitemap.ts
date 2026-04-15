import type { MetadataRoute } from 'next'
import propertiesData from '@/data/properties.json'

const BASE_URL = 'https://propfind.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const propertyUrls = propertiesData.map((p) => ({
    url: `${BASE_URL}/property/${p.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/valuation`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    ...propertyUrls,
  ]
}
