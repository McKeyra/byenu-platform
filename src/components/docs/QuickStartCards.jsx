import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, BookOpen, Wrench } from 'lucide-react';
import { C } from '../../theme/constants.js';

const cards = [
  {
    icon: Rocket,
    title: 'Getting Started',
    description: 'Build your first website in 30 minutes',
    buttonText: 'Start Tutorial',
    href: '/docs/getting-started',
  },
  {
    icon: BookOpen,
    title: 'Feature Guides',
    description: 'Deep dives on abilities, versioning, and more',
    buttonText: 'Browse Guides',
    href: '/docs/features',
  },
  {
    icon: Wrench,
    title: 'API Reference',
    description: 'Technical documentation for developers',
    buttonText: 'View API Docs',
    href: '/docs/api',
  },
];

export default function QuickStartCards() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '24px',
      marginBottom: '60px',
    }}>
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Link
            key={card.title}
            to={card.href}
            style={{
              background: C.white,
              border: `1px solid ${C.border}`,
              borderRadius: '20px',
              padding: '32px',
              textDecoration: 'none',
              transition: 'all 0.3s',
              display: 'block',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = C.mint;
              e.currentTarget.style.boxShadow = `0 8px 24px ${C.mintGlow}`;
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = C.border;
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{
              width: '48px',
              height: '48px',
              background: C.mintGlow,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
            }}>
              <Icon size={24} style={{ color: C.mint }} />
            </div>
            
            <h3 style={{
              fontSize: '20px',
              fontWeight: 600,
              color: C.charcoal,
              marginBottom: '8px',
            }}>
              {card.title}
            </h3>
            
            <p style={{
              color: C.gray,
              marginBottom: '20px',
              lineHeight: '1.6',
            }}>
              {card.description}
            </p>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: C.mint,
              fontWeight: 600,
              fontSize: '14px',
            }}>
              {card.buttonText} →
            </div>
          </Link>
        );
      })}
    </div>
  );
}
