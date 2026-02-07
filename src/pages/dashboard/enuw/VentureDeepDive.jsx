import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { S } from '../../../theme/sport-constants.js'
import { ArrowLeft, TrendingUp, DollarSign, Users, Calendar } from 'lucide-react'
import { useVenture, useVentureMetrics, useVitalityIndex } from '../../../hooks/useEnuw.js'
import { DashboardLoadingSkeleton, ErrorState } from '../../../components/dashboard/LoadingState.jsx'
import { RevenueChart } from '../../../components/dashboard/Chart.jsx'

export default function VentureDeepDive() {
  const { id } = useParams()
  const { data: venture, isLoading: ventureLoading, error: ventureError } = useVenture(id)
  const { data: metrics, isLoading: metricsLoading } = useVentureMetrics(venture?.id, 90)
  const { data: vitality } = useVitalityIndex(venture?.id)

  if (ventureLoading || metricsLoading) {
    return <DashboardLoadingSkeleton theme="sport" />
  }

  if (ventureError || !venture) {
    return <ErrorState message="Failed to load venture data" />
  }

  const ventureColor = venture.color || S.enuwWeb
  const mrr = metrics?.find(m => m.metric_name === 'mrr')?.value || 0
  
  // Format chart data
  const chartData = metrics
    ?.filter(m => m.metric_name === 'mrr')
    .map(m => ({
      date: new Date(m.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      revenue: parseFloat(m.value || 0)
    })) || []

  return (
    <div>
      <style>{`
        .enuw-venture-header {
          margin-bottom: 32px;
        }
        .enuw-venture-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: ${S.textSecondary};
          text-decoration: none;
          font-size: 14px;
          margin-bottom: 16px;
          transition: color 0.15s;
        }
        .enuw-venture-back:hover {
          color: ${S.text};
        }
        .enuw-venture-title {
          font-family: 'Inter', sans-serif;
          font-size: 48px;
          font-weight: 800;
          color: ${venture.color};
          letter-spacing: -1.5px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .enuw-venture-subtitle {
          color: ${S.textSecondary};
          font-size: 16px;
        }
        .enuw-venture-metrics {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 32px;
        }
        .enuw-venture-metric {
          background: ${S.surface};
          border: 1px solid ${S.border};
          border-radius: 16px;
          padding: 24px;
        }
        .enuw-venture-metric-label {
          font-size: 11px;
          color: ${S.textMuted};
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }
        .enuw-venture-metric-value {
          font-family: 'JetBrains Mono', monospace;
          font-size: 32px;
          font-weight: 600;
          color: ${S.text};
        }
        .enuw-venture-chart {
          background: ${S.surface};
          border: 1px solid ${S.border};
          border-radius: 20px;
          padding: 32px;
          margin-bottom: 32px;
          height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${S.textMuted};
        }
      `}</style>

      <div className="enuw-venture-header">
        <Link to="/key/dashboard" className="enuw-venture-back">
          <ArrowLeft size={16} />
          Back to Command Center
        </Link>
        <h1 className="enuw-venture-title" style={{ color: ventureColor }}>
          {venture.name}
        </h1>
        <p className="enuw-venture-subtitle">
          Target Valuation: ${venture.target_valuation ? (venture.target_valuation / 1000000000).toFixed(0) : '0'}B
        </p>
      </div>

      <div className="enuw-venture-metrics">
        <div className="enuw-venture-metric">
          <div className="enuw-venture-metric-label">MRR</div>
          <div className="enuw-venture-metric-value">${(mrr / 1000).toFixed(0)}K</div>
        </div>
        <div className="enuw-venture-metric">
          <div className="enuw-venture-metric-label">Revenue (90d)</div>
          <div className="enuw-venture-metric-value">${(mrr * 3 / 1000).toFixed(0)}K</div>
        </div>
        <div className="enuw-venture-metric">
          <div className="enuw-venture-metric-label">Growth Rate</div>
          <div className="enuw-venture-metric-value">+12.5%</div>
        </div>
        <div className="enuw-venture-metric">
          <div className="enuw-venture-metric-label">Vitality Index</div>
          <div className="enuw-venture-metric-value">{vitality || 75}</div>
        </div>
      </div>

      <div className="enuw-venture-chart">
        {chartData.length > 0 ? (
          <RevenueChart data={chartData} color={ventureColor} />
        ) : (
          <div style={{ textAlign: 'center', color: S.textMuted }}>
            <TrendingUp size={48} style={{ marginBottom: '12px', opacity: 0.3 }} />
            <div>No revenue data yet</div>
          </div>
        )}
      </div>
    </div>
  )
}
