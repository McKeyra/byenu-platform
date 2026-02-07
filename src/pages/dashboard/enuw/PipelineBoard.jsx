import React from 'react'
import { S } from '../../../theme/sport-constants.js'
import { DollarSign, Calendar, User } from 'lucide-react'
import { useDeals, usePipelineTotals } from '../../../hooks/useEnuw.js'
import { DashboardLoadingSkeleton, ErrorState } from '../../../components/dashboard/LoadingState.jsx'
import { useVentures } from '../../../hooks/useEnuw.js'

export default function PipelineBoard() {
  const { data: deals, isLoading: dealsLoading, error: dealsError } = useDeals({})
  const { data: totals, isLoading: totalsLoading } = usePipelineTotals({})
  const { data: ventures } = useVentures()

  if (dealsLoading || totalsLoading) {
    return <DashboardLoadingSkeleton theme="sport" />
  }

  if (dealsError) {
    return <ErrorState message="Failed to load pipeline" />
  }

  const stages = [
    { id: 'discovery', name: 'Discovery', probability: 20 },
    { id: 'proposal', name: 'Proposal', probability: 40 },
    { id: 'negotiation', name: 'Negotiation', probability: 60 },
    { id: 'contract', name: 'Contract', probability: 80 },
    { id: 'closed', name: 'Closed', probability: 100 },
  ]

  // Create venture color map
  const ventureColors = {}
  ventures?.forEach(v => {
    ventureColors[v.id] = v.color || S.enuwWeb
  })

  // Format deals data
  const formattedDeals = deals?.map(deal => ({
    ...deal,
    company: deal.company_name,
    value: parseFloat(deal.value || 0),
    days: deal.days_in_stage || 0,
    owner: deal.assigned_to ? 'MP' : 'Unassigned',
    venture: deal.venture_id
  })) || []

  return (
    <div>
      <style>{`
        .enuw-pipeline-header {
          margin-bottom: 32px;
        }
        .enuw-pipeline-title {
          font-family: 'Inter', sans-serif;
          font-size: 42px;
          font-weight: 800;
          color: ${S.text};
          letter-spacing: -1.5px;
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .enuw-pipeline-metrics {
          display: flex;
          gap: 24px;
        }
        .enuw-pipeline-metric {
          font-family: 'JetBrains Mono', monospace;
          font-size: 24px;
          font-weight: 600;
          color: ${S.text};
        }
        .enuw-pipeline-metric-label {
          font-size: 11px;
          color: ${S.textMuted};
          text-transform: uppercase;
          margin-bottom: 4px;
        }
        .enuw-pipeline-board {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
          margin-top: 32px;
        }
        .enuw-pipeline-column {
          background: ${S.surface};
          border: 1px solid ${S.border};
          border-radius: 16px;
          padding: 16px;
          min-height: 600px;
        }
        .enuw-pipeline-column-header {
          margin-bottom: 16px;
        }
        .enuw-pipeline-column-title {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: ${S.text};
          margin-bottom: 4px;
        }
        .enuw-pipeline-column-probability {
          font-size: 11px;
          color: ${S.textMuted};
        }
        .enuw-deal-card {
          background: ${S.elevated};
          border: 1px solid ${S.border};
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 12px;
          cursor: pointer;
          transition: all 0.15s;
        }
        .enuw-deal-card:hover {
          border-color: ${S.borderLight};
          transform: translateY(-2px);
        }
        .enuw-deal-company {
          font-weight: 600;
          color: ${S.text};
          margin-bottom: 8px;
        }
        .enuw-deal-value {
          font-family: 'JetBrains Mono', monospace;
          font-size: 18px;
          font-weight: 600;
          color: ${S.accentLime};
          margin-bottom: 8px;
        }
        .enuw-deal-meta {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          color: ${S.textMuted};
        }
        .enuw-deal-venture {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-top: 4px;
        }
      `}</style>

      <div className="enuw-pipeline-header">
        <h1 className="enuw-pipeline-title">Pipeline Board</h1>
        <div className="enuw-pipeline-metrics">
          <div>
            <div className="enuw-pipeline-metric-label">Total Pipeline</div>
            <div className="enuw-pipeline-metric">
              ${totals ? (totals.totalPipeline / 1000).toFixed(0) : 0}K
            </div>
          </div>
          <div>
            <div className="enuw-pipeline-metric-label">Weighted Value</div>
            <div className="enuw-pipeline-metric">
              ${totals ? (totals.weightedValue / 1000).toFixed(0) : 0}K
            </div>
          </div>
          <div>
            <div className="enuw-pipeline-metric-label">Avg. Velocity</div>
            <div className="enuw-pipeline-metric">
              {totals?.avgVelocity || 0} days
            </div>
          </div>
        </div>
      </div>

      <div className="enuw-pipeline-board">
        {stages.map(stage => {
          const stageDeals = formattedDeals.filter(d => d.stage === stage.id)
          return (
            <div key={stage.id} className="enuw-pipeline-column">
              <div className="enuw-pipeline-column-header">
                <div className="enuw-pipeline-column-title">{stage.name}</div>
                <div className="enuw-pipeline-column-probability">{stage.probability}%</div>
              </div>
              {stageDeals.map(deal => (
                <div key={deal.id} className="enuw-deal-card">
                  <div className="enuw-deal-company">{deal.company}</div>
                  <div className="enuw-deal-value">${(deal.value / 1000).toFixed(0)}K</div>
                  <div className="enuw-deal-meta">
                    <span>{deal.days}d in stage</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div
                        className="enuw-deal-venture"
                        style={{ background: ventureColors[deal.venture] }}
                      />
                      <span>{deal.owner}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}
