export function normalizeCartItems(items = []) {
  if (!Array.isArray(items)) return []
  return items.map((it) => {
    const item = { ...it }
    // parse offer flag robustly
    const parseOffer = (v) => {
      if (typeof v === 'boolean') return v
      if (typeof v === 'string') return ['true','1','yes'].includes(v.toLowerCase().trim())
      if (typeof v === 'number') return v === 1
      return false
    }
    const price = Number(item.price) || 0
    const hasOriginal = typeof item.originalPrice !== 'undefined' && item.originalPrice !== null && item.originalPrice !== ''
    const isOffer = parseOffer(item.offer)

    // Normalize originalPrice and price for offer items so discount calculations are correct
    if (isOffer) {
      // Determine original price: prefer provided originalPrice, otherwise derive from price
      const orig = hasOriginal ? Number(item.originalPrice) : (price / 0.75)
      item.originalPrice = Number(orig) || null
      // Determine discounted price: prefer provided price if it's clearly smaller than original,
      // otherwise compute it as 25% off the original.
      const incomingPrice = Number(item.price) || 0
      const discountedFromOrig = Math.round((Number(item.originalPrice) || orig) * 0.75 * 100) / 100
      if (!incomingPrice || incomingPrice >= (Number(item.originalPrice) || orig) - 1e-6) {
        item.price = discountedFromOrig
      } else {
        item.price = incomingPrice
      }
    } else {
      // Not an offer: ensure originalPrice is present (falls back to price)
      item.originalPrice = hasOriginal ? Number(item.originalPrice) || null : price
      item.price = price
    }
  // if item lacks an explicit offer flag but originalPrice is larger than price,
  // infer this is an offer (helps anonymous/local carts where only one field was saved)
  const inferredOffer = (!isOffer && hasOriginal && Number(item.originalPrice) > (Number(item.price) || 0) + 1e-6)
  item.offer = !!(isOffer || inferredOffer)
    // coerce numeric fields
    item.price = Number(item.price) || 0
    item.quantity = Number(item.quantity) || 1
    // ensure a stable cart item id so UI can key and update items reliably
    if (!item.cartItemId) {
      // prefer existing productId/_id to keep stability, fall back to random+timestamp
      const baseId = item.productId || item._id || (item.title || '').replace(/\s+/g, '_') || Math.random().toString(36).slice(2)
      item.cartItemId = `${String(baseId)}-${Date.now()}-${Math.random().toString(36).slice(2,8)}`
    }
    return item
  })
}

export function computeSubtotal(items = []) {
  if (!Array.isArray(items)) return 0
  return items.reduce((s, p) => s + (Number(p.price) || 0) * (Number(p.quantity) || 1), 0)
}
