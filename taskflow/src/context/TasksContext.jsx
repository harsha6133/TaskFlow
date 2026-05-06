// src/context/TasksContext.jsx
import { createContext, useCallback, useEffect, useState } from 'react'

export const TasksContext = createContext(null)

const STORAGE_KEY = 'tasks'
const STATUSES = ['Backlog', 'In Progress', 'In Review', 'Done']

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  // Normalize helper (USED EVERYWHERE)
  const normalizeStatus = status =>
    STATUSES.includes(status) ? status : 'Backlog'

  // Initial load (CACHE FIRST)
  useEffect(() => {
    const cached = JSON.parse(localStorage.getItem(STORAGE_KEY))

    if (cached?.tasks && cached?.users) {
      // SANITIZE CACHED TASKS
      const sanitizedTasks = cached.tasks.map(task => ({
        ...task,
        status: normalizeStatus(task.status),
      }))

      setTasks(sanitizedTasks)
      setUsers(cached.users)
      setLoading(false)
    } else {
      hydrate()
    }
  }, [])

  // ✅ Fetch from API
  const hydrate = async () => {
    try {
      setLoading(true)

      const [todosRes, usersRes] = await Promise.all([
        fetch('https://dummyjson.com/todos'),
        fetch('https://dummyjson.com/users'),
      ])

      const todosData = await todosRes.json()
      const usersData = await usersRes.json()

      // ✅ GUARANTEE VALID STATUS
      const mappedTasks = todosData.todos.map((t, index) => ({
        id: t.id,
        title: t.todo,
        assigneeId: t.userId,
        status: STATUSES[index % STATUSES.length],
      }))

      persist(mappedTasks, usersData.users)
      setUsers(usersData.users)
    } catch (err) {
      console.error('Failed to load tasks', err)
    } finally {
      setLoading(false)
    }
  }

  // ✅ Persist helper
  const persist = (nextTasks, nextUsers = users) => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ tasks: nextTasks, users: nextUsers })
    )
    setTasks(nextTasks)
  }

  // Add task → ALWAYS BACKLOG
  const addTask = useCallback(
    title => {
      const newTask = {
        id: Date.now(),
        title,
        status: 'Backlog', // REQUIRED BEHAVIOR
        assigneeId: null,
      }

      persist([newTask, ...tasks])
    },
    [tasks]
  )

  const updateTask = useCallback(
    (id, updates) => {
      persist(
        tasks.map(task =>
          task.id === id
            ? { ...task, ...updates, status: normalizeStatus(updates.status ?? task.status) }
            : task
        )
      )
    },
    [tasks]
  )

  const deleteTask = useCallback(
    id => {
      persist(tasks.filter(task => task.id !== id))
    },
    [tasks]
  )

  // ✅ Drag & Drop SAFE
  const moveTask = useCallback(
    (id, status) => {
      persist(
        tasks.map(task =>
          task.id === id
            ? { ...task, status: normalizeStatus(status) }
            : task
        )
      )
    },
    [tasks]
  )

  return (
    <TasksContext.Provider
      value={{
        tasks,
        users,
        loading,
        addTask,
        updateTask,
        deleteTask,
        moveTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}