import { supabase } from '../lib/supabase.js'

// ─── ENUW Key Master Dashboard API ───

/**
 * Get all ventures
 */
export async function getVentures() {
  const { data, error } = await supabase
    .from('ventures')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: true })

  if (error) throw error
  return data || []
}

/**
 * Get venture by ID or slug
 */
export async function getVenture(idOrSlug) {
  const { data, error } = await supabase
    .from('ventures')
    .select('*')
    .or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`)
    .single()

  if (error) throw error
  return data
}

/**
 * Get metrics for a venture
 */
export async function getVentureMetrics(ventureId, days = 90) {
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  const { data, error } = await supabase
    .from('metrics')
    .select('*')
    .eq('venture_id', ventureId)
    .gte('timestamp', startDate.toISOString())
    .order('timestamp', { ascending: true })

  if (error) throw error
  return data || []
}

/**
 * Get latest metric value for a venture
 */
export async function getLatestMetric(ventureId, metricName) {
  const { data, error } = await supabase
    .from('metrics')
    .select('*')
    .eq('venture_id', ventureId)
    .eq('metric_name', metricName)
    .order('timestamp', { ascending: false })
    .limit(1)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data
}

/**
 * Calculate portfolio totals
 */
export async function getPortfolioTotals() {
  const ventures = await getVentures()
  
  // Get MRR for each venture
  const mrrPromises = ventures.map(v => getLatestMetric(v.id, 'mrr'))
  const mrrs = await Promise.all(mrrPromises)
  
  const totalMRR = mrrs.reduce((sum, m) => sum + (parseFloat(m?.value) || 0), 0)
  
  // Get cash position
  const cashMetric = await getLatestMetric(ventures[0]?.id, 'cash_position')
  const cashPosition = parseFloat(cashMetric?.value) || 0
  
  // Get active users
  const usersMetric = await getLatestMetric(ventures[0]?.id, 'active_users')
  const activeUsers = parseInt(usersMetric?.value) || 0
  
  return {
    totalMRR,
    cashPosition,
    activeUsers,
    momentum: 12.5 // TODO: Calculate from trend
  }
}

/**
 * Calculate vitality index for a venture
 */
export async function calculateVitalityIndex(ventureId) {
  // Get key metrics
  const metrics = await getVentureMetrics(ventureId, 30)
  
  // Simple calculation based on recent metrics
  // TODO: Implement actual vitality algorithm
  const mrr = await getLatestMetric(ventureId, 'mrr')
  const growth = await getLatestMetric(ventureId, 'growth_rate')
  
  // Mock calculation - replace with real algorithm
  let score = 50 // Base score
  
  if (mrr) score += 20
  if (growth && parseFloat(growth.value) > 0) score += 15
  if (metrics.length > 0) score += 15
  
  return Math.min(100, Math.max(0, score))
}
