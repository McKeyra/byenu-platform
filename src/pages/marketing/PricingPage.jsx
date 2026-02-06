import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MarketingLayout from '../../components/layout/MarketingLayout.jsx'
import MetaTags from '../../components/MetaTags.jsx'
import { initScrollReveals, staggerHeroEntry } from '../../utils/animations.js'
import { colors, typography, spacing, borderRadius, shadows, transitions } from '../../styles/design-system.js'
import { Check, ChevronDown, ArrowRight } from 'lucide-react'

const css = `
  .pricing-page {
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
    max-width: 680px;
    margin: 0 auto;
    line-height: 1.6;
  }

  .pricing-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    margin-bottom: 96px;
  }

  .pricing-card {
    background: ${colors.white};
    border: 1px solid ${colors.border};
    border-radius: ${borderRadius.large};
    padding: 32px;
    position: relative;
    transition: ${transitions.default};
  }

  .pricing-card:hover {
    transform: translateY(-3px);
    box-shadow: ${shadows.elevated};
  }

  .pricing-card.featured {
    border-color: ${colors.mint};
    box-shadow: 0 0 0 1px ${colors.mint}, ${shadows.cardHover};
  }

  .featured-badge {
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    background: ${colors.mint};
    color: ${colors.white};
    padding: 4px 16px;
    border-radius: ${borderRadius.pill};
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .plan-name {
    font-family: ${typography.heading.fontFamily};
    font-size: 24px;
    font-weight: 600;
    color: ${colors.charcoal};
    margin-bottom: 8px;
  }

  .plan-desc {
    font-size: 14px;
    color: ${colors.gray};
    margin-bottom: 24px;
    line-height: 1.5;
  }

  .plan-price {
    display: flex;
    align-items: baseline;
    gap: 4px;
    margin-bottom: 32px;
  }

  .price-amount {
    font-family: ${typography.heading.fontFamily};
    font-size: 42px;
    font-weight: 700;
    color: ${colors.charcoal};
  }

  .price-period {
    font-size: 14px;
    color: ${colors.grayLight};
  }

  .features-list {
    list-style: none;
    padding: 0;
    margin: 0 0 32px 0;
  }

  .feature-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 8px 0;
    font-size: 13px;
    color: ${colors.charcoal};
  }

  .feature-check {
    color: ${colors.mint};
    flex-shrink: 0;
    margin-top: 2px;
  }

  .plan-cta {
    width: 100%;
    padding: 14px 28px;
    border-radius: ${borderRadius.button};
    font-weight: 600;
    font-size: 15px;
    text-decoration: none;
    transition: ${transitions.default};
    border: none;
    cursor: pointer;
    font-family: inherit;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .plan-cta.primary {
    background: ${colors.mint};
    color: ${colors.white};
  }

  .plan-cta.primary:hover {
    background: ${colors.gold};
    color: ${colors.charcoal};
    transform: translateY(-1px);
  }

  .plan-cta.secondary {
    background: ${colors.cream};
    color: ${colors.charcoal};
    border: 1px solid ${colors.border};
  }

  .plan-cta.secondary:hover {
    border-color: ${colors.mint};
    background: ${colors.white};
  }

  .faq-section {
    max-width: 680px;
    margin: 0 auto;
  }

  .faq-title {
    font-family: ${typography.heading.fontFamily};
    font-size: 28px;
    font-weight: 600;
    color: ${colors.charcoal};
    text-align: center;
    margin-bottom: 32px;
  }

  .faq-item {
    border-bottom: 1px solid ${colors.border};
    padding: 20px 0;
  }

  .faq-question {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    font-family: inherit;
    text-align: left;
    font-size: 16px;
    font-weight: 600;
    color: ${colors.charcoal};
    transition: ${transitions.default};
  }

  .faq-question:hover {
    color: ${colors.mint};
  }

  .faq-chevron {
    transition: transform 0.3s ease;
    color: ${colors.grayLight};
    flex-shrink: 0;
  }

  .faq-chevron.open {
    transform: rotate(180deg);
  }

  .faq-answer {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease, padding 0.3s ease;
    padding: 0;
    font-size: 14px;
    color: ${colors.gray};
    line-height: 1.6;
  }

  .faq-answer.open {
    max-height: 500px;
    padding-top: 12px;
  }

  @media (max-width: 968px) {
    .pricing-grid {
      grid-template-columns: 1fr;
    }
  }
`

const plans = [
  {
    id: 'starter',
    name: 'STARTER',
    price: 25,
    desc: 'For solo founders and side projects. Everything you need to go live.',
    features: [
      '1 website',
      '5 pages max',
      'All built-in abilities',
      'Custom subdomain (name.byenu.site)',
      'Basic analytics',
      'Email support',
      'Community access'
    ],
    ctaStyle: 'secondary',
    featured: false
  },
  {
    id: 'standard',
    name: 'STANDARD',
    price: 50,
    desc: 'For growing businesses that need room to scale. The sweet spot.',
    features: [
      '3 websites',
      'Unlimited pages',
      'All built-in abilities',
      'Custom domain',
      'Advanced analytics',
      'Priority support',
      'Team collaboration (3 seats)',
      'Element versioning',
      'Blog/CMS'
    ],
    ctaStyle: 'primary',
    featured: true
  },
  {
    id: 'premium',
    name: 'PREMIUM',
    price: 100,
    desc: 'For agencies and power users. Full infrastructure access.',
    features: [
      '10 websites',
      'Unlimited pages',
      'All built-in abilities',
      'Custom domains (all sites)',
      'Full analytics suite',
      'Dedicated support',
      'Team collaboration (10 seats)',
      'Element versioning',
      'Blog/CMS',
      'E-commerce',
      'API access',
      'White-label option',
      'Priority generation queue'
    ],
    ctaStyle: 'secondary',
    featured: false
  }
]

const faqs = [
  {
    question: 'Can I switch plans?',
    answer: 'Any time. Upgrades apply immediately. Downgrades take effect at your next billing cycle. No penalties.'
  },
  {
    question: 'What happens if I cancel?',
    answer: 'Your sites stay live through the end of your billing period. After that, they\'re archived — not deleted. Reactivate any time and everything returns exactly as you left it.'
  },
  {
    question: 'What are credits?',
    answer: 'Credits are the currency for AI actions: generating pages, editing content, creating new designs. Every plan includes generous monthly credits. You\'ll see the cost before every action. No surprises.'
  },
  {
    question: 'Do I own my website code?',
    answer: 'Yes. Export your full site at any time. It\'s standard HTML, CSS, and JavaScript. No vendor lock-in. No proprietary formats.'
  },
  {
    question: 'Can I use my own domain?',
    answer: 'Standard and Premium plans include custom domain connection. We handle SSL provisioning and provide step-by-step DNS configuration guidance.'
  }
]

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState(null)

  useEffect(() => {
    staggerHeroEntry('.hero-badge, .hero-headline, .hero-subtext', 150)
    initScrollReveals()
  }, [])

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <MarketingLayout>
      <MetaTags
        title="Pricing - Simple pricing. No surprise invoices."
        description="See costs before every action. Pay for what you use. Upgrade, downgrade, or cancel — your call, your timeline."
      />
      <style>{css}</style>
      <div className="pricing-page" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
        {/* Page Hero */}
        <div className="page-hero">
          <div className="hero-badge">TRANSPARENT</div>
          <h1 className="hero-headline">Simple pricing. No surprise invoices.</h1>
          <p className="hero-subtext">
            See costs before every action. Pay for what you use. Upgrade, downgrade, or cancel — your call, your timeline.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="pricing-grid">
          {plans.map((plan) => (
            <div key={plan.id} className={`pricing-card ${plan.featured ? 'featured' : ''}`} data-reveal>
              {plan.featured && <div className="featured-badge">Most Popular</div>}
              <h2 className="plan-name">{plan.name}</h2>
              <p className="plan-desc">{plan.desc}</p>
              <div className="plan-price">
                <span className="price-amount">${plan.price}</span>
                <span className="price-period">/mo</span>
              </div>
              <ul className="features-list">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="feature-item">
                    <Check size={16} className="feature-check" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to="/build" className={`plan-cta ${plan.ctaStyle}`}>
                Start Building <ArrowRight size={18} />
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <h2 className="faq-title">Frequently asked.</h2>
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                className="faq-question"
                onClick={() => toggleFaq(index)}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  size={20}
                  className={`faq-chevron ${openFaq === index ? 'open' : ''}`}
                />
              </button>
              <div className={`faq-answer ${openFaq === index ? 'open' : ''}`}>
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </MarketingLayout>
  )
}
