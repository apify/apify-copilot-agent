import { products } from "@/data/products";
import { StatsCards } from "@/components/StatsCards";
import { ProductTable } from "@/components/ProductTable";
import { ProductCards } from "@/components/ProductCards";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function Home() {
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
          <p className="text-lg text-muted-foreground max-w-2xl">
            Showcase of e-commerce product data ready for Apify integration. 
            This demo displays scraped product information in multiple formats.
          </p>
        </div>

        {/* Stats Section */}
        <section className="mb-12">
          <StatsCards productCount={products.length} />
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
