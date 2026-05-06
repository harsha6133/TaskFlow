// src/components/RoleGuard.jsx
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function RoleGuard({ role, children }) {
  const { hasRole } = useAuth()

  if (!hasRole(role)) {
    return <Navigate to="/403" replace />
  }

  // Works for both wrapped components and nested routes
  return children ? children : <Outlet />
}