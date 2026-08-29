export interface Product {
  id: number;
  name: string;
  description?: string;
  price: string | number;
  in_stock: boolean;
  category?: number | string;
  category_name?: string;
}

export interface Category {
  id: number;
  name: string;
}

