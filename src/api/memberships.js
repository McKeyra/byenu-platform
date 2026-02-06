import { supabase } from '../lib/supabase.js'

/**
 * Create membership after claim
 */
export async function createMembership({ userId, plan, submissionId }) {
  const { data, error } = await supabase
    .from('bye_nu.memberships')
    .insert({
      user_id: userId,
      plan,
      status: 'active',
      site_status: 'draft',
    })
    .select()
    .single()

  if (error) throw error

  // Update submission status
  if (submissionId) {
    await supabase
      .from('bye_nu.submissions')
      .update({ status: 'claimed' })
      .eq('id', submissionId)
  }

  return data
}

/**
 * Get membership by user ID
 */
export async function getMembership(userId) {
  const { data, error } = await supabase
    .from('bye_nu.memberships')
    .select('*, bye_nu.customer_profiles(*), bye_nu.layout_templates(*)')
    .eq('user_id', userId)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data
}

/**
 * Update membership
 */
export async function updateMembership(membershipId, updates) {
  const { data, error } = await supabase
    .from('bye_nu.memberships')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', membershipId)
    .select()
    .single()

  if (error) throw error
  return data
}
