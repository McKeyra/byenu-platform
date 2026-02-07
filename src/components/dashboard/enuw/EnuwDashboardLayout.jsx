import React, { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { S } from '../../../theme/sport-constants.js'
import {
  LayoutDashboard, Building2, GitBranch, Users, Target, FileText,
  Menu, X, Brain, Bell, User
} from 'lucide-react'

const navSections = [
  {
    title: 'PORTFOLIO',
    items: [
      { path: '/key/dashboard', icon: LayoutDashboard, label: 'Command Center' },
      { path: '/key/ventures', icon: Building2, label: 'Ventures' },
    ]
  },
  {
    title: 'PIPELINE',
    items: [
      { path: '/key/pipeline', icon: GitBranch, label: 'Board' },
      { path: '/key/leads', icon: Users, label: 'Leads' },
      { path: '/key/scoring', icon: Target, label: 'AI6 Scoring' },
    ]
  },
  {
    title: 'OPERATIONS',
    items: [
      { path: '/key/golden-hour', icon: Target, label: 'Golden Hour' },
      { path: '/key/reports', icon: FileText, label: 'Reports' },
    ]
  },
]

const ventures = [
  { id: 'vance', color: S.vance, name: 'Vance' },
  { id: 'b6', color: S.b6, name: 'Ball in the 6' },
  { id: 'wearus', color: S.wearUs, name: 'Wear US' },
  { id: 'enuwweb', color: S.enuwWeb, name: 'enuwWEB' },
]

export default function EnuwDashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [keyAiOpen, setKeyAiOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/')

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: S.base, color: S.text }}>
      <style>{`
        body { background: ${S.base} !important; }
        .enuw-sidebar {
          width: 280px;
          background: ${S.surface};
          border-right: 1px solid ${S.border};
          display: flex;
          flex-direction: column;
          position: fixed;
          height: 100vh;
          left: 0;
          top: 0;
          z-index: 100;
          transition: transform 0.25s ease;
        }
        @media (max-width: 768px) {
          .enuw-sidebar {
            transform: translateX(${sidebarOpen ? '0' : '-100%'});
          }
        }
        .enuw-sidebar-header {
          padding: 24px;
          border-bottom: 1px solid ${S.border};
        }
        .enuw-logo {
          font-family: 'Inter', sans-serif;
          font-size: 24px;
          font-weight: 800;
          color: ${S.theKey};
          letter-spacing: -1px;
          text-transform: uppercase;
        }
        .enuw-nav {
          flex: 1;
          padding: 16px 0;
          overflow-y: auto;
        }
        .enuw-nav-section {
          margin-bottom: 24px;
        }
        .enuw-nav-section-title {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 800;
          color: ${S.textMuted};
          text-transform: uppercase;
          letter-spacing: 1.5px;
          padding: 0 24px;
          margin-bottom: 12px;
        }
        .enuw-nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 24px;
          color: ${S.textSecondary};
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.15s ease;
          border-left: 3px solid transparent;
        }
        .enuw-nav-item:hover {
          background: ${S.elevated};
          color: ${S.text};
        }
        .enuw-nav-item.active {
          color: ${S.primary};
          background: ${S.elevated};
          border-left-color: ${S.primary};
        }
        .enuw-sidebar-footer {
          padding: 24px;
          border-top: 1px solid ${S.border};
        }
        .enuw-ventures-switch {
          display: flex;
          gap: 8px;
          margin-bottom: 16px;
        }
        .enuw-venture-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.15s ease;
          border: 2px solid transparent;
        }
        .enuw-venture-dot:hover {
          transform: scale(1.2);
          border-color: ${S.borderLight};
        }
        .enuw-venture-dot.active {
          border-color: ${S.text};
        }
        .enuw-user-section {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border-radius: 12px;
          background: ${S.elevated};
        }
        .enuw-user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: ${S.primary};
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${S.text};
          font-weight: 600;
          font-size: 14px;
        }
        .enuw-user-info {
          flex: 1;
        }
        .enuw-user-name {
          font-weight: 600;
          color: ${S.text};
          font-size: 13px;
        }
        .enuw-user-role {
          font-size: 11px;
          color: ${S.textMuted};
          text-transform: uppercase;
        }
        .enuw-main {
          flex: 1;
          margin-left: 280px;
          min-height: 100vh;
        }
        @media (max-width: 768px) {
          .enuw-main {
            margin-left: 0;
          }
        }
        .enuw-header {
          background: ${S.surface};
          border-bottom: 1px solid ${S.border};
          padding: 16px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .enuw-mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: ${S.text};
        }
        @media (max-width: 768px) {
          .enuw-mobile-menu-btn {
            display: block;
          }
        }
        .enuw-content {
          padding: 32px;
          max-width: 1600px;
          margin: 0 auto;
        }
        .enuw-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.7);
          z-index: 99;
        }
        @media (max-width: 768px) {
          .enuw-overlay {
            display: ${sidebarOpen ? 'block' : 'none'};
          }
        }
        .enuw-key-ai-bar {
          position: fixed;
          bottom: 0;
          left: 280px;
          right: 0;
          background: ${S.elevated};
          border-top: 1px solid ${S.border};
          padding: 16px 32px;
          z-index: 50;
        }
        @media (max-width: 768px) {
          .enuw-key-ai-bar {
            left: 0;
          }
        }
        .enuw-key-ai-input {
          width: 100%;
          padding: 12px 16px;
          background: ${S.surface};
          border: 1px solid ${S.border};
          border-radius: 10px;
          color: ${S.text};
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          outline: none;
        }
        .enuw-key-ai-input:focus {
          border-color: ${S.primary};
        }
        .enuw-key-ai-input::placeholder {
          color: ${S.textMuted};
        }
      `}</style>

      {/* Sidebar */}
      <aside className="enuw-sidebar">
        <div className="enuw-sidebar-header">
          <div className="enuw-logo">ENUW</div>
        </div>

        <nav className="enuw-nav">
          {navSections.map(section => (
            <div key={section.title} className="enuw-nav-section">
              <div className="enuw-nav-section-title">{section.title}</div>
              {section.items.map(item => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`enuw-nav-item ${isActive(item.path) ? 'active' : ''}`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>

        <div className="enuw-sidebar-footer">
          <div style={{ marginBottom: '16px' }}>
            <div className="enuw-nav-section-title" style={{ marginBottom: '8px' }}>VENTURES</div>
            <div className="enuw-ventures-switch">
              {ventures.map(venture => (
                <div
                  key={venture.id}
                  className="enuw-venture-dot"
                  style={{ background: venture.color }}
                  title={venture.name}
                />
              ))}
            </div>
          </div>
          <div className="enuw-user-section">
            <div className="enuw-user-avatar">MP</div>
            <div className="enuw-user-info">
              <div className="enuw-user-name">McKeyra Peter</div>
              <div className="enuw-user-role">Key Master</div>
            </div>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: S.textSecondary }}>
              <Bell size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      <div className="enuw-overlay" onClick={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <main className="enuw-main">
        <header className="enuw-header">
          <button
            className="enuw-mobile-menu-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div style={{ flex: 1 }} />
        </header>
        <div className="enuw-content">
          <Outlet />
        </div>
      </main>

      {/* THE KEY AI Bar */}
      {keyAiOpen && (
        <div className="enuw-key-ai-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Brain size={20} color={S.theKey} />
            <input
              type="text"
              className="enuw-key-ai-input"
              placeholder="Ask THE KEY AI anything about your portfolio..."
            />
          </div>
        </div>
      )}
    </div>
  )
}
