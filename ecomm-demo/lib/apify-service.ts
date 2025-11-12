import { ApifyClient } from 'apify-client';
import { Product, ApifyProductOutput } from './types';

/**
 * Service for interacting with Apify E-Commerce Scraper Actor
 */

const ACTOR_ID = 'apify/e-commerce-scraping-tool';

/**
 * Initialize Apify client with API token
 */
function getApifyClient(): ApifyClient {
  const token = process.env.NEXT_PUBLIC_APIFY_TOKEN;
  
  if (!token) {
    throw new Error(
      'APIFY_TOKEN is not set. Please add NEXT_PUBLIC_APIFY_TOKEN to your .env.local file. ' +
      'Get your token at https://console.apify.com/account#/integrations'
    );
  }
  
  return new ApifyClient({ token });
}

/**
 * Convert Apify E-Commerce Scraper output to Product type
 */
function mapApifyOutputToProduct(item: ApifyProductOutput): Product | null {
  // Skip items without essential data
  if (!item.url || !item.name) {
    return null;
  }
  
  return {
    url: item.url,
    title: item.name,
    image: item.image || 'https://via.placeholder.com/400x400?text=No+Image',
    description: item.description || 'No description available',
    price: item.offers?.price || 0,
  };
}

/**
 * Search for products using Apify E-Commerce Scraper
 * @param keyword - Search query keyword
 * @param marketplace - Optional marketplace to search (defaults to Amazon US)
 * @returns Array of products
 */
export async function searchProducts(
  keyword: string,
  marketplace: string = 'www.amazon.com'
): Promise<Product[]> {
  try {
    const client = getApifyClient();
    
    // Run the Actor with keyword search
    const run = await client.actor(ACTOR_ID).call({
      keyword,
      marketplaces: [marketplace],
      scrapeMode: 'AUTO',
    });
    
    // Wait for the run to finish
    await client.run(run.id).waitForFinish();
    
    // Get the dataset
    const dataset = client.dataset(run.defaultDatasetId!);
    const { items } = await dataset.listItems();
    
    // Map and filter the results
    const products = items
      .map((item: ApifyProductOutput) => mapApifyOutputToProduct(item))
      .filter((product): product is Product => product !== null);
    
    return products;
  } catch (error) {
    console.error('Error fetching products from Apify:', error);
    throw error;
  }
}
