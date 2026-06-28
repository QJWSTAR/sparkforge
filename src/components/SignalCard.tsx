'use client'

import Link from 'next/link'
import { sourceLabels, sourceColors } from '@/data/mockSignals'
import type { Signal } from '@/types/signal'

interface SignalCardProps {
  signal: Signal
  rank?: number
}

export default function SignalCard({ signal, rank }: SignalCardProps) {
  const scoreColors = {
    hot: 'bg-[#FF6B35]',
    novelty: 'bg-[#3B82F6]',
    business: 'bg-[#FFB800]',
    local: 'bg-[#8B5CF6]',
  }

  return (
    <Link href={`/radar/${signal.id}`}>
      <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer group">
        <div className="flex items-start gap-4">
          {rank && (
            <div className={`flex-shrink-0 w-8 h-8 rounded flex items-center justify-center text-sm font-bold ${
              rank === 1 ? 'bg-[#FF6B35] text-white' :
              rank === 2 ? 'bg-[#FFB800] text-black' :
              rank === 3 ? 'bg-[#3B82F6] text-white' :
              'bg-white/10 text-gray-400'
            }`}>
              {rank}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-white group-hover:text-[#FF6B35] transition-colors line-clamp-1">
                {signal.title}
              </h3>
              <span className={`flex-shrink-0 text-xs px-2 py-0.5 rounded ${sourceColors[signal.source]}`}>
                {sourceLabels[signal.source]}
              </span>
            </div>

            {signal.description && (
              <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                {signal.description}
              </p>
            )}

            <div className="flex flex-wrap gap-2 mb-3">
              {signal.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-white/10 text-gray-300 px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-4 gap-3">
              <div>
                <div className="text-xs text-gray-500 mb-1">热度</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${scoreColors.hot}`}
                      style={{ width: `${signal.hotScore}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 w-8 text-right">{signal.hotScore}</span>
                </div>
              </div>

              {signal.noveltyScore !== undefined && (
                <div>
                  <div className="text-xs text-gray-500 mb-1">创新</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${scoreColors.novelty}`}
                        style={{ width: `${signal.noveltyScore}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 w-8 text-right">{signal.noveltyScore}</span>
                  </div>
                </div>
              )}

              {signal.businessScore !== undefined && (
                <div>
                  <div className="text-xs text-gray-500 mb-1">商业</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${scoreColors.business}`}
                        style={{ width: `${signal.businessScore}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 w-8 text-right">{signal.businessScore}</span>
                  </div>
                </div>
              )}

              {signal.localScore !== undefined && (
                <div>
                  <div className="text-xs text-gray-500 mb-1">本地化</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${scoreColors.local}`}
                        style={{ width: `${signal.localScore}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 w-8 text-right">{signal.localScore}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            {signal.finalScore !== undefined && (
              <div className="text-right">
                <div className="text-2xl font-bold text-[#FF6B35]">{signal.finalScore}</div>
                <div className="text-xs text-gray-500">综合评分</div>
              </div>
            )}
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span>▲ {signal.votesCount}</span>
              <span>💬 {signal.commentsCount}</span>
            </div>
            <Link href={`/forge?signalId=${signal.id}`}>
              <button className="bg-[#FF6B35]/20 hover:bg-[#FF6B35]/30 text-[#FF6B35] px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">
                复刻 →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Link>
  )
}
