import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, DollarSign, Database } from "lucide-react";
import { Product } from "@/lib/types";

interface StatsCardsProps {
  products: Product[];
  isLoading?: boolean;
  dataSource?: string;
}

export function StatsCards({ products, isLoading = false, dataSource = "Mock" }: StatsCardsProps) {
  const productCount = products.length;
  const averagePrice = productCount > 0 
    ? products.reduce((sum, p) => sum + p.price, 0) / productCount 
    : 0;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isLoading ? "..." : productCount}
          </div>
          <p className="text-xs text-muted-foreground">
            {isLoading ? "Searching..." : "Products found"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Price</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isLoading ? "..." : averagePrice > 0 ? `$${averagePrice.toFixed(2)}` : "-"}
          </div>
          <p className="text-xs text-muted-foreground">
            {isLoading ? "Calculating..." : productCount > 0 ? "Across all products" : "No data yet"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Data Source</CardTitle>
          <Database className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{isLoading ? "..." : dataSource}</div>
          <p className="text-xs text-muted-foreground">
            {isLoading ? "Fetching..." : dataSource === "Mock" ? "Sample data" : "Live from Apify"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

