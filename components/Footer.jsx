import Image from 'next/image';
import React from 'react'
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Image src="/img/product9.png" width="500" height="500" layout="fill" alt=''/>
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.nutilla}>
            OH YES, WE DID. NUTILLA CHEFS, WELL HOT READY NUTILLA FROM NUTILLA FAST.
          </h2>
        </div>
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <h1 className={styles.title}>FIND OUR RESTAURANTS</h1>
            <p className={styles.text}>
              1654 R. Don Road <span className={styles.highlight}></span>.
              <br /> NewYork, 85022
              <br /> (602) 867-1010
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
    </div>
  )
}

export default Footer