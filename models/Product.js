import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    img: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxlength: 60,
    },
    price: {
      type: [Number],
      required: true,
    },
    desc: {
      type: String,
      required: true,
      maxlength: 200,
    }
    ,
    offer: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);