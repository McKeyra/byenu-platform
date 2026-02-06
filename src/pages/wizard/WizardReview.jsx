import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../lib/auth/AuthContext.jsx'
import { getWizardSession } from '../../api/wizard.js'
import { generatePageStructure } from '../../api/component-library.js'
import { generateSite } from '../../api/sites.js'
import { colors, borderRadius, shadows, transitions } from '../../styles/design-system'
import { Check, ArrowRight, Loader2 } from 'lucide-react'

/**
 * Wizard Review Page
 * Shows extracted data and allows final edits before deployment
 */
export default function WizardReview() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const sessionId = searchParams.get('session')
  const [session, setSession] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDeploying, setIsDeploying] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!sessionId || !user) {
      navigate('/wizard/conversational')
      return
    }

    const loadSession = async () => {
      try {
        const data = await getWizardSession(sessionId, user.id)
        setSession(data)
      } catch (err) {
        console.error('Error loading session:', err)
        setError('Failed to load session')
      } finally {
        setIsLoading(false)
      }
    }

    loadSession()
  }, [sessionId, user, navigate])

  const handleDeploy = async () => {
    if (!session || !user) return

    setIsDeploying(true)
    try {
      // Convert wizard data to submission format
      const wizardData = {
        businessName: session.extractedData.businessName,
        businessDescription: session.extractedData.aboutContent,
        industry: session.extractedData.industry,
        audience: session.extractedData.targetAudience,
        tone: session.extractedData.brandVoice || [],
        colorDirections: session.extractedData.selectedStyle ? [session.extractedData.selectedStyle] : [],
        desiredPages: session.extractedData.pages?.map(p => p.type) || [],
        services: session.extractedData.services || [],
        features: session.extractedData.features || [],
        primaryCta: 'Get Started',
        businessDocs: {
          businessDescription: session.extractedData.aboutContent,
          services: session.extractedData.services,
          team: session.extractedData.teamInfo,
          testimonials: session.extractedData.testimonials
        }
      }

      // Create submission
      const { createSubmission } = await import('../../api/submissions.js')
      const submission = await createSubmission({
        wizardType: 'conversational',
        email: user.email,
        wizardData
      })

      // Generate report
      const { generateReport } = await import('../../api/reports.js')
      const report = await generateReport(submission.id, wizardData)

      // Redirect to claim page
      navigate(`/claim?submission=${submission.id}`)
    } catch (err) {
      console.error('Error deploying:', err)
      setError('Failed to deploy site. Please try again.')
      setIsDeploying(false)
    }
  }

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: colors.bg
      }}>
        <Loader2 size={32} style={{ color: colors.mint, animation: 'spin 1s linear infinite' }} />
      </div>
    )
  }

  if (error || !session) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: colors.bg,
        padding: '32px'
      }}>
        <div style={{
          background: colors.white,
          padding: '48px',
          borderRadius: borderRadius.large,
          maxWidth: '600px',
          textAlign: 'center'
        }}>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: '24px', marginBottom: '16px' }}>
            {error || 'Session not found'}
          </h2>
          <button
            onClick={() => navigate('/wizard/conversational')}
            style={{
              padding: '12px 24px',
              borderRadius: borderRadius.button,
              background: colors.mint,
              color: colors.white,
              border: 'none',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Start New Session
          </button>
        </div>
      </div>
    )
  }

  const { extractedData } = session

  return (
    <>
      <style>{`
        .review-page {
          min-height: 100vh;
          background: ${colors.bg};
          padding: 48px 32px;
        }
        .review-container {
          max-width: 900px;
          margin: 0 auto;
        }
        .review-header {
          text-align: center;
          margin-bottom: 48px;
        }
        .review-title {
          font-family: 'Fraunces', serif;
          font-size: 44px;
          font-weight: 600;
          color: ${colors.charcoal};
          margin-bottom: 16px;
          letter-spacing: -0.8px;
        }
        .review-subtitle {
          font-family: 'DM Sans', sans-serif;
          font-size: 18px;
          color: ${colors.gray};
        }
        .review-section {
          background: ${colors.white};
          border-radius: ${borderRadius.large};
          padding: 32px;
          margin-bottom: 24px;
          border: 1px solid ${colors.border};
        }
        .section-title {
          font-family: 'Fraunces', serif;
          font-size: 20px;
          font-weight: 600;
          color: ${colors.charcoal};
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .section-content {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          color: ${colors.charcoal};
          line-height: 1.6;
        }
        .section-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .section-list-item {
          padding: 8px 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .section-list-item::before {
          content: '✓';
          color: ${colors.mint};
          font-weight: 600;
        }
        .deploy-section {
          background: ${colors.charcoal};
          border-radius: ${borderRadius.large};
          padding: 48px;
          text-align: center;
          margin-top: 48px;
        }
        .deploy-title {
          font-family: 'Fraunces', serif;
          font-size: 32px;
          font-weight: 600;
          color: ${colors.white};
          margin-bottom: 16px;
        }
        .deploy-subtitle {
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 32px;
        }
        .deploy-button {
          padding: 16px 32px;
          border-radius: ${borderRadius.button};
          background: ${colors.gold};
          color: ${colors.charcoal};
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: ${transitions.default};
        }
        .deploy-button:hover:not(:disabled) {
          background: ${colors.white};
          transform: translateY(-2px);
        }
        .deploy-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
      <div className="review-page">
        <div className="review-container">
          <div className="review-header">
            <h1 className="review-title">Review Your Site</h1>
            <p className="review-subtitle">
              Here's everything we're building for {extractedData.businessName || 'your business'}
            </p>
          </div>

          {/* Business Info */}
          {extractedData.businessName && (
            <div className="review-section">
              <h2 className="section-title">
                <Check size={20} style={{ color: colors.mint }} />
                Business Information
              </h2>
              <div className="section-content">
                <p><strong>Name:</strong> {extractedData.businessName}</p>
                {extractedData.industry && <p><strong>Industry:</strong> {extractedData.industry}</p>}
                {extractedData.targetAudience && (
                  <p><strong>Target Audience:</strong> {extractedData.targetAudience}</p>
                )}
                {extractedData.tagline && <p><strong>Tagline:</strong> {extractedData.tagline}</p>}
              </div>
            </div>
          )}

          {/* Services */}
          {extractedData.services && extractedData.services.length > 0 && (
            <div className="review-section">
              <h2 className="section-title">
                <Check size={20} style={{ color: colors.mint }} />
                Services
              </h2>
              <ul className="section-list">
                {extractedData.services.map((service, i) => (
                  <li key={i} className="section-list-item">
                    {typeof service === 'string' ? service : service.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Brand Voice */}
          {extractedData.brandVoice && extractedData.brandVoice.length > 0 && (
            <div className="review-section">
              <h2 className="section-title">
                <Check size={20} style={{ color: colors.mint }} />
                Brand Personality
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {extractedData.brandVoice.map((voice, i) => (
                  <span
                    key={i}
                    style={{
                      padding: '6px 12px',
                      borderRadius: borderRadius.pill,
                      background: colors.mintGlow,
                      color: colors.mint,
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '13px',
                      fontWeight: 600
                    }}
                  >
                    {voice}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Style */}
          {extractedData.selectedStyle && (
            <div className="review-section">
              <h2 className="section-title">
                <Check size={20} style={{ color: colors.mint }} />
                Selected Style
              </h2>
              <div className="section-content">
                <p>{extractedData.selectedStyle}</p>
              </div>
            </div>
          )}

          {/* Features */}
          {extractedData.features && extractedData.features.length > 0 && (
            <div className="review-section">
              <h2 className="section-title">
                <Check size={20} style={{ color: colors.mint }} />
                Site Features
              </h2>
              <ul className="section-list">
                {extractedData.features.map((feature, i) => (
                  <li key={i} className="section-list-item">
                    {typeof feature === 'string' ? feature : feature.type}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Deploy Section */}
          <div className="deploy-section">
            <h2 className="deploy-title">Ready to Deploy?</h2>
            <p className="deploy-subtitle">
              Your site will be generated and ready to claim. You'll receive a detailed report via email.
            </p>
            <button
              onClick={handleDeploy}
              disabled={isDeploying}
              className="deploy-button"
            >
              {isDeploying ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Deploying...
                </>
              ) : (
                <>
                  Deploy Site <ArrowRight size={20} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
