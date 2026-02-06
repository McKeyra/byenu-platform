import React, { useState } from 'react';
import PageLayout from '../components/layout/PageLayout.jsx';
import { C } from '../theme/constants.js';
import { Mail, MessageCircle, BookOpen, Search, HelpCircle, FileText, Video, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const supportOptions = [
  {
    icon: BookOpen,
    title: 'Documentation',
    description: 'Browse our comprehensive guides and tutorials',
    href: '/docs',
    color: C.mint,
  },
  {
    icon: MessageCircle,
    title: 'Contact Support',
    description: 'Get help from our support team',
    href: 'mailto:support@byenu.site',
    color: C.gold,
  },
  {
    icon: Video,
    title: 'Video Tutorials',
    description: 'Watch step-by-step video guides',
    href: '#',
    color: C.coral,
  },
  {
    icon: FileText,
    title: 'FAQ',
    description: 'Find answers to common questions',
    href: '/docs/faq',
    color: C.mintLight,
  },
];

const faqs = [
  {
    question: 'How do I get started with ByeNU?',
    answer: 'Simply sign up for a free account and use our wizard to create your first website. The AI will guide you through 8 simple stages.',
  },
  {
    question: 'Do I need coding experience?',
    answer: 'No! ByeNU is designed for everyone. Our AI handles all the technical aspects, so you can focus on your business.',
  },
  {
    question: 'Can I use my own domain?',
    answer: 'Yes! You can connect your custom domain to your ByeNU site. We provide step-by-step instructions in our documentation.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards and support Stripe. Additional payment providers are coming soon.',
  },
  {
    question: 'Can I edit my website after it\'s created?',
    answer: 'Absolutely! You can edit any part of your website at any time through the dashboard. Changes are saved automatically.',
  },
  {
    question: 'Is there a free plan?',
    answer: 'Yes! We offer a free plan that includes basic features. You can upgrade anytime to unlock more abilities and features.',
  },
];

export default function Support() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageLayout>
      <div style={{ minHeight: 'calc(100vh - 100px)' }}>
        {/* Hero Section */}
        <section style={{
          background: `linear-gradient(135deg, ${C.mintGlow} 0%, ${C.white} 100%)`,
          padding: '80px 24px 60px',
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
              How can we help you?
            </h1>
            <p style={{
              fontSize: '18px',
              color: C.gray,
              marginBottom: '32px',
            }}>
              Find answers, get support, or contact our team
            </p>

            {/* Search Bar */}
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
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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

        {/* Support Options */}
        <section style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '60px 24px',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '80px',
          }}>
            {supportOptions.map((option) => {
              const Icon = option.icon;
              return (
                <Link
                  key={option.title}
                  to={option.href}
                  href={option.href.startsWith('mailto:') ? undefined : option.href}
                  onClick={option.href.startsWith('mailto:') ? undefined : (e) => {
                    if (option.href === '#') e.preventDefault();
                  }}
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
                    e.currentTarget.style.borderColor = option.color;
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
                    background: `${option.color}15`,
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                  }}>
                    <Icon size={24} style={{ color: option.color }} />
                  </div>
                  
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: 600,
                    color: C.charcoal,
                    marginBottom: '8px',
                  }}>
                    {option.title}
                  </h3>
                  
                  <p style={{
                    color: C.gray,
                    marginBottom: '16px',
                    lineHeight: '1.6',
                  }}>
                    {option.description}
                  </p>

                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: option.color,
                    fontWeight: 600,
                    fontSize: '14px',
                  }}>
                    Learn more <ArrowRight size={14} />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* FAQ Section */}
          <div>
            <h2 style={{
              fontFamily: "'Fraunces', serif",
              fontSize: '36px',
              fontWeight: 600,
              color: C.charcoal,
              marginBottom: '32px',
              textAlign: 'center',
            }}>
              Frequently Asked Questions
            </h2>

            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              {filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  style={{
                    background: C.white,
                    border: `1px solid ${C.border}`,
                    borderRadius: '16px',
                    marginBottom: '12px',
                    overflow: 'hidden',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = C.mint;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = C.border;
                  }}
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    style={{
                      width: '100%',
                      padding: '20px 24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontFamily: 'inherit',
                    }}
                  >
                    <span style={{
                      fontSize: '16px',
                      fontWeight: 600,
                      color: C.charcoal,
                      flex: 1,
                    }}>
                      {faq.question}
                    </span>
                    <HelpCircle
                      size={20}
                      style={{
                        color: C.grayLight,
                        transform: expandedFaq === index ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s',
                      }}
                    />
                  </button>
                  {expandedFaq === index && (
                    <div style={{
                      padding: '0 24px 20px',
                      color: C.gray,
                      lineHeight: '1.7',
                    }}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
