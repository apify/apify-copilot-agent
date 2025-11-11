# E-Commerce Demo with Apify Integration

A Next.js application that demonstrates integration with the Apify E-Commerce Scraper to search and display real product data from e-commerce websites.

## Features

- 🔍 Real-time product search using Apify E-Commerce Scraper
- 📊 Dynamic statistics including product count and average price
- 📋 Product data displayed in table and card formats
- ⚡ Loading states and error handling
- 🎨 Built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui

## Prerequisites

- Node.js 20.x or higher
- An Apify account with an API token

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Apify Token

1. Create a free Apify account at [https://console.apify.com](https://console.apify.com)
2. Get your API token from [https://console.apify.com/account#/integrations](https://console.apify.com/account#/integrations)
3. Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

4. Add your Apify token to `.env.local`:

```
NEXT_PUBLIC_APIFY_TOKEN=your_apify_token_here
```

⚠️ **Important**: The token must be prefixed with `NEXT_PUBLIC_` to be accessible in the browser.

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Enter a product keyword in the search bar (e.g., "laptop", "headphones", "camera")
2. Click "Submit" to search for products
3. The app will use Apify E-Commerce Scraper to fetch real product data from Amazon
4. Results will be displayed in both table and card formats
5. Statistics cards show the total number of products and average price

## How It Works

The application uses the Apify E-Commerce Scraping Tool (`apify/e-commerce-scraping-tool`) to:

1. Search for products by keyword on Amazon (default marketplace)
2. Extract product information including:
   - Product name
   - Price
   - Image URL
   - Description
   - Product URL
3. Display the results in a user-friendly interface

## Project Structure

```
ecomm-demo/
├── app/
│   ├── page.tsx              # Main page component with search logic
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── SearchBar.tsx         # Search input component
│   ├── StatsCards.tsx        # Statistics display
│   ├── ProductTable.tsx      # Product data table
│   ├── ProductCards.tsx      # Product card grid
│   └── ui/                   # shadcn/ui components
├── lib/
│   ├── apify-service.ts      # Apify integration service
│   └── types.ts              # TypeScript type definitions
├── data/
│   └── products.ts           # Mock data (used as fallback)
└── .env.example              # Environment variable template
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Pricing

The E-Commerce Scraping Tool uses a pay-per-event model. The $5 credit included in the Apify free plan lets you scrape approximately 800 product URLs. For more details, see the [Actor's pricing page](https://apify.com/apify/e-commerce-scraping-tool/pricing).

## Troubleshooting

### "Failed to search products" Error

- **Check your API token**: Make sure it's correctly set in `.env.local`
- **Verify token prefix**: The environment variable must start with `NEXT_PUBLIC_`
- **Restart the dev server**: After changing `.env.local`, restart `npm run dev`

### No Results Found

- Try different search keywords
- Check that your Apify account has sufficient credits
- Review the browser console for detailed error messages

## Learn More

- [Apify Documentation](https://docs.apify.com)
- [E-Commerce Scraping Tool](https://apify.com/apify/e-commerce-scraping-tool)
- [Next.js Documentation](https://nextjs.org/docs)
- [Apify JavaScript Client](https://docs.apify.com/api/client/js)

## License

This project is provided as a demonstration of Apify integration.
