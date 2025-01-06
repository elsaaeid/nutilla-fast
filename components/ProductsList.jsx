import styles from "../styles/NutillaList.module.css";
import React from 'react'
import ProductCard from "./ProductCard";




const ProductsList = ({productsList}) => {
  return(
    <div className={styles.container}>
    <h1 className={styles.title}>Half Moon</h1>
    <p className={styles.desc}>Rounded waffle with nutella sauce</p>
      <div className={styles.wrapper}>
        {productsList.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}
 
  
export default ProductsList