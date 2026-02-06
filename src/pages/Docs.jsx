import React from 'react';
import PageLayout from '../components/layout/PageLayout.jsx';
import DocsHero from '../components/docs/DocsHero.jsx';
import QuickStartCards from '../components/docs/QuickStartCards.jsx';
import DocCategories from '../components/docs/DocCategories.jsx';
import { C } from '../theme/constants.js';

export default function Docs() {
  return (
    <PageLayout>
      <div style={{ minHeight: 'calc(100vh - 100px)' }}>
        <DocsHero />
        
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '60px 24px',
        }}>
          <QuickStartCards />
          
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: "'Fraunces', serif",
              fontSize: '32px',
              fontWeight: 600,
              color: C.charcoal,
              marginBottom: '32px',
            }}>
              Documentation
            </h2>
            <DocCategories />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
