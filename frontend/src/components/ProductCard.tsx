import type { Product } from "../types/ProductTypes";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="border rounded p-4 shadow hover:shadow-lg transition flex flex-col gap-2">
      <h3 className="text-lg font-bold">{product.name}</h3>
      <p className="text-gray-700">
        {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(product.price)}
      </p>
      <span
        className={`text-white px-2 py-1 rounded text-xs w-fit ${
          product.in_stock ? "bg-green-500" : "bg-red-500"
        }`}
      >
        {product.in_stock ? "Em estoque" : "Sem estoque"}
      </span>
      <span className="text-gray-500 text-sm">{product.category.name}</span>
    </div>
  );
};
