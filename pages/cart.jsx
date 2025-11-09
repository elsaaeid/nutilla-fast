import styles from "../styles/Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import axios from "axios";
import { useRouter } from "next/router";
import { reset, removeProduct, setCart, updateQuantity } from "../redux/cartSlice";
import Image from 'next/image'
import QtyControls from '../components/QtyControls'
import OrderDetail from '../components/OrderDetail'
import { normalizeCartItems, computeSubtotal } from '../util/cartHelpers'

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null) // 'paypal' | 'cash' | null
  const amount = cart.total;
  const currency = "USD";
  const style = { layout: "vertical" };
  const dispatch = useDispatch();
  const router = useRouter();
  

  // Compute totals outside of JSX to avoid inline IIFE parsing issues
  const subtotalDiscounted = Number(cart.total) || 0;
  const originalTotal = (cart.products || []).reduce((acc, p) => {
    const qty = Number(p.quantity) || 1;
    const price = Number(p.price) || 0;
    // prefer an explicit originalPrice if the item stored it
    const hasOriginal = typeof p.originalPrice !== 'undefined' && p.originalPrice !== null && p.originalPrice !== '';
    const parseOfferLocal = (v) => {
      if (typeof v === 'boolean') return v;
      if (typeof v === 'string') return ['true', '1', 'yes'].includes(v.toLowerCase().trim());
      if (typeof v === 'number') return v === 1;
      return false;
    }
    const isOffer = parseOfferLocal(p?.offer)
    let origPrice
    if (isOffer) {
      // If originalPrice exists and is greater than the stored price, prefer it.
      // Otherwise derive original from discounted price (assuming 25% off).
      const candidate = hasOriginal ? Number(p.originalPrice) : null
      if (candidate && candidate > price) origPrice = candidate
      else origPrice = price / 0.75
    } else {
      origPrice = hasOriginal ? Number(p.originalPrice) : price
    }
    return acc + (Number(origPrice) || 0) * qty;
  }, 0);
  const discountTotal = Math.max(0, originalTotal - subtotalDiscounted);

  const createOrder = async (data) => {
    try {
      // persist cart server-side for the current user (best-effort)
        try {
          const cartId = typeof window !== 'undefined' ? localStorage.getItem('cartId') : null
      const res = await axios.post('/api/cart', { items: cart.products, subtotal: cart.total, cartId })
          if (res?.data && res.data._id) {
            try { localStorage.setItem('cartId', res.data._id) } catch (e) {}
          }
        } catch (e) {
          console.warn('Failed to persist cart before order:', e?.message || e)
        }

      const res = await axios.post("/api/orders", data);
      if (res.status === 201) {
        dispatch(reset());
        // navigate to the order detail page (singular 'order' folder)
        try { localStorage.removeItem('cartItems'); localStorage.removeItem('cartId') } catch (e) {}
        router.push(`/order/${res.data._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // load server-side cart on mount (if any) and populate redux
    const load = async () => {
      try {
    // Try loading cart from server first (server will use cookie to identify user).
    // If server returns no items, fall back to anonymous localStorage cart.
    const cartId = typeof window !== 'undefined' ? localStorage.getItem('cartId') : null
    try {
      const res = await axios.get(`/api/cart${cartId ? `?cartId=${cartId}` : ''}`, { withCredentials: true })
      const data = res.data || {}
      // console.log('loaded server cart:', data && (data.items || data.items === undefined ? data.items : data))
      const items = Array.isArray(data.items) ? data.items : []
      const subtotal = typeof data.subtotal === 'number' ? data.subtotal : Number(data.subtotal) || 0
      if (items.length > 0) {
        dispatch(setCart({ items, subtotal }))
      } else {
        // fallback to localStorage when server has no cart for this user
          try {
            const raw = typeof window !== 'undefined' ? localStorage.getItem('cartItems') : null
            if (raw) {
              if (process.env.NODE_ENV !== 'production') console.debug('cart page raw localStorage cartItems:', raw)
              const parsed = JSON.parse(raw)
              const items = Array.isArray(parsed) ? normalizeCartItems(parsed) : []
              if (process.env.NODE_ENV !== 'production') console.debug('cart page normalized items from localStorage:', items)
              const subtotal = computeSubtotal(items)
              if (items.length > 0) dispatch(setCart({ items, subtotal }))
            }
          } catch (e) {
            // ignore malformed localStorage
          }
      }
    } catch (e) {
      // If server call fails for any reason, fall back to localStorage
      try {
        const raw = typeof window !== 'undefined' ? localStorage.getItem('cartItems') : null
        if (raw) {
          const parsed = JSON.parse(raw)
          const items = Array.isArray(parsed) ? normalizeCartItems(parsed) : []
          const subtotal = computeSubtotal(items)
          if (items.length > 0) dispatch(setCart({ items, subtotal }))
        }
      } catch (err) {
        // ignore malformed localStorage
      }
    }
      } catch (e) {
        console.warn('Failed to load server cart:', e?.message || e)
      }
    }
    load()
    // client-only flag for PayPal script rendering
    setMounted(true)
  }, [dispatch])

  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);


    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              const shipping = details.purchase_units[0].shipping;
              createOrder({
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                total: cart.total,
                method: 1,
              });
            });
          }}
        />
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {(!cart.products || cart.products.length === 0) ? (
          <div className={styles.empty}>
            <h2>No items added</h2>
            <p>Your cart is empty. Start adding delicious items!</p>
            <button className={styles.browseBtn} onClick={() => router.push('/menus')}>
              Browse menus
            </button>
          </div>
        ) : (
          <div className={styles.itemsList}>
            {cart.products.map((product, idx) => (
              <div className={styles.itemCard} key={product.cartItemId || product._id || product.productId || idx}>
                <div className={styles.cardRow}>
                  <div className={styles.imgContainer}>
                    {product?.img ? (
                      <Image
                        src={product.img}
                        alt={product.title}
                        width={50}
                        height={50}
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <div style={{ width: 50, height: 50, background: '#eee' }} />
                    )}
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.name}>{product.title}</div>
                    {product.extras && product.extras.length > 0 && (
                      <div className={styles.extras}>{product.extras.map(e => e.text).join(', ')}</div>
                    )}
                    <div className={styles.price}>
                      {product?.offer ? (
                        <div className={styles.priceContainer}>
                          <span className={styles.oldPrice}>${( (Number(product.price) || 0) / 0.75 ).toFixed(2)}</span>
                          <span className={styles.discountPrice}>${(Number(product.price) || 0).toFixed(2)}</span>
                          <span className={styles.badge}>25% OFF</span>
                        </div>
                      ) : (
                        <>Price: $ {Number(product.price || 0).toFixed(2)}</>
                      )}
                    </div>
                  </div>
                </div>

                <div className={styles.cardRow}>
                  <div className={styles.cardRowRight}>
                    <div className={styles.qtyControlsInline}>
                      <QtyControls
                        quantity={product.quantity}
                        styles={styles}
                        onIncrease={async () => {
                          const amount = 1
                          let newProducts = cart.products.map((p, i) => (i === idx ? { ...p, quantity: (Number(p.quantity) || 0) + amount } : p))
                          newProducts = normalizeCartItems(newProducts)
                          const newSubtotal = computeSubtotal(newProducts)
                          dispatch(updateQuantity({ index: idx, amount }))
                          try {
                            const cartId = typeof window !== 'undefined' ? localStorage.getItem('cartId') : null
                            const res = await axios.post('/api/cart', { items: newProducts, subtotal: newSubtotal, cartId }, { withCredentials: true })
                            if (res?.data && res.data._id) { try { localStorage.setItem('cartId', res.data._id) } catch (e) {} }
                          } catch (e) { console.warn('Failed to persist cart qty change:', e?.message || e) }
                          try { localStorage.setItem('cartItems', JSON.stringify(newProducts)) } catch (e) {}
                        }}
                        onDecrease={async () => {
                          const amount = -1
                          let newProducts = cart.products
                            .map((p, i) => (i === idx ? { ...p, quantity: Math.max(0, (Number(p.quantity) || 0) + amount) } : p))
                            .filter((p) => (Number(p.quantity) || 0) > 0)
                          newProducts = normalizeCartItems(newProducts)
                          const newSubtotal = computeSubtotal(newProducts)
                          dispatch(updateQuantity({ index: idx, amount }))
                          try {
                            const cartId = typeof window !== 'undefined' ? localStorage.getItem('cartId') : null
                            const res = await axios.post('/api/cart', { items: newProducts, subtotal: newSubtotal, cartId }, { withCredentials: true })
                            if (res?.data && res.data._id) { try { localStorage.setItem('cartId', res.data._id) } catch (e) {} }
                          } catch (e) { console.warn('Failed to persist cart qty change:', e?.message || e) }
                          try { localStorage.setItem('cartItems', JSON.stringify(newProducts)) } catch (e) {}
                        }}
                        onRemove={async () => {
                          let newProducts = cart.products.filter((_, i) => i !== idx)
                          newProducts = normalizeCartItems(newProducts)
                          const newSubtotal = computeSubtotal(newProducts)
                          dispatch(removeProduct(idx))
                          try {
                            const cartId = typeof window !== 'undefined' ? localStorage.getItem('cartId') : null
                            const res = await axios.post('/api/cart', { items: newProducts, subtotal: newSubtotal, cartId }, { withCredentials: true })
                            if (res?.data && res.data._id) { try { localStorage.setItem('cartId', res.data._id) } catch (e) {} }
                          } catch (e) { console.warn('Failed to persist cart after remove:', e?.message || e) }
                          try { localStorage.setItem('cartItems', JSON.stringify(newProducts)) } catch (e) {}
                        }}
                      />
                    </div>

                    <div className={styles.total}>Total: $ {(Number(product.price) * Number(product.quantity)).toFixed(2)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {cart.products && cart.products.length > 0 && (
        <div className={styles.right}>
          <div className={styles.wrapper}>
            <h2 className={styles.title}>CART TOTAL</h2>
            <>
              <div className={styles.totalText}>
                <b className={styles.totalTextTitle}>Subtotal:</b> $ {Number(originalTotal || 0).toFixed(2)}
              </div>
              <div className={styles.totalText}>
                <b className={styles.totalTextTitle}>Discount:</b> -$ {Number(discountTotal || 0).toFixed(2)}
              </div>
              <div className={styles.totalText}>
                <b className={styles.totalTextTitle}>Total:</b> $ {Number(subtotalDiscounted || 0).toFixed(2)}
              </div>
            </>
            {open ? (
              <div className={styles.paymentMethods}>
                    <div className={styles.paymentOptions}>
                      <label className={styles.paymentOption}>
                        <input
                          type="radio"
                          name="payment"
                          value="cash"
                          checked={paymentMethod === 'cash'}
                          onChange={() => { setPaymentMethod('cash'); setCash(false) }}
                        />
                        Cash on Delivery
                      </label>
                      <label className={styles.paymentOption}>
                        <input
                          type="radio"
                          name="payment"
                          value="paypal"
                          checked={paymentMethod === 'paypal'}
                          onChange={() => { setPaymentMethod('paypal'); setCash(false) }}
                        />
                        Pay Online (PayPal)
                      </label>
                    </div>

                    <div  style={{ marginTop: 12, display: "flex", justifyContent: "center" }}>
                      {mounted && (
                        <div>
                          <PayPalScriptProvider
                            options={{
                              // Use NEXT_PUBLIC_PAYPAL_CLIENT_ID for client-side access; fallback to 'sb' (sandbox)
                              "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'sb',
                              components: "buttons",
                              currency: "USD",
                              "disable-funding": "credit,card,p24",
                            }}
                          >
                            {paymentMethod === 'paypal' && <ButtonWrapper currency={currency} showSpinner={false} />}
                          </PayPalScriptProvider>
                        </div>
                      )}
                      {/* Render only the selected method's UI */}
                      {paymentMethod === 'cash' && (
                        <button
                          className={styles.payButton}
                          onClick={() => setCash(true)}
                        >
                          Proceed with Cash on Delivery
                        </button>
                      )}
                    </div>
                    {/* PayPal Buttons are rendered by the mounted provider above when paymentMethod === 'paypal'. */}
              </div>
            ) : (
              <button
                onClick={async () => {
                  // try to persist current cart before opening payment methods
                  try {
                    const cartId = typeof window !== 'undefined' ? localStorage.getItem('cartId') : null
                    const res = await axios.post('/api/cart', { items: cart.products, subtotal: cart.total, cartId }, { withCredentials: true })
                    if (res?.data && res.data._id) { try { localStorage.setItem('cartId', res.data._id) } catch (e) {} }
                  } catch (e) {
                    console.warn('Failed to persist cart on checkout click:', e?.message || e)
                  }
                  // default to PayPal when opening the payment panel to avoid transient empty state
                  if (!paymentMethod) setPaymentMethod('paypal')
                  setOpen(true)
                }}
                className={styles.button}
              >
                CHECKOUT NOW!
              </button>
            )}
            {cash && (
              <OrderDetail
                total={cart.total}
                onCancel={() => setCash(false)}
                createOrder={createOrder}
              />
            )}
            <div style={{ marginTop: 12 }}>
              <button
                className={styles.clearBtn}
                onClick={async () => {
                  dispatch(reset());
                  try {
                    const cartId = typeof window !== 'undefined' ? localStorage.getItem('cartId') : null
                    const res = await axios.post('/api/cart', { items: [], subtotal: 0, cartId }, { withCredentials: true })
                    if (res?.data && res.data._id) { try { localStorage.setItem('cartId', res.data._id) } catch (e) {} }
                  } catch (e) {
                    console.warn('Failed to persist cart clear:', e?.message || e);
                  }
                  try { localStorage.removeItem('cartItems'); localStorage.removeItem('cartId') } catch (e) {}
                  router.push('/menus');
                }}
              >
                Clear cart
              </button>
            </div>
          </div>
        </div>
      )}
      {/* {cash && <OrderDetail total={cart.total} createOrder={createOrder} />} */}
    </div>
  );
};

export default Cart;