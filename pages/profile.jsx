import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useToast } from '../components/ToastContext'

const Profile = () => {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', password: '', password2: '' })
  const { showToast } = useToast()

  useEffect(() => {
    let mounted = true
    fetch('/api/me')
      .then((res) => {
        if (!res.ok) throw new Error('Not authenticated')
        return res.json()
      })
      .then((data) => {
        if (!mounted) return
        // API returns { user } or user object depending on implementation; be tolerant
        const u = data.user || data
        setUser(u)
        setForm((f) => ({ ...f, name: u?.name || '', phone: u?.phone || '' }))
      })
      .catch(() => {
        if (!mounted) return
        setUser(null)
      })
      .finally(() => mounted && setLoading(false))

    return () => {
      mounted = false
    }
  }, [])

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  const handleChange = (e) => {
    const { name, value } = e.target || {}
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSave = async (e) => {
    e?.preventDefault?.()
    setSaving(true)
    if (form.password && form.password !== form.password2) {
      showToast('Passwords do not match')
      setSaving(false)
      return
    }
    try {
      const payload = { name: form.name, phone: form.phone }
      if (form.password) payload.password = form.password
      const res = await fetch('/api/me', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: 'Update failed' }))
        showToast(err.message || 'Update failed')
        setSaving(false)
        return
      }
      const updated = await res.json()
      setUser(updated)
      setForm((f) => ({ ...f, password: '', password2: '' }))
      showToast('Profile updated')
    } catch (err) {
      showToast(err.message || 'Update failed')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>

  if (!user) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Not signed in</h2>
        <p>
          <Link href="/admin/login">Sign in</Link> or{' '}
          <Link href="/admin/register">register</Link>
        </p>
      </div>
    )
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Profile</h1>
      <form onSubmit={handleSave} style={{ maxWidth: 560 }}>
        <label style={{ display: 'block', marginBottom: 8 }}>
          Name
          <input name="name" value={form.name} onChange={handleChange} style={{ display: 'block', width: '100%', padding: 8, marginTop: 6 }} />
        </label>

        <label style={{ display: 'block', marginBottom: 8 }}>
          Email (read-only)
          <input value={user.email || ''} readOnly style={{ display: 'block', width: '100%', padding: 8, marginTop: 6, background: '#f5f5f5' }} />
        </label>

        <label style={{ display: 'block', marginBottom: 8 }}>
          Phone
          <input name="phone" value={form.phone} onChange={handleChange} style={{ display: 'block', width: '100%', padding: 8, marginTop: 6 }} />
        </label>

        <hr />

        <label style={{ display: 'block', marginBottom: 8 }}>
          New password (leave blank to keep current)
          <input name="password" type="password" value={form.password} onChange={handleChange} style={{ display: 'block', width: '100%', padding: 8, marginTop: 6 }} />
        </label>

        <label style={{ display: 'block', marginBottom: 8 }}>
          Confirm new password
          <input name="password2" type="password" value={form.password2} onChange={handleChange} style={{ display: 'block', width: '100%', padding: 8, marginTop: 6 }} />
        </label>

        <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
          <button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save changes'}</button>
          <button type="button" onClick={handleLogout}>Log out</button>
        </div>
      </form>
    </div>
  )
}

export default Profile
