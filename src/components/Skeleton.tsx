'use client'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div className={`animate-pulse rounded-md bg-graphite ${className}`} />
  )
}

export function SkeletonCard() {
  return (
    <div className="bg-graphite border border-border-line rounded-lg p-6">
      <div className="flex items-center gap-4 mb-4">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-4 w-full mb-3" />
      <Skeleton className="h-4 w-5/6 mb-3" />
      <Skeleton className="h-4 w-4/6 mb-4" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
    </div>
  )
}

export function SkeletonSignalCard() {
  return (
    <div className="bg-graphite border border-border-line rounded-lg p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Skeleton className="w-6 h-6 rounded-full" />
          <Skeleton className="h-3 w-16 rounded-full" />
        </div>
        <Skeleton className="h-4 w-12" />
      </div>
      <Skeleton className="h-5 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-4" />
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-3 w-8" />
            <Skeleton className="h-2 w-6" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function SkeletonProfile() {
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <div className="bg-graphite border border-border-line rounded-lg p-6">
          <div className="flex flex-col items-center mb-6">
            <Skeleton className="w-20 h-20 rounded-full mb-4" />
            <Skeleton className="h-6 w-24 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="w-full h-11 rounded-lg" />
            ))}
          </div>
          <Skeleton className="w-full h-11 rounded-lg mt-6" />
        </div>
      </div>
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-graphite border border-border-line rounded-lg p-6">
          <Skeleton className="h-6 w-24 mb-4" />
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center">
                <Skeleton className="h-8 w-12 mx-auto mb-2" />
                <Skeleton className="h-3 w-10 mx-auto" />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-graphite border border-border-line rounded-lg p-6">
          <Skeleton className="h-6 w-24 mb-4" />
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function SkeletonCanvas() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Skeleton className="w-12 h-12 rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="ml-auto">
          <Skeleton className="h-10 w-24 rounded-lg" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-4 flex flex-col">
            {[1, 2, 3].map((j) => (
              <div key={j} className="bg-graphite border border-border-line rounded-lg p-4 flex-1">
                <Skeleton className="h-5 w-20 mb-3" />
                <div className="space-y-2">
                  {[1, 2, 3].map((k) => (
                    <Skeleton key={k} className="h-4 w-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}