import dbConnect from "../../../util/mongo";
import Product from "../../../models/Product";
import User from "../../../models/User";

export default async function handler(req, res) {
  const { method, cookies } = req;

  const token = cookies.token

  if (method === "GET") {
    try {
      await dbConnect();
      const products = await Product.find();
      res.status(200).json(products);
    } catch (err) {
      console.error('GET /api/products error:', err.message || err);
      res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
    return
  }

  if (method === "POST") {
    try {
      // Allow creation if token matches env admin token OR token belongs to a user with role 'admin'
      if (!token) return res.status(401).json({ message: 'Not authenticated' })
      await dbConnect();
      let allowed = false
      if (token === process.env.TOKEN) {
        allowed = true
      } else {
        // token is a user id in development flow
        const user = await User.findById(token).select('role')
        if (user && user.role === 'admin') allowed = true
      }
      if (!allowed) return res.status(403).json({ message: 'Forbidden' })

      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (err) {
      console.error('POST /api/products error:', err.message || err);
      res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
    return
  }
}