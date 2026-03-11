import React from 'react';
import type { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  onDelete: (id: number) => void;
  onToggleStock: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete, onToggleStock }) => {
  const formatBRL = (price: number | string) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(Number(price));
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 transition-all hover:scale-[1.02] hover:shadow-xl group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white truncate max-w-[200px]">{product.name}</h3>
          <p className="text-2xl font-mono text-emerald-400 mt-1">{formatBRL(product.price)}</p>
        </div>
        <button
          onClick={() => product.id && onDelete(product.id)}
          className="text-rose-400 hover:text-rose-600 p-2 rounded-full hover:bg-rose-400/10 transition-colors"
          title="Excluir produto"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      <div className="flex items-center justify-between mt-6">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            product.in_stock
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
          }`}
        >
          {product.in_stock ? 'Em Estoque' : 'Fora de Estoque'}
        </span>

        <button
          onClick={() => onToggleStock(product)}
          className="text-sm font-medium text-white/70 hover:text-white transition-colors underline decoration-dotted underline-offset-4"
        >
          Alternar Status
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
