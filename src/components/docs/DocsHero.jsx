import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { C } from '../../theme/constants.js';

export default function DocsHero() {
  const [search, setSearch] = useState('');

  return (
    <section style={{
      background: `linear-gradient(135deg, ${C.mintGlow} 0%, ${C.white} 100%)`,
      padding: '60px 24px',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 'clamp(36px, 5vw, 56px)',
          fontWeight: 600,
          color: C.charcoal,
          marginBottom: '16px',
        }}>
          byeNU Documentation
        </h1>
        
        <p style={{
          fontSize: '18px',
          color: C.gray,
          marginBottom: '32px',
        }}>
          Everything you need to build and manage your website
        </p>

        <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
          <Search
            size={20}
            style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: C.grayLight,
            }}
          />
          <input
            type="text"
            placeholder="Search documentation..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              height: '56px',
              paddingLeft: '48px',
              paddingRight: '16px',
              fontSize: '16px',
              borderRadius: '16px',
              border: `2px solid ${C.border}`,
              outline: 'none',
              fontFamily: 'inherit',
              transition: 'all 0.2s',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = C.mint;
              e.currentTarget.style.boxShadow = `0 0 0 3px ${C.mintGlow}`;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = C.border;
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
        </div>
      </div>
    </section>
  );
}
