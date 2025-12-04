import { useState } from "react";
import type { Product } from "../models/Product"; 
import { api } from "../services/api";
import { Loader } from "./Loader";
import toast from "react-hot-toast";

export const ProductForm = ({onClose, onSaved, product}:{onClose:()=>void,onSaved:()=>void,product?:Product}) => {
    const [productData, setProductData] = useState<Omit<Product, "id">>({
        name: product?.name ?? "",
        price: product?.price ?? 0,
        in_stock: product?.in_stock ?? true,
        category: product?.category ?? "",
    });

    const [isLoading, setIsLoading] = useState(false);

    const submitData = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!productData.name || !productData.category || productData.price <= 0) {
            toast.error("Não são permitidos campos vazios ou preço abaixo de 0");
            return;
        }else if(String(productData.price).length > 8){
            toast.error("Preço não pode conter muitos números");
            return;
        }

        try {
            setIsLoading(true);
            if(!product){
                await api.post("produto/", productData);
                setIsLoading(false);
                toast.success('Produto Criado com sucesso')
            }else{
                await api.put(`produto/${product.id}/`, productData);
                setIsLoading(false);
                toast.success("Produto editado com sucesso!");
            }
            onSaved();
            onClose();
            
        } catch (error) {
            console.error(error);
            toast.error('erro ao salvar produto')
            setIsLoading(false);
        }
    };

  return (
    <form onSubmit={submitData} className="flex flex-col gap-4">
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
            {isLoading ? <Loader /> : product ? "Salvar Alterações" : "Criar Produto"}
        </button>
    </form>
  );
};
