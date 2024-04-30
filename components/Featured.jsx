import styles from "../styles/Featured.module.css";
import React, { useState } from 'react';
import Image from "next/image";

const Featured = () => {
    const [index,setIndex] = useState(0)
    const images = [
    "/img/product1.png",
    "/img/product2.png",
    "/img/product3.png",
    ];
  const handleArrow = (direction) =>{
      if (direction==="l") {
          setIndex(index !== 0 ? index-1 : 2)
      }
      if (direction==="r") {
        setIndex(index !== 2 ? index+1 : 0)
    }
  }
  return (
    <div className={styles.container}>
        <div className={styles.arrowContainer} style={{ left:0 }} onClick={()=>handleArrow("l")}>
            <Image src="/img/arrowl.png" alt="arrow" width="30" height="30" layout="fill" />
        </div>
        <div className={styles.wrapper} style={{transform:`translateX(${-100*index}vw)`}}>
                {images.map((img, id) => (
                <div className={styles.imgContainer} key={id}>
                    <img src={img} alt="" layout="fill" />
                </div>
                ))}
        </div>
        <div className={styles.arrowContainer} style={{ right:0 }} onClick={()=>handleArrow("r")}>
            <Image src="/img/arrowr.png" alt="arrow" width="30" height="30" layout="fill" />
        </div>
    </div>
  )
}

export default Featured