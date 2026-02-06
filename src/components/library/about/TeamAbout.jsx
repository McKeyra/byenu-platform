import { colors, typography, spacing, borderRadius } from '../../../styles/design-system'

/**
 * About Section - Team Grid
 * Matches 22C-CORP design system
 */
export default function TeamAbout({
  title = 'Meet the Team',
  subtitle = 'We\'re a small team obsessed with making website building accessible to everyone',
  team = []
}) {
  const defaultTeam = [
    {
      name: 'Sarah Chen',
      role: 'Founder & CEO',
      image: null,
      bio: 'Former product designer at Shopify. Built 100+ websites for small businesses.'
    },
    {
      name: 'Marcus Johnson',
      role: 'Head of Engineering',
      image: null,
      bio: '10 years building AI systems. Previously at Google Brain.'
    },
    {
      name: 'Priya Patel',
      role: 'Head of Design',
      image: null,
      bio: 'Award-winning designer. Worked with Nike, Airbnb, and Tesla.'
    }
  ]

  const displayTeam = team.length > 0 ? team : defaultTeam

  return (
    <>
      <style>{`
        .team-about {
          padding: ${spacing.section.vertical} 0;
          background: ${colors.white};
        }
        .team-header {
          text-align: center;
          margin-bottom: 64px;
        }
        .team-title {
          font-family: ${typography.heading.fontFamily};
          font-size: 44px;
          font-weight: 600;
          color: ${colors.charcoal};
          margin-bottom: 24px;
          letter-spacing: -0.8px;
        }
        .team-subtitle {
          font-family: ${typography.body.fontFamily};
          font-size: 20px;
          color: ${colors.gray};
          max-width: 600px;
          margin: 0 auto;
        }
        .team-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          max-width: 1000px;
          margin: 0 auto;
        }
        .team-member {
          text-align: center;
        }
        .team-avatar {
          width: 192px;
          height: 192px;
          margin: 0 auto 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, ${colors.mintGlow} 0%, ${colors.goldGlow} 100%);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .team-name {
          font-family: ${typography.heading.fontFamily};
          font-size: 20px;
          font-weight: 600;
          color: ${colors.charcoal};
          margin-bottom: 4px;
        }
        .team-role {
          font-family: ${typography.body.fontFamily};
          font-size: 16px;
          font-weight: 500;
          color: ${colors.mint};
          margin-bottom: 12px;
        }
        .team-bio {
          font-family: ${typography.body.fontFamily};
          font-size: 14px;
          color: ${colors.gray};
          line-height: 1.6;
        }
        @media (min-width: 768px) {
          .team-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
      <section className="team-about">
        <div style={{ maxWidth: spacing.container.maxWidth, margin: '0 auto', padding: `0 ${spacing.container.padding}` }}>
          <div className="team-header">
            <h2 className="team-title">{title}</h2>
            <p className="team-subtitle">{subtitle}</p>
          </div>

          <div className="team-grid">
            {displayTeam.map((member, i) => (
              <div key={i} className="team-member">
                <div className="team-avatar">
                  {member.image ? (
                    <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ fontSize: '64px' }}>👤</div>
                  )}
                </div>
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
