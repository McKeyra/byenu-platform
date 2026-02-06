/**
 * Component Library Index
 * Exports all reusable components for site generation
 */

// Headers
export { default as StickyHeader } from './headers/StickyHeader.jsx'
export { default as SolidHeader } from './headers/SolidHeader.jsx'

// Heroes
export { default as CenteredHero } from './heroes/CenteredHero.jsx'
export { default as SplitHero } from './heroes/SplitHero.jsx'

// About
export { default as StoryAbout } from './about/StoryAbout.jsx'
export { default as TeamAbout } from './about/TeamAbout.jsx'

// Features
export { default as FeaturesGrid } from './features/FeaturesGrid.jsx'
export { default as TabbedFeatures } from './features/TabbedFeatures.jsx'

// Testimonials
export { default as TestimonialCarousel } from './testimonials/TestimonialCarousel.jsx'

// Contact
export { default as ContactSection } from './contact/ContactSection.jsx'

// Footers
export { default as StandardFooter } from './footers/StandardFooter.jsx'

// Component metadata for site generation
export const componentMetadata = {
  headers: {
    'sticky-transparent': {
      component: 'StickyHeader',
      variants: ['transparent', 'solid'],
      industryTags: ['all'],
      requiredProps: ['logo'],
      optionalProps: ['navItems', 'ctaText', 'onCtaClick']
    },
    'solid-dropdown': {
      component: 'SolidHeader',
      variants: ['solid'],
      industryTags: ['all'],
      requiredProps: ['logo'],
      optionalProps: ['navItems', 'dropdownItems', 'ctaText', 'onCtaClick']
    }
  },
  heroes: {
    'centered': {
      component: 'CenteredHero',
      variants: ['gradient', 'image', 'video'],
      industryTags: ['all'],
      requiredProps: ['headline'],
      optionalProps: ['subtext', 'primaryCta', 'secondaryCta', 'backgroundGradient']
    },
    'split': {
      component: 'SplitHero',
      variants: ['default'],
      industryTags: ['all'],
      requiredProps: ['headline'],
      optionalProps: ['badge', 'subtext', 'primaryCta', 'secondaryCta', 'imageUrl']
    }
  },
  about: {
    'story': {
      component: 'StoryAbout',
      variants: ['default'],
      industryTags: ['all'],
      requiredProps: ['title'],
      optionalProps: ['subtitle', 'paragraphs', 'highlightText', 'stats']
    },
    'team': {
      component: 'TeamAbout',
      variants: ['default'],
      industryTags: ['all'],
      requiredProps: ['title'],
      optionalProps: ['subtitle', 'team']
    }
  },
  features: {
    'grid': {
      component: 'FeaturesGrid',
      variants: ['default'],
      industryTags: ['all'],
      requiredProps: ['title'],
      optionalProps: ['subtitle', 'features']
    },
    'tabbed': {
      component: 'TabbedFeatures',
      variants: ['default'],
      industryTags: ['all'],
      requiredProps: ['title'],
      optionalProps: ['tabs']
    }
  },
  testimonials: {
    'carousel': {
      component: 'TestimonialCarousel',
      variants: ['default'],
      industryTags: ['all'],
      requiredProps: ['title'],
      optionalProps: ['subtitle', 'testimonials']
    }
  },
  contact: {
    'form-info': {
      component: 'ContactSection',
      variants: ['default'],
      industryTags: ['all'],
      requiredProps: ['title'],
      optionalProps: ['subtitle', 'contactInfo', 'onSubmit']
    }
  },
  footers: {
    'standard': {
      component: 'StandardFooter',
      variants: ['default'],
      industryTags: ['all'],
      requiredProps: [],
      optionalProps: ['brandName', 'tagline', 'footerLinks', 'socialLinks', 'copyright']
    }
  }
}

/**
 * Get component by type and variant
 */
export function getComponent(type, variant = 'default') {
  const category = componentMetadata[type]
  if (!category) return null
  
  const componentInfo = category[variant] || Object.values(category)[0]
  return componentInfo
}

/**
 * Get components suitable for industry
 */
export function getComponentsForIndustry(industry) {
  const suitable = []
  
  Object.entries(componentMetadata).forEach(([category, components]) => {
    Object.entries(components).forEach(([variant, info]) => {
      if (info.industryTags.includes('all') || info.industryTags.includes(industry)) {
        suitable.push({ category, variant, ...info })
      }
    })
  })
  
  return suitable
}
