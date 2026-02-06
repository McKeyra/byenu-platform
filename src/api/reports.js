import { supabase } from '../lib/supabase.js'
import { sendReportEmail as sendEmail } from './email.js'
import { notifyReportCreated } from './webhooks.js'

/**
 * Generate report from submission
 */
export async function generateReport(submissionId) {
  // Get submission data
  const { data: submission, error: subError } = await supabase
    .from('bye_nu.submissions')
    .select('*')
    .eq('id', submissionId)
    .single()

  if (subError) throw subError

  // Build full build prompt from wizard data
  const buildPrompt = buildPromptFromWizardData(submission.wizard_data)

  // Generate breakdown (for now, rule-based; later can use LLM)
  const breakdown = generateBreakdown(submission.wizard_data)

  // Create report
  const { data: report, error: reportError } = await supabase
    .from('bye_nu.reports')
    .insert({
      submission_id: submissionId,
      build_prompt: buildPrompt,
      breakdown_json: breakdown,
    })
    .select()
    .single()

  if (reportError) throw reportError

  // Update submission
  await supabase
    .from('bye_nu.submissions')
    .update({
      report_id: report.id,
      status: 'report_sent',
    })
    .eq('id', submissionId)

  // Trigger n8n webhook (async, don't wait)
  // n8n will handle: welcome email, report email, reminder scheduling
  try {
    await notifyReportCreated(report, submission)
  } catch (webhookError) {
    console.error('Failed to trigger n8n webhook:', webhookError)
    // Don't throw - report is still created
  }

  // Legacy email function (can be removed once n8n is fully set up)
  // try {
  //   await sendEmail(report.id, submission.email, {
  //     breakdown: report.breakdown_json,
  //     businessName: submission.wizard_data?.businessName,
  //     buildPrompt: report.build_prompt
  //   })
  // } catch (emailError) {
  //   console.error('Failed to send report email:', emailError)
  // }

  return report
}

/**
 * Build prompt from wizard data
 */
function buildPromptFromWizardData(wizardData) {
  const {
    businessName,
    industry,
    businessType,
    goals,
    audience,
    primaryCta,
    tone,
    colorDirections,
    desiredPages,
    formsNeeded,
  } = wizardData

  return `Build a website for ${businessName || 'this business'} in the ${industry || ''} industry.

Business Type: ${businessType || ''}
Primary Goals: ${Array.isArray(goals) ? goals.join(', ') : goals || ''}
Target Audience: ${audience || ''}
Primary CTA: ${primaryCta || 'Get Started'}

Design Direction:
- Tone: ${Array.isArray(tone) ? tone.join(', ') : tone || 'Professional'}
- Colors: ${Array.isArray(colorDirections) ? colorDirections.join(', ') : colorDirections || 'Blue'}

Pages Needed: ${Array.isArray(desiredPages) ? desiredPages.join(', ') : 'Home, About, Contact'}
Forms Needed: ${Array.isArray(formsNeeded) ? formsNeeded.join(', ') : 'Contact'}

Create a professional, modern website that converts visitors into customers.`
}

/**
 * Generate breakdown JSON
 */
function generateBreakdown(wizardData) {
  const { goals, tone, colorDirections, industry } = wizardData

  const focus = Array.isArray(goals) && goals.length > 0
    ? goals[0]
    : 'General business presence'

  const fonts = {
    heading: 'Inter',
    body: 'Inter',
  }

  const imagery = tone?.includes('professional') || tone?.includes('corporate')
    ? 'Professional photography, clean backgrounds, business-focused'
    : tone?.includes('creative')
    ? 'Bold visuals, creative layouts, artistic imagery'
    : 'Modern, clean imagery with authentic feel'

  const monetization = []
  if (wizardData.formsNeeded?.includes('contact')) {
    monetization.push('Contact forms for lead generation')
  }
  if (wizardData.formsNeeded?.includes('booking')) {
    monetization.push('Booking system for appointments')
  }
  if (wizardData.formsNeeded?.includes('newsletter')) {
    monetization.push('Newsletter signup for email marketing')
  }
  if (wizardData.desiredPages?.includes('pricing')) {
    monetization.push('Pricing page for service packages')
  }

  return {
    focus,
    fonts,
    imagery,
    monetization: monetization.length > 0 ? monetization : ['Contact forms', 'Email capture'],
  }
}

/**
 * Get report by ID
 */
export async function getReport(reportId) {
  const { data, error } = await supabase
    .from('bye_nu.reports')
    .select('*, bye_nu.submissions(*)')
    .eq('id', reportId)
    .single()

  if (error) throw error
  return data
}

/**
 * Send report email
 */
export async function sendReportEmail(reportId, email) {
  // Get report data
  const { data: report, error: reportError } = await supabase
    .from('bye_nu.reports')
    .select('*, bye_nu.submissions(*)')
    .eq('id', reportId)
    .single()

  if (reportError) throw reportError

  // Send email via email service
  return await sendEmail(reportId, email, {
    breakdown: report.breakdown_json,
    businessName: report.submissions?.wizard_data?.businessName,
    buildPrompt: report.build_prompt
  })
}
