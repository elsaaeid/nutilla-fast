import styles from "../styles/NutillaList.module.css";
import React from 'react'
import ProductCard from "./ProductCard";




const ProductsList = ({ productsList = [] }) => {
  // Defensive rendering and helpful debug output when no products are present.
  const hasProducts = Array.isArray(productsList) && productsList.length > 0

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Half Moon</h1>
      <p className={styles.desc}>Rounded waffle with nutella sauce</p>

      {!hasProducts ? (
        <div style={{ padding: 24 }}>
          <strong>No products to show.</strong>
          <div style={{ marginTop: 12 }}>
            This usually means the server did not return product data. For debugging, here is what the
            component received:
          </div>
          <pre style={{ whiteSpace: 'pre-wrap', marginTop: 12, background: '#f6f6f6', padding: 12 }}>
            {JSON.stringify(productsList, null, 2)}
          </pre>
        </div>
      ) : (
        <div className={styles.wrapper}>
          {productsList.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
 
  
export default ProductsList