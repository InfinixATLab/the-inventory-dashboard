import { useState } from "react";
import type { FormEvent } from "react";
import type { Category, Product } from "../types/ProductTypes";
import { createProduct } from "../services/api";
import { parsePriceBR } from "../utils/priceUtils";

interface ProductFormProps {
  categories: Category[];
  onProductCreated: (product: Product) => void;
}

export const ProductForm = ({ categories, onProductCreated }: ProductFormProps) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<string>("");
  const [inStock, setInStock] = useState(true);
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!categoryId) return;

    setIsSubmitting(true);

    const newProduct = {
      name,
      price: parsePriceBR(price),
      in_stock: inStock,
      category: categoryId,
    };

    try {
      const response = await createProduct(newProduct);
      onProductCreated(response.data);

      setName("");
      setPrice("");
      setInStock(true);
      setCategoryId(undefined);
    } catch (error) {
      console.error(error);
      alert("Falha ao criar produto");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePriceChange = (value: string) => {
    const cleaned = value.replace(/[^\d,]/g, "");
    setPrice(cleaned);
  };

  return (
    <form
      className="flex flex-col gap-2 mb-6 p-4 border rounded shadow"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Nome do Produto"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded"
        required
      />

      <input
        type="text"
        placeholder="Preço (ex: 1.234,56)"
        value={price}
        onChange={(e) => handlePriceChange(e.target.value)}
        className="border p-2 rounded"
        required
      />

      <select
        value={categoryId ?? ""}
        onChange={(e) => setCategoryId(Number(e.target.value))}
        className="border p-2 rounded"
        required
      >
        <option value="">Selecione a Categoria</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={inStock}
          onChange={(e) => setInStock(e.target.checked)}
        />
        Em Estoque
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isSubmitting ? "Salvando..." : "Adicionar Produto"}
      </button>
    </form>
  );
};
