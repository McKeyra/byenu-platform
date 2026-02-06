# Email Flow Updates - Implementation Guide

## Current Status: Data Storage

✅ **Yes, data IS storing in Supabase:**
- Submissions are created in `bye_nu.submissions` table
- Reports are created in `bye_nu.reports` table
- All wizard data is stored in `wizard_data` JSONB field

## Required Updates

### 1. Create User Account on Submission

When a user submits their email, we should:
- Create a Supabase Auth user account
- Send password creation link via n8n
- Link submission to user account

### 2. Email Verification Requirement

- Users can VIEW dashboard without verification
- Users CANNOT EDIT until email is verified
- Show verification banner/prompt in dashboard

### 3. n8n Webhook Integration

- Trigger webhook when report is created
- Send all necessary data to n8n
- Let n8n handle email sending

## Implementation Steps

### Step 1: Update Submission Creation

When creating submission, also create user account if doesn't exist.

### Step 2: Add Email Verification Check

Check `user.email_confirmed_at` before allowing edits.

### Step 3: Configure Supabase Webhook

Set up database webhook to trigger n8n when report is created.

### Step 4: Update Dashboard

Show read-only mode until verified, with clear CTA to verify email.
