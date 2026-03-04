import { useEffect, useState } from "react";
import { api } from "./services/api";
import { ProductForm } from "./components/ProductForm";
import { ProductList } from "./components/ProductList";

interface Product {
  id: number;
  name: string;
  price: string;
  in_stock: boolean;
}

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api
      .get("products/")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleAddProduct = (product: Product) =>
    setProducts([...products, product]);
  const handleDeleteProduct = async (id: number) => {
    await api.delete(`products/${id}/`);
    setProducts(products.filter((p) => p.id !== id));
  };
  const handleEditProduct = async (updated: Product) => {
    const res = await api.put(`products/${updated.id}/`, updated);
    setProducts(products.map((p) => (p.id === updated.id ? res.data : p)));
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard de Produtos</h1>

      <ProductForm onAdd={handleAddProduct} />

      <ProductList
        products={products}
        onDelete={handleDeleteProduct}
        onEdit={handleEditProduct}
      />
    </div>
  );
}
