import { api } from "./api";
import type { Product } from "../types/Product";

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<Product[]>("products/");
  return response.data;
};

export const createProduct = async (product: Omit<Product, "id">) => {
  const response = await api.post<Product>("products/", product);
  return response.data;
};
