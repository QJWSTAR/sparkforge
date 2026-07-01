'use client'

import Link from 'next/link'
import { TrendingUp, Clock } from 'lucide-react'
import { sourceLabels } from '@/data/mockSignals'
import type { Signal } from '@/types/signal'
import { ContentCard } from '@/components/ui/content-card'
import { Badge } from '@/components/ui/badge'

interface SignalCardProps {
  signal: Signal
  rank?: number
}

export default function SignalCard({ signal, rank }: SignalCardProps) {
  const formattedDate = new Date(signal.createdAt).toLocaleDateString('zh-CN', {
    month: 'short',
    day: 'numeric',
  })

  const displayTags = signal.tags.slice(0, 3)

  return (
    <Link href={`/radar/${signal.id}`} className="block group">
      <ContentCard className="p-4 border-border-line transition-all duration-200 hover:border-spark-blue hover:-translate-y-0.5 hover:shadow-md">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Left column */}
          <div className="sm:w-32 flex-shrink-0 flex flex-col gap-2">
            {rank !== undefined && (
              <span className="text-2xl font-mono font-bold text-spark-blue">
                #{rank}
              </span>
            )}
            <Badge size="sm" className="w-fit">
              {sourceLabels[signal.source] || signal.source}
            </Badge>
            <div className="flex items-center gap-1 text-spark-blue font-mono text-sm">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{signal.hotScore}</span>
            </div>
          </div>

          {/* Right column */}
          <div className="flex-1 min-w-0 flex flex-col gap-2">
            <h3 className="text-base font-semibold text-ice-white line-clamp-1">
              {signal.title}
            </h3>
            {signal.description && (
              <p className="text-sm text-fog line-clamp-2 mt-1">
                {signal.description}
              </p>
            )}
            <div className="flex items-center gap-2 mt-auto pt-1">
              {displayTags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {displayTags.map((tag) => (
                    <Badge key={tag} size="sm" variant="default">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-1 text-xs text-fog ml-auto flex-shrink-0">
                <Clock className="w-3 h-3" />
                <span>{formattedDate}</span>
              </div>
            </div>
          </div>
        </div>
      </ContentCard>
    </Link>
  )
}