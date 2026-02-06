import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout.jsx';
import Callout from '../components/docs/Callout.jsx';
import CodeBlock from '../components/docs/CodeBlock.jsx';
import { ChevronRight, ThumbsUp, ThumbsDown } from 'lucide-react';
import { C } from '../theme/constants.js';

// Sample documentation content - in production, this would come from a CMS or API
const docContent = {
  welcome: {
    title: 'Welcome to ByeNU',
    category: 'Getting Started',
    lastUpdated: 'February 5, 2026',
    content: (
      <>
        <p>
          Welcome to ByeNU! This guide will walk you through creating your first website using our AI-powered platform. 
          No coding or design experience required.
        </p>

        <h2>What You'll Need</h2>
        <ul>
          <li>A ByeNU account (sign up for free)</li>
          <li>Basic information about your business or project</li>
          <li>5-10 minutes of time</li>
        </ul>

        <Callout type="tip">
          Pro tip: Have your business description, target audience, and key messaging ready before starting. 
          This helps NU create a more tailored website.
        </Callout>

        <h2>Step 1: Start a New Project</h2>
        <p>
          Log in to your ByeNU dashboard and click "New Project". You'll be greeted by NU AI, which will guide you 
          through the 8-stage wizard.
        </p>

        <h2>Step 2: Tell NU About Your Business</h2>
        <p>
          In the first stage, NU will ask questions about:
        </p>
        <ul>
          <li>What your business does</li>
          <li>Who your target customers are</li>
          <li>What action you want visitors to take</li>
          <li>Your brand personality and tone</li>
        </ul>

        <Callout type="info">
          This feature is available on all plans, including the free tier.
        </Callout>

        <h2>Step 3: Review NU's Suggestions</h2>
        <p>
          Based on your input, NU will create a complete website structure with:
        </p>
        <ul>
          <li>Suggested pages and sections</li>
          <li>Written copy tailored to your brand</li>
          <li>Design elements that match your industry</li>
          <li>Call-to-action buttons optimized for conversions</li>
        </ul>

        <h2>Next Steps</h2>
        <p>
          Once you're happy with your website, you can:
        </p>
        <ul>
          <li>Connect a custom domain</li>
          <li>Add more abilities (e-commerce, booking, etc.)</li>
          <li>Invite team members to collaborate</li>
          <li>Set up analytics tracking</li>
        </ul>

        <Callout type="warning">
          Publishing your website will immediately make it live to the public. Review all content carefully before publishing.
        </Callout>
      </>
    ),
  },
  '8-stage-wizard': {
    title: 'The 8-Stage Wizard',
    category: 'Getting Started',
    lastUpdated: 'February 5, 2026',
    content: (
      <>
        <p>
          The ByeNU wizard guides you through 8 essential stages to create your perfect website. Each stage collects 
          specific information that NU uses to generate your site.
        </p>

        <h2>Stage 1: Identity</h2>
        <p>Your business name becomes your site's headline, URL slug, and SEO anchor. Keep it memorable and searchable.</p>

        <h2>Stage 2: Purpose</h2>
        <p>Describe what you do and who you help in one sentence. This shapes your entire site's content and messaging.</p>

        <h2>Stage 3: Audience</h2>
        <p>NU calibrates language, imagery, and layout complexity based on your audience. The more specific, the sharper the output.</p>

        <h2>Stage 4: Tone</h2>
        <p>Pick 3 words that capture your brand's personality. These become your design DNA, mapping to colors, typography, and spacing.</p>

        <h2>Stage 5: Pages</h2>
        <p>Select the pages your site needs. Each page gets AI-generated content tailored to your business.</p>

        <h2>Stage 6: Visuals</h2>
        <p>Choose your visual direction. "Let NU Decide" uses your business type + tone to algorithmically select the optimal palette.</p>

        <h2>Stage 7: Abilities</h2>
        <p>Select built-in features like contact forms, booking systems, e-commerce, and more. These are built directly into your site's code.</p>

        <h2>Stage 8: Review</h2>
        <p>Review everything NU is about to build. Once you confirm, your site will be generated and deployed.</p>
      </>
    ),
  },
  // Add more doc content as needed...
};

export default function DocPage() {
  const { slug } = useParams();
  const docSlug = slug || 'welcome';
  const doc = docContent[docSlug] || docContent.welcome;

  const tableOfContents = [
    { id: 'what-youll-need', title: 'What You\'ll Need' },
    { id: 'step-1', title: 'Step 1: Start a New Project' },
    { id: 'step-2', title: 'Step 2: Tell NU About Your Business' },
    { id: 'step-3', title: 'Step 3: Review NU\'s Suggestions' },
    { id: 'next-steps', title: 'Next Steps' },
  ];

  const relatedDocs = [
    { title: 'The 8-Stage Wizard', href: '/docs/8-stage-wizard' },
    { title: 'Publishing & Domains', href: '/docs/publishing-domains' },
    { title: 'NU AI Intelligence', href: '/docs/nu-ai' },
  ];

  return (
    <PageLayout>
      <div style={{ minHeight: 'calc(100vh - 100px)' }}>
        {/* Breadcrumb */}
        <div style={{
          borderBottom: `1px solid ${C.border}`,
          background: C.white,
        }}>
          <div style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '16px 24px',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              color: C.gray,
            }}>
              <Link to="/docs" style={{ color: C.gray, textDecoration: 'none' }}>
                Documentation
              </Link>
              <ChevronRight size={16} />
              <span>{doc.category}</span>
            </div>
          </div>
        </div>

        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '48px 24px',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '250px 1fr 250px',
            gap: '48px',
          }}>
            {/* Left Sidebar - Navigation */}
            <aside className="docs-sidebar-left">
              <div style={{
                position: 'sticky',
                top: '100px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}>
                <h3 style={{
                  fontWeight: 600,
                  fontSize: '12px',
                  color: C.grayLight,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '16px',
                }}>
                  Getting Started
                </h3>
                <Link
                  to="/docs/welcome"
                  style={{
                    display: 'block',
                    padding: '8px 12px',
                    fontSize: '14px',
                    color: C.charcoal,
                    background: C.cream,
                    borderRadius: '8px',
                    fontWeight: 500,
                    textDecoration: 'none',
                  }}
                >
                  Welcome to ByeNU
                </Link>
                <Link
                  to="/docs/8-stage-wizard"
                  style={{
                    display: 'block',
                    padding: '8px 12px',
                    fontSize: '14px',
                    color: C.gray,
                    textDecoration: 'none',
                    borderRadius: '8px',
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
                  The 8-Stage Wizard
                </Link>
              </div>
            </aside>

            {/* Main Content */}
            <article className="docs-main-content" style={{ maxWidth: '700px' }}>
              <h1 style={{
                fontFamily: "'Fraunces', serif",
                fontSize: 'clamp(32px, 4vw, 40px)',
                fontWeight: 600,
                color: C.charcoal,
                marginBottom: '8px',
              }}>
                {doc.title}
              </h1>
              <p style={{
                fontSize: '14px',
                color: C.grayLight,
                marginBottom: '48px',
              }}>
                Last updated: {doc.lastUpdated}
              </p>

              <div style={{
                fontSize: '16px',
                lineHeight: '1.7',
                color: C.charcoal,
              }}>
                <style>{`
                  .doc-content h2 {
                    font-family: 'Fraunces', serif;
                    font-size: 28px;
                    font-weight: 600;
                    color: ${C.charcoal};
                    margin-top: 48px;
                    margin-bottom: 16px;
                  }
                  .doc-content p {
                    margin-bottom: 20px;
                    color: ${C.gray};
                  }
                  .doc-content ul {
                    margin: 20px 0;
                    padding-left: 24px;
                  }
                  .doc-content li {
                    margin-bottom: 8px;
                    color: ${C.gray};
                  }
                  @media (max-width: 1024px) {
                    .docs-sidebar-left,
                    .docs-sidebar-right {
                      display: none;
                    }
                    .docs-main-content {
                      grid-column: 1 / -1;
                    }
                  }
                `}</style>
                <div className="doc-content">
                  {doc.content}
                </div>
              </div>

              {/* Was this helpful? */}
              <div style={{
                marginTop: '64px',
                paddingTop: '32px',
                borderTop: `1px solid ${C.border}`,
              }}>
                <p style={{
                  fontWeight: 600,
                  color: C.charcoal,
                  marginBottom: '16px',
                }}>
                  Was this helpful?
                </p>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    style={{
                      padding: '8px 16px',
                      border: `1px solid ${C.border}`,
                      borderRadius: '8px',
                      background: C.white,
                      color: C.charcoal,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '14px',
                      fontFamily: 'inherit',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = C.mint;
                      e.currentTarget.style.color = C.mint;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = C.border;
                      e.currentTarget.style.color = C.charcoal;
                    }}
                  >
                    <ThumbsUp size={16} />
                    Yes
                  </button>
                  <button
                    style={{
                      padding: '8px 16px',
                      border: `1px solid ${C.border}`,
                      borderRadius: '8px',
                      background: C.white,
                      color: C.charcoal,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '14px',
                      fontFamily: 'inherit',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = C.mint;
                      e.currentTarget.style.color = C.mint;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = C.border;
                      e.currentTarget.style.color = C.charcoal;
                    }}
                  >
                    <ThumbsDown size={16} />
                    No
                  </button>
                </div>
              </div>
            </article>

            {/* Right Sidebar - TOC */}
            <aside className="docs-sidebar-right">
              <div style={{
                position: 'sticky',
                top: '100px',
                display: 'flex',
                flexDirection: 'column',
                gap: '32px',
              }}>
                {/* Table of Contents */}
                <div>
                  <h3 style={{
                    fontWeight: 600,
                    fontSize: '12px',
                    color: C.grayLight,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '16px',
                  }}>
                    On This Page
                  </h3>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {tableOfContents.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          style={{
                            fontSize: '14px',
                            color: C.gray,
                            textDecoration: 'none',
                            transition: 'color 0.2s',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = C.charcoal;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = C.gray;
                          }}
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Related Docs */}
                <div>
                  <h3 style={{
                    fontWeight: 600,
                    fontSize: '12px',
                    color: C.grayLight,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '16px',
                  }}>
                    Related
                  </h3>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {relatedDocs.map((related) => (
                      <li key={related.title}>
                        <Link
                          to={related.href}
                          style={{
                            fontSize: '14px',
                            color: C.gray,
                            textDecoration: 'none',
                            transition: 'color 0.2s',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = C.charcoal;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = C.gray;
                          }}
                        >
                          {related.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
