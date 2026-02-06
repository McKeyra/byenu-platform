# Email Templates & Verbiage Recommendations

## Email Structure Recommendations

### 1. Welcome Email (Immediate - Password Creation)

**Trigger:** When report is created  
**Purpose:** Thank user, provide login link, create password  
**Timing:** Immediate  

**Subject Line Options:**
- "Welcome to byeNU! Create your password to get started"
- "Your website proposal is ready! Create your account"
- "Thank you! Here's how to access your dashboard"

**Body Structure:**
```
Hi there! 👋

Thank you for submitting your website information! We're excited to help bring your vision to life.

**Your Next Step:**
Create your password to access your personalized dashboard where you can:
✓ Review your custom website proposal
✓ See your site breakdown and recommendations  
✓ Claim your website when you're ready

[Create Password Button/Link]

**What Happens Next:**
1. Create your password (takes 30 seconds)
2. Review your personalized proposal
3. Claim your website to start building

Your dashboard: [Dashboard Link]

Questions? Just reply to this email - we're here to help!

Best,
The byeNU Team

---
P.S. Check your email in a few minutes for your detailed website proposal!
```

**CTA:** "Create Password" button → Links to password creation page

---

### 2. Report Email (After Processing - PDF/Structured)

**Trigger:** After n8n processes report (2-5 minutes after submission)  
**Purpose:** Deliver detailed proposal, PDF attachment, CTA to claim  
**Timing:** 2-5 minutes after welcome email  

**Subject Line Options:**
- "Your Personalized Website Proposal is Ready! 🎉"
- "[Business Name] - Your Custom Website Plan"
- "Here's what your website will include"

**Body Structure:**

**Option A: PDF Attachment (More Professional)**
```
Hi [Business Name],

Your personalized website proposal is ready! We've analyzed your needs and created a custom plan specifically for [Business Name].

**What's Included:**

📄 **Detailed Proposal PDF** (attached)
   - Complete site breakdown
   - Design recommendations
   - Monetization strategy
   - Next steps guide

🎯 **Site Focus:** [Focus from breakdown]
📝 **Typography:** [Heading Font] / [Body Font]
🖼️ **Imagery Style:** [Imagery description]
💰 **Monetization Features:** [List features]

**Ready to Claim Your Website?**

[Login to Dashboard] → Review your proposal → Choose your plan → Start building

Your proposal is valid for 30 days. Claim now to lock in current pricing.

**Questions?**
Reply to this email or visit our support center.

Best,
The byeNU Team

---
[Login to Dashboard] | [View Proposal PDF] | [Contact Support]
```

**Option B: Structured HTML Email (More Cost-Effective)**
```
Hi [Business Name],

Your personalized website proposal is ready! Here's what we've designed for you:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 **YOUR SITE FOCUS**
[Focus description - 2-3 sentences explaining the primary goal]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 **TYPOGRAPHY**
Heading: [Font Name]
Body: [Font Name]
Why: [Brief explanation of choice]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🖼️ **IMAGERY STYLE**
[Imagery description - what type of photos/visuals]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💰 **MONETIZATION FEATURES**
• [Feature 1]
• [Feature 2]
• [Feature 3]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**NEXT STEPS:**

1. [Login to Dashboard] to review your full proposal
2. Choose the membership plan that fits your budget
3. Claim your website to start customizing immediately

[Login to Dashboard Button]

**Your proposal expires in 30 days** - claim now to lock in current pricing.

Questions? Reply to this email - we're here to help!

Best,
The byeNU Team
```

**Recommendation:** Use **Option B (Structured HTML)** - More cost-effective, faster delivery, better mobile experience, easier to update.

---

### 3. Reminder Emails

#### Day 3 Reminder
**Subject:** "Your website proposal is waiting! ⏰"  
**Tone:** Friendly, helpful  
**CTA:** "Review Your Proposal"

**Body:**
```
Hi [Name],

Just a friendly reminder that your personalized website proposal is ready for review in your dashboard.

We've designed a custom solution specifically for [Business Name] - don't miss out!

[Login to Dashboard] to see your proposal and claim your website.

Questions? We're here to help!

Best,
byeNU Team
```

#### Day 7 Reminder
**Subject:** "Don't miss out on your custom website 🚀"  
**Tone:** Slightly more urgent, value-focused  
**CTA:** "Claim Your Website"

**Body:**
```
Hi [Name],

Your website proposal is still waiting! We've designed a custom solution specifically for [Business Name] that includes:

• [Key Feature 1]
• [Key Feature 2]  
• [Key Feature 3]

[Login to Dashboard] to review and claim your website.

Your proposal expires in 23 days - claim now to lock in current pricing.

Questions? Reply to this email.

Best,
byeNU Team
```

#### Day 14 Reminder
**Subject:** "Last chance to claim at current pricing ⚡"  
**Tone:** Urgent but not pushy  
**CTA:** "Claim Now - Expires Soon"

**Body:**
```
Hi [Name],

Your proposal expires in 16 days. Claim now to lock in current pricing and start building your website.

**What You'll Get:**
[Quick summary of key benefits]

[Login to Dashboard] → [Claim Your Website]

Don't miss out on your custom website solution.

Best,
byeNU Team
```

#### Day 30 Reminder (Final)
**Subject:** "Final reminder: Your proposal expires today"  
**Tone:** Final call, clear deadline  
**CTA:** "Claim Before Midnight"

**Body:**
```
Hi [Name],

This is your final reminder. Your website proposal expires today.

[Login to Dashboard] to claim your website before midnight.

After today, you'll need to submit a new proposal to get started.

[Claim Your Website Now]

Best,
byeNU Team
```

---

## Email Design Best Practices

### Visual Structure:
- **Header:** Logo + "byeNU" branding
- **Hero Section:** Main message with clear CTA button
- **Content Sections:** Use dividers/separators for readability
- **Footer:** Support links, unsubscribe, social media

### CTA Buttons:
- **Primary CTA:** Large, prominent button (e.g., "Login to Dashboard")
- **Secondary CTA:** Text link (e.g., "View Proposal")
- **Color:** Use brand colors (amber/slate from 22C Design System)

### Mobile Optimization:
- Single column layout
- Large touch targets (44px minimum)
- Readable font sizes (16px+)
- Short paragraphs

### Personalization:
- Use `[Business Name]` throughout
- Reference specific wizard choices
- Include submission date
- Show countdown to expiration

---

## n8n Workflow Recommendations

### Workflow 1: Welcome Email (Immediate)
1. Webhook receives report_created event
2. Check if user exists in Supabase Auth
3. If not, create user account
4. Generate password reset link (for first-time password creation)
5. Send welcome email with password creation link
6. Log email sent

### Workflow 2: Report Email (2-5 min delay)
1. Wait 2-5 minutes (or process immediately)
2. Format breakdown data into structured HTML
3. Generate PDF (optional - more expensive)
4. Send report email with proposal
5. Update `reports.sent_at` timestamp
6. Log email sent

### Workflow 3: Reminder Scheduler
1. Query submissions where:
   - `status = 'report_sent'`
   - `created_at` is 3/7/14/30 days ago
   - No membership created yet
2. Send appropriate reminder email
3. Log reminder sent
4. Mark reminder as sent (add `reminders_sent` field to submissions)

---

## Cost Analysis: PDF vs HTML Email

**PDF Generation:**
- Pros: Professional, printable, detailed
- Cons: Higher cost, slower, larger file size, mobile UX issues
- Cost: ~$0.01-0.05 per PDF (depending on service)

**Structured HTML Email:**
- Pros: Fast, cost-effective, mobile-friendly, easy to update
- Cons: Less "official" feeling
- Cost: ~$0.0001-0.001 per email (via SendGrid/Resend)

**Recommendation:** Start with **HTML email**, add PDF option later if requested.

---

## Dashboard Preview Page

The dashboard should show a **1-page preview** of what the website will look like based on the report. This gives users a visual before claiming.

**Structure:**
- Hero section preview (with their business name, CTA)
- About section preview
- Services/features preview
- Contact section preview
- Design elements (colors, fonts) shown

This builds excitement and helps users visualize their website before claiming.
