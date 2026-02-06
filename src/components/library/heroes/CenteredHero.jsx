import { colors, borderRadius, transitions } from '../../../styles/design-system'

/**
 * Centered Hero Section
 * Matches 22C-CORP design system
 */
export default function CenteredHero({
  headline = "Build Your Dream Website in Minutes",
  subtext = "AI-powered website builder for entrepreneurs who want to launch fast",
  primaryCta = "Start Building Free",
  secondaryCta = "Watch Demo",
  onPrimaryClick,
  onSecondaryClick,
  backgroundGradient = `linear-gradient(135deg, ${colors.mint} 0%, ${colors.mintLight} 50%, ${colors.gold} 100%)`,
  showScrollIndicator = true
}) {
  return (
    <>
      <style>{`
        .centered-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${backgroundGradient};
          padding: 120px 32px 80px;
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: rgba(26, 26, 46, 0.3);
        }
        .hero-content {
          position: relative;
          z-index: 10;
          text-align: center;
          max-width: 800px;
        }
        .hero-headline {
          font-family: 'Fraunces', serif;
          font-size: 52px;
          font-weight: 600;
          color: ${colors.white};
          margin-bottom: 24px;
          line-height: 1.1;
          letter-spacing: -1px;
        }
        .hero-subtext {
          font-family: 'DM Sans', sans-serif;
          font-size: 20px;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 32px;
          line-height: 1.6;
        }
        .hero-ctas {
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: center;
        }
        @media (min-width: 640px) {
          .hero-ctas {
            flex-direction: row;
            justify-content: center;
          }
          .hero-headline {
            font-size: 64px;
          }
        }
        @media (min-width: 1024px) {
          .hero-headline {
            font-size: 72px;
          }
        }
        .scroll-indicator {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          animation: bounce 2s infinite;
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          40% {
            transform: translateX(-50%) translateY(-10px);
          }
          60% {
            transform: translateX(-50%) translateY(-5px);
          }
        }
      `}</style>
      <section className="centered-hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1 className="hero-headline">{headline}</h1>
          <p className="hero-subtext">{subtext}</p>
          <div className="hero-ctas">
            <button
              onClick={onPrimaryClick}
              style={{
                padding: '16px 32px',
                borderRadius: borderRadius.button,
                background: colors.white,
                color: colors.mint,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '16px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                transition: transitions.default
              }}
              onMouseEnter={(e) => {
                e.target.style.background = colors.cream
                e.target.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.target.style.background = colors.white
                e.target.style.transform = 'translateY(0)'
              }}
            >
              {primaryCta}
            </button>
            {secondaryCta && (
              <button
                onClick={onSecondaryClick}
                style={{
                  padding: '16px 32px',
                  borderRadius: borderRadius.button,
                  border: `2px solid ${colors.white}`,
                  color: colors.white,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '16px',
                  fontWeight: 600,
                  background: 'transparent',
                  cursor: 'pointer',
                  transition: transitions.default
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent'
                }}
              >
                {secondaryCta}
              </button>
            )}
          </div>
        </div>
        {showScrollIndicator && (
          <div className="scroll-indicator">
            <div style={{
              width: '24px',
              height: '40px',
              border: `2px solid ${colors.white}`,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              padding: '8px'
            }}>
              <div style={{
                width: '6px',
                height: '12px',
                background: colors.white,
                borderRadius: '3px',
                marginTop: '4px'
              }} />
            </div>
          </div>
        )}
      </section>
    </>
  )
}
