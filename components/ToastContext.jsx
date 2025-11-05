import React, { createContext, useContext, useCallback, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((message, opts = {}) => {
    const id = Date.now() + Math.random()
    const duration = typeof opts.duration === 'number' ? opts.duration : 3000
    setToasts((t) => [...t, { id, message }])
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id))
    }, duration)
  }, [])

  const value = { showToast }

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastPortal toasts={toasts} remove={(id) => setToasts((t) => t.filter((x) => x.id !== id))} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

function ToastPortal({ toasts, remove }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null
  return createPortal(
    <div style={containerStyle} aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} style={toastStyle} onClick={() => remove(t.id)}>
          {t.message}
        </div>
      ))}
    </div>,
    document.body
  )
}

const containerStyle = {
  position: 'fixed',
  bottom: 20,
  left: 20,
  zIndex: 9999,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
}

const toastStyle = {
  background: 'rgba(0,0,0,0.85)',
  color: 'white',
  padding: '10px 14px',
  borderRadius: 8,
  boxShadow: '0 6px 18px rgba(0,0,0,0.25)',
  maxWidth: 420,
  cursor: 'pointer',
}

export default ToastProvider
