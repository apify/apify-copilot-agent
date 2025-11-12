"use client";

import { useState } from "react";
import { products as mockProducts } from "@/data/products";
import { StatsCards } from "@/components/StatsCards";
import { ProductTable } from "@/components/ProductTable";
import { ProductCards } from "@/components/ProductCards";
import { SearchBar } from "@/components/SearchBar";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import Image from "next/image";
import { Product } from "@/lib/types";

export function HomePage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    productCount: mockProducts.length,
    averagePrice: undefined as number | undefined,
    currency: "USD",
    dataSourceLabel: "Mock",
  });

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setError("Please enter a search query");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keyword: query }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to search products");
      }

      setProducts(data.products);
      setStats({
        productCount: data.stats.productCount,
        averagePrice: data.stats.averagePrice,
        currency: data.stats.currency,
        dataSourceLabel: data.stats.dataSourceLabel,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      console.error("Search error:", err);
    } finally {
      setIsLoading(false);
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
            Search for real e-commerce products powered by Apify E-Commerce
            Scraping Tool. Enter a product keyword to see live results from
            Amazon.
          </p>

          {/* Search Bar */}
          <div className="mt-8">
            <SearchBar onSearch={handleSearch} disabled={isLoading} />
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="mt-6 flex items-center gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Searching for products...</span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <Alert variant="destructive" className="mt-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>

        {/* Stats Section */}
        <section className="mb-12">
          <StatsCards
            productCount={stats.productCount}
            averagePrice={stats.averagePrice}
            currency={stats.currency}
            dataSourceLabel={stats.dataSourceLabel}
          />
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
