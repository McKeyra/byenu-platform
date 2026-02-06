import React from 'react'

export default function Logo({ size = 'default', showText = true }) {
  const sizes = {
    small: { icon: 'w-8 h-8', text: 'text-lg' },
    default: { icon: 'w-10 h-10', text: 'text-xl' },
    large: { icon: 'w-14 h-14', text: 'text-2xl' }
  }

  const s = sizes[size] || sizes.default

  return (
    <div className="flex items-center gap-2">
      {/* Abstract Earth Icon */}
      <div className={`${s.icon} relative`}>
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Outer glow */}
          <defs>
            <linearGradient id="earthGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          
          {/* Main circle - ocean */}
          <circle cx="20" cy="20" r="18" fill="url(#earthGradient)" opacity="0.15" />
          <circle cx="20" cy="20" r="18" stroke="url(#earthGradient)" strokeWidth="2" fill="none" />
          
          {/* Abstract land masses */}
          <path 
            d="M12 14 Q16 10 22 12 Q26 14 24 20 Q22 24 16 22 Q12 20 12 14Z" 
            fill="url(#landGradient)" 
            opacity="0.8"
          />
          <path 
            d="M26 24 Q30 22 32 26 Q32 30 28 30 Q24 30 26 24Z" 
            fill="url(#landGradient)" 
            opacity="0.6"
          />
          <path 
            d="M8 26 Q10 24 14 26 Q16 28 12 30 Q8 30 8 26Z" 
            fill="url(#landGradient)" 
            opacity="0.5"
          />
          
          {/* Orbit line */}
          <ellipse 
            cx="20" 
            cy="20" 
            rx="22" 
            ry="8" 
            stroke="url(#earthGradient)" 
            strokeWidth="1.5" 
            fill="none" 
            opacity="0.4"
            transform="rotate(-20 20 20)"
          />
          
          {/* Small dot on orbit */}
          <circle cx="38" cy="14" r="2" fill="#f59e0b" />
        </svg>
      </div>
      
      {showText && (
        <span className={`${s.text} font-black tracking-tight`}>
          <span className="text-slate-900">bye</span>
          <span className="text-slate-400">NU</span>
        </span>
      )}
    </div>
  )
}
