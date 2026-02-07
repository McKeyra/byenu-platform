import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ByenuDashboardLayout from '../../../components/dashboard/byenu/ByenuDashboardLayout.jsx'
import { ProtectedRoute } from '../../../components/dashboard/ProtectedRoute.jsx'
import DashboardOverview from './DashboardOverview.jsx'
import DashboardEditor from './DashboardEditor.jsx'
import DashboardPages from './DashboardPages.jsx'
import DashboardAnalytics from './DashboardAnalytics.jsx'
import DashboardAbilities from './DashboardAbilities.jsx'
import DashboardSettings from './DashboardSettings.jsx'

export default function ByenuDashboard() {
  return (
    <ProtectedRoute>
      <ByenuDashboardLayout>
        <Routes>
          <Route index element={<DashboardOverview />} />
          <Route path="edit" element={<DashboardEditor />} />
          <Route path="pages" element={<DashboardPages />} />
          <Route path="analytics" element={<DashboardAnalytics />} />
          <Route path="abilities" element={<DashboardAbilities />} />
          <Route path="settings" element={<DashboardSettings />} />
        </Routes>
      </ByenuDashboardLayout>
    </ProtectedRoute>
  )
}
