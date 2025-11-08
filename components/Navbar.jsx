import styles from "../styles/Navbar.module.css";
import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
import { FiMenu, FiX, FiShoppingCart } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { ShowOnLogout, ShowOnLogin, useCurrentUser } from '../protect/AuthGate';
import { FiUser } from 'react-icons/fi';
import Announcement from './Announcement';


const Navbar = () => {
  const [open, setOpen] = useState(false)

  const handleToggle = () => setOpen((s) => !s)
  const quantityFromStore = useSelector((state) => {
    const prods = (state.cart && Array.isArray(state.cart.products)) ? state.cart.products : []
    return prods.reduce((sum, p) => sum + (Number(p.quantity) || 0), 0)
  })

  // Keep a client-only fallback quantity (read from localStorage) but only after mount
  const [clientQuantity, setClientQuantity] = React.useState(null)
  React.useEffect(() => {
    try {
      if ((quantityFromStore || 0) === 0 && typeof window !== 'undefined') {
        const raw = localStorage.getItem('cartItems')
        if (raw) {
          const parsed = JSON.parse(raw)
          if (Array.isArray(parsed) && parsed.length > 0) {
            const q = parsed.reduce((s, p) => s + (Number(p.quantity) || 0), 0)
            setClientQuantity(q)
            return
          }
        }
      }
    } catch (e) {
      // ignore localStorage errors
    }
    // otherwise clear clientQuantity to allow store value
    setClientQuantity(null)
  }, [quantityFromStore])

  const quantity = clientQuantity ?? quantityFromStore
  const user = useCurrentUser()
  const router = useRouter()

  const isActive = (href) => {
    try {
      const path = router?.pathname || router?.asPath || ''
      if (href === '/') return path === '/' || path === ''
      return path.startsWith(href)
    } catch (e) {
      return false
    }
  }

  return (
    <nav className={styles.nav}>
      <Announcement />
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" passHref>
            <Image src="/img/logo.png" alt="logo" width="150" height="150" />
          </Link>
        </div>

        <button
          className={styles.hamburger}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={handleToggle}
        >
          {open ? (
            <FiX className={styles.icon} />
          ) : (
            <FiMenu className={styles.icon} />
          )}
        </button>

        <ul className={`${styles.list} ${open ? styles.open : ''}`}>
          <li className={`${styles.listItem} ${isActive('/') ? styles.active : ''}`} onClick={() => setOpen(false)}>
            <Link href="/">Home</Link>
          </li>
          <li className={`${styles.listItem} ${isActive('/menus') ? styles.active : ''}`} onClick={() => setOpen(false)}>
            <Link href="/menus">Menus</Link>
          </li>
          <ShowOnLogout>
            <li className={`${styles.listItem} ${isActive('/admin/login') ? styles.active : ''}`} onClick={() => setOpen(false)}>
              <Link href="/admin/login">Login</Link>
            </li>
            <li className={`${styles.listItem} ${isActive('/admin/register') ? styles.active : ''}`} onClick={() => setOpen(false)}>
              <Link href="/admin/register">Register</Link>
            </li>
          </ShowOnLogout>
        </ul>
        <ShowOnLogin>
          <Link href="/profile" className={styles.account} aria-label="Account">
            <FiUser className={styles.accountIcon} />
            <span className={styles.accountName}>{user?.name ? user.name.split(' ')[0] : user?.email?.split('@')[0]}</span>
          </Link>
        </ShowOnLogin>

        <Link href="/cart" className={styles.cart} aria-label="View cart">
          <FiShoppingCart className={styles.cartIcon} />
          <div className={styles.counter}>{quantity}</div>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar