import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as venturesAPI from '../api/ventures.js'
import * as leadsAPI from '../api/leads.js'
import * as pipelineAPI from '../api/pipeline.js'

// ─── ENUW Key Master Dashboard Hooks ───

export function useVentures() {
  return useQuery({
    queryKey: ['ventures'],
    queryFn: venturesAPI.getVentures,
  })
}

export function useVenture(idOrSlug) {
  return useQuery({
    queryKey: ['venture', idOrSlug],
    queryFn: () => venturesAPI.getVenture(idOrSlug),
    enabled: !!idOrSlug,
  })
}

export function useVentureMetrics(ventureId, days = 90) {
  return useQuery({
    queryKey: ['venture-metrics', ventureId, days],
    queryFn: () => venturesAPI.getVentureMetrics(ventureId, days),
    enabled: !!ventureId,
  })
}

export function usePortfolioTotals() {
  return useQuery({
    queryKey: ['portfolio-totals'],
    queryFn: venturesAPI.getPortfolioTotals,
    refetchInterval: 60000, // Refetch every minute
  })
}

export function useVitalityIndex(ventureId) {
  return useQuery({
    queryKey: ['vitality', ventureId],
    queryFn: () => venturesAPI.calculateVitalityIndex(ventureId),
    enabled: !!ventureId,
    refetchInterval: 300000, // Refetch every 5 minutes
  })
}

export function useLeads(filters = {}) {
  return useQuery({
    queryKey: ['leads', filters],
    queryFn: () => leadsAPI.getLeads(filters),
  })
}

export function useHotLeads(limit = 5) {
  return useQuery({
    queryKey: ['hot-leads', limit],
    queryFn: () => leadsAPI.getHotLeads(limit),
    refetchInterval: 60000, // Refetch every minute
  })
}

export function useLead(leadId) {
  return useQuery({
    queryKey: ['lead', leadId],
    queryFn: () => leadsAPI.getLead(leadId),
    enabled: !!leadId,
  })
}

export function useCreateLead() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: leadsAPI.createLead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] })
      queryClient.invalidateQueries({ queryKey: ['hot-leads'] })
    },
  })
}

export function useUpdateLead() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ leadId, updates }) => leadsAPI.updateLead(leadId, updates),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['lead', data.id] })
      queryClient.invalidateQueries({ queryKey: ['leads'] })
      queryClient.invalidateQueries({ queryKey: ['hot-leads'] })
    },
  })
}

export function useDeals(filters = {}) {
  return useQuery({
    queryKey: ['deals', filters],
    queryFn: () => pipelineAPI.getDeals(filters),
  })
}

export function usePipelineTotals(filters = {}) {
  return useQuery({
    queryKey: ['pipeline-totals', filters],
    queryFn: () => pipelineAPI.getPipelineTotals(filters),
  })
}

export function useRecentActivities(limit = 20) {
  return useQuery({
    queryKey: ['activities', limit],
    queryFn: () => pipelineAPI.getRecentActivities(limit),
    refetchInterval: 30000, // Refetch every 30 seconds
  })
}

export function useCreateDeal() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: pipelineAPI.createDeal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deals'] })
      queryClient.invalidateQueries({ queryKey: ['pipeline-totals'] })
      queryClient.invalidateQueries({ queryKey: ['activities'] })
    },
  })
}

export function useUpdateDeal() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ dealId, updates }) => pipelineAPI.updateDeal(dealId, updates),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['deal', data.id] })
      queryClient.invalidateQueries({ queryKey: ['deals'] })
      queryClient.invalidateQueries({ queryKey: ['pipeline-totals'] })
      queryClient.invalidateQueries({ queryKey: ['activities'] })
    },
  })
}
