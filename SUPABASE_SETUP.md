# Supabase Connection Guide

Your `.env` file is already configured with Supabase credentials. Follow these steps to complete the connection:

## Step 1: Verify Environment Variables

Your `.env` file should have these variables (already set):
```env
VITE_SUPABASE_URL=https://suarpdpzeunbmpzedrkz.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

✅ These are already configured in your `.env` file.

## Step 2: Run Database Migration

1. **Go to your Supabase Dashboard:**
   - Visit: https://supabase.com/dashboard
   - Select your project: `suarpdpzeunbmpzedrkz`

2. **Open SQL Editor:**
   - Click "SQL Editor" in the left sidebar
   - Click "New query"

3. **Run the Migration:**
   - Copy the entire contents of `supabase-migration.sql`
   - Paste it into the SQL Editor
   - Click "Run" (or press Cmd/Ctrl + Enter)

   This will create:
   - All database tables (users, submissions, reports, memberships, etc.)
   - Indexes for performance
   - Row Level Security (RLS) policies
   - Triggers for `updated_at` timestamps
   - Function to handle new user creation

## Step 3: Configure Authentication

1. **Go to Authentication Settings:**
   - In Supabase Dashboard, click "Authentication" → "Settings"

2. **Enable Email Auth:**
   - Under "Auth Providers", ensure "Email" is enabled
   - Configure email templates if needed

3. **Set up Site URL:**
   - Add your development URL: `http://localhost:5173` (or your Vite port)
   - Add production URL when ready

## Step 4: Set Up Row Level Security (RLS)

The migration SQL already includes RLS policies, but verify they're enabled:

1. **Check RLS Status:**
   - Go to "Table Editor" in Supabase Dashboard
   - For each table (submissions, reports, memberships, etc.), verify RLS is enabled
   - If not, the migration should have enabled it

## Step 5: Create a Staff User (Optional)

To test staff functionality:

1. **Create a user via Auth:**
   - Go to "Authentication" → "Users"
   - Click "Add user" → "Create new user"
   - Enter email and password

2. **Set user role to 'staff':**
   - Run this SQL in SQL Editor:
   ```sql
   INSERT INTO users (id, role)
   VALUES ('<user-id-from-auth>', 'staff')
   ON CONFLICT (id) DO UPDATE SET role = 'staff';
   ```
   - Replace `<user-id-from-auth>` with the actual user ID from Auth → Users

## Step 6: Test the Connection

1. **Start your dev server:**
   ```bash
   npm run dev
   ```

2. **Test authentication:**
   - Try signing up a new user
   - Check Supabase Dashboard → Authentication → Users to see if user was created

3. **Test database:**
   - Complete a wizard flow
   - Check Supabase Dashboard → Table Editor → submissions to see if data was saved

## Troubleshooting

### Error: "Missing Supabase environment variables"
- Make sure `.env` file exists in the project root
- Restart your dev server after creating/modifying `.env`
- Check that variable names start with `VITE_` for frontend access

### Error: "relation does not exist"
- Run the migration SQL in Supabase SQL Editor
- Verify tables were created in Table Editor

### Error: "new row violates row-level security policy"
- Check that RLS policies were created in the migration
- Verify user is authenticated
- Check user role in `users` table

### Can't see data in Supabase Dashboard
- Check RLS policies allow your user to read data
- Verify you're logged in with the correct user
- Check browser console for specific error messages

## Quick Test Query

Run this in Supabase SQL Editor to verify everything is set up:

```sql
-- Check tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('users', 'submissions', 'reports', 'memberships');

-- Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('submissions', 'reports', 'memberships');
```

## Next Steps

Once connected:
1. ✅ Test user registration/sign-in
2. ✅ Complete a wizard flow and verify data saves
3. ✅ Check Pipeline page shows submissions
4. ✅ Test staff access to Command Center

## Need Help?

- Check Supabase Dashboard → Logs for errors
- Check browser console for frontend errors
- Verify all environment variables are set correctly
- Ensure migration SQL ran without errors
