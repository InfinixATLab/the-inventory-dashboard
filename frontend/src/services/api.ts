import axios from "axios";
import type { Product, Category } from "../types/ProductTypes";

const API_URL = "http://localhost:8000/api/products/";
const CATEGORY_URL = "http://localhost:8000/api/categories/";

export interface ProductRequest {
  name: string;
  price: number;
  in_stock: boolean;
  category: number;
}


export const getProducts = () => axios.get<Product[]>(API_URL);
export const createProduct = (product: ProductRequest) => axios.post<Product>(API_URL, product);
export const updateProduct = (id: number, product: Omit<Product, "id">) => axios.put<Product>(`${API_URL}${id}/`, product);
export const deleteProduct = (id: number) => axios.delete(`${API_URL}${id}/`);

export const getCategories = () => axios.get<Category[]>(CATEGORY_URL);
