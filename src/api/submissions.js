import { supabase } from '../lib/supabase.js'

/**
 * Create a submission (from wizard)
 * Also creates user account if doesn't exist (for email verification flow)
 */
export async function createSubmission({ source, wizardType, email, wizardData, staffId = null }) {
  // Create or get user account
  // Note: User account creation will be handled by n8n webhook, but we can pre-create it here
  // This allows immediate dashboard access while email verification happens
  
  const { data, error } = await supabase
    .from('bye_nu.submissions')
    .insert({
      source, // 'user' | 'staff'
      staff_id: staffId,
      wizard_type: wizardType, // 'quick' | 'full' | 'ai'
      email,
      wizard_data: wizardData,
      status: 'draft',
    })
    .select()
    .single()

  if (error) throw error
  
  // Note: User account creation and welcome email will be handled by n8n webhook
  // when report is generated. This allows n8n to send password creation link.
  
  return data
}

/**
 * Get submission by ID
 */
export async function getSubmission(submissionId) {
  const { data, error } = await supabase
    .from('bye_nu.submissions')
    .select('*')
    .eq('id', submissionId)
    .single()

  if (error) throw error
  return data
}

/**
 * Get submissions for user
 */
export async function getUserSubmissions(userId) {
  const { data, error } = await supabase
    .from('bye_nu.submissions')
    .select('*, bye_nu.reports(*)')
    .eq('source', 'user')
    .eq('email', userId) // Or use user_id if linked
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

/**
 * Update submission
 */
export async function updateSubmission(submissionId, updates) {
  const { data, error } = await supabase
    .from('bye_nu.submissions')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', submissionId)
    .select()
    .single()

  if (error) throw error
  return data
}
