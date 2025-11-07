-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id TEXT NOT NULL REFERENCES actor_runs(run_id) ON DELETE CASCADE,
  product_key TEXT NOT NULL UNIQUE,
  source_url TEXT NOT NULL,
  external_id TEXT,
  title TEXT,
  price NUMERIC,
  currency TEXT DEFAULT 'USD',
  availability TEXT,
  merchant TEXT,
  image_url TEXT,
  category TEXT,
  brand TEXT,
  description TEXT,
  rating NUMERIC,
  raw_json JSONB,
  scraped_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on run_id for filtering by run
CREATE INDEX IF NOT EXISTS idx_products_run_id ON products(run_id);

-- Create index on product_key for upserts
CREATE INDEX IF NOT EXISTS idx_products_product_key ON products(product_key);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);

-- Create index on price for filtering and sorting
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for products table
CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create trigger for actor_runs table
CREATE TRIGGER update_actor_runs_updated_at
    BEFORE UPDATE ON actor_runs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

