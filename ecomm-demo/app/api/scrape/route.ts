import { NextRequest, NextResponse } from "next/server";
import { ApifyClient } from "apify-client";

// Initialize the ApifyClient with API token from environment variables
const client = new ApifyClient({
  token: process.env.APIFY_TOKEN,
});

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { error: "Query parameter is required" },
        { status: 400 }
      );
    }

    if (!process.env.APIFY_TOKEN) {
      return NextResponse.json(
        { 
          error: "APIFY_TOKEN not configured. Please set up your Apify API token.",
          details: "Get your token at https://console.apify.com/account#/integrations"
        },
        { status: 500 }
      );
    }

    // Call the E-commerce Scraping Tool Actor with keyword search
    const run = await client.actor("apify/e-commerce-scraping-tool").call({
      keyword: query,
      marketplaces: ["www.amazon.com"], // Default to Amazon for demo
      maxProductResults: 20, // Limit to 20 products for demo
      scrapeMode: "AUTO",
    });

    // Fetch the results from the Actor's default dataset
    const { items } = await client.dataset(run.defaultDatasetId).listItems();

    // Transform the data to match our Product type
    const products = items.map((item: Record<string, unknown>) => ({
      url: item.url || "",
      title: item.name || "Unknown Product",
      image: item.image || "",
      description: item.description || "",
      price: (item.offers as Record<string, unknown>)?.price || 0,
    }));

    return NextResponse.json({ 
      products,
      runId: run.id,
      runUrl: `https://console.apify.com/actors/runs/${run.id}`
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error calling Apify Actor:", error);
    return NextResponse.json(
      { 
        error: "Failed to scrape products",
        details: errorMessage
      },
      { status: 500 }
    );
  }
}
