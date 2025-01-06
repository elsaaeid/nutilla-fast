import React from 'react'
import styles from "../styles/ProductCard.module.css";
import Image from 'next/image';
import Link from 'next/link';


const ProductCard = ({ product }) => {
  return(
    <div className={styles.container}>
      <div className={styles.imgContainer}>
      <Link href={`/product/${product._id}`} as={`/product/${product._id}`} passHref>
          <Image src={product.img} alt="" layout="fill" width="150" height="150" />
      </Link>
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>{product.title}</h1>
        <span className={styles.price}>${product.price}</span>
        <p className={styles.desc}>{product.desc}</p>
        </div>
    </div>
  );
;}

export default ProductCard