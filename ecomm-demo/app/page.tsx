"use client";

import { useState } from "react";
import { products as mockProducts } from "@/data/products";
import { StatsCards } from "@/components/StatsCards";
import { ProductTable } from "@/components/ProductTable";
import { ProductCards } from "@/components/ProductCards";
import { SearchBar } from "@/components/SearchBar";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import type { Product, ScraperResponse, ScraperError } from "@/lib/types";

export default function Home() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<"Mock" | "Apify">("Mock");
  const [runUrl, setRunUrl] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      return;
    }

    setLoading(true);
    setError(null);
    setRunUrl(null);

    try {
      const response = await fetch("/api/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        const errorData: ScraperError = await response.json();
        throw new Error(errorData.details || errorData.error || "Failed to fetch products");
      }

      const data: ScraperResponse = await response.json();
      
      if (data.products && data.products.length > 0) {
        setProducts(data.products);
        setDataSource("Apify");
        if (data.runUrl) {
          setRunUrl(data.runUrl);
        }
      } else {
        setError("No products found for this search query. Try a different keyword.");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred while fetching products";
      setError(errorMessage);
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-6 md:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="https://apify.com/img/apify-logo/wordmark.svg"
                alt="Apify"
                width={100}
                height={30}
                priority
              />
            </div>
            <div className="text-sm text-muted-foreground">
              E-Commerce Demo
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-3">
            Product Catalog Demo
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-6">
            Search for products using Apify&apos;s E-Commerce Scraping Tool.
            Enter a product keyword below to scrape real-time data from Amazon.
          </p>
          
          {/* Search Bar */}
          <div className="mt-8">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Loading State */}
          {loading && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-blue-800 dark:text-blue-200">
                🔄 Scraping products... This may take a few moments.
              </p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-800 dark:text-red-200">
                ⚠️ {error}
              </p>
            </div>
          )}

          {/* Run URL Link */}
          {runUrl && (
            <div className="mt-4 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-green-800 dark:text-green-200">
                ✓ Data scraped successfully!{" "}
                <a 
                  href={runUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline font-medium hover:text-green-900 dark:hover:text-green-100"
                >
                  View run details in Apify Console
                </a>
              </p>
            </div>
          )}
        </div>

        {/* Stats Section */}
        <section className="mb-12">
          <StatsCards products={products} dataSource={dataSource} />
        </section>

        <Separator className="my-12" />

        {/* Table Section */}
        <section className="mb-12">
          <ProductTable products={products} />
        </section>

        <Separator className="my-12" />

        {/* Cards Section */}
        <section className="mb-12">
          <ProductCards products={products} />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-6 md:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              Built with Next.js, Tailwind CSS, and shadcn/ui
            </p>
            <p className="text-sm text-muted-foreground">
              Powered by{" "}
              <a 
                href="https://apify.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium hover:underline"
              >
                Apify
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
