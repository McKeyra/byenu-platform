import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { S } from '../../../theme/sport-constants.js'
import { Target, Save } from 'lucide-react'
import { useCreateLead, useVentures } from '../../../hooks/useEnuw.js'
import { toast } from 'sonner'

export default function AI6Scoring() {
  const navigate = useNavigate()
  const { data: ventures } = useVentures()
  const createLeadMutation = useCreateLead()
  
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    city: '',
    website: '',
    email: '',
    ownerName: '',
    employeeCount: '',
    ventureId: '',
  })

  const dimensions = [
    { id: 'market-fit', label: 'Market Fit', weight: 25, score: 0 },
    { id: 'financial-capacity', label: 'Financial Capacity', weight: 20, score: 0 },
    { id: 'digital-readiness', label: 'Digital Readiness', weight: 15, score: 0 },
    { id: 'growth-trajectory', label: 'Growth Trajectory', weight: 15, score: 0 },
    { id: 'competitive-position', label: 'Competitive Position', weight: 10, score: 0 },
    { id: 'team-strength', label: 'Team Strength', weight: 10, score: 0 },
    { id: 'network-effect', label: 'Network Effect', weight: 5, score: 0 },
  ]

  const calculateAI6 = () => {
    // Mock calculation - replace with real AI logic
    return Math.floor(Math.random() * 40) + 60
  }

  const [ai6Score, setAi6Score] = useState(null)

  return (
    <div>
      <style>{`
        .enuw-scoring-header {
          margin-bottom: 32px;
        }
        .enuw-scoring-title {
          font-family: 'Inter', sans-serif;
          font-size: 42px;
          font-weight: 800;
          color: ${S.text};
          letter-spacing: -1.5px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .enuw-scoring-subtitle {
          color: ${S.textSecondary};
          font-size: 16px;
        }
        .enuw-scoring-form {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-bottom: 32px;
        }
        .enuw-form-group {
          display: flex;
          flex-direction: column;
        }
        .enuw-form-label {
          font-size: 11px;
          font-weight: 800;
          color: ${S.textMuted};
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }
        .enuw-form-input {
          padding: 12px 16px;
          background: ${S.surface};
          border: 1px solid ${S.border};
          border-radius: 10px;
          color: ${S.text};
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          outline: none;
        }
        .enuw-form-input:focus {
          border-color: ${S.primary};
        }
        .enuw-score-display {
          background: ${S.surface};
          border: 1px solid ${S.border};
          border-radius: 20px;
          padding: 48px;
          text-align: center;
          margin-bottom: 32px;
        }
        .enuw-score-value {
          font-family: 'JetBrains Mono', monospace;
          font-size: 72px;
          font-weight: 600;
          color: ${ai6Score ? S.accentLime : S.textMuted};
          margin-bottom: 16px;
        }
        .enuw-dimensions {
          background: ${S.surface};
          border: 1px solid ${S.border};
          border-radius: 20px;
          padding: 32px;
        }
        .enuw-dimension-item {
          margin-bottom: 24px;
        }
        .enuw-dimension-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        .enuw-dimension-label {
          font-weight: 600;
          color: ${S.text};
        }
        .enuw-dimension-weight {
          font-size: 12px;
          color: ${S.textMuted};
        }
        .enuw-dimension-bar {
          height: 8px;
          background: ${S.elevated};
          border-radius: 4px;
          overflow: hidden;
        }
        .enuw-dimension-fill {
          height: 100%;
          background: ${S.primary};
          border-radius: 4px;
          transition: width 0.3s;
        }
      `}</style>

      <div className="enuw-scoring-header">
        <h1 className="enuw-scoring-title">AI6 Scoring Engine</h1>
        <p className="enuw-scoring-subtitle">
          Calculate the AI6 score for a potential lead
        </p>
      </div>

      <div className="enuw-scoring-form">
        {Object.entries(formData).map(([key, value]) => {
          if (key === 'ventureId') {
            return (
              <div key={key} className="enuw-form-group">
                <label className="enuw-form-label">Venture</label>
                <select
                  className="enuw-form-input"
                  value={value}
                  onChange={(e) => {
                    setFormData({ ...formData, [key]: e.target.value })
                    setAi6Score(null)
                  }}
                >
                  <option value="">Select a venture</option>
                  {ventures?.map(v => (
                    <option key={v.id} value={v.id}>{v.name}</option>
                  ))}
                </select>
              </div>
            )
          }
          return (
            <div key={key} className="enuw-form-group">
              <label className="enuw-form-label">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <input
                type={key === 'email' ? 'email' : key === 'website' ? 'url' : 'text'}
                className="enuw-form-input"
                value={value}
                onChange={(e) => {
                  setFormData({ ...formData, [key]: e.target.value })
                  setAi6Score(null) // Reset score on change
                }}
                placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
              />
            </div>
          )
        })}
      </div>

      {formData.companyName && (
        <div className="enuw-score-display">
          <div className="enuw-score-value">
            {ai6Score || '--'}
          </div>
          <div style={{ color: S.textSecondary, fontSize: '14px' }}>AI6 Score</div>
          {!ai6Score && (
            <button
              onClick={() => setAi6Score(calculateAI6())}
              style={{
                marginTop: '24px',
                padding: '12px 24px',
                background: S.primary,
                color: S.text,
                border: 'none',
                borderRadius: '10px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Calculate Score
            </button>
          )}
        </div>
      )}

      {ai6Score && (
        <div className="enuw-dimensions">
          <h2 style={{ fontFamily: 'Inter', fontSize: '18px', fontWeight: 700, color: S.text, marginBottom: '24px' }}>
            7-Dimension Breakdown
          </h2>
          {dimensions.map(dim => (
            <div key={dim.id} className="enuw-dimension-item">
              <div className="enuw-dimension-header">
                <div className="enuw-dimension-label">{dim.label}</div>
                <div className="enuw-dimension-weight">{dim.weight}% weight</div>
              </div>
              <div className="enuw-dimension-bar">
                <div
                  className="enuw-dimension-fill"
                  style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}
                />
              </div>
            </div>
          ))}
          <button
            onClick={async () => {
              if (!formData.companyName || !formData.ventureId) {
                toast.error('Please fill in company name and select a venture')
                return
              }

              try {
                await createLeadMutation.mutateAsync({
                  company_name: formData.companyName,
                  industry: formData.industry,
                  city: formData.city,
                  website: formData.website,
                  email: formData.email,
                  owner_name: formData.ownerName,
                  employee_count: formData.employeeCount ? parseInt(formData.employeeCount) : null,
                  venture_id: formData.ventureId,
                  ai6_score: ai6Score,
                  dimensions_json: dimensions.reduce((acc, dim) => {
                    acc[dim.id] = { score: Math.floor(Math.random() * 40) + 60, weight: dim.weight }
                    return acc
                  }, {})
                })
                toast.success('Lead created successfully!')
                navigate('/key/leads')
              } catch (error) {
                toast.error('Failed to create lead: ' + error.message)
              }
            }}
            disabled={createLeadMutation.isPending || !ai6Score}
            style={{
              marginTop: '24px',
              padding: '12px 24px',
              background: S.primary,
              color: S.text,
              border: 'none',
              borderRadius: '10px',
              fontWeight: 600,
              cursor: createLeadMutation.isPending || !ai6Score ? 'not-allowed' : 'pointer',
              opacity: createLeadMutation.isPending || !ai6Score ? 0.5 : 1,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Save size={16} />
            {createLeadMutation.isPending ? 'Saving...' : 'Save as Lead'}
          </button>
        </div>
      )}
    </div>
  )
}
