import { useState, useEffect } from "react";
import axios from "axios";

export default function ProductForm({ onCreated }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [inStock, setInStock] = useState(false);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  // Carregar categorias
  useEffect(() => {
    axios.get("http://localhost:8000/api/categories/").then((res) => {
      setCategories(res.data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      price,
      in_stock: inStock,
      category,
    };

    try {
      const res = await axios.post(
        "http://localhost:8000/api/products/",
        payload
      );

      // --------------------------------------
      //    ENVIAR PRODUTO CRIADO PARA O PAI
      // --------------------------------------
      if (onCreated) {
        onCreated(res.data); // res.data contém o produto criado
      }

      // limpar formulário
      setName("");
      setPrice("");
      setInStock(false);
      setCategory("");
    } catch (err) {
      console.error("Erro ao criar produto", err);

      if (err.response?.data) {
        setError(JSON.stringify(err.response.data));
      } else {
        setError("Erro inesperado ao criar produto.");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow mb-6 max-w-md space-y-4"
    >
      <input
        className="w-full border p-2 rounded"
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        className="w-full border p-2 rounded"
        type="number"
        placeholder="Preço"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />

      {/* SELECT DE CATEGORIA */}
      <select
        className="w-full border p-2 rounded"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">Selecione uma categoria</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* CHECKBOX ESTOQUE */}
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={inStock}
          onChange={(e) => setInStock(e.target.checked)}
        />
        <span>Em estoque</span>
      </label>

      {error && (
        <div className="bg-red-100 text-red-700 border border-red-300 p-2 rounded">
          {error}
        </div>
      )}

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Criar Produto
      </button>
    </form>
  );
}
