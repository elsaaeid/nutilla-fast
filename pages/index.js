import Head from "next/head";
import { useState } from "react";
import Add from "../components/Add";
import AddButton from "../components/AddButton";
import Featured from "../components/Featured";
import ProductsList from "../components/ProductsList";
import styles from "../styles/Home.module.css";

export default function Home({ productsList }) {
  const [close, setClose] = useState(true);
  return (
    <div className={styles.container}>
      <Head>
        <title>nutella Restaurant</title>
        <meta name="description" content="Best nutella shop in town" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <Featured />
      {<AddButton setClose={setClose} />}
      <ProductsList productsList={productsList} />
      {!close && <Add setClose={setClose} />}
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }
  try {
    // Query the database directly on the server to avoid making an HTTP request
  const dbConnect = require("../util/mongo").default || require("../util/mongo");
  const Product = (require("../models/Product").default || require("../models/Product"));
    await dbConnect();
    const products = await Product.find().lean();
    // Make sure documents are JSON-serializable (convert ObjectId and Date fields)
    const productsList = products.map((p) => {
      return {
        ...p,
        _id: String(p._id),
        createdAt: p.createdAt ? p.createdAt.toISOString() : null,
        updatedAt: p.updatedAt ? p.updatedAt.toISOString() : null,
      }
    });
    return { props: { productsList } };
  } catch (error) {
    console.error("Error fetching products in getServerSideProps:", error.message || error);
    return { props: { productsList: [] } };
  }
};

