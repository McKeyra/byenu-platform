import { useState } from 'react'
import { colors, typography, spacing, borderRadius, shadows, transitions } from '../../../styles/design-system'

/**
 * Tabbed Features Section
 * Matches 22C-CORP design system
 */
export default function TabbedFeatures({
  title = 'How It Works',
  tabs = []
}) {
  const defaultTabs = [
    {
      title: 'Conversation Builder',
      content: {
        headline: 'Just Talk. We Build.',
        description: 'Our AI asks the right questions to understand your business. No forms, no templates, just conversation.',
        features: [
          'Natural language interface',
          'Smart follow-up questions',
          'Instant content generation',
          'Real-time preview'
        ],
        image: '💬'
      }
    },
    {
      title: 'Smart Templates',
      content: {
        headline: 'Industry-Specific Design',
        description: 'Every template is optimized for your specific industry. Restaurants get menus. Gyms get class schedules. Law firms get case intake forms.',
        features: [
          '50+ industry templates',
          'Customizable sections',
          'Brand-aware design',
          'One-click deployment'
        ],
        image: '🎨'
      }
    },
    {
      title: 'Growth Tools',
      content: {
        headline: 'Built to Convert',
        description: 'Every site includes lead capture, analytics, and optimization tools. Turn visitors into customers from day one.',
        features: [
          'Built-in contact forms',
          'Google Analytics integration',
          'SEO optimization',
          'Performance monitoring'
        ],
        image: '📈'
      }
    }
  ]

  const displayTabs = tabs.length > 0 ? tabs : defaultTabs
  const [activeTab, setActiveTab] = useState(0)
  const currentContent = displayTabs[activeTab]?.content

  return (
    <>
      <style>{`
        .tabbed-features {
          padding: ${spacing.section.vertical} 0;
          background: ${colors.cream};
        }
        .tabbed-header {
          text-align: center;
          margin-bottom: 48px;
        }
        .tabbed-title {
          font-family: ${typography.heading.fontFamily};
          font-size: 44px;
          font-weight: 600;
          color: ${colors.charcoal};
          letter-spacing: -0.8px;
        }
        .tab-buttons {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-bottom: 48px;
          flex-wrap: wrap;
        }
        .tab-button {
          padding: 12px 32px;
          border-radius: ${borderRadius.pill};
          font-family: ${typography.body.fontFamily};
          font-size: 15px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: ${transitions.default};
        }
        .tab-button.active {
          background: ${colors.mint};
          color: ${colors.white};
        }
        .tab-button.inactive {
          background: ${colors.white};
          color: ${colors.charcoal};
        }
        .tab-button.inactive:hover {
          background: ${colors.cream};
        }
        .tab-content-card {
          max-width: 1200px;
          margin: 0 auto;
          background: ${colors.white};
          border-radius: ${borderRadius.large};
          box-shadow: ${shadows.elevated};
          overflow: hidden;
        }
        .tab-content-grid {
          display: grid;
          grid-template-columns: 1fr;
        }
        .tab-content-text {
          padding: 48px;
        }
        .tab-content-headline {
          font-family: ${typography.heading.fontFamily};
          font-size: 32px;
          font-weight: 600;
          color: ${colors.charcoal};
          margin-bottom: 16px;
        }
        .tab-content-desc {
          font-family: ${typography.body.fontFamily};
          font-size: 18px;
          color: ${colors.gray};
          margin-bottom: 32px;
          line-height: 1.6;
        }
        .tab-features-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .tab-feature-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 12px;
          font-family: ${typography.body.fontFamily};
          font-size: 16px;
          color: ${colors.charcoal};
        }
        .tab-feature-check {
          color: ${colors.mint};
          margin-top: 4px;
          flex-shrink: 0;
        }
        .tab-content-visual {
          background: linear-gradient(135deg, ${colors.mintGlow} 0%, ${colors.goldGlow} 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px;
        }
        @media (min-width: 768px) {
          .tab-content-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
      <section className="tabbed-features">
        <div style={{ maxWidth: spacing.container.maxWidth, margin: '0 auto', padding: `0 ${spacing.container.padding}` }}>
          <div className="tabbed-header">
            <h2 className="tabbed-title">{title}</h2>
          </div>

          {/* Tabs */}
          <div className="tab-buttons">
            {displayTabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`tab-button ${activeTab === index ? 'active' : 'inactive'}`}
              >
                {tab.title}
              </button>
            ))}
          </div>

          {/* Content */}
          {currentContent && (
            <div className="tab-content-card">
              <div className="tab-content-grid">
                {/* Left: Text */}
                <div className="tab-content-text">
                  <h3 className="tab-content-headline">{currentContent.headline}</h3>
                  <p className="tab-content-desc">{currentContent.description}</p>
                  <ul className="tab-features-list">
                    {currentContent.features.map((feature, i) => (
                      <li key={i} className="tab-feature-item">
                        <span className="tab-feature-check">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right: Visual */}
                <div className="tab-content-visual">
                  <div style={{ fontSize: '144px' }}>{currentContent.image}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
