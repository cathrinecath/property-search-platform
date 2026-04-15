import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { Navbar } from '@/components/organisms'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'PropFind — Real Estate Search',
    template: '%s | PropFind',
  },
  description: 'Search, filter and discover properties across Malaysia with AI-powered valuation.',
  openGraph: {
    title: 'PropFind — Real Estate Search',
    description: 'Search, filter and discover properties across Malaysia with AI-powered valuation.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  )
}
