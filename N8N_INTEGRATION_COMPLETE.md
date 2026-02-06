# n8n Integration - Complete Setup Guide

## ✅ Data Storage Status

**YES, data IS storing in Supabase correctly:**
- ✅ Submissions → `bye_nu.submissions` table
- ✅ Reports → `bye_nu.reports` table  
- ✅ Wizard data → Stored in `wizard_data` JSONB field
- ✅ All fields are being saved properly

## Setup Steps

### Step 1: Add n8n Webhook URL to Environment

Add this to your `.env` file:

```env
VITE_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/submission
```

### Step 2: Configure Supabase Database Webhook

**Option A: Supabase Dashboard (Recommended)**

1. Go to Supabase Dashboard → **Database** → **Webhooks**
2. Click **"Create a new webhook"**
3. Configure:
   - **Name:** `n8n_report_created`
   - **Table:** `bye_nu.reports`
   - **Events:** `INSERT`
   - **Type:** `HTTP Request`
   - **Method:** `POST`
   - **URL:** Your n8n webhook URL
   - **HTTP Headers:** `Content-Type: application/json`

4. **Payload Template:**
```json
{
  "event": "report_created",
  "report_id": "{{ $json.id }}",
  "submission_id": "{{ $json.submission_id }}",
  "created_at": "{{ $json.created_at }}",
  "build_prompt": "{{ $json.build_prompt }}",
  "breakdown_json": {{ $json.breakdown_json }},
  "submission": {
    "email": "{{ $json.submission.email }}",
    "wizard_type": "{{ $json.submission.wizard_type }}",
    "wizard_data": {{ $json.submission.wizard_data }},
    "status": "{{ $json.submission.status }}"
  }
}
```

**Option B: SQL Trigger (Alternative)**

Run the SQL in `supabase-webhook-trigger.sql` if you prefer database-level triggers.

### Step 3: n8n Workflow Structure

Your n8n workflow should have these nodes:

1. **Webhook Trigger** (receives from Supabase)
2. **Create User Account** (Supabase Auth API)
   - Check if user exists
   - If not, create with `signUp()`
   - Generate password reset link
3. **Send Welcome Email** (Email service)
   - Template: See `EMAIL_TEMPLATES.md`
   - Include password creation link
4. **Process Report Data** (Format data)
   - Extract breakdown information
   - Format for email/PDF
5. **Send Report Email** (Email service)
   - Template: See `EMAIL_TEMPLATES.md`
   - Include structured proposal
6. **Schedule Reminders** (Cron/Interval nodes)
   - Day 3, 7, 14, 30 reminders

### Step 4: Email Verification Flow

**Current Implementation:**
- ✅ Users can VIEW dashboard without verification
- ✅ Users CANNOT EDIT until email verified
- ✅ Verification banner shown in dashboard
- ✅ Resend verification email button

**How it works:**
1. User submits wizard → Submission created
2. Report generated → n8n webhook triggered
3. n8n creates user account → Sends welcome email with password link
4. User creates password → Email verification sent
5. User verifies email → Full dashboard access unlocked

### Step 5: Dashboard Preview Page

The dashboard now shows:
- Report breakdown (read-only until verified)
- "Verify Email" banner if not verified
- "Claim Website" button (only if verified)
- 1-page website preview (coming soon)

## Testing

1. **Test Submission:**
   - Complete a wizard
   - Check Supabase → `bye_nu.submissions` table
   - Verify data is stored

2. **Test Webhook:**
   - Check n8n webhook received data
   - Verify payload structure matches expected format

3. **Test Email Flow:**
   - Check welcome email received
   - Check report email received (after processing)
   - Verify links work

4. **Test Verification:**
   - Try to edit without verification (should be blocked)
   - Verify email
   - Try to edit again (should work)

## Files Updated

- ✅ `src/api/webhooks.js` - n8n webhook integration
- ✅ `src/api/reports.js` - Triggers webhook on report creation
- ✅ `src/pages/Dashboard.jsx` - Email verification checks
- ✅ `supabase-webhook-trigger.sql` - Database trigger (optional)
- ✅ `N8N_WEBHOOK_SETUP.md` - Detailed setup instructions
- ✅ `EMAIL_TEMPLATES.md` - Email templates and verbiage

## Next Steps

1. Add `VITE_N8N_WEBHOOK_URL` to `.env`
2. Configure Supabase webhook (Dashboard method recommended)
3. Set up n8n workflow with email templates
4. Test end-to-end flow
5. Monitor webhook calls and email delivery

## Reminder System Structure

Add a `reminders_sent` JSONB field to `submissions` table to track which reminders have been sent:

```sql
ALTER TABLE bye_nu.submissions 
ADD COLUMN reminders_sent JSONB DEFAULT '[]'::JSONB;
```

n8n can query for submissions needing reminders:
- Day 3: `created_at` = 3 days ago, `reminders_sent` doesn't include 'day_3'
- Day 7: `created_at` = 7 days ago, `reminders_sent` doesn't include 'day_7'
- etc.

After sending, update: `reminders_sent = reminders_sent || '["day_3"]'::JSONB`
