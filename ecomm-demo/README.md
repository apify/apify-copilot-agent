# E-Commerce Demo with Apify Integration

This Next.js application demonstrates how to integrate the **Apify E-Commerce Scraper** to fetch real-time product data from major e-commerce platforms like Amazon.

## Features

- 🔍 **Real-time Product Search**: Search for products across major e-commerce platforms
- 📊 **Multiple Data Views**: View products in statistics cards, tables, and card layouts
- ⚡ **Live Data**: Powered by Apify's E-Commerce Scraping Tool
- 🎨 **Modern UI**: Built with Next.js, Tailwind CSS, and shadcn/ui

## Prerequisites

Before you begin, you'll need:

1. **Node.js** (version 18 or higher)
2. **An Apify Account** (free tier available)
3. **Apify API Token**

## Getting Your Apify API Token

1. Sign up for a free account at [Apify Console](https://console.apify.com/sign-up)
2. Navigate to **Settings** → **Integrations**
3. Find your **API Token** or create a new one
4. Copy the token for the setup below

Direct link: [https://console.apify.com/account#/integrations](https://console.apify.com/account#/integrations)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Apify API token:

```env
NEXT_PUBLIC_APIFY_TOKEN=your_actual_apify_token_here
```

**Important**: Never commit your `.env.local` file to version control. It's already included in `.gitignore`.

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Use

1. **Enter a search query** in the search bar (e.g., "wireless headphones", "laptop", "running shoes")
2. **Click Search** to fetch real products from Amazon
3. **View the results** in multiple formats:
   - **Statistics Cards**: See total products, average price, and data source
   - **Product Table**: Detailed table view with images, prices, and descriptions
   - **Product Cards**: Visual card layout for browsing

## How It Works

### Architecture

The app uses a service layer to interact with Apify's E-Commerce Scraper:

- **`lib/apify-service.ts`**: Handles communication with Apify Actor
- **`lib/types.ts`**: TypeScript types for products and Apify responses
- **`app/page.tsx`**: Main page component with search state management
- **`components/`**: Reusable UI components for displaying products

### Data Flow

1. User enters a search query
2. `searchProducts()` function calls the Apify E-Commerce Scraper Actor
3. Actor scrapes Amazon for matching products
4. Results are transformed to match our `Product` type
5. UI updates to display the fetched products

### Apify Integration

The integration uses the `apify-client` package:

```typescript
import { ApifyClient } from 'apify-client';

const client = new ApifyClient({ token: process.env.NEXT_PUBLIC_APIFY_TOKEN });

// Run the Actor
const run = await client.actor('apify/e-commerce-scraping-tool').call({
  keyword: 'your search term',
  marketplaces: ['www.amazon.com'],
  scrapeMode: 'AUTO',
});

// Get results
const dataset = client.dataset(run.defaultDatasetId!);
const { items } = await dataset.listItems();
```

## Project Structure

```
ecomm-demo/
├── app/
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main page with search functionality
├── components/
│   ├── SearchBar.tsx       # Search input component
│   ├── StatsCards.tsx      # Statistics cards display
│   ├── ProductTable.tsx    # Table view of products
│   ├── ProductCards.tsx    # Card view of products
│   └── ui/                 # shadcn/ui components
├── lib/
│   ├── apify-service.ts    # Apify Actor integration
│   ├── types.ts            # TypeScript type definitions
│   └── utils.ts            # Utility functions
├── data/
│   └── products.ts         # Mock data (initial state)
└── public/                 # Static assets
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Customization

### Change Marketplace

By default, the app searches Amazon US. To search other marketplaces, modify the `searchProducts()` call in `lib/apify-service.ts`:

```typescript
const run = await client.actor(ACTOR_ID).call({
  keyword,
  marketplaces: ['www.amazon.co.uk'], // Change to UK Amazon
  scrapeMode: 'AUTO',
});
```

Supported marketplaces include Amazon, Walmart, eBay, and many more. See the [Actor documentation](https://apify.com/apify/e-commerce-scraping-tool) for the full list.

### Adjust Product Fields

To display additional product fields, update the `Product` type in `lib/types.ts` and the mapping function in `lib/apify-service.ts`.

## Troubleshooting

### "APIFY_TOKEN is not set" Error

Make sure you've:
1. Created a `.env.local` file
2. Added your token as `NEXT_PUBLIC_APIFY_TOKEN=your_token`
3. Restarted the development server

### No Products Found

- Try different search terms
- Check that your Apify account has available credits
- Verify your API token is valid

### Slow Search Results

The Actor needs time to scrape products. Typical search takes 10-30 seconds depending on the number of results.

## Cost Information

The Apify E-Commerce Scraper uses a pay-per-event model:
- **Free tier**: Includes credits for testing
- **Pricing**: Based on products scraped and pages visited

See [pricing details](https://apify.com/apify/e-commerce-scraping-tool/pricing) for more information.

## Learn More

- [Apify Documentation](https://docs.apify.com/)
- [E-Commerce Scraper Actor](https://apify.com/apify/e-commerce-scraping-tool)
- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)

## License

This project is for demonstration purposes.
