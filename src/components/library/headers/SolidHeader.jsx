import { ChevronDown } from 'lucide-react'
import { colors, borderRadius, transitions } from '../../../styles/design-system'

/**
 * Solid Header with Dropdown Menu
 * Matches 22C-CORP design system
 */
export default function SolidHeader({
  logo = 'byeNU',
  navItems = [],
  dropdownItems = {},
  ctaText = 'Book a Call',
  onCtaClick
}) {
  const defaultNavItems = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services', hasDropdown: true },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' }
  ]

  const items = navItems.length > 0 ? navItems : defaultNavItems
  const defaultDropdown = {
    Services: [
      { label: 'Web Design', href: '#web-design' },
      { label: 'Development', href: '#development' },
      { label: 'Marketing', href: '#marketing' }
    ]
  }
  const dropdowns = Object.keys(dropdownItems).length > 0 ? dropdownItems : defaultDropdown

  return (
    <>
      <style>{`
        .solid-header {
          background: ${colors.white};
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          position: sticky;
          top: 0;
          z-index: 50;
        }
        .dropdown-group {
          position: relative;
        }
        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          margin-top: 8px;
          width: 192px;
          background: ${colors.white};
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
          border-radius: ${borderRadius.card};
          overflow: hidden;
          opacity: 0;
          visibility: hidden;
          transition: ${transitions.default};
        }
        .dropdown-group:hover .dropdown-menu {
          opacity: 1;
          visibility: visible;
        }
        .dropdown-link {
          display: block;
          padding: 12px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: ${colors.charcoal};
          text-decoration: none;
          transition: ${transitions.default};
        }
        .dropdown-link:hover {
          background: ${colors.cream};
          color: ${colors.mint};
        }
      `}</style>
      <header className="solid-header">
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '16px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
            {/* Logo */}
            <a href="#" style={{
              fontFamily: "'Fraunces', serif",
              fontSize: '20px',
              fontWeight: 700,
              color: colors.charcoal,
              textDecoration: 'none'
            }}>
              {logo.split('NU').length > 1 ? (
                <>bye<span style={{ color: colors.mint }}>NU</span></>
              ) : logo}
            </a>

            {/* Nav with Dropdown */}
            <nav style={{ display: 'none', gap: '32px', alignItems: 'center' }} className="md:flex">
              {items.map(item => (
                item.hasDropdown ? (
                  <div key={item.label} className="dropdown-group">
                    <button style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '13px',
                      fontWeight: 500,
                      color: colors.gray,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      transition: transitions.default
                    }}
                    onMouseEnter={(e) => e.target.style.color = colors.mint}
                    onMouseLeave={(e) => e.target.style.color = colors.gray}
                    >
                      {item.label} <ChevronDown size={16} />
                    </button>
                    {dropdowns[item.label] && (
                      <div className="dropdown-menu">
                        {dropdowns[item.label].map(link => (
                          <a
                            key={link.label}
                            href={link.href}
                            className="dropdown-link"
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '13px',
                      fontWeight: 500,
                      color: colors.gray,
                      textDecoration: 'none',
                      transition: transitions.default
                    }}
                    onMouseEnter={(e) => e.target.style.color = colors.mint}
                    onMouseLeave={(e) => e.target.style.color = colors.gray}
                  >
                    {item.label}
                  </a>
                )
              ))}
            </nav>
          </div>

          <button
            onClick={onCtaClick}
            style={{
              padding: '10px 20px',
              borderRadius: borderRadius.button,
              background: colors.mint,
              color: colors.white,
              border: 'none',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: transitions.default
            }}
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
        </div>
      </header>
    </>
  )
}
