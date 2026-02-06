import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useBuild } from "../../context/BuildContext.jsx";
import { createSubmission } from "../../api/submissions.js";
import { generateReport } from "../../api/reports.js";
import { useAuth } from "../../lib/auth/AuthContext.jsx";

// ─── 22C PALETTE ───
const C = {
  mint: "#1A7A6D",
  mintLight: "#2EC4B6",
  mintGlow: "rgba(26,122,109,0.08)",
  mintBorder: "rgba(26,122,109,0.20)",
  gold: "#D4A843",
  goldLight: "#F5E6C4",
  goldGlow: "rgba(212,168,67,0.08)",
  coral: "#E8756D",
  coralGlow: "rgba(232,117,109,0.08)",
  cream: "#FAFAF5",
  white: "#FFFFFF",
  charcoal: "#1A1A2E",
  dark: "#12121F",
  gray: "#6B7280",
  grayLight: "#9CA3AF",
  grayPale: "#D1D5DB",
  border: "#E8E8E0",
  borderDark: "#2A2A3E",
  success: "#22C55E",
  bg: "#F6F6F1",
};

// ─── ICONS ───
const Ic = {
  Send: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2L15 22L11 13L2 9L22 2Z"/></svg>,
  Check: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Edit: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  Sparkle: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3L13.5 8.5L19 10L13.5 11.5L12 17L10.5 11.5L5 10L10.5 8.5L12 3Z"/><path d="M19 15L19.7 17.3L22 18L19.7 18.7L19 21L18.3 18.7L16 18L18.3 17.3L19 15Z"/></svg>,
  Book: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  Lightbulb: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>,
  ArrowRight: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  Zap: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Globe: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  Palette: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="10.5" r="2.5"/><circle cx="8.5" cy="7.5" r="2.5"/><circle cx="6.5" cy="12.5" r="2.5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>,
  Layout: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>,
  Users: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  ChevronDown: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
  X: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Eye: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  Undo: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>,
};

// ─── CONVERSATION STAGES ───
const STAGES = [
  { id: "identity", icon: "Globe", label: "Identity", color: C.mint },
  { id: "purpose", icon: "Lightbulb", label: "Purpose", color: C.gold },
  { id: "audience", icon: "Users", label: "Audience", color: C.coral },
  { id: "tone", icon: "Sparkle", label: "Tone", color: C.mintLight },
  { id: "pages", icon: "Layout", label: "Pages", color: C.mint },
  { id: "visuals", icon: "Palette", label: "Visuals", color: C.gold },
  { id: "features", icon: "Zap", label: "Abilities", color: C.coral },
  { id: "review", icon: "Eye", label: "Review", color: C.success },
];

// ─── SIMULATED CONVERSATION FLOW ───
const CONVERSATION_SCRIPT = [
  {
    stage: "identity",
    ai: "Let's build something. What's the name of your business?",
    suggestions: null,
    type: "text",
    placeholder: "e.g. Sunrise Yoga Studio",
    docTitle: "Why your name matters",
    docContent: "Your business name becomes your site's headline, URL slug, and SEO anchor. Keep it memorable and searchable. NU will generate variations for your domain automatically.",
    docTips: ["Keep under 30 characters for best display", "Avoid special characters for clean URLs", "NU auto-generates logo text from this"],
  },
  {
    stage: "purpose",
    ai: "Got it. Now in one sentence — what do you do and who do you help?",
    suggestions: ["We sell handmade candles online", "We offer consulting for startups", "We teach piano to kids and adults", "We build custom furniture"],
    type: "text",
    placeholder: "e.g. We offer yoga classes for stressed professionals in Austin",
    docTitle: "Your core value proposition",
    docContent: "This sentence shapes your entire site. NU uses it to generate hero copy, meta descriptions, and page content. The best descriptions follow: [What you do] + [for whom] + [where/how].",
    docTips: ["Be specific about your audience", "Include your location if local", "Action verb + benefit works best"],
  },
  {
    stage: "audience",
    ai: "Who's your ideal customer? Describe them in a few words.",
    suggestions: ["Young professionals 25-35", "Small business owners", "Parents with kids under 12", "Health-conscious millennials"],
    type: "text",
    placeholder: "e.g. Busy professionals aged 25-45 who want to de-stress",
    docTitle: "Know your audience",
    docContent: "NU calibrates language, imagery, and layout complexity based on your audience. A site for teens feels different than one for executives. The more specific, the sharper the output.",
    docTips: ["Age range helps NU pick fonts", "Income level affects design tone", "Tech comfort affects layout complexity"],
  },
  {
    stage: "tone",
    ai: "Pick 3 words that capture your brand's personality.",
    suggestions: null,
    type: "pills",
    options: ["Calm", "Energetic", "Professional", "Playful", "Bold", "Minimal", "Warm", "Luxurious", "Natural", "Modern", "Friendly", "Edgy", "Corporate", "Artistic"],
    maxSelect: 3,
    docTitle: "Tone shapes everything",
    docContent: "These 3 words become your design DNA. NU maps them to color temperatures, typography weight, spacing density, and animation intensity. 'Calm + Minimal + Natural' produces a very different site than 'Bold + Edgy + Modern'.",
    docTips: ["Contrasting tones create unique identities", "'Luxurious' triggers premium spacing & fonts", "'Playful' enables micro-animations"],
  },
  {
    stage: "pages",
    ai: "What pages does your site need? Tap all that apply.",
    suggestions: null,
    type: "pills",
    options: ["Home", "About", "Services", "Pricing", "Contact", "Blog", "Portfolio", "Testimonials", "FAQ", "Shop", "Booking", "Team"],
    maxSelect: 12,
    docTitle: "Site architecture",
    docContent: "Each page you select gets AI-generated content tailored to your business. NU builds the navigation hierarchy automatically. Home is always included. Most businesses need 4-6 pages.",
    docTips: ["'Services' + 'Pricing' = high conversion combo", "'Blog' adds SEO value over time", "'Booking' auto-integrates a scheduling system"],
  },
  {
    stage: "visuals",
    ai: "Last creative decision. What visual direction?",
    suggestions: null,
    type: "cards",
    options: [
      { id: "nu-decide", label: "Let NU Decide", desc: "AI picks the perfect palette", colors: [C.mint, C.mintLight, C.gold] },
      { id: "light", label: "Light & Airy", desc: "Soft whites, open space", colors: ["#F8F9FA", "#E9ECEF", "#CED4DA"] },
      { id: "dark", label: "Dark & Bold", desc: "Deep backgrounds, vivid accents", colors: ["#1A1A2E", "#16213E", "#E94560"] },
      { id: "warm", label: "Warm & Earthy", desc: "Terracotta, cream, forest", colors: ["#D4A373", "#CCD5AE", "#FEFAE0"] },
      { id: "ocean", label: "Ocean Blues", desc: "Professional, trustworthy", colors: ["#023E8A", "#0077B6", "#48CAE4"] },
      { id: "sunset", label: "Sunset Warm", desc: "Vibrant, attention-grabbing", colors: ["#FF6B6B", "#FCA311", "#E9C46A"] },
    ],
    docTitle: "Visual identity",
    docContent: "Your color palette communicates before words do. 'Let NU Decide' uses your business type + tone to algorithmically select the optimal palette. You can always change this later.",
    docTips: ["Dark themes convert better for tech/gaming", "Light themes for health/wellness/services", "NU generates 60-30-10 color ratios automatically"],
  },
  {
    stage: "features",
    ai: "What abilities should your site have? These are built in — no plugins needed.",
    suggestions: null,
    type: "pills",
    options: ["Contact Form", "Booking System", "E-commerce", "Analytics", "Blog/CMS", "Newsletter", "Social Feed", "Live Chat", "Video Embed", "Maps", "Reviews", "Members Area"],
    maxSelect: 12,
    docTitle: "Built-in abilities",
    docContent: "Unlike traditional builders that rely on plugins, NU builds these capabilities directly into your site's code. They're faster, more reliable, and styled to match your design automatically.",
    docTips: ["Contact Form is included by default", "E-commerce adds cart + checkout + Stripe", "Analytics tracks visitors from day one"],
  },
  {
    stage: "review",
    ai: "Everything looks great. Here's what NU is about to build. Ready to launch?",
    suggestions: null,
    type: "review",
    docTitle: "Pre-launch checklist",
    docContent: "NU will now generate your complete website: pages, content, styling, and deployed live URL. Average build time is 47 seconds. You can edit anything after launch through conversation.",
    docTips: ["You can change anything after launch", "NU keeps every version — nothing is lost", "Your site goes live on yourname.byenu.site"],
  },
];

const STYLE_PRESETS = [
  { id: "nu-decide", label: "Let NU Decide" },
  { id: "light", label: "Light & Airy" },
  { id: "dark", label: "Dark & Bold" },
  { id: "warm", label: "Warm & Earthy" },
  { id: "ocean", label: "Ocean Blues" },
  { id: "sunset", label: "Sunset Warm" },
];

// ─── CSS ───
const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700&display=swap&family=JetBrains+Mono:wght@400;500&display=swap');
* { margin:0; padding:0; box-sizing:border-box; }

/* ─ SHELL ─ */
.shell { display:flex; height:100vh; background:${C.bg}; font-family:'DM Sans',sans-serif; color:${C.charcoal}; overflow:hidden; }

/* ─ LEFT: RESPONSE CARDS ─ */
.left-rail {
  width: 260px; flex-shrink:0; display:flex; flex-direction:column;
  background:${C.white}; border-right:1px solid ${C.border};
}
.left-header {
  padding:16px 18px; border-bottom:1px solid ${C.border};
  display:flex; align-items:center; justify-content:space-between;
}
.left-logo { font-family:'Fraunces',serif; font-weight:700; font-size:17px; }
.left-logo span { color:${C.mint}; }
.left-badge {
  font-size:10px; font-weight:600; padding:3px 8px; border-radius:8px;
  background:${C.mintGlow}; color:${C.mint};
}

.left-scroll { flex:1; overflow-y:auto; padding:12px; }
.left-scroll::-webkit-scrollbar { width:4px; }
.left-scroll::-webkit-scrollbar-thumb { background:${C.grayPale}; border-radius:2px; }

/* Response Cards */
.r-card {
  background:${C.cream}; border:1px solid ${C.border}; border-radius:12px;
  padding:12px 14px; margin-bottom:8px; cursor:pointer;
  transition: all 0.25s ease; position:relative;
}
.r-card:hover { border-color:${C.mintBorder}; box-shadow:0 2px 8px ${C.mintGlow}; }
.r-card.active { border-color:${C.mint}; background:${C.mintGlow}; }
.r-card-stage {
  display:flex; align-items:center; gap:6px; margin-bottom:6px;
}
.r-card-dot {
  width:6px; height:6px; border-radius:50%;
}
.r-card-label { font-size:10px; font-weight:600; text-transform:uppercase; letter-spacing:0.5px; color:${C.grayLight}; }
.r-card-value {
  font-size:13px; font-weight:500; line-height:1.4; color:${C.charcoal};
  display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;
}
.r-card-pills { display:flex; flex-wrap:wrap; gap:3px; }
.r-card-pill {
  font-size:10px; padding:2px 7px; border-radius:6px;
  background:${C.mint}; color:white; font-weight:500;
}
.r-card-edit {
  position:absolute; top:10px; right:10px; opacity:0;
  background:none; border:none; color:${C.grayLight}; cursor:pointer;
  transition:opacity 0.2s;
}
.r-card:hover .r-card-edit { opacity:1; }

.r-card-empty {
  border:1px dashed ${C.grayPale}; border-radius:12px; padding:12px 14px;
  margin-bottom:8px; display:flex; align-items:center; gap:8px;
}
.r-card-empty-dot { width:6px; height:6px; border-radius:50%; background:${C.grayPale}; }
.r-card-empty-label { font-size:11px; color:${C.grayPale}; }

.left-footer {
  padding:12px 14px; border-top:1px solid ${C.border};
  font-size:11px; color:${C.grayLight}; text-align:center;
}
.left-progress-bar { height:3px; background:${C.border}; border-radius:2px; margin-bottom:6px; }
.left-progress-fill { height:100%; background:linear-gradient(90deg,${C.mint},${C.mintLight}); border-radius:2px; transition:width 0.5s cubic-bezier(0.16,1,0.3,1); }

/* ─ CENTER: CHAT ─ */
.center {
  flex:1; display:flex; flex-direction:column; min-width:0;
  background:${C.bg};
}

.center-header {
  display:flex; align-items:center; justify-content:space-between;
  padding:12px 24px; background:${C.white}; border-bottom:1px solid ${C.border};
}
.stage-nav { display:flex; gap:3px; }
.stage-pip {
  width:28px; height:4px; border-radius:2px; transition:all 0.3s;
  cursor:pointer;
}
.stage-pip.done { background:${C.mint}; }
.stage-pip.current { background:${C.gold}; width:40px; }
.stage-pip.upcoming { background:${C.grayPale}; }
.center-header-actions { display:flex; gap:8px; align-items:center; }
.header-btn {
  padding:6px 12px; border:1px solid ${C.border}; border-radius:8px;
  font-size:12px; font-weight:500; cursor:pointer; font-family:inherit;
  background:${C.white}; color:${C.gray}; display:flex; align-items:center; gap:5px;
  transition:all 0.2s;
}
.header-btn:hover { border-color:${C.mint}; color:${C.mint}; }

/* Mode Switch */
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

/* Messages */
.messages-scroll { flex:1; overflow-y:auto; padding:24px; }
.messages-scroll::-webkit-scrollbar { width:4px; }
.messages-scroll::-webkit-scrollbar-thumb { background:transparent; }
.messages-scroll:hover::-webkit-scrollbar-thumb { background:${C.grayPale}; border-radius:2px; }

.msg-group { margin-bottom:24px; animation:msgIn 0.4s cubic-bezier(0.16,1,0.3,1); }
@keyframes msgIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }

.msg-ai { display:flex; gap:12px; align-items:flex-start; }
.msg-ai-avatar {
  width:32px; height:32px; border-radius:10px; background:${C.charcoal};
  display:flex; align-items:center; justify-content:center; flex-shrink:0;
  color:${C.gold}; margin-top:2px;
}
.msg-ai-bubble {
  background:${C.white}; border:1px solid ${C.border}; border-radius:4px 16px 16px 16px;
  padding:14px 18px; max-width:520px; font-size:15px; line-height:1.55;
  color:${C.charcoal}; box-shadow:0 1px 4px rgba(0,0,0,0.03);
}
.msg-ai-name { font-size:11px; font-weight:600; color:${C.grayLight}; margin-bottom:4px; }

.msg-user-wrap { display:flex; justify-content:flex-end; }
.msg-user {
  background:${C.charcoal}; color:white; border-radius:16px 16px 4px 16px;
  padding:12px 18px; max-width:400px; font-size:14px; line-height:1.5;
}
.msg-user-pills { display:flex; flex-wrap:wrap; gap:5px; justify-content:flex-end; }
.msg-user-pill {
  background:${C.mint}; color:white; padding:5px 12px; border-radius:14px;
  font-size:13px; font-weight:500;
}

/* Suggestions */
.suggestions {
  display:flex; flex-wrap:wrap; gap:6px; margin-top:10px;
}
.suggestion-chip {
  padding:8px 14px; border:1px solid ${C.border}; border-radius:20px;
  font-size:13px; font-weight:500; cursor:pointer; font-family:inherit;
  background:${C.white}; color:${C.charcoal}; transition:all 0.2s;
  display:flex; align-items:center; gap:5px;
}
.suggestion-chip:hover { border-color:${C.mint}; background:${C.mintGlow}; color:${C.mint}; }
.suggestion-chip .chip-icon { color:${C.grayLight}; }

/* Inline Pills Input */
.pills-input { display:flex; flex-wrap:wrap; gap:6px; margin-top:8px; }
.pill-opt {
  padding:8px 16px; border:1.5px solid ${C.border}; border-radius:20px;
  font-size:13px; font-weight:500; cursor:pointer; font-family:inherit;
  background:${C.white}; color:${C.charcoal}; transition:all 0.2s;
  user-select:none;
}
.pill-opt:hover { border-color:${C.mint}; background:${C.mintGlow}; }
.pill-opt.sel { border-color:${C.mint}; background:${C.mint}; color:white; }

/* Style Cards Inline */
.style-cards-inline { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; margin-top:8px; }
.sc-card {
  padding:12px; border:1.5px solid ${C.border}; border-radius:12px;
  cursor:pointer; transition:all 0.2s; background:${C.white}; text-align:center;
}
.sc-card:hover { border-color:${C.mint}; transform:translateY(-1px); }
.sc-card.sel { border-color:${C.mint}; background:${C.mintGlow}; }
.sc-swatches { display:flex; gap:3px; justify-content:center; margin-bottom:6px; }
.sc-swatch { width:16px; height:16px; border-radius:50%; border:2px solid white; box-shadow:0 1px 3px rgba(0,0,0,0.1); }
.sc-label { font-size:11px; font-weight:600; }
.sc-desc { font-size:9px; color:${C.grayLight}; margin-top:1px; }

/* Review Card */
.review-card {
  background:${C.white}; border:1px solid ${C.border}; border-radius:16px;
  padding:20px; margin-top:8px;
}
.review-row {
  display:flex; justify-content:space-between; align-items:flex-start;
  padding:10px 0; border-bottom:1px solid ${C.border};
}
.review-row:last-child { border-bottom:none; }
.review-label { font-size:12px; color:${C.grayLight}; font-weight:500; min-width:80px; }
.review-value { font-size:13px; font-weight:500; text-align:right; flex:1; }
.review-pills { display:flex; flex-wrap:wrap; gap:3px; justify-content:flex-end; }
.review-pill { font-size:10px; padding:2px 8px; border-radius:6px; background:${C.mintGlow}; color:${C.mint}; font-weight:500; }

/* Typing Indicator */
.typing { display:flex; gap:4px; padding:8px 0; }
.typing span {
  width:6px; height:6px; border-radius:50%; background:${C.grayLight};
  animation:typePulse 1.4s infinite;
}
.typing span:nth-child(2) { animation-delay:0.15s; }
.typing span:nth-child(3) { animation-delay:0.3s; }
@keyframes typePulse { 0%,100%{opacity:0.3;transform:scale(0.8)} 50%{opacity:1;transform:scale(1)} }

/* Input Area */
.input-area {
  padding:16px 24px; background:${C.white}; border-top:1px solid ${C.border};
}
.input-context {
  font-size:11px; color:${C.grayLight}; margin-bottom:8px;
  display:flex; align-items:center; gap:5px;
}
.input-row { display:flex; gap:8px; align-items:flex-end; }
.input-field {
  flex:1; padding:12px 16px; border:1.5px solid ${C.border}; border-radius:12px;
  font-size:14px; font-family:inherit; color:${C.charcoal}; background:${C.cream};
  outline:none; transition:all 0.2s; resize:none; min-height:44px; max-height:120px;
  line-height:1.5;
}
.input-field:focus { border-color:${C.mint}; background:${C.white}; box-shadow:0 0 0 3px ${C.mintGlow}; }
.input-field::placeholder { color:${C.grayPale}; }
.send-btn {
  width:44px; height:44px; border-radius:12px; border:none;
  background:${C.mint}; color:white; cursor:pointer;
  display:flex; align-items:center; justify-content:center;
  transition:all 0.2s; flex-shrink:0;
}
.send-btn:hover:not(:disabled) { background:${C.gold}; color:${C.charcoal}; transform:translateY(-1px); }
.send-btn:disabled { opacity:0.3; cursor:not-allowed; }

/* ─ RIGHT: DOCS ─ */
.right-panel {
  width:280px; flex-shrink:0; display:flex; flex-direction:column;
  background:${C.white}; border-left:1px solid ${C.border};
}
.right-header {
  padding:14px 18px; border-bottom:1px solid ${C.border};
  display:flex; align-items:center; gap:8px;
}
.right-header-icon { color:${C.gold}; display:flex; }
.right-header-title { font-size:13px; font-weight:600; }
.right-scroll { flex:1; overflow-y:auto; padding:18px; }
.right-scroll::-webkit-scrollbar { width:4px; }
.right-scroll::-webkit-scrollbar-thumb { background:${C.grayPale}; border-radius:2px; }

.doc-section { margin-bottom:20px; animation:msgIn 0.3s ease; }
.doc-title { font-family:'Fraunces',serif; font-size:16px; font-weight:600; margin-bottom:8px; }
.doc-text { font-size:13px; line-height:1.6; color:${C.gray}; margin-bottom:12px; }

.doc-tips { display:flex; flex-direction:column; gap:6px; }
.doc-tip {
  display:flex; gap:8px; align-items:flex-start; padding:8px 10px;
  background:${C.cream}; border-radius:8px; font-size:12px; color:${C.charcoal}; line-height:1.4;
}
.doc-tip-icon { color:${C.gold}; flex-shrink:0; margin-top:1px; }

.doc-divider { height:1px; background:${C.border}; margin:16px 0; }

/* Keyboard Shortcut Hints */
.kb-hints {
  padding:12px 14px; background:${C.cream}; border-radius:10px;
  margin-top:12px;
}
.kb-hint {
  display:flex; justify-content:space-between; align-items:center;
  padding:4px 0; font-size:11px; color:${C.grayLight};
}
.kb-key {
  font-family:'JetBrains Mono',monospace; font-size:10px; padding:2px 6px;
  background:${C.white}; border:1px solid ${C.border}; border-radius:4px;
  font-weight:500;
}

.right-footer {
  padding:14px 18px; border-top:1px solid ${C.border};
}
.right-footer-btn {
  width:100%; padding:10px; border:1px solid ${C.border}; border-radius:10px;
  font-size:12px; font-weight:600; cursor:pointer; font-family:inherit;
  background:${C.cream}; color:${C.charcoal}; display:flex;
  align-items:center; justify-content:center; gap:6px; transition:all 0.2s;
}
.right-footer-btn:hover { border-color:${C.mint}; color:${C.mint}; background:${C.mintGlow}; }

/* ─ RESPONSIVE ─ */
@media (max-width:1100px) { .right-panel { display:none; } }
@media (max-width:800px) { .left-rail { display:none; } }
@media (max-width:640px) {
  .style-cards-inline { grid-template-columns:repeat(2,1fr); }
  .messages-scroll { padding:16px; }
  .input-area { padding:12px 16px; }
}

/* ─ BUILD ANIMATION ─ */
.build-overlay {
  position:fixed; inset:0; background:rgba(26,26,46,0.9);
  display:flex; align-items:center; justify-content:center; z-index:100;
  animation:fadeIn 0.3s ease;
}
@keyframes fadeIn { from{opacity:0} to{opacity:1} }
.build-card {
  background:${C.white}; border-radius:24px; padding:48px; text-align:center;
  max-width:420px; animation:scaleIn 0.4s cubic-bezier(0.16,1,0.3,1);
}
@keyframes scaleIn { from{opacity:0;transform:scale(0.95)} to{opacity:1;transform:scale(1)} }
.build-spinner {
  width:48px; height:48px; border:3px solid ${C.border}; border-top-color:${C.mint};
  border-radius:50%; margin:0 auto 20px; animation:spin 0.8s linear infinite;
}
@keyframes spin { to{transform:rotate(360deg)} }
.build-title { font-family:'Fraunces',serif; font-size:22px; font-weight:600; margin-bottom:6px; }
.build-sub { font-size:14px; color:${C.gray}; margin-bottom:24px; }
.build-steps { text-align:left; }
.build-step {
  display:flex; align-items:center; gap:10px; padding:8px 0;
  font-size:13px; color:${C.grayLight}; transition:color 0.3s;
}
.build-step.active { color:${C.charcoal}; font-weight:500; }
.build-step.done { color:${C.success}; }
.build-step-dot { width:8px; height:8px; border-radius:50%; background:${C.grayPale}; flex-shrink:0; transition:all 0.3s; }
.build-step.active .build-step-dot { background:${C.gold}; box-shadow:0 0 0 3px ${C.goldGlow}; }
.build-step.done .build-step-dot { background:${C.success}; }
`;

// ─── MAIN COMPONENT ───
export default function AIWizard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { answers: contextAnswers, setAnswer, setStage: setContextStage, mode, setMode, updateAnswers } = useBuild();
  const [currentStage, setCurrentStage] = useState(0);
  const [messages, setMessages] = useState([]);
  const [answers, setAnswers] = useState(contextAnswers || {});
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [pillSelections, setPillSelections] = useState([]);
  const [cardSelection, setCardSelection] = useState(null);
  const [awaitingInput, setAwaitingInput] = useState(false);
  const [building, setBuilding] = useState(false);
  const [buildStep, setBuildStep] = useState(0);
  const [editingCard, setEditingCard] = useState(null);
  const [email, setEmail] = useState("");
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  // Sync with BuildContext
  useEffect(() => {
    if (Object.keys(contextAnswers).length > 0) {
      setAnswers(contextAnswers);
      // Reconstruct messages from answers if switching from another mode
      if (messages.length === 0 && Object.keys(contextAnswers).length > 0) {
        // Initialize with first message
        setTimeout(() => {
          setMessages([{ type: "ai", text: CONVERSATION_SCRIPT[0].ai, stage: 0 }]);
          setAwaitingInput(true);
        }, 500);
      }
    }
  }, [contextAnswers]);

  // Initialize first message
  useEffect(() => {
    if (messages.length === 0) {
      setTimeout(() => {
        setMessages([{ type: "ai", text: CONVERSATION_SCRIPT[0].ai, stage: 0 }]);
        setAwaitingInput(true);
      }, 500);
    }
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Build animation sequence
  useEffect(() => {
    if (building && buildStep < 5) {
      const timer = setTimeout(() => setBuildStep((s) => s + 1), 1200);
      return () => clearTimeout(timer);
    } else if (building && buildStep >= 5) {
      handleFinalSubmit();
    }
  }, [building, buildStep]);

  const script = CONVERSATION_SCRIPT[currentStage];
  const progress = Math.round(((Object.keys(answers).length) / (STAGES.length - 1)) * 100);

  const advanceToNext = useCallback((userAnswer, displayContent) => {
    // Save answer
    const stageId = STAGES[currentStage].id;
    const newAnswers = { ...answers, [stageId]: userAnswer };
    setAnswers(newAnswers);
    setAnswer(stageId, userAnswer); // Update BuildContext
    setContextStage(currentStage + 1); // Update stage in context

    // Add user message
    setMessages((prev) => [...prev, { type: "user", content: displayContent || userAnswer, stage: currentStage }]);
    setAwaitingInput(false);
    setPillSelections([]);
    setCardSelection(null);
    setInputText("");

    // Simulate AI typing then respond
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const nextStage = currentStage + 1;
      if (nextStage < CONVERSATION_SCRIPT.length) {
        setCurrentStage(nextStage);
        const nextScript = CONVERSATION_SCRIPT[nextStage];
        
        if (nextScript.type === "review") {
          setMessages((prev) => [
            ...prev,
            { type: "ai", text: nextScript.ai, stage: nextStage },
            { type: "review", answers: newAnswers },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            { type: "ai", text: nextScript.ai, stage: nextStage },
          ]);
        }
        setAwaitingInput(true);
      }
    }, 800 + Math.random() * 600);
  }, [currentStage, answers, setAnswer, setContextStage]);

  const handleTextSubmit = () => {
    if (!inputText.trim() || !awaitingInput) return;
    advanceToNext(inputText.trim());
  };

  const handlePillConfirm = () => {
    if (pillSelections.length === 0) return;
    advanceToNext(pillSelections, { type: "pills", values: pillSelections });
  };

  const handleCardConfirm = () => {
    if (!cardSelection) return;
    advanceToNext(cardSelection, { type: "card", value: cardSelection });
  };

  const handleSuggestionClick = (text) => {
    advanceToNext(text);
  };

  const handleLaunch = () => {
    if (!user?.email && !email) {
      const emailInput = prompt('Please enter your email to receive your report:');
      if (!emailInput) return;
      setEmail(emailInput);
    }
    setBuilding(true);
    setBuildStep(0);
  };

  const handleFinalSubmit = async () => {
    try {
      const submissionEmail = user?.email || email || prompt('Please enter your email to receive your report:');
      if (!submissionEmail) {
        alert('Email is required');
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
      setBuilding(false);
      alert('Something went wrong. Please try again.');
    }
  };

  const handleEditCard = (stageId) => {
    // Jump back to that stage
    const stageIndex = STAGES.findIndex((s) => s.id === stageId);
    if (stageIndex >= 0 && stageIndex < currentStage) {
      setEditingCard(stageId);
      setCurrentStage(stageIndex);
      setContextStage(stageIndex);
      setTimeout(() => setEditingCard(null), 2000);
    }
  };

  // Render user message content
  const renderUserContent = (msg) => {
    if (msg.content && typeof msg.content === "object") {
      if (msg.content.type === "pills") {
        return (
          <div className="msg-user-pills">
            {msg.content.values.map((v) => (
              <span key={v} className="msg-user-pill">{v}</span>
            ))}
          </div>
        );
      }
      if (msg.content.type === "card") {
        const opt = CONVERSATION_SCRIPT.find((s) => s.type === "cards")?.options?.find((o) => o.id === msg.content.value);
        return <div className="msg-user" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {opt && (
            <>
              <div style={{ display: "flex", gap: 2 }}>
                {opt.colors.map((c, i) => <span key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: c, border: "1.5px solid white" }} />)}
              </div>
              {opt.label}
            </>
          )}
        </div>;
      }
    }
    return <div className="msg-user">{typeof msg.content === "string" ? msg.content : msg.content}</div>;
  };

  return (
    <div>
      <style>{css}</style>
      <div className="shell">

        {/* ═══════ LEFT RAIL: Response Cards ═══════ */}
        <div className="left-rail">
          <div className="left-header">
            <div className="left-logo">bye<span>NU</span></div>
            <div className="left-badge">{progress}%</div>
          </div>

          <div className="left-scroll">
            {STAGES.map((stage, i) => {
              const answer = answers[stage.id];
              const StageIcon = Ic[stage.icon];
              const isActive = i === currentStage;
              const isEditing = editingCard === stage.id;

              if (stage.id === "review") return null;

              if (answer) {
                return (
                  <div key={stage.id} className={`r-card ${isActive ? "active" : ""} ${isEditing ? "active" : ""}`} onClick={() => handleEditCard(stage.id)}>
                    <button className="r-card-edit" title="Edit"><Ic.Edit /></button>
                    <div className="r-card-stage">
                      <div className="r-card-dot" style={{ background: C.success }} />
                      <span className="r-card-label">{stage.label}</span>
                    </div>
                    {Array.isArray(answer) ? (
                      <div className="r-card-pills">
                        {answer.map((v) => <span key={v} className="r-card-pill">{v}</span>)}
                      </div>
                    ) : typeof answer === "string" && answer.length > 0 ? (
                      <div className="r-card-value">{answer}</div>
                    ) : (
                      <div className="r-card-value" style={{ color: C.grayLight }}>
                        {STYLE_PRESETS.find((s) => s.id === answer)?.label || answer}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <div key={stage.id} className={`r-card-empty ${isActive ? "" : ""}`} style={isActive ? { borderColor: stage.color, borderStyle: "solid" } : {}}>
                  <div className="r-card-empty-dot" style={isActive ? { background: stage.color } : {}} />
                  <span className="r-card-empty-label" style={isActive ? { color: stage.color, fontWeight: 600 } : {}}>
                    {stage.label}{isActive ? " ← current" : ""}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="left-footer">
            <div className="left-progress-bar">
              <div className="left-progress-fill" style={{ width: `${progress}%` }} />
            </div>
            {progress}% of your site blueprint complete
          </div>
        </div>

        {/* ═══════ CENTER: CHAT ═══════ */}
        <div className="center">
          {/* Header */}
          <div className="center-header">
            <div className="stage-nav">
              {STAGES.map((s, i) => (
                <div
                  key={s.id}
                  className={`stage-pip ${i < currentStage ? "done" : i === currentStage ? "current" : "upcoming"}`}
                  title={s.label}
                />
              ))}
            </div>
            <div className="center-header-actions">
              <div className="mode-switch">
                <button 
                  className={`mode-btn ${mode === 'wizard' ? 'active' : ''}`}
                  onClick={() => setMode('wizard')}
                >
                  Wizard
                </button>
                <button 
                  className={`mode-btn ${mode === 'chat' ? 'active' : ''}`}
                >
                  Chat
                </button>
                <button 
                  className={`mode-btn ${mode === 'form' ? 'active' : ''}`}
                  onClick={() => setMode('form')}
                >
                  Form
                </button>
              </div>
              <button className="header-btn"><Ic.Undo /> Undo</button>
              <button className="header-btn"><Ic.Eye /> Preview</button>
            </div>
          </div>

          {/* Messages */}
          <div className="messages-scroll" ref={scrollRef}>
            {messages.map((msg, i) => {
              if (msg.type === "ai") {
                return (
                  <div key={i} className="msg-group">
                    <div className="msg-ai">
                      <div className="msg-ai-avatar"><Ic.Sparkle /></div>
                      <div>
                        <div className="msg-ai-name">NU Assistant</div>
                        <div className="msg-ai-bubble">{msg.text}</div>

                        {/* Suggestions (only on current active message) */}
                        {i === messages.length - 1 && awaitingInput && script?.suggestions && (
                          <div className="suggestions">
                            {script.suggestions.map((s) => (
                              <button key={s} className="suggestion-chip" onClick={() => handleSuggestionClick(s)}>
                                <span className="chip-icon"><Ic.Sparkle /></span> {s}
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Inline Pills */}
                        {i === messages.length - 1 && awaitingInput && script?.type === "pills" && (
                          <div>
                            <div className="pills-input">
                              {script.options.map((opt) => (
                                <button
                                  key={opt}
                                  className={`pill-opt ${pillSelections.includes(opt) ? "sel" : ""}`}
                                  onClick={() => {
                                    if (pillSelections.includes(opt)) {
                                      setPillSelections(pillSelections.filter((p) => p !== opt));
                                    } else if (pillSelections.length < (script.maxSelect || 3)) {
                                      setPillSelections([...pillSelections, opt]);
                                    }
                                  }}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                            {pillSelections.length > 0 && (
                              <div style={{ marginTop: 10 }}>
                                <button className="send-btn" style={{ width: "auto", padding: "8px 20px", borderRadius: 10, fontSize: 13, fontWeight: 600, fontFamily: "inherit", display: "inline-flex", gap: 6 }} onClick={handlePillConfirm}>
                                  Confirm {pillSelections.length} <Ic.ArrowRight />
                                </button>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Style Cards */}
                        {i === messages.length - 1 && awaitingInput && script?.type === "cards" && (
                          <div>
                            <div className="style-cards-inline">
                              {script.options.map((opt) => (
                                <div
                                  key={opt.id}
                                  className={`sc-card ${cardSelection === opt.id ? "sel" : ""}`}
                                  onClick={() => setCardSelection(opt.id)}
                                >
                                  <div className="sc-swatches">
                                    {opt.colors.map((c, ci) => <div key={ci} className="sc-swatch" style={{ background: c }} />)}
                                  </div>
                                  <div className="sc-label">{opt.label}</div>
                                  <div className="sc-desc">{opt.desc}</div>
                                </div>
                              ))}
                            </div>
                            {cardSelection && (
                              <div style={{ marginTop: 10 }}>
                                <button className="send-btn" style={{ width: "auto", padding: "8px 20px", borderRadius: 10, fontSize: 13, fontWeight: 600, fontFamily: "inherit", display: "inline-flex", gap: 6 }} onClick={handleCardConfirm}>
                                  Continue <Ic.ArrowRight />
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }

              if (msg.type === "user") {
                return (
                  <div key={i} className="msg-group">
                    <div className="msg-user-wrap">
                      {renderUserContent(msg)}
                    </div>
                  </div>
                );
              }

              if (msg.type === "review") {
                return (
                  <div key={i} className="msg-group">
                    <div className="msg-ai" style={{ alignItems: "flex-start" }}>
                      <div className="msg-ai-avatar" style={{ background: C.success }}><Ic.Check /></div>
                      <div style={{ flex: 1, maxWidth: 520 }}>
                        <div className="review-card">
                          {Object.entries(msg.answers).map(([key, val]) => {
                            const stage = STAGES.find((s) => s.id === key);
                            return (
                              <div key={key} className="review-row">
                                <span className="review-label">{stage?.label || key}</span>
                                <span className="review-value">
                                  {Array.isArray(val) ? (
                                    <div className="review-pills">
                                      {val.map((v) => <span key={v} className="review-pill">{v}</span>)}
                                    </div>
                                  ) : typeof val === "string" ? val : (
                                    STYLE_PRESETS.find((s) => s.id === val)?.label || JSON.stringify(val)
                                  )}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                        <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
                          <button
                            className="send-btn"
                            style={{ width: "auto", padding: "12px 28px", borderRadius: 12, fontSize: 14, fontWeight: 600, fontFamily: "inherit", display: "inline-flex", gap: 8 }}
                            onClick={handleLaunch}
                          >
                            <Ic.Zap /> Build My Site
                          </button>
                          <button className="header-btn" style={{ padding: "12px 20px" }}>
                            <Ic.Edit /> Edit Answers
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return null;
            })}

            {isTyping && (
              <div className="msg-group">
                <div className="msg-ai">
                  <div className="msg-ai-avatar"><Ic.Sparkle /></div>
                  <div className="msg-ai-bubble">
                    <div className="typing"><span /><span /><span /></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="input-area">
            {script && (
              <div className="input-context">
                {(() => { const StIcon = Ic[STAGES[currentStage]?.icon]; return StIcon ? <StIcon /> : null; })()}
                <span>Stage {currentStage + 1}/{STAGES.length}: <strong>{STAGES[currentStage]?.label}</strong></span>
              </div>
            )}
            <div className="input-row">
              <textarea
                ref={inputRef}
                className="input-field"
                placeholder={script?.placeholder || "Type your response..."}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleTextSubmit();
                  }
                }}
                rows={1}
                disabled={!awaitingInput || script?.type === "review"}
                style={{ opacity: (script?.type === "pills" || script?.type === "cards" || script?.type === "review") ? 0.4 : 1 }}
              />
              <button
                className="send-btn"
                disabled={!inputText.trim() || !awaitingInput || script?.type === "pills" || script?.type === "cards" || script?.type === "review"}
                onClick={handleTextSubmit}
              >
                <Ic.Send />
              </button>
            </div>
          </div>
        </div>

        {/* ═══════ RIGHT: CONTEXTUAL DOCS ═══════ */}
        <div className="right-panel">
          <div className="right-header">
            <div className="right-header-icon"><Ic.Book /></div>
            <div className="right-header-title">Guide</div>
          </div>

          <div className="right-scroll">
            {script && (
              <div className="doc-section" key={currentStage}>
                <h3 className="doc-title">{script.docTitle}</h3>
                <p className="doc-text">{script.docContent}</p>

                {script.docTips && (
                  <div className="doc-tips">
                    {script.docTips.map((tip, i) => (
                      <div key={i} className="doc-tip">
                        <span className="doc-tip-icon"><Ic.Lightbulb /></span>
                        {tip}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="doc-divider" />

            <div className="kb-hints">
              <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 8, color: C.charcoal }}>Keyboard Shortcuts</div>
              <div className="kb-hint"><span>Send message</span><span className="kb-key">Enter</span></div>
              <div className="kb-hint"><span>New line</span><span className="kb-key">Shift+Enter</span></div>
              <div className="kb-hint"><span>Undo last</span><span className="kb-key">⌘Z</span></div>
            </div>
          </div>

          <div className="right-footer">
            <button className="right-footer-btn" onClick={() => setMode('wizard')}>
              Switch to Wizard
            </button>
            <button className="right-footer-btn" onClick={() => setMode('form')} style={{ marginTop: '8px' }}>
              <Ic.Zap /> Switch to Form Mode
            </button>
          </div>
        </div>
      </div>

      {/* ═══════ BUILD OVERLAY ═══════ */}
      {building && (
        <div className="build-overlay">
          <div className="build-card">
            <div className="build-spinner" />
            <div className="build-title">NU is building your site</div>
            <div className="build-sub">This usually takes under 60 seconds.</div>
            <div className="build-steps">
              {[
                "Analyzing your brand identity",
                "Generating page content",
                "Designing visual layout",
                "Building responsive components",
                "Deploying to yoursite.byenu.site",
              ].map((step, i) => (
                <div key={i} className={`build-step ${i < buildStep ? "done" : i === buildStep ? "active" : ""}`}>
                  <div className="build-step-dot" />
                  {i < buildStep && <Ic.Check />} {step}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
