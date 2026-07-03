'use client'

import { forwardRef } from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, disabled, ...props }, ref) => {
    return (
      <input
        ref={ref}
        disabled={disabled}
        aria-invalid={error || undefined}
        className={[
          'bg-ui-surface border rounded-lg px-3 py-2 text-sm w-full transition-all duration-150 min-h-[44px]',
          'placeholder:text-ui-text-secondary',
          'focus:outline-none focus:ring-2 focus:ring-spark-blue',
          error ? 'border-ui-error' : 'border-ui-border',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'