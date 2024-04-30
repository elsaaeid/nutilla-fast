import React from 'react'
import styles from "../styles/NutillaCard.module.css";
import Image from 'next/image';
import Link from 'next/link';


const NutillaCard = ({ nutilla }) => {
  return(
    <div className={styles.container}>
      <div className={styles.imgContainer}>
      <Link href={`/product/${nutilla._id}`} as={`/product/${nutilla._id}`} passHref>
          <Image src={nutilla.img} alt="" layout="fill" width="150" height="150" />
      </Link>
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>{nutilla.title}</h1>
        <span className={styles.price}>${nutilla.price}</span>
        <p className={styles.desc}>{nutilla.desc}</p>
        </div>
    </div>
  );
;}

export default NutillaCard