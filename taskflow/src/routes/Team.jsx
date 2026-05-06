// src/routes/Team.jsx
import { useContext, useMemo } from 'react'
import { TasksContext } from '../context/TasksContext'
import Skeleton from '../components/Skeleton'

export default function Team() {
  const { users, tasks, loading } = useContext(TasksContext)

  const usersWithTaskCount = useMemo(() => {
    return users.map(user => ({
      ...user,
      taskCount: tasks.filter(t => t.assigneeId === user.id).length,
    }))
  }, [users, tasks])

  if (loading) return <Skeleton />

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Team</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-800 text-sm">
          <thead className="bg-gray-950">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Assigned Tasks</th>
            </tr>
          </thead>
          <tbody>
            {usersWithTaskCount.map(user => (
              <tr key={user.id} className="border-t border-gray-800">
                <td className="p-3">
                  {user.firstName} {user.lastName}
                </td>
                <td className="p-3 text-gray-400">{user.email}</td>
                <td className="p-3 font-medium">{user.taskCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-sm text-gray-500">
        Admin-only view. Shows total tasks assigned to each team member.
      </p>
    </div>
  )
}