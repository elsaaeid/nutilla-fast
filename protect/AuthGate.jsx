import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// Lightweight client-side auth helpers that call /api/me to determine current user.
// This avoids relying on a Redux auth slice which is not present in this repo.

// _authCache: undefined = unknown/loading, null = not authenticated, object = user
let _authCache = undefined
async function fetchCurrentUser() {
  if (typeof window === 'undefined') return undefined
  if (_authCache !== undefined) return _authCache
  try {
    const res = await fetch('/api/me')
    if (!res.ok) {
      // treat non-ok as unauthenticated, cache null
      _authCache = null
      return null
    }
    const json = await res.json()
    // API returns either null (no user), a user object, or a small admin hint object
    _authCache = json || null
    return _authCache
  } catch (err) {
    _authCache = null
    return null
  }
}

function useCurrentUser() {
  const [user, setUser] = useState(_authCache)
  useEffect(() => {
    let mounted = true
    if (_authCache) {
      setUser(_authCache)
      return
    }
    // fetchCurrentUser returns undefined on server; on client it will resolve to user|null
    fetchCurrentUser().then((u) => {
      if (mounted) setUser(u)
    })
    return () => { mounted = false }
  }, [])
  return user
}

export const ShowOnLogin = ({ children }) => {
  const user = useCurrentUser()
  if (!user) return null
  return <>{children}</>
}

export const ShowOnLogout = ({ children }) => {
  const user = useCurrentUser()
  if (user) return null
  return <>{children}</>
}

export const AdminAuthorLink = ({ children }) => {
  const user = useCurrentUser()
  const role = user?.role
  if (user && (role === 'admin' || role === 'superadmin' || role === 'author')) return <>{children}</>
  return null
}

export const AgentSellerLink = ({ children }) => {
  const user = useCurrentUser()
  const role = user?.role
  if (user && (role === 'agent' || role === 'seller')) return <>{children}</>
  return null
}

export const UnVerifiedUserLink = ({ children }) => {
  const user = useCurrentUser()
  if (user && !user.isVerified) return <>{children}</>
  return null
}

export const RequireAuth = ({ children, redirectTo = '/admin/login' }) => {
  const user = useCurrentUser()
  const router = useRouter()
  useEffect(() => {
    if (typeof window !== 'undefined' && user === null) {
      router.replace(redirectTo)
    }
  }, [user, router, redirectTo])
  if (!user) return null
  return <>{children}</>
}

export const WithRole = ({ roles = [], children }) => {
  const user = useCurrentUser()
  if (!user) return null
  if (!roles || roles.length === 0) return <>{children}</>
  return roles.includes(user.role) ? <>{children}</> : null
}

export default {
  ShowOnLogin,
  ShowOnLogout,
  AdminAuthorLink,
  AgentSellerLink,
  UnVerifiedUserLink,
  RequireAuth,
  WithRole,
}

export { useCurrentUser }
