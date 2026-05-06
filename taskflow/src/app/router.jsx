// src/app/router.jsx
import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import RoleGuard from '../components/RoleGuard'
import Skeleton from '../components/Skeleton'
import Layout from '../components/Layout'

const Login = lazy(() => import('../routes/Login'))
const Tasks = lazy(() => import('../routes/Tasks'))
const Board = lazy(() => import('../routes/Board'))
const Profile = lazy(() => import('../routes/Profile'))
const Team = lazy(() => import('../routes/Team'))
const Forbidden = lazy(() => import('../routes/Forbidden'))

export const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <Suspense fallback={<Skeleton />}>
        <Login />
      </Suspense>
    ),
  },
  {
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/tasks',
        element: (
          <Suspense fallback={<Skeleton />}>
            <Tasks />
          </Suspense>
        ),
      },
      {
        path: '/board',
        element: (
          <Suspense fallback={<Skeleton />}>
            <Board />
          </Suspense>
        ),
      },
      {
        path: '/profile',
        element: (
          <Suspense fallback={<Skeleton />}>
            <Profile />
          </Suspense>
        ),
      },
      {
        path: '/team',
        element: (
          <RoleGuard role="admin">
            <Suspense fallback={<Skeleton />}>
              <Team />
            </Suspense>
          </RoleGuard>
        ),
      },
    ],
  },
  {
    path: '/403',
    element: (
      <Suspense fallback={<Skeleton />}>
        <Forbidden />
      </Suspense>
    ),
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<Skeleton />}>
        <Login />
      </Suspense>
    ),
  },
])