import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RemoteImage } from "@/components/RemoteImage";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

interface ProductTableProps {
  products: Product[];
}

export function ProductTable({ products }: ProductTableProps) {
  const truncate = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Data Table</CardTitle>
        <CardDescription>
          Detailed view of all products with URLs, titles, images, descriptions, and prices
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] w-full rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead className="min-w-[200px]">Title</TableHead>
                <TableHead className="min-w-[100px]">Price</TableHead>
                <TableHead className="min-w-[300px]">Description</TableHead>
                <TableHead className="min-w-[200px]">URL</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="relative h-12 w-12 overflow-hidden rounded-md">
                      <RemoteImage
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {product.title}
                  </TableCell>
                  <TableCell className="font-semibold">{formatPrice(product.price)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {truncate(product.description, 100)}
                  </TableCell>
                  <TableCell className="text-xs">
                    <a 
                      href={product.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {truncate(product.url, 40)}
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

