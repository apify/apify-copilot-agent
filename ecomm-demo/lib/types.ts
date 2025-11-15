export type Product = {
  url: string;
  title: string;
  image: string;
  description: string;
  price: number;
};

export type ScraperResponse = {
  products: Product[];
  runId?: string;
  runUrl?: string;
};

export type ScraperError = {
  error: string;
  details?: string;
};

