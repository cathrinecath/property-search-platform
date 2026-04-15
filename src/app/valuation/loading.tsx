import { Skeleton } from '@/components/atoms'

export default function ValuationLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-8 flex flex-col items-center gap-3">
        <Skeleton className="h-7 w-36 rounded-full" />
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-4 w-80" />
      </div>
      <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex flex-col gap-4">
          <Skeleton className="h-16 w-full" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  )
}
