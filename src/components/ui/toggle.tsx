'use client'

import { forwardRef } from 'react'

export interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  ({ checked, onChange, disabled = false }, ref) => {
    return (
      <button
        ref={ref}
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={[
          'relative inline-flex items-center rounded-full transition-colors duration-200 cursor-pointer',
          'w-10 h-5',
          checked ? 'bg-ui-primary' : 'bg-[#3A3E48]',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'focus:outline-none focus:ring-2 focus:ring-spark-blue',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <span
          className={[
            'absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200',
            checked ? 'translate-x-5' : 'translate-x-0',
          ].join(' ')}
        />
      </button>
    )
  }
)

Toggle.displayName = 'Toggle'