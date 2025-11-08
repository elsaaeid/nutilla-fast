import ProductsList from "../../components/ProductsList";
import styles from "../../styles/Home.module.css";

export default function Menus({ productsList }) {
  return (
    <div className={styles.container}>
      <ProductsList 
        productsList={productsList} 
        productTitle="Our Nutella Delights Menu"
        productDesc="Discover our delicious range of Nutella-based treats, each crafted with the finest ingredients."
      />
  </div>
  );
}

export const getServerSideProps = async (ctx) => {
  // Import axios at runtime inside the server-side function to avoid making
  // the module an async module (which can trigger webpack to emit async
  // wrappers that the dev runtime may not support in some setups).
  try {
  const dbConnect = require("../../util/mongo").default || require("../../util/mongo");
  const Product = (require("../../models/Product").default || require("../../models/Product"));
    await dbConnect();
    const products = await Product.find().lean();
    const productsList = products.map((p) => ({
      ...p,
      _id: String(p._id),
      createdAt: p.createdAt ? p.createdAt.toISOString() : null,
      updatedAt: p.updatedAt ? p.updatedAt.toISOString() : null,
    }));
    return { props: { productsList } };
  } catch (error) {
    console.error("Error fetching products in /products getServerSideProps:", error.message || error);
    return { props: { productsList: [] } };
  }
};
