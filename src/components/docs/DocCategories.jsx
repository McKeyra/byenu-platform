import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { C } from '../../theme/constants.js';

const categories = [
  {
    title: 'Getting Started',
    links: [
      { title: 'Welcome to ByeNU', slug: 'welcome' },
      { title: 'The 8-Stage Wizard', slug: '8-stage-wizard' },
      { title: 'Your First Website', slug: 'first-website' },
      { title: 'Publishing & Domains', slug: 'publishing-domains' },
      { title: 'Basic Editing', slug: 'basic-editing' },
    ],
  },
  {
    title: 'Features',
    links: [
      { title: 'NU AI Intelligence', slug: 'nu-ai' },
      { title: 'Element Versioning', slug: 'versioning' },
      { title: 'Abilities System', slug: 'abilities' },
      { title: 'Credit Management', slug: 'credits' },
      { title: 'Team Collaboration (Pro+)', slug: 'team-collaboration' },
    ],
  },
  {
    title: 'Abilities',
    links: [
      { title: 'Booking & Scheduling', slug: 'booking' },
      { title: 'E-commerce Setup', slug: 'ecommerce' },
      { title: 'Email Marketing', slug: 'email-marketing' },
      { title: 'Member Portals', slug: 'member-portals' },
      { title: 'Analytics & Tracking', slug: 'analytics' },
      { title: 'Multi-Language Sites', slug: 'multi-language' },
    ],
  },
  {
    title: 'Technical',
    links: [
      { title: 'Custom Domains & DNS', slug: 'custom-domains' },
      { title: 'SSL Certificates', slug: 'ssl' },
      { title: 'API Documentation', slug: 'api' },
      { title: 'Webhooks', slug: 'webhooks' },
      { title: 'Export Options (Pro+)', slug: 'export' },
    ],
  },
];

export default function DocCategories() {
  const [expandedCategory, setExpandedCategory] = useState('Getting Started');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {categories.map((category) => {
        const isExpanded = expandedCategory === category.title;
        
        return (
          <div
            key={category.title}
            style={{
              background: C.white,
              borderRadius: '16px',
              border: `1px solid ${C.border}`,
              overflow: 'hidden',
            }}
          >
            <button
              onClick={() => setExpandedCategory(isExpanded ? null : category.title)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px 24px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.2s',
                fontFamily: 'inherit',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = C.cream;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <h3 style={{
                fontWeight: 600,
                fontSize: '16px',
                color: C.charcoal,
              }}>
                {category.title}
              </h3>
              {isExpanded ? (
                <ChevronDown size={20} style={{ color: C.gray }} />
              ) : (
                <ChevronRight size={20} style={{ color: C.gray }} />
              )}
            </button>

            {isExpanded && (
              <div style={{
                borderTop: `1px solid ${C.border}`,
                padding: '12px',
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {category.links.map((link) => (
                    <Link
                      key={link.slug}
                      to={`/docs/${link.slug}`}
                      style={{
                        display: 'block',
                        padding: '12px 16px',
                        color: C.gray,
                        textDecoration: 'none',
                        borderRadius: '8px',
                        fontSize: '14px',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = C.charcoal;
                        e.currentTarget.style.background = C.cream;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = C.gray;
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
