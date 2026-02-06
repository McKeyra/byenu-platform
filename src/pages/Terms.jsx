import React from 'react';
import PageLayout from '../components/layout/PageLayout.jsx';
import { C } from '../theme/constants.js';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Terms() {
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
              <span>Terms of Service</span>
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
            Terms of Service
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
                Please read these Terms of Service ("Terms") carefully before using the ByeNU platform ("Service") operated by Educated New United World Inc. ("us," "we," or "our").
              </p>

              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these terms, you may not access the Service.
              </p>

              <h2>2. Use License</h2>
              <p>
                Permission is granted to temporarily use ByeNU for personal or commercial purposes. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul>
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose without our written consent</li>
                <li>Attempt to decompile or reverse engineer any software</li>
                <li>Remove any copyright or other proprietary notations</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>

              <h2>3. User Accounts</h2>
              <p>When you create an account with us, you must provide accurate, complete, and current information. You are responsible for:</p>
              <ul>
                <li>Maintaining the security of your account and password</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized use</li>
              </ul>

              <h2>4. Acceptable Use</h2>
              <p>You agree not to use the Service to:</p>
              <ul>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>Transmit any harmful or malicious code</li>
                <li>Spam, phish, or engage in fraudulent activities</li>
                <li>Interfere with or disrupt the Service</li>
              </ul>

              <h2>5. Content Ownership</h2>
              <p>
                You retain ownership of all content you create using ByeNU. By using our Service, you grant us a license to host, display, and distribute your content as necessary to provide the Service.
              </p>

              <h2>6. Payment Terms</h2>
              <p>
                If you purchase a paid plan, you agree to pay all fees associated with your subscription. Fees are billed in advance on a monthly or annual basis. All fees are non-refundable except as required by law.
              </p>

              <h2>7. Subscription and Cancellation</h2>
              <p>
                Subscriptions automatically renew unless cancelled. You may cancel your subscription at any time through your account settings. Cancellation takes effect at the end of the current billing period.
              </p>

              <h2>8. Service Availability</h2>
              <p>
                We strive to maintain high availability but do not guarantee uninterrupted access. We reserve the right to modify, suspend, or discontinue the Service at any time.
              </p>

              <h2>9. Intellectual Property</h2>
              <p>
                The Service and its original content, features, and functionality are owned by Educated New United World Inc. and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>

              <h2>10. Limitation of Liability</h2>
              <p>
                In no event shall Educated New United World Inc. be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the Service.
              </p>

              <h2>11. Indemnification</h2>
              <p>
                You agree to defend, indemnify, and hold harmless Educated New United World Inc. from any claims, damages, obligations, losses, liabilities, costs, or debt arising from your use of the Service.
              </p>

              <h2>12. Termination</h2>
              <p>
                We may terminate or suspend your account immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
              </p>

              <h2>13. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. We will notify users of any material changes. Your continued use of the Service after changes constitutes acceptance of the new Terms.
              </p>

              <h2>14. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with applicable laws, without regard to its conflict of law provisions.
              </p>

              <h2>15. Contact Information</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <p>
                <strong>Email:</strong> legal@byenu.site<br />
                <strong>Address:</strong> Educated New United World Inc.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
