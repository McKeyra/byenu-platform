import React, { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useAuth } from '../lib/auth/AuthContext.jsx'
import { getSubmission } from '../api/submissions.js'
import { getReport } from '../api/reports.js'
import { supabase } from '../lib/supabase.js'
import PageLayout from '../components/layout/PageLayout.jsx'
import { C } from '../theme/constants.js'
import { FileText, Globe, CreditCard, Settings, Mail, AlertCircle } from 'lucide-react'

const dashboardStyles = `
  .dashboard-container {
    padding: 40px 0;
    min-height: calc(100vh - 100px);
  }
  .dashboard-title {
    font-family: 'Fraunces', serif;
    font-size: 36px;
    font-weight: 600;
    color: ${C.charcoal};
    margin-bottom: 32px;
  }
  .dashboard-card {
    background: white;
    border: 1px solid ${C.border};
    border-radius: 20px;
    padding: 32px;
    margin-bottom: 24px;
  }
  .dashboard-alert {
    display: flex;
    gap: 16px;
    padding: 20px;
    border-radius: 16px;
    margin-bottom: 24px;
  }
  .dashboard-alert-icon {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .dashboard-tabs {
    display: flex;
    gap: 8px;
    margin-bottom: 24px;
    border-bottom: 2px solid ${C.border};
  }
  .dashboard-tab {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 20px;
    border-bottom: 2px solid transparent;
    background: none;
    border: none;
    color: ${C.gray};
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.2s;
    margin-bottom: -2px;
  }
  .dashboard-tab:hover {
    color: ${C.charcoal};
  }
  .dashboard-tab.active {
    color: ${C.mint};
    border-bottom-color: ${C.mint};
  }
  .dashboard-section-title {
    font-family: 'Fraunces', serif;
    font-size: 24px;
    font-weight: 600;
    color: ${C.charcoal};
    margin-bottom: 24px;
  }
  .dashboard-info-item {
    margin-bottom: 20px;
  }
  .dashboard-info-label {
    font-size: 13px;
    color: ${C.gray};
    margin-bottom: 4px;
  }
  .dashboard-info-value {
    font-weight: 600;
    color: ${C.charcoal};
  }
  .dashboard-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: ${C.mint};
    color: white;
    padding: 14px 28px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 15px;
    border: none;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.3s ease;
    text-decoration: none;
  }
  .dashboard-btn:hover {
    background: ${C.gold};
    color: ${C.charcoal};
    transform: translateY(-2px);
  }
  .dashboard-btn-secondary {
    background: white;
    color: ${C.charcoal};
    border: 2px solid ${C.border};
  }
  .dashboard-btn-secondary:hover {
    border-color: ${C.mint};
    background: ${C.cream};
  }
`

export default function Dashboard() {
  const [searchParams] = useSearchParams()
  const { user, session } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [submission, setSubmission] = useState(null)
  const [report, setReport] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  
  const isEmailVerified = user?.email_confirmed_at !== null && user?.email_confirmed_at !== undefined
  const canEdit = isEmailVerified

  useEffect(() => {
    const loadData = async () => {
      const submissionId = searchParams.get('submission')
      if (submissionId) {
        try {
          const sub = await getSubmission(submissionId)
          setSubmission(sub)
          if (sub.report_id) {
            const rep = await getReport(sub.report_id)
            setReport(rep)
          }
        } catch (error) {
          console.error('Error loading data:', error)
        }
      }
      setIsLoading(false)
    }
    loadData()
  }, [searchParams])

  if (isLoading) {
    return (
      <PageLayout>
        <div className="enuw-container">
          <div style={{ minHeight: 'calc(100vh - 100px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'white', border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <FileText size={24} style={{ color: C.gray }} />
              </div>
              <p style={{ color: C.gray }}>Loading...</p>
            </div>
          </div>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <style>{dashboardStyles}</style>
      <div className="enuw-container">
        <div className="dashboard-container">
          <h1 className="dashboard-title">Dashboard</h1>

          {/* Email Verification Banner */}
          {user && !isEmailVerified && (
            <div className="dashboard-alert" style={{ background: `${C.gold}18`, border: `1px solid ${C.gold}` }}>
              <div className="dashboard-alert-icon" style={{ background: `${C.gold}30`, color: C.gold }}>
                <Mail size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontWeight: 600, color: C.charcoal, marginBottom: '8px' }}>Verify Your Email</h3>
                <p style={{ fontSize: '14px', color: C.gray, marginBottom: '16px', lineHeight: 1.5 }}>
                  Please check your email and click the verification link to unlock full dashboard access and start editing your website.
                </p>
                <button
                  onClick={async () => {
                    const { error } = await supabase.auth.resend({
                      type: 'signup',
                      email: user.email,
                    })
                    if (error) {
                      alert('Error sending verification email: ' + error.message)
                    } else {
                      alert('Verification email sent! Check your inbox.')
                    }
                  }}
                  className="dashboard-btn"
                  style={{ fontSize: '14px', padding: '10px 20px' }}
                >
                  Resend Verification Email
                </button>
              </div>
            </div>
          )}

          {/* Read-Only Notice */}
          {user && !canEdit && (
            <div className="dashboard-alert" style={{ background: `${C.mintLight}18`, border: `1px solid ${C.mintLight}` }}>
              <div className="dashboard-alert-icon" style={{ background: `${C.mintLight}30`, color: C.mintLight }}>
                <AlertCircle size={20} />
              </div>
              <p style={{ fontSize: '14px', color: C.gray, lineHeight: 1.5 }}>
                <strong>View Only Mode:</strong> Verify your email to unlock editing features and claim your website.
              </p>
            </div>
          )}

          {/* Tabs */}
          <div className="dashboard-tabs">
            {[
              { id: 'overview', label: 'Overview', icon: FileText },
              { id: 'report', label: 'Report', icon: FileText },
              { id: 'website', label: 'My Website', icon: Globe },
              { id: 'billing', label: 'Billing', icon: CreditCard },
              { id: 'settings', label: 'Settings', icon: Settings },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`dashboard-tab ${activeTab === tab.id ? 'active' : ''}`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Report View */}
          {activeTab === 'report' && report && (
            <div className="dashboard-card">
              <h2 className="dashboard-section-title">Your Website Report</h2>
              
              {report.breakdown_json && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div className="dashboard-info-item">
                    <div className="dashboard-info-label">Focus</div>
                    <div className="dashboard-info-value">{report.breakdown_json.focus}</div>
                  </div>
                  
                  <div className="dashboard-info-item">
                    <div className="dashboard-info-label">Fonts</div>
                    <div className="dashboard-info-value">
                      {report.breakdown_json.fonts?.heading} / {report.breakdown_json.fonts?.body}
                    </div>
                  </div>
                  
                  <div className="dashboard-info-item">
                    <div className="dashboard-info-label">Imagery</div>
                    <div className="dashboard-info-value">{report.breakdown_json.imagery}</div>
                  </div>
                  
                  <div className="dashboard-info-item">
                    <div className="dashboard-info-label">Monetization</div>
                    <ul style={{ listStyle: 'disc', paddingLeft: '20px', color: C.gray }}>
                      {report.breakdown_json.monetization?.map((item, i) => (
                        <li key={i} style={{ marginBottom: '4px' }}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {submission?.status === 'report_sent' && (
                <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: `1px solid ${C.border}` }}>
                  {canEdit ? (
                    <Link to="/claim" className="dashboard-btn" style={{ width: '100%', justifyContent: 'center' }}>
                      Claim Your Website
                    </Link>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '20px', background: C.cream, borderRadius: '12px' }}>
                      <p style={{ fontSize: '14px', color: C.gray, marginBottom: '8px' }}>
                        Verify your email to claim your website
                      </p>
                      <button
                        onClick={async () => {
                          const { error } = await supabase.auth.resend({
                            type: 'signup',
                            email: user?.email,
                          })
                          if (error) {
                            alert('Error: ' + error.message)
                          } else {
                            alert('Verification email sent!')
                          }
                        }}
                        style={{ fontSize: '14px', color: C.mint, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}
                      >
                        Resend Verification Email
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Overview */}
          {activeTab === 'overview' && (
            <div className="dashboard-card">
              <h2 className="dashboard-section-title">Welcome back!</h2>
              {submission ? (
                <div>
                  <p style={{ color: C.gray, marginBottom: '16px', lineHeight: 1.6 }}>
                    Your submission is {submission.status === 'draft' ? 'being processed' : 'ready'}.
                  </p>
                  {submission.status === 'report_sent' && (
                    <Link to="/dashboard?tab=report" className="dashboard-btn">
                      View Report
                    </Link>
                  )}
                </div>
              ) : (
                <div>
                  <p style={{ color: C.gray, marginBottom: '16px', lineHeight: 1.6 }}>Get started by building your website.</p>
                  <Link to="/wizard-selector" className="dashboard-btn">
                    Start Building
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Other tabs */}
          {activeTab === 'website' && (
            <div className="dashboard-card">
              <p style={{ color: C.gray }}>Claim your website to see it here.</p>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="dashboard-card">
              <p style={{ color: C.gray }}>No active subscription. Claim your website to choose a plan.</p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="dashboard-card">
              <p style={{ color: C.gray }}>Settings coming soon.</p>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  )
}
