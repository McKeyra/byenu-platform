import React from 'react'
import { C } from '../../../theme/constants.js'
import {
  Mail, Calendar, ShoppingCart, FileText, BarChart3, Bell,
  CheckCircle, PauseCircle, AlertCircle, Settings
} from 'lucide-react'

export default function DashboardAbilities() {
  const abilities = [
    {
      id: 'contact-form',
      name: 'Contact Form',
      icon: Mail,
      status: 'active',
      description: 'Collect inquiries from visitors',
      stats: { submissions: 24, lastWeek: 8 }
    },
    {
      id: 'booking',
      name: 'Booking',
      icon: Calendar,
      status: 'setup-needed',
      description: 'Let customers book appointments',
      stats: null
    },
    {
      id: 'ecommerce',
      name: 'E-commerce',
      icon: ShoppingCart,
      status: 'paused',
      description: 'Sell products online',
      stats: { orders: 12, revenue: '$1,240' }
    },
    {
      id: 'blog',
      name: 'Blog',
      icon: FileText,
      status: 'active',
      description: 'Publish articles and updates',
      stats: { posts: 8, views: 1240 }
    },
    {
      id: 'analytics',
      name: 'Analytics',
      icon: BarChart3,
      status: 'active',
      description: 'Track visitor behavior',
      stats: { visitors: 3421 }
    },
    {
      id: 'newsletter',
      name: 'Newsletter',
      icon: Bell,
      status: 'setup-needed',
      description: 'Email marketing campaigns',
      stats: null
    },
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle size={20} color={C.success} />
      case 'paused': return <PauseCircle size={20} color={C.gold} />
      case 'setup-needed': return <AlertCircle size={20} color={C.coral} />
      default: return null
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return C.success
      case 'paused': return C.gold
      case 'setup-needed': return C.coral
      default: return C.gray
    }
  }

  return (
    <div>
      <style>{`
        .byenu-abilities-header {
          margin-bottom: 32px;
        }
        .byenu-abilities-title {
          font-family: 'Fraunces', serif;
          font-size: 32px;
          font-weight: 600;
          color: ${C.charcoal};
          margin-bottom: 8px;
        }
        .byenu-abilities-subtitle {
          color: ${C.gray};
          font-size: 16px;
        }
        .byenu-abilities-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
        }
        .byenu-ability-card {
          background: ${C.white};
          border: 1px solid ${C.border};
          border-radius: 16px;
          padding: 24px;
          transition: all 0.2s;
        }
        .byenu-ability-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        }
        .byenu-ability-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 12px;
        }
        .byenu-ability-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .byenu-ability-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: ${C.mintGlow};
          color: ${C.mint};
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .byenu-ability-name {
          font-weight: 600;
          color: ${C.charcoal};
          font-size: 16px;
        }
        .byenu-ability-description {
          font-size: 14px;
          color: ${C.gray};
          margin-bottom: 16px;
        }
        .byenu-ability-status {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          text-transform: capitalize;
        }
        .byenu-ability-stats {
          display: flex;
          gap: 16px;
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid ${C.border};
        }
        .byenu-ability-stat {
          flex: 1;
        }
        .byenu-ability-stat-label {
          font-size: 12px;
          color: ${C.gray};
          margin-bottom: 4px;
        }
        .byenu-ability-stat-value {
          font-family: 'Fraunces', serif;
          font-size: 20px;
          font-weight: 600;
          color: ${C.charcoal};
        }
        .byenu-ability-actions {
          display: flex;
          gap: 8px;
          margin-top: 16px;
        }
        .byenu-ability-btn {
          flex: 1;
          padding: 10px 16px;
          border: 2px solid ${C.border};
          background: ${C.white};
          color: ${C.charcoal};
          border-radius: 10px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .byenu-ability-btn:hover {
          border-color: ${C.mint};
          color: ${C.mint};
        }
        .byenu-ability-btn.primary {
          background: ${C.mint};
          color: white;
          border-color: ${C.mint};
        }
        .byenu-ability-btn.primary:hover {
          background: ${C.gold};
          color: ${C.charcoal};
        }
      `}</style>

      <div className="byenu-abilities-header">
        <h1 className="byenu-abilities-title">Abilities</h1>
        <p className="byenu-abilities-subtitle">
          Manage features and integrations for your site
        </p>
      </div>

      <div className="byenu-abilities-grid">
        {abilities.map(ability => {
          const Icon = ability.icon
          const statusColor = getStatusColor(ability.status)
          return (
            <div key={ability.id} className="byenu-ability-card">
              <div className="byenu-ability-header">
                <div className="byenu-ability-info">
                  <div className="byenu-ability-icon">
                    <Icon size={24} />
                  </div>
                  <div>
                    <div className="byenu-ability-name">{ability.name}</div>
                  </div>
                </div>
                <div className="byenu-ability-status" style={{ background: `${statusColor}15`, color: statusColor }}>
                  {getStatusIcon(ability.status)}
                  {ability.status.replace('-', ' ')}
                </div>
              </div>
              <div className="byenu-ability-description">{ability.description}</div>
              
              {ability.stats && (
                <div className="byenu-ability-stats">
                  {Object.entries(ability.stats).map(([key, value]) => (
                    <div key={key} className="byenu-ability-stat">
                      <div className="byenu-ability-stat-label">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                      <div className="byenu-ability-stat-value">{value}</div>
                    </div>
                  ))}
                </div>
              )}

              <div className="byenu-ability-actions">
                {ability.status === 'setup-needed' ? (
                  <button className="byenu-ability-btn primary">Setup</button>
                ) : (
                  <>
                    <button className="byenu-ability-btn">View</button>
                    <button className="byenu-ability-btn">
                      <Settings size={16} style={{ display: 'inline', verticalAlign: 'middle' }} />
                    </button>
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
