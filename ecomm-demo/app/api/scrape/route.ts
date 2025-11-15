import { NextRequest, NextResponse } from 'next/server';
import { ApifyClient } from 'apify-client';

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    const apifyToken = process.env.APIFY_TOKEN;
    if (!apifyToken) {
      return NextResponse.json(
        { error: 'APIFY_TOKEN environment variable is not set' },
        { status: 500 }
      );
    }

    // Initialize Apify client
    const client = new ApifyClient({
      token: apifyToken,
    });

    // Call the E-commerce Scraping Tool with keyword search
    const run = await client.actor('apify/e-commerce-scraping-tool').call({
      keyword: query,
      marketplaces: ['www.amazon.com'],
      scrapeMode: 'AUTO',
    });

    // Wait for the Actor to finish
    await client.run(run.id).waitForFinish();

    // Get the dataset items
    const dataset = client.dataset(run.defaultDatasetId!);
    const { items } = await dataset.listItems();

    // Transform the data to match our Product type
    interface ApifyProduct {
      url?: string;
      name?: string;
      image?: string;
      description?: string;
      offers?: {
        price?: string;
      };
    }

    const products = items.map((item) => {
      const apifyItem = item as ApifyProduct;
      return {
        url: apifyItem.url || '',
        title: apifyItem.name || 'Unknown Product',
        image: apifyItem.image || 'https://via.placeholder.com/400',
        description: apifyItem.description || 'No description available',
        price: parseFloat(apifyItem.offers?.price || '0'),
      };
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Error scraping e-commerce data:', error);
    return NextResponse.json(
      { error: 'Failed to scrape e-commerce data', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
