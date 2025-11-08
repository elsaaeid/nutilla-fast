import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import styles from '../../styles/Login.module.css'
import { useToast } from '../../components/ToastContext'
import { normalizeCartItems, computeSubtotal } from '../../util/cartHelpers'

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const { showToast } = useToast()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e?.preventDefault?.()
    setError('')
    if (!form.username || !form.password) {
      setError('Username and password are required')
      return
    }

    try {
      setLoading(true)
      // ensure cookies set by server are accepted by the browser; withCredentials is safe for same-origin
      const res = await axios.post('/api/login', { username: form.username, password: form.password }, { withCredentials: true })
      if (res.status === 200) {
        // successful login: API should set cookie or token
        // fetch /api/me to get role and redirect accordingly
        try {
          // small delay to allow Set-Cookie to be processed by the browser in some environments
          await new Promise((r) => setTimeout(r, 80))
          const meRes = await fetch('/api/me', { credentials: 'same-origin' })
          const me = await meRes.json()
          // If there are anonymous cart items in localStorage, persist them to the server now
          try {
            const raw = typeof window !== 'undefined' ? localStorage.getItem('cartItems') : null
            if (raw) {
              const items = JSON.parse(raw)
              if (Array.isArray(items) && items.length > 0) {
                // Normalize items client-side so server receives predictable fields (offer/originalPrice/etc)
                const normalized = normalizeCartItems(items)
                const subtotal = computeSubtotal(normalized)
                // ensure cookies are sent and server can read the token set by /api/login
                // Use axios withCredentials to ensure cookie/token is sent with the merge request
                try {
                  const mergeRes = await axios.post('/api/cart', { items: normalized, subtotal }, { withCredentials: true })
                  const merged = mergeRes?.data
                  // log merge result for debugging (visible in browser console)
                  console.log('merge result:', merged)
                  if (merged && merged._id) {
                    try { localStorage.setItem('cartId', merged._id) } catch (e) {}
                    // If server associated the cart with the user, merged.user should be set
                    if (!merged.user) {
                      // Informative toast: cart saved server-side but not associated with account
                      showToast('Cart saved on server but not linked to your account', { duration: 4000 })
                    } else {
                      showToast('Your cart was merged', { duration: 3000 })
                    }
                    // clear anonymous cached items now that they've been merged
                    try { localStorage.removeItem('cartItems') } catch (e) {}
                  } else {
                    console.warn('Merge responded without _id:', merged)
                  }
                } catch (mergeErr) {
                  console.error('merge POST failed', mergeErr)
                  // keep localStorage if merge failed; notify user
                  try { showToast('Could not merge cart now — items kept locally', { duration: 4000 }) } catch (e) {}
                }
              }
            }
          } catch (e) {
            console.warn('Failed to merge anonymous cart after login:', e?.message || e)
          }

          showToast('Signed in', { duration: 2000 })
          if (me && me.role === 'admin') {
            router.push('/admin')
          } else {
            router.push('/profile')
          }
        } catch (e) {
          // fallback
          router.push('/profile')
        }
      } else {
        // normalize to string
        const msg = typeof res.data === 'string' ? res.data : res.data?.message || JSON.stringify(res.data)
          setError(msg || 'Login failed')
          // show toast for invalid credentials / other messages
          showToast(msg || 'Login failed')
      }
    } catch (err) {
      // normalize various error shapes to a string
      const resp = err.response?.data
      const msg = typeof resp === 'string' ? resp : resp?.message || err.message
        setError(msg || 'Login failed')
        showToast(msg || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Admin Sign in</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            name="username"
            placeholder="username"
            className={styles.input}
            value={form.username}
            onChange={handleChange}
            autoComplete="username"
          />

          <input
            name="password"
            placeholder="password"
            type="password"
            className={styles.input}
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
          />

          <button className={styles.button} type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {error && <div className={styles.error}>{error}</div>}
      </div>
    </div>
  )
}
