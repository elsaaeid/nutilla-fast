import React from "react";
import styles from "../styles/ProductCard.module.css";
import style from "../styles/global.module.css";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, removeProduct, updateQuantity, setCart } from '../redux/cartSlice'
import axios from 'axios'
import { normalizeCartItems, computeSubtotal } from '../util/cartHelpers'
import { FiShoppingCart } from 'react-icons/fi'
import { FiEdit } from 'react-icons/fi'
import QtyControls from './QtyControls'
import { AdminAuthorLink } from '../protect/AuthGate'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  // helper to build a deterministic key that matches cartSlice logic
  const makeKey = (p) => {
    if (!p) return ''
    const id = p._id || p.productId || ''
    // normalize extras: missing extras should be treated the same as an empty array
    const extrasArr = Array.isArray(p.extras) ? p.extras : []
    const extras = JSON.stringify(extrasArr)
    return `${String(id)}|${extras}`
  }
  const findIndexInCart = (prod) => {
    const key = makeKey(prod)
    return (cart && Array.isArray(cart.products)) ? cart.products.findIndex((p) => makeKey(p) === key) : -1
  }
  // derive in-cart status at render time from Redux and localStorage so
  // the UI always reflects the latest cart state (no stale local state)
  const isInCartRedux = findIndexInCart(product) !== -1
  // prefer Redux as the source of truth for UI state; localStorage can lag
  const inCart = isInCartRedux
  const handleAddToCart = () => {
    const rawPrice = Array.isArray(product.price) ? product.price[0] : product.price
    const basePrice = Number(rawPrice) || 0
    const isOffer = !!product?.offer
    const priceForCart = isOffer ? Math.round(basePrice * 0.75 * 100) / 100 : basePrice
  const item = { ...product, price: Number(priceForCart) || 0, originalPrice: basePrice || null, offer: isOffer, quantity: 1, extras: [] }
    // decide whether item already exists in cart (same id + extras)
    try {
      const existing = (cart && Array.isArray(cart.products)) ? [...cart.products] : []
      const key = makeKey(item)
      const existingIndex = existing.findIndex((p) => makeKey(p) === key)
      if (existingIndex >= 0) {
        // increase quantity via reducer for correct merging behaviour
        dispatch(updateQuantity({ index: existingIndex, amount: 1 }))
        // persist updated products
  let newProducts = existing.map((p, i) => i === existingIndex ? { ...p, quantity: (Number(p.quantity) || 0) + 1 } : p)
  newProducts = normalizeCartItems(newProducts)
  const subtotal = computeSubtotal(newProducts)
        const cartId = typeof window !== 'undefined' ? localStorage.getItem('cartId') : null
        axios.post('/api/cart', { items: newProducts, subtotal, cartId })
          .then((res) => { if (res?.data && res.data._id) { try { localStorage.setItem('cartId', res.data._id) } catch (e) {} } })
          .catch((e) => console.warn('persist cart fail', e?.message || e))
        try {
          if (process.env.NODE_ENV !== 'production') console.debug('persisting cartItems (product card):', newProducts)
          localStorage.setItem('cartItems', JSON.stringify(newProducts))
        } catch (e) {}
    } else {
  // add new item - normalize first so Redux receives the same shape we persist
  const [normalizedItem] = normalizeCartItems([item])
  dispatch(addProduct(normalizedItem))
  let newProducts = [...existing, normalizedItem]
  newProducts = normalizeCartItems(newProducts)
  const subtotal = computeSubtotal(newProducts)
        const cartId = typeof window !== 'undefined' ? localStorage.getItem('cartId') : null
        axios.post('/api/cart', { items: newProducts, subtotal, cartId })
          .then((res) => { if (res?.data && res.data._id) { try { localStorage.setItem('cartId', res.data._id) } catch (e) {} } })
          .catch((e) => console.warn('persist cart fail', e?.message || e))
  try { localStorage.setItem('cartItems', JSON.stringify(newProducts)) } catch (e) {}
      }
    } catch (e) {
  // fallback: normalize then dispatch addProduct and store single-item cart
  const [normalizedItem] = normalizeCartItems([item])
  dispatch(addProduct(normalizedItem))
      try {
        const cartId = typeof window !== 'undefined' ? localStorage.getItem('cartId') : null
        axios.post('/api/cart', { items: normalizedItem, cartId })
      } catch (err) { /* ignore persistence errors */ }
    }
  }
  
  const handleIncrease = async (index) => {
    const amount = 1
    dispatch(updateQuantity({ index, amount }))
    try {
      let newProducts = cart.products.map((p, i) => (i === index ? { ...p, quantity: (Number(p.quantity) || 0) + amount } : p))
      newProducts = normalizeCartItems(newProducts)
      const subtotal = computeSubtotal(newProducts)
      const cartId = typeof window !== 'undefined' ? localStorage.getItem('cartId') : null
      const res = await axios.post('/api/cart', { items: newProducts, subtotal, cartId })
      if (res?.data && res.data._id) { try { localStorage.setItem('cartId', res.data._id) } catch (e) {} }
    } catch (e) { console.warn('Failed to persist cart qty change:', e?.message || e) }
  }

  const handleDecrease = async (index) => {
    const amount = -1
    dispatch(updateQuantity({ index, amount }))
    try {
      let newProducts = cart.products
        .map((p, i) => (i === index ? { ...p, quantity: Math.max(0, (Number(p.quantity) || 0) + amount) } : p))
        .filter((p) => (Number(p.quantity) || 0) > 0)
      newProducts = normalizeCartItems(newProducts)
      const subtotal = computeSubtotal(newProducts)
      const cartId = typeof window !== 'undefined' ? localStorage.getItem('cartId') : null
      const res = await axios.post('/api/cart', { items: newProducts, subtotal, cartId })
      if (res?.data && res.data._id) { try { localStorage.setItem('cartId', res.data._id) } catch (e) {} }
    } catch (e) { console.warn('Failed to persist cart qty change:', e?.message || e) }
  }

  const handleRemoveFromCart = async (index) => {
    dispatch(removeProduct(index))
    try {
      const newProducts = cart.products.filter((_, i) => i !== index)
      const subtotal = newProducts.reduce((s, p) => s + (Number(p.price) || 0) * (Number(p.quantity) || 1), 0)
      const cartId = typeof window !== 'undefined' ? localStorage.getItem('cartId') : null
      const res = await axios.post('/api/cart', { items: newProducts, subtotal, cartId })
      if (res?.data && res.data._id) { try { localStorage.setItem('cartId', res.data._id) } catch (e) {} }
    } catch (e) { console.warn('Failed to persist cart after remove:', e?.message || e) }
  try {
    const toSave = normalizeCartItems(cart.products.filter((_, i) => i !== index))
    if (process.env.NODE_ENV !== 'production') console.debug('persisting cartItems (product card remove):', toSave)
    localStorage.setItem('cartItems', JSON.stringify(toSave))
  } catch (e) {}
  }

  // remove an item that exists only in localStorage (anonymous cart)
  const removeFromLocal = async (prod) => {
    if (typeof window === 'undefined') return
    try {
      const raw = localStorage.getItem('cartItems')
      const items = raw ? JSON.parse(raw) : []
      const key = makeKey(prod)
      const newItems = (Array.isArray(items) ? items : []).filter((p) => makeKey(p) !== key)
      const normalized = normalizeCartItems(newItems)
      // update Redux immediately so UI reflects removal
      const subtotal = computeSubtotal(normalized)
      dispatch(setCart({ items: normalized, subtotal }))
      try {
        if (process.env.NODE_ENV !== 'production') console.debug('persisting cartItems (product card normalized add):', normalized)
        localStorage.setItem('cartItems', JSON.stringify(normalized))
      } catch (e) {}
      const cartId = localStorage.getItem('cartId')
      try {
        const res = await axios.post('/api/cart', { items: normalized, subtotal, cartId })
        if (res?.data && res.data._id) { try { localStorage.setItem('cartId', res.data._id) } catch (e) {} }
      } catch (e) {
        console.warn('Failed to persist anonymous cart after remove:', e?.message || e)
      }
    } catch (e) {
      console.warn('Failed to remove item from local cart:', e?.message || e)
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
          <Image
            src={product.img}
            alt={product.title}
            width={150}
            height={150}
            className={styles.image}
          />
      </div>

      <div className={styles.content}>
        <h2 className={styles.title}>{product.title}</h2>
        {product?.offer ? (
          <div>
            <span className={styles.oldPrice}>${(Number(Array.isArray(product.price) ? product.price[0] : product.price) || 0).toFixed(2)}</span>
            <span className={styles.discountPrice}>${(Math.round((Number(Array.isArray(product.price) ? product.price[0] : product.price) || 0) * 0.75 * 100) / 100).toFixed(2)}</span>
            <span className={styles.badge}>25% OFF</span>
          </div>
        ) : (
          <span className={styles.price}>${(Number(Array.isArray(product.price) ? product.price[0] : product.price) || 0).toFixed(2)}</span>
        )}
        <div className={styles.actions}>
          <>
            <Link className={style.linkContainer} href={`/product/${product._id}`} passHref>
              View Details
            </Link>
            <AdminAuthorLink>
              <Link href={`/admin/edit-product/${product._id}`} className={style.button} title="Edit product">
                <FiEdit size={16} />
              </Link>
            </AdminAuthorLink>
          </>
          {/* show add button when product not in cart; otherwise show qty controls and remove */}
          {(() => {
            const isInCart = inCart
            if (!isInCart) {
              return (
                <button className={style.button} onClick={handleAddToCart} aria-label={`Add ${product.title} to cart`} title="Add to cart">
                  <FiShoppingCart size={18} />
                </button>
              )
            }
            const idx = findIndexInCart(product)
            const cartItem = idx === -1 ? { quantity: 1 } : cart.products[idx]
            const q = Number(cartItem.quantity) || 1
            return (
              <QtyControls
                quantity={q}
                onIncrease={() => (idx === -1 ? null : handleIncrease(idx))}
                onDecrease={() => (idx === -1 ? null : handleDecrease(idx))}
                onRemove={() => (idx === -1 ? removeFromLocal(product) : handleRemoveFromCart(idx))}
                styles={styles}
              />
            )
          })()}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
