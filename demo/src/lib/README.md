# Service Layer Implementation Guide

This directory will contain the service layer implementations for:

## Files to Create (with Copilot Agent)

### `apify.ts`
Service for interacting with the Apify platform:
- Initialize Apify client
- Run e-commerce scraper actor
- Fetch dataset results
- Handle actor run status

**Key Functions:**
- `runEcommerceScrape(input: EcommerceScrapeInput)`
- `getActorRun(runId: string)`
- `getDatasetItems(datasetId: string)`

### `supabase.ts`
Service for database operations:
- Initialize Supabase client (with service role key for server-side)
- CRUD operations for actor_runs table
- CRUD operations for products table
- Upsert logic for products

**Key Functions:**
- `createActorRun(data)`
- `updateActorRun(runId, updates)`
- `getActorRuns(limit)`
- `upsertProducts(products)`
- `getProducts(filters)`

## Environment Variables Required

```env
APIFY_TOKEN=your_token_here
NEXT_PUBLIC_SUPABASE_URL=your_url_here
SUPABASE_SERVICE_ROLE_KEY=your_key_here
```

## Usage in API Routes

See the API routes in `src/app/api/` for how these services will be consumed.

---
**Note:** These services should be implemented using the Apify Expert Copilot agent 
following the instructions in `.github/agents/apify-integration-expert.md`

