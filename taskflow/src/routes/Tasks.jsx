// src/routes/Tasks.jsx
import { useContext, useMemo, useState } from 'react'
import { TasksContext } from '../context/TasksContext'
import { useAuth } from '../hooks/useAuth'
import Skeleton from '../components/Skeleton'
import clsx from 'clsx'

const STATUSES = ['All', 'Backlog', 'In Progress', 'In Review', 'Done']

export default function Tasks() {
  const {
    tasks,
    users,
    loading,
    deleteTask,
    addTask,
    updateTask,
  } = useContext(TasksContext)

  const { user, role } = useAuth()

  const [activeStatus, setActiveStatus] = useState('All')
  const [search, setSearch] = useState('')
  const [newTaskTitle, setNewTaskTitle] = useState('')

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesStatus =
        activeStatus === 'All' || task.status === activeStatus
      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase())

      return matchesStatus && matchesSearch
    })
  }, [tasks, activeStatus, search])

  if (loading) return <Skeleton />

  const canModify = (task) =>
    role === 'admin' || task.assigneeId === user?.id

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return
    addTask(newTaskTitle)
    setNewTaskTitle('')
  }

  const handleCheckboxChange = (task) => {
    updateTask(task.id, {
      status: task.status === 'Done' ? 'Backlog' : 'Done',
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Tasks</h1>
          <p className="text-sm text-gray-400">
            {filteredTasks.length} tasks
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm"
          />

          <input
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="New task title"
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm"
          />

          <button
            onClick={handleAddTask}
            className="bg-emerald-500 hover:bg-emerald-600 text-black px-4 py-2 rounded-lg text-sm font-medium"
          >
            + New Task
          </button>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="flex flex-wrap gap-4 border-b border-white/10">
        {STATUSES.map((status) => (
          <button
            key={status}
            onClick={() => setActiveStatus(status)}
            className={clsx(
              'pb-2 text-sm',
              activeStatus === status
                ? 'text-emerald-400 border-b-2 border-emerald-400'
                : 'text-gray-400 hover:text-gray-200'
            )}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="
              flex flex-col gap-3
              sm:grid sm:grid-cols-[24px_1fr_150px_120px_100px]
              sm:items-center
              px-4 py-3 rounded-xl
              bg-white/5 border border-white/5
              hover:bg-white/10 transition
            "
          >
            {/* Checkbox */}
            <input
              type="checkbox"
              checked={task.status === 'Done'}
              onChange={() => handleCheckboxChange(task)}
            />

            {/* Title */}
            <div
              className={clsx(
                'font-medium',
                task.status === 'Done' && 'line-through text-gray-400'
              )}
            >
              {task.title}
            </div>

            {/* Assignee */}
            <select
              value={task.assigneeId ?? ''}
              onChange={(e) =>
                updateTask(task.id, {
                  assigneeId: e.target.value
                    ? Number(e.target.value)
                    : null,
                })
              }
              className="
                appearance-none
                bg-gray-900 text-gray-200
                border border-white/10
                rounded px-2 py-1 text-sm
                focus:outline-none focus:ring-2 focus:ring-emerald-500
              "
            >
              <option value="" className="bg-gray-900 text-gray-400">
                Unassigned
              </option>

              {users.map((u) => (
                <option
                  key={u.id}
                  value={u.id}
                  className="bg-gray-900 text-gray-200"
                >
                  {u.firstName}
                </option>
              ))}
            </select>

            {/* Status */}
            <span className="text-xs px-2 py-0.5 rounded bg-white/10 w-fit">
              {task.status}
            </span>

            {/* Delete */}
            {canModify(task) && (
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-400 text-sm"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}