'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { ToastContainer, type ToastMessage } from './Toast'

interface ToastContextType {
  showToast: (message: string, type?: ToastMessage['type'], duration?: number) => void
  showSuccess: (message: string, duration?: number) => void
  showError: (message: string, duration?: number) => void
  showInfo: (message: string, duration?: number) => void
  showWarning: (message: string, duration?: number) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const addToast = (message: string, type: ToastMessage['type'] = 'info', duration?: number) => {
    const id = Date.now().toString()
    setToasts((prev) => [...prev, { id, type, message, duration }])
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  const showToast = (message: string, type?: ToastMessage['type'], duration?: number) => {
    addToast(message, type || 'info', duration)
  }

  const showSuccess = (message: string, duration?: number) => {
    addToast(message, 'success', duration)
  }

  const showError = (message: string, duration?: number) => {
    addToast(message, 'error', duration)
  }

  const showInfo = (message: string, duration?: number) => {
    addToast(message, 'info', duration)
  }

  const showWarning = (message: string, duration?: number) => {
    addToast(message, 'warning', duration)
  }

  return (
    <ToastContext.Provider value={{ showToast, showSuccess, showError, showInfo, showWarning }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}