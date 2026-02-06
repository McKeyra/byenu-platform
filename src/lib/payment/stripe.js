import Stripe from 'stripe'
import { PaymentAdapter, PaymentError } from './adapter.js'

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
const stripeSecretKey = import.meta.env.STRIPE_SECRET_KEY

if (!stripePublishableKey) {
  console.warn('Stripe publishable key not found')
}

const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null

// Plan pricing (CAD)
const PLAN_PRICES = {
  starter: 3000, // $30.00 CAD in cents
  business: 5000, // $50.00 CAD in cents
  pro: 10000, // $100.00 CAD in cents
}

export class StripeAdapter extends PaymentAdapter {
  constructor() {
    super()
    if (!stripe) {
      throw new Error('Stripe secret key not configured')
    }
  }

  async createCheckoutSession({ plan, customerEmail, successUrl, cancelUrl }) {
    try {
      const priceId = PLAN_PRICES[plan]
      if (!priceId) {
        throw new PaymentError(`Invalid plan: ${plan}`, 'INVALID_PLAN')
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'cad',
              product_data: {
                name: `${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan`,
                description: `byeNU ${plan} plan subscription`,
              },
              unit_amount: priceId,
              recurring: {
                interval: 'month',
              },
            },
            quantity: 1,
          },
        ],
        mode: 'subscription',
        customer_email: customerEmail,
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
          plan,
        },
      })

      return {
        sessionId: session.id,
        url: session.url,
      }
    } catch (error) {
      throw new PaymentError(
        error.message || 'Failed to create checkout session',
        error.code || 'STRIPE_ERROR'
      )
    }
  }

  async handleWebhook(event) {
    // Webhook handling should be done in backend/Edge Function
    // This is a placeholder for the interface
    if (event.type === 'checkout.session.completed') {
      // Handle successful payment
      const session = event.data.object
      return {
        sessionId: session.id,
        customerEmail: session.customer_email,
        plan: session.metadata?.plan,
      }
    }
    return null
  }

  async getSubscription(subscriptionId) {
    try {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId)
      return {
        id: subscription.id,
        status: subscription.status,
        plan: subscription.metadata?.plan,
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      }
    } catch (error) {
      throw new PaymentError(
        error.message || 'Failed to get subscription',
        error.code || 'STRIPE_ERROR'
      )
    }
  }

  async cancelSubscription(subscriptionId) {
    try {
      await stripe.subscriptions.cancel(subscriptionId)
    } catch (error) {
      throw new PaymentError(
        error.message || 'Failed to cancel subscription',
        error.code || 'STRIPE_ERROR'
      )
    }
  }
}

// Export Stripe publishable key for frontend
export { stripePublishableKey }

// Factory function to get payment adapter
export function getPaymentAdapter() {
  // For now, always return Stripe
  // Later, can swap to HelcimAdapter or CardiumAdapter
  if (!stripe) {
    throw new Error('Payment provider not configured')
  }
  return new StripeAdapter()
}
