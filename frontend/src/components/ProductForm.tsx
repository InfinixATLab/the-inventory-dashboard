import { useState } from 'react';
import api from '../services/api';
import type { Product, Category } from '../types/Product';

interface ProductFormProps {
  onProductCreated: (newProduct: Product) => void;
  categories: Category[];
  isOpen: boolean;
  onToggleOpen: () => void;
  onOpenCategoryManager?: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  onProductCreated,
  categories,
  isOpen,
  onToggleOpen,
  onOpenCategoryManager,
}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [inStock, setInStock] = useState(true);
  const [categoryId, setCategoryId] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price || !categoryId) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      setError('Informe um valor de preço válido e maior que zero.');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const newProductData = {
        name: name.trim(),
        price: numericPrice,
        in_stock: inStock,
        category: parseInt(categoryId),
      };

      const response = await api.post<Product>('products/', newProductData);
      onProductCreated(response.data);

      setSuccess('Produto cadastrado com sucesso!');
      setName('');
      setPrice('');
      setInStock(true);
      setCategoryId('');

      setTimeout(() => {
        setSuccess(null);
        onToggleOpen();
      }, 1200);
    } catch (err: unknown) {
      let backendError = 'Falha ao criar o produto.';
      if (err && typeof err === 'object' && 'response' in err) {
        const responseData = (err as { response?: { data?: Record<string, string[]> } }).response?.data;
        backendError =
          responseData?.price?.[0] ||
          responseData?.name?.[0] ||
          responseData?.category?.[0] ||
          backendError;
      }
      setError(backendError);
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-800/80 shadow-xl shadow-black/20 overflow-hidden transition-all duration-300">
      {/* Header / Toggle Button */}
      <div
        onClick={onToggleOpen}
        className="flex items-center justify-between p-5 sm:px-6 cursor-pointer bg-gradient-to-r from-slate-900/80 to-slate-800/40 hover:bg-slate-800/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white">
              Cadastrar Novo Produto
            </h2>
            <p className="text-xs text-slate-400">
              Adicione itens ao inventário com categoria e controle de estoque
            </p>
          </div>
        </div>
        <button
          type="button"
          className={`p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Form Content */}
      {isOpen && (
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 border-t border-slate-800/80 space-y-5 animate-in fade-in duration-200">
          
          {error && (
            <div className="p-3.5 bg-rose-950/60 border border-rose-800/80 rounded-xl flex items-center gap-3 text-rose-300 text-sm">
              <svg className="w-5 h-5 shrink-0 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-3.5 bg-emerald-950/60 border border-emerald-800/80 rounded-xl flex items-center gap-3 text-emerald-300 text-sm">
              <svg className="w-5 h-5 shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{success}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Nome */}
            <div className="md:col-span-6 space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Nome do Produto <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ex: Teclado Mecânico RGB"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-800/60 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
                  required
                />
              </div>
            </div>

            {/* Preço */}
            <div className="md:col-span-3 space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Preço (R$) <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 text-sm font-semibold">
                  R$
                </span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0,00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-800/60 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
                  required
                />
              </div>
            </div>

            {/* Categoria */}
            <div className="md:col-span-3 space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Categoria <span className="text-rose-400">*</span>
                </label>
                {onOpenCategoryManager && (
                  <button
                    type="button"
                    onClick={onOpenCategoryManager}
                    className="text-[11px] font-semibold text-purple-400 hover:text-purple-300 underline transition-colors"
                  >
                    Gerenciar
                  </button>
                )}
              </div>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-800/60 border border-slate-700/80 rounded-xl text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all cursor-pointer"
                required
              >
                <option value="" disabled className="bg-slate-900 text-slate-400">Selecione uma categoria</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id} className="bg-slate-900 text-slate-200">
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            {/* Switch de Estoque */}
            <label className="inline-flex items-center gap-3 cursor-pointer select-none">
              <div className="relative inline-block w-11 h-6 transition duration-200 ease-in-out">
                <input
                  type="checkbox"
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                  className="opacity-0 w-0 h-0 peer"
                />
                <span className="slider absolute cursor-pointer inset-0 bg-slate-800 border border-slate-700 rounded-full transition-all duration-300 peer-checked:bg-emerald-600 peer-checked:border-emerald-500"></span>
                <span className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 peer-checked:translate-x-5 shadow-sm"></span>
              </div>
              <span className="text-sm font-medium text-slate-300">
                {inStock ? (
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                    Disponível em estoque
                  </span>
                ) : (
                  <span className="text-slate-500">Fora de estoque</span>
                )}
              </span>
            </label>

            {/* Actions */}
            <div className="flex items-center gap-3 justify-end">
              <button
                type="button"
                onClick={onToggleOpen}
                className="px-4 py-2.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 active:scale-[0.98] rounded-xl shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Salvando...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Salvar Produto
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProductForm;

