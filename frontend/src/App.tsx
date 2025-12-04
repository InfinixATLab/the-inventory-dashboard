import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import api from './services/api';
import type { Product } from './types/Product';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get<Product[]>('products/')
      .then(response => {
        setProducts(response.data);
      })
      .catch(() => {
        setError('Falha ao carregar os produtos.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleProductCreated = (newProduct: Product) => {
    setProducts(prevProducts => [newProduct, ...prevProducts]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Painel de Inventário
          </h1>
        </div>
      </header>
      <main className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <ProductForm onProductCreated={handleProductCreated} />

          {loading && <p className="text-center text-gray-500">Carregando produtos...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          {!loading && !error && <ProductList products={products} />}
        </div>
      </main>
    </div>
  )
}

export default App
