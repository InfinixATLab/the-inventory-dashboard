import toast from "react-hot-toast";
import type { Product } from "../models/Product";
import { api } from "../services/api";


export const ProductCard = ({ product , onDelete} : {product:Product, onDelete:()=>void}) => {

    const deleteProduct = async () =>{
    try{
      await api.delete(`produto/${product?.id}/`);
      toast.success("Produto Excluido com sucesso!");
      onDelete();
    }
    catch(err){
      console.log(err)
      toast.error("Erro ao deletar produto");
    }
  }

  return (
    <>
      <div className="bg-blue-50 shadow p-4 rounded w-48 hover:border-orange-400 border transition">
        <div className="flex justify-between">
          <span className={`text-white text-xs px-2 py-1 rounded  ${
            product.in_stock ? "bg-green-500" : "bg-red-500"}`}>
            {product.in_stock ? "Em Estoque" : "Sem Estoque"}
          </span>
          <button className="bg-gray-300 size-6 rounded hover:bg-gray-200 transition" onClick={deleteProduct}>
            <img src="http://cdn-icons-png.flaticon.com/512/3405/3405244.png" alt="" width={50}/>
          </button>
        </div>
        
        
        <p className="mt-3 font-medium cursor-pointer">{product.name}</p>
        <p className="text-orange-500 text-lg font-bold cursor-pointer">R$ {product.price}</p>
        <p className="text-gray-500 text-sm mt-1">{product.category}</p>

      </div>
    </>
  );
};
