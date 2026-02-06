import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../lib/auth/AuthContext.jsx'
import { createMembership } from '../api/memberships.js'
import { generateSite } from '../api/sites.js'
import GlassCard from '../components/ui-custom/GlassCard.jsx'
import GlassButton from '../components/ui-custom/GlassButton.jsx'
import { CheckCircle, Loader2 } from 'lucide-react'

export default function ClaimSuccess() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [isProcessing, setIsProcessing] = useState(true)
  const [error, setError] = useState(null)

  const submissionId = searchParams.get('submission')
  const plan = searchParams.get('plan')

  useEffect(() => {
    const processClaim = async () => {
      if (!user || !submissionId || !plan) {
        setError('Missing required information')
        setIsProcessing(false)
        return
      }

      try {
        // Create membership
        const membership = await createMembership({
          userId: user.id,
          plan,
          submissionId,
        })

        // Generate site from report
        await generateSite(submissionId, membership.id)

        setIsProcessing(false)
      } catch (err) {
        console.error('Error processing claim:', err)
        setError(err.message || 'Error processing claim')
        setIsProcessing(false)
      }
    }

    processClaim()
  }, [user, submissionId, plan])

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <GlassCard className="p-12 text-center max-w-md">
          <Loader2 className="w-12 h-12 animate-spin text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Processing Your Claim</h2>
          <p className="text-slate-600">Setting up your website...</p>
        </GlassCard>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <GlassCard className="p-12 text-center max-w-md">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">❌</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p className="text-slate-600 mb-6">{error}</p>
          <Link to="/dashboard">
            <GlassButton variant="primary">Go to Dashboard</GlassButton>
          </Link>
        </GlassCard>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <GlassCard className="p-12 text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Welcome to {plan}!</h2>
        <p className="text-slate-600 mb-8">
          Your website is being generated. You'll receive an email when it's ready.
        </p>
        <Link to="/dashboard">
          <GlassButton variant="amber" size="lg" className="w-full">
            Go to Dashboard
          </GlassButton>
        </Link>
      </GlassCard>
    </div>
  )
}
