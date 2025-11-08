import Layout from "../components/Layout";
import ToastProvider from "../components/ToastContext"
import "../styles/globals.css";
import store from "../redux/store";
import { Provider } from "react-redux";
import { useEffect } from 'react'
import { setCart } from '../redux/cartSlice'

function MyApp({ Component, pageProps }) {
  // hydrate redux cart from localStorage for anonymous users (client-side only)
  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem('cartItems') : null
      if (raw) {
        const items = JSON.parse(raw)
        if (Array.isArray(items) && items.length > 0) {
          // Enrich legacy localStorage items that may not include `offer`/`originalPrice`
          const enrichItems = async (rawItems) => {
            const results = await Promise.all(rawItems.map(async (it) => {
              try {
                // If item already includes offer/originalPrice, keep as-is
                if (typeof it.offer !== 'undefined' && typeof it.originalPrice !== 'undefined') return it
                // try to derive from product id
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
            const enriched = await enrichItems(items)
            const subtotal = enriched.reduce((s, p) => s + (Number(p.price) || 0) * (Number(p.quantity) || 1), 0)
            store.dispatch(setCart({ items: enriched, subtotal }))
          })()
        }
      }
    } catch (e) {
      // ignore malformed localStorage
      console.warn('Failed to hydrate cart from localStorage', e?.message || e)
    }
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