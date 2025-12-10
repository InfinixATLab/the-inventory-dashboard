// frontend/src/App.tsx
import { useEffect, useState } from "react";
import { api } from "./api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

type Product = {
  id: number;
  name: string;
  price: number;
  in_stock: boolean;
};

type ApiError = {
  [key: string]: string[] | string;
};

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [inStock, setInStock] = useState(true);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  /* ------------------------------------------ */
  /* CARREGAR PRODUTOS                          */
  /* ------------------------------------------ */
  async function loadProducts() {
    setLoading(true);
    setError("");

    try {
      const res = await api.get<Product[]>("products/");
      setProducts(res.data);
    } catch {
      setError("Erro ao carregar produtos");
      toast.error("Erro ao carregar produtos");
    } finally {
      setLoading(false);
    }
  }

  /* CRIAR PRODUTO */
  async function createProduct(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      toast.error("Nome é obrigatório");
      return;
    }

    const parsed = parseFloat(price);
    if (isNaN(parsed) || parsed < 0) {
      toast.error("Preço inválido");
      return;
    }

    setSaving(true);

    try {
      const payload = { name: name.trim(), price: parsed, in_stock: inStock };
      const res = await api.post<Product>("products/", payload);

      setProducts((prev) => [res.data, ...prev]);
      setName("");
      setPrice("");
      setInStock(true);

      toast.success("Produto criado");
    } catch (err: unknown) {
      let message = "Erro ao criar produto";

      if (
        typeof err === "object" &&
        err !== null &&
        "response" in err &&
        typeof (err as any).response?.data === "object"
      ) {
        const data = (err as any).response.data as ApiError;
        const firstKey = Object.keys(data)[0];

        if (firstKey) {
          const field = data[firstKey];
          message = Array.isArray(field) ? field[0] : field;
        }
      }

      toast.error(message);
      setError(message);
    } finally {
      setSaving(false);
    }
  }

  /* REMOVER PRODUTO*/  
  async function deleteProduct(id: number) {
    const ok = window.confirm("Deseja realmente apagar este produto?");
    if (!ok) return;

    try {
      await api.delete(`products/${id}/`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Produto removido");
    } catch {
      toast.error("Erro ao remover produto");
    }
  }

  /* ------------------------------------------ */
  /* INICIAR CARREGAMENTO                       */
  /* ------------------------------------------ */
  useEffect(() => {
    loadProducts();
  }, []);

  /* ------------------------------------------ */
  /* RENDER                                     */
  /* ------------------------------------------ */
  return (
    <div className="app-root">
      <ToastContainer position="top-right" />

      {/* HEADER */}
      <header className="header">
        <div className="header-inner">
          <h1>Inventory Dashboard</h1>
          <p className="subtitle">
            Gerencie produtos rapidamente — crie, liste e remova.
          </p>
        </div>
      </header>

      {/* MAIN */}
      <main className="container">

        {/* FORM */}
        <section className="panel form-panel">
          <form onSubmit={createProduct} className="form-grid">
            <div className="field">
              <label className="label">Nome</label>
              <input
                required
                placeholder="Nome do produto"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
              />
            </div>

            <div className="field">
              <label className="label">Preço (R$)</label>
              <input
                required
                placeholder="0.00"
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="input"
              />
            </div>

            <div className="field">
              <label className="label">Estoque</label>
              <div className="checkbox-wrap">
                <input
                  id="inStock"
                  type="checkbox"
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                  className="checkbox"
                />
                <label htmlFor="inStock" className="checkbox-label">
                  Disponível
                </label>
              </div>
            </div>

            <div className="actions">
              <button
                type="submit"
                disabled={saving}
                className={`btn btn-primary ${saving ? "btn-disabled" : ""}`}
              >
                {saving ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </form>
        </section>

        {/* TOOLBAR */}
        <section className="panel toolbar">
          <div className="toolbar-left">
            <button className="btn btn-ghost" onClick={loadProducts}>
              Atualizar
            </button>
            {loading && <span className="muted">Carregando...</span>}
          </div>

          {error && <div className="error">{error}</div>}
        </section>

        {/* LISTA DE PRODUTOS */}
        <section className="panel grid-panel" aria-live="polite">
          {products.length === 0 && !loading ? (
            <div className="empty">Nenhum produto cadastrado.</div>
          ) : (
            <div className="cards-grid">
              {products.map((p) => (
                <article key={p.id} className="product-card">
                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="delete-btn"
                    aria-label={`Remover ${p.name}`}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10">
                      <path
                        d="M1 1 L9 9 M9 1 L1 9"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>

                  <div className="card-head">
                    <h3 className="product-name">{p.name}</h3>
                    <span
                      className={`badge ${p.in_stock ? "in" : "out"}`}
                    >
                      {p.in_stock ? "Em estoque" : "Fora de estoque"}
                    </span>
                  </div>

                  <div className="card-body">
                    <span className="price">
                      R$ {Number(p.price).toFixed(2)}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container-small">
          <small>
            Projeto de avaliação — back-end: Django/DRF • front-end: React +
            Tailwind
          </small>
        </div>
      </footer>
    </div>
  );
}
