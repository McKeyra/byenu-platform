import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../lib/auth/AuthContext.jsx'
import { DashboardLoadingSkeleton } from './LoadingState.jsx'

/**
 * Protected route wrapper for dashboard pages
 * Redirects to login if not authenticated
 */
export function ProtectedRoute({ children, requireRole = null }) {
  const { user, isLoading, role } = useAuth()

  if (isLoading) {
    return <DashboardLoadingSkeleton theme="corp" />
  }

  if (!user) {
    return <Navigate to="/" replace />
  }

  if (requireRole && role !== requireRole) {
    return <Navigate to="/" replace />
  }

  return children
}

/**
 * Protected route for ENUW Key Master Dashboard
 * Requires staff role
 */
export function EnuwProtectedRoute({ children }) {
  return <ProtectedRoute requireRole="staff">{children}</ProtectedRoute>
}
