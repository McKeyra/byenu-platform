import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { colors, typography, spacing, borderRadius, transitions } from '../../../styles/design-system'

/**
 * Contact Section - Form + Info
 * Matches 22C-CORP design system
 */
export default function ContactSection({
  title = 'Get in Touch',
  subtitle = 'Have questions? We\'d love to hear from you. Send us a message and we\'ll respond within 24 hours.',
  contactInfo = {},
  onSubmit
}) {
  const defaultContactInfo = {
    email: 'hello@byenu.com',
    phone: '+1 (416) 555-1234',
    address: {
      line1: '123 King Street West',
      line2: 'Toronto, ON M5H 1A1'
    }
  }

  const info = Object.keys(contactInfo).length > 0 ? contactInfo : defaultContactInfo

  return (
    <>
      <style>{`
        .contact-section {
          padding: ${spacing.section.vertical} 0;
          background: ${colors.white};
        }
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .contact-title {
          font-family: ${typography.heading.fontFamily};
          font-size: 44px;
          font-weight: 600;
          color: ${colors.charcoal};
          margin-bottom: 24px;
          letter-spacing: -0.8px;
        }
        .contact-subtitle {
          font-family: ${typography.body.fontFamily};
          font-size: 20px;
          color: ${colors.gray};
          margin-bottom: 48px;
        }
        .contact-info-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 24px;
        }
        .contact-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: ${colors.mintGlow};
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .contact-info-label {
          font-family: ${typography.body.fontFamily};
          font-size: 15px;
          font-weight: 600;
          color: ${colors.charcoal};
          margin-bottom: 4px;
        }
        .contact-info-value {
          font-family: ${typography.body.fontFamily};
          font-size: 15px;
          color: ${colors.gray};
        }
        .contact-link {
          color: ${colors.mint};
          text-decoration: none;
          transition: ${transitions.default};
        }
        .contact-link:hover {
          text-decoration: underline;
        }
        .contact-form {
          background: ${colors.cream};
          border-radius: ${borderRadius.large};
          padding: 32px;
        }
        .contact-form-group {
          margin-bottom: 24px;
        }
        .contact-form-label {
          display: block;
          font-family: ${typography.body.fontFamily};
          font-size: 14px;
          font-weight: 600;
          color: ${colors.charcoal};
          margin-bottom: 8px;
        }
        .contact-form-input {
          width: 100%;
          padding: 14px 16px;
          border-radius: ${borderRadius.input};
          border: 1px solid ${colors.border};
          font-family: ${typography.body.fontFamily};
          font-size: 15px;
          color: ${colors.charcoal};
          background: ${colors.white};
          transition: ${transitions.default};
        }
        .contact-form-input:focus {
          outline: none;
          border-color: ${colors.mint};
          box-shadow: 0 0 0 4px ${colors.mintGlow};
        }
        .contact-form-textarea {
          resize: none;
          min-height: 120px;
        }
        @media (min-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
      <section className="contact-section">
        <div style={{ maxWidth: spacing.container.maxWidth, margin: '0 auto', padding: `0 ${spacing.container.padding}` }}>
          <div className="contact-grid">
            {/* Left: Info */}
            <div>
              <h2 className="contact-title">{title}</h2>
              <p className="contact-subtitle">{subtitle}</p>

              <div>
                {info.email && (
                  <div className="contact-info-item">
                    <div className="contact-icon-wrapper">
                      <Mail style={{ color: colors.mint }} size={20} />
                    </div>
                    <div>
                      <div className="contact-info-label">Email</div>
                      <a href={`mailto:${info.email}`} className="contact-info-value contact-link">
                        {info.email}
                      </a>
                    </div>
                  </div>
                )}

                {info.phone && (
                  <div className="contact-info-item">
                    <div className="contact-icon-wrapper">
                      <Phone style={{ color: colors.mint }} size={20} />
                    </div>
                    <div>
                      <div className="contact-info-label">Phone</div>
                      <a href={`tel:${info.phone}`} className="contact-info-value contact-link">
                        {info.phone}
                      </a>
                    </div>
                  </div>
                )}

                {info.address && (
                  <div className="contact-info-item">
                    <div className="contact-icon-wrapper">
                      <MapPin style={{ color: colors.mint }} size={20} />
                    </div>
                    <div>
                      <div className="contact-info-label">Office</div>
                      <div className="contact-info-value">
                        {info.address.line1}<br />
                        {info.address.line2}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Form */}
            <div className="contact-form">
              <form onSubmit={(e) => {
                e.preventDefault()
                if (onSubmit) onSubmit(new FormData(e.target))
              }}>
                <div className="contact-form-group">
                  <label className="contact-form-label">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    className="contact-form-input"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="contact-form-group">
                  <label className="contact-form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className="contact-form-input"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div className="contact-form-group">
                  <label className="contact-form-label">Message</label>
                  <textarea
                    name="message"
                    rows={5}
                    className="contact-form-input contact-form-textarea"
                    placeholder="Tell us about your project..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '16px 32px',
                    borderRadius: borderRadius.button,
                    background: colors.mint,
                    color: colors.white,
                    fontFamily: typography.body.fontFamily,
                    fontSize: '16px',
                    fontWeight: 600,
                    border: 'none',
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
                  Send Message <Send size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
