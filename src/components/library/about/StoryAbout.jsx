import { colors, typography, spacing, borderRadius } from '../../../styles/design-system'

/**
 * About Section - Story Format
 * Matches 22C-CORP design system
 */
export default function StoryAbout({
  title = 'Our Story',
  subtitle = 'How we\'re changing the way websites get built',
  paragraphs = [],
  highlightText = null,
  stats = []
}) {
  const defaultParagraphs = [
    'We started byeNU because we saw talented entrepreneurs spending weeks (or paying thousands) just to get a simple website live. That didn\'t make sense.',
    'The existing builders were either too complicated (Webflow, Wix) or too limiting (basic templates). We wanted something different: a builder that actually understands your business and builds exactly what you need.',
    'So we built it. Talk to our AI. Get a website. That\'s it.'
  ]

  const content = paragraphs.length > 0 ? paragraphs : defaultParagraphs
  const defaultStats = [
    { value: '5 mins', label: 'Average build time' },
    { value: '1,000+', label: 'Sites launched' },
    { value: '98%', label: 'Happy customers' }
  ]
  const displayStats = stats.length > 0 ? stats : defaultStats

  return (
    <>
      <style>{`
        .story-about {
          padding: ${spacing.section.vertical} 0;
          background: ${colors.cream};
        }
        .story-header {
          text-align: center;
          margin-bottom: 64px;
        }
        .story-title {
          font-family: ${typography.heading.fontFamily};
          font-size: 44px;
          font-weight: 600;
          color: ${colors.charcoal};
          margin-bottom: 24px;
          letter-spacing: -0.8px;
        }
        .story-subtitle {
          font-family: ${typography.body.fontFamily};
          font-size: 20px;
          color: ${colors.gray};
        }
        .story-content {
          max-width: 800px;
          margin: 0 auto;
        }
        .story-paragraph {
          font-family: ${typography.body.fontFamily};
          font-size: 18px;
          color: ${colors.charcoal};
          line-height: 1.7;
          margin-bottom: 24px;
        }
        .story-highlight {
          font-size: 20px;
          font-weight: 600;
          color: ${colors.mint};
          margin-top: 24px;
        }
        .story-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          margin-top: 64px;
          padding-top: 64px;
          border-top: 1px solid ${colors.border};
        }
        .stat-value {
          font-family: ${typography.heading.fontFamily};
          font-size: 36px;
          font-weight: 600;
          color: ${colors.mint};
          margin-bottom: 8px;
        }
        .stat-label {
          font-family: ${typography.body.fontFamily};
          font-size: 14px;
          color: ${colors.gray};
        }
        @media (max-width: 768px) {
          .story-stats {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      <section className="story-about">
        <div style={{ maxWidth: spacing.container.maxWidth, margin: '0 auto', padding: `0 ${spacing.container.padding}` }}>
          <div className="story-header">
            <h2 className="story-title">{title}</h2>
            <p className="story-subtitle">{subtitle}</p>
          </div>

          <div className="story-content">
            {content.map((para, i) => (
              <p key={i} className="story-paragraph">{para}</p>
            ))}
            {highlightText && (
              <p className="story-paragraph story-highlight">{highlightText}</p>
            )}
          </div>

          {/* Stats */}
          {displayStats.length > 0 && (
            <div className="story-stats">
              {displayStats.map((stat, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
