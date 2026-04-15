import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

export interface ValuationRequest {
  address: string
  bedrooms: number
  bathrooms: number
  area: number
  type: string
}

export interface ValuationResult {
  estimatedPrice: number
  minPrice: number
  maxPrice: number
  reasoning: string
}

export async function POST(req: NextRequest) {
  const body: ValuationRequest = await req.json()

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
  }

  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

  const prompt = `You are a real estate valuation expert in Malaysia.

Given the property details below, estimate the current market value in Malaysian Ringgit (MYR).

Property details:
- Address: ${body.address}
- Type: ${body.type}
- Bedrooms: ${body.bedrooms}
- Bathrooms: ${body.bathrooms}
- Built-up area: ${body.area} sqft

Respond ONLY with a valid JSON object in this exact shape, no markdown, no explanation outside the JSON:
{
  "estimatedPrice": <number>,
  "minPrice": <number>,
  "maxPrice": <number>,
  "reasoning": "<2-3 sentence explanation>"
}`

  const result = await model.generateContent(prompt)
  const text = result.response.text().trim()

  const parsed: ValuationResult = JSON.parse(text)
  return NextResponse.json(parsed)
}
