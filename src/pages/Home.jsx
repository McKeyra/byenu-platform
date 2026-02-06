import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import PageLayout from '../components/layout/PageLayout.jsx'
import { C } from '../theme/constants.js'

// ─── ICON COMPONENTS ───
const Icons = {
  Bolt: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
  ),
  Check: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
  ),
  Eye: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
  ),
  Zap: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
  ),
  Search: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
  ),
  Shield: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
  ),
  Chat: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
  ),
  Target: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
  ),
  Users: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  ),
  Star: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
  ),
  DollarSign: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
  ),
  Clock: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  ),
  ArrowRight: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
  ),
  ArrowLeft: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
  ),
  Send: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
  ),
  Sparkle: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16.4 5.6 21.2 8 14l-6-4.8h7.6z"/></svg>
  ),
}

// ─── FEATURE DATA ───
const HERO_FEATURES = [
  { icon: "Bolt", label: "8-Stage Wizard", color: C.mint },
  { icon: "Check", label: "Smart Defaults", color: C.gold },
  { icon: "Eye", label: "Real-time Preview", color: C.coral },
  { icon: "Zap", label: "Instant Publishing", color: C.mintLight },
]

const FULL_FEATURES = [
  { icon: "Search", title: "NU AI Intelligence", desc: "Natural language commands. Just describe what you want, and NU builds it. No design skills needed.", color: C.mint },
  { icon: "Shield", title: "Element Versioning", desc: "Every change is saved. Experiment freely knowing you can restore any previous version instantly.", color: C.mintLight },
  { icon: "Chat", title: "Live Conversations", desc: "Edit your website through conversation. Ask NU to make changes, add sections, or refine content.", color: C.coral },
  { icon: "Target", title: "Smart Templates", desc: "Industry-specific templates that adapt to your business. Not generic designs — custom solutions.", color: C.gold },
  { icon: "Clock", title: "Instant Publishing", desc: "Go live in minutes, not days. No waiting for reviews or approval. Your site, your timeline.", color: C.mintLight },
  { icon: "DollarSign", title: "Credit Transparency", desc: "See costs before every action. No surprise bills. Pay only for what you use.", color: C.mint },
  { icon: "Users", title: "Team Collaboration", desc: "Invite team members to edit together. Real-time updates. Perfect for agencies and teams.", color: C.coral },
  { icon: "Star", title: "Built-In Abilities", desc: "Add booking, e-commerce, forms, analytics, and more. No plugins or integrations needed.", color: C.gold },
]

// ─── STYLES ───
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }
  
  :root {
    --mint: ${C.mint};
    --mint-light: ${C.mintLight};
    --gold: ${C.gold};
    --coral: ${C.coral};
    --cream: ${C.cream};
    --charcoal: ${C.charcoal};
    --gray: ${C.gray};
  }

  body { font-family: 'DM Sans', sans-serif; background: ${C.cream}; color: ${C.charcoal}; }

  .enuw-container { max-width: 1280px; margin: 0 auto; padding: 0 24px; }

  /* ─── GRADIENT BAR ─── */
  .top-bar {
    height: 4px;
    background: linear-gradient(90deg, ${C.mint}, ${C.mintLight}, ${C.gold}, ${C.mintLight}, ${C.mint});
    background-size: 300% 100%;
    animation: barShift 12s ease infinite;
  }
  @keyframes barShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }

  /* ─── NAV ─── */
  .nav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 0;
  }
  .nav-logo {
    font-family: 'Fraunces', serif; font-weight: 700; font-size: 22px;
    color: ${C.charcoal}; letter-spacing: -0.5px;
  }
  .nav-logo span { color: ${C.mint}; }
  .nav-links { display: flex; gap: 32px; align-items: center; }
  .nav-links a {
    font-size: 14px; color: ${C.gray}; text-decoration: none;
    font-weight: 500; transition: color 0.2s;
  }
  .nav-links a:hover { color: ${C.charcoal}; }
  .nav-cta {
    background: ${C.mint}; color: white !important; padding: 10px 24px;
    border-radius: 10px; font-weight: 600 !important; font-size: 14px !important;
    transition: all 0.3s ease !important; border: none; cursor: pointer;
  }
  .nav-cta:hover { background: ${C.gold} !important; color: ${C.charcoal} !important; transform: translateY(-1px); }

  /* ─── HERO ─── */
  .hero {
    display: grid; grid-template-columns: 1fr 1fr; gap: 64px;
    align-items: center; padding: 80px 0 64px;
  }
  .hero-badge {
    display: inline-block; font-size: 12px; font-weight: 600;
    letter-spacing: 3px; text-transform: uppercase; color: ${C.mint};
    margin-bottom: 16px;
  }
  .hero h1 {
    font-family: 'Fraunces', serif; font-size: 52px; font-weight: 600;
    line-height: 1.1; letter-spacing: -1.5px; color: ${C.charcoal};
    margin-bottom: 20px;
  }
  .hero p {
    font-size: 17px; line-height: 1.7; color: ${C.gray}; margin-bottom: 32px;
    max-width: 440px;
  }
  .hero-btn {
    display: inline-flex; align-items: center; gap: 8px;
    background: ${C.mint}; color: white; padding: 14px 32px;
    border-radius: 12px; font-weight: 600; font-size: 15px;
    text-decoration: none; transition: all 0.3s ease;
    border: none; cursor: pointer; font-family: inherit;
  }
  .hero-btn:hover { background: ${C.gold}; color: ${C.charcoal}; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(26,122,109,0.15); }

  /* ─── CHAT MOCKUP ─── */
  .chat-mock {
    background: white; border-radius: 20px; padding: 28px;
    box-shadow: 0 20px 60px rgba(26,26,46,0.08), 0 1px 3px rgba(26,122,109,0.06);
    border: 1px solid ${C.border}; position: relative;
  }
  .chat-mock-header { display: flex; align-items: center; gap: 12px; margin-bottom: 28px; }
  .chat-mock-avatar {
    width: 40px; height: 40px; border-radius: 12px; background: ${C.mintGlow};
    display: flex; align-items: center; justify-content: center; color: ${C.mint};
  }
  .chat-mock-name { font-weight: 600; font-size: 15px; }
  .chat-mock-sub { font-size: 12px; color: ${C.grayLight}; }
  .chat-bubble-user {
    background: ${C.charcoal}; color: white; padding: 14px 18px;
    border-radius: 16px 16px 4px 16px; font-size: 14px; max-width: 80%;
    margin-left: auto; margin-bottom: 16px;
  }
  .chat-bubble-ai {
    background: #FAF3E0; color: ${C.charcoal}; padding: 14px 18px;
    border-radius: 16px 16px 16px 4px; font-size: 14px; max-width: 85%;
    margin-bottom: 16px;
  }
  .typing-dots { display: flex; gap: 4px; padding: 4px 0; }
  .typing-dots span {
    width: 6px; height: 6px; border-radius: 50%; background: ${C.grayLight};
    animation: typePulse 1.4s infinite;
  }
  .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
  .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes typePulse { 0%,100%{opacity:0.3;transform:scale(0.8)} 50%{opacity:1;transform:scale(1)} }

  .chat-live-card {
    background: white; border: 1px solid ${C.border}; border-radius: 14px;
    padding: 16px 20px; margin-top: 8px;
  }
  .live-dot {
    width: 8px; height: 8px; border-radius: 50%; background: #22C55E;
    display: inline-block; animation: livePulse 2s infinite;
  }
  @keyframes livePulse { 0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(34,197,94,0.4)} 50%{opacity:0.8;box-shadow:0 0 0 6px rgba(34,197,94,0)} }

  .build-time-badge {
    position: absolute; top: -12px; right: -12px;
    background: ${C.gold}; color: ${C.charcoal}; padding: 8px 14px;
    border-radius: 12px; font-size: 11px; font-weight: 600; text-align: center;
    box-shadow: 0 4px 12px rgba(212,168,67,0.3);
  }
  .build-time-badge strong { display: block; font-size: 20px; font-weight: 700; }

  /* ─── FEATURE GRID (small) ─── */
  .mini-features {
    display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
    margin-top: 48px;
  }
  .mini-card {
    background: white; border: 1px solid ${C.border}; border-radius: 16px;
    padding: 24px; transition: all 0.3s ease; cursor: default;
  }
  .mini-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.04); }
  .mini-card-icon {
    width: 44px; height: 44px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 14px;
  }
  .mini-card-label { font-weight: 600; font-size: 14px; }

  /* ─── SECTION HEADER ─── */
  .section-header {
    text-align: center; padding: 80px 0 48px;
  }
  .section-header h2 {
    font-family: 'Fraunces', serif; font-size: 38px; font-weight: 600;
    letter-spacing: -1px; margin-bottom: 12px;
  }
  .section-header p { font-size: 16px; color: ${C.gray}; max-width: 520px; margin: 0 auto; }

  /* ─── FEATURE GRID (full) ─── */
  .features-grid {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px;
    padding-bottom: 80px;
  }
  .feature-card {
    background: white; border: 1px solid ${C.border}; border-radius: 18px;
    padding: 28px; transition: all 0.3s ease; cursor: default;
    position: relative; overflow: hidden;
  }
  .feature-card::before {
    content: ''; position: absolute; left: 0; top: 0; bottom: 0;
    width: 3px; background: transparent; transition: background 0.3s;
  }
  .feature-card:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,0,0,0.06); }
  .feature-card:hover::before { background: var(--card-accent); }
  .feature-card-icon {
    width: 44px; height: 44px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 18px;
  }
  .feature-card h3 { font-weight: 700; font-size: 16px; margin-bottom: 8px; line-height: 1.3; }
  .feature-card p { font-size: 13px; line-height: 1.6; color: ${C.gray}; }
  .feature-card.featured {
    border-color: ${C.mint}; box-shadow: 0 0 0 1px ${C.mint}, 0 8px 24px rgba(26,122,109,0.08);
  }

  /* ─── CTA SECTION ─── */
  .cta-section {
    background: ${C.charcoal}; border-radius: 24px; padding: 64px;
    text-align: center; margin-bottom: 80px;
  }
  .cta-section h2 {
    font-family: 'Fraunces', serif; font-size: 36px; color: white;
    font-weight: 600; letter-spacing: -1px; margin-bottom: 16px;
  }
  .cta-section p { color: ${C.grayLight}; font-size: 16px; margin-bottom: 32px; }
  .cta-btn {
    display: inline-flex; align-items: center; gap: 8px;
    background: ${C.gold}; color: ${C.charcoal}; padding: 16px 36px;
    border-radius: 12px; font-weight: 700; font-size: 16px;
    text-decoration: none; transition: all 0.3s ease;
    border: none; cursor: pointer; font-family: inherit;
  }
  .cta-btn:hover { background: white; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(212,168,67,0.3); }

  /* ─── FOOTER ─── */
  .footer {
    border-top: 1px solid ${C.border}; padding: 40px 0;
    display: flex; justify-content: space-between; align-items: center;
    font-size: 13px; color: ${C.grayLight};
  }
  .footer a { color: ${C.gray}; text-decoration: none; }
  .footer a:hover { color: ${C.mint}; }

  /* ─── RESPONSIVE ─── */
  @media (max-width: 1024px) {
    .hero { grid-template-columns: 1fr; gap: 40px; }
    .hero h1 { font-size: 40px; }
    .features-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 640px) {
    .hero h1 { font-size: 32px; }
    .mini-features { grid-template-columns: 1fr; }
    .features-grid { grid-template-columns: 1fr; }
    .section-header h2 { font-size: 28px; }
    .cta-section { padding: 40px 24px; }
    .cta-section h2 { font-size: 26px; }
    .nav-links { display: none; }
  }
`

// ─── MAIN COMPONENT ───
export default function Home() {
  const navigate = useNavigate()

  const getIconComponent = (name) => {
    const Icon = Icons[name]
    return Icon ? <Icon /> : null
  }

  const handleStartBuilding = () => {
    navigate('/wizard-selector')
  }

  return (
    <PageLayout showNav={false}>
      <style>{styles}</style>
      <div className="enuw-container">

        {/* ─── HERO ─── */}
        <section className="hero">
          <div>
            <span className="hero-badge">Instant</span>
            <h1>From conversation to live website</h1>
            <p>
              Tell NU what you need. Your website builds itself while you watch.
              No coding. No design skills. No templates to fight with.
            </p>
            <button className="hero-btn" onClick={handleStartBuilding}>
              Try a Demo <Icons.ArrowRight />
            </button>

            <div className="mini-features">
              {HERO_FEATURES.map((f) => (
                <div className="mini-card" key={f.label}>
                  <div
                    className="mini-card-icon"
                    style={{
                      background: `${f.color}18`,
                      color: f.color,
                    }}
                  >
                    {getIconComponent(f.icon)}
                  </div>
                  <div className="mini-card-label">{f.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: "relative" }}>
            <div className="chat-mock">
              <div className="build-time-badge">
                Avg. build time
                <strong>47s</strong>
              </div>
              <div className="chat-mock-header">
                <div className="chat-mock-avatar">
                  <Icons.Chat />
                </div>
                <div>
                  <div className="chat-mock-name">NU Assistant</div>
                  <div className="chat-mock-sub">Building your website...</div>
                </div>
              </div>
              <div className="chat-bubble-user">
                Create a landing page for my coffee shop
              </div>
              <div className="chat-bubble-ai">
                Building your coffee shop website...
                <div className="typing-dots">
                  <span /><span /><span />
                </div>
              </div>
              <div className="chat-live-card">
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <span className="live-dot" />
                  <span style={{ fontSize: 14, color: C.grayLight }}>Your site is live!</span>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: C.goldLight }} />
                  <div>
                    <div style={{ height: 8, width: 120, borderRadius: 4, background: C.border }} />
                    <div style={{ height: 6, width: 80, borderRadius: 3, background: C.border, marginTop: 6 }} />
                  </div>
                </div>
                <div style={{ height: 6, width: "100%", borderRadius: 3, background: C.border, marginBottom: 6 }} />
                <div style={{ height: 6, width: "90%", borderRadius: 3, background: C.border, marginBottom: 6 }} />
                <div style={{ height: 6, width: "70%", borderRadius: 3, background: C.border, marginBottom: 12 }} />
                <div style={{ height: 28, width: 80, borderRadius: 6, background: C.goldLight }} />
              </div>
            </div>
          </div>
        </section>

        {/* ─── FEATURES SECTION ─── */}
        <div className="section-header" id="features">
          <h2>Everything you need. Nothing you don't.</h2>
          <p>NU handles the complexity so you can focus on what matters — your business.</p>
        </div>

        <div className="features-grid">
          {FULL_FEATURES.map((f, i) => (
            <div
              className={`feature-card ${i === FULL_FEATURES.length - 1 ? "featured" : ""}`}
              key={f.title}
              style={{ "--card-accent": f.color }}
            >
              <div
                className="feature-card-icon"
                style={{
                  background: `${f.color}18`,
                  color: f.color,
                }}
              >
                {getIconComponent(f.icon)}
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* ─── CTA ─── */}
        <section className="cta-section">
          <h2>The distance between idea and live website?</h2>
          <p>One conversation.</p>
          <button className="cta-btn" onClick={handleStartBuilding}>
            Start Building <Icons.ArrowRight />
          </button>
        </section>

        {/* ─── FOOTER ─── */}
        <footer className="footer">
          <div>
            <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, color: C.charcoal }}>
              bye<span style={{ color: C.mint }}>NU</span>
            </span>{" "}
            · Powered by ENUW
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Support</a>
          </div>
        </footer>
      </div>
    </PageLayout>
  )
}
