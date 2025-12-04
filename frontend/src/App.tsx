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
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow">
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <ProductForm onProductCreated={handleProductCreated} />

            {loading && <p className="text-center text-gray-500">Carregando produtos...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            {!loading && !error && <ProductList products={products} />}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
