import { useState, useEffect, useCallback } from 'react';
import type { Product } from '../types/product';
import { productService } from '../services/productService';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await productService.getAll();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Falha ao carregar produtos. Verifique se o backend está rodando.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const addProduct = async (product: Product) => {
    try {
      await productService.create(product);
      showToast('Produto criado com sucesso!', 'success');
      fetchProducts();
      return true;
    } catch (err: any) {
      const message = err.response?.data?.price?.[0] || err.response?.data?.message || 'Erro ao criar produto.';
      showToast(message, 'error');
      return false;
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await productService.delete(id);
      showToast('Produto removido!', 'success');
      fetchProducts();
    } catch (err) {
      showToast('Erro ao remover produto.', 'error');
    }
  };

  const toggleStock = async (product: Product) => {
    if (!product.id) return;
    try {
      await productService.update(product.id, {
        ...product,
        in_stock: !product.in_stock,
      });
      fetchProducts();
    } catch (err) {
      showToast('Erro ao atualizar estoque.', 'error');
    }
  };

  return {
    products,
    loading,
    error,
    toast,
    addProduct,
    deleteProduct,
    toggleStock,
    refresh: fetchProducts,
  };
};
