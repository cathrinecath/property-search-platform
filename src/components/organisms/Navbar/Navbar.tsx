import Link from 'next/link'
import { Building2 } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-slate-900">
          <Building2 size={22} className="text-blue-600" />
          <span>PropFind</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-slate-600">
          <Link href="/" className="hover:text-slate-900 transition-colors">Listings</Link>
          <Link href="/valuation" className="hover:text-slate-900 transition-colors">AI Valuation</Link>
        </nav>
      </div>
    </header>
  )
}
