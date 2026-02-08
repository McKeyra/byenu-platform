import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getSite } from '../api/sites.js'
import PageRenderer from '../components/renderer/PageRenderer.jsx'
import { Loader2 } from 'lucide-react'

/**
 * Public Site Page
 * Renders a generated website for public viewing
 * URL format: /site?membershipId=xxx or /site?subdomain=xxx
 */
export default function Site() {
  const [searchParams] = useSearchParams()
  const membershipId = searchParams.get('membershipId')
  const subdomain = searchParams.get('subdomain')
  const [componentStructure, setComponentStructure] = useState(null)

  // Fetch site data
  const { data: siteData, isLoading, error } = useQuery({
    queryKey: ['site', membershipId || subdomain],
    queryFn: async () => {
      if (membershipId) {
        return await getSite(membershipId)
      } else if (subdomain) {
        // Fetch by subdomain
        const { supabase } = await import('../lib/supabase.js')
        const { data, error } = await supabase
          .from('websites')
          .select(`
            *,
            bye_nu.customer_profiles(*),
            bye_nu.layout_templates(*)
          `)
          .eq('subdomain', subdomain)
          .eq('status', 'published')
          .single()
        
        if (error) throw error
        return data
      }
      throw new Error('No membershipId or subdomain provided')
    },
    enabled: !!(membershipId || subdomain),
  })

  useEffect(() => {
    if (siteData) {
      // Extract component structure from layout_templates or websites table
      const structure = 
        siteData.layout_templates?.[0]?.component_structure ||
        siteData.component_structure ||
        siteData.pages_json ||
        null
      
      setComponentStructure(structure)
    }
  }, [siteData])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading site...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-slate-900">Site Not Found</h1>
          <p className="text-slate-600 mb-4">
            {error.message || 'The site you\'re looking for doesn\'t exist or isn\'t published yet.'}
          </p>
        </div>
      </div>
    )
  }

  if (!siteData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-slate-900">Site Not Found</h1>
          <p className="text-slate-600">
            Please provide a valid membershipId or subdomain.
          </p>
        </div>
      </div>
    )
  }

  // Render the site using PageRenderer
  return (
    <PageRenderer
      structure={componentStructure}
      siteContent={siteData.layout_templates?.[0]?.site_content}
    />
  )
}
