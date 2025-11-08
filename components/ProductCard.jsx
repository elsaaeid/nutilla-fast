import React, { useEffect, useState } from "react";
import styles from "../styles/ProductCard.module.css";
import style from "../styles/global.module.css";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, removeProduct, updateQuantity } from '../redux/cartSlice'
import axios from 'axios'
import { FiShoppingCart, FiPlus, FiMinus, FiTrash } from 'react-icons/fi'
import { FiEdit } from 'react-icons/fi'
import { AdminAuthorLink } from '../protect/AuthGate'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  // helper to build a deterministic key that matches cartSlice logic
  const makeKey = (p) => {
    if (!p) return ''
    const id = p._id || p.productId || ''
    const extras = Array.isArray(p.extras) ? JSON.stringify(p.extras) : ''
    return `${String(id)}|${extras}`
  }
  const findIndexInCart = (prod) => {
    const key = makeKey(prod)
    return (cart && Array.isArray(cart.products)) ? cart.products.findIndex((p) => makeKey(p) === key) : -1
  }
  const [inCartLocal, setInCartLocal] = useState(false)

  useEffect(() => {
    try {
      setInCartLocal(findIndexInCart(product) !== -1)
    } catch (e) {
      setInCartLocal(false)
    }
  }, [cart.products, product])
  const handleAddToCart = () => {
    const rawPrice = Array.isArray(product.price) ? product.price[0] : product.price
    const basePrice = Number(rawPrice) || 0
    const isOffer = !!product?.offer
    const priceForCart = isOffer ? Math.round(basePrice * 0.75 * 100) / 100 : basePrice
    const item = { ...product, price: Number(priceForCart) || 0, quantity: 1, extras: [] }
    // decide whether item already exists in cart (same id + extras)
    try {
      const existing = (cart && Array.isArray(cart.products)) ? [...cart.products] : []
      const key = makeKey(item)
      const existingIndex = existing.findIndex((p) => makeKey(p) === key)
      if (existingIndex >= 0) {
        // increase quantity via reducer for correct merging behaviour
        dispatch(updateQuantity({ index: existingIndex, amount: 1 }))
        setInCartLocal(true)
        // persist updated products
        const newProducts = existing.map((p, i) => i === existingIndex ? { ...p, quantity: (Number(p.quantity) || 0) + 1 } : p)
        const subtotal = newProducts.reduce((s, p) => s + (Number(p.price) || 0) * (Number(p.quantity) || 1), 0)
        const cartId = typeof window !== 'undefined' ? localStorage.getItem('cartId') : null
        axios.post('/api/cart', { items: newProducts, subtotal, cartId })
          .then((res) => { if (res?.data && res.data._id) { try { localStorage.setItem('cartId', res.data._id) } catch (e) {} } })
          .catch((e) => console.warn('persist cart fail', e?.message || e))
        try { localStorage.setItem('cartItems', JSON.stringify(newProducts)) } catch (e) {}
      } else {
  // add new item
  dispatch(addProduct(item))
  setInCartLocal(true)
        const newProducts = [...existing, item]
        const subtotal = newProducts.reduce((s, p) => s + (Number(p.price) || 0) * (Number(p.quantity) || 1), 0)
        const cartId = typeof window !== 'undefined' ? localStorage.getItem('cartId') : null
        axios.post('/api/cart', { items: newProducts, subtotal, cartId })
          .then((res) => { if (res?.data && res.data._id) { try { localStorage.setItem('cartId', res.data._id) } catch (e) {} } })
          .catch((e) => console.warn('persist cart fail', e?.message || e))
        try { localStorage.setItem('cartItems', JSON.stringify(newProducts)) } catch (e) {}
      }
    } catch (e) {
  // fallback: dispatch addProduct and store single-item cart
  dispatch(addProduct(item))
  setInCartLocal(true)
      try {
        const cartId = typeof window !== 'undefined' ? localStorage.getItem('cartId') : null
        axios.post('/api/cart', { items: item, cartId })
      } catch (err) { /* ignore persistence errors */ }
    }
  }
  
  const handleIncrease = async (index) => {
    const amount = 1
    dispatch(updateQuantity({ index, amount }))
    try {
      const newProducts = cart.products.map((p, i) => (i === index ? { ...p, quantity: (Number(p.quantity) || 0) + amount } : p))
      const subtotal = newProducts.reduce((s, p) => s + (Number(p.price) || 0) * (Number(p.quantity) || 1), 0)
      const cartId = typeof window !== 'undefined' ? localStorage.getItem('cartId') : null
      const res = await axios.post('/api/cart', { items: newProducts, subtotal, cartId })
      if (res?.data && res.data._id) { try { localStorage.setItem('cartId', res.data._id) } catch (e) {} }
    } catch (e) { console.warn('Failed to persist cart qty change:', e?.message || e) }
  }

  const handleDecrease = async (index) => {
    const amount = -1
    dispatch(updateQuantity({ index, amount }))
    try {
      const newProducts = cart.products
        .map((p, i) => (i === index ? { ...p, quantity: Math.max(0, (Number(p.quantity) || 0) + amount) } : p))
        .filter((p) => (Number(p.quantity) || 0) > 0)
      const subtotal = newProducts.reduce((s, p) => s + (Number(p.price) || 0) * (Number(p.quantity) || 1), 0)
      const cartId = typeof window !== 'undefined' ? localStorage.getItem('cartId') : null
      const res = await axios.post('/api/cart', { items: newProducts, subtotal, cartId })
      if (res?.data && res.data._id) { try { localStorage.setItem('cartId', res.data._id) } catch (e) {} }
    } catch (e) { console.warn('Failed to persist cart qty change:', e?.message || e) }
  }

  const handleRemoveFromCart = async (index) => {
    dispatch(removeProduct(index))
    setInCartLocal(false)
    try {
      const newProducts = cart.products.filter((_, i) => i !== index)
      const subtotal = newProducts.reduce((s, p) => s + (Number(p.price) || 0) * (Number(p.quantity) || 1), 0)
      const cartId = typeof window !== 'undefined' ? localStorage.getItem('cartId') : null
      const res = await axios.post('/api/cart', { items: newProducts, subtotal, cartId })
      if (res?.data && res.data._id) { try { localStorage.setItem('cartId', res.data._id) } catch (e) {} }
    } catch (e) { console.warn('Failed to persist cart after remove:', e?.message || e) }
    try { localStorage.setItem('cartItems', JSON.stringify(cart.products.filter((_, i) => i !== index))) } catch (e) {}
  }
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
          <Image
            src={product.img}
            alt={product.title}
            width={200}
            height={200}
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
          {/* disable other actions when product is already in cart */}
          {(() => {
            const isInCart = inCartLocal
            if (!isInCart) {
              return (
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
              )
            }
            // when in cart, show disabled placeholders to avoid navigation/actions
            return (
              <>
                <span className={styles.disabledLink}>View Details</span>
                <span className={styles.disabledLink} title="Edit product"><FiEdit size={16} /></span>
              </>
            )
          })()}
          {/* show add button when product not in cart; otherwise show qty controls and remove */}
          {(() => {
            const isInCart = inCartLocal
            if (!isInCart) {
              return (
                <button className={style.button} onClick={handleAddToCart} aria-label={`Add ${product.title} to cart`} title="Add to cart">
                  <FiShoppingCart size={18} />
                </button>
              )
            }
            // product is in cart (optimistic). try to locate real index in redux; if not present yet, show optimistic controls
            const idx = findIndexInCart(product)
            const cartItem = idx === -1 ? { quantity: 1 } : cart.products[idx]
            return (
              <div className={styles.qtyControlsInline}>
                <button className={styles.qtyBtn} onClick={() => idx === -1 ? null : handleDecrease(idx)} aria-label="Decrease">
                  <FiMinus />
                </button>
                <span className={styles.quantity}>{cartItem.quantity}</span>
                <button className={styles.qtyBtn} onClick={() => idx === -1 ? null : handleIncrease(idx)} aria-label="Increase">
                  <FiPlus />
                </button>
                <button className={styles.removeBtn} onClick={() => idx === -1 ? (setInCartLocal(false)) : handleRemoveFromCart(idx)} aria-label="Remove">
                  <FiTrash />
                </button>
              </div>
            )
          })()}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
