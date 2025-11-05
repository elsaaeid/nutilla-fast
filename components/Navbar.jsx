import styles from "../styles/Navbar.module.css"
import React, { useState } from 'react'
import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/router'
import { FiMenu, FiX, FiShoppingCart } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { ShowOnLogout, ShowOnLogin, useCurrentUser } from '../protect/AuthGate'
import { FiUser } from 'react-icons/fi'

const Navbar = () => {
  const [open, setOpen] = useState(false)

  const handleToggle = () => setOpen((s) => !s)
  const quantity = useSelector((state) => state.cart.quantity)
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
        <li className={`${styles.listItem} ${isActive('/products') ? styles.active : ''}`} onClick={() => setOpen(false)}>
          <Link href="/products">Products</Link>
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
  )
}

export default Navbar