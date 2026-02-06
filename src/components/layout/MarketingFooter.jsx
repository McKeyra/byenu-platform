import React from 'react'
import { Link } from 'react-router-dom'
import { colors } from '../../styles/design-system'

const css = `
  .marketing-footer {
    border-top: 1px solid ${colors.border};
    padding: 40px 32px;
    background: ${colors.cream};
  }
  .footer-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 24px;
  }
  .footer-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .footer-logo {
    font-family: 'Fraunces', serif;
    font-weight: 700;
    font-size: 18px;
    color: ${colors.charcoal};
    text-decoration: none;
  }
  .footer-logo span {
    color: ${colors.mint};
  }
  .footer-tagline {
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    color: ${colors.gray};
  }
  .footer-links {
    display: flex;
    gap: 24px;
    align-items: center;
  }
  .footer-link {
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    color: ${colors.gray};
    text-decoration: none;
    transition: color 0.2s;
  }
  .footer-link:hover {
    color: ${colors.charcoal};
  }
  @media (max-width: 640px) {
    .footer-container {
      flex-direction: column;
      text-align: center;
    }
    .footer-links {
      flex-direction: column;
      gap: 16px;
    }
  }
`

export default function MarketingFooter() {
  return (
    <>
      <style>{css}</style>
      <footer className="marketing-footer">
        <div className="footer-container">
          <div className="footer-left">
            <Link to="/" className="footer-logo">
              bye<span>NU</span>
            </Link>
            <span className="footer-tagline">Powered by ENUW</span>
          </div>
          <div className="footer-links">
            <Link to="/privacy" className="footer-link">Privacy</Link>
            <Link to="/terms" className="footer-link">Terms</Link>
            <Link to="/support" className="footer-link">Support</Link>
          </div>
        </div>
      </footer>
    </>
  )
}
