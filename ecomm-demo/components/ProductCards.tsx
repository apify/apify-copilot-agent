import { Product } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { RemoteImage } from "@/components/RemoteImage";

interface ProductCardsProps {
  products: Product[];
}

export function ProductCards({ products }: ProductCardsProps) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Product Details</h2>
        <p className="text-muted-foreground mt-2">
          Browse individual product cards with detailed information
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <Card key={index} className="flex flex-col overflow-hidden">
            <div className="relative h-48 w-full overflow-hidden bg-muted">
              <RemoteImage
                src={product.image}
                alt={product.title}
                fill
                className="object-cover transition-transform hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="line-clamp-2 text-lg">
                  {product.title}
                </CardTitle>
                <Badge variant="secondary" className="shrink-0">
                  ${product.price}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1">
              <CardDescription className="line-clamp-3">
                {product.description}
              </CardDescription>
            </CardContent>
            
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full"
                asChild
              >
                <a 
                  href={product.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  View Product
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

