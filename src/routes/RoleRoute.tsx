import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import type { UserRole } from '../types'

export function RoleRoute({ allowedRole }: { allowedRole: UserRole }) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    )
  }

  if (user.role !== allowedRole) {
    return (
      <Navigate
        to={
          user.role === 'admin'
            ? '/admin/dashboard'
            : '/user/dashboard'
        }
        replace
      />
    )
  }

  return <Outlet />
}
