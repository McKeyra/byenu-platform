import React, { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useAuth } from '../lib/auth/AuthContext.jsx'
import { getSubmission } from '../api/submissions.js'
import { getReport } from '../api/reports.js'
import { supabase } from '../lib/supabase.js'
import PageLayout from '../components/layout/PageLayout.jsx'
import { C } from '../theme/constants.js'
import { 
  FileText, Globe, CreditCard, Settings, Mail, AlertCircle, 
  MessageSquare, Layers, BarChart3, ChevronDown, ChevronUp,
  Zap, Users, TrendingUp, Eye, EyeOff, Maximize2, Minimize2,
  Sparkles, Brain, Target, ArrowRight, Send, Loader2
} from 'lucide-react'

// ─── DEPTH LEVELS ───
const DEPTH_LEVELS = {
  overview: { label: 'Overview', icon: Eye, depth: 1, description: 'High-level summary' },
  detailed: { label: 'Detailed', icon: Layers, depth: 2, description: 'In-depth analysis' },
  expert: { label: 'Expert', icon: Brain, depth: 3, description: 'Technical deep dive' },
}

// ─── CHAT MODES ───
const CHAT_MODES = {
  assistant: { label: 'AI Assistant', icon: Sparkles, color: C.mint },
  conversational: { label: 'Conversational', icon: MessageSquare, color: C.gold },
  technical: { label: 'Technical', icon: Brain, color: C.coral },
}

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
  .dashboard-tabs {
    display: flex;
    gap: 8px;
    margin-bottom: 24px;
    border-bottom: 2px solid ${C.border};
    flex-wrap: wrap;
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
  .depth-selector {
    display: flex;
    gap: 8px;
    padding: 8px;
    background: ${C.cream};
    border-radius: 12px;
    margin-bottom: 24px;
  }
  .depth-btn {
    flex: 1;
    padding: 10px 16px;
    border: 1px solid ${C.border};
    border-radius: 8px;
    background: white;
    color: ${C.gray};
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }
  .depth-btn:hover {
    border-color: ${C.mint};
    color: ${C.mint};
  }
  .depth-btn.active {
    border-color: ${C.mint};
    background: ${C.mintGlow};
    color: ${C.mint};
  }
  .chat-mode-selector {
    display: flex;
    gap: 8px;
    margin-bottom: 24px;
  }
  .chat-mode-btn {
    padding: 10px 18px;
    border: 2px solid ${C.border};
    border-radius: 12px;
    background: white;
    color: ${C.gray};
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .chat-mode-btn:hover {
    border-color: ${C.mint};
  }
  .chat-mode-btn.active {
    border-color: ${C.mint};
    background: ${C.mintGlow};
    color: ${C.mint};
  }
  .chat-container {
    background: white;
    border: 1px solid ${C.border};
    border-radius: 20px;
    padding: 24px;
    height: 500px;
    display: flex;
    flex-direction: column;
  }
  .chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 16px 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .chat-message {
    display: flex;
    gap: 12px;
    align-items: flex-start;
  }
  .chat-message.user {
    flex-direction: row-reverse;
  }
  .chat-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .chat-bubble {
    max-width: 70%;
    padding: 12px 16px;
    border-radius: 16px;
    font-size: 14px;
    line-height: 1.5;
  }
  .chat-bubble.assistant {
    background: ${C.cream};
    color: ${C.charcoal};
  }
  .chat-bubble.user {
    background: ${C.mint};
    color: white;
  }
  .chat-input-area {
    display: flex;
    gap: 8px;
    padding-top: 16px;
    border-top: 1px solid ${C.border};
  }
  .chat-input {
    flex: 1;
    padding: 12px 16px;
    border: 1.5px solid ${C.border};
    border-radius: 12px;
    font-size: 14px;
    font-family: inherit;
    outline: none;
    transition: all 0.2s;
  }
  .chat-input:focus {
    border-color: ${C.mint};
    box-shadow: 0 0 0 4px ${C.mintGlow};
  }
  .chat-send-btn {
    padding: 12px 24px;
    background: ${C.mint};
    color: white;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: all 0.2s;
  }
  .chat-send-btn:hover {
    background: ${C.gold};
    color: ${C.charcoal};
  }
  .visual-view-toggle {
    display: flex;
    gap: 8px;
    margin-bottom: 24px;
  }
  .view-toggle-btn {
    padding: 10px 18px;
    border: 2px solid ${C.border};
    border-radius: 12px;
    background: white;
    color: ${C.gray};
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .view-toggle-btn:hover {
    border-color: ${C.mint};
  }
  .view-toggle-btn.active {
    border-color: ${C.mint};
    background: ${C.mint};
    color: white;
  }
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin-bottom: 24px;
  }
  .stat-card {
    background: white;
    border: 1px solid ${C.border};
    border-radius: 16px;
    padding: 20px;
    transition: all 0.2s;
  }
  .stat-card:hover {
    box-shadow: 0 4px 12px ${C.mintGlow};
    transform: translateY(-2px);
  }
  .stat-label {
    font-size: 12px;
    color: ${C.gray};
    margin-bottom: 8px;
  }
  .stat-value {
    font-family: 'Fraunces', serif;
    font-size: 28px;
    font-weight: 600;
    color: ${C.charcoal};
  }
  .stat-change {
    font-size: 12px;
    color: ${C.success};
    margin-top: 4px;
  }
`

export default function DashboardEnhanced() {
  const [searchParams] = useSearchParams()
  const { user, role } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [depthLevel, setDepthLevel] = useState('overview')
  const [chatMode, setChatMode] = useState('assistant')
  const [viewMode, setViewMode] = useState('cards') // 'cards' | 'list' | 'visual'
  const [submission, setSubmission] = useState(null)
  const [report, setReport] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [chatMessages, setChatMessages] = useState([])
  const [chatInput, setChatInput] = useState('')
  const [isChatLoading, setIsChatLoading] = useState(false)
  
  const isEmailVerified = user?.email_confirmed_at !== null && user?.email_confirmed_at !== undefined
  const canEdit = isEmailVerified
  const isAdmin = role === 'staff'

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

  const handleChatSend = async () => {
    if (!chatInput.trim() || isChatLoading) return

    const userMessage = chatInput.trim()
    setChatInput('')
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsChatLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = {
        assistant: `I understand you're asking about "${userMessage}". Based on your dashboard data, here's what I can help with...`,
        conversational: `Great question! Let me break that down for you in a friendly way...`,
        technical: `From a technical perspective, "${userMessage}" relates to the following system components...`,
      }
      
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: responses[chatMode] || responses.assistant 
      }])
      setIsChatLoading(false)
    }, 1000)
  }

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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <h1 className="dashboard-title">Dashboard</h1>
            {isAdmin && (
              <Link to="/command-center" style={{ fontSize: '14px', color: C.mint, fontWeight: 600 }}>
                Admin View →
              </Link>
            )}
          </div>

          {/* Depth Level Selector */}
          <div className="depth-selector">
            {Object.entries(DEPTH_LEVELS).map(([key, level]) => {
              const Icon = level.icon
              return (
                <button
                  key={key}
                  onClick={() => setDepthLevel(key)}
                  className={`depth-btn ${depthLevel === key ? 'active' : ''}`}
                >
                  <Icon size={16} />
                  {level.label}
                </button>
              )
            })}
          </div>

          {/* View Mode Toggle */}
          <div className="visual-view-toggle">
            <button
              onClick={() => setViewMode('cards')}
              className={`view-toggle-btn ${viewMode === 'cards' ? 'active' : ''}`}
            >
              <BarChart3 size={16} />
              Cards
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
            >
              <Layers size={16} />
              List
            </button>
            <button
              onClick={() => setViewMode('visual')}
              className={`view-toggle-btn ${viewMode === 'visual' ? 'active' : ''}`}
            >
              <Eye size={16} />
              Visual
            </button>
          </div>

          {/* Tabs */}
          <div className="dashboard-tabs">
            {[
              { id: 'overview', label: 'Overview', icon: FileText },
              { id: 'report', label: 'Report', icon: FileText },
              { id: 'chat', label: 'AI Chat', icon: MessageSquare },
              { id: 'website', label: 'My Website', icon: Globe },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
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

          {/* Chat Mode Selector (only for chat tab) */}
          {activeTab === 'chat' && (
            <div className="chat-mode-selector">
              {Object.entries(CHAT_MODES).map(([key, mode]) => {
                const Icon = mode.icon
                return (
                  <button
                    key={key}
                    onClick={() => setChatMode(key)}
                    className={`chat-mode-btn ${chatMode === key ? 'active' : ''}`}
                    style={chatMode === key ? { borderColor: mode.color, color: mode.color } : {}}
                  >
                    <Icon size={16} />
                    {mode.label}
                  </button>
                )
              })}
            </div>
          )}

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              {viewMode === 'cards' && (
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-label">Status</div>
                    <div className="stat-value">{submission?.status || 'N/A'}</div>
                    <div className="stat-change">Active</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label">Report</div>
                    <div className="stat-value">{report ? 'Ready' : 'Pending'}</div>
                    <div className="stat-change">{report ? 'View Report' : 'Generating...'}</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label">Website</div>
                    <div className="stat-value">{submission?.status === 'site_generated' ? 'Live' : 'Not Claimed'}</div>
                    <div className="stat-change">{submission?.status === 'site_generated' ? 'View Site' : 'Claim Now'}</div>
                  </div>
                </div>
              )}

              <div className="dashboard-card">
                <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: '24px', fontWeight: 600, color: C.charcoal, marginBottom: '24px' }}>
                  Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}!
                </h2>
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
            </div>
          )}

          {/* Chat Tab */}
          {activeTab === 'chat' && (
            <div className="chat-container">
              <div className="chat-messages">
                {chatMessages.length === 0 && (
                  <div style={{ textAlign: 'center', color: C.gray, padding: '40px 20px' }}>
                    <MessageSquare size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
                    <p style={{ fontSize: '14px' }}>Start a conversation with your AI assistant</p>
                    <p style={{ fontSize: '12px', marginTop: '8px', opacity: 0.7 }}>
                      Ask about your website, report, or get help with next steps
                    </p>
                  </div>
                )}
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`chat-message ${msg.role}`}>
                    <div className="chat-avatar" style={{ background: msg.role === 'user' ? C.mint : C.cream }}>
                      {msg.role === 'user' ? (
                        <Users size={18} style={{ color: 'white' }} />
                      ) : (
                        <Sparkles size={18} style={{ color: C.mint }} />
                      )}
                    </div>
                    <div className={`chat-bubble ${msg.role}`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isChatLoading && (
                  <div className="chat-message">
                    <div className="chat-avatar" style={{ background: C.cream }}>
                      <Loader2 size={18} style={{ color: C.mint }} className="animate-spin" />
                    </div>
                    <div className="chat-bubble assistant">Thinking...</div>
                  </div>
                )}
              </div>
              <div className="chat-input-area">
                <input
                  type="text"
                  className="chat-input"
                  placeholder={`Ask me anything about your ${chatMode === 'technical' ? 'technical setup' : 'website'}...`}
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleChatSend()}
                />
                <button className="chat-send-btn" onClick={handleChatSend} disabled={isChatLoading}>
                  <Send size={16} />
                  Send
                </button>
              </div>
            </div>
          )}

          {/* Report Tab */}
          {activeTab === 'report' && report && (
            <div className="dashboard-card">
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: '24px', fontWeight: 600, color: C.charcoal, marginBottom: '24px' }}>
                Your Website Report
              </h2>
              
              {depthLevel === 'overview' && report.breakdown_json && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div>
                    <div style={{ fontSize: '13px', color: C.gray, marginBottom: '4px' }}>Focus</div>
                    <div style={{ fontWeight: 600, color: C.charcoal }}>{report.breakdown_json.focus}</div>
                  </div>
                </div>
              )}

              {depthLevel === 'detailed' && report.breakdown_json && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div>
                    <div style={{ fontSize: '13px', color: C.gray, marginBottom: '4px' }}>Focus</div>
                    <div style={{ fontWeight: 600, color: C.charcoal }}>{report.breakdown_json.focus}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', color: C.gray, marginBottom: '4px' }}>Fonts</div>
                    <div style={{ fontWeight: 600, color: C.charcoal }}>
                      {report.breakdown_json.fonts?.heading} / {report.breakdown_json.fonts?.body}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', color: C.gray, marginBottom: '4px' }}>Imagery</div>
                    <div style={{ fontWeight: 600, color: C.charcoal }}>{report.breakdown_json.imagery}</div>
                  </div>
                </div>
              )}

              {depthLevel === 'expert' && report.breakdown_json && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div>
                    <div style={{ fontSize: '13px', color: C.gray, marginBottom: '4px' }}>Focus</div>
                    <div style={{ fontWeight: 600, color: C.charcoal }}>{report.breakdown_json.focus}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', color: C.gray, marginBottom: '4px' }}>Fonts</div>
                    <div style={{ fontWeight: 600, color: C.charcoal }}>
                      {report.breakdown_json.fonts?.heading} / {report.breakdown_json.fonts?.body}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', color: C.gray, marginBottom: '4px' }}>Imagery</div>
                    <div style={{ fontWeight: 600, color: C.charcoal }}>{report.breakdown_json.imagery}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', color: C.gray, marginBottom: '4px' }}>Monetization</div>
                    <ul style={{ listStyle: 'disc', paddingLeft: '20px', color: C.gray }}>
                      {report.breakdown_json.monetization?.map((item, i) => (
                        <li key={i} style={{ marginBottom: '4px' }}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  {report.build_prompt && (
                    <div>
                      <div style={{ fontSize: '13px', color: C.gray, marginBottom: '4px' }}>Build Prompt</div>
                      <div style={{ fontSize: '12px', color: C.gray, background: C.cream, padding: '12px', borderRadius: '8px', fontFamily: 'monospace' }}>
                        {report.build_prompt.substring(0, 500)}...
                      </div>
                    </div>
                  )}
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
                    </div>
                  )}
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

          {activeTab === 'analytics' && (
            <div className="dashboard-card">
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: '24px', fontWeight: 600, color: C.charcoal, marginBottom: '24px' }}>
                Analytics
              </h2>
              <p style={{ color: C.gray }}>Analytics will appear here once your site is live.</p>
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
