import React from 'react';
import ProductList from './components/ProductList';

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Painel de Inventário
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Aqui você pode adicionar o formulário de criação e a lista */}
          <div className="px-4 py-6 sm:px-0">
            {/* Futuramente, adicione o ProductForm aqui */}
            <h2 className="text-2xl font-semibold mb-4">Lista de Produtos</h2>
            <ProductList />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
