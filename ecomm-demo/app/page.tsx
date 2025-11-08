"use client";

import { useState } from "react";
import { products as mockProducts } from "@/data/products";
import { Product } from "@/lib/types";
import { StatsCards } from "@/components/StatsCards";
import { ProductTable } from "@/components/ProductTable";
import { ProductCards } from "@/components/ProductCards";
import { SearchBar } from "@/components/SearchBar";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function Home() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<"Mock" | "Apify">("Mock");

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to scrape data');
      }

      const data = await response.json();
      setProducts(data.products);
      setDataSource("Apify");
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Search error:', err);
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
            Search for products from Amazon using the Apify E-Commerce Scraping Tool. 
            Enter a product keyword below to scrape real product data.
          </p>
          
          {/* Search Bar */}
          <div className="mt-8">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Loading/Error States */}
          {isLoading && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-blue-700">🔄 Scraping product data from Amazon... This may take a minute.</p>
            </div>
          )}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700">❌ Error: {error}</p>
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
