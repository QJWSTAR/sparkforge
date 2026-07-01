'use client'

import { forwardRef } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

export interface DataCardProps {
  title: string
  value: string | number
  trend?: 'up' | 'down'
  trendValue?: string
  selected?: boolean
  disabled?: boolean
  className?: string
}

export const DataCard = forwardRef<HTMLDivElement, DataCardProps>(
  (
    { title, value, trend, trendValue, selected = false, disabled = false, className },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={[
          'bg-ui-surface border rounded-lg p-4 transition-all duration-200',
          'border-l-[3px]',
          selected ? 'border-ui-primary bg-ui-primary/5' : 'border-l-ui-primary border-r-ui-border border-t-ui-border border-b-ui-border',
          disabled ? 'opacity-50 cursor-not-allowed' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <p className="text-ui-text-secondary text-sm font-medium mb-1">{title}</p>
        <p
          className="text-[32px] font-bold leading-tight tabular-nums text-ui-text"
          style={{ fontFamily: 'var(--ui-font-mono)' }}
        >
          {value}
        </p>
        {trend && trendValue && (
          <div className="flex items-center gap-1 mt-2">
            {trend === 'up' ? (
              <TrendingUp className="w-4 h-4 text-ui-success" />
            ) : (
              <TrendingDown className="w-4 h-4 text-ui-error" />
            )}
            <span
              className={[
                'text-sm font-medium tabular-nums',
                trend === 'up' ? 'text-ui-success' : 'text-ui-error',
              ].join(' ')}
            >
              {trendValue}
            </span>
          </div>
        )}
      </div>
    )
  }
)

DataCard.displayName = 'DataCard'