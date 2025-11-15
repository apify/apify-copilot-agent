# E-Commerce Demo with Apify Integration

This Next.js application demonstrates how to integrate the Apify E-Commerce Scraping Tool to scrape real-time product data from e-commerce websites.

## Features

- 🔍 **Real-time Product Search**: Search for products using keywords
- 🚀 **Apify Integration**: Powered by Apify's E-Commerce Scraping Tool
- 📊 **Multiple Views**: View products as statistics, table, or cards
- 💰 **Dynamic Pricing**: Automatically calculates average prices
- 🎨 **Modern UI**: Built with Next.js, Tailwind CSS, and shadcn/ui

## Prerequisites

- Node.js 20 or higher
- An Apify account (free tier available)
- Apify API token

## Setup Instructions

### 1. Get Your Apify API Token

1. Go to [Apify Console](https://console.apify.com/account#/integrations)
2. Create a free account if you don't have one
3. Navigate to Settings → Integrations
4. Copy your API token

### 2. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your Apify token:
   ```env
   APIFY_TOKEN=your_actual_token_here
   ```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Application

For development:
```bash
npm run dev
```

For production:
```bash
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Use

1. **Enter a Search Query**: Type a product keyword (e.g., "laptop", "headphones") into the search bar
2. **Click Submit**: The app will call the Apify E-Commerce Scraping Tool to scrape products from Amazon
3. **View Results**: Products will be displayed in three sections:
   - **Statistics Cards**: Total products, average price, and data source
   - **Product Table**: Detailed tabular view with images, titles, prices, descriptions, and URLs
   - **Product Cards**: Visual card layout for browsing products

## Architecture

### Components

- **`app/page.tsx`**: Main page with search functionality and state management
- **`app/api/scrape/route.ts`**: API route that calls the Apify Actor (server-side only)
- **`components/SearchBar.tsx`**: Search input component
- **`components/StatsCards.tsx`**: Statistics display component
- **`components/ProductTable.tsx`**: Tabular product view
- **`components/ProductCards.tsx`**: Card-based product view

### Data Flow

1. User enters search query → `SearchBar` component
2. Client sends POST request → `/api/scrape` API route
3. API route calls Apify Actor → `apify/e-commerce-scraping-tool`
4. Actor scrapes products from Amazon → Returns dataset
5. API route transforms data → Returns to client
6. Client updates state → Components re-render with new data

### Security

- **APIFY_TOKEN** is stored server-side only in environment variables
- API route handles all Apify Actor calls, keeping credentials secure
- Client never has direct access to the Apify token

## Configuration

### Scraping Settings

In `app/api/scrape/route.ts`, you can customize:

- **Marketplaces**: Currently set to Amazon US, but supports many others
- **Max Results**: Limited to 20 products for demo (adjustable)
- **Scrape Mode**: Set to "AUTO" (can be "BROWSER" or "HTTP")

### Supported Marketplaces

The E-Commerce Scraping Tool supports many marketplaces including:
- Amazon (all regions)
- Walmart
- eBay
- Alibaba
- IKEA
- And many more

To change the marketplace, edit the `marketplaces` array in the API route.

## Cost Information

The E-Commerce Scraping Tool uses Apify's pay-per-event pricing model:
- **Actor Start**: ~$0.0001
- **Product Listing**: ~$0.0005 per page
- **Product Details**: ~$0.006 per product

Apify offers a free tier with monthly credits. See [Apify Pricing](https://apify.com/pricing) for details.

## Troubleshooting

### "APIFY_TOKEN not configured" Error

Make sure you have:
1. Created a `.env.local` file
2. Added your `APIFY_TOKEN`
3. Restarted the development server

### No Products Found

Try:
- Using different search keywords
- Checking your Apify account quota
- Viewing the Apify Console run details (link provided after search)

### Image Not Loading

The app is configured to allow images from common e-commerce domains. If you see broken images, check the `next.config.ts` file and add the required domain.

## Learn More

- [Apify Documentation](https://docs.apify.com)
- [E-Commerce Scraping Tool](https://apify.com/apify/e-commerce-scraping-tool)
- [Next.js Documentation](https://nextjs.org/docs)
- [Apify JavaScript SDK](https://docs.apify.com/sdk/js/)

## License

MIT
