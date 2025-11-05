import { serialize } from 'cookie'

export default function handler(req, res) {
  // Accept GET or POST to logout
  const cookie = serialize('token', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
  })

  res.setHeader('Set-Cookie', cookie)
  res.status(200).json({ ok: true })
}
