import React from 'react'
import { S } from '../../../theme/sport-constants.js'
import { Clock, CheckCircle, Target, Zap } from 'lucide-react'

export default function GoldenHour() {
  const priorities = [
    { id: 1, text: 'Review Vance prediction model accuracy', impact: 'high', venture: 'vance' },
    { id: 2, text: 'Follow up with TechCorp Inc deal', impact: 'high', venture: 'vance' },
    { id: 3, text: 'Approve enuwWEB marketing campaign', impact: 'medium', venture: 'enuwweb' },
  ]

  return (
    <div>
      <style>{`
        .enuw-golden-header {
          margin-bottom: 32px;
        }
        .enuw-golden-title {
          font-family: 'Inter', sans-serif;
          font-size: 42px;
          font-weight: 800;
          color: ${S.accentGold};
          letter-spacing: -1.5px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .enuw-golden-subtitle {
          color: ${S.textSecondary};
          font-size: 16px;
        }
        .enuw-golden-window {
          background: ${S.surface};
          border: 2px solid ${S.accentGold};
          border-radius: 20px;
          padding: 32px;
          margin-bottom: 32px;
          text-align: center;
        }
        .enuw-golden-time {
          font-family: 'JetBrains Mono', monospace;
          font-size: 48px;
          font-weight: 600;
          color: ${S.accentGold};
          margin-bottom: 8px;
        }
        .enuw-golden-label {
          font-size: 14px;
          color: ${S.textSecondary};
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .enuw-priorities {
          background: ${S.surface};
          border: 1px solid ${S.border};
          border-radius: 20px;
          padding: 32px;
        }
        .enuw-priority-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          border: 1px solid ${S.border};
          border-radius: 12px;
          margin-bottom: 12px;
        }
        .enuw-priority-checkbox {
          width: 24px;
          height: 24px;
          border: 2px solid ${S.border};
          border-radius: 6px;
          cursor: pointer;
        }
        .enuw-priority-text {
          flex: 1;
          color: ${S.text};
          font-weight: 500;
        }
        .enuw-priority-impact {
          padding: 4px 12px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
        }
        .enuw-priority-impact.high {
          background: ${S.accentRed}20;
          color: ${S.accentRed};
        }
        .enuw-priority-impact.medium {
          background: ${S.accentOrange}20;
          color: ${S.accentOrange};
        }
      `}</style>

      <div className="enuw-golden-header">
        <h1 className="enuw-golden-title">Golden Hour</h1>
        <p className="enuw-golden-subtitle">11:11am - 2:22pm • Peak Execution Window</p>
      </div>

      <div className="enuw-golden-window">
        <div className="enuw-golden-time">11:11 - 14:22</div>
        <div className="enuw-golden-label">Today's Golden Hour</div>
      </div>

      <div className="enuw-priorities">
        <h2 style={{ fontFamily: 'Inter', fontSize: '18px', fontWeight: 700, color: S.text, marginBottom: '24px' }}>
          Today's Priorities
        </h2>
        {priorities.map(priority => (
          <div key={priority.id} className="enuw-priority-item">
            <div className="enuw-priority-checkbox" />
            <div className="enuw-priority-text">{priority.text}</div>
            <span className={`enuw-priority-impact ${priority.impact}`}>
              {priority.impact} impact
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
