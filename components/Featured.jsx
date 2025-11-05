import styles from "../styles/Featured.module.css";
import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Image from "next/image";

const Featured = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    { src: "/img/product1.png", title: "Molten Chocolate Cake", subtitle: "Warm, gooey center" },
    { src: "/img/product2.png", title: "Half Moon Waffle", subtitle: "Rounded waffle with nutella" },
    { src: "/img/product3.png", title: "Strawberry Delight", subtitle: "Fresh strawberries & cream" },
  ];

  const handlePrev = () =>
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const handleNext = () =>
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div className={styles.container}>
      <button
        className={`${styles.arrowContainer} ${styles.left}`}
        aria-label="Previous slide"
        onClick={handlePrev}
      >
        <FiChevronLeft size={28} />
      </button>

      <div
        className={styles.wrapper}
        style={{ transform: `translateX(${-100 * currentIndex}%)` }}
      >
        {images.map((item, id) => (
          <div className={styles.imgContainer} key={id}>
            <Image
              src={item.src}
              alt={item.title || `product-${id}`}
              fill
              className={styles.productImg}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className={styles.overlay}>
              <h2 className={styles.title}>{item.title}</h2>
              {item.subtitle && <p className={styles.subtitle}>{item.subtitle}</p>}
            </div>
          </div>
        ))}
      </div>

      <button
        className={`${styles.arrowContainer} ${styles.right}`}
        aria-label="Next slide"
        onClick={handleNext}
      >
        <FiChevronRight size={28} />
      </button>
    </div>
  );
};

export default Featured;
