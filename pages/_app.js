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
          const subtotal = items.reduce((s, p) => s + (Number(p.price) || 0) * (Number(p.quantity) || 1), 0)
          store.dispatch(setCart({ items, subtotal }))
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