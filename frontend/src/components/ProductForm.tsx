import { useState } from "react";
import { api } from "../services/api";

interface ProductFormProps {
  onAdd: (product: {
    id: number;
    name: string;
    price: string;
    in_stock: boolean;
  }) => void;
}

export function ProductForm({ onAdd }: ProductFormProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [inStock, setInStock] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("products/", {
        name,
        price,
        in_stock: inStock,
      });
      onAdd(res.data); // atualiza a lista no App
      setName("");
      setPrice("");
      setInStock(true);
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border p-4 mb-6 rounded-md shadow-sm"
    >
      <h2 className="text-xl font-semibold mb-4">Adicionar Produto</h2>

      <div className="mb-3">
        <label className="block mb-1">Nome:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-2 py-1"
          required
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1">Preço:</label>
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border rounded px-2 py-1"
          required
        />
      </div>

      <div className="mb-3">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
          />
          Em estoque
        </label>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Adicionar
      </button>
    </form>
  );
}
