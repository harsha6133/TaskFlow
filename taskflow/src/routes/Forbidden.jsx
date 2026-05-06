// src/routes/Forbidden.jsx
import { Link } from 'react-router-dom'

export default function Forbidden() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <h1 className="text-6xl font-bold text-red-500 mb-4">403</h1>
      <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
      <p className="text-gray-400 mb-6">
        You do not have permission to view this page.
      </p>

      <Link
        to="/tasks"
        className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition"
      >
        Go back to Tasks
      </Link>
    </div>
  )
}