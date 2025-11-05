import React from "react";
import styles from "../styles/ProductCard.module.css";
import style from "../styles/global.module.css";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../redux/cartSlice'
import axios from 'axios'
import { FiShoppingCart } from 'react-icons/fi'
import { FiEdit } from 'react-icons/fi'
import { AdminAuthorLink } from '../protect/AuthGate'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const handleAddToCart = () => {
    const price = Array.isArray(product.price) ? product.price[0] : product.price
    const item = { ...product, price: Number(price) || 0, quantity: 1, extras: [] }
    // optimistic update to redux
    dispatch(addProduct(item))
    // persist cart (best-effort): post new array including this item
    try {
      const existing = (cart && Array.isArray(cart.products)) ? cart.products : []
      const newProducts = [...existing, item]
      const subtotal = newProducts.reduce((s, p) => s + (Number(p.price) || 0) * (Number(p.quantity) || 1), 0)
      const cartId = typeof window !== 'undefined' ? localStorage.getItem('cartId') : null
      axios.post('/api/cart', { items: newProducts, subtotal, cartId })
        .then((res) => {
          if (res?.data && res.data._id) {
            try { localStorage.setItem('cartId', res.data._id) } catch (e) {}
          }
        })
        .catch((e) => console.warn('persist cart fail', e?.message || e))
      try { localStorage.setItem('cartItems', JSON.stringify(newProducts)) } catch (e) {}
    } catch (e) {
      // in case selector can't be used here synchronously, fall back to posting single item
      const cartId = typeof window !== 'undefined' ? localStorage.getItem('cartId') : null
      axios.post('/api/cart', { items: item, cartId })
        .then((res) => { if (res?.data && res.data._id) { try { localStorage.setItem('cartId', res.data._id) } catch (e) {} } })
        .catch((err) => console.warn('persist cart fail', err?.message || err))
      try {
        const existing = (cart && Array.isArray(cart.products)) ? cart.products : []
        const newItems = [...existing, item]
        localStorage.setItem('cartItems', JSON.stringify(newItems))
      } catch (err) {}
    }
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
        <span className={styles.price}>
          ${Array.isArray(product.price) ? product.price[0] : product.price}
        </span>
        <div className={styles.actions}>
          <Link className={style.linkContainer} href={`/product/${product._id}`} passHref>
            View Details
          </Link>
          <AdminAuthorLink>
            <Link href={`/admin/edit-product/${product._id}`} className={style.button} title="Edit product">
              <FiEdit size={16} />
            </Link>
          </AdminAuthorLink>
          <button className={style.button} onClick={handleAddToCart} aria-label={`Add ${product.title} to cart`} title="Add to cart">
            <FiShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
