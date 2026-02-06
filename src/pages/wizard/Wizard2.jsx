import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useBuild } from "../../context/BuildContext.jsx";
import { createSubmission } from "../../api/submissions.js";
import { generateReport } from "../../api/reports.js";
import { useAuth } from "../../lib/auth/AuthContext.jsx";

// ─── PALETTE ───
const C = {
  mint: "#1A7A6D", mintLight: "#2EC4B6", mintGlow: "rgba(26,122,109,0.08)",
  mintBorder: "rgba(26,122,109,0.20)", gold: "#D4A843", goldLight: "#F5E6C4",
  goldGlow: "rgba(212,168,67,0.10)", coral: "#E8756D", coralGlow: "rgba(232,117,109,0.10)",
  cream: "#FAFAF5", white: "#FFFFFF", charcoal: "#1A1A2E", dark: "#12121F",
  gray: "#6B7280", grayLight: "#9CA3AF", grayPale: "#D1D5DB", border: "#E8E8E0",
  success: "#22C55E", successGlow: "rgba(34,197,94,0.10)", bg: "#F6F6F1",
};

// ─── ICONS ───
const I = {
  Check: (p) => <svg width={p?.s||14} height={p?.s||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Edit: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  Sparkle: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3L13.5 8.5L19 10L13.5 11.5L12 17L10.5 11.5L5 10L10.5 8.5L12 3Z"/><path d="M19 15L19.7 17.3L22 18L19.7 18.7L19 21L18.3 18.7L16 18L18.3 17.3L19 15Z"/></svg>,
  Book: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  Bulb: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>,
  ArrowR: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  ArrowL: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  Globe: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  Users: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Palette: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="10.5" r="2.5"/><circle cx="8.5" cy="7.5" r="2.5"/><circle cx="6.5" cy="12.5" r="2.5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>,
  Layout: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>,
  Zap: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Eye: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  Shield: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Target: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  Chat: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
};

// ─── STAGES ───
const STAGES = [
  {
    id: "identity", icon: "Globe", label: "Identity", color: C.mint, num: "01",
    question: "What's the name of your business?",
    subtitle: "This becomes your headline, URL, and brand anchor.",
    type: "text", placeholder: "e.g. Sunrise Yoga Studio",
    docTitle: "Why your name matters",
    docBody: "Your business name becomes your site's headline, URL slug, and SEO anchor. NU generates domain variations, logo text, and metadata from this single input.",
    docTips: ["Under 30 chars for best display", "Avoid special characters", "NU auto-generates a text logo"],
  },
  {
    id: "purpose", icon: "Bulb", label: "Purpose", color: C.gold, num: "02",
    question: "In one sentence — what do you do and who do you help?",
    subtitle: "This shapes every page NU builds for you.",
    type: "text", placeholder: "e.g. We offer yoga classes for stressed professionals in Austin",
    suggestions: ["We sell handmade candles online", "We consult for startups", "We teach piano to kids and adults"],
    docTitle: "Your value proposition",
    docBody: "This sentence generates your hero copy, meta descriptions, and page content. Best formula: [What you do] + [for whom] + [where/how].",
    docTips: ["Be specific about your audience", "Include location if local", "Action verb + benefit works best"],
  },
  {
    id: "audience", icon: "Users", label: "Audience", color: C.coral, num: "03",
    question: "Describe your ideal customer.",
    subtitle: "NU calibrates language, imagery, and tone to resonate with them.",
    type: "text", placeholder: "e.g. Busy professionals aged 25-45 who want to de-stress",
    suggestions: ["Young professionals 25-35", "Small business owners", "Health-conscious millennials"],
    docTitle: "Know your audience",
    docBody: "NU calibrates language complexity, imagery, and layout based on your audience profile. A site for teens reads differently than one for executives.",
    docTips: ["Age range helps NU pick fonts", "Income level affects design tone", "Tech comfort shapes layout complexity"],
  },
  {
    id: "tone", icon: "Sparkle", label: "Tone", color: C.mintLight, num: "04",
    question: "Pick 3 words that capture your brand's vibe.",
    subtitle: "These become your design DNA — color, type, spacing, motion.",
    type: "pills",
    options: ["Calm", "Energetic", "Professional", "Playful", "Bold", "Minimal", "Warm", "Luxurious", "Natural", "Modern", "Friendly", "Edgy", "Corporate", "Artistic"],
    maxSelect: 3,
    docTitle: "Tone shapes everything",
    docBody: "NU maps these words to color temperature, typography weight, spacing density, and animation intensity. 'Calm + Minimal + Natural' produces a vastly different site than 'Bold + Edgy + Modern'.",
    docTips: ["Contrasting tones = unique identity", "'Luxurious' triggers premium spacing", "'Playful' enables micro-animations"],
  },
  {
    id: "pages", icon: "Layout", label: "Pages", color: C.mint, num: "05",
    question: "What pages does your site need?",
    subtitle: "Each page gets AI-generated content tailored to your business.",
    type: "pills",
    options: ["Home", "About", "Services", "Pricing", "Contact", "Blog", "Portfolio", "Testimonials", "FAQ", "Shop", "Booking", "Team"],
    maxSelect: 12,
    docTitle: "Site architecture",
    docBody: "NU structures navigation hierarchy automatically. Home is always included. Most businesses perform best with 4-6 pages — enough depth without overwhelming visitors.",
    docTips: ["Services + Pricing = high conversion", "Blog adds long-term SEO value", "Booking auto-integrates scheduling"],
  },
  {
    id: "visuals", icon: "Palette", label: "Visuals", color: C.gold, num: "06",
    question: "What visual direction?",
    subtitle: "Or let NU engineer the perfect palette from your inputs.",
    type: "cards",
    options: [
      { id: "nu", label: "Let NU Decide", desc: "AI picks the optimal palette", colors: [C.mint, C.mintLight, C.gold], icon: "Sparkle" },
      { id: "light", label: "Light & Airy", desc: "Soft whites, breathing room", colors: ["#F8F9FA", "#E9ECEF", "#CED4DA"], icon: "Eye" },
      { id: "dark", label: "Dark & Bold", desc: "Deep backgrounds, vivid accents", colors: ["#1A1A2E", "#16213E", "#E94560"], icon: "Shield" },
      { id: "warm", label: "Warm & Earthy", desc: "Terracotta, cream, forest", colors: ["#D4A373", "#CCD5AE", "#FEFAE0"], icon: "Target" },
    ],
    docTitle: "Visual identity",
    docBody: "Color communicates before words. 'Let NU Decide' algorithmically selects based on your business type + tone. You can always refine after launch.",
    docTips: ["Dark themes convert for tech/gaming", "Light themes for health/services", "NU auto-generates 60-30-10 ratios"],
  },
  {
    id: "features", icon: "Zap", label: "Abilities", color: C.coral, num: "07",
    question: "What abilities does your site need?",
    subtitle: "Built in. No plugins. No integrations. Just works.",
    type: "pills",
    options: ["Contact Form", "Booking", "E-commerce", "Analytics", "Blog/CMS", "Newsletter", "Social Feed", "Live Chat", "Video", "Maps", "Reviews", "Members"],
    maxSelect: 12,
    docTitle: "Built-in abilities",
    docBody: "Unlike plugin-dependent builders, NU compiles these capabilities directly into your site code. They're faster, more reliable, and auto-styled to match your design.",
    docTips: ["Contact Form included by default", "E-commerce = cart + checkout + Stripe", "Analytics tracks from day one"],
  },
  {
    id: "review", icon: "Eye", label: "Launch", color: C.success, num: "08",
    question: "Your site blueprint.",
    subtitle: "Everything NU needs to build. Review and launch.",
    type: "review",
    docTitle: "Pre-launch",
    docBody: "NU generates your complete website — pages, content, styling, live URL. Average build time: 47 seconds. Everything is editable after launch through conversation.",
    docTips: ["Change anything post-launch", "Every version is saved", "Live at yourname.byenu.site"],
  },
];

const STYLE_LABELS = { nu: "NU AI Palette", light: "Light & Airy", dark: "Dark & Bold", warm: "Warm & Earthy" };

const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=JetBrains+Mono:wght@400;500&display=swap');
*{margin:0;padding:0;box-sizing:border-box;}

.wz{display:flex;height:100vh;background:${C.bg};font-family:'DM Sans',sans-serif;color:${C.charcoal};overflow:hidden;}

/* ── LEFT ── */
.wz-left{width:256px;flex-shrink:0;display:flex;flex-direction:column;background:${C.white};border-right:1px solid ${C.border};}
.wz-left-hd{padding:16px 18px;border-bottom:1px solid ${C.border};display:flex;align-items:center;justify-content:space-between;}
.wz-logo{font-family:'Fraunces',serif;font-weight:700;font-size:17px;}.wz-logo span{color:${C.mint};}
.wz-pct{font-size:10px;font-weight:700;padding:3px 9px;border-radius:8px;background:${C.mintGlow};color:${C.mint};}
.wz-left-scroll{flex:1;overflow-y:auto;padding:10px 12px;}
.wz-left-scroll::-webkit-scrollbar{width:3px;}.wz-left-scroll::-webkit-scrollbar-thumb{background:${C.grayPale};border-radius:2px;}

.rc{border-radius:12px;padding:11px 13px;margin-bottom:6px;transition:all 0.25s;cursor:pointer;position:relative;border:1px solid transparent;}
.rc.filled{background:${C.cream};border-color:${C.border};}.rc.filled:hover{border-color:${C.mintBorder};box-shadow:0 2px 8px ${C.mintGlow};}
.rc.current{background:${C.mintGlow};border-color:${C.mintBorder};}
.rc.empty{border:1px dashed ${C.grayPale};}
.rc-top{display:flex;align-items:center;gap:6px;margin-bottom:4px;}
.rc-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0;}
.rc-num{font-family:'JetBrains Mono',monospace;font-size:9px;font-weight:600;color:${C.grayLight};}
.rc-label{font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:${C.grayLight};flex:1;}
.rc-edit{position:absolute;top:8px;right:8px;opacity:0;background:none;border:none;color:${C.grayLight};cursor:pointer;transition:opacity 0.2s;padding:2px;}
.rc.filled:hover .rc-edit{opacity:1;}
.rc-val{font-size:12px;font-weight:500;line-height:1.4;color:${C.charcoal};display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
.rc-pills{display:flex;flex-wrap:wrap;gap:3px;}
.rc-pill{font-size:9px;padding:2px 6px;border-radius:5px;background:${C.mint};color:white;font-weight:600;}

.wz-left-ft{padding:10px 14px;border-top:1px solid ${C.border};}
.wz-prog-wrap{height:3px;background:${C.border};border-radius:2px;margin-bottom:5px;overflow:hidden;}
.wz-prog-fill{height:100%;background:linear-gradient(90deg,${C.mint},${C.mintLight});border-radius:2px;transition:width 0.6s cubic-bezier(0.16,1,0.3,1);}
.wz-left-ft-txt{font-size:10px;color:${C.grayLight};text-align:center;}

/* ── CENTER ── */
.wz-center{flex:1;display:flex;flex-direction:column;min-width:0;position:relative;overflow:hidden;background:${C.bg};}

/* Top bar */
.wz-top-bar{height:3px;background:${C.border};flex-shrink:0;}
.wz-top-fill{height:100%;background:linear-gradient(90deg,${C.mint},${C.gold},${C.mintLight});background-size:300% 100%;animation:barShift 10s ease infinite;transition:width 0.6s cubic-bezier(0.16,1,0.3,1);}
@keyframes barShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}

/* Header */
.wz-hd{display:flex;align-items:center;justify-content:space-between;padding:12px 28px;background:${C.white};border-bottom:1px solid ${C.border};flex-shrink:0;}
.wz-hd-left{display:flex;align-items:center;gap:14px;}
.wz-stage-tag{display:flex;align-items:center;gap:6px;padding:4px 12px 4px 8px;background:${C.cream};border-radius:8px;border:1px solid ${C.border};}
.wz-stage-num{font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:600;color:${C.grayLight};}
.wz-stage-name{font-size:12px;font-weight:600;}
.wz-pips{display:flex;gap:3px;align-items:center;}
.wz-pip{height:4px;border-radius:2px;transition:all 0.4s cubic-bezier(0.16,1,0.3,1);cursor:pointer;}
.wz-pip.done{background:${C.mint};width:20px;}.wz-pip.cur{background:${C.gold};width:32px;}.wz-pip.up{background:${C.grayPale};width:16px;}
.wz-hd-right{display:flex;gap:6px;}
.wz-hd-btn{padding:6px 12px;border:1px solid ${C.border};border-radius:8px;font-size:11px;font-weight:600;cursor:pointer;font-family:inherit;background:${C.white};color:${C.gray};display:flex;align-items:center;gap:5px;transition:all 0.2s;}
.wz-hd-btn:hover{border-color:${C.mint};color:${C.mint};}
.wz-hd-btn.active{background:${C.mintGlow};color:${C.mint};border-color:${C.mint};}

/* Main Area */
.wz-main{flex:1;display:flex;align-items:center;justify-content:center;padding:32px;overflow-y:auto;min-height:0;}
.wz-card{width:100%;max-width:580px;animation:cardIn 0.45s cubic-bezier(0.16,1,0.3,1);}
@keyframes cardIn{from{opacity:0;transform:translateY(16px) scale(0.98)}to{opacity:1;transform:translateY(0) scale(1)}}

.wz-q-num{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:600;color:${C.grayLight};margin-bottom:8px;display:flex;align-items:center;gap:6px;}
.wz-q-num-dot{width:8px;height:8px;border-radius:50%;}
.wz-q{font-family:'Fraunces',serif;font-size:32px;font-weight:600;line-height:1.2;letter-spacing:-0.8px;margin-bottom:8px;}
.wz-q-sub{font-size:14px;color:${C.grayLight};line-height:1.5;margin-bottom:28px;}

/* Text Input */
.wz-input-wrap{position:relative;display:flex;gap:8px;align-items:center;}
.wz-input{flex:1;padding:16px 20px;border:2px solid ${C.border};border-radius:14px;font-size:16px;font-family:inherit;color:${C.charcoal};background:${C.cream};outline:none;transition:all 0.25s;}
.wz-input:focus{border-color:${C.mint};background:${C.white};box-shadow:0 0 0 4px ${C.mintGlow};}
.wz-input::placeholder{color:${C.grayPale};}
.wz-input-hint{position:absolute;right:70px;top:50%;transform:translateY(-50%);font-size:10px;color:${C.grayPale};font-family:'JetBrains Mono',monospace;pointer-events:none;}
.wz-input-continue{flex-shrink:0;width:48px;height:48px;border-radius:50%;background:${C.mint};color:white;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.3s;padding:0;}
.wz-input-continue:hover:not(:disabled){background:${C.gold};color:${C.charcoal};transform:translateY(-1px);box-shadow:0 6px 20px ${C.goldGlow};}
.wz-input-continue:disabled{opacity:0.35;cursor:not-allowed;}

/* Suggestions */
.wz-sugg{display:flex;flex-wrap:wrap;gap:6px;margin-top:14px;}
.wz-sugg-chip{padding:8px 14px;border:1px solid ${C.border};border-radius:20px;font-size:12px;font-weight:500;cursor:pointer;font-family:inherit;background:${C.white};color:${C.charcoal};transition:all 0.2s;display:flex;align-items:center;gap:5px;}
.wz-sugg-chip:hover{border-color:${C.mint};background:${C.mintGlow};color:${C.mint};}
.wz-sugg-chip svg{color:${C.grayLight};}

/* Pills */
.wz-pills{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;}
.wz-pill{padding:10px 18px;border:2px solid ${C.border};border-radius:22px;font-size:14px;font-weight:500;cursor:pointer;font-family:inherit;background:${C.white};color:${C.charcoal};transition:all 0.2s;user-select:none;}
.wz-pill:hover{border-color:${C.mint};background:${C.mintGlow};}
.wz-pill.sel{border-color:${C.mint};background:${C.mint};color:white;transform:scale(1.02);}
.wz-pill-footer{display:flex;align-items:center;justify-content:space-between;margin-top:16px;}
.wz-pill-count{font-size:12px;color:${C.mint};font-weight:600;}

/* Visual Cards */
.wz-vcards{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px;}
.wz-vcard{padding:20px;border:2px solid ${C.border};border-radius:16px;cursor:pointer;transition:all 0.25s;background:${C.white};position:relative;overflow:hidden;}
.wz-vcard:hover{border-color:${C.mintBorder};transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,0.04);}
.wz-vcard.sel{border-color:${C.mint};background:${C.mintGlow};box-shadow:0 0 0 3px ${C.mintGlow};}
.wz-vcard-swatches{display:flex;gap:4px;margin-bottom:12px;}
.wz-vcard-swatch{width:24px;height:24px;border-radius:50%;border:2.5px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.1);transition:transform 0.2s;}
.wz-vcard:hover .wz-vcard-swatch{transform:scale(1.1);}
.wz-vcard-icon{position:absolute;top:14px;right:14px;width:28px;height:28px;border-radius:8px;display:flex;align-items:center;justify-content:center;color:${C.grayLight};transition:all 0.2s;}
.wz-vcard.sel .wz-vcard-icon{color:${C.mint};background:${C.mintGlow};}
.wz-vcard h4{font-size:15px;font-weight:700;margin-bottom:3px;}
.wz-vcard p{font-size:12px;color:${C.grayLight};line-height:1.4;}
.wz-vcard-check{position:absolute;top:14px;right:14px;width:22px;height:22px;border-radius:50%;background:${C.mint};color:white;display:flex;align-items:center;justify-content:center;opacity:0;transform:scale(0.6);transition:all 0.2s;}
.wz-vcard.sel .wz-vcard-check{opacity:1;transform:scale(1);}
.wz-cards-footer{display:flex;justify-content:flex-end;margin-top:20px;}

/* Review */
.wz-review{background:${C.white};border:1px solid ${C.border};border-radius:18px;overflow:hidden;}
.wz-review-row{display:flex;justify-content:space-between;align-items:flex-start;padding:14px 18px;border-bottom:1px solid ${C.border};transition:background 0.2s;cursor:pointer;}
.wz-review-row:last-child{border-bottom:none;}
.wz-review-row:hover{background:${C.cream};}
.wz-review-label{font-size:12px;color:${C.grayLight};font-weight:600;min-width:80px;display:flex;align-items:center;gap:6px;}
.wz-review-label-dot{width:6px;height:6px;border-radius:50%;}
.wz-review-val{font-size:13px;font-weight:500;text-align:right;flex:1;}
.wz-review-pills{display:flex;flex-wrap:wrap;gap:3px;justify-content:flex-end;}
.wz-review-pill{font-size:10px;padding:3px 8px;border-radius:6px;background:${C.mintGlow};color:${C.mint};font-weight:600;}
.wz-review-edit{color:${C.grayPale};opacity:0;transition:opacity 0.2s;margin-left:8px;display:flex;}
.wz-review-row:hover .wz-review-edit{opacity:1;}

/* Footer */
.wz-footer{display:flex;align-items:center;justify-content:space-between;padding:16px 28px;background:${C.white};border-top:1px solid ${C.border};flex-shrink:0;min-height:60px;}
.wz-back{display:flex;align-items:center;gap:5px;background:none;border:none;color:${C.gray};font-size:13px;font-weight:500;cursor:pointer;font-family:inherit;padding:8px 0;transition:color 0.2s;}
.wz-back:hover{color:${C.charcoal};}
.wz-next{display:flex;align-items:center;gap:8px;background:${C.mint};color:white;padding:13px 28px;border-radius:12px;font-weight:600;font-size:14px;border:none;cursor:pointer;font-family:inherit;transition:all 0.3s;}
.wz-next:hover:not(:disabled){background:${C.gold};color:${C.charcoal};transform:translateY(-1px);box-shadow:0 6px 20px ${C.goldGlow};}
.wz-next:disabled{opacity:0.35;cursor:not-allowed;}
.wz-skip{font-size:12px;color:${C.grayLight};background:none;border:none;cursor:pointer;font-family:inherit;text-decoration:underline;text-underline-offset:2px;transition:color 0.2s;}
.wz-skip:hover{color:${C.charcoal};}

/* ── RIGHT ── */
.wz-right{width:272px;flex-shrink:0;display:flex;flex-direction:column;background:${C.white};border-left:1px solid ${C.border};}
.wz-right-hd{padding:14px 18px;border-bottom:1px solid ${C.border};display:flex;align-items:center;gap:8px;}
.wz-right-hd-icon{color:${C.gold};display:flex;}
.wz-right-hd-title{font-size:13px;font-weight:600;}
.wz-right-scroll{flex:1;overflow-y:auto;padding:18px;}
.wz-right-scroll::-webkit-scrollbar{width:3px;}.wz-right-scroll::-webkit-scrollbar-thumb{background:${C.grayPale};border-radius:2px;}

.doc-s{margin-bottom:18px;animation:cardIn 0.35s ease;}
.doc-t{font-family:'Fraunces',serif;font-size:16px;font-weight:600;margin-bottom:6px;}
.doc-p{font-size:12px;line-height:1.6;color:${C.gray};margin-bottom:12px;}
.doc-tips{display:flex;flex-direction:column;gap:5px;}
.doc-tip{display:flex;gap:7px;align-items:flex-start;padding:8px 10px;background:${C.cream};border-radius:8px;font-size:11px;color:${C.charcoal};line-height:1.4;}
.doc-tip-ic{color:${C.gold};flex-shrink:0;margin-top:1px;}
.doc-div{height:1px;background:${C.border};margin:14px 0;}

.kb-box{padding:10px 12px;background:${C.cream};border-radius:8px;margin-top:10px;}
.kb-row{display:flex;justify-content:space-between;align-items:center;padding:3px 0;font-size:10px;color:${C.grayLight};}
.kb-key{font-family:'JetBrains Mono',monospace;font-size:9px;padding:2px 5px;background:${C.white};border:1px solid ${C.border};border-radius:3px;font-weight:500;}

.wz-right-ft{padding:12px 18px;border-top:1px solid ${C.border};}
.wz-right-btn{width:100%;padding:10px;border:1px solid ${C.border};border-radius:10px;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;background:${C.cream};color:${C.charcoal};display:flex;align-items:center;justify-content:center;gap:6px;transition:all 0.2s;}
.wz-right-btn:hover{border-color:${C.mint};color:${C.mint};background:${C.mintGlow};}

/* ── BUILD OVERLAY ── */
.bld-ov{position:fixed;inset:0;background:rgba(26,26,46,0.92);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:center;z-index:100;animation:fadeIn 0.3s;}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.bld-card{background:${C.white};border-radius:24px;padding:48px;text-align:center;max-width:440px;width:90%;animation:scaleIn 0.4s cubic-bezier(0.16,1,0.3,1);}
@keyframes scaleIn{from{opacity:0;transform:scale(0.94) translateY(12px)}to{opacity:1;transform:scale(1) translateY(0)}}
.bld-ring{width:56px;height:56px;border:3px solid ${C.border};border-top-color:${C.mint};border-radius:50%;margin:0 auto 20px;animation:spin 0.8s linear infinite;}
@keyframes spin{to{transform:rotate(360deg)}}
.bld-t{font-family:'Fraunces',serif;font-size:22px;font-weight:600;margin-bottom:4px;}
.bld-sub{font-size:13px;color:${C.gray};margin-bottom:28px;}
.bld-steps{text-align:left;}
.bld-step{display:flex;align-items:center;gap:10px;padding:8px 0;font-size:13px;color:${C.grayPale};transition:all 0.4s;}
.bld-step.active{color:${C.charcoal};font-weight:500;}
.bld-step.done{color:${C.success};}
.bld-dot{width:8px;height:8px;border-radius:50%;background:${C.grayPale};flex-shrink:0;transition:all 0.4s;}
.bld-step.active .bld-dot{background:${C.gold};box-shadow:0 0 0 4px ${C.goldGlow};}
.bld-step.done .bld-dot{background:${C.success};}

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
.mode-btn:hover:not(.active) { color: ${C.charcoal}; }

/* ── RESPONSIVE ── */
@media(max-width:1100px){.wz-right{display:none;}}
@media(max-width:800px){.wz-left{display:none;}.wz-q{font-size:26px;}}
@media(max-width:640px){.wz-main{padding:20px;}.wz-vcards{grid-template-columns:1fr;}.wz-footer{padding:12px 16px;}}
`;

export default function Wizard2() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { answers: contextAnswers, setAnswer, setStage: setContextStage, mode, setMode, progress: contextProgress } = useBuild();
  const [stage, setStage] = useState(0);
  const [answers, setAnswers] = useState(contextAnswers || {});
  const [text, setText] = useState("");
  const [pillSel, setPillSel] = useState([]);
  const [cardSel, setCardSel] = useState(null);
  const [building, setBuilding] = useState(false);
  const [buildStep, setBuildStep] = useState(0);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef(null);

  // Sync with BuildContext
  useEffect(() => {
    if (Object.keys(contextAnswers).length > 0) {
      setAnswers(contextAnswers);
      const firstUnanswered = STAGES.findIndex(s => s.id !== 'review' && !contextAnswers[s.id]);
      if (firstUnanswered >= 0) {
        setStage(firstUnanswered);
      }
    }
  }, [contextAnswers]);

  // Load current stage values from answers
  useEffect(() => {
    const currentAnswer = answers[STAGES[stage]?.id];
    if (STAGES[stage]?.type === "text" && currentAnswer) {
      setText(currentAnswer);
    } else if (STAGES[stage]?.type === "pills" && Array.isArray(currentAnswer)) {
      setPillSel(currentAnswer);
    } else if (STAGES[stage]?.type === "cards" && currentAnswer) {
      setCardSel(currentAnswer);
    }
  }, [stage, answers]);

  const s = STAGES[stage];
  const progress = Math.round((Object.keys(answers).length / (STAGES.length - 1)) * 100);

  useEffect(() => {
    if (inputRef.current && s.type === "text") inputRef.current.focus();
  }, [stage]);

  useEffect(() => {
    if (building && buildStep < 5) {
      const t = setTimeout(() => setBuildStep((v) => v + 1), 1200);
      return () => clearTimeout(t);
    } else if (building && buildStep >= 5) {
      handleFinalSubmit();
    }
  }, [building, buildStep]);

  const canGo = () => {
    if (s.type === "text") return text.trim().length > 0;
    if (s.type === "pills") return pillSel.length > 0;
    if (s.type === "cards") return !!cardSel;
    if (s.type === "review") return true;
    return false;
  };

  const goNext = () => {
    if (s.type === "review") {
      if (!user?.email && !email) {
        const emailInput = prompt('Please enter your email to receive your report:');
        if (!emailInput) return;
        setEmail(emailInput);
      }
      setBuilding(true);
      setBuildStep(0);
      return;
    }
    const val = s.type === "text" ? text.trim() : s.type === "pills" ? [...pillSel] : cardSel;
    const newAnswers = { ...answers, [s.id]: val };
    setAnswers(newAnswers);
    setAnswer(s.id, val); // Update BuildContext
    setText("");
    setPillSel([]);
    setCardSel(null);
    const nextStage = Math.min(stage + 1, STAGES.length - 1);
    setStage(nextStage);
    setContextStage(nextStage);
  };

  const goBack = () => {
    if (stage === 0) return;
    const prev = STAGES[stage - 1];
    const prevAns = answers[prev.id];
    if (prev.type === "text") setText(prevAns || "");
    if (prev.type === "pills") setPillSel(prevAns || []);
    if (prev.type === "cards") setCardSel(prevAns || null);
    setStage((v) => v - 1);
    setContextStage(stage - 1);
  };

  const jumpTo = (idx) => {
    if (idx < stage) {
      const st = STAGES[idx];
      const a = answers[st.id];
      if (st.type === "text") setText(a || "");
      if (st.type === "pills") setPillSel(a || []);
      if (st.type === "cards") setCardSel(a || null);
      setStage(idx);
      setContextStage(idx);
    }
  };

  const togglePill = (opt) => {
    setPillSel((prev) =>
      prev.includes(opt) ? prev.filter((p) => p !== opt) :
      prev.length < (s.maxSelect || 3) ? [...prev, opt] : prev
    );
  };

  const handleFinalSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const submissionEmail = user?.email || email || prompt('Please enter your email to receive your report:');
      if (!submissionEmail) {
        alert('Email is required');
        setIsSubmitting(false);
        setBuilding(false);
        return;
      }

      const wizardData = {
        businessName: answers.identity || "",
        businessDescription: answers.purpose || "",
        audience: answers.audience || "",
        tone: Array.isArray(answers.tone) ? answers.tone : answers.tone ? [answers.tone] : [],
        desiredPages: Array.isArray(answers.pages) ? answers.pages : answers.pages ? [answers.pages] : [],
        colorDirections: answers.visuals ? [answers.visuals] : [],
        formsNeeded: Array.isArray(answers.features) ? answers.features : answers.features ? [answers.features] : [],
      };

      const submission = await createSubmission({
        source: 'user',
        wizardType: 'quick',
        email: submissionEmail,
        wizardData: wizardData
      });

      await generateReport(submission.id);
      navigate(`/wizard/success?submission=${submission.id}`);
    } catch (error) {
      console.error('Error submitting wizard:', error);
      setIsSubmitting(false);
      setBuilding(false);
      alert('Something went wrong. Please try again.');
    }
  };

  const getIcon = (name) => { const Comp = I[name]; return Comp ? <Comp /> : null; };

  return (
    <div>
      <style>{css}</style>
      <div className="wz">
        {/* ════ LEFT RAIL ════ */}
        <div className="wz-left">
          <div className="wz-left-hd">
            <div className="wz-logo">bye<span>NU</span></div>
            <div className="wz-pct">{progress}%</div>
          </div>
          <div className="wz-left-scroll">
            {STAGES.filter((st) => st.id !== "review").map((st, i) => {
              const ans = answers[st.id];
              const isCur = i === stage;
              return (
                <div
                  key={st.id}
                  className={`rc ${ans ? "filled" : isCur ? "current" : "empty"}`}
                  onClick={() => jumpTo(i)}
                >
                  {ans && <button className="rc-edit" title="Edit"><I.Edit /></button>}
                  <div className="rc-top">
                    <div className="rc-dot" style={{ background: ans ? C.success : isCur ? st.color : C.grayPale }} />
                    <span className="rc-num">{st.num}</span>
                    <span className="rc-label">{st.label}</span>
                  </div>
                  {ans ? (
                    Array.isArray(ans) ? (
                      <div className="rc-pills">{ans.map((v) => <span key={v} className="rc-pill">{v}</span>)}</div>
                    ) : (
                      <div className="rc-val">{STYLE_LABELS[ans] || ans}</div>
                    )
                  ) : isCur ? (
                    <div className="rc-val" style={{ color: st.color, fontStyle: "italic", fontSize: 11 }}>answering...</div>
                  ) : null}
                </div>
              );
            })}
          </div>
          <div className="wz-left-ft">
            <div className="wz-prog-wrap"><div className="wz-prog-fill" style={{ width: `${progress}%` }} /></div>
            <div className="wz-left-ft-txt">{Object.keys(answers).length} of {STAGES.length - 1} complete</div>
          </div>
        </div>

        {/* ════ CENTER ════ */}
        <div className="wz-center">
          <div className="wz-top-bar"><div className="wz-top-fill" style={{ width: `${progress}%` }} /></div>

          <div className="wz-hd">
            <div className="wz-hd-left">
              <div className="wz-stage-tag">
                <span className="wz-stage-num">{s.num}</span>
                <span className="wz-stage-name" style={{ color: s.color }}>{s.label}</span>
              </div>
              <div className="wz-pips">
                {STAGES.map((st, i) => (
                  <div
                    key={st.id}
                    className={`wz-pip ${i < stage ? "done" : i === stage ? "cur" : "up"}`}
                    onClick={() => jumpTo(i)}
                    title={st.label}
                  />
                ))}
              </div>
            </div>
            <div className="wz-hd-right">
              <div className="mode-switch">
                <button 
                  className={`mode-btn ${mode === 'wizard' ? 'active' : ''}`}
                  onClick={() => setMode('wizard')}
                >
                  Wizard
                </button>
                <button 
                  className={`mode-btn ${mode === 'chat' ? 'active' : ''}`}
                  onClick={() => setMode('chat')}
                >
                  <I.Chat /> Chat
                </button>
                <button 
                  className={`mode-btn ${mode === 'form' ? 'active' : ''}`}
                  onClick={() => setMode('form')}
                >
                  Form
                </button>
              </div>
              <button className="wz-hd-btn"><I.Eye /> Preview</button>
            </div>
          </div>

          <div className="wz-main">
            <div className="wz-card" key={stage}>
              <div className="wz-q-num">
                <div className="wz-q-num-dot" style={{ background: s.color }} />
                Step {s.num} of {String(STAGES.length).padStart(2, "0")}
              </div>
              <h1 className="wz-q">{s.question}</h1>
              <p className="wz-q-sub">{s.subtitle}</p>

              {/* TEXT INPUT */}
              {s.type === "text" && (
                <div>
                  <div className="wz-input-wrap">
                    <input
                      ref={inputRef}
                      className="wz-input"
                      placeholder={s.placeholder}
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter" && text.trim()) goNext(); }}
                    />
                    <span className="wz-input-hint">↵ enter</span>
                    <button 
                      className="wz-input-continue" 
                      disabled={!text.trim()} 
                      onClick={goNext}
                      aria-label="Continue"
                    >
                      <I.ArrowR />
                    </button>
                  </div>
                  {s.suggestions && (
                    <div className="wz-sugg">
                      {s.suggestions.map((sg) => (
                        <button key={sg} className="wz-sugg-chip" onClick={() => { setText(sg); }}>
                          <I.Sparkle /> {sg}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* PILLS */}
              {s.type === "pills" && (
                <div>
                  <div className="wz-pills">
                    {s.options.map((opt) => (
                      <button key={opt} className={`wz-pill ${pillSel.includes(opt) ? "sel" : ""}`} onClick={() => togglePill(opt)}>
                        {opt}
                      </button>
                    ))}
                  </div>
                  <div className="wz-pill-footer">
                    <div className="wz-pill-count">{pillSel.length}{s.maxSelect < 12 ? ` / ${s.maxSelect}` : ""} selected</div>
                    <button className="wz-next" disabled={pillSel.length === 0} onClick={goNext}>
                      Continue <I.ArrowR />
                    </button>
                  </div>
                </div>
              )}

              {/* VISUAL CARDS */}
              {s.type === "cards" && (
                <div>
                  <div className="wz-vcards">
                    {s.options.map((opt) => (
                      <div key={opt.id} className={`wz-vcard ${cardSel === opt.id ? "sel" : ""}`} onClick={() => setCardSel(opt.id)}>
                        <div className="wz-vcard-swatches">
                          {opt.colors.map((c, i) => <div key={i} className="wz-vcard-swatch" style={{ background: c }} />)}
                        </div>
                        <div className="wz-vcard-check"><I.Check s={12} /></div>
                        <h4>{opt.label}</h4>
                        <p>{opt.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div className="wz-cards-footer">
                    <button className="wz-next" disabled={!cardSel} onClick={goNext}>
                      Continue <I.ArrowR />
                    </button>
                  </div>
                </div>
              )}

              {/* REVIEW */}
              {s.type === "review" && (
                <div className="wz-review">
                  {STAGES.filter((st) => st.id !== "review").map((st) => {
                    const a = answers[st.id];
                    if (!a) return null;
                    return (
                      <div key={st.id} className="wz-review-row" onClick={() => jumpTo(STAGES.indexOf(st))}>
                        <span className="wz-review-label">
                          <span className="wz-review-label-dot" style={{ background: st.color }} />
                          {st.label}
                        </span>
                        <span className="wz-review-val">
                          {Array.isArray(a) ? (
                            <span className="wz-review-pills">{a.map((v) => <span key={v} className="wz-review-pill">{v}</span>)}</span>
                          ) : STYLE_LABELS[a] || a}
                        </span>
                        <span className="wz-review-edit"><I.Edit /></span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="wz-footer">
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              {stage > 0 ? (
                <button className="wz-back" onClick={goBack}><I.ArrowL /> Back</button>
              ) : <div />}
              {s.type !== "text" && s.type !== "pills" && s.type !== "cards" && (
                <button className="wz-skip">Skip — let NU decide</button>
              )}
            </div>
            {/* Only show footer button for review stage */}
            {s.type === "review" && (
              <button className="wz-next" disabled={!canGo()} onClick={goNext}>
                <I.Zap /> Build My Site
              </button>
            )}
            {s.type !== "text" && s.type !== "pills" && s.type !== "cards" && s.type !== "review" && (
              <button className="wz-next" disabled={!canGo()} onClick={goNext}>
                Continue <I.ArrowR />
              </button>
            )}
          </div>
        </div>

        {/* ════ RIGHT DOCS ════ */}
        <div className="wz-right">
          <div className="wz-right-hd">
            <span className="wz-right-hd-icon"><I.Book /></span>
            <span className="wz-right-hd-title">Guide</span>
          </div>
          <div className="wz-right-scroll">
            <div className="doc-s" key={stage}>
              <h3 className="doc-t">{s.docTitle}</h3>
              <p className="doc-p">{s.docBody}</p>
              {s.docTips && (
                <div className="doc-tips">
                  {s.docTips.map((tip, i) => (
                    <div key={i} className="doc-tip">
                      <span className="doc-tip-ic"><I.Bulb /></span>
                      {tip}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="doc-div" />
            <div className="kb-box">
              <div style={{ fontSize: 10, fontWeight: 600, marginBottom: 6 }}>Shortcuts</div>
              <div className="kb-row"><span>Next step</span><span className="kb-key">Enter</span></div>
              <div className="kb-row"><span>Go back</span><span className="kb-key">Esc</span></div>
              <div className="kb-row"><span>Skip step</span><span className="kb-key">Tab</span></div>
            </div>
          </div>
          <div className="wz-right-ft">
            <button className="wz-right-btn" onClick={() => setMode('chat')}><I.Chat /> Switch to Chat</button>
            <button className="wz-right-btn" onClick={() => setMode('form')} style={{ marginTop: '8px' }}>Switch to Form</button>
          </div>
        </div>
      </div>

      {/* ════ BUILD ════ */}
      {building && (
        <div className="bld-ov">
          <div className="bld-card">
            <div className="bld-ring" />
            <div className="bld-t">NU is building your site</div>
            <div className="bld-sub">Average build time: 47 seconds.</div>
            <div className="bld-steps">
              {["Analyzing brand identity", "Generating page content", "Designing visual layout", "Building components", "Deploying live"].map((step, i) => (
                <div key={i} className={`bld-step ${i < buildStep ? "done" : i === buildStep ? "active" : ""}`}>
                  <div className="bld-dot" />
                  {i < buildStep && <I.Check />} {step}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
