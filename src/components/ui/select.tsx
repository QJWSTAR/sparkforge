'use client'

import { forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[]
  placeholder?: string
  error?: boolean
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, placeholder, error, disabled, className, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <select
          ref={ref}
          disabled={disabled}
          className={[
            'bg-ui-surface border rounded-lg px-3 py-2 text-sm w-full appearance-none cursor-pointer transition-all duration-150',
            error ? 'border-ui-error' : 'border-ui-border',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'focus:outline-none',
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
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-ui-text-secondary w-4 h-4" />
      </div>
    )
  }
)

Select.displayName = 'Select'