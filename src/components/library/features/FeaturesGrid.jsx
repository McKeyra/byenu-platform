import { Zap, Shield, Smartphone, Code, TrendingUp, Users } from 'lucide-react'
import { colors, typography, spacing, borderRadius, shadows, transitions } from '../../../styles/design-system'

/**
 * Features Grid Section
 * Matches 22C-CORP design system
 */
export default function FeaturesGrid({
  title = 'Everything You Need to Launch',
  subtitle = 'Professional features without the professional price tag',
  features = []
}) {
  const defaultFeatures = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Your website built in under 5 minutes. No coding, no templates, no hassle.'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level encryption and security. Your data is safe with us.'
    },
    {
      icon: Smartphone,
      title: 'Mobile First',
      description: 'Every site we build looks perfect on phones, tablets, and desktops.'
    },
    {
      icon: Code,
      title: 'Clean Code',
      description: 'Production-ready, optimized code that developers will actually approve.'
    },
    {
      icon: TrendingUp,
      title: 'SEO Optimized',
      description: 'Built-in SEO best practices to help you rank higher on Google.'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Invite your team, assign roles, and build together seamlessly.'
    }
  ]

  const displayFeatures = features.length > 0 ? features : defaultFeatures

  return (
    <>
      <style>{`
        .features-grid-section {
          padding: ${spacing.section.vertical} 0;
          background: ${colors.white};
        }
        .features-header {
          text-align: center;
          margin-bottom: 64px;
        }
        .features-title {
          font-family: ${typography.heading.fontFamily};
          font-size: 44px;
          font-weight: 600;
          color: ${colors.charcoal};
          margin-bottom: 24px;
          letter-spacing: -0.8px;
        }
        .features-subtitle {
          font-family: ${typography.body.fontFamily};
          font-size: 20px;
          color: ${colors.gray};
          max-width: 600px;
          margin: 0 auto;
        }
        .features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .feature-card {
          padding: 32px;
          border-radius: ${borderRadius.large};
          border: 1px solid ${colors.border};
          transition: ${transitions.default};
        }
        .feature-card:hover {
          border-color: ${colors.mintBorder};
          box-shadow: ${shadows.elevated};
          transform: translateY(-2px);
        }
        .feature-icon-wrapper {
          width: 56px;
          height: 56px;
          border-radius: ${borderRadius.card};
          background: ${colors.mintGlow};
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          transition: ${transitions.default};
        }
        .feature-card:hover .feature-icon-wrapper {
          background: ${colors.mint};
        }
        .feature-icon {
          color: ${colors.mint};
          transition: ${transitions.default};
        }
        .feature-card:hover .feature-icon {
          color: ${colors.white};
        }
        .feature-card-title {
          font-family: ${typography.heading.fontFamily};
          font-size: 20px;
          font-weight: 600;
          color: ${colors.charcoal};
          margin-bottom: 12px;
        }
        .feature-card-desc {
          font-family: ${typography.body.fontFamily};
          font-size: 15px;
          color: ${colors.gray};
          line-height: 1.6;
        }
        @media (min-width: 768px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .features-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
      <section className="features-grid-section">
        <div style={{ maxWidth: spacing.container.maxWidth, margin: '0 auto', padding: `0 ${spacing.container.padding}` }}>
          <div className="features-header">
            <h2 className="features-title">{title}</h2>
            <p className="features-subtitle">{subtitle}</p>
          </div>

          <div className="features-grid">
            {displayFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="feature-card">
                  <div className="feature-icon-wrapper">
                    <Icon className="feature-icon" size={28} />
                  </div>
                  <h3 className="feature-card-title">{feature.title}</h3>
                  <p className="feature-card-desc">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
