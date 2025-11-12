/**
 * Apify E-Commerce Scraper Service
 * 
 * This service handles integration with the Apify E-Commerce Scraping Tool.
 * It provides functions to search for products using the Actor.
 */

import { ApifyClient } from "apify-client";
import { Product } from "./types";

// Initialize Apify client with token from environment
const getApifyClient = () => {
  const token = process.env.APIFY_TOKEN;
  if (!token) {
    throw new Error(
      "APIFY_TOKEN environment variable is not set. Please add it to your .env.local file."
    );
  }
  return new ApifyClient({ token });
};

/**
 * Actor output item from Apify E-Commerce Scraping Tool
 */
interface ApifyProductItem {
  url: string;
  name: string;
  offers: {
    price: number | null;
    priceCurrency: string | null;
  };
  brand: {
    slogan: string | null;
  };
  image: string;
  description: string | null;
}

/**
 * Map Apify Actor output to our Product type
 */
const mapApifyItemToProduct = (item: ApifyProductItem): Product => {
  return {
    url: item.url,
    title: item.name,
    image: item.image,
    description: item.description || "No description available",
    price: item.offers?.price || null,
  };
};

/**
 * Search for products using the Apify E-Commerce Scraping Tool
 * 
 * @param keyword - Search query (e.g., "wireless headphones")
 * @param marketplace - E-commerce marketplace to search (default: "www.amazon.com")
 * @returns Array of products matching the search query
 */
export async function searchProducts(
  keyword: string,
  marketplace: string = "www.amazon.com"
): Promise<Product[]> {
  if (!keyword || keyword.trim().length === 0) {
    throw new Error("Search keyword cannot be empty");
  }

  const client = getApifyClient();

  try {
    // Call the E-Commerce Scraping Tool Actor
    const run = await client.actor("apify/e-commerce-scraping-tool").call({
      keyword: keyword.trim(),
      marketplaces: [marketplace],
    });

    // Wait for the Actor to finish
    await client.run(run.id).waitForFinish();

    // Get the dataset with results
    const dataset = client.dataset(run.defaultDatasetId!);
    const { items } = await dataset.listItems();

    // Map the results to our Product type
    const products = (items as unknown as ApifyProductItem[]).map(mapApifyItemToProduct);

    return products;
  } catch (error) {
    console.error("Error fetching products from Apify:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to fetch products from Apify"
    );
  }
}

/**
 * Calculate statistics from products
 */
export function calculateProductStats(products: Product[]) {
  const productCount = products.length;
  
  // Calculate average price (only for products with valid prices)
  const productsWithPrice = products.filter(
    (p) => typeof p.price === "number" && p.price > 0
  );
  
  const averagePrice =
    productsWithPrice.length > 0
      ? productsWithPrice.reduce((sum, p) => sum + (p.price as number), 0) /
        productsWithPrice.length
      : null;

  return {
    productCount,
    averagePrice,
    currency: "USD", // The Actor returns USD by default
    dataSourceLabel: "Apify",
  };
}
