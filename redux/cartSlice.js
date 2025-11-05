import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const item = action.payload || {}
      const makeKey = (p) => {
        if (!p) return ''
        const id = p._id || p.productId || ''
        const extras = Array.isArray(p.extras) ? JSON.stringify(p.extras) : ''
        return `${String(id)}|${extras}`
      }
      const key = makeKey(item)
      const existingIndex = state.products.findIndex((p) => makeKey(p) === key)
      if (existingIndex >= 0) {
        // merge by increasing quantity
        const existing = state.products[existingIndex]
        const addQty = Number(item.quantity) || 1
        existing.quantity = (Number(existing.quantity) || 0) + addQty
        state.total = Number(state.total) + (Number(item.price) || 0) * addQty
      } else {
        state.products.push(item)
        state.quantity += 1
        state.total += (Number(item.price) || 0) * (Number(item.quantity) || 1)
      }
    },
    // update quantity by index (amount can be positive or negative)
    updateQuantity: (state, action) => {
      const { index, amount } = action.payload || {}
      if (typeof index !== 'number' || !state.products[index]) return
      const item = state.products[index]
      const oldQty = Number(item.quantity) || 0
      const newQty = Math.max(0, oldQty + Number(amount) || 0)
      const delta = newQty - oldQty
      item.quantity = newQty
      state.total = Math.max(0, Number(state.total) + (Number(item.price) || 0) * delta)
      // if quantity dropped to 0 remove the item
      if (item.quantity === 0) {
        state.products.splice(index, 1)
        state.quantity = Math.max(0, state.quantity - 1)
      }
    },
    setCart: (state, action) => {
      const { items = [], subtotal = 0 } = action.payload || {}
      state.products = items
      state.quantity = Array.isArray(items) ? items.length : 0
      state.total = Number(subtotal) || items.reduce((s, p) => s + (Number(p.price) || 0) * (Number(p.quantity) || 1), 0)
    },
    removeProduct: (state, action) => {
      const index = action.payload;
      if (index >= 0 && index < state.products.length) {
        const removed = state.products[index];
        state.products.splice(index, 1);
        state.quantity = Math.max(0, state.quantity - 1);
        state.total = Math.max(0, state.total - removed.price * removed.quantity);
      }
    },
    reset: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});
export const { addProduct, removeProduct, reset, setCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;