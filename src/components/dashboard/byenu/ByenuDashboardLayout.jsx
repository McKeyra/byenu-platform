import React, { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../../lib/auth/AuthContext.jsx'
import { C } from '../../../theme/constants.js'
import {
  LayoutDashboard, Edit3, FileText, BarChart3,
  Zap, Settings, Menu, X, MessageSquare, User, HelpCircle
} from 'lucide-react'

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
  { path: '/dashboard/edit', icon: Edit3, label: 'Editor' },
  { path: '/dashboard/pages', icon: FileText, label: 'Pages' },
  { path: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
  { path: '/dashboard/abilities', icon: Zap, label: 'Abilities' },
  { path: '/dashboard/settings', icon: Settings, label: 'Settings' },
]

export default function ByenuDashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const { user } = useAuth()

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/')

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: C.bg }}>
      <style>{`
        .byenu-sidebar {
          width: 280px;
          background: ${C.white};
          border-right: 1px solid ${C.border};
          display: flex;
          flex-direction: column;
          position: fixed;
          height: 100vh;
          left: 0;
          top: 0;
          z-index: 100;
          transition: transform 0.3s ease;
        }
        @media (max-width: 768px) {
          .byenu-sidebar {
            transform: translateX(${sidebarOpen ? '0' : '-100%'});
          }
        }
        .byenu-sidebar-header {
          padding: 24px;
          border-bottom: 1px solid ${C.border};
        }
        .byenu-logo {
          font-family: 'Fraunces', serif;
          font-size: 24px;
          font-weight: 700;
          color: ${C.charcoal};
          letter-spacing: -0.5px;
        }
        .byenu-logo span { color: ${C.mint}; }
        .byenu-nav {
          flex: 1;
          padding: 16px 0;
          overflow-y: auto;
        }
        .byenu-nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 24px;
          color: ${C.gray};
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s;
          border-left: 3px solid transparent;
        }
        .byenu-nav-item:hover {
          background: ${C.mintGlow};
          color: ${C.charcoal};
        }
        .byenu-nav-item.active {
          color: ${C.mint};
          background: ${C.mintGlow};
          border-left-color: ${C.mint};
        }
        .byenu-sidebar-footer {
          padding: 24px;
          border-top: 1px solid ${C.border};
        }
        .byenu-user-section {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border-radius: 12px;
          background: ${C.cream};
        }
        .byenu-user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: ${C.mint};
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
        }
        .byenu-user-info {
          flex: 1;
        }
        .byenu-user-name {
          font-weight: 600;
          color: ${C.charcoal};
          font-size: 14px;
        }
        .byenu-user-plan {
          font-size: 12px;
          color: ${C.gray};
        }
        .byenu-help-btn {
          width: 100%;
          margin-top: 12px;
          padding: 12px;
          background: ${C.mint};
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s;
        }
        .byenu-help-btn:hover {
          background: ${C.gold};
          color: ${C.charcoal};
        }
        .byenu-main {
          flex: 1;
          margin-left: 280px;
          min-height: 100vh;
        }
        @media (max-width: 768px) {
          .byenu-main {
            margin-left: 0;
          }
        }
        .byenu-header {
          background: ${C.white};
          border-bottom: 1px solid ${C.border};
          padding: 16px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .byenu-mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: ${C.charcoal};
        }
        @media (max-width: 768px) {
          .byenu-mobile-menu-btn {
            display: block;
          }
        }
        .byenu-content {
          padding: 32px;
          max-width: 1400px;
          margin: 0 auto;
        }
        .byenu-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          z-index: 99;
        }
        @media (max-width: 768px) {
          .byenu-overlay {
            display: ${sidebarOpen ? 'block' : 'none'};
          }
        }
      `}</style>

      {/* Sidebar */}
      <aside className="byenu-sidebar">
        <div className="byenu-sidebar-header">
          <div className="byenu-logo">
            bye<span>NU</span>
          </div>
        </div>

        <nav className="byenu-nav">
          {navItems.map(item => {
            const Icon = item.icon
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`byenu-nav-item ${isActive(item.path) ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="byenu-sidebar-footer">
          <div className="byenu-user-section">
            <div className="byenu-user-avatar">
              {user?.email?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="byenu-user-info">
              <div className="byenu-user-name">
                {user?.email?.split('@')[0] || 'User'}
              </div>
              <div className="byenu-user-plan">Starter Plan</div>
            </div>
          </div>
          <button className="byenu-help-btn">
            <MessageSquare size={16} />
            <span>Chat with NU</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      <div className="byenu-overlay" onClick={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <main className="byenu-main">
        <header className="byenu-header">
          <button
            className="byenu-mobile-menu-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div style={{ flex: 1 }} />
        </header>
        <div className="byenu-content">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
