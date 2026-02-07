import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { C } from '../../../theme/constants.js'
import { TrendingUp, Users, Clock, MousePointerClick, Download } from 'lucide-react'
import { useUserWebsites, useWebsiteAnalytics } from '../../../hooks/useDashboard.js'
import { DashboardLoadingSkeleton, ErrorState } from '../../../components/dashboard/LoadingState.jsx'
import { VisitorTrendChart, TrafficSourcesChart } from '../../../components/dashboard/Chart.jsx'

export default function DashboardAnalytics() {
  const [dateRange, setDateRange] = useState('30d')
  const { data: websites } = useUserWebsites()
  const website = websites?.[0]
  const { data: analytics, isLoading, error } = useWebsiteAnalytics(website?.id, dateRange)

  if (isLoading) {
    return <DashboardLoadingSkeleton theme="corp" />
  }

  if (error) {
    return <ErrorState message="Failed to load analytics" />
  }

  if (!website) {
    return (
      <div style={{ padding: '48px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Fraunces', fontSize: '24px', color: C.charcoal }}>
          No website found
        </h2>
        <p style={{ color: C.gray }}>Create a website to view analytics</p>
      </div>
    )
  }

  // Format analytics data
  const metrics = {
    visitors: { 
      value: analytics?.visitors || 0, 
      change: '+12%', 
      label: 'Unique Visitors' 
    },
    pageViews: { 
      value: analytics?.pageViews || 0, 
      change: '+8%', 
      label: 'Page Views' 
    },
    avgTime: { 
      value: '2:34', 
      change: '+5%', 
      label: 'Avg. Time on Site' 
    },
    bounceRate: { 
      value: '42%', 
      change: '-3%', 
      label: 'Bounce Rate' 
    },
  }

  const topPages = analytics?.topPages || []
  const trafficSources = analytics?.trafficSources || []

  // Format chart data (mock for now - would need time-series data)
  const chartData = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    visitors: Math.floor(Math.random() * 200) + 50
  }))

  return (
    <div>
      <style>{`
        .byenu-analytics-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }
        .byenu-analytics-title {
          font-family: 'Fraunces', serif;
          font-size: 32px;
          font-weight: 600;
          color: ${C.charcoal};
        }
        .byenu-date-selector {
          display: flex;
          gap: 8px;
        }
        .byenu-date-btn {
          padding: 8px 16px;
          border: 2px solid ${C.border};
          background: ${C.white};
          color: ${C.gray};
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        .byenu-date-btn.active {
          border-color: ${C.mint};
          background: ${C.mint};
          color: white;
        }
        .byenu-metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }
        .byenu-metric-card {
          background: ${C.white};
          border: 1px solid ${C.border};
          border-radius: 16px;
          padding: 24px;
        }
        .byenu-metric-label {
          font-size: 13px;
          color: ${C.gray};
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 12px;
        }
        .byenu-metric-value {
          font-family: 'Fraunces', serif;
          font-size: 36px;
          font-weight: 600;
          color: ${C.charcoal};
          margin-bottom: 8px;
        }
        .byenu-metric-change {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 14px;
          font-weight: 600;
          color: ${C.success};
        }
        .byenu-chart-container {
          background: ${C.white};
          border: 1px solid ${C.border};
          border-radius: 20px;
          padding: 32px;
          margin-bottom: 32px;
        }
        .byenu-chart-title {
          font-family: 'Fraunces', serif;
          font-size: 20px;
          font-weight: 600;
          color: ${C.charcoal};
          margin-bottom: 24px;
        }
        .byenu-chart-placeholder {
          height: 300px;
          background: ${C.cream};
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${C.gray};
        }
        .byenu-top-pages {
          background: ${C.white};
          border: 1px solid ${C.border};
          border-radius: 20px;
          padding: 24px;
        }
        .byenu-top-pages-title {
          font-family: 'Fraunces', serif;
          font-size: 20px;
          font-weight: 600;
          color: ${C.charcoal};
          margin-bottom: 20px;
        }
        .byenu-page-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 0;
          border-bottom: 1px solid ${C.border};
        }
        .byenu-page-row:last-child {
          border-bottom: none;
        }
        .byenu-page-path {
          font-weight: 600;
          color: ${C.charcoal};
        }
        .byenu-page-stats {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .byenu-page-views {
          font-family: 'JetBrains Mono', monospace;
          color: ${C.gray};
        }
        .byenu-traffic-sources {
          background: ${C.white};
          border: 1px solid ${C.border};
          border-radius: 20px;
          padding: 24px;
        }
        .byenu-source-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
        }
        .byenu-source-label {
          font-weight: 500;
          color: ${C.charcoal};
        }
        .byenu-source-bar {
          flex: 1;
          height: 8px;
          background: ${C.cream};
          border-radius: 4px;
          margin: 0 16px;
          overflow: hidden;
        }
        .byenu-source-fill {
          height: 100%;
          background: ${C.mint};
          border-radius: 4px;
        }
        .byenu-source-value {
          font-family: 'JetBrains Mono', monospace;
          color: ${C.gray};
          font-size: 14px;
        }
      `}</style>

      <div className="byenu-analytics-header">
        <h1 className="byenu-analytics-title">Analytics</h1>
        <div className="byenu-date-selector">
          {['7d', '30d', '90d', 'custom'].map(range => (
            <button
              key={range}
              className={`byenu-date-btn ${dateRange === range ? 'active' : ''}`}
              onClick={() => setDateRange(range)}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="byenu-metrics-grid">
        <div className="byenu-metric-card">
          <div className="byenu-metric-label">{metrics.visitors.label}</div>
          <div className="byenu-metric-value">{metrics.visitors.value.toLocaleString()}</div>
          <div className="byenu-metric-change">
            <TrendingUp size={14} />
            {metrics.visitors.change}
          </div>
        </div>
        <div className="byenu-metric-card">
          <div className="byenu-metric-label">{metrics.pageViews.label}</div>
          <div className="byenu-metric-value">{metrics.pageViews.value.toLocaleString()}</div>
          <div className="byenu-metric-change">
            <TrendingUp size={14} />
            {metrics.pageViews.change}
          </div>
        </div>
        <div className="byenu-metric-card">
          <div className="byenu-metric-label">{metrics.avgTime.label}</div>
          <div className="byenu-metric-value">{metrics.avgTime.value}</div>
          <div className="byenu-metric-change">
            <Clock size={14} />
            {metrics.avgTime.change}
          </div>
        </div>
        <div className="byenu-metric-card">
          <div className="byenu-metric-label">{metrics.bounceRate.label}</div>
          <div className="byenu-metric-value">{metrics.bounceRate.value}</div>
          <div className="byenu-metric-change" style={{ color: C.success }}>
            <TrendingUp size={14} />
            {metrics.bounceRate.change}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="byenu-chart-container">
        <h2 className="byenu-chart-title">Visitor Trends</h2>
        <VisitorTrendChart data={chartData} dateRange={dateRange} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Top Pages */}
        <div className="byenu-top-pages">
          <h2 className="byenu-top-pages-title">Top Pages</h2>
          {topPages.map((page, idx) => (
            <div key={idx} className="byenu-page-row">
              <div className="byenu-page-path">{page.path}</div>
              <div className="byenu-page-stats">
                <span className="byenu-page-views">{page.views.toLocaleString()}</span>
                <span style={{ fontSize: '13px', color: C.success, fontWeight: 600 }}>{page.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Traffic Sources */}
        <div className="byenu-traffic-sources">
          <h2 className="byenu-top-pages-title">Traffic Sources</h2>
          {trafficSources.length > 0 ? (
            <>
              <div style={{ marginBottom: '24px' }}>
                <TrafficSourcesChart data={trafficSources} />
              </div>
              {trafficSources.map((source, idx) => (
                <div key={idx} className="byenu-source-item">
                  <div className="byenu-source-label">{source.source}</div>
                  <div className="byenu-source-bar">
                    <div className="byenu-source-fill" style={{ width: `${source.percentage}%` }} />
                  </div>
                  <div className="byenu-source-value">{source.percentage}%</div>
                </div>
              ))}
            </>
          ) : (
            <div style={{ padding: '24px', textAlign: 'center', color: C.gray }}>
              No traffic data yet
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
