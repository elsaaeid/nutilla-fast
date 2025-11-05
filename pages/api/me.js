import { parse } from 'cookie'
import dbConnect from '../../util/mongo'
import User from '../../models/User'
import bcrypt from 'bcryptjs'

export default async function handler(req, res) {
  try {
    const cookies = req.headers.cookie
    // If there are no cookies or no token, return 200 with null body so client code
    // can treat this as "no user" without a network error in devtools.
    if (!cookies) return res.status(200).json(null)
  const parsed = parse(cookies || '')
  const token = parsed.token
    if (!token) return res.status(200).json(null)

    // admin token
    if (token === process.env.TOKEN) {
      // GET: return admin hint; PUT: not allowed
      if (req.method === 'PUT') return res.status(403).json({ message: 'Cannot modify admin via this endpoint' })
      return res.status(200).json({ role: 'admin', email: process.env.ADMIN_USERNAME })
    }

    // otherwise token is user id (dev behavior)
    await dbConnect()
    // Handle update (PUT)
    if (req.method === 'PUT') {
      const { name, phone, password } = req.body || {}
      const updates = {}
      if (name) updates.name = name
      if (phone) updates.phone = phone
      if (password) {
        const salt = await bcrypt.genSalt(10)
        updates.password = await bcrypt.hash(password, salt)
      }
      const updated = await User.findByIdAndUpdate(token, updates, { new: true }).select('-password')
      if (!updated) return res.status(404).json({ message: 'User not found' })
      return res.status(200).json(updated)
    }

    const user = await User.findById(token).select('-password')
    if (!user) return res.status(200).json(null)
    return res.status(200).json(user)
  } catch (err) {
    console.error('api/me error:', err)
    return res.status(500).json({ message: 'Server error' })
  }
}
