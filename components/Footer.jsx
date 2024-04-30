import Image from 'next/image';
import React from 'react'
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src="/img/product9.png" width="500" height="500" layout="fill" alt=''/>
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.nutilla}>
            OH YES, WE DID. NUTILLA CHEFS, WELL HOT READY NUTILLA FROM NUTILLA FAST.
          </h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>FIND OUR RESTAURANTS</h1>
          <p className={styles.text}>
            Al-Teraa Street
             <br /> in front of Toshka Gate
             <br />University neighborhood
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>WORKING HOURS</h1>
          <p className={styles.text}>
             ALL DAYS OF THE WEEK
             <br /> 11:00 PM - 12:00 AM
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer