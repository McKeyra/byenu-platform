import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind classes
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Create page URL from page name
 */
export function createPageUrl(pageName) {
  return '/' + pageName.toLowerCase().replace(/ /g, '-')
}

/**
 * Format currency (CAD)
 */
export function formatCurrency(amountInCents) {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
  }).format(amountInCents / 100)
}

/**
 * Format date
 */
export function formatDate(date) {
  return new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}
