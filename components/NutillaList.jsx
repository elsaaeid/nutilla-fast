import styles from "../styles/NutillaList.module.css";
import React from 'react'
import NutillaCard from "./NutillaCard";




const NutillaList = ({nutillaList}) => {
  return(
    <div className={styles.container}>
    <h1 className={styles.title}>Half Moon</h1>
    <p className={styles.desc}>Rounded waffle with nutella sauce</p>
      <div className={styles.wrapper}>
        {nutillaList.map((nutilla) => (
          <NutillaCard key={nutilla._id} nutilla={nutilla} />
        ))}
      </div>
    </div>
  )
}
 
  
export default NutillaList