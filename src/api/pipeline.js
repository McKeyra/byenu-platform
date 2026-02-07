import { supabase } from '../lib/supabase.js'

/**
 * Get all deals (with filters)
 */
export async function getDeals(filters = {}) {
  let query = supabase
    .from('deals')
    .select(`
      *,
      lead:lead_id (
        company_name,
        ai6_score
      ),
      venture:venture_id (
        name,
        slug,
        color
      )
    `)
    .order('created_at', { ascending: false })

  if (filters.venture_id) {
    query = query.eq('venture_id', filters.venture_id)
  }

  if (filters.stage) {
    query = query.eq('stage', filters.stage)
  }

  const { data, error } = await query

  if (error) throw error
  return data || []
}

/**
 * Get deal by ID
 */
export async function getDeal(dealId) {
  const { data, error } = await supabase
    .from('deals')
    .select(`
      *,
      lead:lead_id (*),
      venture:venture_id (*)
    `)
    .eq('id', dealId)
    .single()

  if (error) throw error
  return data
}

/**
 * Create a new deal
 */
export async function createDeal(dealData) {
  // Set probability based on stage
  const stageProbabilities = {
    discovery: 20,
    proposal: 40,
    negotiation: 60,
    contract: 80,
    closed: 100
  }

  const { data, error } = await supabase
    .from('deals')
    .insert({
      ...dealData,
      probability: dealData.probability || stageProbabilities[dealData.stage] || 20
    })
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * Update deal (including stage changes)
 */
export async function updateDeal(dealId, updates) {
  // Auto-update probability on stage change
  if (updates.stage) {
    const stageProbabilities = {
      discovery: 20,
      proposal: 40,
      negotiation: 60,
      contract: 80,
      closed: 100
    }
    updates.probability = stageProbabilities[updates.stage] || updates.probability
  }

  // Update days_in_stage if stage changed
  if (updates.stage) {
    updates.days_in_stage = 0
  } else {
    // Increment days_in_stage
    const deal = await getDeal(dealId)
    updates.days_in_stage = (deal.days_in_stage || 0) + 1
  }

  const { data, error } = await supabase
    .from('deals')
    .update(updates)
    .eq('id', dealId)
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * Get pipeline totals
 */
export async function getPipelineTotals(filters = {}) {
  const deals = await getDeals(filters)
  
  const totalPipeline = deals.reduce((sum, deal) => sum + parseFloat(deal.value || 0), 0)
  const weightedValue = deals.reduce((sum, deal) => {
    const probability = deal.probability || 0
    return sum + (parseFloat(deal.value || 0) * probability / 100)
  }, 0)
  
  // Calculate average velocity (days from creation to closed)
  const closedDeals = deals.filter(d => d.stage === 'closed' && d.closed_at)
  const avgVelocity = closedDeals.length > 0
    ? closedDeals.reduce((sum, deal) => {
        const days = Math.floor((new Date(deal.closed_at) - new Date(deal.created_at)) / (1000 * 60 * 60 * 24))
        return sum + days
      }, 0) / closedDeals.length
    : 0

  return {
    totalPipeline,
    weightedValue,
    avgVelocity: Math.round(avgVelocity),
    dealCount: deals.length
  }
}

/**
 * Get recent activities across all ventures
 */
export async function getRecentActivities(limit = 20) {
  const { data, error } = await supabase
    .from('activities')
    .select(`
      *,
      venture:venture_id (
        name,
        slug,
        color
      )
    `)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data || []
}
