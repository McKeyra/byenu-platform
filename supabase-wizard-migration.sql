-- Wizard Sessions and Conversational Engine
-- Part of byeNU Master Prompt Library - Part 1

-- Wizard Sessions table
CREATE TABLE IF NOT EXISTS bye_nu.wizard_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  current_stage INTEGER DEFAULT 1,
  conversation_history JSONB DEFAULT '[]'::jsonb,
  extracted_data JSONB DEFAULT '{}'::jsonb,
  selected_template_id UUID REFERENCES bye_nu.layout_templates(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed', 'deployed'))
);

CREATE INDEX IF NOT EXISTS idx_wizard_sessions_user ON bye_nu.wizard_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_wizard_sessions_status ON bye_nu.wizard_sessions(status);
CREATE INDEX IF NOT EXISTS idx_wizard_sessions_created ON bye_nu.wizard_sessions(created_at DESC);

-- Wizard Messages table
CREATE TABLE IF NOT EXISTS bye_nu.wizard_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES bye_nu.wizard_sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb, -- store rich content (images, buttons, cards, suggestions)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_wizard_messages_session ON bye_nu.wizard_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_wizard_messages_created ON bye_nu.wizard_messages(created_at);

-- Extracted Entities table
CREATE TABLE IF NOT EXISTS bye_nu.wizard_entities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES bye_nu.wizard_sessions(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL,
  entity_value TEXT NOT NULL,
  confidence_score DECIMAL(3,2) DEFAULT 1.0,
  extracted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(session_id, entity_type)
);

CREATE INDEX IF NOT EXISTS idx_wizard_entities_session ON bye_nu.wizard_entities(session_id);
CREATE INDEX IF NOT EXISTS idx_wizard_entities_type ON bye_nu.wizard_entities(entity_type);

-- Update trigger for wizard_sessions
CREATE OR REPLACE FUNCTION bye_nu.update_wizard_sessions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_wizard_sessions_updated_at
  BEFORE UPDATE ON bye_nu.wizard_sessions
  FOR EACH ROW
  EXECUTE FUNCTION bye_nu.update_wizard_sessions_updated_at();

-- RLS Policies
ALTER TABLE bye_nu.wizard_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE bye_nu.wizard_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE bye_nu.wizard_entities ENABLE ROW LEVEL SECURITY;

-- Users can only access their own sessions
CREATE POLICY "Users can view own wizard sessions"
  ON bye_nu.wizard_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own wizard sessions"
  ON bye_nu.wizard_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own wizard sessions"
  ON bye_nu.wizard_sessions FOR UPDATE
  USING (auth.uid() = user_id);

-- Messages are accessible via session
CREATE POLICY "Users can view messages from own sessions"
  ON bye_nu.wizard_messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM bye_nu.wizard_sessions
      WHERE id = wizard_messages.session_id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create messages in own sessions"
  ON bye_nu.wizard_messages FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM bye_nu.wizard_sessions
      WHERE id = wizard_messages.session_id
      AND user_id = auth.uid()
    )
  );

-- Entities are accessible via session
CREATE POLICY "Users can view entities from own sessions"
  ON bye_nu.wizard_entities FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM bye_nu.wizard_sessions
      WHERE id = wizard_entities.session_id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create entities in own sessions"
  ON bye_nu.wizard_entities FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM bye_nu.wizard_sessions
      WHERE id = wizard_entities.session_id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update entities in own sessions"
  ON bye_nu.wizard_entities FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM bye_nu.wizard_sessions
      WHERE id = wizard_entities.session_id
      AND user_id = auth.uid()
    )
  );

-- Staff can view all sessions
CREATE POLICY "Staff can view all wizard sessions"
  ON bye_nu.wizard_sessions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM bye_nu.users
      WHERE id = auth.uid()
      AND role IN ('staff', 'admin')
    )
  );

CREATE POLICY "Staff can view all wizard messages"
  ON bye_nu.wizard_messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM bye_nu.users
      WHERE id = auth.uid()
      AND role IN ('staff', 'admin')
    )
  );

CREATE POLICY "Staff can view all wizard entities"
  ON bye_nu.wizard_entities FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM bye_nu.users
      WHERE id = auth.uid()
      AND role IN ('staff', 'admin')
    )
  );
