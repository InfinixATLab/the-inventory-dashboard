import axios from 'axios';
import type { Product } from '../types/product';

const API_URL = 'http://localhost:8000/api/products/';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productService = {
  getAll: async (): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>('');
    return response.data;
  },

  getById: async (id: number): Promise<Product> => {
    const response = await apiClient.get<Product>(`${id}/`);
    return response.data;
  },

  create: async (product: Product): Promise<Product> => {
    const response = await apiClient.post<Product>('', product);
    return response.data;
  },

  update: async (id: number, product: Product): Promise<Product> => {
    const response = await apiClient.put<Product>(`${id}/`, product);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`${id}/`);
  },
};
