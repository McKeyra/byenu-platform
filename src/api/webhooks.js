/**
 * Webhook integration for n8n
 * This file contains functions to trigger webhooks when events occur
 */

const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || ''

/**
 * Send data to n8n webhook
 */
export async function sendToN8N(payload) {
  if (!N8N_WEBHOOK_URL) {
    console.warn('N8N_WEBHOOK_URL not configured, skipping webhook call')
    return
  }

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(`Webhook failed: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error sending to n8n webhook:', error)
    // Don't throw - webhook failures shouldn't break the flow
    return null
  }
}

/**
 * Trigger webhook when report is created
 * This is called from the report generation function
 */
export async function notifyReportCreated(reportData, submissionData) {
  return await sendToN8N({
    event: 'report_created',
    report_id: reportData.id,
    submission_id: reportData.submission_id,
    created_at: reportData.created_at,
    build_prompt: reportData.build_prompt,
    breakdown_json: reportData.breakdown_json,
    submission: {
      id: submissionData.id,
      email: submissionData.email,
      wizard_type: submissionData.wizard_type,
      wizard_data: submissionData.wizard_data,
      status: submissionData.status,
    },
  })
}

/**
 * Trigger webhook for reminder emails
 * Called by scheduled job or manually
 */
export async function triggerReminderEmail(submissionId, reminderType) {
  // This would typically be called from a backend cron job
  // For now, it's here for reference
  return await sendToN8N({
    event: 'reminder_email',
    submission_id: submissionId,
    reminder_type: reminderType, // 'day_3', 'day_7', 'day_14', 'day_30'
  })
}
