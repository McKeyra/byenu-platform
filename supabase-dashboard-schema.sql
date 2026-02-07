-- ─── byeNU / enuwWEB Dashboard Schema ───
-- Shared database schema for both byeNU Client Dashboard and ENUW Key Master Dashboard

-- ─── VENTURES TABLE ───
-- Stores portfolio company information
CREATE TABLE IF NOT EXISTS ventures (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  color TEXT NOT NULL, -- Hex color for UI
  target_valuation BIGINT, -- Target valuation in cents
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'archived')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ─── METRICS TABLE ───
-- Time-series metrics for ventures
CREATE TABLE IF NOT EXISTS metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  venture_id UUID REFERENCES ventures(id) ON DELETE CASCADE,
  metric_name TEXT NOT NULL,
  value NUMERIC NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_metrics_venture ON metrics(venture_id);
CREATE INDEX idx_metrics_timestamp ON metrics(timestamp);
CREATE INDEX idx_metrics_name ON metrics(metric_name);

-- ─── LEADS TABLE ───
-- AI6-scored leads across all ventures
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  venture_id UUID REFERENCES ventures(id) ON DELETE SET NULL,
  company_name TEXT NOT NULL,
  industry TEXT,
  city TEXT,
  website TEXT,
  email TEXT,
  owner_name TEXT,
  employee_count INTEGER,
  ai6_score INTEGER CHECK (ai6_score >= 0 AND ai6_score <= 100),
  tier TEXT CHECK (tier IN ('hot', 'warm', 'monitor')),
  stage TEXT DEFAULT 'new' CHECK (stage IN ('new', 'contacted', 'qualified', 'proposal', 'negotiation', 'closed', 'lost')),
  dimensions_json JSONB DEFAULT '{}'::jsonb, -- 7-dimension breakdown
  contact_info JSONB DEFAULT '{}'::jsonb, -- email, phone, LinkedIn, etc.
  notes TEXT,
  last_contact_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_leads_venture ON leads(venture_id);
CREATE INDEX idx_leads_ai6_score ON leads(ai6_score DESC);
CREATE INDEX idx_leads_tier ON leads(tier);
CREATE INDEX idx_leads_stage ON leads(stage);

-- ─── DEALS TABLE ───
-- Pipeline deals converted from leads
CREATE TABLE IF NOT EXISTS deals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  venture_id UUID REFERENCES ventures(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  stage TEXT NOT NULL CHECK (stage IN ('discovery', 'proposal', 'negotiation', 'contract', 'closed')),
  value NUMERIC NOT NULL, -- Deal value in cents
  probability INTEGER DEFAULT 20 CHECK (probability >= 0 AND probability <= 100),
  assigned_to UUID, -- User ID
  days_in_stage INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  closed_at TIMESTAMP
);

CREATE INDEX idx_deals_venture ON deals(venture_id);
CREATE INDEX idx_deals_stage ON deals(stage);
CREATE INDEX idx_deals_lead ON deals(lead_id);

-- ─── ACTIVITIES TABLE ───
-- Cross-portfolio activity feed
CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  venture_id UUID REFERENCES ventures(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL CHECK (activity_type IN ('lead', 'deal', 'site', 'order', 'metric', 'user')),
  description TEXT NOT NULL,
  entity_id UUID, -- ID of related entity (lead_id, deal_id, etc.)
  entity_type TEXT, -- 'lead', 'deal', 'website', etc.
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_activities_venture ON activities(venture_id);
CREATE INDEX idx_activities_type ON activities(activity_type);
CREATE INDEX idx_activities_created ON activities(created_at DESC);

-- ─── WEBSITES TABLE (byeNU) ───
-- Generated websites for enuwWEB customers
CREATE TABLE IF NOT EXISTS websites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL, -- Supabase auth.users.id
  name TEXT NOT NULL,
  subdomain TEXT UNIQUE NOT NULL,
  custom_domain TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  pages_json JSONB DEFAULT '[]'::jsonb, -- Array of page structures
  abilities_json JSONB DEFAULT '[]'::jsonb, -- Active abilities/features
  config_json JSONB DEFAULT '{}'::jsonb, -- Site configuration
  component_structure JSONB DEFAULT '{}'::jsonb, -- Component library structure
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  published_at TIMESTAMP
);

CREATE INDEX idx_websites_user ON websites(user_id);
CREATE INDEX idx_websites_subdomain ON websites(subdomain);
CREATE INDEX idx_websites_status ON websites(status);

-- ─── ANALYTICS_EVENTS TABLE (byeNU) ───
-- Website analytics events
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  website_id UUID REFERENCES websites(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL CHECK (event_type IN ('pageview', 'click', 'form_submit', 'conversion')),
  page TEXT,
  visitor_id TEXT, -- Anonymous visitor ID
  referrer TEXT,
  user_agent TEXT,
  ip_address INET,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_analytics_website ON analytics_events(website_id);
CREATE INDEX idx_analytics_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_created ON analytics_events(created_at DESC);

-- ─── CREDITS TABLE (byeNU) ───
-- User credit balance and usage
CREATE TABLE IF NOT EXISTS credits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL, -- Supabase auth.users.id
  plan TEXT DEFAULT 'starter' CHECK (plan IN ('starter', 'pro', 'enterprise')),
  balance INTEGER DEFAULT 1000, -- Credit balance
  limit INTEGER DEFAULT 1000, -- Credit limit for plan
  usage_history_json JSONB DEFAULT '[]'::jsonb, -- Array of usage records
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_credits_user ON credits(user_id);

-- ─── TEAM_MEMBERS TABLE (byeNU) ───
-- Team members for websites
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  website_id UUID REFERENCES websites(id) ON DELETE CASCADE,
  user_id UUID NOT NULL, -- Supabase auth.users.id
  role TEXT DEFAULT 'viewer' CHECK (role IN ('admin', 'editor', 'viewer')),
  invited_by UUID, -- User ID who invited
  invited_at TIMESTAMP DEFAULT NOW(),
  joined_at TIMESTAMP,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'removed'))
);

CREATE INDEX idx_team_website ON team_members(website_id);
CREATE INDEX idx_team_user ON team_members(user_id);

-- ─── UPDATED_AT TRIGGERS ───
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_ventures_updated_at BEFORE UPDATE ON ventures
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_deals_updated_at BEFORE UPDATE ON deals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_websites_updated_at BEFORE UPDATE ON websites
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_credits_updated_at BEFORE UPDATE ON credits
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ─── ROW LEVEL SECURITY (RLS) ───
-- Enable RLS on all tables
ALTER TABLE ventures ENABLE ROW LEVEL SECURITY;
ALTER TABLE metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE websites ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- ─── RLS POLICIES ───
-- Note: These are basic policies. Adjust based on your auth setup.

-- Ventures: Public read, admin write
CREATE POLICY "Ventures are viewable by everyone" ON ventures FOR SELECT USING (true);
CREATE POLICY "Ventures are insertable by authenticated users" ON ventures FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Metrics: Public read, authenticated write
CREATE POLICY "Metrics are viewable by everyone" ON metrics FOR SELECT USING (true);
CREATE POLICY "Metrics are insertable by authenticated users" ON metrics FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Leads: Authenticated users can view all, insert own
CREATE POLICY "Leads are viewable by authenticated users" ON leads FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Leads are insertable by authenticated users" ON leads FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Deals: Authenticated users can view all, insert own
CREATE POLICY "Deals are viewable by authenticated users" ON deals FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Deals are insertable by authenticated users" ON deals FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Activities: Public read, authenticated write
CREATE POLICY "Activities are viewable by everyone" ON activities FOR SELECT USING (true);
CREATE POLICY "Activities are insertable by authenticated users" ON activities FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Websites: Users can only see their own websites
CREATE POLICY "Websites are viewable by owner" ON websites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Websites are insertable by authenticated users" ON websites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Websites are updatable by owner" ON websites FOR UPDATE USING (auth.uid() = user_id);

-- Analytics: Users can only see analytics for their websites
CREATE POLICY "Analytics are viewable by website owner" ON analytics_events FOR SELECT
  USING (EXISTS (SELECT 1 FROM websites WHERE websites.id = analytics_events.website_id AND websites.user_id = auth.uid()));
CREATE POLICY "Analytics are insertable by system" ON analytics_events FOR INSERT WITH CHECK (true);

-- Credits: Users can only see their own credits
CREATE POLICY "Credits are viewable by owner" ON credits FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Credits are insertable by authenticated users" ON credits FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Credits are updatable by owner" ON credits FOR UPDATE USING (auth.uid() = user_id);

-- Team Members: Users can see team members for websites they own or are part of
CREATE POLICY "Team members are viewable by website owner or member" ON team_members FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM websites WHERE websites.id = team_members.website_id AND websites.user_id = auth.uid())
    OR team_members.user_id = auth.uid()
  );
CREATE POLICY "Team members are insertable by website owner" ON team_members FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM websites WHERE websites.id = team_members.website_id AND websites.user_id = auth.uid()));

-- ─── INITIAL DATA ───
-- Insert default ventures
INSERT INTO ventures (name, slug, color, target_valuation, status) VALUES
  ('Vance', 'vance', '#C77DFF', 4400000000000, 'active'),
  ('Ball in the 6', 'b6', '#FF6B00', 2200000000000, 'active'),
  ('Wear US', 'wearus', '#00CC88', 1800000000000, 'active'),
  ('enuwWEB', 'enuwweb', '#0066FF', 1600000000000, 'active')
ON CONFLICT DO NOTHING;
