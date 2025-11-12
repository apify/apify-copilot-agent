"use client";

import { useState } from "react";
import { products as mockProducts } from "@/data/products";
import { StatsCards } from "@/components/StatsCards";
import { ProductTable } from "@/components/ProductTable";
import { ProductCards } from "@/components/ProductCards";
import { SearchBar } from "@/components/SearchBar";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { searchProducts } from "@/lib/apify-service";
import { Product } from "@/lib/types";

export default function Home() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<string>("Mock");
  const [lastSearchQuery, setLastSearchQuery] = useState<string>("");

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    setLastSearchQuery(query);
    
    try {
      const results = await searchProducts(query);
      
      if (results.length === 0) {
        setError(`No products found for "${query}". Try a different search term.`);
        setProducts([]);
        setDataSource("Apify");
      } else {
        setProducts(results);
        setDataSource("Apify");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch products";
      setError(errorMessage);
      // Keep showing previous products on error
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
            Search for products from major e-commerce platforms using Apify&apos;s E-Commerce Scraper.
            Enter a product keyword and click Search to see real-time results.
          </p>
          
          {/* Search Bar */}
          <div className="mt-8">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Success Alert */}
        {!isLoading && !error && dataSource === "Apify" && products.length > 0 && lastSearchQuery && (
          <Alert className="mb-8 border-green-500 bg-green-50">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Success</AlertTitle>
            <AlertDescription className="text-green-700">
              Found {products.length} products for &quot;{lastSearchQuery}&quot;
            </AlertDescription>
          </Alert>
        )}

        {/* Stats Section */}
        <section className="mb-12">
          <StatsCards products={products} isLoading={isLoading} dataSource={dataSource} />
        </section>

        {products.length > 0 && (
          <>
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
          </>
        )}

        {/* Empty State */}
        {!isLoading && products.length === 0 && dataSource === "Apify" && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No products to display. Try searching for something!
            </p>
          </div>
        )}
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
