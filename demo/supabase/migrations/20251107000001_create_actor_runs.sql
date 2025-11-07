-- Create actor_runs table
CREATE TABLE IF NOT EXISTS actor_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id TEXT NOT NULL,
  run_id TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'running', 'succeeded', 'failed')),
  input JSONB,
  item_count INTEGER DEFAULT 0,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  finished_at TIMESTAMPTZ,
  error TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on run_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_actor_runs_run_id ON actor_runs(run_id);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_actor_runs_status ON actor_runs(status);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_actor_runs_created_at ON actor_runs(created_at DESC);

