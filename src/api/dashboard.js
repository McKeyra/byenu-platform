import { supabase } from '../lib/supabase.js'

// ─── byeNU Client Dashboard API ───

/**
 * Get user's website(s)
 */
export async function getUserWebsites(userId) {
  const { data, error } = await supabase
    .from('websites')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })

  if (error) throw error
  return data || []
}

/**
 * Get website by ID
 */
export async function getWebsite(websiteId) {
  const { data, error } = await supabase
    .from('websites')
    .select('*')
    .eq('id', websiteId)
    .single()

  if (error) throw error
  return data
}

/**
 * Update website
 */
export async function updateWebsite(websiteId, updates) {
  const { data, error } = await supabase
    .from('websites')
    .update(updates)
    .eq('id', websiteId)
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * Get website analytics (aggregated)
 */
export async function getWebsiteAnalytics(websiteId, dateRange = '30d') {
  const now = new Date()
  const daysAgo = dateRange === '7d' ? 7 : dateRange === '90d' ? 90 : 30
  const startDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000)

  // Get pageviews
  const { data: pageviews, error: pvError } = await supabase
    .from('analytics_events')
    .select('*')
    .eq('website_id', websiteId)
    .eq('event_type', 'pageview')
    .gte('created_at', startDate.toISOString())

  if (pvError) throw pvError

  // Get unique visitors (by visitor_id)
  const uniqueVisitors = new Set(pageviews?.map(e => e.visitor_id)).size

  // Get top pages
  const pageCounts = {}
  pageviews?.forEach(event => {
    const page = event.page || '/'
    pageCounts[page] = (pageCounts[page] || 0) + 1
  })

  const topPages = Object.entries(pageCounts)
    .map(([path, views]) => ({ path, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 10)

  // Get traffic sources
  const referrerCounts = {}
  pageviews?.forEach(event => {
    const referrer = event.referrer || 'direct'
    referrerCounts[referrer] = (referrerCounts[referrer] || 0) + 1
  })

  const total = pageviews?.length || 0
  const trafficSources = Object.entries(referrerCounts)
    .map(([source, count]) => ({
      source: source === 'direct' ? 'Direct' : source,
      value: count,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0
    }))
    .sort((a, b) => b.value - a.value)

  return {
    visitors: uniqueVisitors,
    pageViews: pageviews?.length || 0,
    topPages,
    trafficSources,
    dateRange
  }
}

/**
 * Get user's credit balance
 */
export async function getUserCredits(userId) {
  const { data, error } = await supabase
    .from('credits')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error && error.code !== 'PGRST116') throw error // PGRST116 = no rows returned
  return data || { balance: 0, limit: 1000, plan: 'starter' }
}

/**
 * Get team members for a website
 */
export async function getWebsiteTeam(websiteId) {
  const { data, error } = await supabase
    .from('team_members')
    .select(`
      *,
      user:user_id (
        id,
        email
      )
    `)
    .eq('website_id', websiteId)
    .eq('status', 'active')

  if (error) throw error
  return data || []
}

/**
 * Invite team member
 */
export async function inviteTeamMember(websiteId, email, role = 'viewer') {
  // First, get the user by email (or create invitation)
  const { data, error } = await supabase
    .from('team_members')
    .insert({
      website_id: websiteId,
      email, // Store email if user doesn't exist yet
      role,
      status: 'pending'
    })
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * Get recent activities for a website
 */
export async function getWebsiteActivities(websiteId, limit = 10) {
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .eq('entity_type', 'website')
    .eq('entity_id', websiteId)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data || []
}
