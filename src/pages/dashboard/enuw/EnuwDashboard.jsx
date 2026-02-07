import React from 'react'
import { Routes, Route } from 'react-router-dom'
import EnuwDashboardLayout from '../../../components/dashboard/enuw/EnuwDashboardLayout.jsx'
import { EnuwProtectedRoute } from '../../../components/dashboard/ProtectedRoute.jsx'
import CommandCenter from './CommandCenter.jsx'
import VentureDeepDive from './VentureDeepDive.jsx'
import PipelineBoard from './PipelineBoard.jsx'
import LeadsManagement from './LeadsManagement.jsx'
import AI6Scoring from './AI6Scoring.jsx'
import GoldenHour from './GoldenHour.jsx'
import Reports from './Reports.jsx'

export default function EnuwDashboard() {
  return (
    <EnuwProtectedRoute>
      <EnuwDashboardLayout>
        <Routes>
          <Route path="dashboard" element={<CommandCenter />} />
          <Route path="venture/:id" element={<VentureDeepDive />} />
          <Route path="pipeline" element={<PipelineBoard />} />
          <Route path="leads" element={<LeadsManagement />} />
          <Route path="scoring" element={<AI6Scoring />} />
          <Route path="golden-hour" element={<GoldenHour />} />
          <Route path="reports" element={<Reports />} />
        </Routes>
      </EnuwDashboardLayout>
    </EnuwProtectedRoute>
  )
}
