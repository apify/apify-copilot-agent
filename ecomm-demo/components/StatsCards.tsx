import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";
import { Product } from "@/lib/types";

interface StatsCardsProps {
  products: Product[];
  dataSource: "Mock" | "Apify";
}

export function StatsCards({ products, dataSource }: StatsCardsProps) {
  const productCount = products.length;
  
  const averagePrice = productCount > 0
    ? products.reduce((sum, product) => sum + product.price, 0) / productCount
    : 0;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{productCount}</div>
          <p className="text-xs text-muted-foreground">
            Products available in catalog
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Price</CardTitle>
          <span className="text-lg">$</span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {averagePrice > 0 ? `$${averagePrice.toFixed(2)}` : '-'}
          </div>
          <p className="text-xs text-muted-foreground">
            {averagePrice > 0 ? 'Calculated from data' : 'No data available'}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Data Source</CardTitle>
          <span className="text-lg">🔗</span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{dataSource}</div>
          <p className="text-xs text-muted-foreground">
            {dataSource === "Apify" ? "Real e-commerce data" : "Ready for Apify integration"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

