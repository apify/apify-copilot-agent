import { NextRequest, NextResponse } from "next/server";
import { searchProducts, calculateProductStats } from "@/lib/apify-service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { keyword, marketplace } = body;

    if (!keyword) {
      return NextResponse.json(
        { error: "Keyword is required" },
        { status: 400 }
      );
    }

    // Search for products using the Apify service
    const products = await searchProducts(
      keyword,
      marketplace || "www.amazon.com"
    );

    // Calculate statistics
    const stats = calculateProductStats(products);

    return NextResponse.json({
      products,
      stats,
      success: true,
    });
  } catch (error) {
    console.error("API Error:", error);
    
    const errorMessage = error instanceof Error ? error.message : "An error occurred while searching for products";
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
