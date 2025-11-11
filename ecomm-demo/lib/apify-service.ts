import { ApifyClient } from "apify-client";
import { Product } from "./types";

/**
 * Service for interacting with Apify E-Commerce Scraper
 */

// Initialize the Apify client
const client = new ApifyClient({
  token: process.env.NEXT_PUBLIC_APIFY_TOKEN,
});

/**
 * Apify Actor output item structure
 */
interface ApifyProductItem {
  url?: string;
  name?: string;
  image?: string;
  description?: string;
  offers?: {
    price?: number;
    priceCurrency?: string;
  };
  brand?: {
    slogan?: string;
  };
}

/**
 * Maps Apify Actor output to our Product type
 */
function mapApifyProductToProduct(item: ApifyProductItem): Product {
  return {
    url: item.url || "",
    title: item.name || "Untitled Product",
    image: item.image || "https://picsum.photos/seed/default/400/400",
    description: item.description || "",
    price: item.offers?.price || 0,
  };
}

export interface SearchProductsOptions {
  keyword: string;
  marketplace?: string;
  maxProducts?: number;
}

/**
 * Search for products using Apify E-Commerce Scraper
 */
export async function searchProducts(
  options: SearchProductsOptions
): Promise<Product[]> {
  const { keyword, marketplace = "www.amazon.com", maxProducts = 20 } = options;

  try {
    // Call the Apify E-Commerce Scraping Tool
    const run = await client.actor("apify/e-commerce-scraping-tool").call({
      keyword,
      marketplaces: [marketplace],
    });

    // Wait for the run to finish
    await client.run(run.id).waitForFinish();

    // Get the dataset with results
    if (!run.defaultDatasetId) {
      throw new Error("No dataset ID returned from Actor run");
    }

    const dataset = client.dataset(run.defaultDatasetId);
    const { items } = await dataset.listItems({ limit: maxProducts });

    // Map the Apify output to our Product type
    return items.map(mapApifyProductToProduct);
  } catch (error) {
    console.error("Error searching products with Apify:", error);
    throw new Error(
      `Failed to search products: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
