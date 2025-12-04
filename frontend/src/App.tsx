import { useEffect, useState } from 'react';
import { api, type Product } from './services/api';
import { Package, Plus, AlertCircle } from 'lucide-react';
import './App.css'; 

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  //Estados do Form
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [inStock, setInStock] = useState(true);

  // Busca produtos com suporte a paginação
  const fetchProducts = async () => {
    try {
      const response = await api.get('/products/');
      const data = response.data.results ? response.data.results : response.data;
      setProducts(data);
    } catch (err) {
      setError('Erro ao carregar produtos. Verifique se o backend está rodando.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/products/', {
        name: newName,
        price: parseFloat(newPrice),
        in_stock: inStock,
        category: 1 
      });
      
      setNewName('');
      setNewPrice('');
      setInStock(true);
      fetchProducts();
      alert('Produto criado com sucesso!');
    } catch (err) {
      alert('Erro ao criar produto.');
      console.error(err);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="content-wrapper">
        
        {/* HEADER */}
        <header className="header">
          <Package size={40} strokeWidth={2.5} />
          <h1 className="header-title">Inventory Dashboard</h1>
        </header>

        {/* FORMULÁRIO */}
        <div className="form-card">
          <h2 className="form-title">
            <Plus size={24} /> Novo Produto
          </h2>
          <form onSubmit={handleSubmit} className="form-layout">
            
            {/* Input Nome */}
            <div className="input-group flex-grow">
              <label className="text-sm font-medium text-gray-700">Nome do Produto</label>
              <input 
                type="text" 
                value={newName}
                onChange={e => setNewName(e.target.value)}
                className="input-field"
                placeholder="Ex: Cadeira Ergonômica"
                required 
              />
            </div>
            
            {/* Input Preço */}
            <div className="input-group price-group">
              <label className="text-sm font-medium text-gray-700">Preço (R$)</label>
              <input 
                type="number" 
                value={newPrice}
                onChange={e => setNewPrice(e.target.value)}
                className="input-field"
                placeholder="0.00"
                required 
                step="0.01"
              />
            </div>

            {/* Checkbox */}
            <div className="checkbox-container">
              <input 
                type="checkbox" 
                id="stock"
                checked={inStock}
                onChange={e => setInStock(e.target.checked)}
                className="checkbox-input"
              />
              <label htmlFor="stock" className="text-sm font-medium text-gray-700 cursor-pointer">
                Em Estoque
              </label>
            </div>

            {/* Botão */}
            <button type="submit" className="btn-submit">
              Adicionar
            </button>

          </form>
        </div>

        {/* ERRO */}
        {error && (
          <div className="error-msg">
            <AlertCircle size={20} /> {error}
          </div>
        )}
        
        {/* GRID DE PRODUTOS */}
        {loading ? 
        (
          <p>Carregando catálogo...</p>
        ) : 
        (
          <div className="product-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                
                <div className="card-header">
                  <h3 className="product-name">{product.name}</h3>
                  <span className={`stock-badge ${product.in_stock ? 'in-stock' : 'out-stock'}`}>
                    {product.in_stock ? 'Em Estoque' : 'Esgotado'}
                  </span>
                </div>
                
                <div className="card-footer">
                  <p className="product-price">
                    R$ {product.price}
                  </p>
                  
                  {product.category_name && (
                    <p className="product-category">{product.category_name}</p>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;