import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase.js'
import GlassCard from '../components/ui-custom/GlassCard.jsx'
import { Filter, Search, Calendar, User, Briefcase, Sparkles, Loader2, CheckCircle, Clock, XCircle, Eye } from 'lucide-react'
import { useAuth } from '../lib/auth/AuthContext.jsx'
import { cn, formatDate } from '../utils/index.js'
import { useNavigate } from 'react-router-dom'

// Fetch all submissions (staff sees all, users see their own)
async function fetchSubmissions(filters, userEmail, isStaff) {
  let query = supabase
    .from('bye_nu.submissions')
    .select('*, bye_nu.reports(id, created_at, sent_at)')
    .order('created_at', { ascending: false })

  // Apply filters
  if (filters.source && filters.source !== 'all') {
    query = query.eq('source', filters.source)
  }
  if (filters.status && filters.status !== 'all') {
    query = query.eq('status', filters.status)
  }
  if (filters.wizardType && filters.wizardType !== 'all') {
    query = query.eq('wizard_type', filters.wizardType)
  }
  if (filters.search) {
    query = query.or(`email.ilike.%${filters.search}%,wizard_data->>businessName.ilike.%${filters.search}%`)
  }

  // If not staff, only show user's own submissions
  if (!isStaff && userEmail) {
    query = query.eq('email', userEmail)
  }

  const { data, error } = await query
  if (error) throw error
  return data || []
}

export default function Pipeline() {
  const navigate = useNavigate()
  const { user, role } = useAuth()
  const isStaff = role === 'staff'
  const [viewMode, setViewMode] = useState('list') // 'list' | 'board'
  const [filters, setFilters] = useState({
    source: 'all',
    status: 'all',
    wizardType: 'all',
    search: ''
  })
  const [showFilters, setShowFilters] = useState(false)

  const { data: submissions, isLoading, refetch } = useQuery({
    queryKey: ['submissions', filters, user?.email, isStaff],
    queryFn: () => fetchSubmissions(filters, user?.email, isStaff)
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'draft':
        return 'bg-slate-100 text-slate-700'
      case 'report_sent':
        return 'bg-blue-100 text-blue-700'
      case 'claimed':
        return 'bg-emerald-100 text-emerald-700'
      case 'site_generated':
        return 'bg-purple-100 text-purple-700'
      case 'completed':
        return 'bg-green-100 text-green-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'draft':
        return <Clock className="w-4 h-4" />
      case 'report_sent':
        return <CheckCircle className="w-4 h-4" />
      case 'claimed':
        return <CheckCircle className="w-4 h-4" />
      case 'site_generated':
        return <Sparkles className="w-4 h-4" />
      case 'completed':
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getWizardTypeLabel = (type) => {
    switch (type) {
      case 'quick':
        return 'Quick Wizard'
      case 'full':
        return 'Full Business Wizard'
      case 'ai':
        return 'AI Builder'
      default:
        return type
    }
  }

  const getWizardTypeIcon = (type) => {
    switch (type) {
      case 'quick':
        return <Briefcase className="w-4 h-4" />
      case 'full':
        return <Briefcase className="w-4 h-4" />
      case 'ai':
        return <Sparkles className="w-4 h-4" />
      default:
        return <Briefcase className="w-4 h-4" />
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Pipeline</h1>
          <p className="text-slate-600">
            {isStaff ? 'Track all submissions from users and staff' : 'View your submissions'}
          </p>
        </div>

        {/* Filters and Search */}
        <GlassCard className="p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by email or business name..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:border-slate-400 focus:outline-none"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                'px-4 py-2 rounded-xl border transition-colors flex items-center gap-2',
                showFilters
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              )}
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'px-4 py-2 rounded-xl border transition-colors',
                  viewMode === 'list'
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                )}
              >
                List
              </button>
              <button
                onClick={() => setViewMode('board')}
                className={cn(
                  'px-4 py-2 rounded-xl border transition-colors',
                  viewMode === 'board'
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                )}
              >
                Board
              </button>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Source</label>
                <select
                  value={filters.source}
                  onChange={(e) => setFilters({ ...filters, source: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-slate-400 focus:outline-none"
                >
                  <option value="all">All Sources</option>
                  <option value="user">User</option>
                  <option value="staff">Staff</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-slate-400 focus:outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="draft">Draft</option>
                  <option value="report_sent">Report Sent</option>
                  <option value="claimed">Claimed</option>
                  <option value="site_generated">Site Generated</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Wizard Type</label>
                <select
                  value={filters.wizardType}
                  onChange={(e) => setFilters({ ...filters, wizardType: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-slate-400 focus:outline-none"
                >
                  <option value="all">All Types</option>
                  <option value="quick">Quick Wizard</option>
                  <option value="full">Full Business Wizard</option>
                  <option value="ai">AI Builder</option>
                </select>
              </div>
            </div>
          )}
        </GlassCard>

        {/* Submissions List/Board */}
        {viewMode === 'list' ? (
          <div className="space-y-4">
            {submissions && submissions.length > 0 ? (
              submissions.map((submission) => {
                const businessName = submission.wizard_data?.businessName || 'Untitled'
                const industry = Array.isArray(submission.wizard_data?.industry)
                  ? submission.wizard_data.industry.join(', ')
                  : submission.wizard_data?.industry || 'N/A'

                return (
                  <GlassCard key={submission.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(`/dashboard?submission=${submission.id}`)}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-slate-900">{businessName}</h3>
                          <span className={cn('px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1', getStatusColor(submission.status))}>
                            {getStatusIcon(submission.status)}
                            {submission.status.replace('_', ' ')}
                          </span>
                          <span className="px-2 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium flex items-center gap-1">
                            {getWizardTypeIcon(submission.wizard_type)}
                            {getWizardTypeLabel(submission.wizard_type)}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-600 mb-2">
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {submission.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            {industry}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(submission.created_at)}
                          </span>
                          {submission.source === 'staff' && (
                            <span className="px-2 py-1 rounded bg-purple-100 text-purple-700 text-xs font-medium">
                              Staff Submission
                            </span>
                          )}
                        </div>
                        {submission.reports && submission.reports.length > 0 && (
                          <div className="text-xs text-slate-500">
                            Report generated {formatDate(submission.reports[0].created_at)}
                            {submission.reports[0].sent_at && ` • Sent ${formatDate(submission.reports[0].sent_at)}`}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(`/dashboard?submission=${submission.id}`)
                        }}
                        className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                    </div>
                  </GlassCard>
                )
              })
            ) : (
              <GlassCard className="p-12 text-center">
                <p className="text-slate-500">No submissions found</p>
              </GlassCard>
            )}
          </div>
        ) : (
          // Board View (Kanban-style)
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {['draft', 'report_sent', 'claimed', 'site_generated', 'completed'].map((status) => {
              const statusSubmissions = submissions?.filter(s => s.status === status) || []
              return (
                <div key={status} className="bg-slate-50 rounded-xl p-4">
                  <h3 className="font-semibold text-slate-900 mb-4 capitalize flex items-center gap-2">
                    <span className={cn('w-2 h-2 rounded-full', getStatusColor(status).split(' ')[0])} />
                    {status.replace('_', ' ')} ({statusSubmissions.length})
                  </h3>
                  <div className="space-y-3">
                    {statusSubmissions.map((submission) => {
                      const businessName = submission.wizard_data?.businessName || 'Untitled'
                      return (
                        <GlassCard
                          key={submission.id}
                          className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => navigate(`/dashboard?submission=${submission.id}`)}
                        >
                          <h4 className="font-medium text-slate-900 mb-1">{businessName}</h4>
                          <p className="text-xs text-slate-500 mb-2">{submission.email}</p>
                          <div className="flex items-center gap-2 text-xs">
                            {getWizardTypeIcon(submission.wizard_type)}
                            <span className="text-slate-600">{getWizardTypeLabel(submission.wizard_type)}</span>
                          </div>
                        </GlassCard>
                      )
                    })}
                    {statusSubmissions.length === 0 && (
                      <p className="text-xs text-slate-400 text-center py-4">No items</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Stats Summary */}
        {isStaff && submissions && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <GlassCard className="p-4">
              <div className="text-2xl font-bold text-slate-900">{submissions.length}</div>
              <div className="text-sm text-slate-600">Total Submissions</div>
            </GlassCard>
            <GlassCard className="p-4">
              <div className="text-2xl font-bold text-blue-600">
                {submissions.filter(s => s.status === 'report_sent').length}
              </div>
              <div className="text-sm text-slate-600">Reports Sent</div>
            </GlassCard>
            <GlassCard className="p-4">
              <div className="text-2xl font-bold text-emerald-600">
                {submissions.filter(s => s.status === 'claimed').length}
              </div>
              <div className="text-sm text-slate-600">Claimed</div>
            </GlassCard>
            <GlassCard className="p-4">
              <div className="text-2xl font-bold text-purple-600">
                {submissions.filter(s => s.status === 'site_generated').length}
              </div>
              <div className="text-sm text-slate-600">Sites Generated</div>
            </GlassCard>
          </div>
        )}
      </div>
    </div>
  )
}
