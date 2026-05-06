// src/components/Layout.jsx
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import clsx from 'clsx'

export default function Layout() {
  const { role, logout, hasRole } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const linkClass = ({ isActive }) =>
    clsx(
      'flex items-center gap-3 px-3 py-2 rounded-lg text-sm',
      isActive
        ? 'bg-emerald-500/10 text-emerald-400'
        : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
    )

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1220] via-[#0a0f1a] to-[#060b14] text-gray-200">

      {/* ✅ FIXED SIDEBAR (Desktop only) */}
      <aside
        className="
          hidden md:flex
          fixed top-0 left-0
          h-screen w-64
          flex-col
          bg-[#0a0f1a]
          border-r border-white/5
          p-5
        "
      >
        <h1 className="text-xl font-bold mb-6">TaskFlow</h1>

        <nav className="space-y-1 flex-1">
          <NavLink to="/tasks" className={linkClass}>
            Tasks
          </NavLink>
          <NavLink to="/board" className={linkClass}>
            Board
          </NavLink>
          <NavLink to="/profile" className={linkClass}>
            Profile
          </NavLink>
          {hasRole('admin') && (
            <NavLink to="/team" className={linkClass}>
              Team
            </NavLink>
          )}
        </nav>

        <div className="mt-6 text-xs text-gray-400">
          Role: <span className="capitalize">{role}</span>
        </div>
      </aside>

      {/* ✅ MAIN CONTENT */}
      <div className="flex min-h-screen flex-col md:ml-64">
        
        {/* Topbar */}
        <header className="flex items-center justify-end px-4 md:px-6 py-3 border-b border-white/5">
          <button
            onClick={handleLogout}
            className="text-sm px-4 py-1.5 rounded bg-red-600 hover:bg-red-700 transition"
          >
            Logout
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
``