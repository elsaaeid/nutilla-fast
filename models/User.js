import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  role: { type: String, default: 'buyer' },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
}, { timestamps: true })

// Avoid model overwrite issues in dev/hot-reload
export default mongoose.models.User || mongoose.model('User', UserSchema)
