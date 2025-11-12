export type Product = {
  url: string;
  title: string;
  image: string;
  description: string;
  price: number;
};

// Apify E-Commerce Scraper output type
export type ApifyProductOutput = {
  url?: string;
  name?: string;
  image?: string;
  description?: string | null;
  offers?: {
    price?: number | null;
    priceCurrency?: string | null;
  };
  brand?: {
    slogan?: string | null;
  };
};

