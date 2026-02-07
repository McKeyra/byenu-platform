import React, { useState } from 'react'
import { S } from '../../../theme/sport-constants.js'
import { Search, Filter, Phone, Mail, FileText, Target } from 'lucide-react'
import { useLeads, useVentures } from '../../../hooks/useEnuw.js'
import { DashboardLoadingSkeleton, ErrorState } from '../../../components/dashboard/LoadingState.jsx'
import { formatDistanceToNow } from 'date-fns'

export default function LeadsManagement() {
  const [selectedLead, setSelectedLead] = useState(null)
  const [filters, setFilters] = useState({})
  const [searchQuery, setSearchQuery] = useState('')
  
  const { data: leads, isLoading, error } = useLeads({
    ...filters,
    search: searchQuery || undefined
  })
  const { data: ventures } = useVentures()

  if (isLoading) {
    return <DashboardLoadingSkeleton theme="sport" />
  }

  if (error) {
    return <ErrorState message="Failed to load leads" />
  }

  // Create venture map for lookups
  const ventureMap = {}
  ventures?.forEach(v => {
    ventureMap[v.id] = v.slug
  })

  // Format leads data
  const formattedLeads = leads?.map(lead => ({
    ...lead,
    name: lead.company_name,
    venture: ventureMap[lead.venture_id] || lead.venture_id,
    ai6: lead.ai6_score,
    tier: lead.tier,
    lastContact: lead.last_contact_at ? formatDistanceToNow(new Date(lead.last_contact_at), { addSuffix: true }) : 'Never',
    created: formatDistanceToNow(new Date(lead.created_at), { addSuffix: true })
  })) || []

  const getTierColor = (tier) => {
    switch (tier) {
      case 'hot': return S.accentRed
      case 'warm': return S.accentOrange
      default: return S.textMuted
    }
  }

  return (
    <div>
      <style>{`
        .enuw-leads-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .enuw-leads-title {
          font-family: 'Inter', sans-serif;
          font-size: 42px;
          font-weight: 800;
          color: ${S.text};
          letter-spacing: -1.5px;
          text-transform: uppercase;
        }
        .enuw-leads-filters {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
        }
        .enuw-leads-search {
          position: relative;
          flex: 1;
        }
        .enuw-leads-search input {
          width: 100%;
          padding: 12px 16px 12px 44px;
          background: ${S.surface};
          border: 1px solid ${S.border};
          border-radius: 10px;
          color: ${S.text};
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          outline: none;
        }
        .enuw-leads-search input:focus {
          border-color: ${S.primary};
        }
        .enuw-leads-search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: ${S.textMuted};
        }
        .enuw-leads-table {
          background: ${S.surface};
          border: 1px solid ${S.border};
          border-radius: 16px;
          overflow: hidden;
        }
        .enuw-leads-table-header {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
          gap: 16px;
          padding: 16px 24px;
          background: ${S.elevated};
          border-bottom: 1px solid ${S.border};
        }
        .enuw-leads-table-header-cell {
          font-size: 11px;
          font-weight: 800;
          color: ${S.textMuted};
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .enuw-leads-table-row {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
          gap: 16px;
          padding: 16px 24px;
          border-bottom: 1px solid ${S.border};
          cursor: pointer;
          transition: background 0.15s;
        }
        .enuw-leads-table-row:hover {
          background: ${S.elevated};
        }
        .enuw-leads-table-row:last-child {
          border-bottom: none;
        }
        .enuw-lead-name {
          font-weight: 600;
          color: ${S.text};
        }
        .enuw-lead-venture {
          font-size: 12px;
          color: ${S.textSecondary};
        }
        .enuw-lead-score {
          font-family: 'JetBrains Mono', monospace;
          font-size: 18px;
          font-weight: 600;
          color: ${S.accentLime};
        }
        .enuw-lead-tier {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
        }
        .enuw-lead-tier.hot {
          background: ${S.accentRed}20;
          color: ${S.accentRed};
        }
        .enuw-lead-tier.warm {
          background: ${S.accentOrange}20;
          color: ${S.accentOrange};
        }
        .enuw-lead-meta {
          font-size: 12px;
          color: ${S.textMuted};
        }
      `}</style>

      <div className="enuw-leads-header">
        <h1 className="enuw-leads-title">Leads Management</h1>
      </div>

      <div className="enuw-leads-filters">
        <div className="enuw-leads-search">
          <Search className="enuw-leads-search-icon" size={18} />
          <input 
            type="text" 
            placeholder="Search leads..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button style={{ padding: '12px 20px', background: S.surface, border: `1px solid ${S.border}`, borderRadius: '10px', color: S.text, cursor: 'pointer' }}>
          <Filter size={18} style={{ display: 'inline', verticalAlign: 'middle' }} />
        </button>
      </div>

      {formattedLeads.length === 0 ? (
        <div style={{ padding: '48px', textAlign: 'center', color: S.textMuted }}>
          {searchQuery ? 'No leads found matching your search' : 'No leads yet. Create your first lead!'}
        </div>
      ) : (
        <div className="enuw-leads-table">
          <div className="enuw-leads-table-header">
            <div className="enuw-leads-table-header-cell">Company</div>
            <div className="enuw-leads-table-header-cell">AI6 Score</div>
            <div className="enuw-leads-table-header-cell">Tier</div>
            <div className="enuw-leads-table-header-cell">Venture</div>
            <div className="enuw-leads-table-header-cell">Last Contact</div>
            <div className="enuw-leads-table-header-cell">Created</div>
          </div>
          {formattedLeads.map(lead => (
          <div
            key={lead.id}
            className="enuw-leads-table-row"
            onClick={() => setSelectedLead(lead)}
          >
            <div>
              <div className="enuw-lead-name">{lead.name}</div>
            </div>
            <div className="enuw-lead-score">{lead.ai6}</div>
            <div>
              <span className={`enuw-lead-tier ${lead.tier}`}>
                {lead.tier === 'hot' && '🔥'} {lead.tier}
              </span>
            </div>
            <div className="enuw-lead-venture">{lead.venture}</div>
            <div className="enuw-lead-meta">{lead.lastContact}</div>
            <div className="enuw-lead-meta">{lead.created}</div>
          </div>
        ))}
        </div>
      )}
    </div>
  )
}
