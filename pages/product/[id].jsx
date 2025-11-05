import styles from "../../styles/Product.module.css";
import style from "../../styles/global.module.css";
import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/cartSlice";
import axios from 'axios'


const Product = ({product}) => {
  const [price, setPrice] = useState(Array.isArray(product?.price) ? product.price[0] : (product?.price || 0));
  const [quantity, setQuantity] = useState(1);
  const [extras, setExtras] = useState([]);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart)

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

  const handleClick = () => {
    const item = { ...product, extras, price: Number(price) || 0, quantity: Number(quantity) || 1 }
    dispatch(addProduct(item));
    // persist updated cart (best-effort)
    try {
      const existing = (cart && Array.isArray(cart.products)) ? cart.products : []
      const newProducts = [...existing, item]
      const subtotal = newProducts.reduce((s, p) => s + (Number(p.price) || 0) * (Number(p.quantity) || 1), 0)
      const cartId = typeof window !== 'undefined' ? localStorage.getItem('cartId') : null
      axios.post('/api/cart', { items: newProducts, subtotal, cartId })
        .then((res) => { if (res?.data && res.data._id) { try { localStorage.setItem('cartId', res.data._id) } catch (e) {} } })
        .catch((e) => console.warn('persist cart fail', e?.message || e))
      try { localStorage.setItem('cartItems', JSON.stringify(newProducts)) } catch (e) {}
    } catch (e) {
      const cartId = typeof window !== 'undefined' ? localStorage.getItem('cartId') : null
      axios.post('/api/cart', { items: item, cartId }).then((res) => { if (res?.data && res.data._id) { try { localStorage.setItem('cartId', res.data._id) } catch (err) {} } }).catch((err) => console.warn('persist cart fail', err?.message || err))
      try {
        const existing = (cart && Array.isArray(cart.products)) ? cart.products : []
        const newItems = [...existing, item]
        localStorage.setItem('cartItems', JSON.stringify(newItems))
      } catch (err) {}
    }
  };

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
        <span className={styles.price}>${Array.isArray(product.price) ? product.price[0] : product.price}</span>
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
          <input
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
            defaultValue={1}
            className={styles.quantity}
          />
          <button className={style.button} onClick={handleClick}>
            Add to Cart
          </button>
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
    };
    return { props: { product: serialized } };
  } catch (err) {
    console.error('Error in product getServerSideProps:', err.message || err);
    return { props: { product: null } };
  }
};

export default Product;