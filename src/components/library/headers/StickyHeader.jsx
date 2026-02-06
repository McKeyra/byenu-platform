import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { colors, transitions } from '../../../styles/design-system'

/**
 * Sticky Header - Transparent → Solid on Scroll
 * Matches 22C-CORP design system
 */
export default function StickyHeader({ 
  logo = 'byeNU',
  navItems = [],
  ctaText = 'Get Started',
  onCtaClick,
  scrolledBg = colors.white,
  scrolledText = colors.charcoal,
  transparentText = colors.white
}) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const defaultNavItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' }
  ]

  const items = navItems.length > 0 ? navItems : defaultNavItems

  return (
    <>
      <style>{`
        .sticky-header {
          position: fixed;
          width: 100%;
          top: 0;
          z-index: 50;
          transition: ${transitions.default};
        }
        .sticky-header.scrolled {
          background: ${scrolledBg};
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          padding: 16px 0;
        }
        .sticky-header.transparent {
          background: transparent;
          padding: 24px 0;
        }
        .nav-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          text-decoration: none;
          transition: ${transitions.default};
        }
        .nav-link:hover {
          color: ${colors.mint};
        }
        .mobile-menu {
          position: fixed;
          top: 0;
          right: 0;
          width: 320px;
          height: 100vh;
          background: ${colors.white};
          box-shadow: -4px 0 24px rgba(0,0,0,0.1);
          z-index: 200;
          padding: 32px;
          transform: translateX(100%);
          transition: transform 0.3s ease;
        }
        .mobile-menu.open {
          transform: translateX(0);
        }
      `}</style>
      <header className={`sticky-header ${scrolled ? 'scrolled' : 'transparent'}`}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <a href="#" style={{ fontFamily: "'Fraunces', serif", fontSize: '20px', fontWeight: 700, color: scrolled ? scrolledText : transparentText, textDecoration: 'none' }}>
            {logo.split('NU').length > 1 ? (
              <>bye<span style={{ color: colors.mint }}>NU</span></>
            ) : logo}
          </a>

          {/* Desktop Nav */}
          <nav style={{ display: 'none', gap: '40px', alignItems: 'center' }} className="md:flex">
            {items.map(item => (
              <a
                key={item.label}
                href={item.href}
                className="nav-link"
                style={{ color: scrolled ? scrolledText : transparentText }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <button 
            onClick={onCtaClick}
            style={{ 
              display: 'none',
              padding: '10px 20px',
              borderRadius: '10px',
              background: colors.mint,
              color: colors.white,
              border: 'none',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: transitions.default
            }}
            className="md:block"
            onMouseEnter={(e) => {
              e.target.style.background = colors.gold
              e.target.style.color = colors.charcoal
            }}
            onMouseLeave={(e) => {
              e.target.style.background = colors.mint
              e.target.style.color = colors.white
            }}
          >
            {ctaText}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ display: 'block', background: 'none', border: 'none', cursor: 'pointer' }}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X size={28} style={{ color: scrolled ? scrolledText : transparentText }} />
            ) : (
              <Menu size={28} style={{ color: scrolled ? scrolledText : transparentText }} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <>
            <div 
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.3)',
                zIndex: 199,
              }}
              onClick={() => setMenuOpen(false)}
            />
            <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <a href="#" style={{ fontFamily: "'Fraunces', serif", fontSize: '20px', fontWeight: 700, color: colors.charcoal, textDecoration: 'none' }}>
                  bye<span style={{ color: colors.mint }}>NU</span>
                </a>
                <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
                  <X size={24} />
                </button>
              </div>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {items.map(item => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '16px', fontWeight: 500, color: colors.charcoal, textDecoration: 'none' }}
                  >
                    {item.label}
                  </a>
                ))}
                <button 
                  onClick={() => {
                    setMenuOpen(false)
                    if (onCtaClick) onCtaClick()
                  }}
                  style={{ 
                    width: '100%',
                    padding: '12px 24px',
                    borderRadius: '10px',
                    background: colors.mint,
                    color: colors.white,
                    border: 'none',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    marginTop: '16px'
                  }}
                >
                  {ctaText}
                </button>
              </nav>
            </div>
          </>
        )}
      </header>
    </>
  )
}
