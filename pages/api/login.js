import { serialize } from 'cookie'
import dbConnect from '../../util/mongo'
import User from '../../models/User'
import bcrypt from 'bcryptjs'

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { username, password } = req.body || {}
  if (!username || !password) return res.status(400).json({ message: 'Missing credentials' })

  // Admin quick check using env vars
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    res.setHeader('Set-Cookie', serialize('token', process.env.TOKEN, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
    }))
    return res.status(200).json('Successful')
  }

  try {
    await dbConnect()
    const user = await User.findOne({ email: username.toLowerCase() })
    if (!user) return res.status(401).json({ message: 'Invalid credentials' })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(401).json({ message: 'Invalid credentials' })

    // Set a simple cookie with the user id as token (development). Replace with JWT/session in production.
    res.setHeader('Set-Cookie', serialize('token', String(user._id), {
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
    }))

    return res.status(200).json({ message: 'Logged in' })
  } catch (err) {
    console.error('login error:', err)
    return res.status(500).json({ message: 'Server error' })
  }
}

export default handler