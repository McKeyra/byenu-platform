# Database Migration Guide

This guide helps you run all required database migrations for the byeNU platform.

## Migration Files

The platform requires **3 migration files** to be run in order:

1. **`supabase-migration.sql`** - Main schema (bye_nu schema, users, submissions, reports, memberships, etc.)
2. **`supabase-dashboard-schema.sql`** - Dashboard tables (ventures, metrics, leads, deals, activities, websites, analytics, credits, team_members)
3. **`supabase-wizard-migration.sql`** - Wizard engine tables (wizard_sessions, wizard_messages, wizard_entities)

## Running Migrations

### Option 1: Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Run each migration file **in order**:
   - Copy contents of `supabase-migration.sql` → Run
   - Copy contents of `supabase-dashboard-schema.sql` → Run
   - Copy contents of `supabase-wizard-migration.sql` → Run

### Option 2: Supabase CLI

```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Link to your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

### Option 3: Direct SQL Execution

If you have direct database access:

```bash
psql -h your-db-host -U postgres -d postgres -f supabase-migration.sql
psql -h your-db-host -U postgres -d postgres -f supabase-dashboard-schema.sql
psql -h your-db-host -U postgres -d postgres -f supabase-wizard-migration.sql
```

## Verification

After running migrations, verify tables exist:

```sql
-- Check main schema tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'bye_nu' 
ORDER BY table_name;

-- Expected tables:
-- customer_profiles
-- layout_templates
-- memberships
-- reports
-- submissions
-- users
-- wizard_entities
-- wizard_messages
-- wizard_sessions

-- Check dashboard tables (public schema)
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
  'ventures', 'metrics', 'leads', 'deals', 'activities',
  'websites', 'analytics_events', 'credits', 'team_members'
)
ORDER BY table_name;
```

## Troubleshooting

### Error: "schema 'bye_nu' does not exist"

**Solution:** Create the schema first:

```sql
CREATE SCHEMA IF NOT EXISTS bye_nu;
```

### Error: "relation already exists"

**Solution:** Tables already exist. You can either:
- Drop and recreate (⚠️ **WARNING:** This will delete all data)
- Use `CREATE TABLE IF NOT EXISTS` (already in migrations)

### Error: "permission denied"

**Solution:** Ensure you're running migrations as a user with proper permissions, or use the Supabase dashboard which has admin access.

### RLS Policies Not Working

**Solution:** Verify RLS is enabled and policies are created:

```sql
-- Check if RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'bye_nu';

-- Check policies
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'bye_nu';
```

## Post-Migration Setup

After migrations are complete:

1. **Verify RLS Policies** - Ensure all tables have proper Row Level Security policies
2. **Create Initial Data** - Dashboard schema includes initial ventures data
3. **Set Up Service Role** - Configure service role for server-side operations
4. **Test Authentication** - Verify user signup/login works
5. **Test Dashboard Access** - Verify dashboards load correctly

## Migration Order Matters

⚠️ **IMPORTANT:** Run migrations in this exact order:

1. `supabase-migration.sql` (creates bye_nu schema and core tables)
2. `supabase-dashboard-schema.sql` (creates dashboard tables)
3. `supabase-wizard-migration.sql` (creates wizard tables)

Some tables reference others, so order is critical.

## Rollback

If you need to rollback migrations:

```sql
-- Drop tables (⚠️ WARNING: Deletes all data)
DROP TABLE IF EXISTS bye_nu.wizard_entities CASCADE;
DROP TABLE IF EXISTS bye_nu.wizard_messages CASCADE;
DROP TABLE IF EXISTS bye_nu.wizard_sessions CASCADE;
DROP TABLE IF EXISTS public.team_members CASCADE;
DROP TABLE IF EXISTS public.credits CASCADE;
DROP TABLE IF EXISTS public.analytics_events CASCADE;
DROP TABLE IF EXISTS public.websites CASCADE;
DROP TABLE IF EXISTS public.activities CASCADE;
DROP TABLE IF EXISTS public.deals CASCADE;
DROP TABLE IF EXISTS public.leads CASCADE;
DROP TABLE IF EXISTS public.metrics CASCADE;
DROP TABLE IF EXISTS public.ventures CASCADE;
DROP TABLE IF EXISTS bye_nu.layout_templates CASCADE;
DROP TABLE IF EXISTS bye_nu.customer_profiles CASCADE;
DROP TABLE IF EXISTS bye_nu.memberships CASCADE;
DROP TABLE IF EXISTS bye_nu.reports CASCADE;
DROP TABLE IF EXISTS bye_nu.submissions CASCADE;
DROP TABLE IF EXISTS bye_nu.users CASCADE;
```

---

**Last Updated:** February 5, 2026
