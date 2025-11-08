import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import style from '../../../styles/global.module.css'
import { AdminAuthorLink } from '../../../protect/AuthGate'
import { useToast } from '../../../components/ToastContext'

export default function EditProductPage() {
  const router = useRouter()
  const { id } = router.query || {}
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ title: '', desc: '', price: '', img: '', offer: false })
  const [file, setFile] = useState(null)
  const { showToast } = useToast()

  useEffect(() => {
    if (!id) return
    let mounted = true
    setLoading(true)
    fetch(`/api/products/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return
        if (!data) return
        setForm({
          title: data.title || '',
          desc: data.desc || '',
          price: Array.isArray(data.price) ? String(data.price[0] || '') : String(data.price || ''),
          img: data.img || '',
          offer: typeof data.offer === 'boolean' ? data.offer : false,
        })
      })
      .catch((err) => console.warn('fetch product failed', err?.message || err))
      .finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [id])

  const handleChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }))

  const handleCheckbox = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.checked }))

  const handleSubmit = async (e) => {
    e?.preventDefault?.()
    setSaving(true)
    try {
      let imgUrl = form.img
      // if a file is selected, upload to Cloudinary first
      if (file) {
        const data = new FormData()
        data.append('file', file)
        data.append('cloud_name', 'dzbi59kmu')
        data.append('upload_preset', 'jwukjk1g')
        try {
          const uploadRes = await axios.post('https://api.cloudinary.com/v1_1/dzbi59kmu/image/upload', data)
          imgUrl = uploadRes.data?.url || imgUrl
        } catch (upErr) {
          console.error('Upload error:', upErr)
          if (upErr.response && upErr.response.data) {
            console.error('Cloudinary response data:', upErr.response.data)
            throw new Error(upErr.response.data.error?.message || JSON.stringify(upErr.response.data))
          }
          throw upErr
        }
      }

      const body = {
        title: form.title,
        desc: form.desc,
        img: imgUrl,
        price: [Number(form.price) || 0],
        offer: !!form.offer,
      }

      const res = await axios.put(`/api/products/${id}`, body)
      if (res.status === 200) {
        showToast('Product updated', { duration: 2500 })
        router.push('/')
      } else {
        showToast('Update failed', { duration: 3000 })
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Update failed'
      showToast(String(msg), { duration: 4000 })
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminAuthorLink>
      <div style={{ padding: 20, maxWidth: 720, margin: '24px auto' }}>
        <h2>Edit product</h2>
        {loading ? (
          <div>Loading…</div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
            <label>
              Title
              <input name="title" value={form.title} onChange={handleChange} className={style.input} />
            </label>

            <label>
              Description
              <textarea name="desc" value={form.desc} onChange={handleChange} className={style.textarea} />
            </label>

            <label>
              Price
              <input name="price" value={form.price} onChange={handleChange} className={style.input} />
            </label>

            <label>
              Image URL
              <input name="img" value={form.img} onChange={handleChange} className={style.input} />
            </label>

            <label>
              Or upload image
              <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className={style.input} />
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input type="checkbox" name="offer" checked={!!form.offer} onChange={handleCheckbox} />
              <span>Mark as offer</span>
            </label>

            <div style={{ display: 'flex', gap: 8 }}>
              <button className={style.button} type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
              <button type="button" className={style.button} onClick={() => router.back()}>Cancel</button>
            </div>
          </form>
        )}
      </div>
    </AdminAuthorLink>
  )
}

