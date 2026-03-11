import React from 'react';
import { useProducts } from './hooks/useProducts';
import ProductForm from './components/ProductForm';
import ProductCard from './components/ProductCard';
import Toast from './components/Toast';

const App: React.FC = () => {
  const { 
    products, 
    loading, 
    error, 
    toast, 
    addProduct, 
    deleteProduct, 
    toggleStock 
  } = useProducts();

  return (
    <div className="min-h-screen w-full bg-[#0f172a] bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold text-white tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
            THE INVENTORY DASHBOARD
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Sistema de gerenciamento de inventário moderno, rápido e eficiente. Controle seus produtos com facilidade.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Form Side */}
          <div className="lg:col-span-1 sticky top-8">
            <ProductForm onSubmit={addProduct} />
          </div>

          {/* List Side */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
                <p className="text-slate-400 animate-pulse">Carregando produtos...</p>
              </div>
            ) : error ? (
              <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-8 text-center">
                <p className="text-rose-400 font-medium">{error}</p>
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white/5 border border-dashed border-white/10 rounded-2xl p-20 text-center">
                <svg className="w-16 h-16 text-white/20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-3.586a1 1 0 00-.707.293l-1.414 1.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-1.414-1.414A1 1 0 006.586 13H4" />
                </svg>
                <p className="text-slate-400 text-lg">Nenhum produto cadastrado ainda.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
                {products.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onDelete={deleteProduct} 
                    onToggleStock={toggleStock} 
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} />}
      
      <footer className="fixed bottom-0 left-0 right-0 py-6 text-center text-slate-500 bg-[#0f172a]/80 backdrop-blur-sm border-t border-white/5">
        &copy; {new Date().getFullYear()} Inventory Dashboard System | Built with React & Django
      </footer>
    </div>
  );
};

export default App;
