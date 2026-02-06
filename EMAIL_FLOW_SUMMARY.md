# Email Flow & n8n Integration - Summary

## ✅ What's Been Set Up

### 1. Data Storage
**YES - Data IS storing in Supabase:**
- ✅ Submissions → `bye_nu.submissions` table
- ✅ Reports → `bye_nu.reports` table
- ✅ All wizard data stored in `wizard_data` JSONB field
- ✅ Status tracking (`draft` → `report_sent` → `claimed` → `site_generated`)

### 2. n8n Webhook Integration
- ✅ Created `src/api/webhooks.js` - Webhook functions
- ✅ Updated `src/api/reports.js` - Triggers webhook on report creation
- ✅ Added `reminders_sent` field to submissions table (for reminder tracking)

### 3. Email Verification Flow
- ✅ Dashboard shows verification banner if email not verified
- ✅ Users can VIEW dashboard without verification
- ✅ Users CANNOT EDIT until email verified
- ✅ "Claim Website" button only shows if verified
- ✅ Resend verification email functionality

### 4. Documentation Created
- ✅ `N8N_WEBHOOK_SETUP.md` - Complete setup guide
- ✅ `EMAIL_TEMPLATES.md` - All email templates and verbiage
- ✅ `N8N_INTEGRATION_COMPLETE.md` - Integration checklist
- ✅ `supabase-webhook-trigger.sql` - Database trigger (optional)

## Current Flow

```
1. User completes wizard → Email submitted
   ↓
2. Submission created in Supabase (bye_nu.submissions)
   ↓
3. Report generated (bye_nu.reports)
   ↓
4. Webhook triggered → n8n receives data
   ↓
5. n8n workflow:
   a. Creates user account (if doesn't exist)
   b. Sends welcome email with password creation link
   c. Processes report data
   d. Sends report email (PDF or structured HTML)
   e. Schedules reminder emails (day 3, 7, 14, 30)
   ↓
6. User receives emails:
   - Welcome email (immediate)
   - Report email (2-5 min later)
   - Reminders (scheduled)
   ↓
7. User creates password → Verifies email
   ↓
8. Full dashboard access unlocked
```

## What You Need to Do

### Step 1: Add n8n Webhook URL
Add to `.env`:
```env
VITE_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/submission
```

### Step 2: Configure Supabase Webhook
1. Supabase Dashboard → Database → Webhooks
2. Create webhook for `bye_nu.reports` table
3. Event: `INSERT`
4. URL: Your n8n webhook URL
5. Use payload template from `N8N_WEBHOOK_SETUP.md`

### Step 3: Set Up n8n Workflow
See `N8N_WEBHOOK_SETUP.md` for complete workflow structure and `EMAIL_TEMPLATES.md` for email content.

### Step 4: Test
1. Complete a wizard
2. Check Supabase → Verify data stored
3. Check n8n → Verify webhook received
4. Check email → Verify welcome + report emails sent

## Email Templates Available

All templates are in `EMAIL_TEMPLATES.md`:
- ✅ Welcome email (password creation)
- ✅ Report email (structured HTML - recommended)
- ✅ Report email (PDF option)
- ✅ Day 3 reminder
- ✅ Day 7 reminder
- ✅ Day 14 reminder
- ✅ Day 30 reminder

## Dashboard Behavior

**Before Email Verification:**
- ✅ Can VIEW dashboard
- ✅ Can SEE report breakdown
- ❌ Cannot EDIT anything
- ❌ Cannot CLAIM website
- ✅ Shows verification banner with resend button

**After Email Verification:**
- ✅ Full dashboard access
- ✅ Can claim website
- ✅ Can edit content
- ✅ All features unlocked

## Reminder System

Reminders are tracked in `submissions.reminders_sent` JSONB field:
- n8n queries for submissions needing reminders
- Sends appropriate email
- Updates `reminders_sent` array
- Prevents duplicate reminders

## Recommendation: HTML Email vs PDF

**Start with HTML Email:**
- ✅ More cost-effective (~$0.001 vs ~$0.05 per email)
- ✅ Faster delivery
- ✅ Better mobile experience
- ✅ Easier to update

**Add PDF later if needed:**
- More "official" feeling
- Better for printing
- Can be added as optional upgrade

## Next Steps

1. ✅ Code is ready
2. ⏳ Add n8n webhook URL to `.env`
3. ⏳ Configure Supabase webhook
4. ⏳ Set up n8n workflow
5. ⏳ Test end-to-end flow

All documentation is ready - see the `.md` files for detailed instructions!
