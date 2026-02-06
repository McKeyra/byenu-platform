import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import MarketingLayout from '../../components/layout/MarketingLayout.jsx'
import MetaTags from '../../components/MetaTags.jsx'
import { initScrollReveals, staggerHeroEntry } from '../../utils/animations.js'
import { colors, typography, spacing, borderRadius, shadows, transitions } from '../../styles/design-system.js'
import { Cpu, Layers, Edit, Zap, Globe, ArrowRight, Check } from 'lucide-react'

const css = `
  .features-page {
    padding: 96px 0;
  }

  .page-hero {
    text-align: center;
    margin-bottom: 80px;
  }

  .hero-badge {
    display: inline-block;
    padding: 6px 14px;
    background: ${colors.mintGlow};
    color: ${colors.mint};
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    border-radius: ${borderRadius.pill};
    margin-bottom: 20px;
  }

  .hero-headline {
    font-family: ${typography.heading.fontFamily};
    font-size: 44px;
    font-weight: 600;
    color: ${colors.charcoal};
    margin-bottom: 16px;
    line-height: 1.2;
    letter-spacing: -0.8px;
  }

  .hero-subtext {
    font-size: 16px;
    color: ${colors.gray};
    max-width: 720px;
    margin: 0 auto;
    line-height: 1.6;
  }

  .category-section {
    margin-bottom: 64px;
  }

  .category-header {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 32px;
  }

  .category-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .category-title {
    font-family: ${typography.heading.fontFamily};
    font-size: 26px;
    font-weight: 600;
    color: ${colors.charcoal};
    margin-bottom: 8px;
    line-height: 1.2;
  }

  .category-subtitle {
    font-size: 14px;
    color: ${colors.gray};
    line-height: 1.5;
  }

  .category-divider {
    height: 1px;
    background: ${colors.border};
    margin: 64px 0;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .feature-card {
    background: ${colors.white};
    border: 1px solid ${colors.border};
    border-radius: ${borderRadius.card};
    padding: 24px;
    transition: ${transitions.default};
    border-left: 3px solid transparent;
  }

  .feature-card:hover {
    transform: translateY(-2px);
    box-shadow: ${shadows.cardHover};
    border-left-color: var(--category-color);
  }

  .feature-card-title {
    font-size: 15px;
    font-weight: 700;
    color: ${colors.charcoal};
    margin-bottom: 8px;
  }

  .feature-card-desc {
    font-size: 13px;
    color: ${colors.gray};
    line-height: 1.55;
  }

  .cta-section {
    background: ${colors.charcoal};
    border-radius: ${borderRadius.large};
    padding: 64px 32px;
    text-align: center;
    margin-top: 96px;
  }

  .cta-headline {
    font-family: ${typography.heading.fontFamily};
    font-size: 28px;
    font-weight: 600;
    color: ${colors.white};
    margin-bottom: 24px;
  }

  .cta-button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: ${colors.gold};
    color: ${colors.charcoal};
    padding: 14px 28px;
    border-radius: ${borderRadius.button};
    font-weight: 600;
    font-size: 15px;
    text-decoration: none;
    transition: ${transitions.default};
    border: none;
    cursor: pointer;
    font-family: inherit;
  }

  .cta-button:hover {
    background: ${colors.white};
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    .features-grid {
      grid-template-columns: 1fr;
    }
    .hero-headline {
      font-size: 36px;
    }
    .category-header {
      flex-direction: column;
    }
  }
`

const categories = [
  {
    id: 'ai-intelligence',
    icon: Cpu,
    color: colors.mint,
    title: 'The engine that understands intent.',
    subtitle: 'Not a template selector. An intelligence layer that interprets what you mean and builds what you need.',
    features: [
      {
        title: 'Natural Language Commands',
        desc: 'Describe what you want in plain language. NU translates intent into architecture, layout, and content — no technical vocabulary required.'
      },
      {
        title: 'Multi-Model Consensus',
        desc: 'Three AI models evaluate every generation decision. The output isn\'t one model\'s guess — it\'s the intersection of three perspectives.'
      },
      {
        title: 'Context Memory',
        desc: 'NU remembers every decision across your session. Switch between wizard, chat, and form — zero context lost. Every mode shares one brain.'
      },
      {
        title: 'Smart Defaults',
        desc: 'Industry-specific intelligence pre-populates optimal choices. A yoga studio gets different defaults than a law firm. NU knows the patterns.'
      }
    ]
  },
  {
    id: 'building-experience',
    icon: Layers,
    color: colors.gold,
    title: 'Three modes. One system. Zero friction.',
    subtitle: 'Wizard for discovery. Chat for nuance. Form for speed. Flow between them without losing a single decision.',
    features: [
      {
        title: '8-Stage Wizard',
        desc: 'Guided discovery that asks the right questions in the right order. Each answer shapes every subsequent step. Progress is always visible.'
      },
      {
        title: 'Conversational Chat',
        desc: 'When choices can\'t be reduced to buttons, conversation becomes the interface. NU asks clarifying questions, offers suggestions, and confirms understanding.'
      },
      {
        title: 'Structured Form',
        desc: 'Power users who know what they want get a split-screen form with live preview. Every field validates in real-time. Auto-save. No lost work.'
      },
      {
        title: 'Mode Transitions',
        desc: 'Switch between wizard, chat, and form at any point. Data transfers seamlessly. The AI summarizes what\'s been decided and picks up where you left off.'
      }
    ]
  },
  {
    id: 'live-editing',
    icon: Edit,
    color: colors.coral,
    title: 'Edit through conversation. Not configuration panels.',
    subtitle: 'Tell NU what to change. It changes. See the result immediately.',
    features: [
      {
        title: 'Element Versioning',
        desc: 'Every change creates a version. Experiment freely knowing you can restore any previous state instantly. No destructive edits.'
      },
      {
        title: 'Section-Level Control',
        desc: 'Add, remove, reorder, or duplicate sections. Each section is independently editable. Drag to reorganize your entire page structure.'
      },
      {
        title: 'Inline Text Editing',
        desc: 'Click any text on your live preview to edit directly. Changes propagate instantly. No modal. No sidebar. Just type.'
      },
      {
        title: 'Device Preview',
        desc: 'Toggle between desktop, tablet, and mobile views in real-time. Every edit is responsive by default. What you see is what deploys.'
      }
    ]
  },
  {
    id: 'built-in-abilities',
    icon: Zap,
    color: colors.mintLight,
    title: 'No plugins. No integrations. No fragility.',
    subtitle: 'Booking, e-commerce, forms, analytics — compiled directly into your site code. Native performance. Zero dependencies.',
    features: [
      {
        title: 'Contact Forms',
        desc: 'Smart routing, spam protection, file uploads, conditional fields. Submissions go to your inbox and your dashboard.'
      },
      {
        title: 'Booking System',
        desc: 'Calendar availability, service selection, payment collection, confirmation emails. Full scheduling without third-party tools.'
      },
      {
        title: 'E-commerce',
        desc: 'Product catalog, cart, checkout, Stripe payments. Inventory management. Order notifications. The entire commerce stack.'
      },
      {
        title: 'Analytics',
        desc: 'Visitor tracking, page views, conversion funnels, traffic sources. Built-in dashboard. No Google Analytics tag required.'
      }
    ]
  },
  {
    id: 'publishing-scale',
    icon: Globe,
    color: colors.mint,
    title: 'Live in seconds. Scaled from day one.',
    subtitle: 'One click. Global CDN. SSL included. Custom domain ready.',
    features: [
      {
        title: 'Instant Publishing',
        desc: 'Your site deploys in under 60 seconds. No review queues. No approval processes. Your site, your timeline.'
      },
      {
        title: 'Custom Domains',
        desc: 'Connect your own domain or use yourname.byenu.site. SSL provisioned automatically. DNS configuration guided step by step.'
      },
      {
        title: 'Credit Transparency',
        desc: 'See exactly what every action costs before you confirm. No surprise bills. No hidden fees. Pay for what you use.'
      },
      {
        title: 'Team Collaboration',
        desc: 'Invite team members with granular permissions. Real-time co-editing. Comment threads. Perfect for agencies managing multiple clients.'
      }
    ]
  }
]

export default function FeaturesPage() {
  useEffect(() => {
    staggerHeroEntry('.hero-badge, .hero-headline, .hero-subtext', 150)
    initScrollReveals()
  }, [])

  return (
    <MarketingLayout>
      <MetaTags
        title="Features - The infrastructure behind one-conversation websites"
        description="Not features bolted on. Architecture built in. Every capability is compiled into your site code — native performance, zero dependencies."
      />
      <style>{css}</style>
      <div className="features-page" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
        {/* Page Hero */}
        <div className="page-hero">
          <div className="hero-badge">CAPABILITIES</div>
          <h1 className="hero-headline">The infrastructure behind one-conversation websites.</h1>
          <p className="hero-subtext">
            Not features bolted on. Architecture built in. Every capability is compiled into your site code — native performance, zero dependencies.
          </p>
        </div>

        {/* Categories */}
        {categories.map((category, categoryIndex) => {
          const IconComponent = category.icon
          return (
            <div key={category.id} className="category-section">
              <div className="category-header">
                <div className="category-icon" style={{ background: `${category.color}15`, color: category.color }}>
                  <IconComponent size={24} />
                </div>
                <div>
                  <h2 className="category-title">{category.title}</h2>
                  <p className="category-subtitle">{category.subtitle}</p>
                </div>
              </div>

              <div className="features-grid">
                {category.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className="feature-card"
                    data-reveal
                    style={{ '--category-color': category.color }}
                  >
                    <h3 className="feature-card-title">{feature.title}</h3>
                    <p className="feature-card-desc">{feature.desc}</p>
                  </div>
                ))}
              </div>

              {categoryIndex < categories.length - 1 && <div className="category-divider" />}
            </div>
          )
        })}

        {/* CTA Section */}
        <div className="cta-section">
          <h2 className="cta-headline">Ready to build?</h2>
          <Link to="/build" className="cta-button">
            Start Building <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </MarketingLayout>
  )
}
