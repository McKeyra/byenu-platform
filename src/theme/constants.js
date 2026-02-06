// ─── 22C-CORP PALETTE ───
export const C = {
  mint: "#1A7A6D",
  mintLight: "#2EC4B6",
  mintGlow: "rgba(26,122,109,0.12)",
  mintBorder: "rgba(26,122,109,0.25)",
  gold: "#D4A843",
  goldLight: "#F5E6C4",
  goldGlow: "rgba(212,168,67,0.10)",
  coral: "#E8756D",
  coralLight: "rgba(232,117,109,0.12)",
  coralGlow: "rgba(232,117,109,0.10)",
  tealLight: "rgba(46,196,182,0.12)",
  cream: "#FAFAF5",
  white: "#FFFFFF",
  charcoal: "#1A1A2E",
  gray: "#6B7280",
  grayLight: "#9CA3AF",
  grayPale: "#D1D5DB",
  border: "#E8E8E0",
  success: "#22C55E",
  successGlow: "rgba(34,197,94,0.10)",
  error: "#EF4444",
  errorGlow: "rgba(239,68,68,0.08)",
  bg: "#F6F6F1",
  dark: "#12121F",
  borderDark: "#2A2A3E",
}

export const globalStyles = `
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

  body { 
    font-family: 'DM Sans', sans-serif; 
    background: ${C.cream}; 
    color: ${C.charcoal}; 
  }

  .enuw-container { max-width: 1280px; margin: 0 auto; padding: 0 24px; }

  /* ─── GRADIENT BAR ─── */
  .top-bar {
    height: 4px;
    background: linear-gradient(90deg, ${C.mint}, ${C.mintLight}, ${C.gold}, ${C.mintLight}, ${C.mint});
    background-size: 300% 100%;
    animation: barShift 12s ease infinite;
  }
  @keyframes barShift { 
    0%{background-position:0% 50%} 
    50%{background-position:100% 50%} 
    100%{background-position:0% 50%} 
  }

  /* ─── NAV ─── */
  .nav {
    display: flex; 
    align-items: center; 
    justify-content: space-between;
    padding: 20px 0;
  }
  .nav-logo {
    font-family: 'Fraunces', serif; 
    font-weight: 700; 
    font-size: 22px;
    color: ${C.charcoal}; 
    letter-spacing: -0.5px;
    text-decoration: none;
  }
  .nav-logo span { color: ${C.mint}; }
  .nav-links { display: flex; gap: 32px; align-items: center; }
  .nav-links a {
    font-size: 14px; 
    color: ${C.gray}; 
    text-decoration: none;
    font-weight: 500; 
    transition: color 0.2s;
  }
  .nav-links a:hover { color: ${C.charcoal}; }
  .nav-cta {
    background: ${C.mint}; 
    color: white !important; 
    padding: 10px 24px;
    border-radius: 10px; 
    font-weight: 600 !important; 
    font-size: 14px !important;
    transition: all 0.3s ease !important; 
    border: none; 
    cursor: pointer;
    font-family: inherit;
  }
  .nav-cta:hover { 
    background: ${C.gold} !important; 
    color: ${C.charcoal} !important; 
    transform: translateY(-1px); 
  }

  /* ─── BUTTONS ─── */
  .btn-primary {
    display: inline-flex; 
    align-items: center; 
    gap: 8px;
    background: ${C.mint}; 
    color: white; 
    padding: 14px 32px;
    border-radius: 12px; 
    font-weight: 600; 
    font-size: 15px;
    text-decoration: none; 
    transition: all 0.3s ease;
    border: none; 
    cursor: pointer; 
    font-family: inherit;
  }
  .btn-primary:hover { 
    background: ${C.gold}; 
    color: ${C.charcoal}; 
    transform: translateY(-2px); 
    box-shadow: 0 8px 24px rgba(26,122,109,0.15); 
  }

  .btn-secondary {
    display: inline-flex; 
    align-items: center; 
    gap: 8px;
    background: white; 
    color: ${C.charcoal}; 
    padding: 14px 32px;
    border-radius: 12px; 
    font-weight: 600; 
    font-size: 15px;
    text-decoration: none; 
    transition: all 0.3s ease;
    border: 2px solid ${C.border}; 
    cursor: pointer; 
    font-family: inherit;
  }
  .btn-secondary:hover { 
    background: ${C.cream}; 
    border-color: ${C.mint}; 
    transform: translateY(-2px); 
  }

  /* ─── CARDS ─── */
  .card {
    background: white; 
    border: 1px solid ${C.border}; 
    border-radius: 18px;
    padding: 28px; 
    transition: all 0.3s ease; 
  }
  .card:hover { 
    transform: translateY(-3px); 
    box-shadow: 0 12px 32px rgba(0,0,0,0.06); 
  }

  /* ─── INPUTS ─── */
  .input {
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
  .input:focus { 
    border-color: ${C.mint}; 
    background: white; 
  }
  .input::placeholder { color: ${C.grayLight}; }

  /* ─── RESPONSIVE ─── */
  @media (max-width: 1024px) {
    .nav-links { display: none; }
  }
  @media (max-width: 640px) {
    .enuw-container { padding: 0 16px; }
  }
`
