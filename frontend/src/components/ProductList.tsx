import React from 'react';
import type { Product } from '../types/Product';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  if (products.length === 0) {
    return <p className="text-center text-gray-500">Nenhum produto encontrado.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${product.in_stock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                {product.in_stock ? 'Disponível' : 'Indisponível'}
              </span>
            </div>
          </div>
          <p className="text-lg font-semibold text-gray-900 mt-4">R$ {product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
