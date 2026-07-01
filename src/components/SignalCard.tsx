'use client'

import Link from 'next/link'
import { sourceLabels } from '@/data/mockSignals'
import type { Signal } from '@/types/signal'

interface SignalCardProps {
  signal: Signal
  rank?: number
}

export default function SignalCard({ signal, rank }: SignalCardProps) {
  const dimensions = [
    {
      label: '创意概念',
      content: signal.concept || signal.description,
      color: 'var(--color-dim-novelty)',
    },
    {
      label: '市场痛点',
      content: signal.painPoint,
      color: 'var(--color-dim-hot)',
    },
    {
      label: '核心创新',
      content: signal.innovation,
      color: 'var(--color-dim-local)',
    },
    {
      label: '技术方案',
      content: signal.techSolution,
      color: 'var(--state-success)',
    },
    {
      label: '获客策略',
      content: signal.acquisition,
      color: 'var(--color-dim-business)',
    },
    {
      label: '竞品差异',
      content: signal.differentiation,
      color: 'var(--state-info)',
    },
  ].filter((d) => d.content)

  const scoreBars = [
    { label: '热度', value: signal.hotScore, color: 'var(--color-dim-hot)' },
    { label: '创新', value: signal.noveltyScore, color: 'var(--color-dim-novelty)' },
    { label: '商业', value: signal.businessScore, color: 'var(--color-dim-business)' },
    { label: '本地', value: signal.localScore, color: 'var(--color-dim-local)' },
  ].filter((s) => s.value !== undefined)

  return (
    <Link
      href={`/radar/${signal.id}`}
      className="block border-b py-5 card-hover -mx-4 px-4 rounded-md"
      style={{ borderColor: 'var(--color-border)' }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2 min-w-0">
          {rank !== undefined && (
            <span
              className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-md text-xs font-bold"
              style={{
                backgroundColor: 'var(--color-primary-muted)',
                color: 'var(--color-primary)',
              }}
            >
              {rank}
            </span>
          )}
          <h3
            className="text-lg font-semibold truncate"
            style={{ color: 'var(--color-text)' }}
          >
            {signal.title}
          </h3>
          <span
            className="flex-shrink-0 text-xs px-2 py-0.5 rounded-md"
            style={{
              backgroundColor: 'var(--color-primary-muted)',
              color: 'var(--color-primary)',
            }}
          >
            {sourceLabels[signal.source]}
          </span>
        </div>
        {signal.finalScore !== undefined && (
          <span
            className="flex-shrink-0 text-2xl font-bold tabular-nums"
            style={{ color: 'var(--color-primary)' }}
          >
            {signal.finalScore}
          </span>
        )}
      </div>

      {/* Analysis grid */}
      {dimensions.length > 0 && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
          {dimensions.map((d) => (
            <div key={d.label} className="pl-2.5" style={{ borderLeft: `2px solid ${d.color}` }}>
              <span
                className="font-medium text-sm"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {d.label}
              </span>
              <p
                className="mt-0.5 leading-snug text-sm"
                style={{ color: 'var(--color-text)' }}
              >
                {d.content}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Score bars */}
      {scoreBars.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          {scoreBars.map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <span
                className="w-8 text-xs"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {s.label}
              </span>
              <div
                className="w-24 h-1.5 rounded-full overflow-hidden"
                style={{ backgroundColor: 'var(--color-bg-active)' }}
              >
                <div
                  className="h-full rounded-full"
                  style={{ width: `${s.value}%`, backgroundColor: s.color }}
                />
              </div>
              <span
                className="tabular-nums w-6 text-right"
                style={{ color: 'var(--color-text)' }}
              >
                {s.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Action buttons */}
      <div className="mt-4 flex items-center gap-2">
        <Link
          href={`/forge?signalId=${signal.id}`}
          className="text-xs font-semibold px-3 py-1.5 rounded-md"
          style={{
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-text-inverse)',
          }}
        >
          复刻
        </Link>
        <Link
          href={`/canvas?signalId=${signal.id}`}
          className="text-xs font-medium px-3 py-1.5 rounded-md"
          style={{
            border: '1px solid var(--color-border)',
            color: 'var(--color-text-secondary)',
          }}
        >
          画布
        </Link>
      </div>
    </Link>
  )
}
