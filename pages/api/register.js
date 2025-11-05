import dbConnect from '../../util/mongo'
import User from '../../models/User'
import bcrypt from 'bcryptjs'

// DB-backed registration API
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` })
  }
  const { name, email, phone, password } = req.body || {}
  if (!name || !email || !phone || !password) {
    return res.status(400).json({ message: 'Missing required fields' })
  }
  try {
    await dbConnect()

    // check existing user
    const existing = await User.findOne({ email: email.toLowerCase() })
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' })
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)

    const user = new User({
      name,
      email: email.toLowerCase(),
      phone,
      password: hashed,
      isVerified: false,
    })

    await user.save()

    // In a full implementation you would send a verification email here.
    return res.status(201).json({ message: 'User created', email: user.email })
  } catch (err) {
    console.error('register error:', err)
    return res.status(500).json({ message: 'Server error' })
  }
}
