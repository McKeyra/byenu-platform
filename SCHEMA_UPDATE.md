# Schema Update: bye_nu Schema

Your migration SQL uses a custom schema `bye_nu` instead of the default `public` schema. This is a good practice for isolating your application's tables.

## ✅ Application Code Updated

All API files have been updated to use the `bye_nu` schema:

- ✅ `src/api/submissions.js` - All queries updated
- ✅ `src/api/reports.js` - All queries updated  
- ✅ `src/api/memberships.js` - All queries updated
- ✅ `src/api/sites.js` - All queries updated
- ✅ `src/api/email.js` - All queries updated
- ✅ `src/lib/auth/AuthContext.jsx` - User role query updated
- ✅ `src/pages/Pipeline.jsx` - Submissions query updated
- ✅ `src/pages/CommandCenter.jsx` - Stats queries updated
- ✅ `src/pages/Builder.jsx` - Template update query updated

## Important Notes

### Supabase PostgREST Schema Support

Supabase PostgREST supports schema-qualified table names using the format `schema.table`. However, there are a few things to note:

1. **Schema must be exposed**: Make sure the `bye_nu` schema is exposed in your Supabase project settings
2. **RLS policies**: Your RLS policies reference `bye_nu.users` which is correct
3. **Foreign keys**: Foreign keys between schemas work fine

### If You Get "relation does not exist" Errors

If you encounter errors after running the migration, you may need to:

1. **Expose the schema in Supabase:**
   - Go to Supabase Dashboard → Settings → API
   - Under "Exposed schemas", add `bye_nu` (if not already there)

2. **Or use the public schema:**
   - If you prefer to keep everything in `public`, you can modify the migration SQL to remove the schema references
   - Then revert the code changes to use `table_name` instead of `bye_nu.table_name`

### Testing the Connection

After running your migration SQL:

1. **Test a simple query:**
   ```sql
   SELECT * FROM bye_nu.users LIMIT 1;
   ```

2. **Check RLS is enabled:**
   ```sql
   SELECT tablename, rowsecurity 
   FROM pg_tables 
   WHERE schemaname = 'bye_nu';
   ```

3. **Test from your app:**
   - Start dev server: `npm run dev`
   - Try signing up a user
   - Check if data appears in `bye_nu.users` table

## Migration SQL Notes

Your migration SQL looks good! A few things to verify:

1. ✅ Schema creation: `CREATE SCHEMA IF NOT EXISTS bye_nu;`
2. ✅ Search path: `SET search_path TO bye_nu, public;`
3. ✅ Tables created with schema prefix: `bye_nu.users`, `bye_nu.submissions`, etc.
4. ✅ RLS policies reference schema: `bye_nu.users`, `bye_nu.is_staff()`
5. ✅ Helper function: `bye_nu.is_staff()` for staff checks
6. ✅ Auto-staff assignment: Users with `@enuw.ca` email get staff role

## Auto-Staff Assignment

Your migration includes smart staff assignment:
- `ai@enuw.ca` → staff
- Any email ending with `@enuw.ca` → staff
- All others → customer

This is great for your team!

## Next Steps

1. Run your migration SQL in Supabase SQL Editor
2. Verify tables were created in `bye_nu` schema
3. Test the app - try signing up a user
4. Check that data appears in the correct schema

If everything works, you're all set! 🎉
