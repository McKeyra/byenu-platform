/**
 * Stripe Webhook Handler
 * This should be called from a Supabase Edge Function or external webhook service
 * 
 * Webhook events to handle:
 * - checkout.session.completed: Payment successful → create membership → generate site
 * - customer.subscription.deleted: Subscription cancelled
 * - invoice.payment_failed: Payment failed → notify user
 */

import { supabase } from '../lib/supabase.js'
import { createMembership } from './memberships.js'
import { generateSite } from './sites.js'

/**
 * Handle Stripe webhook event
 * @param {Object} event - Stripe webhook event
 * @returns {Object} - Result of webhook processing
 */
export async function handleStripeWebhook(event) {
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        return await handleCheckoutCompleted(event.data.object)
      
      case 'customer.subscription.deleted':
        return await handleSubscriptionDeleted(event.data.object)
      
      case 'invoice.payment_failed':
        return await handlePaymentFailed(event.data.object)
      
      default:
        console.log(`Unhandled event type: ${event.type}`)
        return { success: true, message: 'Event type not handled' }
    }
  } catch (error) {
    console.error('Error handling Stripe webhook:', error)
    throw error
  }
}

/**
 * Handle successful checkout
 * Creates membership and triggers site generation
 */
async function handleCheckoutCompleted(session) {
  const { customer_email, metadata, id: sessionId } = session
  
  // Extract metadata
  const plan = metadata?.plan || 'business'
  const submissionId = metadata?.submission_id
  const userId = metadata?.user_id

  if (!customer_email) {
    throw new Error('Missing customer email in checkout session')
  }

  // Get or create user
  let user
  if (userId) {
    const { data: userData } = await supabase
      .from('bye_nu.users')
      .select('*')
      .eq('id', userId)
      .single()
    user = userData
  } else {
    // Find user by email
    const { data: authUser } = await supabase.auth.admin.getUserByEmail(customer_email)
    if (authUser?.user) {
      const { data: userData } = await supabase
        .from('bye_nu.users')
        .select('*')
        .eq('id', authUser.user.id)
        .single()
      user = userData
    }
  }

  // Create membership
  const membership = await createMembership({
    userId: user?.id || null, // Will be linked when user verifies email
    plan,
    submissionId,
  })

  // Store Stripe customer/subscription IDs
  await supabase
    .from('bye_nu.memberships')
    .update({
      stripe_customer_id: session.customer,
      stripe_subscription_id: session.subscription,
    })
    .eq('id', membership.id)

  // Generate site if submission exists
  if (submissionId) {
    try {
      await generateSite(submissionId, membership.id)
      console.log(`Site generated for membership ${membership.id}`)
    } catch (siteError) {
      console.error('Error generating site:', siteError)
      // Don't throw - membership is created, site can be generated later
    }
  }

  return {
    success: true,
    membershipId: membership.id,
    message: 'Membership created and site generation triggered',
  }
}

/**
 * Handle subscription cancellation
 */
async function handleSubscriptionDeleted(subscription) {
  const subscriptionId = subscription.id

  // Find membership by Stripe subscription ID
  const { data: membership, error } = await supabase
    .from('bye_nu.memberships')
    .select('*')
    .eq('stripe_subscription_id', subscriptionId)
    .single()

  if (error) {
    console.error('Membership not found for subscription:', subscriptionId)
    return { success: false, error: 'Membership not found' }
  }

  // Update membership status
  await supabase
    .from('bye_nu.memberships')
    .update({
      status: 'cancelled',
      updated_at: new Date().toISOString(),
    })
    .eq('id', membership.id)

  return {
    success: true,
    membershipId: membership.id,
    message: 'Membership cancelled',
  }
}

/**
 * Handle failed payment
 */
async function handlePaymentFailed(invoice) {
  const customerId = invoice.customer

  // Find membership by Stripe customer ID
  const { data: membership, error } = await supabase
    .from('bye_nu.memberships')
    .select('*')
    .eq('stripe_customer_id', customerId)
    .single()

  if (error) {
    console.error('Membership not found for customer:', customerId)
    return { success: false, error: 'Membership not found' }
  }

  // TODO: Send notification email to user
  // await sendPaymentFailedEmail(membership.user_id, invoice)

  return {
    success: true,
    membershipId: membership.id,
    message: 'Payment failure logged',
  }
}

/**
 * Verify Stripe webhook signature
 * This should be done in the Edge Function before calling handleStripeWebhook
 */
export function verifyStripeSignature(payload, signature, secret) {
  // This should use Stripe's webhook signature verification
  // For now, return true if secret is provided
  // In production, use: stripe.webhooks.constructEvent(payload, signature, secret)
  return !!secret
}
