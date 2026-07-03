'use client'

import { forwardRef, useEffect, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

export interface ModalProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ open, onClose, children, title }, ref) => {
    const [mounted, setMounted] = useState(false)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
      setMounted(true)
    }, [])

    useEffect(() => {
      if (open) {
        requestAnimationFrame(() => setVisible(true))
        document.body.style.overflow = 'hidden'
      } else {
        setVisible(false)
        document.body.style.overflow = ''
      }
      return () => {
        document.body.style.overflow = ''
      }
    }, [open])

    const handleClose = useCallback(() => {
      setVisible(false)
      setTimeout(onClose, 200)
    }, [onClose])

    useEffect(() => {
      if (!open) return
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') handleClose()
      }
      document.addEventListener('keydown', handleKey)
      return () => document.removeEventListener('keydown', handleKey)
    }, [open, handleClose])

    if (!mounted || !open) return null

    const titleId = title ? 'modal-title' : undefined

    return createPortal(
      <div
        className={[
          'fixed inset-0 z-50 flex items-center justify-center p-4',
          'transition-opacity duration-200 ease-out',
          visible ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
        style={{ backgroundColor: 'var(--ui-overlay-bg)' }}
        onClick={handleClose}
      >
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className={[
            'bg-ui-surface rounded-lg shadow-2xl max-w-lg w-full max-h-[85vh] overflow-auto',
            'transition-all duration-200 ease-out',
            visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
          ].join(' ')}
          onClick={(e) => e.stopPropagation()}
        >
          {title && (
            <div className="flex items-center justify-between px-6 py-4 border-b border-ui-border">
              <h2 id={titleId} className="text-lg font-semibold text-ui-text">{title}</h2>
              <button
                onClick={handleClose}
                className="p-1 rounded-md text-ui-text-secondary hover:text-ui-text hover:bg-ui-border/50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
          <div className="px-6 py-4">{children}</div>
        </div>
      </div>,
      document.body
    )
  }
)

Modal.displayName = 'Modal'