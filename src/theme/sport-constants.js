// ─── 22C-SPORT PALETTE (Ball in the 6 / ENUW Key Master) ───
export const S = {
  // Primary Colors
  primary: "#0066FF",
  primaryDark: "#0052CC",
  
  // Base Colors
  base: "#0a0a0a",
  surface: "#111118",
  elevated: "#1a1a24",
  raised: "#222230",
  
  // Accent Colors
  accentLime: "#CCFF00",
  accentOrange: "#FF6B00",
  accentRed: "#FF0040",
  accentGold: "#FFD700",
  accentPurple: "#C77DFF",
  
  // Venture Colors
  vance: "#C77DFF",      // Purple
  b6: "#FF6B00",         // Orange (Ball in the 6)
  wearUs: "#00CC88",     // Green
  enuwWeb: "#0066FF",    // Blue
  theKey: "#FFD700",     // Gold (THE KEY AI)
  
  // Text Colors
  text: "#FFFFFF",
  textSecondary: "#8A8A9A",
  textMuted: "#555566",
  
  // Borders
  border: "#2A2A3A",
  borderLight: "#333345",
  
  // Shadows
  shadowCard: "0 4px 24px rgba(0,0,0,0.3)",
  shadowElevated: "0 8px 32px rgba(0,0,0,0.4)",
  glowPrimary: "0 0 20px rgba(0,102,255,0.2)",
  glowLime: "0 0 20px rgba(204,255,0,0.15)",
}

export const sportGlobalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }
  
  body.sport-theme { 
    font-family: 'Inter', sans-serif; 
    background: ${S.base}; 
    color: ${S.text}; 
  }

  /* Typography */
  .sport-display {
    font-family: 'Inter', sans-serif;
    font-weight: 800;
    letter-spacing: -1.5px;
    text-transform: uppercase;
  }
  
  .sport-heading {
    font-family: 'Inter', sans-serif;
    font-weight: 600;
  }
  
  .sport-body {
    font-family: 'Inter', sans-serif;
    font-weight: 400;
  }
  
  .sport-mono {
    font-family: 'JetBrains Mono', monospace;
    font-weight: 500;
  }
  
  /* Cards */
  .sport-card {
    background: ${S.surface};
    border: 1px solid ${S.border};
    border-radius: 16px;
    padding: 24px;
    box-shadow: ${S.shadowCard};
    transition: all 0.15s ease;
  }
  
  .sport-card:hover {
    border-color: ${S.borderLight};
    box-shadow: ${S.shadowElevated};
  }
  
  .sport-card-elevated {
    background: ${S.elevated};
    border: 1px solid ${S.border};
    border-radius: 20px;
    padding: 32px;
    box-shadow: ${S.shadowElevated};
  }
  
  /* Buttons */
  .sport-btn-primary {
    background: ${S.primary};
    color: ${S.text};
    padding: 12px 24px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 14px;
    border: none;
    cursor: pointer;
    transition: all 0.15s ease;
  }
  
  .sport-btn-primary:hover {
    background: ${S.primaryDark};
    box-shadow: ${S.glowPrimary};
  }
  
  /* Borders */
  .sport-border {
    border: 1px solid ${S.border};
  }
  
  .sport-border-active {
    border: 1px solid ${S.primary};
  }
`
