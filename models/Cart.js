import mongoose from 'mongoose'

const ExtraSchema = new mongoose.Schema({
  text: { type: String },
  price: { type: Number },
}, { _id: false })

const CartItemSchema = new mongoose.Schema({
  // productId may be absent for anonymous/temporary items; keep it optional
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: false },
  title: { type: String },
  img: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
  extras: { type: [ExtraSchema], default: [] },
}, { _id: false })

const CartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  items: { type: [CartItemSchema], default: [] },
  subtotal: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { timestamps: true })

// Keep model re-use across hot-reloads in dev
export default mongoose.models.Cart || mongoose.model('Cart', CartSchema)
