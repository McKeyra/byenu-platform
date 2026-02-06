/**
 * Payment Adapter Interface
 * Swappable payment provider abstraction for Stripe → Helcim/Cardium
 */

export type Plan = 'starter' | 'business' | 'pro';

export interface CheckoutSessionParams {
  plan: Plan;
  customerEmail: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}

export interface CheckoutSession {
  sessionId: string;
  url: string;
}

export interface Subscription {
  id: string;
  status: 'active' | 'cancelled' | 'expired' | 'past_due';
  plan: Plan;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
}

export interface PaymentWebhookEvent {
  type: string;
  data: Record<string, any>;
}

export interface PaymentAdapter {
  /**
   * Create a checkout session for plan selection
   */
  createCheckoutSession(params: CheckoutSessionParams): Promise<CheckoutSession>;

  /**
   * Handle webhook events from payment provider
   */
  handleWebhook(event: PaymentWebhookEvent): Promise<void>;

  /**
   * Get subscription details
   */
  getSubscription(subscriptionId: string): Promise<Subscription>;

  /**
   * Cancel a subscription
   */
  cancelSubscription(subscriptionId: string): Promise<void>;
}
