import React from "react";
import styles from "../styles/Announcement.module.css"
import { FiPhone } from 'react-icons/fi'


const Announcement = () => {
 return(
  <div className={styles.container}>
    <span>Super deal!</span>
    <div className={styles.item}>
         {/* tel: link so tapping on mobile opens the dialer */}
         <a className={styles.phoneLink} href={`tel:${phone}`}>
           <FiPhone className={styles.phoneIcon} aria-hidden="true" />
           <span className={styles.text}>{phone}</span>
         </a>
    </div>
  </div>
)
}
 const phone = "+1 (234) 567-8901";
export default Announcement;
