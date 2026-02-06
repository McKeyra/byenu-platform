import React from 'react';
import { Info, Lightbulb, AlertTriangle, AlertCircle } from 'lucide-react';
import { C } from '../../theme/constants.js';

const types = {
  info: {
    icon: Info,
    bg: `rgba(26,122,109,0.08)`,
    border: C.mint,
    text: C.charcoal,
    iconColor: C.mint,
  },
  tip: {
    icon: Lightbulb,
    bg: `rgba(34,197,94,0.08)`,
    border: C.success,
    text: C.charcoal,
    iconColor: C.success,
  },
  warning: {
    icon: AlertTriangle,
    bg: `rgba(212,168,67,0.12)`,
    border: C.gold,
    text: C.charcoal,
    iconColor: C.gold,
  },
  danger: {
    icon: AlertCircle,
    bg: `rgba(239,68,68,0.08)`,
    border: C.error,
    text: C.charcoal,
    iconColor: C.error,
  },
};

export default function Callout({ type = 'info', children }) {
  const config = types[type];
  const Icon = config.icon;

  return (
    <div style={{
      background: config.bg,
      borderLeft: `4px solid ${config.border}`,
      borderRadius: '0 12px 12px 0',
      padding: '20px',
      margin: '24px 0',
      display: 'flex',
      gap: '16px',
    }}>
      <Icon size={20} style={{ color: config.iconColor, flexShrink: 0, marginTop: '2px' }} />
      <div style={{ color: config.text, fontSize: '14px', lineHeight: '1.6' }}>
        {children}
      </div>
    </div>
  );
}
