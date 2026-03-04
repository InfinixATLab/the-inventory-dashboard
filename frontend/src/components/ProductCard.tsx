import { useState } from "react";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: string;
    in_stock: boolean;
  };
  onDelete: (id: number) => void;
  onEdit: (product: { id: number; name: string; price: string; in_stock: boolean }) => void;
}

export function ProductCard({ product, onDelete, onEdit }: ProductCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [inStock, setInStock] = useState(product.in_stock);

  const handleSave = () => {
    onEdit({ id: product.id, name, price, in_stock: inStock });
    setIsEditing(false);
  };

  return (
    <div className="border rounded-md p-4 mb-4 shadow-sm hover:shadow-md transition-shadow">
      {isEditing ? (
        <>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="border rounded px-2 py-1 w-full mb-2"
          />
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={e => setPrice(e.target.value)}
            className="border rounded px-2 py-1 w-full mb-2"
          />
          <label className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              checked={inStock}
              onChange={e => setInStock(e.target.checked)}
            />
            Em estoque
          </label>
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition mr-2"
          >
            Salvar
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 transition"
          >
            Cancelar
          </button>
        </>
      ) : (
        <>
          <p className="font-semibold text-lg">{product.name}</p>
          <p className="text-gray-700">Preço: R$ {Number(product.price).toFixed(2)}</p>
          <p className={product.in_stock ? "text-green-600" : "text-red-600"}>
            {product.in_stock ? "Em estoque" : "Fora de estoque"}
          </p>
          <div className="mt-3 flex gap-2">
            <button
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
              onClick={() => setIsEditing(true)}
            >
              Editar
            </button>
            <button
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
              onClick={() => onDelete(product.id)}
            >
              Deletar
            </button>
          </div>
        </>
      )}
    </div>
  );
}