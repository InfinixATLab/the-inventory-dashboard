import type { Product } from '../types/Product';

interface ProductListProps {
  products: Product[];
  viewMode: 'grid' | 'table';
  onDeleteProduct?: (id: number) => void;
  deletingId?: number | null;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  viewMode,
  onDeleteProduct,
  deletingId,
}) => {
  const formatPrice = (price: string | number) => {
    const num = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(isNaN(num) ? 0 : num);
  };

  if (products.length === 0) {
    return (
      <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-800/80 p-12 text-center shadow-xl shadow-black/20">
        <div className="w-16 h-16 bg-slate-800/80 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-700/60">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <h3 className="text-base font-bold text-white">Nenhum produto encontrado</h3>
        <p className="text-sm text-slate-400 max-w-sm mx-auto mt-1">
          Não há itens correspondentes aos filtros selecionados ou ainda não existem produtos cadastrados.
        </p>
      </div>
    );
  }

  /* Table View */
  if (viewMode === 'table') {
    return (
      <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-800/80 shadow-xl shadow-black/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/50 border-b border-slate-800 text-slate-400 uppercase text-[11px] font-bold tracking-wider">
                <th className="py-4 px-6">Produto</th>
                <th className="py-4 px-6">Categoria</th>
                <th className="py-4 px-6">Preço</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-sm">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-800/40 transition-colors group">
                  <td className="py-4 px-6 font-semibold text-white">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-950 to-purple-900/60 border border-indigo-700/50 flex items-center justify-center text-indigo-300 font-bold text-xs uppercase group-hover:scale-105 transition-all">
                        {product.name.slice(0, 2)}
                      </div>
                      <span className="group-hover:text-indigo-300 transition-colors">{product.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-800 text-indigo-300 border border-slate-700/60">
                      {product.category_name || `Cat #${product.category}`}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                    {formatPrice(product.price)}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                        product.in_stock
                          ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60'
                          : 'bg-rose-950/80 text-rose-400 border border-rose-800/60'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          product.in_stock ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'
                        }`}
                      ></span>
                      {product.in_stock ? 'Em estoque' : 'Sem estoque'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    {onDeleteProduct && (
                      <button
                        onClick={() => onDeleteProduct(product.id)}
                        disabled={deletingId === product.id}
                        title="Excluir produto"
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-950/50 transition-all disabled:opacity-50"
                      >
                        {deletingId === product.id ? (
                          <svg className="w-4 h-4 animate-spin text-rose-400" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        )}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  /* Grid / Cards View */
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {products.map((product) => (
        <div
          key={product.id}
          className="group relative bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-800/80 p-6 shadow-xl shadow-black/20 hover:shadow-indigo-500/10 hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between"
        >
          {/* Decorative subtle top bar on hover */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Header do Card */}
          <div>
            <div className="flex justify-between items-start gap-2">
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-800/90 text-indigo-300 border border-slate-700/60">
                {product.category_name || `Categoria`}
              </span>
              
              <div className="flex items-center gap-1.5">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full ${
                    product.in_stock
                      ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60'
                      : 'bg-rose-950/80 text-rose-400 border border-rose-800/60'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      product.in_stock ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'
                    }`}
                  ></span>
                  {product.in_stock ? 'Disponível' : 'Indisponível'}
                </span>

                {onDeleteProduct && (
                  <button
                    onClick={() => onDeleteProduct(product.id)}
                    disabled={deletingId === product.id}
                    title="Excluir produto"
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/50 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                  >
                    {deletingId === product.id ? (
                      <svg className="w-4 h-4 animate-spin text-rose-400" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    )}
                  </button>
                )}
              </div>
            </div>

            <h3 className="text-lg font-bold text-white mt-3 group-hover:text-indigo-300 transition-colors">
              {product.name}
            </h3>
          </div>

          {/* Rodapé do Card */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-baseline justify-between">
            <span className="text-xs text-slate-400 font-medium">Preço unitário</span>
            <p className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 tracking-tight">
              {formatPrice(product.price)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;

