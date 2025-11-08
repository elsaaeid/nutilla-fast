import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// Persist cart.products to localStorage so Redux survives page reloads/navigation
// Keep this lightweight and tolerant of server-side execution.
try {
    if (typeof window !== 'undefined') {
    let prev = store.getState().cart
    store.subscribe(() => {
      try {
        const next = store.getState().cart
        // quick reference check to avoid excessive writes
        if (next !== prev) {
          const items = Array.isArray(next.products) ? next.products : []
          try {
            if (process.env.NODE_ENV !== 'production') console.debug('store persisting cartItems to localStorage:', items)
            localStorage.setItem('cartItems', JSON.stringify(items))
          } catch (e) {}
          // if server returned cart id, persist it too
          try { if (next.cartId || next._id) localStorage.setItem('cartId', next.cartId || next._id) } catch (e) {}
          prev = next
        }
      } catch (e) {
        // ignore
      }
    })
  }
} catch (e) {
  // ignore when localStorage unavailable
}

export default store;