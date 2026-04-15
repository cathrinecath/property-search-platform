import { Skeleton } from '@/components/atoms'

export default function PropertyDetailLoading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Skeleton className="mb-6 h-4 w-32" />
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <Skeleton className="h-72 w-full sm:h-96" />
        <div className="p-6 sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-7 w-64" />
              <Skeleton className="h-4 w-48" />
            </div>
            <Skeleton className="h-7 w-36" />
          </div>
          <Skeleton className="mt-6 h-24 w-full rounded-xl" />
          <div className="mt-6 flex flex-col gap-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      </div>
    </div>
  )
}
