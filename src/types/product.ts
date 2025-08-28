export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: 'firm-ground' | 'soft-ground' | 'artificial-grass' | 'indoor';
  sizes: number[];
  colors: string[];
  description: string;
  features: string[];
  isNew?: boolean;
  isOnSale?: boolean;
}

export interface CartItem {
  product: Product;
  size: number;
  color: string;
  quantity: number;
}