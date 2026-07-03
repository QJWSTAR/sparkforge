'use client'

import { forwardRef } from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'md' | 'lg'
  isLoading?: boolean
}

const variantStyles = {
  primary:
    'bg-ui-primary text-white hover:bg-ui-primary-hover active:scale-[0.97]',
  secondary:
    'bg-transparent border border-ui-border text-ui-text hover:border-ui-primary hover:text-ui-primary',
  ghost:
    'bg-transparent text-ui-text-secondary hover:bg-ui-surface hover:text-ui-text',
}

const sizeStyles = {
  md: 'min-h-[44px] h-11 px-4 text-sm',
  lg: 'min-h-[44px] h-12 px-6 text-base',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading = false, className, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={[
          'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-150 cursor-pointer',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spark-blue focus-visible:ring-offset-2 focus-visible:ring-offset-graphite',
          variantStyles[variant],
          sizeStyles[size],
          'disabled:opacity-50 disabled:cursor-not-allowed',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin w-4 h-4 shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'