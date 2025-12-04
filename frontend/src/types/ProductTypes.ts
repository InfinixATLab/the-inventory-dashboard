export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  in_stock: boolean;
  category: Category;
}

export interface ProductState {
  data: Product[];
  isLoading: boolean;
  isError: boolean;
}

export type ProductAction =
  | { type: "PRODUCT_FETCH_INIT" }
  | { type: "PRODUCT_FETCH_SUCCESS"; payload: Product[] }
  | { type: "PRODUCT_FETCH_FAILURE" };
