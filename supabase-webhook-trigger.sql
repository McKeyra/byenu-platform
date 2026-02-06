-- Supabase Database Webhook Trigger for n8n
-- This triggers when a report is created and sends data to n8n webhook

-- Function to call n8n webhook when report is created
CREATE OR REPLACE FUNCTION bye_nu.notify_n8n_report_created()
RETURNS TRIGGER AS $$
DECLARE
  submission_data JSONB;
  webhook_url TEXT := current_setting('app.n8n_webhook_url', true);
BEGIN
  -- Get submission data
  SELECT row_to_json(s.*)::JSONB INTO submission_data
  FROM bye_nu.submissions s
  WHERE s.id = NEW.submission_id;

  -- Call n8n webhook if URL is configured
  IF webhook_url IS NOT NULL AND webhook_url != '' THEN
    PERFORM net.http_post(
      url := webhook_url,
      headers := jsonb_build_object(
        'Content-Type', 'application/json'
      ),
      body := jsonb_build_object(
        'event', 'report_created',
        'report_id', NEW.id,
        'submission_id', NEW.submission_id,
        'created_at', NEW.created_at,
        'submission', submission_data,
        'report', jsonb_build_object(
          'id', NEW.id,
          'build_prompt', NEW.build_prompt,
          'breakdown_json', NEW.breakdown_json,
          'created_at', NEW.created_at
        )
      )
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call webhook when report is inserted
DROP TRIGGER IF EXISTS trigger_report_created_webhook ON bye_nu.reports;
CREATE TRIGGER trigger_report_created_webhook
  AFTER INSERT ON bye_nu.reports
  FOR EACH ROW
  EXECUTE FUNCTION bye_nu.notify_n8n_report_created();

-- Alternative: Use Supabase Edge Function or HTTP extension
-- If net.http_post is not available, use pg_net extension or Edge Function

-- Set webhook URL (run this in Supabase SQL Editor with your n8n webhook URL)
-- ALTER DATABASE postgres SET app.n8n_webhook_url = 'https://your-n8n-instance.com/webhook/submission';

-- Or use Supabase Database Webhooks (recommended):
-- 1. Go to Supabase Dashboard → Database → Webhooks
-- 2. Create new webhook
-- 3. Table: bye_nu.reports
-- 4. Events: INSERT
-- 5. HTTP Request: POST to your n8n webhook URL
-- 6. Payload: Custom JSON (see below)
