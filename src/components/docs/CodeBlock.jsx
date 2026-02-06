import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { C } from '../../theme/constants.js';

export default function CodeBlock({ code, language = 'javascript' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ position: 'relative', margin: '24px 0' }}>
      <div style={{
        position: 'absolute',
        top: '12px',
        right: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        <span style={{
          fontSize: '11px',
          color: C.grayLight,
          textTransform: 'uppercase',
          fontWeight: 600,
        }}>
          {language}
        </span>
        <button
          onClick={handleCopy}
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            borderRadius: '6px',
            padding: '6px',
            cursor: 'pointer',
            color: C.grayLight,
            display: 'flex',
            alignItems: 'center',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
            e.currentTarget.style.color = C.white;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.color = C.grayLight;
          }}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>
      
      <pre style={{
        background: C.charcoal,
        color: C.white,
        borderRadius: '12px',
        padding: '24px',
        overflowX: 'auto',
        fontSize: '14px',
        lineHeight: '1.6',
        fontFamily: "'JetBrains Mono', 'Monaco', 'Courier New', monospace",
      }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
