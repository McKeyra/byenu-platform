import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import PageLayout from '../components/layout/PageLayout.jsx'
import { C } from '../theme/constants.js'
import { CheckCircle, Mail, FileText, CreditCard, Sparkles, ArrowRight, Loader2 } from 'lucide-react'

const successStyles = `
  .success-container {
    min-height: calc(100vh - 100px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 0;
  }
  .success-card {
    background: white;
    border: 1px solid ${C.border};
    border-radius: 24px;
    padding: 48px;
    max-width: 700px;
    width: 100%;
  }
  .success-icon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: ${C.mintGlow};
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 24px;
    color: ${C.mint};
  }
  .success-title {
    font-family: 'Fraunces', serif;
    font-size: 36px;
    font-weight: 600;
    color: ${C.charcoal};
    text-align: center;
    margin-bottom: 12px;
  }
  .success-subtitle {
    font-size: 16px;
    color: ${C.gray};
    text-align: center;
    margin-bottom: 40px;
    line-height: 1.6;
  }
  .success-steps {
    margin-bottom: 32px;
  }
  .success-step {
    display: flex;
    gap: 16px;
    padding: 20px;
    background: ${C.cream};
    border-radius: 16px;
    margin-bottom: 12px;
  }
  .success-step-icon {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .success-step-content h3 {
    font-weight: 600;
    color: ${C.charcoal};
    margin-bottom: 4px;
    font-size: 15px;
  }
  .success-step-content p {
    font-size: 13px;
    color: ${C.gray};
    line-height: 1.5;
  }
  .success-actions {
    text-align: center;
    margin-top: 32px;
  }
  .success-countdown {
    font-size: 14px;
    color: ${C.gray};
    margin-bottom: 16px;
  }
  .success-countdown strong {
    color: ${C.charcoal};
    font-weight: 600;
  }
  .success-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: ${C.mint};
    color: white;
    padding: 16px 32px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 15px;
    border: none;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.3s ease;
    width: 100%;
    justify-content: center;
  }
  .success-btn:hover {
    background: ${C.gold};
    color: ${C.charcoal};
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(26,122,109,0.15);
  }
  .success-footer {
    margin-top: 32px;
    padding-top: 24px;
    border-top: 1px solid ${C.border};
    text-align: center;
  }
  .success-footer p {
    font-size: 12px;
    color: ${C.grayLight};
  }
  @media (max-width: 640px) {
    .success-card {
      padding: 32px 24px;
    }
    .success-title {
      font-size: 28px;
    }
  }
`

export default function WizardSuccess() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const submissionId = searchParams.get('submission')
  const [countdown, setCountdown] = useState(22)
  const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setIsRedirecting(true)
          setTimeout(() => {
            navigate(`/dashboard?submission=${submissionId}`)
          }, 500)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [submissionId, navigate])

  const handleGoToDashboard = () => {
    setIsRedirecting(true)
    setTimeout(() => {
      navigate(`/dashboard?submission=${submissionId}`)
    }, 300)
  }

  return (
    <PageLayout>
      <style>{successStyles}</style>
      <div className="enuw-container">
        <div className="success-container">
          <div className="success-card">
            {/* Success Icon */}
            <div className="success-icon">
              <CheckCircle size={40} />
            </div>
            <h1 className="success-title">Thank You! 🎉</h1>
            <p className="success-subtitle">
              We've received your information and are creating your personalized website proposal.
            </p>

            {/* What's Next Section */}
            <div className="success-steps">
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: '24px', fontWeight: 600, color: C.charcoal, marginBottom: '24px', textAlign: 'center' }}>
                What's Next?
              </h2>

              <div className="success-step">
                <div className="success-step-icon" style={{ background: `${C.mint}18`, color: C.mint }}>
                  <Mail size={20} />
                </div>
                <div className="success-step-content">
                  <h3>Check Your Email</h3>
                  <p>
                    We've sent your personalized website proposal to your email. Review the breakdown of what you'll get.
                  </p>
                </div>
              </div>

              <div className="success-step">
                <div className="success-step-icon" style={{ background: `${C.mintLight}18`, color: C.mintLight }}>
                  <FileText size={20} />
                </div>
                <div className="success-step-content">
                  <h3>Review Your Report</h3>
                  <p>
                    See your site focus, typography, imagery style, and monetization features in your dashboard.
                  </p>
                </div>
              </div>

              <div className="success-step">
                <div className="success-step-icon" style={{ background: `${C.gold}18`, color: C.gold }}>
                  <CreditCard size={20} />
                </div>
                <div className="success-step-content">
                  <h3>Choose Your Plan</h3>
                  <p>
                    Select the membership plan that fits your budget and claim your website.
                  </p>
                </div>
              </div>

              <div className="success-step">
                <div className="success-step-icon" style={{ background: `${C.coral}18`, color: C.coral }}>
                  <Sparkles size={20} />
                </div>
                <div className="success-step-content">
                  <h3>Start Customizing</h3>
                  <p>
                    Once you claim your site, you can start customizing it immediately in our builder.
                  </p>
                </div>
              </div>
            </div>

            {/* Countdown & Button */}
            <div className="success-actions">
              {isRedirecting ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', color: C.gray }}>
                  <Loader2 size={20} className="animate-spin" />
                  <span>Redirecting to dashboard...</span>
                </div>
              ) : (
                <>
                  <p className="success-countdown">
                    Redirecting to your dashboard in <strong>{countdown}</strong> seconds...
                  </p>
                  <button onClick={handleGoToDashboard} className="success-btn">
                    Go to Dashboard Now
                    <ArrowRight size={18} />
                  </button>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="success-footer">
              <p>
                Questions? Check your email for support information or visit our help center.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
