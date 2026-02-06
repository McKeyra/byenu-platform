import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { colors, borderRadius, transitions } from '../../styles/design-system'

const css = `
  .marketing-nav {
    position: sticky;
    top: 0;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(12px);
    z-index: 100;
    border-bottom: 1px solid ${colors.border};
    transition: ${transitions.default};
  }
  .marketing-nav.scrolled {
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(20px);
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }
  .nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 72px;
  }
  .nav-logo {
    font-family: 'Fraunces', serif;
    font-weight: 700;
    font-size: 20px;
    color: ${colors.charcoal};
    text-decoration: none;
    letter-spacing: -0.5px;
  }
  .nav-logo span {
    color: ${colors.mint};
  }
  .nav-links {
    display: flex;
    gap: 40px;
    align-items: center;
  }
  .nav-link {
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: ${colors.gray};
    text-decoration: none;
    transition: ${transitions.default};
    position: relative;
    padding-bottom: 4px;
  }
  .nav-link:hover {
    color: ${colors.charcoal};
  }
  .nav-link.active {
    color: ${colors.charcoal};
  }
  .nav-link.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${colors.mint};
  }
  .nav-cta {
    background: ${colors.mint};
    color: white;
    padding: 10px 20px;
    border-radius: ${borderRadius.button};
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    text-decoration: none;
    transition: ${transitions.default};
    border: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .nav-cta:hover {
    background: ${colors.gold};
    color: ${colors.charcoal};
    transform: translateY(-1px);
  }
  .mobile-menu-btn {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    color: ${colors.charcoal};
  }
  .mobile-drawer {
    position: fixed;
    top: 0;
    right: 0;
    width: 320px;
    height: 100vh;
    background: white;
    box-shadow: -4px 0 24px rgba(0,0,0,0.1);
    z-index: 200;
    padding: 32px;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  }
  .mobile-drawer.open {
    transform: translateX(0);
  }
  .mobile-drawer-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
  }
  .mobile-drawer-links {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  .mobile-drawer-link {
    font-family: 'DM Sans', sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: ${colors.charcoal};
    text-decoration: none;
  }
  .mobile-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.3);
    z-index: 199;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }
  .mobile-overlay.open {
    opacity: 1;
    pointer-events: all;
  }
  @media (max-width: 1024px) {
    .nav-links {
      display: none;
    }
    .mobile-menu-btn {
      display: block;
    }
  }
  @media (max-width: 640px) {
    .nav-container {
      padding: 0 20px;
    }
  }
`

export default function MarketingNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path) => location.pathname === path

  const handleStartBuilding = () => {
    window.location.href = '/build'
  }

  return (
    <>
      <style>{css}</style>
      <nav className={`marketing-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            bye<span>NU</span>
          </Link>
          
          <div className="nav-links">
            <Link to="/features" className={`nav-link ${isActive('/features') ? 'active' : ''}`}>
              Features
            </Link>
            <Link to="/pricing" className={`nav-link ${isActive('/pricing') ? 'active' : ''}`}>
              Pricing
            </Link>
            <Link to="/examples" className={`nav-link ${isActive('/examples') ? 'active' : ''}`}>
              Examples
            </Link>
            <button className="nav-cta" onClick={handleStartBuilding}>
              Start Building →
            </button>
          </div>

          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div 
        className={`mobile-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-header">
          <Link to="/" className="nav-logo" onClick={() => setMobileMenuOpen(false)}>
            bye<span>NU</span>
          </Link>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>
        <div className="mobile-drawer-links">
          <Link 
            to="/features" 
            className="mobile-drawer-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Features
          </Link>
          <Link 
            to="/pricing" 
            className="mobile-drawer-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Pricing
          </Link>
          <Link 
            to="/examples" 
            className="mobile-drawer-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Examples
          </Link>
          <button 
            className="nav-cta"
            onClick={() => {
              setMobileMenuOpen(false)
              handleStartBuilding()
            }}
            style={{ width: '100%', justifyContent: 'center', marginTop: '16px' }}
          >
            Start Building →
          </button>
        </div>
      </div>
    </>
  )
}
