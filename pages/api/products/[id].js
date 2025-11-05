import dbConnect from "../../../util/mongo";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
    cookies
  } = req;
  const token = cookies.token

  dbConnect();

  if (method === "GET") {
    try {
      const product = await Product.findById(id);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "PUT") {
    try {
      // Allow update if token matches env admin token OR token belongs to a user with role 'admin'
      if (!token) return res.status(401).json({ message: 'Not authenticated' })
      await dbConnect()
      let allowed = false
      if (token === process.env.TOKEN) {
        allowed = true
      } else {
        const User = await import('../../../models/User').then(m => m.default)
        const user = await User.findById(token).select('role')
        if (user && user.role === 'admin') allowed = true
      }
      if (!allowed) return res.status(403).json({ message: 'Forbidden' })

      const product = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "DELETE") {
    try {
      // Allow delete if token matches env admin token OR token belongs to a user with role 'admin'
      if (!token) return res.status(401).json({ message: 'Not authenticated' })
      await dbConnect()
      let allowed = false
      if (token === process.env.TOKEN) {
        allowed = true
      } else {
        const User = await import('../../../models/User').then(m => m.default)
        const user = await User.findById(token).select('role')
        if (user && user.role === 'admin') allowed = true
      }
      if (!allowed) return res.status(403).json({ message: 'Forbidden' })

      await Product.findByIdAndDelete(id);
      res.status(200).json("The product has been deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  }
}