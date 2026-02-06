import React from 'react'
import { Link } from 'react-router-dom'
import MarketingLayout from '../../components/layout/MarketingLayout.jsx'
import { colors, borderRadius, shadows, transitions } from '../../styles/design-system'
import { Bolt, Check, Eye, Zap, ArrowRight, Sparkles, MessageSquare } from 'lucide-react'

const css = `
  .landing-hero {
    padding: 80px 0 96px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    align-items: center;
  }
  .hero-badge {
    display: inline-block;
    background: ${colors.mint};
    color: white;
    padding: 6px 12px;
    border-radius: 6px;
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 3px;
    margin-bottom: 24px;
  }
  .hero-headline {
    font-family: 'Fraunces', serif;
    font-size: 52px;
    font-weight: 600;
    color: ${colors.charcoal};
    line-height: 1.1;
    margin-bottom: 24px;
    letter-spacing: -1px;
  }
  .hero-subtext {
    font-family: 'DM Sans', sans-serif;
    font-size: 17px;
    color: ${colors.gray};
    line-height: 1.6;
    margin-bottom: 32px;
  }
  .hero-cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: ${colors.mint};
    color: white;
    padding: 16px 32px;
    border-radius: ${borderRadius.button};
    font-family: 'DM Sans', sans-serif;
    font-size: 16px;
    font-weight: 600;
    text-decoration: none;
    transition: ${transitions.default};
  }
  .hero-cta:hover {
    background: ${colors.gold};
    color: ${colors.charcoal};
    transform: translateY(-2px);
  }
  .chat-mockup {
    background: white;
    border: 1px solid ${colors.mintBorder};
    border-radius: 20px;
    padding: 24px;
    box-shadow: ${shadows.elevated};
    position: relative;
  }
  .build-time-badge {
    position: absolute;
    top: -12px;
    right: 24px;
    background: ${colors.gold};
    color: ${colors.charcoal};
    padding: 6px 12px;
    border-radius: 8px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    font-weight: 600;
  }
  .chat-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${colors.border};
  }
  .chat-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${colors.mint};
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
  .chat-name {
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: ${colors.charcoal};
  }
  .chat-bubble {
    padding: 12px 16px;
    border-radius: 16px;
    margin-bottom: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    line-height: 1.5;
  }
  .chat-bubble.user {
    background: ${colors.charcoal};
    color: white;
    border-radius: 16px 16px 4px 16px;
    margin-left: auto;
    max-width: 80%;
  }
  .chat-bubble.ai {
    background: #FAF3E0;
    color: ${colors.charcoal};
    border-radius: 16px 16px 16px 4px;
    max-width: 85%;
  }
  .typing-dots {
    display: flex;
    gap: 4px;
    padding: 12px 16px;
  }
  .typing-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${colors.grayLight};
    animation: typingPulse 1.4s infinite;
  }
  .typing-dot:nth-child(2) { animation-delay: 0.15s; }
  .typing-dot:nth-child(3) { animation-delay: 0.3s; }
  @keyframes typingPulse {
    0%, 100% { opacity: 0.3; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1); }
  }
  .preview-card {
    margin-top: 16px;
    padding: 16px;
    background: ${colors.cream};
    border-radius: 12px;
    border: 1px solid ${colors.border};
  }
  .preview-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
  }
  .live-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${colors.success};
    animation: livePulse 2s infinite;
  }
  @keyframes livePulse {
    0%, 100% { box-shadow: 0 0 0 0 ${colors.success}; }
    50% { box-shadow: 0 0 0 4px rgba(34,197,94,0.3); }
  }
  .mini-features {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin: 64px 0;
  }
  .mini-feature-card {
    background: white;
    border: 1px solid ${colors.border};
    border-radius: 16px;
    padding: 24px;
    transition: ${transitions.card};
  }
  .mini-feature-card:hover {
    transform: translateY(-2px);
    box-shadow: ${shadows.cardHover};
  }
  .mini-feature-icon {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
  }
  .mini-feature-title {
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 600;
    color: ${colors.charcoal};
    margin-bottom: 8px;
  }
  .section-header {
    text-align: center;
    margin: 96px 0 64px;
  }
  .section-title {
    font-family: 'Fraunces', serif;
    font-size: 38px;
    font-weight: 600;
    color: ${colors.charcoal};
    margin-bottom: 16px;
    letter-spacing: -0.8px;
  }
  .section-subtitle {
    font-family: 'DM Sans', sans-serif;
    font-size: 16px;
    color: ${colors.gray};
    max-width: 600px;
    margin: 0 auto;
  }
  .features-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 96px;
  }
  .feature-card {
    background: white;
    border: 1px solid ${colors.border};
    border-radius: 18px;
    padding: 28px;
    transition: ${transitions.card};
    position: relative;
  }
  .feature-card:hover {
    transform: translateY(-3px);
    box-shadow: ${shadows.cardHover};
    border-left: 3px solid;
  }
  .feature-card.featured {
    border: 1px solid ${colors.mint};
    box-shadow: 0 0 0 1px ${colors.mintGlow};
  }
  .feature-icon {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }
  .feature-title {
    font-family: 'DM Sans', sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: ${colors.charcoal};
    margin-bottom: 12px;
  }
  .feature-description {
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: ${colors.gray};
    line-height: 1.6;
  }
  .cta-section {
    background: ${colors.charcoal};
    border-radius: 24px;
    padding: 64px;
    text-align: center;
    margin: 96px 0;
  }
  .cta-title {
    font-family: 'Fraunces', serif;
    font-size: 36px;
    font-weight: 600;
    color: white;
    margin-bottom: 12px;
    letter-spacing: -0.8px;
  }
  .cta-subtitle {
    font-family: 'DM Sans', sans-serif;
    font-size: 16px;
    color: ${colors.grayLight};
    margin-bottom: 32px;
  }
  .cta-button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: ${colors.gold};
    color: ${colors.charcoal};
    padding: 16px 32px;
    border-radius: ${borderRadius.button};
    font-family: 'DM Sans', sans-serif;
    font-size: 16px;
    font-weight: 600;
    text-decoration: none;
    transition: ${transitions.default};
    border: none;
    cursor: pointer;
  }
  .cta-button:hover {
    background: white;
    transform: translateY(-2px);
  }
  @media (max-width: 1024px) {
    .landing-hero {
      grid-template-columns: 1fr;
      gap: 48px;
    }
    .features-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 640px) {
    .hero-headline {
      font-size: 36px;
    }
    .features-grid {
      grid-template-columns: 1fr;
    }
    .mini-features {
      grid-template-columns: 1fr;
    }
    .cta-section {
      padding: 48px 24px;
    }
  }
`

export default function LandingPage() {
  return (
    <MarketingLayout>
      <style>{css}</style>
      
      {/* Hero Section */}
      <section className="landing-hero">
        <div>
          <span className="hero-badge">INSTANT</span>
          <h1 className="hero-headline">From conversation to live website</h1>
          <p className="hero-subtext">
            Tell NU what you need. Your website builds itself while you watch. No coding. No design skills. No templates to fight with.
          </p>
          <Link to="/build" className="hero-cta">
            Try a Demo →
          </Link>
        </div>
        
        <div className="chat-mockup">
          <div className="build-time-badge">Avg. build time 47s</div>
          <div className="chat-header">
            <div className="chat-avatar">
              <MessageSquare size={20} />
            </div>
            <div className="chat-name">NU Assistant</div>
          </div>
          <div className="chat-bubble user">
            Create a landing page for my coffee shop
          </div>
          <div className="chat-bubble ai">
            Building your coffee shop website...
          </div>
          <div className="typing-dots">
            <div className="typing-dot" />
            <div className="typing-dot" />
            <div className="typing-dot" />
          </div>
          <div className="preview-card">
            <div className="preview-header">
              <div className="live-dot" />
              <span style={{ fontSize: '12px', fontWeight: 600, color: colors.charcoal }}>Your site is live!</span>
            </div>
            <div style={{ height: '120px', background: colors.cream, borderRadius: '8px', border: `1px dashed ${colors.border}` }} />
          </div>
        </div>
      </section>

      {/* Mini Features */}
      <div className="mini-features">
        <div className="mini-feature-card">
          <div className="mini-feature-icon" style={{ background: `${colors.mint}15`, color: colors.mint }}>
            <Bolt size={20} />
          </div>
          <div className="mini-feature-title">8-Stage Wizard</div>
        </div>
        <div className="mini-feature-card">
          <div className="mini-feature-icon" style={{ background: `${colors.gold}15`, color: colors.gold }}>
            <Check size={20} />
          </div>
          <div className="mini-feature-title">Smart Defaults</div>
        </div>
        <div className="mini-feature-card">
          <div className="mini-feature-icon" style={{ background: `${colors.coral}15`, color: colors.coral }}>
            <Eye size={20} />
          </div>
          <div className="mini-feature-title">Real-time Preview</div>
        </div>
        <div className="mini-feature-card">
          <div className="mini-feature-icon" style={{ background: `${colors.mintLight}15`, color: colors.mintLight }}>
            <Zap size={20} />
          </div>
          <div className="mini-feature-title">Instant Publishing</div>
        </div>
      </div>

      {/* Section Header */}
      <div className="section-header">
        <h2 className="section-title">Everything you need. Nothing you don't.</h2>
        <p className="section-subtitle">
          NU handles the complexity so you can focus on what matters — your business.
        </p>
      </div>

      {/* Features Grid */}
      <div className="features-grid">
        <div className="feature-card" style={{ borderLeftColor: colors.mint }}>
          <div className="feature-icon" style={{ background: `${colors.mint}15`, color: colors.mint }}>
            <Sparkles size={20} />
          </div>
          <h3 className="feature-title">NU AI Intelligence</h3>
          <p className="feature-description">
            Natural language commands. Just describe what you want, and NU builds it. No design skills needed.
          </p>
        </div>

        <div className="feature-card" style={{ borderLeftColor: colors.mintLight }}>
          <div className="feature-icon" style={{ background: `${colors.mintLight}15`, color: colors.mintLight }}>
            <Zap size={20} />
          </div>
          <h3 className="feature-title">Element Versioning</h3>
          <p className="feature-description">
            Every change is saved. Experiment freely knowing you can restore any previous version instantly.
          </p>
        </div>

        <div className="feature-card" style={{ borderLeftColor: colors.coral }}>
          <div className="feature-icon" style={{ background: `${colors.coral}15`, color: colors.coral }}>
            <MessageSquare size={20} />
          </div>
          <h3 className="feature-title">Live Conversations</h3>
          <p className="feature-description">
            Edit your website through conversation. Ask NU to make changes, add sections, or refine content.
          </p>
        </div>

        <div className="feature-card" style={{ borderLeftColor: colors.gold }}>
          <div className="feature-icon" style={{ background: `${colors.gold}15`, color: colors.gold }}>
            <Bolt size={20} />
          </div>
          <h3 className="feature-title">Smart Templates</h3>
          <p className="feature-description">
            Industry-specific templates that adapt to your business. Not generic designs — custom solutions.
          </p>
        </div>

        <div className="feature-card" style={{ borderLeftColor: colors.mintLight }}>
          <div className="feature-icon" style={{ background: `${colors.mintLight}15`, color: colors.mintLight }}>
            <Zap size={20} />
          </div>
          <h3 className="feature-title">Instant Publishing</h3>
          <p className="feature-description">
            Go live in minutes, not days. No waiting for reviews or approval. Your site, your timeline.
          </p>
        </div>

        <div className="feature-card" style={{ borderLeftColor: colors.mint }}>
          <div className="feature-icon" style={{ background: `${colors.mint}15`, color: colors.mint }}>
            <Eye size={20} />
          </div>
          <h3 className="feature-title">Credit Transparency</h3>
          <p className="feature-description">
            See costs before every action. No surprise bills. Pay only for what you use.
          </p>
        </div>

        <div className="feature-card" style={{ borderLeftColor: colors.coral }}>
          <div className="feature-icon" style={{ background: `${colors.coral}15`, color: colors.coral }}>
            <Bolt size={20} />
          </div>
          <h3 className="feature-title">Team Collaboration</h3>
          <p className="feature-description">
            Invite team members to edit together. Real-time updates. Perfect for agencies and teams.
          </p>
        </div>

        <div className="feature-card featured" style={{ borderLeftColor: colors.gold }}>
          <div className="feature-icon" style={{ background: `${colors.gold}15`, color: colors.gold }}>
            <Zap size={20} />
          </div>
          <h3 className="feature-title">Built-In Abilities</h3>
          <p className="feature-description">
            Add booking, e-commerce, forms, analytics, and more. No plugins or integrations needed.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <h2 className="cta-title">The distance between idea and live website?</h2>
        <p className="cta-subtitle">One conversation.</p>
        <Link to="/build" className="cta-button">
          Start Building →
        </Link>
      </div>
    </MarketingLayout>
  )
}
