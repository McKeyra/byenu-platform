import React, { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/auth/AuthContext.jsx'
import { getPaymentAdapter } from '../lib/payment/index.js'
import { createMembership } from '../api/memberships.js'
import GlassCard from '../components/ui-custom/GlassCard.jsx'
import GlassButton from '../components/ui-custom/GlassButton.jsx'
import { Check } from 'lucide-react'
import { formatCurrency } from '../utils/index.js'

const PLANS = {
  starter: { name: 'Starter', price: 3000, features: ['1 Page Website', '1 Contact Form', 'Mobile Responsive'] },
  business: { name: 'Business', price: 5000, features: ['4 Page Website', '3 Contact Forms', 'Custom Domain', 'Email Support'] },
  pro: { name: 'Pro Builder', price: 10000, features: ['10 Page Website', '5 Contact Forms', 'Custom Domain', 'Priority Support', 'Advanced Templates'] },
}

export default function Claim() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [selectedPlan, setSelectedPlan] = useState('business')
  const [isProcessing, setIsProcessing] = useState(false)

  const submissionId = searchParams.get('submission')

  const handleClaim = async () => {
    if (!user) {
      alert('Please sign in to claim your website')
      return
    }

    setIsProcessing(true)
    try {
      const paymentAdapter = getPaymentAdapter()
      const { url } = await paymentAdapter.createCheckoutSession({
        plan: selectedPlan,
        customerEmail: user.email,
        successUrl: `${window.location.origin}/claim/success?submission=${submissionId}&plan=${selectedPlan}`,
        cancelUrl: `${window.location.origin}/claim?submission=${submissionId}`,
      })

      // Redirect to Stripe checkout
      window.location.href = url
    } catch (error) {
      console.error('Error creating checkout:', error)
      alert('Error processing payment. Please try again.')
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8 text-center">Claim Your Website</h1>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {Object.entries(PLANS).map(([id, plan]) => (
            <GlassCard
              key={id}
              className={`p-6 cursor-pointer transition-all ${
                selectedPlan === id ? 'ring-2 ring-amber-500' : ''
              }`}
              onClick={() => setSelectedPlan(id)}
            >
              {selectedPlan === id && (
                <div className="flex justify-end mb-2">
                  <Check className="w-6 h-6 text-amber-500" />
                </div>
              )}
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="text-3xl font-bold mb-4">
                {formatCurrency(plan.price)}
                <span className="text-sm font-normal text-slate-500">/mo</span>
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                    <Check className="w-4 h-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>

        <div className="text-center">
          <GlassButton
            variant="amber"
            size="lg"
            onClick={handleClaim}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : `Claim ${PLANS[selectedPlan].name} Plan`}
          </GlassButton>
          <p className="text-sm text-slate-500 mt-4">
            All prices in CAD. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  )
}
