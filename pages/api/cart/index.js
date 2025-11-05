import dbConnect from '../../../util/mongo'
import Cart from '../../../models/Cart'
import mongoose from 'mongoose'

// Dev/Prod: simple cart persistence APIs
export default async function handler(req, res) {
  const { method } = req
  const token = req.cookies?.token

  try {
    await dbConnect()

    // resolve user id from token (dev: token === userId, admin token is env TOKEN)
    let userId = null
    if (token && token !== process.env.TOKEN) userId = token

    if (method === 'GET') {
      // allow fetching by cartId (anonymous carts) or by logged-in user
      const { cartId } = req.query || {}
      if (cartId) {
        if (!mongoose.Types.ObjectId.isValid(cartId)) return res.status(400).json({ message: 'invalid cartId' })
        const cart = await Cart.findById(cartId).lean()
        if (!cart) return res.status(200).json({ items: [], subtotal: 0 })
        const serialized = {
          ...cart,
          _id: String(cart._id),
          user: cart.user ? String(cart.user) : null,
          createdAt: cart.createdAt ? cart.createdAt.toISOString() : null,
          updatedAt: cart.updatedAt ? cart.updatedAt.toISOString() : null,
        }
        return res.status(200).json(serialized)
      }

      if (!userId) return res.status(200).json({ items: [], subtotal: 0 })
      const cart = await Cart.findOne({ user: userId }).lean()
      if (!cart) return res.status(200).json({ items: [], subtotal: 0 })
      // serialize
      const serialized = {
        ...cart,
        _id: String(cart._id),
        user: cart.user ? String(cart.user) : null,
        createdAt: cart.createdAt ? cart.createdAt.toISOString() : null,
        updatedAt: cart.updatedAt ? cart.updatedAt.toISOString() : null,
      }
      return res.status(200).json(serialized)
    }

    if (method === 'POST') {
      let { items, subtotal } = req.body || {}

      // accept a non-array (single item) by coercing to array; keep empty array allowed
      if (!Array.isArray(items) && items != null) {
        items = [items]
      }

      if (items != null && !Array.isArray(items)) {
        return res.status(400).json({ message: 'items must be an array or null' })
      }

      // helper: normalize extras (ensure predictable order) and items
      const normalizeExtras = (rawExtras) => {
        const arr = Array.isArray(rawExtras) ? rawExtras : []
        const cleaned = arr.map((e) => ({ text: (e?.text || e?.name || '').trim(), price: Number(e?.price) || 0 }))
        // sort to make equality order-insensitive
        cleaned.sort((a, b) => a.text.localeCompare(b.text) || a.price - b.price)
        return cleaned
      }

      const normalized = Array.isArray(items)
        ? items.map((it) => {
            const extras = normalizeExtras(it.extras)

            // productId: prefer _id or productId, only keep if valid ObjectId-like string
            let productId = it._id || it.productId || null
            if (productId && typeof productId === 'string' && mongoose.Types.ObjectId.isValid(productId)) {
              productId = mongoose.Types.ObjectId(productId)
            } else {
              productId = null
            }

            return {
              productId,
              title: (it.title || it.name || '').trim(),
              img: it.img || it.image || '',
              price: Number(it.price) || 0,
              quantity: Number(it.quantity) || 1,
              extras,
            }
          })
        : []

      // If subtotal not provided, compute it from normalized items
      subtotal = Number(subtotal) || normalized.reduce((s, p) => s + (Number(p.price) || 0) * (Number(p.quantity) || 1), 0)

      // Find or create cart
      let cart
      try {
        const { cartId } = req.body || {}
        if (cartId && mongoose.Types.ObjectId.isValid(cartId)) {
          // update existing anonymous cart by id
          cart = await Cart.findById(cartId)
          if (!cart) {
            cart = new Cart({ items: normalized, subtotal })
          } else {
            cart.items = normalized
            cart.subtotal = subtotal
            cart.updatedAt = new Date()
          }
        } else if (userId) {
          cart = await Cart.findOne({ user: userId })
          if (!cart) {
            // no existing user cart: create one from normalized items
            cart = new Cart({ user: userId, items: normalized, subtotal })
          } else {
            // merge semantics: instead of overwriting, merge incoming normalized items into existing cart
            if (Array.isArray(normalized) && normalized.length > 0) {
              // build a map of existing items by a stable key
              const itemKey = (it) => {
                const pid = it.productId ? String(it.productId) : null
                const extrasKey = Array.isArray(it.extras) ? JSON.stringify(it.extras) : '[]'
                if (pid) return `pid:${pid}`
                return `anon:${(it.title || '')}|${Number(it.price) || 0}|${extrasKey}`
              }

              const existing = Array.isArray(cart.items) ? cart.items.slice() : []
              const map = new Map()
              existing.forEach((ex) => {
                const key = itemKey(ex)
                map.set(key, { ...ex })
              })

              normalized.forEach((inc) => {
                const key = itemKey(inc)
                const found = map.get(key)
                if (found) {
                  // sum quantities and prefer incoming price/title/img
                  found.quantity = (Number(found.quantity) || 0) + (Number(inc.quantity) || 0)
                  found.price = Number(inc.price) || Number(found.price) || 0
                  found.title = inc.title || found.title
                  found.img = inc.img || found.img
                  found.extras = inc.extras || found.extras
                  map.set(key, found)
                } else {
                  map.set(key, { ...inc })
                }
              })

              // replace cart.items with merged array
              cart.items = Array.from(map.values())
            } else {
              // if incoming items empty array, interpret as clearing the cart
              cart.items = []
            }

            // recompute subtotal from resulting items
            cart.subtotal = Array.isArray(cart.items)
              ? cart.items.reduce((s, p) => s + (Number(p.price) || 0) * (Number(p.quantity) || 1), 0)
              : 0
            cart.updatedAt = new Date()
          }
        } else {
          // anonymous cart: create one-off cart record (no user)
          cart = new Cart({ items: normalized, subtotal })
        }

        const saved = await cart.save()
        const out = {
          ...saved.toObject(),
          _id: String(saved._id),
          user: saved.user ? String(saved.user) : null,
          createdAt: saved.createdAt ? saved.createdAt.toISOString() : null,
          updatedAt: saved.updatedAt ? saved.updatedAt.toISOString() : null,
        }
        return res.status(201).json(out)
      } catch (saveErr) {
        console.error('/api/cart save error:', saveErr)
        // Return validation details if available
        if (saveErr && saveErr.errors) {
          const details = Object.keys(saveErr.errors).reduce((acc, k) => {
            acc[k] = saveErr.errors[k].message
            return acc
          }, {})
          return res.status(400).json({ message: 'Validation failed', details })
        }
        return res.status(500).json({ message: saveErr.message || String(saveErr) })
      }
    }

    res.setHeader('Allow', ['GET', 'POST'])
    return res.status(405).end(`Method ${method} Not Allowed`)
  } catch (err) {
    console.error('/api/cart error:', err)
    return res.status(500).json({ message: err.message || String(err) })
  }
}
