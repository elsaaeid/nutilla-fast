import Layout from "../components/Layout";
import ToastProvider from "../components/ToastContext"
import "../styles/globals.css";
import store from "../redux/store";
import { Provider } from "react-redux";
import { useEffect } from 'react'
import axios from 'axios'
import { setCart } from '../redux/cartSlice'
import { normalizeCartItems, computeSubtotal } from '../util/cartHelpers'

function MyApp({ Component, pageProps }) {
  // hydrate Redux cart: try server cart first (for logged-in users), fall back to localStorage
  useEffect(() => {
    const enrichItems = async (rawItems) => {
      const results = await Promise.all(rawItems.map(async (it) => {
        try {
          if (typeof it.offer !== 'undefined' && typeof it.originalPrice !== 'undefined') return it
          const pid = it.productId || it._id || null
          if (!pid) return it
          const res = await fetch(`/api/products/${pid}`)
          if (!res.ok) return it
          const prod = await res.json()
          const base = Array.isArray(prod.price) ? prod.price[0] : prod.price
          const parseOffer = (v) => {
            if (typeof v === 'boolean') return v
            if (typeof v === 'string') return ['true','1','yes'].includes(v.toLowerCase().trim())
            if (typeof v === 'number') return v === 1
            return false
          }
          return { ...it, offer: parseOffer(prod.offer), originalPrice: (typeof base !== 'undefined' && base !== null) ? Number(base) || null : null }
        } catch (e) {
          return it
        }
      }))
      return results
    }

    (async () => {
      try {
        if (typeof window !== 'undefined') {
          const cartId = localStorage.getItem('cartId') || null
          try {
            const res = await axios.get(`/api/cart${cartId ? `?cartId=${cartId}` : ''}`, { withCredentials: true })
            const data = res.data || {}
            const items = Array.isArray(data.items) ? data.items : []
            const subtotal = typeof data.subtotal === 'number' ? data.subtotal : Number(data.subtotal) || 0
            if (items.length > 0) {
              store.dispatch(setCart({ items, subtotal }))
              // If there are anonymous items in localStorage and the server returned a user cart,
              // clear localStorage to avoid duplicate anonymous copies. We'll also attempt to merge
              // localStorage items into the server cart below if needed.
              try { localStorage.removeItem('cartItems') } catch (e) {}
              return
            }
          } catch (e) {
            // server call failed or returned empty; we'll fall back to localStorage below
          }
        }

        // fallback: hydrate from localStorage
        const raw = typeof window !== 'undefined' ? localStorage.getItem('cartItems') : null
        if (raw) {
          const items = JSON.parse(raw)
          if (Array.isArray(items) && items.length > 0) {
            const enriched = await enrichItems(items)
            const subtotal = enriched.reduce((s, p) => s + (Number(p.price) || 0) * (Number(p.quantity) || 1), 0)
            store.dispatch(setCart({ items: enriched, subtotal }))
            // If user is logged-in, attempt to POST these anonymous items to the server to merge them
            try {
              const meRes = await fetch('/api/me', { credentials: 'same-origin' })
              const me = await meRes.json()
              if (me) {
                // normalize and compute subtotal, then send to server with credentials
                const normalized = normalizeCartItems(enriched)
                const mergeSubtotal = computeSubtotal(normalized)
                try {
                  const mergeRes = await axios.post('/api/cart', { items: normalized, subtotal: mergeSubtotal }, { withCredentials: true })
                  if (mergeRes?.data && mergeRes.data._id) {
                    try { localStorage.setItem('cartId', mergeRes.data._id) } catch (e) {}
                    try { localStorage.removeItem('cartItems') } catch (e) {}
                    const serverCart = mergeRes.data || {}
                    const serverItems = Array.isArray(serverCart.items) ? serverCart.items : normalized
                    const serverSubtotal = typeof serverCart.subtotal === 'number' ? serverCart.subtotal : mergeSubtotal
                    store.dispatch(setCart({ items: serverItems, subtotal: serverSubtotal }))
                  }
                } catch (mergeErr) {
                  console.warn('Failed to merge anonymous cart on boot:', mergeErr?.message || mergeErr)
                }
              }
            } catch (e) {
              // ignore me/merge errors
            }
          }
        }
      } catch (e) {
        console.warn('Failed to hydrate cart', e?.message || e)
      }
    })()
  }, [])

  return (
    <Provider store={store}>
      <ToastProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ToastProvider>
    </Provider>
  );
}

export default MyApp;