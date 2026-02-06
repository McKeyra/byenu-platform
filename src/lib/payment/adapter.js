/**
 * Payment Adapter Interface
 * Swappable payment provider abstraction for Stripe → Helcim/Cardium
 */

export class PaymentError extends Error {
  constructor(message, code) {
    super(message)
    this.name = 'PaymentError'
    this.code = code
  }
}

/**
 * Payment Adapter Interface
 * All payment providers must implement this interface
 */
export class PaymentAdapter {
  /**
   * Create a checkout session
   * @param {Object} params
   * @param {string} params.plan - 'starter' | 'business' | 'pro'
   * @param {string} params.customerEmail
   * @param {string} params.successUrl
   * @param {string} params.cancelUrl
   * @returns {Promise<{sessionId: string, url: string}>}
   */
  async createCheckoutSession(params) {
    throw new Error('createCheckoutSession must be implemented')
  }

  /**
   * Handle webhook event
   * @param {Object} event - Webhook event payload
   * @returns {Promise<void>}
   */
  async handleWebhook(event) {
    throw new Error('handleWebhook must be implemented')
  }

  /**
   * Get subscription details
   * @param {string} subscriptionId
   * @returns {Promise<Object>}
   */
  async getSubscription(subscriptionId) {
    throw new Error('getSubscription must be implemented')
  }

  /**
   * Cancel a subscription
   * @param {string} subscriptionId
   * @returns {Promise<void>}
   */
  async cancelSubscription(subscriptionId) {
    throw new Error('cancelSubscription must be implemented')
  }
}
