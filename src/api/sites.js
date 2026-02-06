import { supabase } from '../lib/supabase.js'

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

  // Step 1: Create CustomerProfile
  const profile = await createCustomerProfile(membershipId, wizardData)

  // Step 2: Create LayoutTemplate
  const template = await createLayoutTemplate(membershipId, wizardData, report)

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
 */
async function createLayoutTemplate(membershipId, wizardData, report) {
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
    })
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * Generate site content sections
 */
function generateSiteContent(wizardData, report) {
  const {
    businessName,
    goals,
    audience,
    primaryCta,
    businessDocs,
    industry,
  } = wizardData

  const content = {
    hero: {
      title: businessName || 'Welcome',
      subtitle: goals && Array.isArray(goals) && goals.length > 0
        ? `${goals[0]} for ${audience || 'our community'}`
        : `Serving ${audience || 'our community'}`,
      cta: primaryCta || 'Get Started',
    },
  }

  // Add about section
  content.about = {
    title: `About ${businessName || 'Us'}`,
    content: businessDocs?.businessDescription
      || `We are a ${industry || 'business'} dedicated to serving ${audience || 'our customers'}.`,
  }

  // Add services section if goals include service-related items
  if (goals && Array.isArray(goals) && (goals.includes('showcase') || goals.includes('sell'))) {
    content.services = {
      title: 'Our Services',
      subtitle: `What we offer to ${audience || 'you'}`,
      items: [
        { title: 'Service 1', description: 'Description of your first service' },
        { title: 'Service 2', description: 'Description of your second service' },
        { title: 'Service 3', description: 'Description of your third service' },
      ],
    }
  }

  // Add contact section
  content.contact = {
    title: 'Get In Touch',
    subtitle: "We'd love to hear from you",
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
