import { useEffect, useState } from "react";
import type { Product } from "../models/Product";
import { api } from "../services/api";
import { Loader } from "../components/Loader";
import { ProductCard } from "../components/ProductCard";
import { Modal } from "../components/Modal";
import { ProductForm } from "../components/ProductForm";

import toast from "react-hot-toast";

export const Home = () => {
  
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("produto/");
      setProducts(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      toast.error("Erro ao buscar produtos ou serviço não funcionando");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-4">
      <header className="bg-orange-500 text-white p-4 rounded mb-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Inventório Produtos</h1>
        <button onClick={() => setShowForm(true)}
          className="bg-white text-orange-500 px-4 py-2 rounded hover:bg-gray-100 transition"
        >
          Adicionar Produto
        </button>
      </header>

      <main>
        {products.length != 0 ? <p className="text-gray-500 pb-5">Para Editar o produto clique no nome</p> : ''}
        {isLoading ? ( <Loader />) : 
        (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onDelete={fetchProducts} onUpdated={fetchProducts}/>
            ))}
          </div>
        )}
        {products.length <= 0 && <h1> Sem Produtos Armazenados</h1>}
      </main>

      {showForm && (
        <Modal onClose={() => setShowForm(false)}>
          <ProductForm onClose={() => setShowForm(false)} onSaved={fetchProducts}/>
        </Modal>
      )}
    </div>
  );
};
