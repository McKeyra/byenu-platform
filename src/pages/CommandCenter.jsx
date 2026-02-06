import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase.js'
import { useAuth } from '../lib/auth/AuthContext.jsx'
import GlassCard from '../components/ui-custom/GlassCard.jsx'
import { 
  Briefcase, 
  Users, 
  FileText, 
  CheckCircle, 
  Clock, 
  Sparkles, 
  TrendingUp,
  ArrowRight,
  Settings,
  Eye,
  User
} from 'lucide-react'
import { cn } from '../utils/index.js'

// Fetch dashboard stats
async function fetchDashboardStats() {
  const [submissionsRes, membershipsRes, reportsRes] = await Promise.all([
    supabase.from('bye_nu.submissions').select('id, status, source', { count: 'exact' }),
    supabase.from('bye_nu.memberships').select('id, status, plan', { count: 'exact' }),
    supabase.from('bye_nu.reports').select('id, sent_at', { count: 'exact' }),
  ])

  return {
    submissions: submissionsRes.data || [],
    memberships: membershipsRes.data || [],
    reports: reportsRes.data || [],
    totalSubmissions: submissionsRes.count || 0,
    totalMemberships: membershipsRes.count || 0,
    totalReports: reportsRes.count || 0,
  }
}

export default function CommandCenter() {
  const navigate = useNavigate()
  const { user, role } = useAuth()
  const [viewMode, setViewMode] = useState('admin') // 'admin' | 'user'

  // Redirect if not staff
  if (role !== 'staff') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <GlassCard className="p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="text-slate-600 mb-6">This page is for staff only.</p>
          <Link to="/dashboard">
            <button className="px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800">
              Go to Dashboard
            </button>
          </Link>
        </GlassCard>
      </div>
    )
  }

  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: fetchDashboardStats,
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Briefcase className="w-6 h-6 text-slate-400" />
          </div>
          <p className="text-slate-500">Loading...</p>
        </div>
      </div>
    )
  }

  const statusCounts = {
    draft: stats?.submissions.filter(s => s.status === 'draft').length || 0,
    report_sent: stats?.submissions.filter(s => s.status === 'report_sent').length || 0,
    claimed: stats?.submissions.filter(s => s.status === 'claimed').length || 0,
    site_generated: stats?.submissions.filter(s => s.status === 'site_generated').length || 0,
  }

  const userSubmissions = stats?.submissions.filter(s => s.source === 'user').length || 0
  const staffSubmissions = stats?.submissions.filter(s => s.source === 'staff').length || 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Command Center</h1>
            <p className="text-slate-600">Internal dashboard for staff operations</p>
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-white rounded-xl p-1 border border-slate-200">
            <button
              onClick={() => setViewMode('admin')}
              className={cn(
                'px-4 py-2 rounded-lg transition-colors flex items-center gap-2',
                viewMode === 'admin'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-50'
              )}
            >
              <Settings className="w-4 h-4" />
              Admin View
            </button>
            <button
              onClick={() => {
                setViewMode('user')
                navigate('/dashboard')
              }}
              className={cn(
                'px-4 py-2 rounded-lg transition-colors flex items-center gap-2',
                viewMode === 'user'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-50'
              )}
            >
              <User className="w-4 h-4" />
              User View
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-slate-400" />
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">
              {stats?.totalSubmissions || 0}
            </div>
            <div className="text-sm text-slate-600">Total Submissions</div>
            <div className="mt-2 text-xs text-slate-500">
              {userSubmissions} user • {staffSubmissions} staff
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-slate-400" />
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">
              {stats?.totalMemberships || 0}
            </div>
            <div className="text-sm text-slate-600">Active Memberships</div>
            <div className="mt-2 text-xs text-slate-500">
              {stats?.memberships.filter(m => m.status === 'active').length || 0} active
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-slate-400" />
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">
              {stats?.totalReports || 0}
            </div>
            <div className="text-sm text-slate-600">Reports Generated</div>
            <div className="mt-2 text-xs text-slate-500">
              {stats?.reports.filter(r => r.sent_at).length || 0} sent
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-slate-400" />
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">
              {statusCounts.draft}
            </div>
            <div className="text-sm text-slate-600">Draft Submissions</div>
            <div className="mt-2 text-xs text-slate-500">Needs review</div>
          </GlassCard>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <GlassCard 
            className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate('/command-center/pipeline')}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 mb-1">Pipeline</h3>
                <p className="text-sm text-slate-600">Track all submissions</p>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400" />
            </div>
          </GlassCard>

          <GlassCard 
            className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate('/wizard-selector')}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 mb-1">Internal Wizard</h3>
                <p className="text-sm text-slate-600">Generate report or scaffold site</p>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400" />
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 mb-1">User Management</h3>
                <p className="text-sm text-slate-600">Coming soon</p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Status Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard className="p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Submission Status</h3>
            <div className="space-y-3">
              {Object.entries(statusCounts).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'w-3 h-3 rounded-full',
                      status === 'draft' && 'bg-slate-400',
                      status === 'report_sent' && 'bg-blue-500',
                      status === 'claimed' && 'bg-emerald-500',
                      status === 'site_generated' && 'bg-purple-500'
                    )} />
                    <span className="text-sm text-slate-700 capitalize">
                      {status.replace('_', ' ')}
                    </span>
                  </div>
                  <span className="font-semibold text-slate-900">{count}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="text-sm text-slate-600">
                <p className="font-medium text-slate-900 mb-1">Pipeline Management</p>
                <p>View and manage all submissions in the pipeline</p>
              </div>
              <div className="text-sm text-slate-600">
                <p className="font-medium text-slate-900 mb-1">Internal Wizard</p>
                <p>Use the wizard to generate reports or scaffold sites for clients</p>
              </div>
              <div className="text-sm text-slate-600">
                <p className="font-medium text-slate-900 mb-1">User View Toggle</p>
                <p>Switch to user view to see the customer experience in real-time</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
