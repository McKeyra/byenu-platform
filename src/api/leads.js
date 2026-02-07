import { supabase } from '../lib/supabase.js'

/**
 * Get all leads (with filters)
 */
export async function getLeads(filters = {}) {
  let query = supabase
    .from('leads')
    .select('*')
    .order('ai6_score', { ascending: false })

  if (filters.venture_id) {
    query = query.eq('venture_id', filters.venture_id)
  }

  if (filters.tier) {
    query = query.eq('tier', filters.tier)
  }

  if (filters.stage) {
    query = query.eq('stage', filters.stage)
  }

  if (filters.search) {
    query = query.or(`company_name.ilike.%${filters.search}%,industry.ilike.%${filters.search}%`)
  }

  const { data, error } = await query

  if (error) throw error
  return data || []
}

/**
 * Get lead by ID
 */
export async function getLead(leadId) {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .eq('id', leadId)
    .single()

  if (error) throw error
  return data
}

/**
 * Create a new lead
 */
export async function createLead(leadData) {
  const { data, error } = await supabase
    .from('leads')
    .insert({
      ...leadData,
      tier: leadData.ai6_score >= 80 ? 'hot' : leadData.ai6_score >= 60 ? 'warm' : 'monitor'
    })
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * Update lead
 */
export async function updateLead(leadId, updates) {
  const { data, error } = await supabase
    .from('leads')
    .update(updates)
    .eq('id', leadId)
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * Get hot leads (top 5 by AI6 score)
 */
export async function getHotLeads(limit = 5) {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .eq('tier', 'hot')
    .order('ai6_score', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data || []
}
