# byeNU Platform

Unified platform consolidating customer product (report-first, claim-to-pay, three builder paths) and internal Pipeline + Command Centre.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   - Copy `.env.example` to `.env` (already configured with your credentials)
   - Ensure Supabase and Stripe keys are set

3. **Set up Supabase database:**
   Run the following SQL in your Supabase SQL editor:

   ```sql
   -- Users table (extends Supabase Auth)
   CREATE TABLE IF NOT EXISTS users (
     id UUID PRIMARY KEY REFERENCES auth.users(id),
     role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'staff')),
     created_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Submissions table
   CREATE TABLE IF NOT EXISTS submissions (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     source TEXT NOT NULL CHECK (source IN ('user', 'staff')),
     staff_id UUID REFERENCES users(id) NULL,
     wizard_type TEXT NOT NULL CHECK (wizard_type IN ('quick', 'full', 'ai')),
     session_id TEXT,
     email TEXT NOT NULL,
     wizard_data JSONB NOT NULL,
     report_id UUID NULL,
     status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'report_sent', 'claimed', 'site_generated')),
     created_at TIMESTAMPTZ DEFAULT NOW(),
     updated_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Reports table
   CREATE TABLE IF NOT EXISTS reports (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     submission_id UUID REFERENCES submissions(id) NOT NULL,
     build_prompt TEXT NOT NULL,
     breakdown_json JSONB NOT NULL,
     sent_at TIMESTAMPTZ NULL,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Memberships table
   CREATE TABLE IF NOT EXISTS memberships (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID REFERENCES users(id) NOT NULL,
     plan TEXT NOT NULL CHECK (plan IN ('starter', 'business', 'pro')),
     status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired')),
     site_status TEXT NOT NULL DEFAULT 'draft' CHECK (site_status IN ('draft', 'ready', 'live')),
     selected_template_id TEXT,
     stripe_customer_id TEXT NULL,
     stripe_subscription_id TEXT NULL,
     created_at TIMESTAMPTZ DEFAULT NOW(),
     updated_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Customer profiles table
   CREATE TABLE IF NOT EXISTS customer_profiles (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     membership_id UUID REFERENCES memberships(id) NOT NULL,
     business_name TEXT NOT NULL,
     industry TEXT,
     business_type TEXT,
     goals TEXT[],
     audience TEXT,
     primary_cta TEXT,
     tone TEXT[],
     color_directions TEXT[],
     desired_pages TEXT[],
     forms_needed TEXT[],
     unique_angle TEXT,
     created_at TIMESTAMPTZ DEFAULT NOW(),
     updated_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Layout templates table
   CREATE TABLE IF NOT EXISTS layout_templates (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     membership_id UUID REFERENCES memberships(id) NOT NULL,
     template_id TEXT NOT NULL,
     name TEXT NOT NULL,
     layout_style TEXT,
     color_palette JSONB,
     typography JSONB,
     site_content JSONB,
     form_schemas JSONB,
     created_at TIMESTAMPTZ DEFAULT NOW(),
     updated_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Indexes
   CREATE INDEX IF NOT EXISTS idx_submissions_source ON submissions(source);
   CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);
   CREATE INDEX IF NOT EXISTS idx_submissions_email ON submissions(email);
   CREATE INDEX IF NOT EXISTS idx_memberships_user_id ON memberships(user_id);
   CREATE INDEX IF NOT EXISTS idx_customer_profiles_membership_id ON customer_profiles(membership_id);
   CREATE INDEX IF NOT EXISTS idx_layout_templates_membership_id ON layout_templates(membership_id);

   -- Row Level Security (RLS) policies
   ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
   ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
   ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;
   ALTER TABLE customer_profiles ENABLE ROW LEVEL SECURITY;
   ALTER TABLE layout_templates ENABLE ROW LEVEL SECURITY;

   -- Policy: Users can see their own submissions
   CREATE POLICY "Users can view own submissions" ON submissions
     FOR SELECT USING (auth.uid()::text = email OR auth.uid() IN (SELECT id FROM users WHERE role = 'staff'));

   -- Policy: Users can insert their own submissions
   CREATE POLICY "Users can insert own submissions" ON submissions
     FOR INSERT WITH CHECK (auth.uid()::text = email);

   -- Policy: Staff can view all submissions
   CREATE POLICY "Staff can view all submissions" ON submissions
     FOR SELECT USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'staff'));
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

## Features Implemented

- ✅ Project structure and configuration
- ✅ Supabase authentication with roles
- ✅ Payment adapter (Stripe) with swappable interface
- ✅ Quick Wizard (4 pages, 2-3 min scaffold)
- ✅ Report generation and breakdown
- ✅ Dashboard with report view
- ✅ Claim flow with plan selection

## Features Pending

- ⏳ Full Business Wizard (17 steps, condensed pages)
- ⏳ AI Builder (conversational 17-step)
- ⏳ Email sending for reports
- ⏳ Site generation after claim
- ⏳ Builder page (template editor)
- ⏳ Pipeline UI (internal dashboard)
- ⏳ Staff wizard

## Architecture

- **Frontend:** React 18, Vite, Tailwind CSS, Radix UI
- **Backend:** Supabase (Auth + Database)
- **Payments:** Stripe (swappable adapter for Helcim/Cardium)
- **State:** React Query for server state, React hooks for local state

## Project Structure

```
byenu-platform/
├── src/
│   ├── api/              # API service functions
│   ├── components/       # React components
│   │   ├── ui/          # Radix UI components
│   │   ├── ui-custom/   # Custom components (GlassCard, GlassButton, Logo)
│   │   └── wizard/      # Wizard components
│   ├── lib/
│   │   ├── auth/        # Auth context and hooks
│   │   ├── payment/     # Payment adapter interface and implementations
│   │   └── supabase.js  # Supabase client
│   ├── pages/           # Page components
│   └── utils/           # Utility functions
├── functions/           # Edge Functions (future)
└── public/              # Static assets
```

## Next Steps

1. Complete Full Business Wizard implementation
2. Implement AI Builder conversational flow
3. Add email service integration
4. Implement site generation logic
5. Build Builder page with template editor
6. Create Pipeline UI for internal dashboard
7. Add staff wizard functionality
