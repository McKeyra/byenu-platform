import { useState } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { colors, typography, spacing, borderRadius, shadows, transitions } from '../../../styles/design-system'

/**
 * Testimonial Carousel
 * Matches 22C-CORP design system
 */
export default function TestimonialCarousel({
  title = 'Loved by Entrepreneurs',
  subtitle = 'See what our customers are saying',
  testimonials = []
}) {
  const defaultTestimonials = [
    {
      quote: 'I built my entire consulting website in 10 minutes during my lunch break. This is insane.',
      author: 'Marcus Rodriguez',
      role: 'Business Consultant',
      company: 'Rodriguez Consulting',
      rating: 5
    },
    {
      quote: 'As a non-technical founder, this saved me weeks of work and thousands of dollars. Best investment I made.',
      author: 'Sarah Kim',
      role: 'Founder',
      company: 'GreenLeaf Yoga',
      rating: 5
    },
    {
      quote: 'The AI actually understood my brand better than the last three designers I hired. Incredible.',
      author: 'David Okafor',
      role: 'Restaurant Owner',
      company: 'Taste of Lagos',
      rating: 5
    }
  ]

  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((current + 1) % displayTestimonials.length)
  const prev = () => setCurrent((current - 1 + displayTestimonials.length) % displayTestimonials.length)

  const t = displayTestimonials[current]

  return (
    <>
      <style>{`
        .testimonial-carousel {
          padding: ${spacing.section.vertical} 0;
          background: ${colors.mint};
        }
        .testimonial-header {
          text-align: center;
          margin-bottom: 64px;
        }
        .testimonial-title {
          font-family: ${typography.heading.fontFamily};
          font-size: 44px;
          font-weight: 600;
          color: ${colors.white};
          margin-bottom: 16px;
          letter-spacing: -0.8px;
        }
        .testimonial-subtitle {
          font-family: ${typography.body.fontFamily};
          font-size: 20px;
          color: rgba(255, 255, 255, 0.9);
        }
        .testimonial-card {
          background: ${colors.white};
          border-radius: ${borderRadius.large};
          padding: 48px;
          position: relative;
          max-width: 800px;
          margin: 0 auto;
        }
        .testimonial-stars {
          display: flex;
          gap: 4px;
          margin-bottom: 24px;
        }
        .testimonial-quote {
          font-family: ${typography.heading.fontFamily};
          font-size: 24px;
          font-weight: 500;
          color: ${colors.charcoal};
          margin-bottom: 32px;
          line-height: 1.5;
        }
        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .testimonial-avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, ${colors.mintGlow} 0%, ${colors.goldGlow} 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }
        .testimonial-author-name {
          font-family: ${typography.heading.fontFamily};
          font-size: 18px;
          font-weight: 600;
          color: ${colors.charcoal};
        }
        .testimonial-author-role {
          font-family: ${typography.body.fontFamily};
          font-size: 14px;
          color: ${colors.gray};
        }
        .testimonial-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: ${colors.white};
          box-shadow: ${shadows.elevated};
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: ${transitions.default};
          border: none;
        }
        .testimonial-nav:hover {
          background: ${colors.cream};
        }
        .testimonial-nav.prev {
          left: -64px;
        }
        .testimonial-nav.next {
          right: -64px;
        }
        .testimonial-indicators {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 32px;
        }
        .testimonial-indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          transition: ${transitions.default};
        }
        .testimonial-indicator.active {
          background: ${colors.white};
        }
        .testimonial-indicator.inactive {
          background: rgba(255, 255, 255, 0.4);
        }
        @media (max-width: 1024px) {
          .testimonial-nav {
            display: none;
          }
        }
      `}</style>
      <section className="testimonial-carousel">
        <div style={{ maxWidth: spacing.container.maxWidth, margin: '0 auto', padding: `0 ${spacing.container.padding}` }}>
          <div className="testimonial-header">
            <h2 className="testimonial-title">{title}</h2>
            <p className="testimonial-subtitle">{subtitle}</p>
          </div>

          {/* Testimonial Card */}
          <div className="testimonial-card">
            {/* Stars */}
            <div className="testimonial-stars">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} style={{ color: colors.gold, fill: colors.gold }} size={24} />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="testimonial-quote">
              "{t.quote}"
            </blockquote>

            {/* Author */}
            <div className="testimonial-author">
              <div className="testimonial-avatar">👤</div>
              <div>
                <div className="testimonial-author-name">{t.author}</div>
                <div className="testimonial-author-role">{t.role}, {t.company}</div>
              </div>
            </div>

            {/* Navigation */}
            <button
              onClick={prev}
              className="testimonial-nav prev"
              aria-label="Previous testimonial"
            >
              <ChevronLeft style={{ color: colors.charcoal }} size={20} />
            </button>
            <button
              onClick={next}
              className="testimonial-nav next"
              aria-label="Next testimonial"
            >
              <ChevronRight style={{ color: colors.charcoal }} size={20} />
            </button>
          </div>

          {/* Indicators */}
          <div className="testimonial-indicators">
            {displayTestimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`testimonial-indicator ${current === i ? 'active' : 'inactive'}`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
