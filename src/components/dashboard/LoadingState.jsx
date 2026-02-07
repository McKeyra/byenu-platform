import React from 'react'
import { C } from '../../theme/constants.js'
import { S } from '../../theme/sport-constants.js'
import { Loader2 } from 'lucide-react'

export function DashboardLoadingSkeleton({ theme = 'corp' }) {
  const colors = theme === 'sport' ? S : C
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      padding: '32px'
    }}>
      {/* Header skeleton */}
      <div style={{
        height: '48px',
        width: '300px',
        background: colors.surface || colors.white,
        borderRadius: '8px',
        animation: 'pulse 1.5s ease-in-out infinite'
      }} />
      
      {/* Cards skeleton */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '24px'
      }}>
        {[1, 2, 3, 4].map(i => (
          <div
            key={i}
            style={{
              height: '120px',
              background: colors.surface || colors.white,
              border: `1px solid ${colors.border}`,
              borderRadius: '16px',
              padding: '24px',
              animation: 'pulse 1.5s ease-in-out infinite'
            }}
          />
        ))}
      </div>
      
      {/* Chart skeleton */}
      <div style={{
        height: '300px',
        background: colors.surface || colors.white,
        border: `1px solid ${colors.border}`,
        borderRadius: '20px',
        padding: '32px',
        animation: 'pulse 1.5s ease-in-out infinite'
      }} />
      
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}

export function LoadingSpinner({ size = 24, color }) {
  return (
    <Loader2 
      size={size} 
      style={{ 
        animation: 'spin 1s linear infinite',
        color: color || 'currentColor'
      }} 
    />
  )
}

export function ErrorState({ message = 'Something went wrong', onRetry }) {
  return (
    <div style={{
      padding: '48px',
      textAlign: 'center',
      color: C.gray
    }}>
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
      <div style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px', color: C.charcoal }}>
        {message}
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            marginTop: '16px',
            padding: '12px 24px',
            background: C.mint,
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Try Again
        </button>
      )}
    </div>
  )
}
