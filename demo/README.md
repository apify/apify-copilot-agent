# Apify E-commerce Intelligence Demo

> A scaffold project demonstrating how to integrate Apify's e-commerce scraping capabilities with a Next.js + Supabase stack using the **Apify Expert Copilot Agent**.

## 🎯 Demo Purpose

This repository serves as a **reference scaffold** for showcasing how GitHub Copilot's custom agent feature can guide developers through integrating Apify Actors into their applications. The project intentionally contains placeholder components and TODO markers where the Copilot agent will provide implementation guidance.

**This is NOT a complete application** — it's designed to be completed live with the assistance of the custom Copilot agent defined in `.github/agents/apify-integration-expert.md`.

## 📋 What's Included

### ✅ Ready to Use
- **Next.js 15** with TypeScript and Tailwind CSS
- **UI Scaffold** with placeholder components:
  - Dashboard with stats cards
  - Scrape trigger form
  - Run history display
  - Product grid/table
- **Supabase Schema** (SQL migrations ready to apply)
- **Type Definitions** for database models
- **Environment Configuration** template

### 🚧 To Be Implemented (with Copilot Agent)
- Apify client service layer
- Supabase data access layer
- API routes for triggering scrapes
- Data transformation and persistence logic
- Real-time UI updates

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/pnpm/yarn
- Apify account ([Sign up free](https://apify.com/))
- Supabase account ([Sign up free](https://supabase.com/))

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Required variables:
- `APIFY_TOKEN` - Get from [Apify Console](https://console.apify.com/account#/integrations)
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon public key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (keep secret!)

### 3. Set Up Supabase Database

Apply the migrations to create the required tables:

```bash
# Option 1: Using Supabase CLI
supabase db push

# Option 2: Manual - Copy and run SQL from these files in Supabase SQL Editor:
# - supabase/migrations/20251107000001_create_actor_runs.sql
# - supabase/migrations/20251107000002_create_products.sql
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the scaffold UI.

## 🤖 Using the Copilot Agent

This project is designed to be completed using the **Apify Expert** custom Copilot agent. The agent profile is located at:

```
.github/agents/apify-integration-expert.md
```

### How to Use the Agent

1. **Open the project** in an editor with GitHub Copilot support
2. **Reference the agent profile** when asking for implementation help
3. **Follow the workflow** outlined in the agent instructions:
   - Implement Apify service layer (`src/lib/apify.ts`)
   - Implement Supabase data layer (`src/lib/supabase.ts`)
   - Build API routes (`src/app/api/scrape/route.ts`, etc.)
   - Connect UI components to backend
4. **Look for TODO comments** in the code marking integration points

### Example Prompts

- "Help me implement the Apify service to call the e-commerce scraper"
- "Create the API route to trigger an Apify scrape and store results in Supabase"
- "Connect the ScrapeForm component to the scrape API endpoint"

## 📁 Project Structure

```
demo/
├── src/
│   ├── app/
│   │   ├── api/          # API routes (to be implemented)
│   │   └── page.tsx      # Main dashboard page
│   ├── components/       # UI components (with TODOs)
│   │   ├── ScrapeForm.tsx
│   │   ├── StatsCards.tsx
│   │   ├── RunHistory.tsx
│   │   └── ProductGrid.tsx
│   └── lib/
│       ├── types.ts      # TypeScript interfaces
│       └── README.md     # Service layer guide
├── supabase/
│   └── migrations/       # Database schema files
└── .env.example          # Environment template
```

## 📚 Related Documentation

- [Project Requirements (PRD)](../PRD.md)
- [Task Manager](../task-manager.md)
- [Changelog](../changelog.md)
- [Apify Expert Agent Profile](../.github/agents/apify-integration-expert.md)

## 🎥 Demo Recording Guide

When recording the demo:

1. Start with this scaffold (clean state)
2. Show the agent profile in `.github/agents/`
3. Use Copilot to implement each layer (services → API → UI connections)
4. Trigger a test scrape and show data flow
5. Display results in the UI

## 🔗 Resources

- [Apify Documentation](https://docs.apify.com/)
- [E-commerce Scraper Actor](https://apify.com/apify/e-commerce-scraping-tool)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [GitHub Copilot Custom Agents](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-custom-agents)

## 📝 License

MIT - See [LICENSE](../LICENSE) for details.

---

**Questions or Issues?** Open an issue or refer to the [PRD](../PRD.md) for detailed requirements.
