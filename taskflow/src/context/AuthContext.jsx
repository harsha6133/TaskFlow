// src/context/AuthContext.jsx
import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)

  // Hydrate auth from localStorage on refresh
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('auth'))
    if (stored?.user && stored?.role) {
      setUser(stored.user)
      setRole(stored.role)
    }
  }, [])

  const login = async (username, password) => {
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })

  const data = await response.json()
  console.log(data)

    // Hardcode role for demo purposes
    const derivedRole = username === 'emilys' ? 'admin' : 'member'

    const authPayload = {
      user: data,
      role: derivedRole,
    }

    localStorage.setItem('auth', JSON.stringify(authPayload))
    setUser(data)
    setRole(derivedRole)
  }

  const logout = () => {
    localStorage.removeItem('auth')
    setUser(null)
    setRole(null)
  }

  const hasRole = (requiredRole) => role === requiredRole

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        login,
        logout,
        hasRole,
        setRole, // used by role switcher on /profile
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}