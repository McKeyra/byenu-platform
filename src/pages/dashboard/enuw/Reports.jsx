import React from 'react'
import { S } from '../../../theme/sport-constants.js'
import { Download, FileText, Calendar } from 'lucide-react'

export default function Reports() {
  const reports = [
    { id: 1, name: 'Weekly Portfolio Summary', type: 'weekly', date: '2026-02-05', status: 'ready' },
    { id: 2, name: 'Monthly Investor Report', type: 'monthly', date: '2026-01-31', status: 'ready' },
    { id: 3, name: 'Venture Comparison Q4 2025', type: 'custom', date: '2026-01-15', status: 'ready' },
  ]

  return (
    <div>
      <style>{`
        .enuw-reports-header {
          margin-bottom: 32px;
        }
        .enuw-reports-title {
          font-family: 'Inter', sans-serif;
          font-size: 42px;
          font-weight: 800;
          color: ${S.text};
          letter-spacing: -1.5px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .enuw-reports-subtitle {
          color: ${S.textSecondary};
          font-size: 16px;
        }
        .enuw-reports-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
        }
        .enuw-report-card {
          background: ${S.surface};
          border: 1px solid ${S.border};
          border-radius: 16px;
          padding: 24px;
          transition: all 0.15s;
        }
        .enuw-report-card:hover {
          border-color: ${S.borderLight};
          transform: translateY(-2px);
        }
        .enuw-report-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: ${S.elevated};
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          color: ${S.primary};
        }
        .enuw-report-name {
          font-weight: 600;
          color: ${S.text};
          margin-bottom: 8px;
        }
        .enuw-report-meta {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: ${S.textMuted};
          margin-bottom: 16px;
        }
        .enuw-report-btn {
          width: 100%;
          padding: 10px 16px;
          background: ${S.primary};
          color: ${S.text};
          border: none;
          border-radius: 10px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .enuw-report-btn:hover {
          background: ${S.primaryDark};
        }
      `}</style>

      <div className="enuw-reports-header">
        <h1 className="enuw-reports-title">Reports & Intelligence</h1>
        <p className="enuw-reports-subtitle">
          Auto-generated reports and custom analytics
        </p>
      </div>

      <div className="enuw-reports-grid">
        {reports.map(report => (
          <div key={report.id} className="enuw-report-card">
            <div className="enuw-report-icon">
              <FileText size={24} />
            </div>
            <div className="enuw-report-name">{report.name}</div>
            <div className="enuw-report-meta">
              <span>{report.type}</span>
              <span>{report.date}</span>
            </div>
            <button className="enuw-report-btn">
              <Download size={16} />
              Download PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
