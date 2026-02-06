import React from 'react';
import PageLayout from '../components/layout/PageLayout.jsx';
import { C } from '../theme/constants.js';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Privacy() {
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
              <Link to="/" style={{ color: C.gray, textDecoration: 'none' }}>
                Home
              </Link>
              <ChevronRight size={16} />
              <span>Privacy Policy</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '60px 24px',
        }}>
          <h1 style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 600,
            color: C.charcoal,
            marginBottom: '16px',
          }}>
            Privacy Policy
          </h1>
          <p style={{
            fontSize: '14px',
            color: C.grayLight,
            marginBottom: '48px',
          }}>
            Last updated: February 5, 2026
          </p>

          <div style={{
            fontSize: '16px',
            lineHeight: '1.7',
            color: C.charcoal,
          }}>
            <style>{`
              .legal-content h2 {
                font-family: 'Fraunces', serif;
                font-size: 28px;
                font-weight: 600;
                color: ${C.charcoal};
                margin-top: 48px;
                margin-bottom: 16px;
              }
              .legal-content h3 {
                font-size: 20px;
                font-weight: 600;
                color: ${C.charcoal};
                margin-top: 32px;
                margin-bottom: 12px;
              }
              .legal-content p {
                margin-bottom: 20px;
                color: ${C.gray};
              }
              .legal-content ul {
                margin: 20px 0;
                padding-left: 24px;
              }
              .legal-content li {
                margin-bottom: 8px;
                color: ${C.gray};
              }
            `}</style>
            <div className="legal-content">
              <p>
                At ByeNU ("we," "our," or "us"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
              </p>

              <h2>1. Information We Collect</h2>
              <p>We collect information that you provide directly to us, including:</p>
              <ul>
                <li>Account information (name, email address, password)</li>
                <li>Business information (business name, industry, description)</li>
                <li>Website content and preferences</li>
                <li>Payment information (processed securely through third-party providers)</li>
                <li>Communication data (support requests, feedback)</li>
              </ul>

              <h2>2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices, updates, and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Monitor and analyze trends and usage</li>
                <li>Detect, prevent, and address technical issues</li>
              </ul>

              <h2>3. Information Sharing and Disclosure</h2>
              <p>We do not sell your personal information. We may share your information:</p>
              <ul>
                <li>With service providers who assist us in operating our platform</li>
                <li>When required by law or to protect our rights</li>
                <li>In connection with a business transfer or merger</li>
                <li>With your consent or at your direction</li>
              </ul>

              <h2>4. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
              </p>

              <h2>5. Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Access and receive a copy of your personal data</li>
                <li>Rectify inaccurate or incomplete data</li>
                <li>Request deletion of your personal data</li>
                <li>Object to processing of your personal data</li>
                <li>Request restriction of processing</li>
                <li>Data portability</li>
              </ul>

              <h2>6. Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>

              <h2>7. Third-Party Services</h2>
              <p>
                Our service may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties.
              </p>

              <h2>8. Children's Privacy</h2>
              <p>
                Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
              </p>

              <h2>9. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>

              <h2>10. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p>
                <strong>Email:</strong> privacy@byenu.site<br />
                <strong>Address:</strong> Educated New United World Inc.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
