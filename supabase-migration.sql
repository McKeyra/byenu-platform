-- 1. SCHEMA SETUP
CREATE SCHEMA IF NOT EXISTS bye_nu;
-- Set the path so following commands target this schema automatically
SET search_path TO bye_nu, public;

-- 2. TABLES (All isolated in bye_nu schema)
CREATE TABLE IF NOT EXISTS bye_nu.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'staff')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bye_nu.submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source TEXT NOT NULL CHECK (source IN ('user', 'staff')),
  staff_id UUID REFERENCES bye_nu.users(id) ON DELETE SET NULL,
  wizard_type TEXT NOT NULL CHECK (wizard_type IN ('quick', 'full', 'ai')),
  session_id TEXT,
  email TEXT NOT NULL,
  wizard_data JSONB NOT NULL,
  report_id UUID NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'report_sent', 'claimed', 'site_generated')),
  reminders_sent JSONB DEFAULT '[]'::JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bye_nu.reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID REFERENCES bye_nu.submissions(id) ON DELETE CASCADE NOT NULL,
  build_prompt TEXT NOT NULL,
  breakdown_json JSONB NOT NULL,
  sent_at TIMESTAMPTZ NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bye_nu.memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES bye_nu.users(id) ON DELETE CASCADE NOT NULL,
  plan TEXT NOT NULL CHECK (plan IN ('starter', 'business', 'pro')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired')),
  site_status TEXT NOT NULL DEFAULT 'draft' CHECK (site_status IN ('draft', 'ready', 'live')),
  selected_template_id TEXT,
  stripe_customer_id TEXT NULL,
  stripe_subscription_id TEXT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bye_nu.customer_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  membership_id UUID REFERENCES bye_nu.memberships(id) ON DELETE CASCADE NOT NULL,
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

CREATE TABLE IF NOT EXISTS bye_nu.layout_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  membership_id UUID REFERENCES bye_nu.memberships(id) ON DELETE CASCADE NOT NULL,
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

-- 3. INDEXES
CREATE INDEX IF NOT EXISTS idx_sub_source ON bye_nu.submissions(source);
CREATE INDEX IF NOT EXISTS idx_sub_status ON bye_nu.submissions(status);
CREATE INDEX IF NOT EXISTS idx_sub_email ON bye_nu.submissions(email);
CREATE INDEX IF NOT EXISTS idx_mem_user_id ON bye_nu.memberships(user_id);

-- 4. CONSTRAINTS
ALTER TABLE bye_nu.submissions 
  ADD CONSTRAINT fk_submissions_report 
  FOREIGN KEY (report_id) REFERENCES bye_nu.reports(id) ON DELETE SET NULL;

-- 5. ROW LEVEL SECURITY (RLS)
ALTER TABLE bye_nu.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE bye_nu.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE bye_nu.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE bye_nu.memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE bye_nu.customer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bye_nu.layout_templates ENABLE ROW LEVEL SECURITY;

-- Staff/Admin Check Helper
CREATE OR REPLACE FUNCTION bye_nu.is_staff() RETURNS BOOLEAN AS $$
  SELECT EXISTS (SELECT 1 FROM bye_nu.users WHERE id = auth.uid() AND role = 'staff');
$$ LANGUAGE sql SECURITY DEFINER;

-- Policies
CREATE POLICY "Users view own / Staff view all" ON bye_nu.users FOR SELECT USING (auth.uid() = id OR bye_nu.is_staff());
CREATE POLICY "Users edit own profile" ON bye_nu.users FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Submissions Access" ON bye_nu.submissions FOR ALL USING (email = (auth.jwt() ->> 'email') OR bye_nu.is_staff());

CREATE POLICY "Reports Access" ON bye_nu.reports FOR SELECT USING (
  EXISTS (SELECT 1 FROM bye_nu.submissions s WHERE s.id = submission_id AND (s.email = auth.jwt() ->> 'email' OR bye_nu.is_staff()))
);

CREATE POLICY "Membership Access" ON bye_nu.memberships FOR ALL USING (user_id = auth.uid() OR bye_nu.is_staff());

CREATE POLICY "Profile Access" ON bye_nu.customer_profiles FOR ALL USING (
  EXISTS (SELECT 1 FROM bye_nu.memberships m WHERE m.id = membership_id AND (m.user_id = auth.uid() OR bye_nu.is_staff()))
);

CREATE POLICY "Template Access" ON bye_nu.layout_templates FOR ALL USING (
  EXISTS (SELECT 1 FROM bye_nu.memberships m WHERE m.id = membership_id AND (m.user_id = auth.uid() OR bye_nu.is_staff()))
);

-- 6. AUTOMATION TRIGGERS
-- Handle New User Creation & Auto-Staff Role
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO bye_nu.users (id, role)
  VALUES (
    NEW.id, 
    CASE 
      WHEN NEW.email = 'ai@enuw.ca' THEN 'staff'
      WHEN NEW.email LIKE '%@enuw.ca' THEN 'staff'
      ELSE 'customer'
    END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Handle Updated_at Timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_ts BEFORE UPDATE ON bye_nu.users FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_subs_ts BEFORE UPDATE ON bye_nu.submissions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_mem_ts BEFORE UPDATE ON bye_nu.memberships FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();