import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../lib/auth/AuthContext.jsx'
import * as dashboardAPI from '../api/dashboard.js'

// ─── byeNU Client Dashboard Hooks ───

export function useUserWebsites() {
  const { user } = useAuth()
  
  return useQuery({
    queryKey: ['websites', user?.id],
    queryFn: () => dashboardAPI.getUserWebsites(user?.id),
    enabled: !!user?.id,
  })
}

export function useWebsite(websiteId) {
  return useQuery({
    queryKey: ['website', websiteId],
    queryFn: () => dashboardAPI.getWebsite(websiteId),
    enabled: !!websiteId,
  })
}

export function useWebsiteAnalytics(websiteId, dateRange = '30d') {
  return useQuery({
    queryKey: ['analytics', websiteId, dateRange],
    queryFn: () => dashboardAPI.getWebsiteAnalytics(websiteId, dateRange),
    enabled: !!websiteId,
  })
}

export function useUserCredits() {
  const { user } = useAuth()
  
  return useQuery({
    queryKey: ['credits', user?.id],
    queryFn: () => dashboardAPI.getUserCredits(user?.id),
    enabled: !!user?.id,
  })
}

export function useWebsiteTeam(websiteId) {
  return useQuery({
    queryKey: ['team', websiteId],
    queryFn: () => dashboardAPI.getWebsiteTeam(websiteId),
    enabled: !!websiteId,
  })
}

export function useWebsiteActivities(websiteId, limit = 10) {
  return useQuery({
    queryKey: ['activities', websiteId, limit],
    queryFn: () => dashboardAPI.getWebsiteActivities(websiteId, limit),
    enabled: !!websiteId,
  })
}

export function useUpdateWebsite() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ websiteId, updates }) => dashboardAPI.updateWebsite(websiteId, updates),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['website', data.id] })
      queryClient.invalidateQueries({ queryKey: ['websites'] })
    },
  })
}

export function useInviteTeamMember() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ websiteId, email, role }) => dashboardAPI.inviteTeamMember(websiteId, email, role),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['team', variables.websiteId] })
    },
  })
}
