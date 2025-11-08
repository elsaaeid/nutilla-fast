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
    if (!hasOriginal) {
      item.originalPrice = isOffer ? (Number(item.originalPrice) || (price / 0.75)) : price
    } else {
      item.originalPrice = Number(item.originalPrice) || null
    }
    // ensure offer is boolean
    item.offer = isOffer
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
