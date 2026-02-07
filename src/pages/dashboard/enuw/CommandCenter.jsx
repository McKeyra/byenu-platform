import React from 'react'
import { Link } from 'react-router-dom'
import { S } from '../../../theme/sport-constants.js'
import {
  TrendingUp, DollarSign, Users, ArrowUp, ArrowDown,
  Activity, AlertCircle, CheckCircle
} from 'lucide-react'
import { usePortfolioTotals, useVentures, useVitalityIndex, useHotLeads, useRecentActivities } from '../../../hooks/useEnuw.js'
import { DashboardLoadingSkeleton, ErrorState } from '../../../components/dashboard/LoadingState.jsx'
import { formatDistanceToNow } from 'date-fns'

export default function CommandCenter() {
  const { data: portfolioMetrics, isLoading: portfolioLoading, error: portfolioError } = usePortfolioTotals()
  const { data: ventures, isLoading: venturesLoading } = useVentures()
  const { data: hotLeads, isLoading: leadsLoading } = useHotLeads(5)
  const { data: activities, isLoading: activitiesLoading } = useRecentActivities(20)

  if (portfolioLoading || venturesLoading || leadsLoading || activitiesLoading) {
    return <DashboardLoadingSkeleton theme="sport" />
  }

  if (portfolioError) {
    return <ErrorState message="Failed to load portfolio data" />
  }

  const portfolioData = portfolioMetrics || {
    totalMRR: 0,
    cashPosition: 0,
    activeUsers: 0,
    momentum: 12.5
  }

  // Get vitality scores for each venture
  const venturesWithVitality = ventures?.map(venture => ({
    ...venture,
    color: venture.color || S.enuwWeb,
    vitality: 75, // TODO: Use useVitalityIndex hook for each venture
    status: 'healthy', // TODO: Calculate based on metrics
    metrics: [
      { label: 'MRR', value: `$${(parseFloat(venture.mrr) || 0) / 1000}K` },
      { label: 'Status', value: venture.status || 'active' },
      { label: 'Target', value: `$${(venture.target_valuation || 0) / 1000000000}B` },
    ]
  })) || []

  const formattedHotLeads = hotLeads?.map(lead => ({
    ...lead,
    name: lead.company_name,
    venture: lead.venture_id,
    ai6: lead.ai6_score,
    lastAction: lead.last_contact_at ? formatDistanceToNow(new Date(lead.last_contact_at), { addSuffix: true }) : 'Never'
  })) || []

  const formattedActivities = activities?.map(activity => ({
    ...activity,
    venture: activity.venture_id,
    description: activity.description,
    time: formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })
  })) || []

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy': return <CheckCircle size={16} color={S.accentLime} />
      case 'attention': return <AlertCircle size={16} color={S.accentOrange} />
      case 'critical': return <AlertCircle size={16} color={S.accentRed} />
      default: return null
    }
  }

  return (
    <div>
      <style>{`
        .enuw-command-title {
          font-family: 'Inter', sans-serif;
          font-size: 42px;
          font-weight: 800;
          color: ${S.text};
          letter-spacing: -1.5px;
          text-transform: uppercase;
          margin-bottom: 32px;
        }
        .enuw-pulse-strip {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 32px;
        }
        .enuw-pulse-card {
          background: ${S.surface};
          border: 1px solid ${S.border};
          border-radius: 16px;
          padding: 20px;
          box-shadow: ${S.shadowCard};
        }
        .enuw-pulse-label {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 800;
          color: ${S.textMuted};
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }
        .enuw-pulse-value {
          font-family: 'JetBrains Mono', monospace;
          font-size: 32px;
          font-weight: 600;
          color: ${S.text};
          margin-bottom: 8px;
        }
        .enuw-pulse-trend {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          font-weight: 600;
          color: ${S.accentLime};
        }
        .enuw-vitality-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-bottom: 32px;
        }
        .enuw-vitality-card {
          background: ${S.surface};
          border: 1px solid ${S.border};
          border-radius: 20px;
          padding: 24px;
          box-shadow: ${S.shadowCard};
          transition: all 0.15s ease;
        }
        .enuw-vitality-card:hover {
          border-color: ${S.borderLight};
          box-shadow: ${S.shadowElevated};
        }
        .enuw-vitality-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .enuw-vitality-name {
          font-family: 'Inter', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: ${S.text};
        }
        .enuw-vitality-score {
          font-family: 'JetBrains Mono', monospace;
          font-size: 36px;
          font-weight: 600;
          color: ${S.text};
          margin-bottom: 16px;
        }
        .enuw-vitality-metrics {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        .enuw-vitality-metric {
          text-align: center;
        }
        .enuw-vitality-metric-label {
          font-size: 11px;
          color: ${S.textMuted};
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
        }
        .enuw-vitality-metric-value {
          font-family: 'JetBrains Mono', monospace;
          font-size: 16px;
          font-weight: 600;
          color: ${S.text};
        }
        .enuw-hot-leads {
          background: ${S.surface};
          border: 1px solid ${S.border};
          border-radius: 20px;
          padding: 24px;
          margin-bottom: 24px;
        }
        .enuw-section-title {
          font-family: 'Inter', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: ${S.text};
          margin-bottom: 20px;
        }
        .enuw-lead-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid ${S.border};
        }
        .enuw-lead-item:last-child {
          border-bottom: none;
        }
        .enuw-lead-info {
          flex: 1;
        }
        .enuw-lead-name {
          font-weight: 600;
          color: ${S.text};
          margin-bottom: 4px;
        }
        .enuw-lead-meta {
          font-size: 12px;
          color: ${S.textMuted};
        }
        .enuw-lead-score {
          font-family: 'JetBrains Mono', monospace;
          font-size: 20px;
          font-weight: 600;
          color: ${S.accentLime};
          margin-right: 16px;
        }
        .enuw-activity-feed {
          background: ${S.surface};
          border: 1px solid ${S.border};
          border-radius: 20px;
          padding: 24px;
        }
        .enuw-activity-item {
          display: flex;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid ${S.border};
        }
        .enuw-activity-item:last-child {
          border-bottom: none;
        }
        .enuw-activity-venture {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-top: 6px;
          flex-shrink: 0;
        }
        .enuw-activity-content {
          flex: 1;
        }
        .enuw-activity-text {
          color: ${S.text};
          font-size: 14px;
          margin-bottom: 4px;
        }
        .enuw-activity-time {
          color: ${S.textMuted};
          font-size: 12px;
        }
      `}</style>

      <h1 className="enuw-command-title">Command Center</h1>

      {/* Portfolio Pulse Strip */}
      <div className="enuw-pulse-strip">
        <div className="enuw-pulse-card">
          <div className="enuw-pulse-label">Total MRR</div>
          <div className="enuw-pulse-value">${(portfolioData.totalMRR / 1000).toFixed(0)}K</div>
          <div className="enuw-pulse-trend">
            <ArrowUp size={14} />
            +12.5%
          </div>
        </div>
        <div className="enuw-pulse-card">
          <div className="enuw-pulse-label">Cash Position</div>
          <div className="enuw-pulse-value">${(portfolioData.cashPosition / 1000000).toFixed(2)}M</div>
          <div className="enuw-pulse-trend">
            <ArrowUp size={14} />
            +8.2%
          </div>
        </div>
        <div className="enuw-pulse-card">
          <div className="enuw-pulse-label">Active Users</div>
          <div className="enuw-pulse-value">{(portfolioData.activeUsers / 1000).toFixed(1)}K</div>
          <div className="enuw-pulse-trend">
            <ArrowUp size={14} />
            +15.3%
          </div>
        </div>
        <div className="enuw-pulse-card">
          <div className="enuw-pulse-label">Momentum</div>
          <div className="enuw-pulse-value">{portfolioData.momentum || 12.5}%</div>
          <div className="enuw-pulse-trend">
            <TrendingUp size={14} />
            7d trend
          </div>
        </div>
      </div>

      {/* Vitality Index Cards */}
      <div className="enuw-vitality-grid">
        {venturesWithVitality.map(venture => (
          <Link
            key={venture.id}
            to={`/key/venture/${venture.id}`}
            className="enuw-vitality-card"
            style={{ textDecoration: 'none', borderLeft: `4px solid ${venture.color}` }}
          >
            <div className="enuw-vitality-header">
              <div className="enuw-vitality-name" style={{ color: venture.color }}>
                {venture.name}
              </div>
              {getStatusIcon(venture.status)}
            </div>
            <div className="enuw-vitality-score">{venture.vitality}</div>
            <div className="enuw-vitality-metrics">
              {venture.metrics.map((metric, idx) => (
                <div key={idx} className="enuw-vitality-metric">
                  <div className="enuw-vitality-metric-label">{metric.label}</div>
                  <div className="enuw-vitality-metric-value">{metric.value}</div>
                </div>
              ))}
            </div>
          </Link>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Hot Leads Panel */}
        <div className="enuw-hot-leads">
          <h2 className="enuw-section-title">Hot Leads</h2>
          {formattedHotLeads.map((lead, idx) => (
            <div key={idx} className="enuw-lead-item">
              <div className="enuw-lead-info">
                <div className="enuw-lead-name">{lead.name}</div>
                <div className="enuw-lead-meta">{lead.venture} • {lead.lastAction}</div>
              </div>
              <div className="enuw-lead-score">{lead.ai6}</div>
            </div>
          ))}
        </div>

        {/* Recent Activity Feed */}
        <div className="enuw-activity-feed">
          <h2 className="enuw-section-title">Recent Activity</h2>
          {formattedActivities.map((activity, idx) => {
            const venture = venturesWithVitality.find(v => v.id === activity.venture)
            return (
              <div key={idx} className="enuw-activity-item">
                <div
                  className="enuw-activity-venture"
                  style={{ background: venture?.color || S.textMuted }}
                />
                <div className="enuw-activity-content">
                  <div className="enuw-activity-text">{activity.description}</div>
                  <div className="enuw-activity-time">{activity.time}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
