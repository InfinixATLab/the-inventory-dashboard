import type { Category } from '../types/Product';

export type SortOption = 'name-asc' | 'price-asc' | 'price-desc' | 'id-desc';
export type StockFilterOption = 'all' | 'in_stock' | 'out_of_stock';

interface ProductFiltersProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedCategory: string;
  onCategoryChange: (val: string) => void;
  stockFilter: StockFilterOption;
  onStockFilterChange: (val: StockFilterOption) => void;
  sortBy: SortOption;
  onSortByChange: (val: SortOption) => void;
  viewMode: 'grid' | 'table';
  onViewModeChange: (val: 'grid' | 'table') => void;
  categories: Category[];
  totalResults: number;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  stockFilter,
  onStockFilterChange,
  sortBy,
  onSortByChange,
  viewMode,
  onViewModeChange,
  categories,
  totalResults,
}) => {
  return (
    <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-slate-800/80 shadow-xl shadow-black/20 space-y-4">
      <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
        
        {/* Search input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Buscar por nome do produto..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-800/60 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Filters Group */}
        <div className="flex flex-wrap sm:flex-nowrap gap-2.5 items-center">
          
          {/* Categoria */}
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="px-3.5 py-2.5 bg-slate-800/60 border border-slate-700/80 rounded-xl text-sm font-medium text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all cursor-pointer"
          >
            <option value="" className="bg-slate-900 text-slate-200">Todas Categorias</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id} className="bg-slate-900 text-slate-200">
                {c.name}
              </option>
            ))}
          </select>

          {/* Status Estoque */}
          <div className="inline-flex p-1 bg-slate-800/80 border border-slate-700/60 rounded-xl text-xs font-medium text-slate-400">
            <button
              type="button"
              onClick={() => onStockFilterChange('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                stockFilter === 'all'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md font-bold'
                  : 'hover:text-white'
              }`}
            >
              Todos
            </button>
            <button
              type="button"
              onClick={() => onStockFilterChange('in_stock')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                stockFilter === 'in_stock'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md font-bold'
                  : 'hover:text-white'
              }`}
            >
              Em estoque
            </button>
            <button
              type="button"
              onClick={() => onStockFilterChange('out_of_stock')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                stockFilter === 'out_of_stock'
                  ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md font-bold'
                  : 'hover:text-white'
              }`}
            >
              Sem estoque
            </button>
          </div>

          {/* Ordenação */}
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value as SortOption)}
            className="px-3.5 py-2.5 bg-slate-800/60 border border-slate-700/80 rounded-xl text-sm font-medium text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all cursor-pointer"
          >
            <option value="id-desc" className="bg-slate-900 text-slate-200">Mais recentes</option>
            <option value="name-asc" className="bg-slate-900 text-slate-200">Nome (A-Z)</option>
            <option value="price-asc" className="bg-slate-900 text-slate-200">Menor Preço</option>
            <option value="price-desc" className="bg-slate-900 text-slate-200">Maior Preço</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex bg-slate-800/80 border border-slate-700/60 p-1 rounded-xl">
            <button
              onClick={() => onViewModeChange('grid')}
              title="Visualização em Cards"
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'grid'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => onViewModeChange('table')}
              title="Visualização em Tabela"
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'table'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
          </div>

        </div>

      </div>

      <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
        <span>Mostrando <strong className="text-white font-semibold">{totalResults}</strong> produto(s)</span>
        {(searchQuery || selectedCategory || stockFilter !== 'all') && (
          <span className="text-indigo-300 bg-indigo-950/80 border border-indigo-700/60 px-2.5 py-0.5 rounded-full font-medium shadow-sm">
            Filtros ativos
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductFilters;
