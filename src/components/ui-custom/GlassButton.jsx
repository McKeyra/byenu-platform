import React from 'react'
import { cn } from '@/utils/index.js'

export default function GlassButton({ 
  children, 
  variant = 'primary',
  size = 'default',
  className,
  disabled,
  ...props 
}) {
  const variants = {
    primary: 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg',
    secondary: 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300',
    ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900',
    amber: 'bg-amber-500 text-white hover:bg-amber-600 shadow-lg shadow-amber-500/20'
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    default: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  return (
    <button 
      disabled={disabled}
      className={cn(
        'rounded-xl font-semibold transition-all duration-300',
        'focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      <span className="flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  )
}
