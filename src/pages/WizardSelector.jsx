import React from 'react'
import { Link } from 'react-router-dom'
import PageLayout from '../components/layout/PageLayout.jsx'
import { C } from '../theme/constants.js'
import { Sparkles, Zap, Layers, ArrowRight } from 'lucide-react'

const styles = `
  .wizard-selector-container {
    padding: 80px 0;
    min-height: calc(100vh - 100px);
  }
  .wizard-selector-header {
    text-align: center;
    margin-bottom: 64px;
  }
  .wizard-selector-header h1 {
    font-family: 'Fraunces', serif;
    font-size: 42px;
    font-weight: 600;
    letter-spacing: -1px;
    color: ${C.charcoal};
    margin-bottom: 12px;
  }
  .wizard-selector-header p {
    font-size: 16px;
    color: ${C.gray};
  }
  .wizard-options {
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  .wizard-card-featured {
    background: white;
    border: 2px solid ${C.mint};
    border-radius: 20px;
    padding: 32px;
    transition: all 0.3s ease;
    cursor: pointer;
    text-decoration: none;
    color: inherit;
    display: block;
    box-shadow: 0 0 0 1px ${C.mint}, 0 8px 24px rgba(26,122,109,0.08);
  }
  .wizard-card-featured:hover {
    transform: translateY(-4px);
    box-shadow: 0 0 0 1px ${C.mint}, 0 16px 40px rgba(26,122,109,0.12);
  }
  .wizard-card-featured-header {
    display: flex;
    align-items: start;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .wizard-card-featured-icon {
    width: 64px;
    height: 64px;
    border-radius: 16px;
    background: linear-gradient(135deg, ${C.mint}, ${C.mintLight});
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
  .wizard-card-featured-badge {
    padding: 6px 14px;
    background: ${C.gold};
    color: ${C.charcoal};
    font-size: 11px;
    font-weight: 700;
    border-radius: 20px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .wizard-card-featured h3 {
    font-family: 'Fraunces', serif;
    font-size: 28px;
    font-weight: 600;
    color: ${C.charcoal};
    margin-bottom: 8px;
  }
  .wizard-card-featured p {
    font-size: 15px;
    color: ${C.gray};
    line-height: 1.6;
    margin-bottom: 20px;
  }
  .wizard-card-featured-footer {
    display: flex;
    align-items: center;
    gap: 8px;
    color: ${C.mint};
    font-weight: 600;
    font-size: 15px;
  }
  .wizard-cards-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
  .wizard-card {
    background: white;
    border: 1px solid ${C.border};
    border-radius: 20px;
    padding: 32px;
    transition: all 0.3s ease;
    cursor: pointer;
    text-decoration: none;
    color: inherit;
    display: block;
  }
  .wizard-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0,0,0,0.06);
    border-color: ${C.mint};
  }
  .wizard-card-icon {
    width: 56px;
    height: 56px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }
  .wizard-card h3 {
    font-family: 'Fraunces', serif;
    font-size: 22px;
    font-weight: 600;
    color: ${C.charcoal};
    margin-bottom: 8px;
  }
  .wizard-card p {
    font-size: 14px;
    color: ${C.gray};
    line-height: 1.6;
    margin-bottom: 20px;
  }
  .wizard-card-footer {
    display: flex;
    align-items: center;
    gap: 8px;
    color: ${C.charcoal};
    font-weight: 600;
    font-size: 14px;
  }
  @media (max-width: 768px) {
    .wizard-cards-grid {
      grid-template-columns: 1fr;
    }
    .wizard-selector-header h1 {
      font-size: 32px;
    }
  }
`

export default function WizardSelector() {
  return (
    <PageLayout>
      <style>{styles}</style>
      <div className="enuw-container">
        <div className="wizard-selector-container">
          <div className="wizard-selector-header">
            <h1>Choose Your Experience</h1>
            <p>Select how you'd like to build your website</p>
          </div>

          <div className="wizard-options">
            {/* AI Builder - Featured */}
            <Link to="/wizard/ai" className="wizard-card-featured">
              <div className="wizard-card-featured-header">
                <div className="wizard-card-featured-icon">
                  <Sparkles size={32} />
                </div>
                <span className="wizard-card-featured-badge">FASTEST</span>
              </div>
              <h3>AI Builder</h3>
              <p>
                ChatGPT/Claude guides you through 17 questions with helpful resources. 
                Conversational, educational, step-by-step.
              </p>
              <div className="wizard-card-featured-footer">
                Try AI Builder
                <ArrowRight size={18} />
              </div>
            </Link>

            <div className="wizard-cards-grid">
              {/* Quick Wizard */}
              <Link to="/wizard/quick" className="wizard-card">
                <div className="wizard-card-icon" style={{ background: `${C.mint}18`, color: C.mint }}>
                  <Zap size={28} />
                </div>
                <h3>Quick Wizard</h3>
                <p>
                  4 pages, 2-3 minutes. Perfect for getting started quickly.
                </p>
                <div className="wizard-card-footer">
                  Start Quick
                  <ArrowRight size={16} />
                </div>
              </Link>

              {/* Form Mode Wizard */}
              <Link to="/wizard/form" className="wizard-card">
                <div className="wizard-card-icon" style={{ background: `${C.gold}18`, color: C.gold }}>
                  <Layers size={28} />
                </div>
                <h3>Form Mode</h3>
                <p>
                  Fill out all fields at once with live preview. Complete control.
                </p>
                <div className="wizard-card-footer">
                  Start Form
                  <ArrowRight size={16} />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
