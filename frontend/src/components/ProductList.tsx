import { ProductCard } from "./ProductCard";

interface Product {
  id: number;
  name: string;
  price: string;
  in_stock: boolean;
}

interface ProductListProps {
  products: Product[];
  onDelete: (id: number) => void;
  onEdit: (product: Product) => void;
}

export function ProductList({ products, onDelete, onEdit }: ProductListProps) {
  if (products.length === 0) return <p className="text-gray-500">Nenhum produto cadastrado.</p>;

  return (
    <>
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </>
  );
}