import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { colors, typography, spacing, borderRadius, transitions } from '../../../styles/design-system'

/**
 * Standard Footer with Multiple Columns
 * Matches 22C-CORP design system
 */
export default function StandardFooter({
  brandName = 'byeNU',
  tagline = 'Build professional websites in minutes with AI',
  footerLinks = {},
  socialLinks = {},
  copyright = '© 2026 byeNU. All rights reserved.'
}) {
  const defaultFooterLinks = {
    Product: ['Features', 'Pricing', 'Templates', 'Integrations'],
    Company: ['About', 'Blog', 'Careers', 'Press'],
    Resources: ['Help Center', 'Tutorials', 'API Docs', 'Community'],
    Legal: ['Privacy', 'Terms', 'Security', 'Cookies']
  }

  const links = Object.keys(footerLinks).length > 0 ? footerLinks : defaultFooterLinks
  const defaultSocial = {
    twitter: '#',
    facebook: '#',
    instagram: '#',
    linkedin: '#'
  }
  const social = Object.keys(socialLinks).length > 0 ? socialLinks : defaultSocial

  return (
    <>
      <style>{`
        .standard-footer {
          background: ${colors.charcoal};
          color: ${colors.white};
        }
        .footer-content {
          padding: 64px 32px;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          margin-bottom: 48px;
        }
        .footer-brand {
          font-family: ${typography.heading.fontFamily};
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 16px;
        }
        .footer-tagline {
          font-family: ${typography.body.fontFamily};
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 24px;
        }
        .footer-social {
          display: flex;
          gap: 16px;
        }
        .footer-social-link {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${colors.white};
          text-decoration: none;
          transition: ${transitions.default};
        }
        .footer-social-link:hover {
          background: ${colors.mint};
        }
        .footer-column-title {
          font-family: ${typography.body.fontFamily};
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 16px;
        }
        .footer-column-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .footer-column-link {
          margin-bottom: 12px;
        }
        .footer-column-link a {
          font-family: ${typography.body.fontFamily};
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          transition: ${transitions.default};
        }
        .footer-column-link a:hover {
          color: ${colors.white};
        }
        .footer-bottom {
          padding-top: 32px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          flex-direction: column;
          gap: 16px;
          justify-content: space-between;
          align-items: center;
        }
        .footer-copyright {
          font-family: ${typography.body.fontFamily};
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
        }
        .footer-bottom-links {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .footer-bottom-link {
          font-family: ${typography.body.fontFamily};
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          transition: ${transitions.default};
        }
        .footer-bottom-link:hover {
          color: ${colors.white};
        }
        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr repeat(4, 1fr);
          }
          .footer-bottom {
            flex-direction: row;
          }
        }
      `}</style>
      <footer className="standard-footer">
        <div style={{ maxWidth: spacing.container.maxWidth, margin: '0 auto' }}>
          <div className="footer-content">
            <div className="footer-grid">
              {/* Brand Column */}
              <div>
                <div className="footer-brand">
                  {brandName.split('NU').length > 1 ? (
                    <>bye<span style={{ color: colors.mint }}>NU</span></>
                  ) : brandName}
                </div>
                <p className="footer-tagline">{tagline}</p>
                <div className="footer-social">
                  {social.twitter && (
                    <a href={social.twitter} className="footer-social-link" aria-label="Twitter">
                      <Twitter size={18} />
                    </a>
                  )}
                  {social.facebook && (
                    <a href={social.facebook} className="footer-social-link" aria-label="Facebook">
                      <Facebook size={18} />
                    </a>
                  )}
                  {social.instagram && (
                    <a href={social.instagram} className="footer-social-link" aria-label="Instagram">
                      <Instagram size={18} />
                    </a>
                  )}
                  {social.linkedin && (
                    <a href={social.linkedin} className="footer-social-link" aria-label="LinkedIn">
                      <Linkedin size={18} />
                    </a>
                  )}
                </div>
              </div>

              {/* Link Columns */}
              {Object.entries(links).map(([title, linkItems]) => (
                <div key={title}>
                  <h3 className="footer-column-title">{title}</h3>
                  <ul className="footer-column-links">
                    {linkItems.map(link => (
                      <li key={link} className="footer-column-link">
                        <a href="#">{link}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Bottom Bar */}
            <div className="footer-bottom">
              <div className="footer-copyright">{copyright}</div>
              <div className="footer-bottom-links">
                <a href="#" className="footer-bottom-link">Privacy Policy</a>
                <a href="#" className="footer-bottom-link">Terms of Service</a>
                <a href="#" className="footer-bottom-link">Cookie Settings</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
