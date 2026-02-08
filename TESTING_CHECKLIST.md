# Application Testing Checklist

**Date:** February 5, 2026  
**Status:** Ready for Testing

---

## 🔧 **Pre-Testing Setup**

### **1. Environment Variables**
Ensure these are set in your `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key (optional, for payments)
VITE_N8N_WEBHOOK_URL=your_n8n_webhook_url (optional, for automation)
VITE_N8N_EMAIL_WEBHOOK_URL=your_n8n_email_webhook_url (optional)
VITE_RESEND_API_KEY=your_resend_key (optional, for direct email)
```

### **2. Database Migrations**
✅ Run all migrations:
- [x] `supabase-migration.sql` (main schema)
- [x] `supabase-dashboard-schema.sql` (dashboard tables)
- [x] `supabase-wizard-migration.sql` (wizard tables)

### **3. Start Development Server**
```bash
npm install  # If not already done
npm run dev
```

---

## ✅ **Core Functionality Tests**

### **Authentication**
- [ ] **Sign Up**
  - Navigate to `/` or `/landing`
  - Click "Get Started" or sign up button
  - Create new account
  - Verify email (if required)
  - ✅ Should redirect to dashboard or wizard

- [ ] **Sign In**
  - Navigate to login page
  - Enter credentials
  - ✅ Should log in successfully
  - ✅ Should redirect to dashboard

- [ ] **Sign Out**
  - Click sign out button
  - ✅ Should log out and redirect to home

- [ ] **Protected Routes**
  - Try accessing `/dashboard` without logging in
  - ✅ Should redirect to login or show access denied

---

### **Wizard Flow**

- [ ] **Wizard Selector**
  - Navigate to `/wizard-selector`
  - ✅ Should show 3 options: Quick, Full, AI
  - Click each option
  - ✅ Should navigate to respective wizard

- [ ] **Quick Wizard** (`/wizard/quick` or `/build`)
  - Complete all 4 pages
  - Fill in business name, industry, goals, etc.
  - Click "Submit" or "Continue" on each page
  - ✅ Should progress through stages
  - ✅ Should create submission in database
  - ✅ Should generate report
  - ✅ Should redirect to success page

- [ ] **Form Wizard** (`/wizard/form` or `/build/form`)
  - Fill out form fields
  - ✅ Should show live preview
  - ✅ Should save data
  - Submit form
  - ✅ Should create submission

- [ ] **AI/Chat Wizard** (`/wizard/ai` or `/build/chat`)
  - Send messages
  - ✅ Should receive responses
  - ✅ Should track conversation
  - Complete conversation
  - ✅ Should create submission

- [ ] **Conversational Wizard** (`/wizard/conversational`)
  - Start conversation
  - ✅ Should create wizard session
  - Answer questions
  - ✅ Should extract data
  - Complete all stages
  - ✅ Should show review page
  - Deploy site
  - ✅ Should create submission and redirect to claim

---

### **Dashboard - byeNU Client Dashboard**

- [ ] **Overview Page** (`/dashboard`)
  - Navigate to dashboard
  - ✅ Should load without errors
  - ✅ Should show user's websites
  - ✅ Should show credit balance
  - ✅ Should show recent activity
  - ✅ Should show site health metrics

- [ ] **Analytics Page** (`/dashboard/analytics`)
  - Navigate to analytics
  - ✅ Should load analytics data
  - ✅ Should show visitor trends chart
  - ✅ Should show traffic sources chart
  - ✅ Should allow date range selection

- [ ] **Pages Manager** (`/dashboard/pages`)
  - Navigate to pages
  - ✅ Should list all site pages
  - ✅ Should allow search
  - ✅ Should show page status

- [ ] **Editor** (`/dashboard/edit`)
  - Navigate to editor
  - ✅ Should load editor interface
  - ✅ Should show conversational input
  - ✅ Should show mode selector (Wizard/Chat/Form)

- [ ] **Abilities** (`/dashboard/abilities`)
  - Navigate to abilities
  - ✅ Should list active abilities
  - ✅ Should show ability status

- [ ] **Settings** (`/dashboard/settings`)
  - Navigate to settings
  - ✅ Should show site info
  - ✅ Should show team section
  - ✅ Should show billing section

---

### **Dashboard - ENUW Key Master Dashboard**

- [ ] **Command Center** (`/key/dashboard`)
  - Navigate to `/key/dashboard`
  - ✅ Should require staff role (if not staff, should show access denied)
  - ✅ Should show portfolio pulse strip
  - ✅ Should show vitality index cards for all 4 ventures
  - ✅ Should show hot leads panel
  - ✅ Should show recent activity feed

- [ ] **Venture Deep Dive** (`/key/venture/:id`)
  - Click on a venture card
  - ✅ Should navigate to venture detail page
  - ✅ Should show revenue chart
  - ✅ Should show venture-specific metrics
  - ✅ Should show pipeline visualization

- [ ] **Pipeline Board** (`/key/pipeline`)
  - Navigate to pipeline
  - ✅ Should show Kanban board with 5 columns
  - ✅ Should show deals organized by stage
  - ✅ Should show pipeline metrics
  - ✅ Should allow filtering by venture

- [ ] **Leads Management** (`/key/leads`)
  - Navigate to leads
  - ✅ Should show leads table
  - ✅ Should show AI6 scores
  - ✅ Should allow filtering and search
  - ✅ Should show tier badges (Hot/Warm/Monitor)

- [ ] **AI6 Scoring** (`/key/scoring`)
  - Navigate to scoring
  - ✅ Should show scoring form
  - ✅ Should calculate AI6 score (even if mocked)
  - ✅ Should show 7-dimension breakdown
  - ✅ Should allow saving as lead

- [ ] **Golden Hour** (`/key/golden-hour`)
  - Navigate to golden hour
  - ✅ Should show priority list
  - ✅ Should show calendar block

- [ ] **Reports** (`/key/reports`)
  - Navigate to reports
  - ✅ Should show reports list

---

### **Site Generation & Viewing**

- [ ] **Claim Flow**
  - Complete wizard → Get submission ID
  - Navigate to `/claim?submission=xxx`
  - ✅ Should show plan selection
  - Select a plan
  - ✅ Should redirect to Stripe checkout (if Stripe configured)
  - Complete payment (or skip if testing)
  - ✅ Should redirect to `/claim/success`

- [ ] **Claim Success**
  - After payment (or manual claim)
  - ✅ Should process membership creation
  - ✅ Should trigger site generation
  - ✅ Should show success message
  - ✅ Should redirect to dashboard

- [ ] **Builder Page** (`/builder?membershipId=xxx`)
  - Navigate to builder with membership ID
  - ✅ Should load site data
  - ✅ Should show preview using PageRenderer
  - ✅ Should show section selector
  - ✅ Should allow content editing
  - ✅ Should save changes

- [ ] **Public Site** (`/site?subdomain=xxx` or `/site?membershipId=xxx`)
  - Navigate to public site URL
  - ✅ Should render site using PageRenderer
  - ✅ Should show all components correctly
  - ✅ Should be responsive

---

### **Marketing Pages**

- [ ] **Landing Page** (`/landing`)
  - ✅ Should load without errors
  - ✅ Should show hero section
  - ✅ Should show features grid
  - ✅ Should have working CTAs

- [ ] **Features Page** (`/features`)
  - ✅ Should show all feature categories
  - ✅ Should display feature cards

- [ ] **Pricing Page** (`/pricing`)
  - ✅ Should show pricing tiers
  - ✅ Should show FAQ section

- [ ] **Examples Page** (`/examples`)
  - ✅ Should show showcase cards

---

## 🐛 **Error Handling Tests**

- [ ] **Missing Data**
  - Try accessing dashboard with no websites
  - ✅ Should show empty state, not error

- [ ] **Invalid Routes**
  - Navigate to `/invalid-route`
  - ✅ Should show 404 page

- [ ] **Database Errors**
  - Disconnect from internet
  - Try to create submission
  - ✅ Should show error message gracefully

- [ ] **API Errors**
  - Try to access protected route without auth
  - ✅ Should redirect or show access denied

---

## 📱 **Responsive Design Tests**

- [ ] **Mobile View** (< 768px)
  - Test all pages on mobile
  - ✅ Should be responsive
  - ✅ Should have mobile menu
  - ✅ Should stack content appropriately

- [ ] **Tablet View** (768px - 1024px)
  - Test all pages on tablet
  - ✅ Should adapt layout

- [ ] **Desktop View** (> 1024px)
  - Test all pages on desktop
  - ✅ Should use full width appropriately

---

## ⚡ **Performance Tests**

- [ ] **Page Load Times**
  - Check initial page load
  - ✅ Should load in < 3 seconds

- [ ] **Data Fetching**
  - Check dashboard data loading
  - ✅ Should show loading states
  - ✅ Should cache data (React Query)

- [ ] **Image Loading**
  - Check if images load properly
  - ✅ Should have proper alt text
  - ✅ Should not break layout while loading

---

## 🔒 **Security Tests**

- [ ] **Authentication**
  - Try accessing staff routes as regular user
  - ✅ Should show access denied

- [ ] **Data Access**
  - Try accessing another user's data
  - ✅ Should only show own data (RLS policies)

- [ ] **Input Validation**
  - Try submitting invalid data in forms
  - ✅ Should show validation errors

---

## 🎨 **UI/UX Tests**

- [ ] **Design System**
  - Check all pages use correct colors (22C-CORP for byeNU, 22C-SPORT for ENUW)
  - ✅ Should be consistent

- [ ] **Typography**
  - Check font families (Fraunces, DM Sans, JetBrains Mono)
  - ✅ Should be applied correctly

- [ ] **Loading States**
  - Check loading skeletons/spinners
  - ✅ Should show during data fetching

- [ ] **Error States**
  - Check error messages
  - ✅ Should be user-friendly

- [ ] **Empty States**
  - Check empty state messages
  - ✅ Should guide user to next action

---

## 🔄 **Integration Tests**

- [ ] **Supabase Connection**
  - Check browser console for errors
  - ✅ Should connect to Supabase successfully

- [ ] **React Query**
  - Check data caching
  - ✅ Should cache and refetch appropriately

- [ ] **Component Library**
  - Check if components render correctly
  - ✅ Should use component library components

---

## 📝 **Quick Test Script**

Run these in browser console after logging in:

```javascript
// Test Supabase connection
const { supabase } = await import('./src/lib/supabase.js')
const { data, error } = await supabase.from('bye_nu.users').select('count')
console.log('Supabase connection:', error ? 'FAILED' : 'OK')

// Test dashboard data
const { useUserWebsites } = await import('./src/hooks/useDashboard.js')
// Check if hook works (requires React context)

// Test component structure
const structure = [
  { type: 'header', variant: 'sticky-transparent', component: 'StickyHeader', props: {}, order: 0 },
  { type: 'hero', variant: 'centered', component: 'CenteredHero', props: { headline: 'Test' }, order: 1 }
]
console.log('Component structure:', structure)
```

---

## 🚨 **Common Issues to Watch For**

1. **Missing Environment Variables**
   - Check browser console for errors
   - Check network tab for failed requests

2. **Database Connection**
   - Verify Supabase URL and key are correct
   - Check RLS policies are set up

3. **Component Rendering**
   - Check if PageRenderer is working
   - Verify component structure format

4. **Authentication**
   - Check if user is logged in
   - Verify role-based access

5. **Data Loading**
   - Check React Query devtools
   - Verify API functions are working

---

## ✅ **Sign-Off Checklist**

- [ ] All core functionality works
- [ ] No console errors
- [ ] No broken routes
- [ ] Data loads correctly
- [ ] Authentication works
- [ ] Dashboards display correctly
- [ ] Site generation works
- [ ] Responsive design works
- [ ] Error handling works

---

**Tested By:** _______________  
**Date:** _______________  
**Notes:** _______________
