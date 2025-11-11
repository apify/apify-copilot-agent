import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";
import { Product } from "@/lib/types";

interface StatsCardsProps {
  productCount: number;
  products?: Product[];
  dataSource?: "Mock" | "Apify";
}

export function StatsCards({ productCount, products = [], dataSource = "Mock" }: StatsCardsProps) {
  // Calculate average price from products
  const calculateAveragePrice = () => {
    if (products.length === 0) return 0;
    const validPrices = products.filter(p => p.price > 0);
    if (validPrices.length === 0) return 0;
    const sum = validPrices.reduce((acc, p) => acc + p.price, 0);
    return sum / validPrices.length;
  };

  const averagePrice = calculateAveragePrice();

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
            {averagePrice > 0 ? `$${averagePrice.toFixed(2)}` : "-"}
          </div>
          <p className="text-xs text-muted-foreground">
            {averagePrice > 0 ? "Calculated from scraped data" : "No price data available"}
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
            {dataSource === "Apify" ? "Live scraped data" : "Ready for Apify integration"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

