# PropFind — Property Search Platform

A real estate web application for browsing, filtering, and valuing properties across Malaysia. Built as a frontend portfolio project targeting PropTech roles.

**Live demo:** [propfind.vercel.app](https://propfind.vercel.app)

---

## Features

- **Property listings** — grid view with real-time filtering by price, bedrooms, and property type
- **Interactive map** — Leaflet map with property pin markers and popup previews, synced with active filters
- **Property detail pages** — statically generated pages with full specs, amenities, and imagery
- **AI valuation tool** — enter an address and property details to receive an AI-estimated market value with price range and reasoning

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS |
| State management | Zustand |
| Map | React-Leaflet + OpenStreetMap |
| Icons | Lucide React |
| AI | Google Gemini API (gemini-1.5-flash) |
| Deployment | Vercel |

---

## Architecture & Engineering Decisions

### Atomic Design
Components are organised into atoms → molecules → organisms, each folder with a barrel `index.ts` export. This keeps imports clean and boundaries explicit.

```
src/components/
├── atoms/        # Button, Badge, Input, Select, Skeleton
├── molecules/    # PropertyCard
└── organisms/    # FilterPanel, PropertyGrid, MapView, ValuationForm, Navbar
```

### Server vs Client Components
Server components are the default. Client components (`'use client'`) are used only where required:
- `FilterPanel` — reads user input, writes to Zustand store
- `PropertyGrid` — reads Zustand store to render filtered results
- `MapView` — Leaflet requires browser APIs, loaded via `dynamic()` with `ssr: false`
- `ValuationForm` — user interaction + fetch to API route

### AI Valuation API Route
The Gemini API key is never exposed to the browser. All AI requests go through a Next.js API route (`/api/valuation`) which handles the Gemini call server-side and returns structured JSON.

### Performance
- `next/image` with `fill` and `sizes` on all property images
- Map component lazy-loaded via `next/dynamic`
- `loading.tsx` skeleton screens on all routes
- Property detail pages statically generated at build time via `generateStaticParams`

### SEO
- Per-page metadata via Next.js Metadata API
- Open Graph tags on layout
- Auto-generated `sitemap.xml` and `robots.txt`

---

## Project Structure

```
src/
├── app/
│   ├── api/valuation/     # Gemini API route
│   ├── property/[id]/     # Static property detail pages
│   ├── valuation/         # AI valuation page
│   └── layout.tsx         # Root layout with metadata
├── components/            # Atomic design components
├── data/                  # Mock property JSON
├── hooks/                 # useValuation custom hook
├── lib/                   # filterProperties, formatPrice, cn utilities
├── store/                 # Zustand filter store
└── types/                 # Property and FilterState types
```

---

## Running Locally

```bash
npm install
```

Create `.env.local`:

```
GEMINI_API_KEY=your_gemini_api_key_here
```

Get a free key at [aistudio.google.com](https://aistudio.google.com).

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
