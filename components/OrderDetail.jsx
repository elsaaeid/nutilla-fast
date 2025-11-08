import React, { useState } from 'react'
import style from '../styles/global.module.css'

export default function OrderDetail({ total, onCancel, createOrder }) {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e?.preventDefault?.()
    if (!name || !address) return
    setLoading(true)
    try {
      await createOrder({
        customer: name,
        address,
        total,
        method: 0, // 0 = cash on delivery
      })
    } catch (err) {
      console.error('Order create failed', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: 12, border: '1px solid #eee', borderRadius: 8, marginTop: 12 }}>
      <h3>Cash on Delivery</h3>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 8 }}>
        <label>
          Full name
          <input className={style.input} value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Address
          <textarea className={style.textarea} value={address} onChange={(e) => setAddress(e.target.value)} />
        </label>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className={style.button} type="submit" disabled={loading}>{loading ? 'Placing...' : `Place order (USD ${total})`}</button>
          <button type="button" className={style.button} onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  )
}
