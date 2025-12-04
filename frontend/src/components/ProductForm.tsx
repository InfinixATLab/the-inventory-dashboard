import { useState } from "react";
import type { Product } from "../models/Product"; 
import { api } from "../services/api";

export const ProductForm = ({onClose, onSaved}:{onClose:()=>void,onSaved:()=>void}) => {

  const [productData, setProductData] = useState<Omit<Product, "id">>({
    name: "",
    price:  0,
    in_stock:  true,
    category: "",
  });

  const SubmitData = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!productData.name || !productData.category || productData.price <= 0) {
      alert("Não são permitidos campos vazios ou preço abaixo de 0");
      return;
    }else if(String(productData.price).length > 8){
      alert("Preço não pode conter muitos números");
      return;
    }

    try {
        await api.post("produto/", productData);
        alert('Produto Craido com sucesso')
      
        onSaved();
        onClose();
    
    } catch (error) {
      console.error(error);
      alert('erro ao salvar produto')
    }
  };

  return (
    <form onSubmit={SubmitData} className="flex flex-col gap-4">
      <label className="flex flex-col">
        Nome do Produto:
        <input type="text" value={productData.name}
          onChange={e => setProductData({ ...productData, name: e.target.value })}
          className="border p-2 rounded"
        />
      </label>
      <label className="flex flex-col">
        Digite o Preço do Produto (use ponto para decimais):
        <input type="number" value={productData.price}
          onChange={e => setProductData({ ...productData, price: e.target.value=='' ? '' : Number(e.target.value) })}
          className="border p-2 rounded"
        />
      </label>
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={productData.in_stock}
          onChange={e => setProductData({ ...productData, in_stock: e.target.checked })}
        />
        Produto em estoque
      </label>
      <label className="flex flex-col">
        Categoria:
        <input type="text" value={productData.category}
          onChange={e => setProductData({ ...productData, category: e.target.value })}
          className="border p-2 rounded"
        />
      </label>

      <button type="submit"
        className="bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
      >
       Criar Produto
      </button>
    </form>
  );
};
