import { ArrowRight } from 'lucide-react'
import { colors, borderRadius, transitions } from '../../../styles/design-system'

/**
 * Split Hero - Content + Image Side by Side
 * Matches 22C-CORP design system
 */
export default function SplitHero({
  badge = 'Launching Fall 2026',
  headline = 'The Smartest Way to Build Websites',
  subtext = 'Stop wrestling with complicated builders. Just talk to our AI, and watch your perfect website come to life.',
  primaryCta = 'Get Started Free',
  secondaryCta = 'See Examples',
  onPrimaryClick,
  onSecondaryClick,
  imageUrl = null,
  imagePlaceholder = '🚀'
}) {
  return (
    <>
      <style>{`
        .split-hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          background: ${colors.white};
          padding: 120px 32px 80px;
        }
        .hero-badge {
          display: inline-block;
          padding: 8px 16px;
          background: ${colors.mintGlow};
          color: ${colors.mint};
          border-radius: ${borderRadius.pill};
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 24px;
        }
        .hero-headline {
          font-family: 'Fraunces', serif;
          font-size: 48px;
          font-weight: 600;
          color: ${colors.charcoal};
          margin-bottom: 24px;
          line-height: 1.1;
          letter-spacing: -1px;
        }
        .hero-subtext {
          font-family: 'DM Sans', sans-serif;
          font-size: 20px;
          color: ${colors.gray};
          margin-bottom: 32px;
          line-height: 1.6;
        }
        .hero-image-container {
          position: relative;
          aspect-ratio: 1;
          border-radius: ${borderRadius.large};
          background: linear-gradient(135deg, ${colors.mintGlow} 0%, ${colors.goldGlow} 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .floating-element {
          position: absolute;
          border-radius: 50%;
          filter: blur(40px);
          opacity: 0.6;
        }
        @media (min-width: 768px) {
          .hero-headline {
            font-size: 56px;
          }
        }
        @media (min-width: 1024px) {
          .hero-headline {
            font-size: 64px;
          }
        }
      `}</style>
      <section className="split-hero">
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '48px',
            alignItems: 'center'
          }} className="md:grid-cols-2">
            {/* Left: Content */}
            <div>
              {badge && (
                <div className="hero-badge">{badge}</div>
              )}
              <h1 className="hero-headline">{headline}</h1>
              <p className="hero-subtext">{subtext}</p>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }} className="sm:flex-row">
                <button
                  onClick={onPrimaryClick}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '16px 32px',
                    borderRadius: borderRadius.button,
                    background: colors.mint,
                    color: colors.white,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '16px',
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer',
                    transition: transitions.default
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = colors.gold
                    e.target.style.color = colors.charcoal
                    e.target.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = colors.mint
                    e.target.style.color = colors.white
                    e.target.style.transform = 'translateY(0)'
                  }}
                >
                  {primaryCta} <ArrowRight size={20} />
                </button>
                {secondaryCta && (
                  <button
                    onClick={onSecondaryClick}
                    style={{
                      padding: '16px 32px',
                      borderRadius: borderRadius.button,
                      border: `2px solid ${colors.border}`,
                      color: colors.charcoal,
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '16px',
                      fontWeight: 600,
                      background: 'transparent',
                      cursor: 'pointer',
                      transition: transitions.default
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.borderColor = colors.mint
                      e.target.style.color = colors.mint
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderColor = colors.border
                      e.target.style.color = colors.charcoal
                    }}
                  >
                    {secondaryCta}
                  </button>
                )}
              </div>
            </div>

            {/* Right: Image/Mockup */}
            <div style={{ position: 'relative' }}>
              <div className="hero-image-container">
                {imageUrl ? (
                  <img src={imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '64px', marginBottom: '16px' }}>{imagePlaceholder}</div>
                    <p style={{ color: colors.gray }}>Product Mockup Here</p>
                  </div>
                )}
              </div>
              {/* Floating Elements */}
              <div className="floating-element" style={{
                top: '-16px',
                right: '-16px',
                width: '96px',
                height: '96px',
                background: colors.gold
              }} />
              <div className="floating-element" style={{
                bottom: '-16px',
                left: '-16px',
                width: '128px',
                height: '128px',
                background: colors.coral
              }} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
