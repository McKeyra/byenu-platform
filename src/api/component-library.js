/**
 * Component Library API
 * Manages component selection and generation for site building
 */

import { getComponent, getComponentsForIndustry } from '../components/library/index.js'

/**
 * Select components based on wizard data
 */
export function selectComponents(wizardData) {
  const {
    industry = '',
    businessType = '',
    desiredPages = [],
    tone = [],
    colorDirections = []
  } = wizardData

  const selected = {
    header: null,
    hero: null,
    sections: [],
    footer: null
  }

  // Select header
  selected.header = getComponent('headers', 'sticky-transparent')

  // Select hero based on industry and tone
  if (tone.includes('Bold') || tone.includes('Modern')) {
    selected.hero = getComponent('heroes', 'centered')
  } else {
    selected.hero = getComponent('heroes', 'centered') // Default for now
  }

  // Select hero based on tone and industry
  if (tone.includes('Bold') || tone.includes('Modern') || industry === 'Creative & Design') {
    selected.hero = getComponent('heroes', 'split')
  } else {
    selected.hero = getComponent('heroes', 'centered')
  }

  // Select sections based on desired pages
  if (desiredPages.includes('About')) {
    // Choose about variant based on business type
    const aboutVariant = businessType === 'Agency / Studio' ? 'team' : 'story'
    selected.sections.push({
      type: 'about',
      variant: aboutVariant,
      order: 1
    })
  }

  if (desiredPages.includes('Services') || desiredPages.includes('Features')) {
    // Choose features variant based on number of services
    const featuresVariant = (wizardData.businessDocs?.services?.length || 0) > 6 ? 'tabbed' : 'grid'
    selected.sections.push({
      type: 'features',
      variant: featuresVariant,
      order: 2
    })
  }

  if (desiredPages.includes('Testimonials')) {
    selected.sections.push({
      type: 'testimonials',
      variant: 'carousel',
      order: 3
    })
  }

  if (desiredPages.includes('Contact')) {
    selected.sections.push({
      type: 'contact',
      variant: 'form-info',
      order: 4
    })
  }

  // Select footer
  selected.footer = {
    type: 'footer',
    variant: 'standard',
    order: 99
  }

  return selected
}

/**
 * Generate component props from wizard data
 */
export function generateComponentProps(componentType, variant, wizardData) {
  const {
    businessName = '',
    businessDescription = '',
    audience = '',
    primaryCta = 'Get Started',
    tone = [],
    colorDirections = [],
    desiredPages = [],
    industry = '',
    businessDocs = {}
  } = wizardData

  const props = {}

  switch (componentType) {
    case 'hero':
      if (variant === 'split') {
        props.headline = businessName 
          ? `Welcome to ${businessName}`
          : 'The Smartest Way to Build Websites'
        props.subtext = businessDescription || 'Stop wrestling with complicated builders. Just talk to our AI, and watch your perfect website come to life.'
        props.primaryCta = primaryCta || 'Get Started Free'
        props.secondaryCta = 'See Examples'
        props.badge = industry ? `${industry} Solutions` : null
      } else {
        props.headline = businessName 
          ? `Welcome to ${businessName}`
          : 'Build Your Dream Website'
        props.subtext = businessDescription || 'Professional website builder'
        props.primaryCta = primaryCta || 'Get Started'
        props.secondaryCta = 'Learn More'
        
        // Apply color scheme
        if (colorDirections.includes('dark')) {
          props.backgroundGradient = `linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)`
        } else if (colorDirections.includes('warm')) {
          props.backgroundGradient = `linear-gradient(135deg, #D4A373 0%, #CCD5AE 50%, #FEFAE0 100%)`
        } else {
          props.backgroundGradient = `linear-gradient(135deg, #1A7A6D 0%, #2EC4B6 50%, #D4A843 100%)`
        }
      }
      break

    case 'header':
      props.logo = businessName || 'byeNU'
      const navItems = []
      if (desiredPages.includes('Home') || desiredPages.length === 0) navItems.push({ label: 'Home', href: '#home' })
      if (desiredPages.includes('About')) navItems.push({ label: 'About', href: '#about' })
      if (desiredPages.includes('Services') || desiredPages.includes('Features')) navItems.push({ label: 'Services', href: '#services' })
      if (desiredPages.includes('Contact')) navItems.push({ label: 'Contact', href: '#contact' })
      props.navItems = navItems.length > 0 ? navItems : [
        { label: 'Home', href: '#home' },
        { label: 'About', href: '#about' },
        { label: 'Services', href: '#services' },
        { label: 'Contact', href: '#contact' }
      ]
      props.ctaText = primaryCta || 'Get Started'
      break

    case 'about':
      if (variant === 'story') {
        props.title = `About ${businessName || 'Us'}`
        props.subtitle = businessDescription || 'How we\'re changing the way websites get built'
        props.paragraphs = [
          businessDocs?.businessDescription || businessDescription || 'We are dedicated to serving our customers with excellence.',
          businessDocs?.mission || 'Our mission is to provide exceptional service and value.',
          businessDocs?.values || 'We believe in integrity, innovation, and customer satisfaction.'
        ]
        props.highlightText = businessDescription || 'Building something great, one website at a time.'
      } else if (variant === 'team') {
        props.title = 'Meet the Team'
        props.subtitle = 'We\'re a small team obsessed with making website building accessible to everyone'
        props.team = businessDocs?.team || []
      }
      break

    case 'features':
      props.title = desiredPages.includes('Services') ? 'Our Services' : 'Everything You Need to Launch'
      props.subtitle = businessDescription || 'Professional features without the professional price tag'
      if (variant === 'grid') {
        props.features = businessDocs?.services || businessDocs?.features || []
      } else if (variant === 'tabbed') {
        props.tabs = businessDocs?.serviceCategories || []
      }
      break

    case 'testimonials':
      props.title = 'Loved by Entrepreneurs'
      props.subtitle = 'See what our customers are saying'
      props.testimonials = businessDocs?.testimonials || []
      break

    case 'contact':
      props.title = 'Get in Touch'
      props.subtitle = 'Have questions? We\'d love to hear from you. Send us a message and we\'ll respond within 24 hours.'
      props.contactInfo = {
        email: businessDocs?.email || '',
        phone: businessDocs?.phone || '',
        address: businessDocs?.address || null
      }
      break

    case 'footer':
      props.brandName = businessName || 'byeNU'
      props.tagline = businessDescription || 'Build professional websites in minutes with AI'
      props.footerLinks = {
        Product: ['Features', 'Pricing', 'Templates'],
        Company: ['About', 'Blog', 'Careers'],
        Resources: ['Help Center', 'Tutorials', 'API Docs'],
        Legal: ['Privacy', 'Terms', 'Security']
      }
      props.copyright = `© ${new Date().getFullYear()} ${businessName || 'byeNU'}. All rights reserved.`
      break

    default:
      break
  }

  return props
}

/**
 * Generate full page structure
 */
export function generatePageStructure(wizardData) {
  const components = selectComponents(wizardData)
  const structure = []

  // Add header
  if (components.header) {
    structure.push({
      type: 'header',
      component: components.header.component,
      variant: 'sticky-transparent',
      props: generateComponentProps('header', 'sticky-transparent', wizardData),
      order: 0
    })
  }

  // Add hero
  if (components.hero) {
    structure.push({
      type: 'hero',
      component: components.hero.component,
      variant: 'centered',
      props: generateComponentProps('hero', 'centered', wizardData),
      order: 1
    })
  }

  // Add sections
  components.sections.forEach(section => {
    structure.push({
      type: section.type,
      variant: section.variant,
      component: getComponent(section.type, section.variant)?.component || section.type,
      props: generateComponentProps(section.type, section.variant, wizardData),
      order: section.order
    })
  })

  // Add footer
  if (components.footer) {
    structure.push({
      type: 'footer',
      variant: components.footer.variant,
      component: getComponent('footers', components.footer.variant)?.component || 'StandardFooter',
      props: generateComponentProps('footer', components.footer.variant, wizardData),
      order: 99
    })
  }

  return structure.sort((a, b) => a.order - b.order)
}
