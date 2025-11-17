# Instagram Analytics Demo

A Next.js demo application that analyzes Instagram profiles using the Apify Instagram Profile Scraper.

## Features

- 📊 Real-time Instagram profile analysis
- 📈 Engagement metrics and charts
- #️⃣ Top hashtags visualization
- 📸 Recent posts grid
- 🎨 Modern UI with Tailwind CSS and shadcn/ui

## Setup

### Prerequisites

- Node.js 18+ installed
- An Apify account with an API token

### 1. Get Your Apify Token

1. Sign up for a free account at [https://console.apify.com](https://console.apify.com)
2. Navigate to **Settings → Integrations** 
3. Copy your API token

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Apify token:

```
APIFY_TOKEN=your_actual_apify_token_here
```

**Important:** Never commit your `.env.local` file to version control.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Enter an Instagram username or profile URL in the search bar
2. Click "Analyze Profile"
3. View detailed analytics including:
   - Profile information (followers, following, posts count)
   - Engagement metrics
   - Recent posts with engagement rates
   - Top hashtags
   - Engagement history chart

## How It Works

### Architecture

```
User Input → SearchBar → API Route → Apify Actor → Transform → Display
```

1. **User enters a username** in the search bar
2. **Next.js API route** (`/api/instagram/[username]`) receives the request
3. **Apify Client** calls the Instagram Profile Scraper Actor
4. **Data transformation** maps Apify's output to our TypeScript types
5. **UI components** display the transformed data

### Key Files

- `app/page.tsx` - Main page component with search handling
- `app/api/instagram/[username]/route.ts` - API route that calls Apify
- `lib/apify-transform.ts` - Transforms Apify data to our format
- `lib/types.ts` - TypeScript interfaces for Instagram data
- `components/` - Reusable UI components

## Apify Integration

This app uses the [Instagram Profile Scraper](https://apify.com/apify/instagram-profile-scraper) Actor, which:

- Extracts public profile data (no private accounts)
- Returns profile info, metrics, and recent posts
- Uses a pay-per-result pricing model
- Includes ~2,000 free results with the $5 starter credit

### Cost Considerations

- Free tier: $2.60 per 1,000 profiles (~2,000 free profiles)
- Paid plans: Discounted rates starting at $2.30/1,000

## Development

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Charts:** Recharts
- **Data Scraping:** Apify (apify-client)

## Limitations

- Only works with **public** Instagram profiles
- Private accounts will return an error
- Rate limits apply based on your Apify plan
- Historical engagement data is limited to recent posts

## Learn More

- [Apify Documentation](https://docs.apify.com)
- [Instagram Profile Scraper](https://apify.com/apify/instagram-profile-scraper)
- [Next.js Documentation](https://nextjs.org/docs)
- [Apify JavaScript SDK](https://docs.apify.com/sdk/js/)

## Troubleshooting

### "APIFY_TOKEN not set" error

Make sure you've created `.env.local` with your token:

```bash
APIFY_TOKEN=your_token_here
```

Restart the dev server after adding the token.

### "Profile not found" error

- Verify the username is correct
- Check if the account is public (private accounts cannot be scraped)
- Try using just the username without @ or URL

### Actor timeout

If the Actor takes too long, it might be due to:
- Instagram rate limiting
- Network issues
- Heavy traffic on Apify

Try again after a few minutes.

## License

This is a demo application. Check individual package licenses for production use.
