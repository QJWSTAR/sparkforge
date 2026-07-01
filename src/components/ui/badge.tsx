'use client'

import { forwardRef } from 'react'

export interface BadgeProps {
  variant?: 'default' | 'success' | 'warning'
  size?: 'sm' | 'md'
  children: React.ReactNode
  className?: string
}

const variantStyles = {
  default: 'bg-ui-primary/15 text-ui-primary',
  success: 'bg-ui-success/15 text-ui-success',
  warning: 'bg-ui-warning/15 text-ui-warning',
}

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', size = 'md', children, className }, ref) => {
    return (
      <span
        ref={ref}
        className={[
          'inline-flex items-center rounded-full font-medium',
          variantStyles[variant],
          sizeStyles[size],
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'