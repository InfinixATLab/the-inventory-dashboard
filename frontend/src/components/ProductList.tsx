import React, { useState, useEffect } from 'react';
import api from '../services/api';
import type { Product } from '../types/Product';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get<Product[]>('products/');
        setProducts(response.data);
        setError(null);
      } catch (err) {
        setError('Falha ao carregar os produtos.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // O array vazio faz com que o efeito rode apenas uma vez

  if (loading) return <p className="text-center text-gray-500">Carregando...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Nome</th>
            <th className="py-3 px-4 text-left">Preço</th>
            <th className="py-3 px-4 text-left">Estoque</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {products.map((product) => (
            <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-4">{product.name}</td>
              <td className="py-3 px-4">R$ {product.price}</td>
              <td className="py-3 px-4">{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
