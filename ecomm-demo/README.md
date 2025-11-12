# E-Commerce Demo with Apify Integration

This is a Next.js demo application that integrates with the [Apify E-Commerce Scraping Tool](https://apify.com/apify/e-commerce-scraping-tool) to fetch real-time product data from e-commerce websites.

## Features

- 🔍 **Real-time product search** - Search for products on Amazon using keywords
- 📊 **Statistics dashboard** - View product count, average price, and data source
- 📋 **Product table** - Detailed table view with images, prices, and descriptions
- 🎴 **Product cards** - Beautiful card layout for browsing products
- ⚡ **Built with Next.js 16** - Modern React framework with App Router
- 🎨 **Styled with Tailwind CSS** - Utility-first CSS framework
- 🧩 **shadcn/ui components** - Beautiful, accessible UI components

## Prerequisites

Before you begin, you need an Apify account and API token:

1. Sign up for a free Apify account at [https://console.apify.com/](https://console.apify.com/)
2. Navigate to **Account Settings → Integrations** or visit [https://console.apify.com/account#/integrations](https://console.apify.com/account#/integrations)
3. Copy your **API Token**

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Apify token:

```env
APIFY_TOKEN=your_apify_token_here
```

⚠️ **Important**: Never commit your `.env.local` file to version control. The `.gitignore` file already excludes it.

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Try searching for products

1. Enter a product keyword in the search bar (e.g., "wireless headphones", "laptop", "running shoes")
2. Click **Submit**
3. Wait for the results to load from Amazon
4. Browse the products in the table and card views

## How It Works

### Architecture

- **Next.js App Router** - Uses Server Components and API Routes
- **API Route** (`/app/api/search/route.ts`) - Handles search requests server-side
- **Apify Service** (`/lib/apify-service.ts`) - Integrates with Apify E-Commerce Scraping Tool
- **Client Components** - Handle user interaction and display results

### Data Flow

1. User enters a search query in the SearchBar
2. SearchBar triggers a POST request to `/api/search`
3. API route calls the Apify service
4. Apify service runs the E-Commerce Scraping Tool Actor
5. Actor scrapes product data from Amazon
6. Results are mapped to our Product type
7. Statistics are calculated (count, average price)
8. Data is returned to the client and displayed

### Security

- **APIFY_TOKEN** is stored in environment variables
- Token is only accessible server-side (API routes)
- Never exposed to the client

## Project Structure

```
ecomm-demo/
├── app/
│   ├── api/
│   │   └── search/
│   │       └── route.ts          # API endpoint for product search
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                  # Main page
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── HomePage.tsx              # Main page component with state
│   ├── ProductCards.tsx          # Product card grid display
│   ├── ProductTable.tsx          # Product table display
│   ├── SearchBar.tsx             # Search input component
│   └── StatsCards.tsx            # Statistics cards
├── lib/
│   ├── apify-service.ts          # Apify integration logic
│   ├── types.ts                  # TypeScript type definitions
│   └── utils.ts                  # Utility functions
├── data/
│   └── products.ts               # Mock data (shown on initial load)
└── .env.local.example            # Example environment variables
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Customization

### Change the Marketplace

By default, the app searches Amazon US (`www.amazon.com`). To search other marketplaces:

1. Edit `components/HomePage.tsx`
2. Modify the fetch request to include the `marketplace` parameter:

```typescript
body: JSON.stringify({ 
  keyword: query,
  marketplace: "www.amazon.co.uk" // Change to your preferred marketplace
}),
```

Supported marketplaces include:
- `www.amazon.com` (US)
- `www.amazon.co.uk` (UK)
- `www.amazon.de` (Germany)
- `www.walmart.com`
- And many more (see [Actor documentation](https://apify.com/apify/e-commerce-scraping-tool))

### Modify Product Display

- **Table columns**: Edit `components/ProductTable.tsx`
- **Card layout**: Edit `components/ProductCards.tsx`
- **Statistics**: Edit `components/StatsCards.tsx`

## Learn More

- [Apify E-Commerce Scraping Tool](https://apify.com/apify/e-commerce-scraping-tool)
- [Apify Documentation](https://docs.apify.com)
- [Apify JavaScript SDK](https://docs.apify.com/sdk/js)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)

## Troubleshooting

### "APIFY_TOKEN environment variable is not set"

Make sure you've created a `.env.local` file with your token:

```env
APIFY_TOKEN=your_actual_token_here
```

Then restart the development server.

### Search is slow

The Apify Actor needs to scrape data from the website, which can take 10-30 seconds depending on the number of results. This is normal behavior.

### No results returned

- Try a different search term
- Check that your Apify token is valid
- Verify you have sufficient credits in your Apify account

## License

This project is part of the Apify Copilot Agent demonstration.
