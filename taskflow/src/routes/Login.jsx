// src/routes/Login.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [username, setUsername] = useState('emilys')
  const [password, setPassword] = useState('emilyspass')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await login(username, password)
      navigate('/tasks')
    } catch {
      setError('Invalid credentials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#020617] text-gray-200">

      {/* LEFT PANEL (Desktop only) */}
      <div className="hidden lg:flex flex-col justify-between p-8 xl:p-10 bg-[#020617]">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-400" />
            TaskFlow
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Built for teams who ship.
          </p>
        </div>

        {/* Preview cards */}
        <div className="space-y-6">
          <div className="bg-white/5 rounded-xl p-6">
            <p className="text-xs text-gray-400 mb-2">PRODUCTIVITY</p>
            <p className="text-3xl font-bold">87%</p>
            <div className="mt-4 flex items-end gap-1 h-20">
              {[30, 40, 35, 60, 50, 70, 65].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className="w-4 bg-emerald-400/70 rounded"
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-xs text-gray-400">TASKS DONE</p>
              <p className="text-2xl font-semibold">142</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-xs text-gray-400">IN PROGRESS</p>
              <p className="text-2xl font-semibold">23</p>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500">
          © 2026 TaskFlow. All rights reserved.
        </p>
      </div>

      {/* RIGHT PANEL (Login Form) */}
      <div className="flex items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-md py-6">
          <p className="text-xs text-emerald-400 mb-2 tracking-widest">
            SIGN IN
          </p>

          <h2 className="text-2xl sm:text-3xl font-semibold mb-2">
            Welcome back
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            Sign in to access your team’s workspace.
          </p>

          {/* OAuth buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button className="py-2 rounded-lg bg-white/5 border border-white/10 text-sm">
              Continue with Google
            </button>
            <button className="py-2 rounded-lg bg-white/5 border border-white/10 text-sm">
              Continue with GitHub
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
            <div className="flex-1 h-px bg-white/10" />
            OR EMAIL
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">
                USERNAME
              </label>
              <input
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1">
                PASSWORD
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-emerald-500 text-black font-medium hover:bg-emerald-600 disabled:opacity-50 transition"
            >
              {loading ? 'Signing in…' : 'Sign In →'}
            </button>
          </form>

          <p className="mt-6 text-xs text-gray-500 text-center">
            Demo admin credentials are prefilled
          </p>
        </div>
      </div>
    </div>
  )
}
``