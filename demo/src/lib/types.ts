// Type definitions for the Apify E-commerce demo application
// TODO: These types will be used by the Apify and Supabase service implementations

export interface ActorRun {
  id: string;
  actor_id: string;
  run_id: string;
  status: 'pending' | 'running' | 'succeeded' | 'failed';
  input: Record<string, any>;
  item_count: number;
  started_at: string;
  finished_at?: string;
  error?: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  run_id: string;
  product_key: string;
  source_url: string;
  external_id?: string;
  title?: string;
  price?: number;
  currency?: string;
  availability?: string;
  merchant?: string;
  image_url?: string;
  category?: string;
  brand?: string;
  description?: string;
  rating?: number;
  raw_json?: Record<string, any>;
  scraped_at: string;
  created_at: string;
  updated_at: string;
}

export interface EcommerceScrapeInput {
  search?: string;
  startUrls?: Array<{ url: string }>;
  maxItems?: number;
  country?: string;
}

