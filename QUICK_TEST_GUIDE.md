# Quick Test Guide - byeNU Platform

**Ready to test!** Follow these steps to verify everything works.

---

## 🚀 **Quick Start**

### **1. Start the App**
```bash
cd byenu-platform
npm run dev
```

The app should start on `http://localhost:5173` (or another port if 5173 is taken)

### **2. Check Browser Console**
Open DevTools (F12) → Console tab
- ✅ Should see no red errors
- ⚠️ Warnings about missing env vars are OK (if optional)

---

## ✅ **Essential Tests (5 minutes)**

### **Test 1: Home Page**
1. Open `http://localhost:5173`
2. ✅ Should see landing page
3. ✅ Should see navigation
4. ✅ No console errors

### **Test 2: Authentication**
1. Click "Get Started" or "Sign Up"
2. Create a test account
3. ✅ Should create account successfully
4. ✅ Should redirect to dashboard or wizard

### **Test 3: Wizard Flow**
1. Navigate to `/wizard-selector`
2. Click "Quick Wizard"
3. Fill out at least 2 pages
4. ✅ Should progress through pages
5. ✅ Should save data (check localStorage or network tab)

### **Test 4: Dashboard**
1. After signup/login, navigate to `/dashboard`
2. ✅ Should load dashboard
3. ✅ Should show overview page
4. ✅ Should show sidebar navigation

### **Test 5: ENUW Dashboard (if staff)**
1. Navigate to `/key/dashboard`
2. ✅ Should load (if you have staff role)
3. ✅ Should show portfolio data
4. ✅ Should show 4 venture cards

---

## 🔍 **Quick Health Check**

### **Check Supabase Connection**
Open browser console and run:
```javascript
// Check if Supabase is connected
const { supabase } = await import('./src/lib/supabase.js')
const { data, error } = await supabase.from('bye_nu.users').select('count')
console.log('Supabase:', error ? '❌ FAILED' : '✅ CONNECTED')
```

### **Check Routes**
Navigate to these URLs and verify they load:
- ✅ `/` - Home page
- ✅ `/landing` - Landing page
- ✅ `/features` - Features page
- ✅ `/pricing` - Pricing page
- ✅ `/dashboard` - Client dashboard (requires auth)
- ✅ `/key/dashboard` - ENUW dashboard (requires staff role)
- ✅ `/wizard-selector` - Wizard selector

### **Check Database Tables**
In Supabase Dashboard → Table Editor, verify these tables exist:

**bye_nu schema:**
- ✅ users
- ✅ submissions
- ✅ reports
- ✅ memberships
- ✅ customer_profiles
- ✅ layout_templates
- ✅ wizard_sessions
- ✅ wizard_messages
- ✅ wizard_entities

**public schema:**
- ✅ ventures
- ✅ metrics
- ✅ leads
- ✅ deals
- ✅ activities
- ✅ websites
- ✅ analytics_events
- ✅ credits
- ✅ team_members

---

## 🐛 **Common Issues & Quick Fixes**

### **Issue: "Missing Supabase environment variables"**
**Fix:** Check `.env` file has:
```env
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
```

### **Issue: "relation does not exist"**
**Fix:** Run database migrations:
1. Go to Supabase Dashboard → SQL Editor
2. Run `supabase-migration.sql`
3. Run `supabase-dashboard-schema.sql`
4. Run `supabase-wizard-migration.sql`

### **Issue: "permission denied"**
**Fix:** Check RLS policies are enabled:
1. Supabase Dashboard → Table Editor
2. Verify RLS is enabled on all tables
3. Check policies allow authenticated users

### **Issue: Dashboard shows "Access Denied"**
**Fix:** 
- For `/dashboard`: Make sure you're logged in
- For `/key/dashboard`: Make sure your user has `staff` role in `bye_nu.users` table

### **Issue: Components not rendering**
**Fix:** Check browser console for component errors
- Verify PageRenderer is working
- Check component structure format

---

## ✅ **Success Criteria**

Your app is working if:
- ✅ App starts without errors
- ✅ Home page loads
- ✅ Can sign up/login
- ✅ Can access dashboard
- ✅ Wizard pages load
- ✅ No red errors in console
- ✅ Supabase connection works
- ✅ Data loads in dashboards

---

## 📝 **Test Results**

After testing, note any issues:

**Working:**
- [ ] Home page
- [ ] Authentication
- [ ] Wizard flow
- [ ] Client dashboard
- [ ] ENUW dashboard
- [ ] Site generation
- [ ] Builder page

**Issues Found:**
- 

**Notes:**
- 

---

**Happy Testing!** 🚀
