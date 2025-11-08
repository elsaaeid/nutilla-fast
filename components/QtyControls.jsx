import React from 'react'
import { FiPlus, FiMinus, FiTrash } from 'react-icons/fi'

const QtyControls = ({ quantity = 1, onIncrease, onDecrease, onRemove, styles = {} }) => {
  // styles may be a CSS module or a plain object; fall back to sensible names
  const cls = (name) => {
    if (!styles) return name
    // prefer module-specific variants
    if (name === 'quantity') return styles.qtyNumber || styles.quantity || name
    return styles[name] || name
  }

  const q = Number(quantity) || 1

  if (q === 1) {
    return (
      <div className={cls('qtyControlsInline')}>
        <span className={cls('quantity')}>{q}</span>
        <button className={cls('qtyBtn')} onClick={onIncrease} aria-label="Increase">
          <FiPlus />
        </button>
        <button className={cls('removeBtn')} onClick={onRemove} aria-label="Remove">
          <FiTrash />
        </button>
      </div>
    )
  }

  return (
    <div className={cls('qtyControlsInline')}>
      <button className={cls('qtyBtn')} onClick={onDecrease} aria-label="Decrease">
        <FiMinus />
      </button>
      <span className={cls('quantity')}>{q}</span>
      <button className={cls('qtyBtn')} onClick={onIncrease} aria-label="Increase">
        <FiPlus />
      </button>
    </div>
  )
}

export default QtyControls
