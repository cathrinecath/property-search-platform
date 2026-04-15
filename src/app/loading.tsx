import { Skeleton } from '@/components/atoms'

export default function HomeLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Skeleton className="mb-2 h-8 w-48" />
      <Skeleton className="mb-6 h-4 w-64" />
      <Skeleton className="mb-6 h-20 w-full" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            <Skeleton className="h-52 w-full" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-36" />
          </div>
        ))}
      </div>
    </div>
  )
}
