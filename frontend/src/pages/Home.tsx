import { useEffect, useState } from "react";
import type { Product } from "../models/Product";
import { api } from "../services/api";
import { ProductCard } from "../components/ProductCard";



export const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      
      const response = await api.get("produto/");
      setProducts(response.data);
     
    } catch (error) {
      console.error(error);
      
     
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-4">
      <header className="bg-orange-500 text-white p-4 rounded mb-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Inventório Produtos</h1>
        <button
          className="bg-white text-orange-500 px-4 py-2 rounded hover:bg-gray-100 transition"
        >
          Adicionar Produto
        </button>
      </header>

      <main>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product}/>
            ))}
          </div>

        {products.length <= 0 && <h1> Sem Produtos Armazenados</h1>}
      </main>

    </div>
  );
};
