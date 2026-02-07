import React from 'react'
import { Link } from 'react-router-dom'
import { C } from '../../../theme/constants.js'
import {
  Globe, Edit3, Users, Activity, TrendingUp, Clock,
  CheckCircle, AlertCircle, ArrowRight, MessageSquare
} from 'lucide-react'
import { useUserWebsites, useUserCredits, useWebsiteActivities } from '../../../hooks/useDashboard.js'
import { DashboardLoadingSkeleton, ErrorState } from '../../../components/dashboard/LoadingState.jsx'
import { formatDistanceToNow } from 'date-fns'

export default function DashboardOverview() {
  const { data: websites, isLoading: websitesLoading, error: websitesError } = useUserWebsites()
  const { data: credits, isLoading: creditsLoading } = useUserCredits()
  const website = websites?.[0] // Get first website for now
  const { data: activities, isLoading: activitiesLoading } = useWebsiteActivities(website?.id, 10)

  if (websitesLoading || creditsLoading) {
    return <DashboardLoadingSkeleton theme="corp" />
  }

  if (websitesError) {
    return <ErrorState message="Failed to load dashboard data" />
  }

  if (!website) {
    return (
      <div style={{ padding: '48px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Fraunces', fontSize: '24px', color: C.charcoal, marginBottom: '16px' }}>
          No website found
        </h2>
        <p style={{ color: C.gray, marginBottom: '24px' }}>
          Create your first website to get started
        </p>
        <Link to="/wizard-selector" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 24px',
          background: C.mint,
          color: 'white',
          borderRadius: '12px',
          textDecoration: 'none',
          fontWeight: 600
        }}>
          <Edit3 size={18} />
          Create Website
        </Link>
      </div>
    )
  }

  // Format data
  const siteData = {
    name: website.name || "Your Website",
    status: website.status || "draft",
    lastEdit: website.updated_at ? formatDistanceToNow(new Date(website.updated_at), { addSuffix: true }) : 'Never',
    visitors24h: 142, // TODO: Get from analytics
    visitors7d: 892, // TODO: Get from analytics
    visitors30d: 3421, // TODO: Get from analytics
    uptime: "99.9%",
    creditBalance: credits?.balance || 0,
    creditLimit: credits?.limit || 1000
  }

  const recentActivity = activities?.map(activity => ({
    type: activity.activity_type,
    description: activity.description,
    time: formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })
  })) || []

  return (
    <div>
      <style>{`
        .byenu-overview-welcome {
          margin-bottom: 32px;
        }
        .byenu-welcome-title {
          font-family: 'Fraunces', serif;
          font-size: 36px;
          font-weight: 600;
          color: ${C.charcoal};
          margin-bottom: 8px;
        }
        .byenu-welcome-subtitle {
          color: ${C.gray};
          font-size: 16px;
        }
        .byenu-overview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }
        .byenu-overview-card {
          background: ${C.white};
          border: 1px solid ${C.border};
          border-radius: 20px;
          padding: 24px;
        }
        .byenu-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .byenu-card-title {
          font-size: 14px;
          font-weight: 600;
          color: ${C.gray};
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .byenu-card-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${C.mintGlow};
          color: ${C.mint};
        }
        .byenu-card-value {
          font-family: 'Fraunces', serif;
          font-size: 32px;
          font-weight: 600;
          color: ${C.charcoal};
          margin-bottom: 8px;
        }
        .byenu-card-label {
          font-size: 14px;
          color: ${C.gray};
        }
        .byenu-site-health {
          background: ${C.white};
          border: 1px solid ${C.border};
          border-radius: 20px;
          padding: 24px;
          margin-bottom: 24px;
        }
        .byenu-health-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 24px;
          margin-top: 24px;
        }
        .byenu-health-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .byenu-health-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .byenu-health-icon.success {
          background: ${C.successGlow};
          color: ${C.success};
        }
        .byenu-health-icon.warning {
          background: ${C.goldGlow};
          color: ${C.gold};
        }
        .byenu-quick-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 32px;
        }
        .byenu-quick-action {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          background: ${C.mint};
          color: white;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.2s;
        }
        .byenu-quick-action:hover {
          background: ${C.gold};
          color: ${C.charcoal};
          transform: translateY(-2px);
        }
        .byenu-quick-action.secondary {
          background: ${C.white};
          color: ${C.charcoal};
          border: 2px solid ${C.border};
        }
        .byenu-quick-action.secondary:hover {
          border-color: ${C.mint};
        }
        .byenu-activity-feed {
          background: ${C.white};
          border: 1px solid ${C.border};
          border-radius: 20px;
          padding: 24px;
        }
        .byenu-activity-item {
          display: flex;
          gap: 12px;
          padding: 16px 0;
          border-bottom: 1px solid ${C.border};
        }
        .byenu-activity-item:last-child {
          border-bottom: none;
        }
        .byenu-activity-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${C.cream};
          color: ${C.mint};
          flex-shrink: 0;
        }
        .byenu-activity-content {
          flex: 1;
        }
        .byenu-activity-text {
          color: ${C.charcoal};
          font-weight: 500;
          margin-bottom: 4px;
        }
        .byenu-activity-time {
          color: ${C.gray};
          font-size: 13px;
        }
        .byenu-credit-widget {
          background: linear-gradient(135deg, ${C.mint} 0%, ${C.mintLight} 100%);
          border-radius: 20px;
          padding: 24px;
          color: white;
        }
        .byenu-credit-label {
          font-size: 14px;
          opacity: 0.9;
          margin-bottom: 8px;
        }
        .byenu-credit-amount {
          font-family: 'Fraunces', serif;
          font-size: 36px;
          font-weight: 600;
          margin-bottom: 16px;
        }
        .byenu-credit-bar {
          height: 8px;
          background: rgba(255,255,255,0.2);
          border-radius: 4px;
          overflow: hidden;
        }
        .byenu-credit-fill {
          height: 100%;
          background: white;
          border-radius: 4px;
          transition: width 0.3s;
        }
      `}</style>

      <div className="byenu-overview-welcome">
        <h1 className="byenu-welcome-title">
          Welcome back, {siteData.name} 👋
        </h1>
        <p className="byenu-welcome-subtitle">
          Here's what's happening with your site today
        </p>
      </div>

      {/* Quick Actions */}
      <div className="byenu-quick-actions">
        <Link to="/dashboard/edit" className="byenu-quick-action">
          <Edit3 size={18} />
          <span>Edit with NU</span>
        </Link>
        <a href={`https://${siteData.name.toLowerCase()}.byenu.com`} target="_blank" rel="noopener noreferrer" className="byenu-quick-action secondary">
          <Globe size={18} />
          <span>View Live Site</span>
        </a>
        <button className="byenu-quick-action secondary">
          <Users size={18} />
          <span>Invite Team</span>
        </button>
      </div>

      {/* Site Health Card */}
      <div className="byenu-site-health">
        <div className="byenu-card-header">
          <h2 className="byenu-card-title">Site Health</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle size={16} color={C.success} />
            <span style={{ fontSize: '14px', color: C.success, fontWeight: 600 }}>All Systems Operational</span>
          </div>
        </div>
        <div className="byenu-health-grid">
          <div className="byenu-health-item">
            <div className="byenu-health-icon success">
              <Activity size={24} />
            </div>
            <div>
              <div style={{ fontWeight: 600, color: C.charcoal }}>Uptime</div>
              <div style={{ fontSize: '24px', fontFamily: 'Fraunces', fontWeight: 600, color: C.charcoal }}>{siteData.uptime}</div>
            </div>
          </div>
          <div className="byenu-health-item">
            <div className="byenu-health-icon success">
              <Clock size={24} />
            </div>
            <div>
              <div style={{ fontWeight: 600, color: C.charcoal }}>Last Edit</div>
              <div style={{ fontSize: '14px', color: C.gray }}>{siteData.lastEdit}</div>
            </div>
          </div>
          <div className="byenu-health-item">
            <div className="byenu-health-icon success">
              <TrendingUp size={24} />
            </div>
            <div>
              <div style={{ fontWeight: 600, color: C.charcoal }}>Visitors (24h)</div>
              <div style={{ fontSize: '24px', fontFamily: 'Fraunces', fontWeight: 600, color: C.charcoal }}>{siteData.visitors24h}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Grid */}
      <div className="byenu-overview-grid">
        <div className="byenu-overview-card">
          <div className="byenu-card-header">
            <div className="byenu-card-title">Visitors (7d)</div>
            <div className="byenu-card-icon">
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="byenu-card-value">{siteData.visitors7d}</div>
          <div className="byenu-card-label">+12% from last week</div>
        </div>

        <div className="byenu-overview-card">
          <div className="byenu-card-header">
            <div className="byenu-card-title">Visitors (30d)</div>
            <div className="byenu-card-icon">
              <Activity size={20} />
            </div>
          </div>
          <div className="byenu-card-value">{siteData.visitors30d}</div>
          <div className="byenu-card-label">+8% from last month</div>
        </div>

        <div className="byenu-credit-widget">
          <div className="byenu-credit-label">Credit Balance</div>
          <div className="byenu-credit-amount">{siteData.creditBalance} / {siteData.creditLimit}</div>
          <div className="byenu-credit-bar">
            <div className="byenu-credit-fill" style={{ width: `${(siteData.creditBalance / siteData.creditLimit) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="byenu-activity-feed">
        <div className="byenu-card-header">
          <h2 className="byenu-card-title">Recent Activity</h2>
          <Link to="/dashboard/edit" style={{ fontSize: '14px', color: C.mint, textDecoration: 'none', fontWeight: 600 }}>
            View All <ArrowRight size={14} style={{ display: 'inline', verticalAlign: 'middle' }} />
          </Link>
        </div>
        {recentActivity.map((activity, idx) => (
          <div key={idx} className="byenu-activity-item">
            <div className="byenu-activity-icon">
              {activity.type === 'edit' && <Edit3 size={20} />}
              {activity.type === 'publish' && <Globe size={20} />}
              {activity.type === 'team' && <Users size={20} />}
            </div>
            <div className="byenu-activity-content">
              <div className="byenu-activity-text">{activity.description}</div>
              <div className="byenu-activity-time">{activity.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
