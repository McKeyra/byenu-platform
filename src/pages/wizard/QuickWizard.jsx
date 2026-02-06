import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createSubmission } from '../../api/submissions.js'
import { generateReport } from '../../api/reports.js'
import WizardLayout from '../../components/wizard/WizardLayout.jsx'
import { useAuth } from '../../lib/auth/AuthContext.jsx'

export default function QuickWizard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [currentPage, setCurrentPage] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    businessType: '',
    goals: [],
    audience: '',
    primaryCta: '',
    tone: [],
    colorDirections: [],
  })

  // Auto-save every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem('quickWizardDraft', JSON.stringify(formData))
    }, 60000)
    return () => clearInterval(interval)
  }, [formData])

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const email = user?.email || formData.email || prompt('Please enter your email to receive your report:')
      if (!email) {
        alert('Email is required')
        setIsSubmitting(false)
        return
      }

      const submission = await createSubmission({
        source: 'user',
        wizardType: 'quick',
        email,
        wizardData: formData,
      })

      const report = await generateReport(submission.id)
      navigate(`/wizard/success?submission=${submission.id}`)
    } catch (error) {
      console.error('Error submitting wizard:', error)
      alert('Error submitting. Please try again.')
      setIsSubmitting(false)
    }
  }

  const canProceed = () => {
    switch (currentPage) {
      case 1:
        return formData.businessName && formData.industry && formData.businessType
      case 2:
        return formData.goals.length > 0 && formData.audience && formData.primaryCta
      case 3:
        return formData.tone.length > 0 && formData.colorDirections.length > 0
      default:
        return true
    }
  }

  const handleNext = () => {
    if (currentPage < 4) {
      setCurrentPage(p => p + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    setCurrentPage(p => Math.max(1, p - 1))
  }

  return (
    <WizardLayout
      currentPage={currentPage}
      totalPages={4}
      onBack={handleBack}
      onNext={handleNext}
      canProceed={canProceed()}
      isSubmitting={isSubmitting}
    >
      {/* Page 1: Business Basics */}
      {currentPage === 1 && (
        <div>
          <h2 className="wizard-title">Tell us about your business</h2>
          
          <div className="wizard-form-group">
            <label className="wizard-label">Business Name</label>
            <input
              type="text"
              className="wizard-input"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              placeholder="Acme Inc."
            />
          </div>

          <div className="wizard-form-group">
            <label className="wizard-label">Industry</label>
            <select
              className="wizard-select"
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
            >
              <option value="">Select industry</option>
              <option value="restaurant">Restaurant</option>
              <option value="retail">Retail</option>
              <option value="professional-services">Professional Services</option>
              <option value="healthcare">Healthcare</option>
              <option value="fitness">Fitness</option>
              <option value="real-estate">Real Estate</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="wizard-form-group">
            <label className="wizard-label">Business Type</label>
            <select
              className="wizard-select"
              value={formData.businessType}
              onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
            >
              <option value="">Select type</option>
              <option value="solo">Solo / Freelancer</option>
              <option value="small">Small Business (1-10 employees)</option>
              <option value="medium">Medium Business (11-50 employees)</option>
              <option value="large">Large Business (50+ employees)</option>
            </select>
          </div>
        </div>
      )}

      {/* Page 2: Goals & Audience */}
      {currentPage === 2 && (
        <div>
          <h2 className="wizard-title">Goals & Audience</h2>
          
          <div className="wizard-form-group">
            <label className="wizard-label">What are your main goals? (Select all that apply)</label>
            <div className="wizard-checkbox-group">
              {['Generate Leads', 'Showcase Work', 'Sell Products', 'Book Appointments', 'Share Information'].map((goal) => (
                <label 
                  key={goal} 
                  className={`wizard-checkbox-item ${formData.goals.includes(goal) ? 'checked' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={formData.goals.includes(goal)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({ ...formData, goals: [...formData.goals, goal] })
                      } else {
                        setFormData({ ...formData, goals: formData.goals.filter(g => g !== goal) })
                      }
                    }}
                  />
                  <span>{goal}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="wizard-form-group">
            <label className="wizard-label">Target Audience</label>
            <input
              type="text"
              className="wizard-input"
              value={formData.audience}
              onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
              placeholder="e.g., Small business owners, Young professionals"
            />
          </div>

          <div className="wizard-form-group">
            <label className="wizard-label">Primary Call-to-Action</label>
            <input
              type="text"
              className="wizard-input"
              value={formData.primaryCta}
              onChange={(e) => setFormData({ ...formData, primaryCta: e.target.value })}
              placeholder="e.g., Get Started, Book Now, Contact Us"
            />
          </div>
        </div>
      )}

      {/* Page 3: Tone & Colors */}
      {currentPage === 3 && (
        <div>
          <h2 className="wizard-title">Design Direction</h2>
          
          <div className="wizard-form-group">
            <label className="wizard-label">Tone (Select all that apply)</label>
            <div className="wizard-checkbox-group">
              {['Professional', 'Friendly', 'Modern', 'Creative', 'Bold', 'Minimal'].map((tone) => (
                <label 
                  key={tone} 
                  className={`wizard-checkbox-item ${formData.tone.includes(tone) ? 'checked' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={formData.tone.includes(tone)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({ ...formData, tone: [...formData.tone, tone] })
                      } else {
                        setFormData({ ...formData, tone: formData.tone.filter(t => t !== tone) })
                      }
                    }}
                  />
                  <span>{tone}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="wizard-form-group">
            <label className="wizard-label">Color Scheme</label>
            <div className="wizard-color-grid">
              {[
                { id: 'blue-professional', name: 'Blue Professional', colors: ['#1e40af', '#3b82f6'] },
                { id: 'green-nature', name: 'Green Nature', colors: ['#166534', '#22c55e'] },
                { id: 'purple-creative', name: 'Purple Creative', colors: ['#7c3aed', '#a855f7'] },
                { id: 'warm-sunset', name: 'Warm Sunset', colors: ['#ea580c', '#f97316'] },
                { id: 'neutral-elegant', name: 'Neutral Elegant', colors: ['#1f2937', '#6b7280'] },
                { id: 'teal-modern', name: 'Teal Modern', colors: ['#0d9488', '#14b8a6'] },
              ].map((scheme) => (
                <label
                  key={scheme.id}
                  className={`wizard-color-item ${formData.colorDirections.includes(scheme.id) ? 'checked' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={formData.colorDirections.includes(scheme.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({ ...formData, colorDirections: [...formData.colorDirections, scheme.id] })
                      } else {
                        setFormData({ ...formData, colorDirections: formData.colorDirections.filter(c => c !== scheme.id) })
                      }
                    }}
                    className="hidden"
                  />
                  <div className="wizard-color-preview">
                    {scheme.colors.map((color, i) => (
                      <div key={i} style={{ backgroundColor: color }} />
                    ))}
                  </div>
                  <span className="wizard-color-name">{scheme.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Page 4: Review & Submit */}
      {currentPage === 4 && (
        <div>
          <h2 className="wizard-title">Review & Submit</h2>
          
          <div className="wizard-review-section">
            <div className="wizard-review-item">
              <div className="wizard-review-label">Business:</div>
              <div className="wizard-review-value">{formData.businessName}</div>
            </div>
            <div className="wizard-review-item">
              <div className="wizard-review-label">Industry:</div>
              <div className="wizard-review-value">{formData.industry}</div>
            </div>
            <div className="wizard-review-item">
              <div className="wizard-review-label">Goals:</div>
              <div className="wizard-review-value">{formData.goals.join(', ')}</div>
            </div>
            <div className="wizard-review-item">
              <div className="wizard-review-label">Audience:</div>
              <div className="wizard-review-value">{formData.audience}</div>
            </div>
          </div>

          <p style={{ color: '#6B7280', lineHeight: 1.6 }}>
            We'll generate a detailed report with your website breakdown and send it to your email. 
            You can review it in your dashboard and claim your website when you're ready.
          </p>
        </div>
      )}
    </WizardLayout>
  )
}
