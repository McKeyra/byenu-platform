import { useState, useEffect, useRef, useCallback } from "react"
import { useNavigate } from 'react-router-dom'
import { createSubmission } from '../../api/submissions.js'
import { generateReport } from '../../api/reports.js'
import { useAuth } from '../../lib/auth/AuthContext.jsx'
import PageLayout from '../../components/layout/PageLayout.jsx'
import { C } from '../../theme/constants.js'

// ─── ICONS ───
const Icon = {
  Check: ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  ChevronDown: ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
  ChevronRight: ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  Eye: ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  Monitor: ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  Tablet: ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
  Phone: ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
  Sparkle: ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z"/></svg>,
  Chat: ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  Upload: ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>,
  X: ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Save: ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>,
  Globe: ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  Palette: ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="10.5" r="2.5"/><circle cx="8.5" cy="7.5" r="2.5"/><circle cx="6.5" cy="12.5" r="2.5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>,
  Layout: ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>,
  Zap: ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Settings: ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  ArrowRight: ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  Refresh: ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>,
  Info: ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
}

// ─── CONSTANTS ───
const INDUSTRIES = [
  "Restaurant & Food", "Health & Fitness", "Professional Services",
  "Retail & E-commerce", "Real Estate", "Creative & Design",
  "Education & Coaching", "Technology", "Non-profit",
  "Events & Entertainment", "Construction & Trades", "Beauty & Wellness",
]

const BUSINESS_TYPES = [
  "Solo / Freelancer", "Small Business (2-10)", "Growing Team (11-50)",
  "Agency / Studio", "Enterprise", "Non-profit / Community",
]

const PAGE_OPTIONS = [
  "Home", "About", "Services", "Pricing", "Contact",
  "Blog", "Portfolio", "Testimonials", "FAQ", "Shop",
  "Booking", "Team", "Gallery", "Events", "Careers",
]

const FEATURE_OPTIONS = [
  { label: "Contact Form", desc: "Collect inquiries with smart routing" },
  { label: "Booking System", desc: "Let customers schedule appointments" },
  { label: "E-commerce", desc: "Sell products with cart & checkout" },
  { label: "Analytics", desc: "Track visitors, conversions, behavior" },
  { label: "Blog / CMS", desc: "Publish and manage content" },
  { label: "Newsletter", desc: "Grow your email list" },
  { label: "Social Feed", desc: "Display Instagram, Twitter, etc." },
  { label: "Live Chat", desc: "Real-time visitor conversations" },
  { label: "Video Embed", desc: "YouTube, Vimeo, custom video" },
  { label: "Maps", desc: "Show your location(s)" },
  { label: "Reviews", desc: "Display customer testimonials" },
  { label: "Members Area", desc: "Gated content for subscribers" },
]

const TONE_OPTIONS = [
  "Calm", "Energetic", "Professional", "Playful", "Bold",
  "Minimal", "Warm", "Luxurious", "Natural", "Modern",
  "Friendly", "Edgy", "Corporate", "Artistic", "Tech-forward",
]

const STYLE_PRESETS = [
  { id: "nu-decide", label: "Let NU Decide", colors: [C.mint, C.mintLight, C.gold], desc: "AI selects the perfect palette" },
  { id: "light-airy", label: "Light & Airy", colors: ["#F8F9FA", "#E9ECEF", "#DEE2E6"], desc: "Soft whites, open breathing room" },
  { id: "dark-bold", label: "Dark & Bold", colors: ["#1A1A2E", "#16213E", "#0F3460"], desc: "Deep backgrounds, vivid accents" },
  { id: "warm-earth", label: "Warm & Earthy", colors: ["#D4A373", "#CCD5AE", "#FEFAE0"], desc: "Terracotta, cream, forest" },
  { id: "ocean", label: "Ocean Blues", colors: ["#023E8A", "#0077B6", "#48CAE4"], desc: "Professional depth, trustworthy" },
  { id: "sunset", label: "Sunset Warm", colors: ["#FF6B6B", "#FCA311", "#E9C46A"], desc: "Vibrant energy, attention-grabbing" },
]

const FONT_PAIRS = [
  { id: "modern", heading: "DM Sans", body: "Inter", label: "Modern Clean" },
  { id: "editorial", heading: "Fraunces", body: "DM Sans", label: "Editorial Serif" },
  { id: "sharp", heading: "Space Grotesk", body: "Work Sans", label: "Sharp Tech" },
  { id: "elegant", heading: "Playfair Display", body: "Lato", label: "Elegant Classic" },
]

const SECTIONS = [
  { id: "basics", label: "Site Basics", icon: "Globe", color: C.mint },
  { id: "design", label: "Design & Style", icon: "Palette", color: C.gold },
  { id: "pages", label: "Pages & Structure", icon: "Layout", color: C.coral },
  { id: "features", label: "Abilities", icon: "Zap", color: C.mintLight },
  { id: "advanced", label: "Advanced", icon: "Settings", color: C.gray },
]

// ─── MAIN STYLES ───
const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700&display=swap');
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family: 'DM Sans', -apple-system, sans-serif; background: ${C.cream}; color: ${C.charcoal}; }

  /* ── LAYOUT ── */
  .form-shell { display: flex; height: 100vh; overflow: hidden; }

  /* ── LEFT: FORM PANEL ── */
  .form-panel {
    flex: 1; min-width: 0; display: flex; flex-direction: column;
    background: ${C.white}; border-right: 1px solid ${C.border};
  }

  .form-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 16px 28px; border-bottom: 1px solid ${C.border};
    background: ${C.white}; flex-shrink: 0;
  }
  .form-logo { font-family: 'Fraunces', serif; font-weight: 700; font-size: 18px; }
  .form-logo span { color: ${C.mint}; }
  .form-header-meta {
    display: flex; align-items: center; gap: 16px; font-size: 12px; color: ${C.grayLight};
  }
  .save-indicator {
    display: flex; align-items: center; gap: 6px;
    padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 500;
  }
  .save-indicator.saved { background: ${C.successGlow}; color: ${C.success}; }

  .form-progress-bar { height: 3px; background: ${C.border}; flex-shrink: 0; }
  .form-progress-fill {
    height: 100%; background: linear-gradient(90deg, ${C.mint}, ${C.mintLight});
    transition: width 0.6s cubic-bezier(0.16,1,0.3,1);
  }

  .form-scroll {
    flex: 1; overflow-y: auto; padding: 28px;
    scroll-behavior: smooth;
  }
  .form-scroll::-webkit-scrollbar { width: 6px; }
  .form-scroll::-webkit-scrollbar-track { background: transparent; }
  .form-scroll::-webkit-scrollbar-thumb { background: ${C.grayPale}; border-radius: 3px; }

  /* ── SECTIONS ── */
  .form-section {
    margin-bottom: 8px; border: 1px solid ${C.border};
    border-radius: 16px; overflow: hidden; background: ${C.white};
    transition: box-shadow 0.3s, border-color 0.3s;
  }
  .form-section:hover { box-shadow: 0 2px 12px rgba(0,0,0,0.03); }
  .form-section.active { border-color: ${C.mintBorder}; box-shadow: 0 2px 16px ${C.mintGlow}; }

  .section-toggle {
    display: flex; align-items: center; gap: 14px; width: 100%;
    padding: 18px 22px; background: none; border: none; cursor: pointer;
    font-family: inherit; text-align: left; transition: background 0.2s;
  }
  .section-toggle:hover { background: ${C.cream}; }
  .section-icon {
    width: 36px; height: 36px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .section-label { font-weight: 600; font-size: 15px; color: ${C.charcoal}; flex: 1; }
  .section-badge {
    font-size: 11px; font-weight: 600; padding: 2px 8px;
    border-radius: 10px; background: ${C.mintGlow}; color: ${C.mint};
  }
  .section-chevron {
    color: ${C.grayLight}; transition: transform 0.3s;
    display: flex; align-items: center;
  }
  .section-chevron.open { transform: rotate(90deg); }

  .section-body {
    padding: 0 22px 22px; display: flex; flex-direction: column; gap: 20px;
    animation: sectionReveal 0.3s ease;
  }
  @keyframes sectionReveal { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }

  /* ── FIELD STYLES ── */
  .field-group { display: flex; flex-direction: column; gap: 6px; }
  .field-label {
    font-size: 13px; font-weight: 600; color: ${C.charcoal};
    display: flex; align-items: center; gap: 6px;
  }
  .field-hint { font-size: 11px; color: ${C.grayLight}; margin-top: -2px; }

  .field-input {
    width: 100%; padding: 12px 16px; border: 1.5px solid ${C.border};
    border-radius: 10px; font-size: 14px; font-family: inherit;
    color: ${C.charcoal}; background: ${C.cream};
    transition: all 0.2s; outline: none;
  }
  .field-input:focus { border-color: ${C.mint}; background: ${C.white}; box-shadow: 0 0 0 3px ${C.mintGlow}; }
  .field-input::placeholder { color: ${C.grayPale}; }
  .field-input.has-value { border-color: ${C.mintBorder}; background: ${C.white}; }
  .field-input.error { border-color: ${C.error}; box-shadow: 0 0 0 3px ${C.errorGlow}; }

  .field-textarea {
    resize: vertical; min-height: 80px; max-height: 200px;
    line-height: 1.6;
  }

  .field-valid-icon {
    position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
    color: ${C.success}; display: flex;
  }

  .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

  /* ── SELECT ── */
  .field-select-wrap { position: relative; }
  .field-select {
    appearance: none; width: 100%; padding: 12px 40px 12px 16px;
    border: 1.5px solid ${C.border}; border-radius: 10px;
    font-size: 14px; font-family: inherit; color: ${C.charcoal};
    background: ${C.cream}; cursor: pointer; transition: all 0.2s; outline: none;
  }
  .field-select:focus { border-color: ${C.mint}; background: ${C.white}; box-shadow: 0 0 0 3px ${C.mintGlow}; }
  .field-select.has-value { border-color: ${C.mintBorder}; background: ${C.white}; }
  .field-select-arrow {
    position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
    pointer-events: none; color: ${C.grayLight};
  }

  /* ── PILLS / MULTI-SELECT ── */
  .pills-wrap { display: flex; flex-wrap: wrap; gap: 8px; }
  .pill {
    padding: 8px 16px; border: 1.5px solid ${C.border}; border-radius: 20px;
    font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s;
    background: ${C.white}; color: ${C.charcoal}; font-family: inherit;
    user-select: none;
  }
  .pill:hover { border-color: ${C.mint}; background: ${C.mintGlow}; }
  .pill.selected { border-color: ${C.mint}; background: ${C.mint}; color: white; }

  /* ── STYLE PRESET CARDS ── */
  .style-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
  .style-card {
    padding: 14px; border: 1.5px solid ${C.border}; border-radius: 12px;
    cursor: pointer; transition: all 0.2s; background: ${C.white}; text-align: center;
  }
  .style-card:hover { border-color: ${C.mint}; transform: translateY(-1px); }
  .style-card.selected { border-color: ${C.mint}; background: ${C.mintGlow}; box-shadow: 0 0 0 2px ${C.mintGlow}; }
  .style-swatches { display: flex; gap: 4px; justify-content: center; margin-bottom: 8px; }
  .style-swatch { width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
  .style-card-label { font-size: 12px; font-weight: 600; }
  .style-card-desc { font-size: 10px; color: ${C.grayLight}; margin-top: 2px; }

  /* ── FONT PAIR CARDS ── */
  .font-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
  .font-card {
    padding: 16px; border: 1.5px solid ${C.border}; border-radius: 12px;
    cursor: pointer; transition: all 0.2s; background: ${C.white};
  }
  .font-card:hover { border-color: ${C.mint}; }
  .font-card.selected { border-color: ${C.mint}; background: ${C.mintGlow}; }
  .font-card-heading { font-size: 18px; font-weight: 700; margin-bottom: 2px; line-height: 1.2; }
  .font-card-body { font-size: 12px; color: ${C.gray}; }
  .font-card-label { font-size: 10px; font-weight: 600; color: ${C.grayLight}; margin-top: 6px; text-transform: uppercase; letter-spacing: 0.5px; }

  /* ── FEATURE CHECKBOXES ── */
  .feature-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .feature-check {
    display: flex; align-items: flex-start; gap: 10px;
    padding: 12px 14px; border: 1.5px solid ${C.border}; border-radius: 10px;
    cursor: pointer; transition: all 0.2s; background: ${C.white};
  }
  .feature-check:hover { border-color: ${C.mint}; background: ${C.mintGlow}; }
  .feature-check.selected { border-color: ${C.mint}; background: ${C.mintGlow}; }
  .check-box {
    width: 18px; height: 18px; border: 2px solid ${C.grayPale}; border-radius: 5px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; margin-top: 1px; transition: all 0.2s;
  }
  .check-box.checked { background: ${C.mint}; border-color: ${C.mint}; color: white; }
  .feature-check-label { font-size: 13px; font-weight: 500; }
  .feature-check-desc { font-size: 11px; color: ${C.grayLight}; }

  /* ── UPLOAD ZONE ── */
  .upload-zone {
    border: 2px dashed ${C.border}; border-radius: 12px; padding: 28px;
    text-align: center; cursor: pointer; transition: all 0.2s;
    background: ${C.cream};
  }
  .upload-zone:hover { border-color: ${C.mint}; background: ${C.mintGlow}; }
  .upload-zone-icon { color: ${C.grayLight}; margin-bottom: 8px; }
  .upload-zone-text { font-size: 13px; color: ${C.gray}; }
  .upload-zone-text strong { color: ${C.mint}; }

  /* ── RIGHT: PREVIEW PANEL ── */
  .preview-panel {
    width: 480px; flex-shrink: 0; display: flex; flex-direction: column;
    background: ${C.cream}; overflow: hidden;
  }

  .preview-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 20px; border-bottom: 1px solid ${C.border};
    background: ${C.white}; flex-shrink: 0;
  }
  .preview-title { font-size: 13px; font-weight: 600; color: ${C.charcoal}; }
  .preview-devices { display: flex; gap: 2px; }
  .preview-device-btn {
    padding: 6px 8px; border: none; background: none; cursor: pointer;
    border-radius: 6px; color: ${C.grayLight}; transition: all 0.2s;
    display: flex; align-items: center;
  }
  .preview-device-btn:hover { color: ${C.charcoal}; background: ${C.cream}; }
  .preview-device-btn.active { color: ${C.mint}; background: ${C.mintGlow}; }

  .preview-viewport {
    flex: 1; overflow-y: auto; padding: 20px;
    display: flex; justify-content: center;
  }
  .preview-frame {
    width: 100%; transition: max-width 0.4s cubic-bezier(0.16,1,0.3,1);
    background: ${C.white}; border-radius: 12px; overflow: hidden;
    box-shadow: 0 8px 32px rgba(0,0,0,0.06);
    border: 1px solid ${C.border};
  }
  .preview-frame.desktop { max-width: 440px; }
  .preview-frame.tablet { max-width: 340px; }
  .preview-frame.phone { max-width: 220px; }

  /* ── PREVIEW CONTENT ── */
  .prev-nav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 18px; border-bottom: 1px solid ${C.border};
  }
  .prev-nav-logo { font-family: 'Fraunces', serif; font-weight: 700; font-size: 14px; }
  .prev-nav-links { display: flex; gap: 12px; }
  .prev-nav-link { font-size: 10px; color: ${C.grayLight}; }
  .prev-nav-cta {
    font-size: 9px; padding: 4px 10px; border-radius: 6px;
    color: white; font-weight: 600;
  }

  .prev-hero {
    padding: 32px 18px; text-align: center;
  }
  .prev-hero h1 {
    font-family: 'Fraunces', serif; font-size: 20px; font-weight: 600;
    line-height: 1.2; margin-bottom: 8px;
  }
  .prev-hero p { font-size: 11px; color: ${C.gray}; line-height: 1.5; margin-bottom: 16px; }
  .prev-hero-btn {
    display: inline-block; padding: 8px 20px; border-radius: 8px;
    font-size: 11px; font-weight: 600; color: white;
  }

  .prev-section { padding: 20px 18px; }
  .prev-section-title {
    font-size: 12px; font-weight: 700; margin-bottom: 12px;
    text-align: center; letter-spacing: -0.3px;
  }
  .prev-features {
    display: grid; grid-template-columns: 1fr 1fr; gap: 8px;
  }
  .prev-feature-card {
    padding: 10px; border-radius: 8px; border: 1px solid ${C.border};
    font-size: 9px; font-weight: 500; text-align: center;
  }
  .prev-feature-icon { font-size: 16px; margin-bottom: 4px; }
  .prev-pages-list { display: flex; flex-wrap: wrap; gap: 4px; justify-content: center; }
  .prev-page-tag {
    padding: 3px 8px; border-radius: 4px; font-size: 9px;
    font-weight: 500; border: 1px solid ${C.border};
  }

  .prev-footer {
    padding: 14px 18px; border-top: 1px solid ${C.border};
    font-size: 9px; color: ${C.grayLight}; text-align: center;
  }

  /* ── CHAT ASSIST BUTTON ── */
  .chat-assist-btn {
    position: fixed; bottom: 24px; right: 504px;
    width: 48px; height: 48px; border-radius: 50%;
    background: ${C.mint}; color: white; border: none;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 16px rgba(26,122,109,0.3);
    transition: all 0.3s; z-index: 10;
  }
  .chat-assist-btn:hover { background: ${C.gold}; transform: scale(1.05); box-shadow: 0 6px 20px rgba(212,168,67,0.3); }
  .chat-assist-badge {
    position: absolute; top: -2px; right: -2px;
    width: 16px; height: 16px; border-radius: 50%;
    background: ${C.coral}; font-size: 9px; font-weight: 700;
    color: white; display: flex; align-items: center; justify-content: center;
    border: 2px solid ${C.white};
  }

  /* ── FORM FOOTER ── */
  .form-footer {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 28px; border-top: 1px solid ${C.border};
    background: ${C.white}; flex-shrink: 0;
  }
  .form-footer-left { display: flex; align-items: center; gap: 8px; }
  .form-skip {
    font-size: 13px; color: ${C.grayLight}; background: none; border: none;
    cursor: pointer; font-family: inherit; text-decoration: underline;
    transition: color 0.2s;
  }
  .form-skip:hover { color: ${C.charcoal}; }
  .form-submit {
    display: flex; align-items: center; gap: 8px;
    background: ${C.mint}; color: white; padding: 12px 28px;
    border-radius: 10px; font-weight: 600; font-size: 14px;
    border: none; cursor: pointer; font-family: inherit;
    transition: all 0.3s;
  }
  .form-submit:hover { background: ${C.gold}; color: ${C.charcoal}; transform: translateY(-1px); }

  /* ── MODE SWITCH ── */
  .mode-switch {
    display: flex; gap: 2px; background: ${C.cream}; padding: 3px;
    border-radius: 8px; border: 1px solid ${C.border};
  }
  .mode-btn {
    padding: 5px 12px; border: none; border-radius: 6px; font-size: 12px;
    font-weight: 500; cursor: pointer; font-family: inherit;
    background: transparent; color: ${C.grayLight}; transition: all 0.2s;
  }
  .mode-btn.active { background: ${C.white}; color: ${C.charcoal}; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }

  /* ── RESPONSIVE ── */
  @media (max-width: 960px) {
    .preview-panel { display: none; }
    .chat-assist-btn { right: 24px; }
    .feature-grid { grid-template-columns: 1fr; }
    .style-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 640px) {
    .form-scroll { padding: 16px; }
    .field-row { grid-template-columns: 1fr; }
    .font-grid { grid-template-columns: 1fr; }
    .style-grid { grid-template-columns: 1fr; }
  }
`

// ─── HELPER: Section Icon Renderer ───
function SectionIcon({ name, color }) {
  const IconComp = Icon[name]
  return (
    <div className="section-icon" style={{ background: `${color}15`, color }}>
      {IconComp ? <IconComp size={18} /> : null}
    </div>
  )
}

// ─── MAIN COMPONENT ───
export default function FormWizard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form data
  const [form, setForm] = useState({
    siteName: "",
    domain: "",
    industry: "",
    businessType: "",
    description: "",
    audience: "",
    tones: [],
    pages: ["Home", "About", "Contact"],
    features: ["Contact Form"],
    stylePreset: "nu-decide",
    fontPair: "editorial",
    primaryColor: C.mint,
    logoUploaded: false,
    seoTitle: "",
    seoDescription: "",
    customDomain: "",
    analytics: true,
    coreMessage: "",
  })

  // UI state
  const [openSections, setOpenSections] = useState(["basics"])
  const [previewDevice, setPreviewDevice] = useState("desktop")
  const [savedAt, setSavedAt] = useState(null)
  const [completionPct, setCompletionPct] = useState(0)
  const scrollRef = useRef(null)

  // Auto-save simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setSavedAt(new Date())
      localStorage.setItem('formWizardDraft', JSON.stringify(form))
    }, 1500)
    return () => clearTimeout(timer)
  }, [form])

  // Completion calculation
  useEffect(() => {
    let filled = 0
    let total = 10
    if (form.siteName) filled++
    if (form.industry) filled++
    if (form.businessType) filled++
    if (form.description) filled++
    if (form.audience) filled++
    if (form.tones.length > 0) filled++
    if (form.pages.length > 0) filled++
    if (form.features.length > 0) filled++
    if (form.stylePreset) filled++
    if (form.fontPair) filled++
    setCompletionPct(Math.round((filled / total) * 100))
  }, [form])

  // Load draft on mount
  useEffect(() => {
    const draft = localStorage.getItem('formWizardDraft')
    if (draft) {
      try {
        setForm(JSON.parse(draft))
      } catch (e) {
        console.error('Error loading draft:', e)
      }
    }
  }, [])

  const updateForm = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))

  const toggleSection = (id) => {
    setOpenSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  const toggleArrayItem = (key, item) => {
    const arr = form[key]
    if (arr.includes(item)) {
      updateForm(key, arr.filter((i) => i !== item))
    } else {
      updateForm(key, [...arr, item])
    }
  }

  const sectionCompletion = (id) => {
    switch (id) {
      case "basics":
        return [form.siteName, form.industry, form.businessType, form.description].filter(Boolean).length
      case "design":
        return [form.stylePreset, form.fontPair, form.tones.length > 0].filter(Boolean).length
      case "pages":
        return form.pages.length > 0 ? 1 : 0
      case "features":
        return form.features.length > 0 ? 1 : 0
      case "advanced":
        return [form.seoTitle, form.customDomain].filter(Boolean).length
      default:
        return 0
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const email = user?.email || prompt('Please enter your email to receive your report:')
      if (!email) {
        alert('Email is required')
        setIsSubmitting(false)
        return
      }

      // Transform form data to match wizard_data structure
      const wizardData = {
        businessName: form.siteName,
        industry: form.industry,
        businessType: form.businessType,
        description: form.description,
        audience: form.audience,
        tone: form.tones,
        colorDirections: [form.stylePreset],
        pages: form.pages,
        features: form.features,
        fonts: { heading: form.fontPair, body: form.fontPair },
        seoTitle: form.seoTitle,
        seoDescription: form.seoDescription,
        customDomain: form.customDomain,
        analytics: form.analytics,
        coreMessage: form.coreMessage,
      }

      const submission = await createSubmission({
        source: 'user',
        wizardType: 'full',
        email,
        wizardData,
      })

      const report = await generateReport(submission.id)
      navigate(`/wizard/success?submission=${submission.id}`)
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Error submitting. Please try again.')
      setIsSubmitting(false)
    }
  }

  const selectedStyle = STYLE_PRESETS.find((s) => s.id === form.stylePreset) || STYLE_PRESETS[0]
  const selectedFont = FONT_PAIRS.find((f) => f.id === form.fontPair) || FONT_PAIRS[0]
  const previewPrimary = form.stylePreset === "nu-decide" ? C.mint :
    form.stylePreset === "dark-bold" ? "#0F3460" :
    form.stylePreset === "warm-earth" ? "#D4A373" :
    form.stylePreset === "ocean" ? "#0077B6" :
    form.stylePreset === "sunset" ? "#FCA311" : C.mint

  return (
    <div style={{ minHeight: "100vh", background: C.cream }}>
      <style>{css}</style>

      <div className="form-shell">
        {/* ════════ LEFT: FORM PANEL ════════ */}
        <div className="form-panel">
          {/* Header */}
          <div className="form-header">
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div className="form-logo">bye<span>NU</span></div>
              <div className="mode-switch">
                <button className="mode-btn" onClick={() => navigate('/wizard/full')}>Wizard</button>
                <button className="mode-btn active">Form</button>
                <button className="mode-btn" onClick={() => navigate('/wizard/ai')}>Chat</button>
              </div>
            </div>
            <div className="form-header-meta">
              {savedAt && (
                <div className="save-indicator saved">
                  <Icon.Check size={12} /> Saved {Math.floor((Date.now() - savedAt) / 1000)}s ago
                </div>
              )}
              <span>{completionPct}% complete</span>
            </div>
          </div>

          {/* Progress */}
          <div className="form-progress-bar">
            <div className="form-progress-fill" style={{ width: `${completionPct}%` }} />
          </div>

          {/* Scrollable Form */}
          <div className="form-scroll" ref={scrollRef}>

            {/* ── SECTION: BASICS ── */}
            <div className={`form-section ${openSections.includes("basics") ? "active" : ""}`}>
              <button className="section-toggle" onClick={() => toggleSection("basics")}>
                <SectionIcon name="Globe" color={C.mint} />
                <span className="section-label">Site Basics</span>
                {sectionCompletion("basics") > 0 && (
                  <span className="section-badge">{sectionCompletion("basics")}/4</span>
                )}
                <span className={`section-chevron ${openSections.includes("basics") ? "open" : ""}`}>
                  <Icon.ChevronRight size={16} />
                </span>
              </button>
              {openSections.includes("basics") && (
                <div className="section-body">
                  <div className="field-row">
                    <div className="field-group">
                      <label className="field-label">Business Name</label>
                      <div style={{ position: "relative" }}>
                        <input
                          className={`field-input ${form.siteName ? "has-value" : ""}`}
                          placeholder="Sunrise Yoga Studio"
                          value={form.siteName}
                          onChange={(e) => updateForm("siteName", e.target.value)}
                        />
                        {form.siteName && <span className="field-valid-icon"><Icon.Check size={14} /></span>}
                      </div>
                    </div>
                    <div className="field-group">
                      <label className="field-label">
                        Subdomain
                        <span style={{ color: C.grayLight, fontWeight: 400 }}>.byenu.site</span>
                      </label>
                      <input
                        className={`field-input ${form.domain ? "has-value" : ""}`}
                        placeholder="sunrise-yoga"
                        value={form.domain}
                        onChange={(e) => updateForm("domain", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="field-row">
                    <div className="field-group">
                      <label className="field-label">Industry</label>
                      <div className="field-select-wrap">
                        <select
                          className={`field-select ${form.industry ? "has-value" : ""}`}
                          value={form.industry}
                          onChange={(e) => updateForm("industry", e.target.value)}
                        >
                          <option value="">Select industry</option>
                          {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
                        </select>
                        <span className="field-select-arrow"><Icon.ChevronDown size={14} /></span>
                      </div>
                    </div>
                    <div className="field-group">
                      <label className="field-label">Business Type</label>
                      <div className="field-select-wrap">
                        <select
                          className={`field-select ${form.businessType ? "has-value" : ""}`}
                          value={form.businessType}
                          onChange={(e) => updateForm("businessType", e.target.value)}
                        >
                          <option value="">Select type</option>
                          {BUSINESS_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                        <span className="field-select-arrow"><Icon.ChevronDown size={14} /></span>
                      </div>
                    </div>
                  </div>

                  <div className="field-group">
                    <label className="field-label">
                      What does your business do?
                      <span style={{ color: C.grayLight, fontWeight: 400, fontSize: 11 }}>· one sentence</span>
                    </label>
                    <textarea
                      className={`field-input field-textarea ${form.description ? "has-value" : ""}`}
                      placeholder="We offer yoga classes for beginners and stressed professionals in downtown Austin"
                      value={form.description}
                      onChange={(e) => updateForm("description", e.target.value)}
                    />
                  </div>

                  <div className="field-group">
                    <label className="field-label">Ideal Customer</label>
                    <input
                      className={`field-input ${form.audience ? "has-value" : ""}`}
                      placeholder="Busy professionals aged 25-45 who want to de-stress"
                      value={form.audience}
                      onChange={(e) => updateForm("audience", e.target.value)}
                    />
                    <span className="field-hint">NU tailors your site's tone and content to resonate with them.</span>
                  </div>
                </div>
              )}
            </div>

            {/* ── SECTION: DESIGN ── */}
            <div className={`form-section ${openSections.includes("design") ? "active" : ""}`}>
              <button className="section-toggle" onClick={() => toggleSection("design")}>
                <SectionIcon name="Palette" color={C.gold} />
                <span className="section-label">Design & Style</span>
                {sectionCompletion("design") > 0 && (
                  <span className="section-badge">{sectionCompletion("design")}/3</span>
                )}
                <span className={`section-chevron ${openSections.includes("design") ? "open" : ""}`}>
                  <Icon.ChevronRight size={16} />
                </span>
              </button>
              {openSections.includes("design") && (
                <div className="section-body">
                  <div className="field-group">
                    <label className="field-label">Brand Personality</label>
                    <span className="field-hint">Pick up to 3 words that describe your vibe.</span>
                    <div className="pills-wrap" style={{ marginTop: 4 }}>
                      {TONE_OPTIONS.map((t) => (
                        <button
                          key={t}
                          className={`pill ${form.tones.includes(t) ? "selected" : ""}`}
                          onClick={() => {
                            if (form.tones.includes(t)) {
                              updateForm("tones", form.tones.filter((x) => x !== t))
                            } else if (form.tones.length < 3) {
                              updateForm("tones", [...form.tones, t])
                            }
                          }}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    {form.tones.length > 0 && (
                      <span className="field-hint" style={{ color: C.mint }}>{form.tones.length}/3 selected</span>
                    )}
                  </div>

                  <div className="field-group">
                    <label className="field-label">Color Style</label>
                    <div className="style-grid">
                      {STYLE_PRESETS.map((s) => (
                        <div
                          key={s.id}
                          className={`style-card ${form.stylePreset === s.id ? "selected" : ""}`}
                          onClick={() => updateForm("stylePreset", s.id)}
                        >
                          <div className="style-swatches">
                            {s.colors.map((c, i) => (
                              <div key={i} className="style-swatch" style={{ background: c }} />
                            ))}
                          </div>
                          <div className="style-card-label">{s.label}</div>
                          <div className="style-card-desc">{s.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="field-group">
                    <label className="field-label">Typography</label>
                    <div className="font-grid">
                      {FONT_PAIRS.map((f) => (
                        <div
                          key={f.id}
                          className={`font-card ${form.fontPair === f.id ? "selected" : ""}`}
                          onClick={() => updateForm("fontPair", f.id)}
                        >
                          <div className="font-card-heading" style={{
                            fontFamily: f.heading === "Fraunces" ? "'Fraunces', serif" :
                              f.heading === "DM Sans" ? "'DM Sans', sans-serif" : `'${f.heading}', sans-serif`
                          }}>
                            Aa Bb Cc
                          </div>
                          <div className="font-card-body">The quick brown fox jumps</div>
                          <div className="font-card-label">{f.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="field-group">
                    <label className="field-label">Logo</label>
                    <div className="upload-zone">
                      <div className="upload-zone-icon"><Icon.Upload size={28} /></div>
                      <div className="upload-zone-text">
                        <strong>Click to upload</strong> or drag & drop<br />
                        PNG, SVG, or JPG (max 5MB)
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ── SECTION: PAGES ── */}
            <div className={`form-section ${openSections.includes("pages") ? "active" : ""}`}>
              <button className="section-toggle" onClick={() => toggleSection("pages")}>
                <SectionIcon name="Layout" color={C.coral} />
                <span className="section-label">Pages & Structure</span>
                {form.pages.length > 0 && (
                  <span className="section-badge">{form.pages.length} pages</span>
                )}
                <span className={`section-chevron ${openSections.includes("pages") ? "open" : ""}`}>
                  <Icon.ChevronRight size={16} />
                </span>
              </button>
              {openSections.includes("pages") && (
                <div className="section-body">
                  <div className="field-group">
                    <label className="field-label">Select your pages</label>
                    <span className="field-hint">NU will structure and populate each page with AI-generated content tailored to your business.</span>
                    <div className="pills-wrap" style={{ marginTop: 4 }}>
                      {PAGE_OPTIONS.map((p) => (
                        <button
                          key={p}
                          className={`pill ${form.pages.includes(p) ? "selected" : ""}`}
                          onClick={() => toggleArrayItem("pages", p)}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="field-group">
                    <label className="field-label">
                      Core Message
                      <span style={{ color: C.grayLight, fontWeight: 400, fontSize: 11 }}>· what visitors must know</span>
                    </label>
                    <textarea
                      className="field-input field-textarea"
                      placeholder="We've helped 500+ professionals find calm through personalized yoga programs"
                      value={form.coreMessage || ""}
                      onChange={(e) => updateForm("coreMessage", e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* ── SECTION: FEATURES ── */}
            <div className={`form-section ${openSections.includes("features") ? "active" : ""}`}>
              <button className="section-toggle" onClick={() => toggleSection("features")}>
                <SectionIcon name="Zap" color={C.mintLight} />
                <span className="section-label">Abilities</span>
                {form.features.length > 0 && (
                  <span className="section-badge">{form.features.length} active</span>
                )}
                <span className={`section-chevron ${openSections.includes("features") ? "open" : ""}`}>
                  <Icon.ChevronRight size={16} />
                </span>
              </button>
              {openSections.includes("features") && (
                <div className="section-body">
                  <div className="field-group">
                    <label className="field-label">Built-in abilities</label>
                    <span className="field-hint">No plugins required. NU builds these directly into your site.</span>
                    <div className="feature-grid" style={{ marginTop: 4 }}>
                      {FEATURE_OPTIONS.map((f) => (
                        <div
                          key={f.label}
                          className={`feature-check ${form.features.includes(f.label) ? "selected" : ""}`}
                          onClick={() => toggleArrayItem("features", f.label)}
                        >
                          <div className={`check-box ${form.features.includes(f.label) ? "checked" : ""}`}>
                            {form.features.includes(f.label) && <Icon.Check size={12} />}
                          </div>
                          <div>
                            <div className="feature-check-label">{f.label}</div>
                            <div className="feature-check-desc">{f.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ── SECTION: ADVANCED ── */}
            <div className={`form-section ${openSections.includes("advanced") ? "active" : ""}`}>
              <button className="section-toggle" onClick={() => toggleSection("advanced")}>
                <SectionIcon name="Settings" color={C.gray} />
                <span className="section-label">Advanced</span>
                <span className={`section-chevron ${openSections.includes("advanced") ? "open" : ""}`}>
                  <Icon.ChevronRight size={16} />
                </span>
              </button>
              {openSections.includes("advanced") && (
                <div className="section-body">
                  <div className="field-row">
                    <div className="field-group">
                      <label className="field-label">SEO Title</label>
                      <input
                        className={`field-input ${form.seoTitle ? "has-value" : ""}`}
                        placeholder="Best Yoga Studio in Austin | Sunrise Yoga"
                        value={form.seoTitle}
                        onChange={(e) => updateForm("seoTitle", e.target.value)}
                      />
                      <span className="field-hint">Appears in search engine results. ~60 chars ideal.</span>
                    </div>
                    <div className="field-group">
                      <label className="field-label">Custom Domain</label>
                      <input
                        className={`field-input ${form.customDomain ? "has-value" : ""}`}
                        placeholder="www.sunriseyoga.com"
                        value={form.customDomain}
                        onChange={(e) => updateForm("customDomain", e.target.value)}
                      />
                      <span className="field-hint">Connect your own domain after publishing.</span>
                    </div>
                  </div>

                  <div className="field-group">
                    <label className="field-label">Meta Description</label>
                    <textarea
                      className={`field-input field-textarea ${form.seoDescription ? "has-value" : ""}`}
                      placeholder="Sunrise Yoga Studio offers beginner-friendly yoga classes for stressed professionals in downtown Austin. Book your first class free."
                      value={form.seoDescription}
                      onChange={(e) => updateForm("seoDescription", e.target.value)}
                      style={{ minHeight: 60 }}
                    />
                  </div>

                  <div className="feature-check selected" onClick={() => updateForm("analytics", !form.analytics)} style={{ cursor: "pointer" }}>
                    <div className={`check-box ${form.analytics ? "checked" : ""}`}>
                      {form.analytics && <Icon.Check size={12} />}
                    </div>
                    <div>
                      <div className="feature-check-label">Enable Analytics</div>
                      <div className="feature-check-desc">Track visitors, page views, and conversions automatically.</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="form-footer">
            <div className="form-footer-left">
              <button className="form-skip" onClick={() => navigate('/wizard-selector')}>Skip — let NU decide everything</button>
            </div>
            <button className="form-submit" onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? 'Building...' : (
                <>
                  Build My Site <Icon.ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </div>

        {/* ════════ RIGHT: LIVE PREVIEW ════════ */}
        <div className="preview-panel">
          <div className="preview-header">
            <div className="preview-title">Live Preview</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div className="preview-devices">
                {[
                  { id: "desktop", icon: "Monitor" },
                  { id: "tablet", icon: "Tablet" },
                  { id: "phone", icon: "Phone" },
                ].map((d) => {
                  const DevIcon = Icon[d.icon]
                  return (
                    <button
                      key={d.id}
                      className={`preview-device-btn ${previewDevice === d.id ? "active" : ""}`}
                      onClick={() => setPreviewDevice(d.id)}
                    >
                      {DevIcon && <DevIcon size={16} />}
                    </button>
                  )
                })}
              </div>
              <button className="preview-device-btn" title="Refresh preview">
                <Icon.Refresh size={14} />
              </button>
            </div>
          </div>

          <div className="preview-viewport">
            <div className={`preview-frame ${previewDevice}`}>
              {/* Mini nav */}
              <div className="prev-nav">
                <div className="prev-nav-logo" style={{
                  fontFamily: selectedFont.heading === "Fraunces" ? "'Fraunces', serif" : "'DM Sans', sans-serif"
                }}>
                  {form.siteName || "Your Site"}
                </div>
                <div className="prev-nav-links">
                  {form.pages.slice(0, 3).map((p) => (
                    <span key={p} className="prev-nav-link">{p}</span>
                  ))}
                </div>
                <span className="prev-nav-cta" style={{ background: previewPrimary }}>
                  Contact
                </span>
              </div>

              {/* Hero */}
              <div className="prev-hero" style={{
                background: form.stylePreset === "dark-bold" ? "#1A1A2E" : C.cream,
                color: form.stylePreset === "dark-bold" ? "white" : C.charcoal,
              }}>
                <h1 style={{
                  fontFamily: selectedFont.heading === "Fraunces" ? "'Fraunces', serif" : "'DM Sans', sans-serif"
                }}>
                  {form.siteName || "Your Business Name"}
                </h1>
                <p style={{ color: form.stylePreset === "dark-bold" ? "#9CA3AF" : C.gray }}>
                  {form.description || "Your business description will appear here. Tell NU what you do."}
                </p>
                <span className="prev-hero-btn" style={{ background: previewPrimary }}>
                  Get Started
                </span>
              </div>

              {/* Tone pills */}
              {form.tones.length > 0 && (
                <div className="prev-section" style={{ paddingTop: 0 }}>
                  <div style={{ display: "flex", gap: 4, justifyContent: "center", flexWrap: "wrap" }}>
                    {form.tones.map((t) => (
                      <span key={t} style={{
                        padding: "2px 8px", borderRadius: 4, fontSize: 8,
                        background: `${previewPrimary}18`, color: previewPrimary,
                        fontWeight: 600,
                      }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Pages */}
              {form.pages.length > 0 && (
                <div className="prev-section">
                  <div className="prev-section-title">Pages</div>
                  <div className="prev-pages-list">
                    {form.pages.map((p) => (
                      <span key={p} className="prev-page-tag" style={{
                        borderColor: `${previewPrimary}40`, color: previewPrimary,
                      }}>
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              {form.features.length > 0 && (
                <div className="prev-section">
                  <div className="prev-section-title">Abilities</div>
                  <div className="prev-features">
                    {form.features.slice(0, 6).map((f) => (
                      <div key={f} className="prev-feature-card" style={{
                        borderColor: `${previewPrimary}30`,
                      }}>
                        <div className="prev-feature-icon">⚡</div>
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="prev-footer" style={{
                background: form.stylePreset === "dark-bold" ? "#16213E" : C.cream,
                color: form.stylePreset === "dark-bold" ? "#6B7280" : C.grayLight,
              }}>
                © {new Date().getFullYear()} {form.siteName || "Your Business"} · Powered by byeNU
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Assist Button */}
      <button className="chat-assist-btn" onClick={() => navigate('/wizard/ai')} title="Switch to Chat mode">
        <Icon.Chat size={20} />
        <span className="chat-assist-badge">1</span>
      </button>
    </div>
  )
}
