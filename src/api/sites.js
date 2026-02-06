import { supabase } from '../lib/supabase.js'
import { generatePageStructure } from './component-library.js'

/**
 * Generate site from submission/report after claim
 */
export async function generateSite(submissionId, membershipId) {
  // Get submission and report
  const { data: submission, error: subError } = await supabase
    .from('bye_nu.submissions')
    .select('*, bye_nu.reports(*)')
    .eq('id', submissionId)
    .single()

  if (subError) throw subError

  const wizardData = submission.wizard_data
  const report = submission.reports?.[0]

  // Generate component structure using component library
  const pageStructure = generatePageStructure(wizardData)

  // Step 1: Create CustomerProfile
  const profile = await createCustomerProfile(membershipId, wizardData)

  // Step 2: Create LayoutTemplate (now includes component structure)
  const template = await createLayoutTemplate(membershipId, wizardData, report, pageStructure)

  // Step 3: Update membership
  await supabase
    .from('bye_nu.memberships')
    .update({
      selected_template_id: template.id,
      site_status: 'ready',
    })
    .eq('id', membershipId)

  // Step 4: Update submission status
  await supabase
    .from('bye_nu.submissions')
    .update({
      status: 'site_generated',
    })
    .eq('id', submissionId)

  return {
    profileId: profile.id,
    templateId: template.id,
    pageStructure,
  }
}

/**
 * Create CustomerProfile from wizard data
 */
async function createCustomerProfile(membershipId, wizardData) {
  const {
    businessName,
    industry,
    businessType,
    goals,
    audience,
    tone,
    colorDirections,
    primaryCta,
    yearsOperational,
    domain,
    email,
    brandAssets,
  } = wizardData

  const { data, error } = await supabase
    .from('bye_nu.customer_profiles')
    .insert({
      membership_id: membershipId,
      business_name: businessName,
      industry: Array.isArray(industry) ? industry.join(', ') : industry,
      business_type: businessType,
      goal: Array.isArray(goals) ? goals[0] : goals || 'General business website',
      audience: audience,
      tone: Array.isArray(tone) ? tone.join(', ') : tone,
      color_directions: Array.isArray(colorDirections) ? colorDirections : (colorDirections ? [colorDirections] : []),
      primary_cta: primaryCta || 'Get Started',
      years_operational: yearsOperational,
      has_logo: brandAssets?.hasLogo || false,
      logo_url: brandAssets?.logoUrl || null,
      domain_info: domain || {},
      email_info: email || {},
    })
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * Create LayoutTemplate with site content
 * Now includes component structure from component library
 */
async function createLayoutTemplate(membershipId, wizardData, report, pageStructure = null) {
  const {
    businessName,
    goals,
    audience,
    primaryCta,
    tone,
    colorDirections,
    fonts,
    layout,
    businessDocs,
  } = wizardData

  // Determine layout style
  const layoutStyle = layout || 'hero-centered'

  // Determine color palette
  const colorPalette = Array.isArray(colorDirections) && colorDirections.length > 0
    ? colorDirections[0]
    : 'blue-professional'

  // Determine typography
  const typography = fonts?.fontPairingId
    ? {
        headingFont: fonts.headingFont || 'Inter',
        bodyFont: fonts.bodyFont || 'Inter',
        pairingId: fonts.fontPairingId,
      }
    : {
        headingFont: 'Inter',
        bodyFont: 'Inter',
        pairingId: 'modern-sans',
      }

  // Generate site content
  const siteContent = generateSiteContent(wizardData, report)

  // Generate form schemas
  const formSchemas = generateFormSchemas(wizardData)

  const { data, error } = await supabase
    .from('bye_nu.layout_templates')
    .insert({
      membership_id: membershipId,
      template_id: `generated-${Date.now()}`,
      name: `${businessName || 'My'} Website`,
      layout_style: layoutStyle,
      color_palette: colorPalette,
      typography: typography,
      site_content: siteContent,
      form_schemas: formSchemas,
      component_structure: pageStructure || [], // Store component structure for rendering
    })
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * Generate site content sections from wizard data
 */
function generateSiteContent(wizardData, report) {
  const {
    businessName = '',
    businessDescription = '',
    audience = '',
    tone = [],
    desiredPages = [],
    formsNeeded = [],
    colorDirections = [],
  } = wizardData

  // Use report breakdown if available
  const breakdown = report?.breakdown_json || {}
  const focus = breakdown.focus || businessDescription || 'Professional business presence'

  const content = {
    hero: {
      title: businessName || 'Welcome',
      subtitle: businessDescription || focus,
      cta: 'Get Started',
      description: audience ? `Serving ${audience}` : 'Your business, beautifully presented',
    },
  }

  // Add about section (if About page is selected or always include)
  if (desiredPages.includes('About') || desiredPages.length === 0) {
    content.about = {
      title: `About ${businessName || 'Us'}`,
      content: businessDescription || `We are dedicated to serving ${audience || 'our customers'} with excellence and care.`,
      mission: businessDescription || `Our mission is to provide exceptional service to ${audience || 'our community'}.`,
    }
  }

  // Add services section (if Services page is selected)
  if (desiredPages.includes('Services')) {
    content.services = {
      title: 'Our Services',
      subtitle: `What we offer to ${audience || 'you'}`,
      items: [
        { 
          title: 'Service One', 
          description: 'Professional service tailored to your needs',
          icon: '⚡'
        },
        { 
          title: 'Service Two', 
          description: 'Expert solutions for your business',
          icon: '🎯'
        },
        { 
          title: 'Service Three', 
          description: 'Comprehensive support and guidance',
          icon: '✨'
        },
      ],
    }
  }

  // Add pricing section (if Pricing page is selected)
  if (desiredPages.includes('Pricing')) {
    content.pricing = {
      title: 'Pricing',
      subtitle: 'Choose the plan that works for you',
      plans: [
        {
          name: 'Starter',
          price: '$30',
          period: '/month',
          features: ['Basic features', 'Email support', '1 website'],
        },
        {
          name: 'Business',
          price: '$50',
          period: '/month',
          features: ['All features', 'Priority support', '3 websites'],
          featured: true,
        },
        {
          name: 'Pro',
          price: '$100',
          period: '/month',
          features: ['Everything', 'Dedicated support', '10 websites'],
        },
      ],
    }
  }

  // Add contact section (always include)
  content.contact = {
    title: 'Get In Touch',
    subtitle: "We'd love to hear from you",
    hasForm: formsNeeded.includes('Contact Form') || formsNeeded.length === 0,
    email: '', // Will be populated from user account
  }

  // Add pages based on desiredPages
  if (desiredPages.includes('Blog')) {
    content.blog = {
      title: 'Latest News',
      subtitle: 'Stay updated with our latest posts',
      posts: [], // Will be populated when blog is set up
    }
  }

  if (desiredPages.includes('Portfolio')) {
    content.portfolio = {
      title: 'Our Work',
      subtitle: 'See what we\'ve created',
      items: [], // Will be populated with portfolio items
    }
  }

  if (desiredPages.includes('Testimonials')) {
    content.testimonials = {
      title: 'What Our Clients Say',
      items: [], // Will be populated with testimonials
    }
  }

  if (desiredPages.includes('FAQ')) {
    content.faq = {
      title: 'Frequently Asked Questions',
      items: [
        { question: 'How does it work?', answer: 'We create your website based on your needs and preferences.' },
        { question: 'Can I customize my site?', answer: 'Yes! You can edit everything after your site is generated.' },
        { question: 'What support do you offer?', answer: 'We provide email support and comprehensive documentation.' },
      ],
    }
  }

  // Add metadata
  content.meta = {
    tone: Array.isArray(tone) ? tone : (tone ? [tone] : []),
    colorScheme: Array.isArray(colorDirections) && colorDirections.length > 0 
      ? colorDirections[0] 
      : 'mint',
    pages: desiredPages.length > 0 ? desiredPages : ['Home', 'About', 'Contact'],
    features: formsNeeded.length > 0 ? formsNeeded : ['Contact Form'],
  }

  return content
}

/**
 * Generate form schemas based on wizard data
 */
function generateFormSchemas(wizardData) {
  const { goals, formsNeeded } = wizardData

  const schemas = {}

  // Contact form (always included)
  schemas.contact = [
    { id: 'name', type: 'text', label: 'Name', required: true },
    { id: 'email', type: 'email', label: 'Email', required: true },
    { id: 'message', type: 'textarea', label: 'Message', required: true },
  ]

  // Booking form if goals include booking
  if (goals && Array.isArray(goals) && goals.includes('booking')) {
    schemas.booking = [
      { id: 'name', type: 'text', label: 'Name', required: true },
      { id: 'email', type: 'email', label: 'Email', required: true },
      { id: 'phone', type: 'tel', label: 'Phone', required: true },
      { id: 'date', type: 'date', label: 'Preferred Date', required: true },
      { id: 'time', type: 'time', label: 'Preferred Time', required: true },
      { id: 'notes', type: 'textarea', label: 'Additional Notes', required: false },
    ]
  }

  // Newsletter form if formsNeeded includes newsletter
  if (formsNeeded && Array.isArray(formsNeeded) && formsNeeded.includes('newsletter')) {
    schemas.newsletter = [
      { id: 'email', type: 'email', label: 'Email', required: true },
      { id: 'name', type: 'text', label: 'Name', required: false },
    ]
  }

  return schemas
}

/**
 * Get site by membership ID
 */
export async function getSite(membershipId) {
  const { data, error } = await supabase
    .from('bye_nu.memberships')
    .select(`
      *,
      bye_nu.customer_profiles(*),
      bye_nu.layout_templates(*)
    `)
    .eq('id', membershipId)
    .single()

  if (error) throw error
  return data
}
