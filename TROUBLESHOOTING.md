# Troubleshooting "Connection failed" Error

## Quick Fixes

### 1. Run the Database Migration

The most common cause is that the database tables don't exist yet.

**Steps:**
1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Click **SQL Editor** → **New query**
4. Copy and paste the **entire contents** of `supabase-migration.sql`
5. Click **Run** (or press Cmd/Ctrl + Enter)
6. Wait for "Success" message

### 2. Expose the `bye_nu` Schema

Supabase needs to expose the schema for PostgREST to access it.

**Steps:**
1. Go to Supabase Dashboard → **Settings** → **API**
2. Scroll to **Exposed schemas**
3. Add `bye_nu` to the list (if not already there)
4. Click **Save**

### 3. Verify Environment Variables

Make sure your `.env` file is in the project root and has:

```env
VITE_SUPABASE_URL=https://suarpdpzeunbmpzedrkz.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**After changing `.env`:**
- Restart the dev server (stop and run `npm run dev` again)

### 4. Check Browser Console

Open browser DevTools (F12) → Console tab and look for specific error messages:

- **"relation does not exist"** → Migration not run
- **"schema does not exist"** → Schema not created or not exposed
- **"permission denied"** → RLS policy issue
- **"Missing Supabase environment variables"** → `.env` file issue

### 5. Test Supabase Connection

Run this in Supabase SQL Editor to verify tables exist:

```sql
-- Check if schema exists
SELECT schema_name FROM information_schema.schemata WHERE schema_name = 'bye_nu';

-- Check if tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'bye_nu';

-- Should return:
-- users
-- submissions
-- reports
-- memberships
-- customer_profiles
-- layout_templates
```

### 6. Test a Simple Query

In Supabase SQL Editor, try:

```sql
SELECT * FROM bye_nu.users LIMIT 1;
```

If this works, the schema is set up correctly.

## Common Error Messages

### "relation 'bye_nu.users' does not exist"
- **Fix:** Run the migration SQL
- **Check:** Verify tables were created in Table Editor

### "permission denied for schema bye_nu"
- **Fix:** Expose the schema in Settings → API → Exposed schemas
- **Or:** Check that RLS policies allow access

### "Missing Supabase environment variables"
- **Fix:** Check `.env` file exists and has correct variable names
- **Note:** Variables must start with `VITE_` for frontend access
- **Restart:** Dev server after changing `.env`

### "Failed to fetch" or Network Error
- **Check:** Supabase project is active (not paused)
- **Check:** Internet connection
- **Check:** CORS settings in Supabase Dashboard

## Still Not Working?

1. **Check Supabase Dashboard → Logs** for backend errors
2. **Check browser Network tab** to see the actual API request/response
3. **Verify Supabase project URL** matches your `.env` file
4. **Try creating a test user** in Supabase Dashboard → Authentication

## Quick Test

After running migration, try this in your browser console (on localhost:5174):

```javascript
// Test Supabase connection
const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm')
const supabase = createClient(
  'https://suarpdpzeunbmpzedrkz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1YXJwZHB6ZXVuYm1wemVkcmt6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyOTQ3NTQsImV4cCI6MjA3NTg3MDc1NH0.ks9q7chZi7KoLobO7UX2aTKaMD2Y6NPLDE7cQ7FzAFU'
)
const { data, error } = await supabase.from('bye_nu.users').select('*').limit(1)
console.log('Test result:', { data, error })
```

If this works, Supabase is connected. If not, check the error message.
