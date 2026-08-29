import type { Product, Category } from '../types/Product';

interface StatsOverviewProps {
  products: Product[];
  categories: Category[];
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ products, categories }) => {
  const totalProducts = products.length;
  
  const inStockCount = products.filter(p => p.in_stock).length;
  const outOfStockCount = totalProducts - inStockCount;

  const totalValue = products.reduce((acc, p) => {
    const val = typeof p.price === 'string' ? parseFloat(p.price) : p.price;
    return acc + (isNaN(val) ? 0 : val);
  }, 0);

  const formattedTotalValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(totalValue);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {/* Card 1: Total Produtos */}
      <div className="relative overflow-hidden bg-slate-900/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-800/80 shadow-xl shadow-indigo-950/20 hover:border-indigo-500/50 hover:shadow-indigo-500/10 transition-all duration-300 group">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-indigo-300">Total de Produtos</p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">{totalProducts}</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform duration-300">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-400 font-medium">
          <span className="text-indigo-400 font-bold">{categories.length}</span> categorias ativas
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Card 2: Valor Estimado */}
      <div className="relative overflow-hidden bg-slate-900/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-800/80 shadow-xl shadow-emerald-950/20 hover:border-emerald-500/50 hover:shadow-emerald-500/10 transition-all duration-300 group">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-300">Valor em Inventário</p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 mt-2">{formattedTotalValue}</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform duration-300">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-1 text-xs text-emerald-400 font-medium">
          <span>Capital total investido</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Card 3: Disponíveis */}
      <div className="relative overflow-hidden bg-slate-900/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-800/80 shadow-xl shadow-cyan-950/20 hover:border-cyan-500/50 hover:shadow-cyan-500/10 transition-all duration-300 group">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">Itens em Estoque</p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">{inStockCount}</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-400 text-white flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform duration-300">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs text-slate-400 font-medium">
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700/50">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-2 rounded-full transition-all duration-500" 
              style={{ width: `${totalProducts > 0 ? (inStockCount / totalProducts) * 100 : 0}%` }}
            ></div>
          </div>
          <span className="shrink-0 text-cyan-400 font-bold">{totalProducts > 0 ? Math.round((inStockCount / totalProducts) * 100) : 0}%</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Card 4: Fora de Estoque */}
      <div className="relative overflow-hidden bg-slate-900/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-800/80 shadow-xl shadow-rose-950/20 hover:border-rose-500/50 hover:shadow-rose-500/10 transition-all duration-300 group">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-rose-300">Sem Estoque</p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-rose-400 mt-2">{outOfStockCount}</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-600 to-pink-500 text-white flex items-center justify-center shadow-lg shadow-rose-500/30 group-hover:scale-110 transition-transform duration-300">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-1 text-xs text-rose-400 font-medium">
          <span>{outOfStockCount > 0 ? 'Ação requerida' : 'Estoque 100% em dia'}</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </div>
  );
};

export default StatsOverview;
