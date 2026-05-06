// src/app/App.jsx
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { AuthProvider } from '../context/AuthContext'
import { TasksProvider } from '../context/TasksContext'

export default function App() {
  return (
    <AuthProvider>
      <TasksProvider>
        <RouterProvider router={router} />
      </TasksProvider>
    </AuthProvider>
  )
}