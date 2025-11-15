# E-Commerce Demo with Apify Integration

This Next.js application demonstrates how to integrate the Apify E-Commerce Scraping Tool to scrape real product data from e-commerce websites.

## Features

- 🔍 Search for products using keywords
- 📊 Display product data in multiple formats (cards, tables, statistics)
- 🛒 Real-time scraping from Amazon using Apify E-Commerce Scraping Tool
- 💰 Automatic calculation of average prices
- ⚡ Built with Next.js 16, TypeScript, and Tailwind CSS

## Prerequisites

Before running this application, you need:

1. **Node.js** (version 18 or higher)
2. **Apify Account** - Create a free account at [https://console.apify.com](https://console.apify.com)
3. **Apify API Token** - Get your token from [https://console.apify.com/account#/integrations](https://console.apify.com/account#/integrations)

## Setup

1. **Install dependencies:**

```bash
npm install
```

2. **Set up environment variables:**

Create a `.env.local` file in the root directory:

```bash
APIFY_TOKEN=your_apify_token_here
```

Replace `your_apify_token_here` with your actual Apify API token.

## Running the Application

### Development Mode

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## How to Use

1. Enter a product keyword in the search bar (e.g., "wireless headphones", "laptop", "coffee maker")
2. Click the **Submit** button
3. Wait for the Apify E-Commerce Scraping Tool to fetch real product data from Amazon
4. View the scraped products in the:
   - **Statistics Cards** - Total products, average price, and data source
   - **Product Table** - Detailed tabular view of all products
   - **Product Cards** - Visual card-based layout

## How It Works

1. **User Input**: User enters a search query in the SearchBar component
2. **API Call**: The app sends a POST request to `/api/scrape` with the query
3. **Apify Integration**: The API route calls the Apify E-Commerce Scraping Tool Actor with:
   - `keyword`: The user's search query
   - `marketplaces`: `['www.amazon.com']` (currently limited to Amazon)
   - `scrapeMode`: `'AUTO'` (automatically chooses best scraping method)
4. **Data Processing**: The Actor scrapes Amazon and returns product data
5. **Display**: The app transforms and displays the data in the UI

## Apify E-Commerce Scraping Tool

This application uses the [E-commerce Scraping Tool](https://apify.com/apify/e-commerce-scraping-tool) Actor, which can:

- Extract product data from almost any e-commerce website
- Search by keywords across major marketplaces (Amazon, Walmart, eBay, etc.)
- Return structured data including:
  - Product name and description
  - Price and currency
  - Product images
  - Product URLs
  - Brand information

## Pricing

The E-commerce Scraping Tool uses a pay-per-event model:

- **Free Plan**: $5 credit allows ~800 product URLs to be scraped
- **Starter Plan**: ~13,000 URLs can be scraped with included credits
- See [pricing details](https://apify.com/apify/e-commerce-scraping-tool/pricing) for more information

## Project Structure

```
ecomm-demo/
├── app/
│   ├── api/
│   │   └── scrape/
│   │       └── route.ts          # API route for Apify integration
│   ├── layout.tsx
│   └── page.tsx                  # Main page component
├── components/
│   ├── SearchBar.tsx             # Search input component
│   ├── StatsCards.tsx            # Statistics display
│   ├── ProductTable.tsx          # Table view of products
│   ├── ProductCards.tsx          # Card view of products
│   └── ui/                       # shadcn/ui components
├── data/
│   └── products.ts               # Mock data (fallback)
└── lib/
    └── types.ts                  # TypeScript types
```

## Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality UI components
- **Apify Client** - Official Apify API client for Node.js

## Troubleshooting

### "APIFY_TOKEN environment variable is not set"

Make sure you've created a `.env.local` file with your Apify token:

```bash
APIFY_TOKEN=your_actual_token_here
```

### Slow scraping

The first scrape may take 30-60 seconds as the Actor needs to:
1. Start up
2. Search Amazon
3. Extract product data
4. Return results

This is normal behavior for web scraping.

### No results returned

Try:
- Using a more specific search query
- Checking that your APIFY_TOKEN is valid
- Verifying you have sufficient Apify credits

## License

This project is for demonstration purposes.
