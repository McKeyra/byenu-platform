import React from 'react'
import GlassCard from '../components/ui-custom/GlassCard.jsx'

export default function Site() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <GlassCard className="p-8 max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">Public Site</h1>
        <p className="text-slate-600">
          Public site view - Coming soon. This will render the generated website
          for public viewing.
        </p>
      </GlassCard>
    </div>
  )
}
