import { useState, useMemo } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import styles from '../../styles/Login.module.css'
import { useToast } from '../../components/ToastContext'

function validateEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email)
}

export default function AdminRegister() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', password2: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const { showToast } = useToast()

  const handleChange = (e) => {
    const { name, value } = e.target || {}
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const passwordChecks = useMemo(() => {
    const p = form.password || ''
    return {
      upper: /([a-z].*[A-Z])|([A-Z].*[a-z])/.test(p),
      number: /[0-9]/.test(p),
      special: /[!@#\$%\^&\*\?_~]/.test(p),
      length: p.length >= 6,
    }
  }, [form.password])

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    const { name, email, phone, password, password2 } = form
    if (!name || !phone || !email || !password) {
      setError('All fields are required')
      return
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    if (password !== password2) {
      setError('Passwords do not match')
      return
    }

    try {
      setLoading(true)
      const res = await axios.post('/api/register', { name, email, phone, password })
      if (res.status === 200 || res.status === 201) {
        // Expect the API to send a verification step; redirect to check-email page
        showToast('Account created — check your email', { duration: 3000 })
        router.push(`/check-email?email=${encodeURIComponent(email)}`)
      } else {
        const msg = res.data?.message || 'Registration failed'
        setError(msg)
        showToast(msg)
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Registration failed'
      setError(msg)
      showToast(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Create an account</h1>
        <form className={styles.form} onSubmit={submit}>
          <input name="name" placeholder="Full name" className={styles.input} value={form.name} onChange={handleChange} />
          <input name="phone" placeholder="Phone" className={styles.input} value={form.phone} onChange={handleChange} />
          <input name="email" placeholder="Email" className={styles.input} value={form.email} onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" className={styles.input} value={form.password} onChange={handleChange} />
          <input name="password2" type="password" placeholder="Confirm password" className={styles.input} value={form.password2} onChange={handleChange} />

          {/* Password checks */}
          <div style={{ display: 'flex', gap: 8, flexDirection: 'column' }}>
            <small style={{ color: passwordChecks.upper ? 'green' : '#666' }}>{passwordChecks.upper ? '✓' : '•'} Contains upper & lower case</small>
            <small style={{ color: passwordChecks.number ? 'green' : '#666' }}>{passwordChecks.number ? '✓' : '•'} Contains a number</small>
            <small style={{ color: passwordChecks.special ? 'green' : '#666' }}>{passwordChecks.special ? '✓' : '•'} Contains a special character</small>
            <small style={{ color: passwordChecks.length ? 'green' : '#666' }}>{passwordChecks.length ? '✓' : '•'} At least 6 characters</small>
          </div>

          <button className={styles.button} type="submit" disabled={loading}>{loading ? 'Creating...' : 'Sign up'}</button>
          {error && <div className={styles.error}>{error}</div>}
        </form>
      </div>
    </div>
  )
}
