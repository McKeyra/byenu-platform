/**
 * 22C-CORP Design System
 * byeNU / enuwWEB Design Language
 */

export const colors = {
  mint: "#1A7A6D",           // Primary — buttons, links, key accents
  mintLight: "#2EC4B6",      // Secondary mint — gradients, hover states
  mintGlow: "rgba(26,122,109,0.08)",  // Backgrounds, glows
  mintBorder: "rgba(26,122,109,0.20)", // Active borders
  gold: "#D4A843",           // Secondary — accents, highlights, badges
  goldLight: "#F5E6C4",      // Light gold backgrounds
  goldGlow: "rgba(212,168,67,0.10)",
  coral: "#E8756D",          // Tertiary — select accents, warnings
  coralGlow: "rgba(232,117,109,0.10)",
  cream: "#FAFAF5",          // Page backgrounds — NOT pure white
  white: "#FFFFFF",          // Card backgrounds
  charcoal: "#1A1A2E",       // Primary text — NOT black
  gray: "#6B7280",           // Secondary text
  grayLight: "#9CA3AF",      // Tertiary text, placeholders
  grayPale: "#D1D5DB",       // Disabled, empty states
  border: "#E8E8E0",         // Default borders
  success: "#22C55E",        // Completion, validation
  successGlow: "rgba(34,197,94,0.10)",
  bg: "#F6F6F1",             // App background — warm, intentional
}

export const typography = {
  heading: {
    fontFamily: '"Fraunces", serif',
    weights: [400, 500, 600, 700],
    tracking: {
      tight: "-0.8px",
      tighter: "-1.5px",
    },
  },
  body: {
    fontFamily: '"DM Sans", sans-serif',
    weights: [300, 400, 500, 600, 700],
  },
  mono: {
    fontFamily: '"JetBrains Mono", monospace',
    weights: [400, 500],
  },
}

export const spacing = {
  section: {
    vertical: "72px-96px",
    verticalSmall: "48px-64px",
  },
  card: {
    padding: "24px-32px",
    paddingSmall: "18px-24px",
  },
  container: {
    maxWidth: "1200px",
    padding: "0 32px",
    paddingMobile: "0 20px",
  },
  grid: {
    gap: "16px-20px",
    gapSmall: "12px-16px",
  },
  touch: {
    min: "44px",
  },
}

export const borderRadius = {
  button: "10px-12px",
  card: "14px-18px",
  pill: "20px-24px",
  input: "12px-14px",
  avatar: "10px-12px",
}

export const shadows = {
  cardDefault: "0 1px 3px rgba(0,0,0,0.03)",
  cardHover: "0 8px 24px rgba(0,0,0,0.04)",
  elevated: "0 12px 32px rgba(0,0,0,0.06)",
  modal: "0 40px 80px rgba(26,26,46,0.2)",
}

export const transitions = {
  default: "all 0.2s ease",
  card: "all 0.25s ease",
  spring: "0.45s cubic-bezier(0.16,1,0.3,1)",
  progressBar: "width 0.6s cubic-bezier(0.16,1,0.3,1)",
}

export const animations = {
  cardEntry: {
    from: "translateY(16px) scale(0.98)",
    to: "translateY(0) scale(1)",
    easing: "cubic-bezier(0.16,1,0.3,1)",
    duration: "0.45s",
  },
  fadeIn: {
    from: "opacity: 0",
    to: "opacity: 1",
    duration: "0.3s",
  },
  gradientBar: {
    type: "background-position shift",
    duration: "10s",
    iteration: "infinite",
  },
  typingDots: {
    type: "scale + opacity pulse",
    duration: "1.4s",
    iteration: "infinite",
  },
  liveDot: {
    type: "box-shadow pulse",
    duration: "2s",
    iteration: "infinite",
  },
}

// Component patterns
export const componentPatterns = {
  button: {
    default: {
      background: colors.mint,
      color: colors.white,
      borderRadius: borderRadius.button,
    },
    hover: {
      background: colors.gold,
      color: colors.charcoal,
      transform: "translateY(-1px)",
    },
  },
  card: {
    default: {
      background: colors.white,
      border: `1px solid ${colors.border}`,
      borderRadius: borderRadius.card,
    },
    hover: {
      transform: "translateY(-2px)",
      boxShadow: shadows.cardHover,
    },
  },
  pill: {
    default: {
      border: `1px solid ${colors.border}`,
      background: colors.white,
      borderRadius: borderRadius.pill,
    },
    selected: {
      background: colors.mint,
      color: colors.white,
    },
  },
  input: {
    default: {
      background: colors.cream,
      border: `1px solid ${colors.border}`,
      borderRadius: borderRadius.input,
    },
    focus: {
      borderColor: colors.mint,
      background: colors.white,
      boxShadow: `0 0 0 4px ${colors.mintGlow}`,
    },
  },
}

// Google Fonts import string
export const googleFontsUrl = "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=JetBrains+Mono:wght@400;500&display=swap"

// Export all as a single object for convenience
export const designSystem = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  transitions,
  animations,
  componentPatterns,
  googleFontsUrl,
}

export default designSystem
