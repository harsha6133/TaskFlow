// src/routes/Profile.jsx
import { useAuth } from '../hooks/useAuth'

export default function Profile() {
  const { user, role, setRole } = useAuth()

  const toggleRole = () => {
    const nextRole = role === 'admin' ? 'member' : 'admin'
    setRole(nextRole)

    // persist role change for refresh
    const stored = JSON.parse(localStorage.getItem('auth'))
    localStorage.setItem(
      'auth',
      JSON.stringify({ ...stored, role: nextRole })
    )
  }

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-2xl font-bold">Profile</h1>

      <div className="bg-gray-900 border border-gray-800 rounded p-4 space-y-2">
        <p>
          <span className="text-gray-400">Username:</span>{' '}
          <span className="font-medium">{user?.username}</span>
        </p>
        <p>
          <span className="text-gray-400">Email:</span>{' '}
          <span className="font-medium">{user?.email}</span>
        </p>
        <p>
          <span className="text-gray-400">Role:</span>{' '}
          <span className="font-medium capitalize">{role}</span>
        </p>
      </div>

      <button
        onClick={toggleRole}
        className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-700 transition"
      >
        Switch to {role === 'admin' ? 'Member' : 'Admin'}
      </button>

      <p className="text-sm text-gray-500">
        Role switcher is provided for reviewer testing purposes.
      </p>
    </div>
  )
}