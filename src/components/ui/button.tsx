'use client'

import { forwardRef } from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'md' | 'lg'
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
  ({ variant = 'primary', size = 'md', className, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={[
          'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-150 cursor-pointer',
          variantStyles[variant],
          sizeStyles[size],
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

Button.displayName = 'Button'