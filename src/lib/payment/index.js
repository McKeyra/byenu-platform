/**
 * Payment Provider Factory
 * Swap providers here without changing callers
 */

import { getPaymentAdapter as getStripeAdapter } from './stripe.js'
// Future: import { getPaymentAdapter as getHelcimAdapter } from './helcim.js'
// Future: import { getPaymentAdapter as getCardiumAdapter } from './cardium.js'

const PAYMENT_PROVIDER = import.meta.env.VITE_PAYMENT_PROVIDER || 'stripe'

export function getPaymentAdapter() {
  switch (PAYMENT_PROVIDER) {
    case 'stripe':
      return getStripeAdapter()
    // case 'helcim':
    //   return getHelcimAdapter()
    // case 'cardium':
    //   return getCardiumAdapter()
    default:
      return getStripeAdapter()
  }
}

export { PaymentError } from './adapter.js'
export { stripePublishableKey } from './stripe.js'
