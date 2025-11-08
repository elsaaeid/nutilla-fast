import styles from "../styles/Cart.module.css";
import Image from "next/image";
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
import OrderDetail from '../components/OrderDetail'

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  const amount = cart.total;
  const currency = "USD";
  const style = { layout: "vertical" };
  const dispatch = useDispatch();
  const router = useRouter();

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
  const cartId = typeof window !== 'undefined' ? localStorage.getItem('cartId') : null
  const res = await axios.get(`/api/cart${cartId ? `?cartId=${cartId}` : ''}`)
        const data = res.data || {}
        // server returns { items: [...], subtotal } or a serialized cart object with .items
        const items = Array.isArray(data.items) ? data.items : []
        const subtotal = typeof data.subtotal === 'number' ? data.subtotal : Number(data.subtotal) || 0
        if (items.length > 0) {
          dispatch(setCart({ items, subtotal }))
        }
      } catch (e) {
        console.warn('Failed to load server cart:', e?.message || e)
      }
    }
    load()
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
            <button className={styles.browseBtn} onClick={() => router.push('/products')}>
              Browse products
            </button>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr className={styles.trTitle}>
            <th>Product</th>
            <th>Name</th>
            <th>Extras</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.products.map((product, idx) => (
                <tr className={styles.tr} key={product._id || idx}>
                  <td>
                    <div className={styles.imgContainer}>
                      <Image
                        src={product.img}
                        alt={product.title}
                        width={80}
                        height={80}
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  </td>
                  <td>
                    <span className={styles.name}>{product.title}</span>
                  </td>
                  <td>
                    <span className={styles.extras}>
                      {product.extras && product.extras.length > 0
                        ? product.extras.map((e) => e.text).join(', ')
                        : '—'}
                    </span>
                  </td>
                  <td>
                    <span className={styles.price}>${product.price}</span>
                  </td>
                  <td>
                    <div className={styles.qtyControls}>
                      <button
                        className={styles.qtyBtn}
                        onClick={async () => {
                          const amount = -1
                          const newProducts = cart.products
                            .map((p, i) => (i === idx ? { ...p, quantity: Math.max(0, (Number(p.quantity) || 0) + amount) } : p))
                            .filter((p) => (Number(p.quantity) || 0) > 0)
                          const newSubtotal = newProducts.reduce((s, p) => s + (Number(p.price) || 0) * (Number(p.quantity) || 1), 0)
                          // update client state
                          dispatch(updateQuantity({ index: idx, amount }))
                          // persist
                          try {
                            const cartId = typeof window !== 'undefined' ? localStorage.getItem('cartId') : null
                            const res = await axios.post('/api/cart', { items: newProducts, subtotal: newSubtotal, cartId })
                            if (res?.data && res.data._id) { try { localStorage.setItem('cartId', res.data._id) } catch (e) {} }
                          } catch (e) {
                            console.warn('Failed to persist cart qty change:', e?.message || e)
                          }
                          try { localStorage.setItem('cartItems', JSON.stringify(newProducts)) } catch (e) {}
                        }}
                      >
                        -
                      </button>
                      <span className={styles.quantity}>{product.quantity}</span>
                      <button
                        className={styles.qtyBtn}
                        onClick={async () => {
                          const amount = 1
                          const newProducts = cart.products.map((p, i) => (i === idx ? { ...p, quantity: (Number(p.quantity) || 0) + amount } : p))
                          const newSubtotal = newProducts.reduce((s, p) => s + (Number(p.price) || 0) * (Number(p.quantity) || 1), 0)
                          dispatch(updateQuantity({ index: idx, amount }))
                          try {
                            const cartId = typeof window !== 'undefined' ? localStorage.getItem('cartId') : null
                            const res = await axios.post('/api/cart', { items: newProducts, subtotal: newSubtotal, cartId })
                            if (res?.data && res.data._id) { try { localStorage.setItem('cartId', res.data._id) } catch (e) {} }
                          } catch (e) {
                            console.warn('Failed to persist cart qty change:', e?.message || e)
                          }
                        }}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>
                    <span className={styles.total}>${product.price * product.quantity}</span>
                  </td>
                  <td>
                    <button
                      className={styles.removeBtn}
                      onClick={async () => {
                        // compute new products array after removal
                        const newProducts = cart.products.filter((_, i) => i !== idx);
                        const newSubtotal = newProducts.reduce((s, p) => s + p.price * p.quantity, 0);
                        // update client state
                        dispatch(removeProduct(idx));
                        // persist server-side (best-effort) and update local cache
                        try {
                          const cartId = typeof window !== 'undefined' ? localStorage.getItem('cartId') : null
                          const res = await axios.post('/api/cart', { items: newProducts, subtotal: newSubtotal, cartId })
                          if (res?.data && res.data._id) { try { localStorage.setItem('cartId', res.data._id) } catch (e) {} }
                        } catch (e) {
                          console.warn('Failed to persist cart after remove:', e?.message || e);
                        }
                        try { localStorage.setItem('cartItems', JSON.stringify(newProducts)) } catch (e) {}
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {cart.products && cart.products.length > 0 && (
        <div className={styles.right}>
          <div className={styles.wrapper}>
            <h2 className={styles.title}>CART TOTAL</h2>
            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Subtotal:</b>${cart.total}
            </div>
            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Discount:</b>$0.00
            </div>
            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Total:</b>${cart.total}
            </div>
            {open ? (
              <div className={styles.paymentMethods}>
                <button
                  className={styles.payButton}
                  onClick={() => setCash(true)}
                >
                  CASH ON DELIVERY
                </button>
                <PayPalScriptProvider
                  options={{
                    // Use NEXT_PUBLIC_PAYPAL_CLIENT_ID for client-side access; fallback to 'sb' (sandbox)
                    "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'sb',
                    components: "buttons",
                    currency: "USD",
                    "disable-funding": "credit,card,p24",
                  }}
                >
                  <ButtonWrapper currency={currency} showSpinner={false} />
                </PayPalScriptProvider>
              </div>
            ) : (
              <button
                onClick={async () => {
                  // try to persist current cart before opening payment methods
                  try {
                    const cartId = typeof window !== 'undefined' ? localStorage.getItem('cartId') : null
                    const res = await axios.post('/api/cart', { items: cart.products, subtotal: cart.total, cartId })
                    if (res?.data && res.data._id) { try { localStorage.setItem('cartId', res.data._id) } catch (e) {} }
                  } catch (e) {
                    console.warn('Failed to persist cart on checkout click:', e?.message || e)
                  }
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
                    const res = await axios.post('/api/cart', { items: [], subtotal: 0, cartId })
                    if (res?.data && res.data._id) { try { localStorage.setItem('cartId', res.data._id) } catch (e) {} }
                  } catch (e) {
                    console.warn('Failed to persist cart clear:', e?.message || e);
                  }
                  try { localStorage.removeItem('cartItems'); localStorage.removeItem('cartId') } catch (e) {}
                  router.push('/products');
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