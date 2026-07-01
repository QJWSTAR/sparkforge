'use client'

import { forwardRef } from 'react'

export interface ContentCardProps {
  children: React.ReactNode
  selected?: boolean
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLDivElement>
  className?: string
}

export const ContentCard = forwardRef<HTMLDivElement, ContentCardProps>(
  ({ children, selected = false, disabled = false, onClick, className }, ref) => {
    const isInteractive = !!onClick && !disabled

    return (
      <div
        ref={ref}
        role={isInteractive ? 'button' : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        onClick={disabled ? undefined : onClick}
        onKeyDown={
          isInteractive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>)
                }
              }
            : undefined
        }
        className={[
          'bg-ui-surface border rounded-lg p-4 transition-all duration-200',
          selected
            ? 'border-ui-primary bg-ui-primary/5'
            : 'border-ui-border',
          disabled
            ? 'opacity-50 cursor-not-allowed'
            : isInteractive
              ? 'hover:border-ui-primary cursor-pointer active:scale-[0.99]'
              : 'hover:border-ui-primary',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {children}
      </div>
    )
  }
)

ContentCard.displayName = 'ContentCard'