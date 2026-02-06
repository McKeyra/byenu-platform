import { supabase } from '../lib/supabase.js'

/**
 * Send report email to user
 * This will call a Supabase Edge Function or external email service
 */
export async function sendReportEmail(reportId, email, reportData) {
  try {
    // For now, we'll use Supabase Edge Function
    // In production, you'd set up Resend, SendGrid, or similar
    
    // Call Edge Function (if deployed)
    // const { data, error } = await supabase.functions.invoke('send-report-email', {
    //   body: { reportId, email, reportData }
    // })

    // For now, mark as sent in database
    const { data, error } = await supabase
      .from('bye_nu.reports')
      .update({
        sent_at: new Date().toISOString(),
      })
      .eq('id', reportId)
      .select()
      .single()

    if (error) throw error

    // TODO: Actually send email via email service
    // Example with Resend:
    // await fetch('https://api.resend.com/emails', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${import.meta.env.VITE_RESEND_API_KEY}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     from: 'byeNU <noreply@byenu.com>',
    //     to: email,
    //     subject: 'Your Personalized Website Proposal',
    //     html: generateEmailTemplate(reportData),
    //   }),
    // })

    console.log(`Report ${reportId} marked as sent to ${email}`)
    return data
  } catch (error) {
    console.error('Error sending report email:', error)
    throw error
  }
}

/**
 * Generate email HTML template for report
 */
function generateEmailTemplate(reportData) {
  const { breakdown, businessName, buildPrompt } = reportData

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Website Proposal</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #334155; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0;">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Your Website Proposal</h1>
        <p style="color: #cbd5e1; margin: 10px 0 0 0;">Personalized for ${businessName || 'your business'}</p>
      </div>
      
      <div style="background: #ffffff; padding: 40px 20px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <h2 style="color: #1e293b; margin-top: 0;">What You'll Get</h2>
        
        ${breakdown ? `
          <div style="margin-bottom: 30px;">
            <h3 style="color: #475569; font-size: 18px; margin-bottom: 10px;">Site Focus</h3>
            <p style="color: #64748b; margin: 0;">${breakdown.focus || 'Professional business presence'}</p>
          </div>
          
          <div style="margin-bottom: 30px;">
            <h3 style="color: #475569; font-size: 18px; margin-bottom: 10px;">Typography</h3>
            <p style="color: #64748b; margin: 0;">
              Heading: ${breakdown.fonts?.heading || 'Inter'}<br>
              Body: ${breakdown.fonts?.body || 'Inter'}
            </p>
          </div>
          
          <div style="margin-bottom: 30px;">
            <h3 style="color: #475569; font-size: 18px; margin-bottom: 10px;">Imagery Style</h3>
            <p style="color: #64748b; margin: 0;">${breakdown.imagery || 'Professional, modern imagery'}</p>
          </div>
          
          <div style="margin-bottom: 30px;">
            <h3 style="color: #475569; font-size: 18px; margin-bottom: 10px;">Monetization Features</h3>
            <ul style="color: #64748b; margin: 0; padding-left: 20px;">
              ${(breakdown.monetization || []).map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
        
        <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 30px 0;">
          <h3 style="color: #1e293b; margin-top: 0;">Next Steps</h3>
          <ol style="color: #475569; margin: 0; padding-left: 20px;">
            <li>Review your personalized proposal</li>
            <li>Choose the membership plan that fits your budget</li>
            <li>Complete payment to activate your account</li>
            <li>Start customizing your website immediately</li>
          </ol>
        </div>
        
        <div style="text-align: center; margin-top: 40px;">
          <a href="${window.location.origin}/dashboard" style="display: inline-block; background: #1e293b; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; margin-right: 10px;">View in Dashboard</a>
          <a href="${window.location.origin}/claim" style="display: inline-block; background: #059669; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600;">Claim Your Website</a>
        </div>
        
        <p style="color: #94a3b8; font-size: 14px; text-align: center; margin-top: 40px;">
          Questions? Reply to this email or visit our support center.
        </p>
      </div>
      
      <div style="text-align: center; margin-top: 20px; color: #94a3b8; font-size: 12px;">
        <p>© ${new Date().getFullYear()} byeNU. All rights reserved.</p>
      </div>
    </body>
    </html>
  `
}

/**
 * Send welcome email after signup
 */
export async function sendWelcomeEmail(email, name) {
  // Similar implementation for welcome emails
  console.log(`Welcome email would be sent to ${email}`)
}

/**
 * Send claim confirmation email
 */
export async function sendClaimConfirmationEmail(email, membershipData) {
  // Similar implementation for claim confirmations
  console.log(`Claim confirmation email would be sent to ${email}`)
}
