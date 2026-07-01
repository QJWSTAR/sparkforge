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
        className={[
          'bg-ui-surface border rounded-lg px-3 py-2 text-sm w-full transition-all duration-150',
          'placeholder:text-ui-text-secondary',
          'focus:outline-none',
          error ? 'border-ui-error' : 'border-ui-border',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        style={{ boxShadow: 'var(--ui-focus-ring)' }}
        onFocus={(e) => {
          e.currentTarget.style.boxShadow = 'var(--ui-focus-ring)'
        }}
        onBlur={(e) => {
          e.currentTarget.style.boxShadow = 'none'
        }}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'