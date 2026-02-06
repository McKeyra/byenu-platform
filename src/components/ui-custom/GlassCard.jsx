import React from 'react'
import { cn } from '@/utils/index.js'

export default function GlassCard({ 
  children, 
  className, 
  hover = true,
  variant = 'default',
  ...props 
}) {
  const variantClasses = {
    default: 'bg-white border-slate-200',
    subtle: 'bg-slate-50 border-slate-100',
    outlined: 'bg-transparent border-slate-200'
  }

  return (
    <div 
      className={cn(
        'rounded-2xl border',
        'shadow-sm',
        variantClasses[variant],
        hover && 'transition-all duration-300 hover:shadow-lg hover:border-slate-300',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
