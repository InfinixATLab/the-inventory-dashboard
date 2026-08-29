import { useState, useEffect, useMemo } from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import StatsOverview from './components/StatsOverview';
import ProductFilters from './components/ProductFilters';
import api from './services/api';
import type { Product, Category } from './types/Product';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // UI state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [stockFilter, setStockFilter] = useState<'all' | 'in_stock' | 'out_of_stock'>('all');
  const [sortBy, setSortBy] = useState<'name-asc' | 'price-asc' | 'price-desc' | 'id-desc'>('id-desc');

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        api.get<Product[]>('products/'),
        api.get<Category[]>('categories/'),
      ]);
      setProducts(productsRes.data);
      setCategories(categoriesRes.data);
    } catch (err) {
      console.error(err);
      setError('Falha ao conectar com o servidor. Verifique se a API está em execução.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleProductCreated = (newProduct: Product) => {
    // Vincular o nome da categoria caso venha como ID
    if (!newProduct.category_name && newProduct.category) {
      const cat = categories.find((c) => c.id === Number(newProduct.category));
      if (cat) newProduct.category_name = cat.name;
    }
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleDeleteProduct = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja excluir este produto do inventário?')) {
      return;
    }
    setDeletingId(id);
    try {
      await api.delete(`products/${id}/`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error('Falha ao excluir produto:', err);
      alert('Não foi possível excluir o produto. Tente novamente.');
    } finally {
      setDeletingId(null);
    }
  };

  // Filtragem e Ordenação
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Busca textual
        const matchesQuery = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        
        // Categoria
        const matchesCategory =
          !selectedCategory ||
          String(p.category) === String(selectedCategory) ||
          categories.find((c) => String(c.id) === String(selectedCategory))?.name === p.category_name;

        // Status de Estoque
        const matchesStock =
          stockFilter === 'all' ||
          (stockFilter === 'in_stock' && p.in_stock) ||
          (stockFilter === 'out_of_stock' && !p.in_stock);

        return matchesQuery && matchesCategory && matchesStock;
      })
      .sort((a, b) => {
        const priceA = typeof a.price === 'string' ? parseFloat(a.price) : a.price;
        const priceB = typeof b.price === 'string' ? parseFloat(b.price) : b.price;

        if (sortBy === 'price-asc') return (priceA || 0) - (priceB || 0);
        if (sortBy === 'price-desc') return (priceB || 0) - (priceA || 0);
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        return b.id - a.id; // id-desc
      });
  }, [products, categories, searchQuery, selectedCategory, stockFilter, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-slate-100 flex flex-col relative overflow-hidden">
      {/* Decorative Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-slate-900/70 backdrop-blur-xl border-b border-slate-800/80 shadow-lg shadow-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30 font-black text-xl">
                📦
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-tight flex items-center gap-1.5">
                  Inventory<span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Hub</span>
                </h1>
                <p className="text-[11px] text-slate-400 font-medium">
                  Gestão Inteligente de Estoque
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsFormOpen((prev) => !prev)}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 active:scale-95 rounded-xl shadow-lg shadow-indigo-600/30 transition-all border border-indigo-400/30"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>{isFormOpen ? 'Fechar Formulário' : 'Novo Produto'}</span>
              </button>

              <button
                onClick={fetchData}
                title="Recarregar dados"
                className="p-2.5 rounded-xl text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-all shadow-sm"
              >
                <svg className={`w-5 h-5 ${loading ? 'animate-spin text-indigo-400' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 relative z-10">
        {/* KPI Cards */}
        <StatsOverview products={products} categories={categories} />

        {/* Formulário Retrátil */}
        <ProductForm
          onProductCreated={handleProductCreated}
          categories={categories}
          isOpen={isFormOpen}
          onToggleOpen={() => setIsFormOpen((prev) => !prev)}
        />

        {/* Barra de Filtros e Busca */}
        <ProductFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          stockFilter={stockFilter}
          onStockFilterChange={setStockFilter}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          categories={categories}
          totalResults={filteredProducts.length}
        />

        {/* Feedback de Erro */}
        {error && (
          <div className="p-4 bg-rose-950/50 border border-rose-800/80 backdrop-blur-md rounded-2xl flex items-center justify-between text-rose-300 text-sm">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-rose-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
            <button
              onClick={fetchData}
              className="px-3 py-1 bg-rose-900/60 hover:bg-rose-800 text-rose-200 rounded-lg text-xs font-semibold transition-colors"
            >
              Tentar Novamente
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="py-16 text-center space-y-3">
            <div className="inline-block w-9 h-9 border-4 border-indigo-500/20 border-t-indigo-400 rounded-full animate-spin"></div>
            <p className="text-sm font-medium text-slate-400">Sincronizando inventário com o servidor...</p>
          </div>
        )}

        {/* Listagem de Produtos */}
        {!loading && (
          <ProductList
            products={filteredProducts}
            viewMode={viewMode}
            onDeleteProduct={handleDeleteProduct}
            deletingId={deletingId}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950/60 backdrop-blur-md py-6 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium">
          <p>© {new Date().getFullYear()} InventoryHub — Sistema de Gestão de Estoque</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> API Online
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

