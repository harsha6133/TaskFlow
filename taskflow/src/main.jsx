// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router'
import './index.css'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import { TasksProvider } from './context/TasksContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <TasksProvider>
        <RouterProvider router={router} />
      </TasksProvider>
    </AuthProvider>
  </React.StrictMode>
)