import { useState } from "react";
import styles from "../styles/Add.module.css";
import axios from "axios";
import { WithRole } from "../protect/AuthGate";

const Add = ({ setClose }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [prices, setPrices] = useState([]);
  const [extraOptions, setExtraOptions] = useState([]);
  const [extra, setExtra] = useState(null);
  const [offer, setOffer] = useState(false);

  const changePrice = (e, index) => {
    const currentPrices = [...prices];
    currentPrices[index] = Number(e.target.value);
    setPrices(currentPrices);
  };

  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };

  const handleExtra = (e) => {
    setExtraOptions((prev) => [...prev, extra]);
  };

  const handleCreate = async () => {
    if (!file) {
      alert("Please choose a file before creating the product.");
      return;
    }

    const data = new FormData();
    data.append("file", file);
    // cloud name and preset provided by user
    data.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
    data.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
    try {
      const uploadRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        data
      );

      const { url } = uploadRes.data;
      const newProduct = {
        title,
        desc,
        // Product schema expects `price` (array). Send the collected prices as `price`.
        price: prices,
        // extraOptions is not part of the minimal Product schema; include it anyway
        // but server's schema may ignore unknown fields. Keep it for future schema updates.
        extraOptions,
        img: url,
        offer,
      };

  // use a relative path so the browser will include same-origin cookies
  // (absolute URLs can be treated as cross-origin and won't send cookies by default)
  await axios.post("/api/products", newProduct);
      setClose(true);
    } catch (err) {
      // Show more useful error details to help diagnose a 400 from Cloudinary
      console.error("Upload error:", err);
      if (err.response && err.response.data) {
        console.error("Cloudinary response data:", err.response.data);
        alert(`Upload failed: ${err.response.data.error?.message || JSON.stringify(err.response.data)}`);
      } else {
        alert(`Upload failed: ${err.message}`);
      }
    }
  };

  return (
    <WithRole roles={["admin"]}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
        <span onClick={() => setClose(true)} className={styles.close}>
          X
        </span>
        <h1>Add a new nutella</h1>
        <div className={styles.item}>
          <label className={styles.label}>Choose an image</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Title</label>
          <input
            className={styles.input}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Desc</label>
          <textarea
            rows={4}
            type="text"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Prices</label>
          <div className={styles.priceContainer}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Small"
              onChange={(e) => changePrice(e, 0)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Medium"
              onChange={(e) => changePrice(e, 1)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Large"
              onChange={(e) => changePrice(e, 2)}
            />
          </div>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Extra</label>
          <div className={styles.extra}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="text"
              placeholder="Item"
              name="text"
              onChange={handleExtraInput}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Price"
              name="price"
              onChange={handleExtraInput}
            />
            <button className={styles.extraButton} onClick={handleExtra}>
              Add
            </button>
          </div>
          <div className={styles.extraItems}>
            {extraOptions.map((option, idx) => (
              <span key={option?.text ? `${option.text.replaceAll(' ', '_')}-${idx}` : `extra-${idx}`} className={styles.extraItem}>
                {option.text}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.item}>
          <label className={styles.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input type="checkbox" checked={offer} onChange={(e) => setOffer(e.target.checked)} />
            <span style={{ marginLeft: 6 }}>Mark as offer</span>
          </label>
        </div>
        <button className={styles.addButton} onClick={handleCreate}>
          Create
        </button>
        </div>
      </div>
    </WithRole>
  );
};

export default Add;