import type { Product } from "../models/Product";


export const ProductCard = ({ product } : {product:Product}) => {

  return (
    <>
      <div className="bg-blue-50 shadow p-4 rounded w-48 hover:border-orange-400 border transition">
        <div className="flex justify-between">
          <span className={`text-white text-xs px-2 py-1 rounded  ${
            product.in_stock ? "bg-green-500" : "bg-red-500"}`}>
            {product.in_stock ? "Em Estoque" : "Sem Estoque"}
          </span>
        </div>
        
        
        <p className="mt-3 font-medium cursor-pointer">{product.name}</p>
        <p className="text-orange-500 text-lg font-bold cursor-pointer">R$ {product.price}</p>
        <p className="text-gray-500 text-sm mt-1">{product.category}</p>

      </div>
    </>
  );
};
