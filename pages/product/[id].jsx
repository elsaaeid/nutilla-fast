import styles from "../../styles/Product.module.css";
import style from "../../styles/global.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, updateQuantity, removeProduct } from "../../redux/cartSlice";
import axios from 'axios'
import { normalizeCartItems, computeSubtotal } from '../../util/cartHelpers'
import { FiShoppingCart } from 'react-icons/fi'
import QtyControls from '../../components/QtyControls'


const Product = ({product}) => {
  // determine base price and whether product is on offer (coerce strings/numbers)
  const base = Number(Array.isArray(product?.price) ? product.price[0] : (product?.price || 0)) || 0;
  const isOffer = (() => {
    const v = product?.offer;
    if (typeof v === 'boolean') return v;
    if (typeof v === 'string') return ['true', '1', 'yes'].includes(v.toLowerCase().trim());
    if (typeof v === 'number') return v === 1;
    return false;
  })();
  const discountedBase = Math.round(base * 0.75 * 100) / 100;
  const [price, setPrice] = useState(isOffer ? discountedBase : base);
  const [quantity, setQuantity] = useState(1);
  const [extras, setExtras] = useState([]);
  const [inCartLocal, setInCartLocal] = useState(false)
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart)

  // helper to build deterministic key matching cartSlice logic
  const makeKey = (p) => {
    if (!p) return ''
    const id = p._id || p.productId || ''
    const extrasArr = Array.isArray(p.extras) ? p.extras : []
    const extrasKey = JSON.stringify(extrasArr)
    return `${String(id)}|${extrasKey}`
  }
  const findIndexInCart = (prod) => {
    const key = makeKey(prod)
    return (cart && Array.isArray(cart.products)) ? cart.products.findIndex((p) => makeKey(p) === key) : -1
  }

  useEffect(() => {
    try {
      const prodForKey = { ...product, extras }
      const inRedux = findIndexInCart(prodForKey) !== -1
      let inLS = false
      if (typeof window !== 'undefined') {
        try {
          const raw = localStorage.getItem('cartItems')
          if (raw) {
            const items = JSON.parse(raw)
            if (Array.isArray(items)) {
              const key = makeKey(prodForKey)
              inLS = items.some((p) => makeKey(p) === key)
            }
          }
        } catch (e) { inLS = false }
      }
      setInCartLocal(inRedux || inLS)
    } catch (e) { setInCartLocal(false) }
  }, [cart.products, extras, product])

  const changePrice = (number) => {
    const n = Number(number) || 0
    setPrice((p) => (Number(p) || 0) + n);
  };

  const handleChange = (e, option) => {
    const checked = e.target.checked;

    const key = option.id || option.text

    if (checked) {
      changePrice(option.price);
      setExtras((prev) => [...prev, { ...option, id: key }]);
    } else {
      changePrice(-option.price);
      setExtras((prev) => prev.filter((extra) => (extra.id || extra.text) !== key));
    }
  };

  const handleAddToCart = async () => {
    const item = { ...product, extras, price: Number(price) || 0, originalPrice: base || null, offer: isOffer, quantity: Number(quantity) || 1 }
    try {
      const existing = (cart && Array.isArray(cart.products)) ? [...cart.products] : []
      const key = makeKey(item)
      const existingIndex = existing.findIndex((p) => makeKey(p) === key)
      if (existingIndex >= 0) {
        // increment existing quantity
        dispatch(updateQuantity({ index: existingIndex, amount: Number(item.quantity) || 1 }))
        // persist
  let newProducts = existing.map((p, i) => i === existingIndex ? { ...p, quantity: (Number(p.quantity) || 0) + (Number(item.quantity) || 1) } : p)
  newProducts = normalizeCartItems(newProducts)
  const subtotal = computeSubtotal(newProducts)
        const cartId = typeof window !== 'undefined' ? localStorage.getItem('cartId') : null
        axios.post('/api/cart', { items: newProducts, subtotal, cartId }).then((res) => { if (res?.data && res.data._id) { try { localStorage.setItem('cartId', res.data._id) } catch (e) {} } }).catch((e) => console.warn('persist cart fail', e?.message || e))
        try { localStorage.setItem('cartItems', JSON.stringify(newProducts)) } catch (e) {}
  } else {
    const [normalizedItem] = normalizeCartItems([item])
    dispatch(addProduct(normalizedItem))
  let newProducts = [...existing, normalizedItem]
  newProducts = normalizeCartItems(newProducts)
  const subtotal = computeSubtotal(newProducts)
        const cartId = typeof window !== 'undefined' ? localStorage.getItem('cartId') : null
        axios.post('/api/cart', { items: newProducts, subtotal, cartId }).then((res) => { if (res?.data && res.data._id) { try { localStorage.setItem('cartId', res.data._id) } catch (e) {} } }).catch((e) => console.warn('persist cart fail', e?.message || e))
  try { localStorage.setItem('cartItems', JSON.stringify(newProducts)) } catch (e) {}
      }
      setInCartLocal(true)
    } catch (err) {
      // fallback simple add
      const [normalizedItem] = normalizeCartItems([item])
      dispatch(addProduct(normalizedItem))
      setInCartLocal(true)
  try { const existing = (cart && Array.isArray(cart.products)) ? cart.products : []; const merged = normalizeCartItems([...existing, normalizedItem]); localStorage.setItem('cartItems', JSON.stringify(merged)) } catch (e) {}
    }
  }

  const handleIncrease = async (index, amount = 1) => {
    dispatch(updateQuantity({ index, amount }))
    try {
      let newProducts = cart.products.map((p, i) => (i === index ? { ...p, quantity: (Number(p.quantity) || 0) + amount } : p))
      newProducts = normalizeCartItems(newProducts)
      const subtotal = computeSubtotal(newProducts)
      const cartId = typeof window !== 'undefined' ? localStorage.getItem('cartId') : null
      const res = await axios.post('/api/cart', { items: newProducts, subtotal, cartId })
      if (res?.data && res.data._id) { try { localStorage.setItem('cartId', res.data._id) } catch (e) {} }
      try { localStorage.setItem('cartItems', JSON.stringify(newProducts)) } catch (e) {}
    } catch (e) { console.warn('Failed to persist cart qty change:', e?.message || e) }
  }

  const handleDecrease = async (index, amount = -1) => {
    dispatch(updateQuantity({ index, amount }))
    try {
      let newProducts = cart.products
        .map((p, i) => (i === index ? { ...p, quantity: Math.max(0, (Number(p.quantity) || 0) + amount) } : p))
        .filter((p) => (Number(p.quantity) || 0) > 0)
      newProducts = normalizeCartItems(newProducts)
      const subtotal = computeSubtotal(newProducts)
      const cartId = typeof window !== 'undefined' ? localStorage.getItem('cartId') : null
      const res = await axios.post('/api/cart', { items: newProducts, subtotal, cartId })
      if (res?.data && res.data._1) { try { localStorage.setItem('cartId', res.data._id) } catch (e) {} }
      try { localStorage.setItem('cartItems', JSON.stringify(newProducts)) } catch (e) {}
      if (newProducts.length === 0) setInCartLocal(false)
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
  try { localStorage.setItem('cartItems', JSON.stringify(normalizeCartItems(cart.products.filter((_, i) => i !== index)))) } catch (e) {}
    setInCartLocal(false)
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          {/* Use explicit width/height for remote images to satisfy next/image requirements */}
          <Image src={product.img} alt="" width={600} height={600} />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{product.title}</h1>
        {isOffer ? (
          <div>
            <span className={styles.oldPrice}>${base.toFixed(2)}</span>
            <span className={styles.discountPrice}>${discountedBase.toFixed(2)}</span>
            <span className={styles.badge}>25% OFF</span>
          </div>
        ) : (
          <span className={styles.price}>${base.toFixed(2)}</span>
        )}
        <p className={styles.desc}>{product.desc}</p>
        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
          {(product?.extraOptions && product.extraOptions.length > 0 ? product.extraOptions : [
            { id: 'ice', text: 'ice cream ingredients', price: 1 },
            { id: 'fruits', text: 'fruits ingredients', price: 1.5 },
            { id: 'drinks', text: 'drinks ingredients', price: 2 },
          ]).map((option) => (
            <div className={styles.option} key={option.id || option.text}>
              <input
                type="checkbox"
                id={option.id || option.text}
                name={option.id || option.text}
                className={styles.checkbox}
                onChange={(e) => handleChange(e, option)}
              />
              <label htmlFor={option.id || option.text}>{option.text}</label>
            </div>
          ))}
        </div>
        <div className={styles.add}>
          {/* If not in cart, allow selecting quantity and adding. If in cart, show inline qty controls matching ProductCard (Option 3). */}
          {(() => {
            const prodForKey = { ...product, extras }
            const idx = findIndexInCart(prodForKey)
            const isInCart = inCartLocal
            if (!isInCart) {
              return (
                <>
                  <input
                    onChange={(e) => setQuantity(Number(e.target.value) || 1)}
                    type="number"
                    value={quantity}
                    min={1}
                    className={styles.quantity}
                  />
                  <button className={style.button} onClick={handleAddToCart} aria-label="Add to cart">
                    <FiShoppingCart style={{ verticalAlign: 'middle' }} /> Add to Cart
                  </button>
                </>
              )
            }
            // in-cart controls: use shared QtyControls
            const cartItem = idx === -1 ? { quantity: 1 } : cart.products[idx]
            const q = Number(cartItem.quantity) || 1
            return (
              <QtyControls
                quantity={q}
                onIncrease={() => (idx === -1 ? null : handleIncrease(idx))}
                onDecrease={() => (idx === -1 ? null : handleDecrease(idx))}
                onRemove={() => (idx === -1 ? setInCartLocal(false) : handleRemoveFromCart(idx))}
                styles={styles}
              />
            )
          })()}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  try {
  const dbConnect = require("../../util/mongo").default || require("../../util/mongo");
  const Product = (require("../../models/Product").default || require("../../models/Product"));
    await dbConnect();
    const product = await Product.findById(params.id).lean();
    if (!product) return { notFound: true };
    // serialize _id
    const serialized = {
      ...product,
      _id: String(product._id),
      createdAt: product.createdAt ? product.createdAt.toISOString() : null,
      updatedAt: product.updatedAt ? product.updatedAt.toISOString() : null,
      offer: (() => {
        const v = product.offer
        if (typeof v === 'boolean') return v
        if (typeof v === 'string') return ['true', '1', 'yes'].includes(v.toLowerCase().trim())
        if (typeof v === 'number') return v === 1
        return false
      })(),
    };
    return { props: { product: serialized } };
  } catch (err) {
    console.error('Error in product getServerSideProps:', err.message || err);
    return { props: { product: null } };
  }
};

export default Product;