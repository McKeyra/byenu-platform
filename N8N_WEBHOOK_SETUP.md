# n8n Webhook Integration Setup

## Overview

When a report is created in Supabase, it automatically triggers a webhook to your n8n instance, which:
1. Sends welcome email with login link
2. Processes report data and sends PDF/structured email
3. Schedules reminder emails

## Step 1: Set Up Supabase Database Webhook

### Option A: Using Supabase Dashboard (Recommended)

1. **Go to Supabase Dashboard:**
   - Navigate to: Database → Webhooks
   - Click "Create a new webhook"

2. **Configure Webhook:**
   - **Name:** `n8n_report_created`
   - **Table:** `bye_nu.reports`
   - **Events:** `INSERT`
   - **Type:** `HTTP Request`
   - **Method:** `POST`
   - **URL:** Your n8n webhook URL (e.g., `https://your-n8n.com/webhook/submission`)

3. **Payload (Custom JSON):**
```json
{
  "event": "report_created",
  "report_id": "{{ $json.id }}",
  "submission_id": "{{ $json.submission_id }}",
  "created_at": "{{ $json.created_at }}",
  "build_prompt": "{{ $json.build_prompt }}",
  "breakdown_json": {{ $json.breakdown_json }},
  "submission": {
    "id": "{{ $json.submission_id }}",
    "email": "{{ $json.submission.email }}",
    "wizard_type": "{{ $json.submission.wizard_type }}",
    "wizard_data": {{ $json.submission.wizard_data }},
    "status": "{{ $json.submission.status }}"
  }
}
```

### Option B: Using SQL Trigger (Alternative)

Run the SQL in `supabase-webhook-trigger.sql` to create a database function that calls your webhook.

## Step 2: n8n Webhook Payload Structure

Your n8n webhook will receive this payload when a report is created:

```json
{
  "event": "report_created",
  "report_id": "uuid",
  "submission_id": "uuid",
  "created_at": "2026-02-05T19:00:00Z",
  "build_prompt": "Build a website for...",
  "breakdown_json": {
    "focus": "Lead generation",
    "fonts": {
      "heading": "Inter",
      "body": "Inter"
    },
    "imagery": "Professional photography",
    "monetization": ["Contact forms", "Email capture"]
  },
  "submission": {
    "id": "uuid",
    "email": "user@example.com",
    "wizard_type": "quick",
    "wizard_data": {
      "businessName": "Acme Studio",
      "industry": "Technology",
      "goals": ["lead-gen"],
      "audience": "Small businesses",
      "primaryCta": "Get Started",
      "tone": ["professional"],
      "colorDirections": ["blue-professional"]
    },
    "status": "report_sent"
  }
}
```

## Step 3: n8n Workflow Structure

### Workflow Steps:

1. **Webhook Trigger** (receives data from Supabase)
2. **Create/Check User Account** (Supabase Auth API)
   - If user doesn't exist, create account
   - Generate password reset link (for first-time login)
3. **Send Welcome Email** (Email service)
   - Thank you message
   - Login link with password creation
   - Link to dashboard
4. **Process Report** (Generate PDF or structured email)
   - Format breakdown data
   - Create PDF or HTML email
5. **Send Report Email** (Email service)
   - Personalized proposal
   - PDF attachment (if generated)
   - CTA to login and review
6. **Schedule Reminders** (Cron/Interval)
   - Day 3: "Don't forget to claim your website"
   - Day 7: "Your proposal is waiting"
   - Day 14: "Last chance to claim at current pricing"
   - Day 30: "Final reminder"

## Step 4: Email Templates & Verbiage

### Welcome Email (Immediate)

**Subject:** Welcome to byeNU! Create your password to get started

**Body:**
```
Hi there!

Thank you for submitting your website information. We're excited to help bring your vision to life!

**Next Steps:**
1. Create your password: [Create Password Link]
2. Review your personalized proposal in your dashboard
3. Claim your website when you're ready

Your dashboard is ready at: [Dashboard Link]

Questions? Just reply to this email.

Best,
The byeNU Team
```

### Report Email (After Processing)

**Subject:** Your Personalized Website Proposal is Ready! 🎉

**Body:**
```
Hi [Business Name],

Your personalized website proposal is ready! We've analyzed your needs and created a custom plan just for you.

**What You'll Get:**

🎯 **Site Focus:** [Focus from breakdown]
📝 **Typography:** [Fonts from breakdown]
🖼️ **Imagery Style:** [Imagery from breakdown]
💰 **Monetization:** [Monetization features]

[PDF Attachment: Detailed Proposal]

**Ready to Claim Your Website?**

[Login to Dashboard] → Review your proposal → Choose your plan → Start building

Your proposal is valid for 30 days. Claim now to lock in current pricing.

Questions? We're here to help!

Best,
The byeNU Team

---
[Login Link] | [View Dashboard] | [Contact Support]
```

### Reminder Emails

**Day 3 Reminder:**
**Subject:** Your website proposal is waiting! ⏰

**Body:**
```
Hi [Name],

Just a friendly reminder that your personalized website proposal is ready for review in your dashboard.

[Login to Dashboard] to see your custom plan and claim your website.

Best,
byeNU Team
```

**Day 7 Reminder:**
**Subject:** Don't miss out on your custom website 🚀

**Body:**
```
Hi [Name],

Your website proposal is still waiting! We've designed a custom solution specifically for [Business Name].

[Login to Dashboard] to review and claim your website.

Questions? Reply to this email.

Best,
byeNU Team
```

**Day 14 Reminder:**
**Subject:** Last chance to claim at current pricing ⚡

**Body:**
```
Hi [Name],

Your proposal expires in 16 days. Claim now to lock in current pricing and start building your website.

[Login to Dashboard] → [Claim Your Website]

Best,
byeNU Team
```

**Day 30 Reminder:**
**Subject:** Final reminder: Your proposal expires soon

**Body:**
```
Hi [Name],

This is your final reminder. Your website proposal expires soon. Don't miss out on your custom website solution.

[Login to Dashboard] to claim now.

Best,
byeNU Team
```

## Step 5: Update Application Code

The app needs to:
1. Create user account when submission is created (or let n8n handle it)
2. Check email verification status before allowing edits
3. Show read-only dashboard until verified

See `EMAIL_FLOW_UPDATES.md` for code changes needed.
