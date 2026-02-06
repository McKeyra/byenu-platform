import React from 'react'
import PageLayout from '../layout/PageLayout.jsx'
import { C } from '../../theme/constants.js'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const wizardStyles = `
  .wizard-container {
    padding: 40px 0;
    min-height: calc(100vh - 100px);
  }
  .wizard-progress-container {
    margin-bottom: 32px;
  }
  .wizard-progress-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }
  .wizard-progress-label {
    font-size: 13px;
    color: ${C.gray};
    font-weight: 500;
  }
  .wizard-progress-bar {
    width: 100%;
    height: 4px;
    background: ${C.border};
    border-radius: 2px;
    overflow: hidden;
  }
  .wizard-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, ${C.mint}, ${C.mintLight});
    transition: width 0.5s cubic-bezier(0.16,1,0.3,1);
    border-radius: 2px;
  }
  .wizard-card {
    background: white;
    border: 1px solid ${C.border};
    border-radius: 20px;
    padding: 40px;
    max-width: 800px;
    margin: 0 auto;
  }
  .wizard-title {
    font-family: 'Fraunces', serif;
    font-size: 32px;
    font-weight: 600;
    letter-spacing: -0.5px;
    color: ${C.charcoal};
    margin-bottom: 24px;
  }
  .wizard-form-group {
    margin-bottom: 24px;
  }
  .wizard-label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: ${C.charcoal};
    margin-bottom: 8px;
  }
  .wizard-input {
    width: 100%;
    padding: 16px 20px;
    border: 2px solid ${C.border};
    border-radius: 14px;
    font-size: 16px;
    font-family: inherit;
    color: ${C.charcoal};
    transition: border-color 0.2s;
    outline: none;
    background: ${C.cream};
  }
  .wizard-input:focus {
    border-color: ${C.mint};
    background: white;
  }
  .wizard-select {
    width: 100%;
    padding: 16px 20px;
    border: 2px solid ${C.border};
    border-radius: 14px;
    font-size: 16px;
    font-family: inherit;
    color: ${C.charcoal};
    transition: border-color 0.2s;
    outline: none;
    background: ${C.cream};
    cursor: pointer;
  }
  .wizard-select:focus {
    border-color: ${C.mint};
    background: white;
  }
  .wizard-checkbox-group {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 12px;
    margin-top: 12px;
  }
  .wizard-checkbox-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 16px;
    border: 2px solid ${C.border};
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s;
    background: white;
  }
  .wizard-checkbox-item:hover {
    border-color: ${C.mint};
    background: ${C.mintGlow};
  }
  .wizard-checkbox-item input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: ${C.mint};
    cursor: pointer;
  }
  .wizard-checkbox-item.checked {
    border-color: ${C.mint};
    background: ${C.mintGlow};
  }
  .wizard-color-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-top: 12px;
  }
  .wizard-color-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 16px;
    border: 2px solid ${C.border};
    border-radius: 14px;
    cursor: pointer;
    transition: all 0.2s;
    background: white;
  }
  .wizard-color-item:hover {
    border-color: ${C.mint};
  }
  .wizard-color-item.checked {
    border-color: ${C.mint};
    background: ${C.mintGlow};
  }
  .wizard-color-preview {
    display: flex;
    gap: 4px;
  }
  .wizard-color-preview div {
    width: 32px;
    height: 32px;
    border-radius: 6px;
  }
  .wizard-color-name {
    font-size: 12px;
    color: ${C.charcoal};
    font-weight: 500;
    text-align: center;
  }
  .wizard-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 40px;
    padding-top: 24px;
    border-top: 1px solid ${C.border};
  }
  .wizard-btn-back {
    display: flex;
    align-items: center;
    gap: 8px;
    background: none;
    border: none;
    color: ${C.gray};
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    font-family: inherit;
    padding: 10px 0;
    transition: color 0.2s;
  }
  .wizard-btn-back:hover:not(:disabled) {
    color: ${C.charcoal};
  }
  .wizard-btn-back:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  .wizard-btn-next {
    display: flex;
    align-items: center;
    gap: 8px;
    background: ${C.mint};
    color: white;
    padding: 14px 28px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 15px;
    border: none;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.3s ease;
  }
  .wizard-btn-next:hover:not(:disabled) {
    background: ${C.gold};
    color: ${C.charcoal};
    transform: translateY(-1px);
  }
  .wizard-btn-next:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  .wizard-review-section {
    background: ${C.cream};
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 24px;
  }
  .wizard-review-item {
    margin-bottom: 16px;
  }
  .wizard-review-item:last-child {
    margin-bottom: 0;
  }
  .wizard-review-label {
    font-size: 13px;
    color: ${C.gray};
    margin-bottom: 4px;
  }
  .wizard-review-value {
    font-weight: 600;
    color: ${C.charcoal};
  }
  @media (max-width: 640px) {
    .wizard-card {
      padding: 24px;
    }
    .wizard-title {
      font-size: 24px;
    }
    .wizard-checkbox-group {
      grid-template-columns: 1fr;
    }
    .wizard-color-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`

export default function WizardLayout({ 
  currentPage, 
  totalPages, 
  onBack, 
  onNext, 
  canProceed, 
  isSubmitting = false,
  children 
}) {
  const progress = (currentPage / totalPages) * 100

  return (
    <PageLayout>
      <style>{wizardStyles}</style>
      <div className="enuw-container">
        <div className="wizard-container">
          {/* Progress Bar */}
          <div className="wizard-progress-container">
            <div className="wizard-progress-header">
              <span className="wizard-progress-label">Page {currentPage} of {totalPages}</span>
              <span className="wizard-progress-label">{Math.round(progress)}%</span>
            </div>
            <div className="wizard-progress-bar">
              <div className="wizard-progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Wizard Content */}
          <div className="wizard-card">
            {children}

            {/* Footer Navigation */}
            <div className="wizard-footer">
              <button
                className="wizard-btn-back"
                onClick={onBack}
                disabled={currentPage === 1}
                style={{ visibility: currentPage === 1 ? 'hidden' : 'visible' }}
              >
                <ArrowLeft size={18} />
                Back
              </button>

              <button
                className="wizard-btn-next"
                onClick={onNext}
                disabled={!canProceed || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    {currentPage === totalPages ? 'Generate Report' : 'Continue'}
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
