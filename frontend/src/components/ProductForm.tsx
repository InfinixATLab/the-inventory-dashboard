import React, { useState } from 'react';
import api from '../services/api';
import type { Product } from '../types/Product';

interface ProductFormProps {
  onProductCreated: (newProduct: Product) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onProductCreated }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [inStock, setInStock] = useState(true);
  const [categoryId, setCategoryId] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !categoryId) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    setIsSubmitting(true);
    setError(null);

    try {
      const newProductData = {
        name,
        price: parseFloat(price),
        in_stock: inStock,
        category_id: parseInt(categoryId),
      };

      const response = await api.post<Product>('products/', newProductData);
      onProductCreated(response.data); // Atualiza a lista no componente pai

      // Limpa o formulário
      setName('');
      setPrice('');
      setInStock(true);
      setCategoryId('');

    } catch (err: any) {
      // Bônus: Exibe erro de validação do backend
      const backendError = err.response?.data?.price?.[0] || 'Falha ao criar o produto.';
      setError(backendError);
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-semibold mb-4">Criar Novo Produto</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input type="text" placeholder="Nome do Produto" value={name} onChange={e => setName(e.target.value)} className="p-2 border rounded col-span-1 md:col-span-2" />
        <input type="number" placeholder="Preço" value={price} onChange={e => setPrice(e.target.value)} className="p-2 border rounded" />
      </div>
      <div className="flex items-center justify-between mt-4">
        <label className="flex items-center">
          <input type="checkbox" checked={inStock} onChange={e => setInStock(e.target.checked)} className="mr-2" />
          Em estoque
        </label>
        <button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400">
          {isSubmitting ? 'Salvando...' : 'Salvar Produto'}
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

export default ProductForm;

