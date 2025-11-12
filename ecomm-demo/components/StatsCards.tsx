import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface StatsCardsProps {
  productCount: number;
  averagePrice?: number | string | null;
  currency?: string;
  dataSourceLabel?: string;
}

export function StatsCards({
  productCount,
  averagePrice,
  currency,
  dataSourceLabel,
}: StatsCardsProps) {
  const priceLabel =
    averagePrice === undefined
      ? "-"
      : formatPrice(averagePrice, {
          currency: currency ?? "USD",
          fallback: "-",
        });
  const sourceLabel = dataSourceLabel ?? "Mock";

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
          <div className="text-2xl font-bold">{priceLabel}</div>
          <p className="text-xs text-muted-foreground">Calculated from loaded data</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Data Source</CardTitle>
          <span className="text-lg">🔗</span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{sourceLabel}</div>
          <p className="text-xs text-muted-foreground">
            Ready for Apify integration
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

