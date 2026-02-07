import React, { useState } from 'react'
import { C } from '../../../theme/constants.js'
import {
  Globe, Users, CreditCard, AlertTriangle, Download, Archive,
  Save, Plus, X, Check
} from 'lucide-react'

export default function DashboardSettings() {
  const [activeTab, setActiveTab] = useState('site')

  const tabs = [
    { id: 'site', label: 'Site Info', icon: Globe },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'domain', label: 'Domain', icon: Globe },
    { id: 'danger', label: 'Danger Zone', icon: AlertTriangle },
  ]

  return (
    <div>
      <style>{`
        .byenu-settings-header {
          margin-bottom: 32px;
        }
        .byenu-settings-title {
          font-family: 'Fraunces', serif;
          font-size: 32px;
          font-weight: 600;
          color: ${C.charcoal};
          margin-bottom: 8px;
        }
        .byenu-settings-tabs {
          display: flex;
          gap: 8px;
          border-bottom: 2px solid ${C.border};
          margin-bottom: 32px;
          overflow-x: auto;
        }
        .byenu-settings-tab {
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
          transition: all 0.2s;
          margin-bottom: -2px;
        }
        .byenu-settings-tab:hover {
          color: ${C.charcoal};
        }
        .byenu-settings-tab.active {
          color: ${C.mint};
          border-bottom-color: ${C.mint};
        }
        .byenu-settings-section {
          background: ${C.white};
          border: 1px solid ${C.border};
          border-radius: 20px;
          padding: 32px;
          margin-bottom: 24px;
        }
        .byenu-settings-section-title {
          font-family: 'Fraunces', serif;
          font-size: 20px;
          font-weight: 600;
          color: ${C.charcoal};
          margin-bottom: 24px;
        }
        .byenu-form-group {
          margin-bottom: 24px;
        }
        .byenu-form-label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: ${C.charcoal};
          margin-bottom: 8px;
        }
        .byenu-form-input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid ${C.border};
          border-radius: 12px;
          font-size: 15px;
          font-family: inherit;
          color: ${C.charcoal};
          outline: none;
          transition: border-color 0.2s;
        }
        .byenu-form-input:focus {
          border-color: ${C.mint};
        }
        .byenu-form-help {
          font-size: 13px;
          color: ${C.gray};
          margin-top: 6px;
        }
        .byenu-team-member {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px;
          border: 1px solid ${C.border};
          border-radius: 12px;
          margin-bottom: 12px;
        }
        .byenu-team-member-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .byenu-team-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: ${C.mint};
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
        }
        .byenu-team-name {
          font-weight: 600;
          color: ${C.charcoal};
        }
        .byenu-team-email {
          font-size: 13px;
          color: ${C.gray};
        }
        .byenu-team-role {
          padding: 4px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          background: ${C.mintGlow};
          color: ${C.mint};
        }
        .byenu-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: ${C.mint};
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .byenu-btn-primary:hover {
          background: ${C.gold};
          color: ${C.charcoal};
        }
        .byenu-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: ${C.white};
          color: ${C.charcoal};
          border: 2px solid ${C.border};
          border-radius: 12px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .byenu-btn-secondary:hover {
          border-color: ${C.mint};
          color: ${C.mint};
        }
        .byenu-danger-zone {
          background: ${C.coralLight};
          border: 2px solid ${C.coral};
          border-radius: 16px;
          padding: 24px;
        }
        .byenu-danger-title {
          font-weight: 600;
          color: ${C.coral};
          margin-bottom: 12px;
        }
        .byenu-danger-description {
          font-size: 14px;
          color: ${C.charcoal};
          margin-bottom: 16px;
        }
      `}</style>

      <div className="byenu-settings-header">
        <h1 className="byenu-settings-title">Settings</h1>
      </div>

      <div className="byenu-settings-tabs">
        {tabs.map(tab => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              className={`byenu-settings-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Site Info Tab */}
      {activeTab === 'site' && (
        <div className="byenu-settings-section">
          <h2 className="byenu-settings-section-title">Site Information</h2>
          <div className="byenu-form-group">
            <label className="byenu-form-label">Business Name</label>
            <input type="text" className="byenu-form-input" defaultValue="Acme Consulting" />
          </div>
          <div className="byenu-form-group">
            <label className="byenu-form-label">Subdomain</label>
            <input type="text" className="byenu-form-input" defaultValue="acme" />
            <div className="byenu-form-help">Your site will be available at acme.byenu.com</div>
          </div>
          <button className="byenu-btn-primary">
            <Save size={16} />
            Save Changes
          </button>
        </div>
      )}

      {/* Team Tab */}
      {activeTab === 'team' && (
        <div className="byenu-settings-section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 className="byenu-settings-section-title">Team Members</h2>
            <button className="byenu-btn-primary">
              <Plus size={16} />
              Invite Member
            </button>
          </div>
          {[
            { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
            { name: 'Sarah Smith', email: 'sarah@example.com', role: 'Editor' },
          ].map((member, idx) => (
            <div key={idx} className="byenu-team-member">
              <div className="byenu-team-member-info">
                <div className="byenu-team-avatar">{member.name[0]}</div>
                <div>
                  <div className="byenu-team-name">{member.name}</div>
                  <div className="byenu-team-email">{member.email}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className="byenu-team-role">{member.role}</span>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.gray }}>
                  <X size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Billing Tab */}
      {activeTab === 'billing' && (
        <div className="byenu-settings-section">
          <h2 className="byenu-settings-section-title">Billing</h2>
          <div className="byenu-form-group">
            <label className="byenu-form-label">Current Plan</label>
            <div style={{ padding: '16px', background: C.cream, borderRadius: '12px', fontWeight: 600, color: C.charcoal }}>
              Starter Plan - $25/month
            </div>
          </div>
          <div className="byenu-form-group">
            <label className="byenu-form-label">Credit Balance</label>
            <div style={{ padding: '16px', background: C.cream, borderRadius: '12px', fontFamily: 'Fraunces', fontSize: '24px', fontWeight: 600, color: C.charcoal }}>
              850 / 1000 credits
            </div>
          </div>
          <button className="byenu-btn-primary">Upgrade Plan</button>
        </div>
      )}

      {/* Domain Tab */}
      {activeTab === 'domain' && (
        <div className="byenu-settings-section">
          <h2 className="byenu-settings-section-title">Custom Domain</h2>
          <div className="byenu-form-group">
            <label className="byenu-form-label">Custom Domain</label>
            <input type="text" className="byenu-form-input" placeholder="example.com" />
            <div className="byenu-form-help">Connect your custom domain to your site</div>
          </div>
          <div style={{ padding: '16px', background: C.successGlow, borderRadius: '12px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: C.success, fontWeight: 600 }}>
              <Check size={16} />
              SSL Certificate Active
            </div>
          </div>
          <button className="byenu-btn-primary">Connect Domain</button>
        </div>
      )}

      {/* Danger Zone Tab */}
      {activeTab === 'danger' && (
        <div className="byenu-settings-section">
          <div className="byenu-danger-zone">
            <div className="byenu-danger-title">Archive Site</div>
            <div className="byenu-danger-description">
              Archive your site to hide it from the public. You can restore it later.
            </div>
            <button className="byenu-btn-secondary">
              <Archive size={16} />
              Archive Site
            </button>
          </div>
          <div style={{ marginTop: '24px' }} className="byenu-danger-zone">
            <div className="byenu-danger-title">Export Code</div>
            <div className="byenu-danger-description">
              Download your site's code as a ZIP file. This includes all HTML, CSS, and JavaScript.
            </div>
            <button className="byenu-btn-secondary">
              <Download size={16} />
              Export Code
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
