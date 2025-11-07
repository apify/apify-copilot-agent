# Demo Recording Guide

This guide outlines how to use this repository for recording the Apify Expert Copilot agent demonstration.

## Repository Structure

```
apify-expert-agent/
├── .github/agents/
│   └── apify-integration-expert.md    # Custom Copilot agent profile
├── demo/                               # Demo scaffold application
│   ├── src/
│   │   ├── app/                       # Next.js pages and API routes (empty)
│   │   ├── components/                # UI components (with TODOs)
│   │   └── lib/                       # Service layer (stub files only)
│   ├── supabase/migrations/           # Database schema SQL files
│   ├── .env.example                   # Environment variable template
│   └── README.md                      # Setup instructions
├── PRD.md                             # Product requirements document
├── task-manager.md                    # Project execution plan
└── changelog.md                       # Change history

```

## Pre-Demo Setup

### 1. Prerequisites
- Apify account with API token
- Supabase project with credentials
- GitHub Copilot with custom agent support
- Code editor (VS Code, Cursor, etc.)

### 2. Environment Configuration
```bash
cd demo
cp .env.example .env.local
# Fill in your credentials:
# - APIFY_TOKEN
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY
# - SUPABASE_SERVICE_ROLE_KEY
```

### 3. Database Setup
Apply migrations in Supabase SQL Editor:
1. Run `supabase/migrations/20251107000001_create_actor_runs.sql`
2. Run `supabase/migrations/20251107000002_create_products.sql`

### 4. Install Dependencies
```bash
npm install
```

## Demo Recording Flow

### Act 1: Introduction (2-3 minutes)
1. **Show the repository structure**
   - Highlight `.github/agents/apify-integration-expert.md`
   - Explain it's a custom Copilot agent profile
   - Show `PRD.md` for project context

2. **Show the scaffold**
   - Navigate to `demo/` directory
   - Open UI components with TODO comments
   - Show empty `src/lib/` directory
   - Open `src/lib/README.md` to show implementation guide

3. **Run the scaffold**
   ```bash
   npm run dev
   ```
   - Show placeholder UI at localhost:3000
   - Click buttons to show they don't work yet

### Act 2: Agent-Guided Implementation (10-15 minutes)

#### Step 1: Implement Apify Service Layer
**Prompt the Copilot agent:**
> "Help me implement the Apify service to call the e-commerce scraper actor. Use the actor `apify/e-commerce-scraping-tool` and follow the patterns in the agent profile."

**Expected outcome:**
- Creates `src/lib/apify.ts`
- Implements `runEcommerceScrape()` function
- Shows type-safe implementation

#### Step 2: Implement Supabase Data Layer
**Prompt:**
> "Create the Supabase service layer for storing actor runs and products. Follow the schema in supabase/migrations/ and use the types from types.ts."

**Expected outcome:**
- Creates `src/lib/supabase.ts`
- Implements CRUD functions for both tables
- Shows proper error handling

#### Step 3: Build Scrape API Route
**Prompt:**
> "Create the API route at /api/scrape that triggers the Apify actor and stores results in Supabase. Use the services we just created."

**Expected outcome:**
- Creates `src/app/api/scrape/route.ts`
- Connects Apify → Supabase pipeline
- Includes data transformation logic

#### Step 4: Build Read API Routes
**Prompt:**
> "Create API routes for fetching runs and products from Supabase."

**Expected outcome:**
- Creates `src/app/api/runs/route.ts`
- Creates `src/app/api/products/route.ts`

#### Step 5: Connect UI Components
**Prompt:**
> "Update the ScrapeForm component to call the /api/scrape endpoint and handle the response."

**Expected outcome:**
- Working form submission
- Loading states
- Error handling

**Repeat for:**
- RunHistory component
- ProductGrid component
- StatsCards component

### Act 3: Testing & Demo (3-5 minutes)

1. **Trigger a Live Scrape**
   - Enter search query (e.g., "iPhone 15 Pro")
   - Click "Run Scrape"
   - Show loading state

2. **Show Results**
   - View run history appearing
   - See products populated in grid
   - Check stats cards updating

3. **Verify in Supabase**
   - Open Supabase dashboard
   - Show `actor_runs` table with data
   - Show `products` table with scraped items

### Act 4: Wrap-Up (1-2 minutes)

1. **Highlight key points:**
   - Started with scaffold only
   - Agent guided every implementation step
   - Full integration built in < 20 minutes
   - Production-ready patterns used

2. **Show final code:**
   - Service layer implementations
   - API routes
   - Connected UI components

3. **Resources:**
   - Link to agent profile
   - Link to Apify docs
   - Link to this repository

## Key Messages

- **"No Apify code existed at the start"** - Emphasize the scaffold was empty
- **"Agent understood the context"** - Show how it referenced PRD, types, and schema
- **"Production patterns applied"** - Point out error handling, type safety, etc.
- **"Stack agnostic"** - Mention the agent works with any framework

## Troubleshooting

### If the Agent Doesn't Reference the Profile
- Explicitly mention: "Use the Apify Expert agent profile in .github/agents/"
- Reference specific sections: "Follow the JavaScript workflow in the agent instructions"

### If Implementation Differs
- That's OK! Show adaptability
- Highlight how the agent adjusted to your prompts

### If Scrape Fails
- Have backup dataset JSON ready
- Show error handling in action
- Demonstrate how to debug with agent help

## Post-Demo Checklist

- [ ] Recording saved and backed up
- [ ] Edit highlights for social sharing
- [ ] Update repository README with demo link
- [ ] Prepare blog post or tutorial writeup
- [ ] Submit to awesome-copilot collection

---

**Ready to record? Good luck! 🎬**

