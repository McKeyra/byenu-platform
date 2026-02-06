import React, { useEffect } from 'react'
import MarketingLayout from '../../components/layout/MarketingLayout.jsx'
import MetaTags from '../../components/MetaTags.jsx'
import { initScrollReveals, staggerHeroEntry } from '../../utils/animations.js'
import { colors, typography, spacing, borderRadius, shadows, transitions } from '../../styles/design-system.js'
import { ArrowRight } from 'lucide-react'

const css = `
  .examples-page {
    padding: 96px 0;
  }

  .page-hero {
    text-align: center;
    margin-bottom: 64px;
  }

  .hero-badge {
    display: inline-block;
    padding: 6px 14px;
    background: ${colors.mintGlow};
    color: ${colors.mint};
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    border-radius: ${borderRadius.pill};
    margin-bottom: 20px;
  }

  .hero-headline {
    font-family: ${typography.heading.fontFamily};
    font-size: 44px;
    font-weight: 600;
    color: ${colors.charcoal};
    margin-bottom: 16px;
    line-height: 1.2;
    letter-spacing: -0.8px;
  }

  .hero-subtext {
    font-size: 16px;
    color: ${colors.gray};
    max-width: 720px;
    margin: 0 auto;
    line-height: 1.6;
  }

  .examples-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  .example-card {
    background: ${colors.white};
    border: 1px solid ${colors.border};
    border-radius: ${borderRadius.card};
    overflow: hidden;
    transition: ${transitions.default};
  }

  .example-card:hover {
    transform: translateY(-3px);
    box-shadow: ${shadows.cardHover};
  }

  .example-preview {
    height: 180px;
    position: relative;
    overflow: hidden;
  }

  .preview-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    position: relative;
  }

  .preview-circle {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    position: absolute;
    opacity: 0.2;
  }

  .preview-lines {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    z-index: 1;
  }

  .preview-line {
    height: 8px;
    border-radius: 4px;
    background: rgba(26, 26, 46, 0.1);
  }

  .preview-line.short {
    width: 60%;
  }

  .preview-line.medium {
    width: 80%;
  }

  .preview-line.long {
    width: 100%;
  }

  .preview-url {
    position: absolute;
    bottom: 12px;
    left: 12px;
    background: rgba(26, 26, 46, 0.7);
    backdrop-filter: blur(8px);
    padding: 4px 8px;
    border-radius: 4px;
    font-family: ${typography.mono.fontFamily};
    font-size: 10px;
    color: ${colors.white};
  }

  .example-body {
    padding: 18px;
  }

  .example-name {
    font-size: 15px;
    font-weight: 700;
    color: ${colors.charcoal};
    margin-bottom: 4px;
  }

  .example-meta {
    font-size: 11px;
    color: ${colors.grayLight};
    margin-bottom: 8px;
  }

  .example-desc {
    font-size: 12px;
    color: ${colors.gray};
    line-height: 1.5;
    margin-bottom: 12px;
  }

  .example-tones {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-bottom: 12px;
  }

  .tone-pill {
    padding: 2px 8px;
    background: ${colors.mintGlow};
    color: ${colors.mint};
    border-radius: ${borderRadius.pill};
    font-size: 10px;
    font-weight: 600;
  }

  .example-link {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: ${colors.mint};
    font-size: 12px;
    font-weight: 600;
    text-decoration: none;
    transition: ${transitions.default};
  }

  .example-card:hover .example-link {
    gap: 8px;
  }

  @media (max-width: 968px) {
    .examples-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 640px) {
    .examples-grid {
      grid-template-columns: 1fr;
    }
  }
`

const examples = [
  {
    name: 'Sunrise Yoga Studio',
    industry: 'Health & Wellness',
    pages: 5,
    tones: ['Calm', 'Natural', 'Warm'],
    style: 'light',
    accent: '#CCD5AE',
    desc: 'Calm, natural, warm. Built in 43 seconds from a 7-step wizard conversation.',
    url: 'sunrise-yoga.byenu.site'
  },
  {
    name: 'Bolt Creative Agency',
    industry: 'Creative & Design',
    pages: 6,
    tones: ['Bold', 'Modern', 'Edgy'],
    style: 'dark',
    accent: '#E94560',
    desc: 'Bold, modern, edgy. Dark theme with electric accents. 6 pages including portfolio.',
    url: 'bolt-creative.byenu.site'
  },
  {
    name: 'The Corner Bakery',
    industry: 'Restaurant & Food',
    pages: 5,
    tones: ['Warm', 'Friendly', 'Minimal'],
    style: 'warm',
    accent: '#D4A373',
    desc: 'Warm, friendly, minimal. Menu integration, online ordering, and reservation system.',
    url: 'corner-bakery.byenu.site'
  },
  {
    name: 'Apex Consulting',
    industry: 'Professional Services',
    pages: 7,
    tones: ['Professional', 'Corporate', 'Luxurious'],
    style: 'light',
    accent: '#023E8A',
    desc: 'Professional, corporate, luxurious. Case studies, team bios, contact pipeline.',
    url: 'apex-consulting.byenu.site'
  },
  {
    name: 'FreshFit Athletics',
    industry: 'Health & Fitness',
    pages: 6,
    tones: ['Energetic', 'Bold', 'Modern'],
    style: 'dark',
    accent: '#2EC4B6',
    desc: 'Energetic, bold, modern. Booking system, class schedule, and membership portal.',
    url: 'freshfit.byenu.site'
  },
  {
    name: 'Wildflower Photography',
    industry: 'Creative & Design',
    pages: 5,
    tones: ['Artistic', 'Natural', 'Warm'],
    style: 'light',
    accent: '#E9C46A',
    desc: 'Artistic, natural, warm. Full-bleed gallery, client portal, booking calendar.',
    url: 'wildflower-photo.byenu.site'
  }
]

const getPreviewBg = (style) => {
  switch (style) {
    case 'dark':
      return colors.charcoal
    case 'warm':
      return '#FEFAE0'
    default:
      return colors.cream
  }
}

export default function ExamplesPage() {
  useEffect(() => {
    staggerHeroEntry('.hero-badge, .hero-headline, .hero-subtext', 150)
    initScrollReveals()
  }, [])

  return (
    <MarketingLayout>
      <MetaTags
        title="Examples - From conversation to live in under 60 seconds"
        description="Real sites. Real businesses. Generated entirely through conversation with NU. No templates modified. No code written."
      />
      <style>{css}</style>
      <div className="examples-page" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
        {/* Page Hero */}
        <div className="page-hero">
          <div className="hero-badge">BUILT WITH NU</div>
          <h1 className="hero-headline">From conversation to live in under 60 seconds.</h1>
          <p className="hero-subtext">
            Real sites. Real businesses. Generated entirely through conversation with NU. No templates modified. No code written.
          </p>
        </div>

        {/* Examples Grid */}
        <div className="examples-grid">
          {examples.map((example, index) => (
            <div key={index} className="example-card" data-reveal>
              {/* Preview Area */}
              <div
                className="example-preview"
                style={{ background: getPreviewBg(example.style) }}
              >
                <div className="preview-placeholder">
                  <div
                    className="preview-circle"
                    style={{ background: example.accent }}
                  />
                  <div className="preview-lines">
                    <div className="preview-line long" />
                    <div className="preview-line medium" />
                    <div className="preview-line short" />
                    <div className="preview-line medium" />
                  </div>
                </div>
                <div className="preview-url">{example.url}</div>
              </div>

              {/* Body */}
              <div className="example-body">
                <h3 className="example-name">{example.name}</h3>
                <div className="example-meta">
                  {example.industry} · {example.pages} pages
                </div>
                <p className="example-desc">{example.desc}</p>
                <div className="example-tones">
                  {example.tones.map((tone, toneIndex) => (
                    <span key={toneIndex} className="tone-pill">{tone}</span>
                  ))}
                </div>
                <a href="#" className="example-link">
                  Visit site <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Future Enhancement Note */}
        {/* When real sites are deployed, replace preview placeholders with actual iframe screenshots or generated thumbnails */}
      </div>
    </MarketingLayout>
  )
}
