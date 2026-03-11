export interface Product {
  id?: number;
  name: string;
  price: number | string;
  in_stock: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ApiErrorResponse {
  message?: string;
  [key: string]: any;
}
