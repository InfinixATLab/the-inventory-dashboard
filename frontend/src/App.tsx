import React, { useEffect, useState } from 'react';
import { api, type Product, type Category } from './services/api';
import { Package, Plus, AlertCircle, LayoutGrid, Tags, Trash2 } from 'lucide-react';
import './App.css';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Form prduto
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [inStock, setInStock] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Form Categira
  const [showCatForm, setShowCatForm] = useState(false);
  const [newCatName, setNewCatName] = useState('');

  const fetchData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        api.get('/products/'),
        api.get('/categories/')
      ]);

      const prodData = prodRes.data.results ? prodRes.data.results : prodRes.data;
      const catData = catRes.data.results ? catRes.data.results : catRes.data;

      setProducts(prodData);
      setCategories(catData);
      
      if (catData.length > 0 && !selectedCategory) {
        setSelectedCategory(catData[0].id.toString());
      }
    } catch (err) {
      setError('Erro ao carregar dados do sistema.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCategory) {
      alert('Selecione uma categoria.');
      return;
    }

    const priceValue = parseFloat(newPrice);

    if (priceValue < 0) {
      alert('O preço não pode ser negativo!');
      return;
    }

    try {
      await api.post('/products/', {
        name: newName,
        price: priceValue, 
        in_stock: inStock,
        category: parseInt(selectedCategory)
      });
      
      setNewName('');
      setNewPrice('');
      fetchData(); 
      alert('Produto criado com sucesso!');
    } catch (err) {
      alert('Erro ao criar produto.');
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/categories/', { name: newCatName });
      setNewCatName('');
      setShowCatForm(false);
      fetchData(); 
      alert('Categoria criada!');
    } catch (err) {
      alert('Erro ao criar categoria.');
    }
  };

  const handleDeleteProduct = async (id: number) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir este produto?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/products/${id}/`);
      setProducts(current => current.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
      alert('Erro ao excluir o produto.');
    }
  };

  return (
    <div className="dashboard-container">

      <nav className="navbar">
        <div className="navbar-content">
          <div className="brand">
            <div className="brand-icon">
              <Package size={28} color="white" />
            </div>
            <span className="brand-name">Inventory Dashboard</span>
          </div>
        </div>
      </nav>

      <div className="content-wrapper">
        
        <header className="page-header">
          <button 
            className="btn-secondary"
            onClick={() => setShowCatForm(!showCatForm)}
          >
            <Tags size={18} /> 
            {showCatForm ? 'Fechar Categoria' : 'Nova Categoria'}
          </button>
        </header>

        {showCatForm && (
          <div className="category-form-card fade-in">
            <h3 className="cat-form-title">Nova Categoria</h3>
            <form onSubmit={handleCreateCategory} className="cat-form-layout">
              <input 
                type="text" 
                value={newCatName}
                onChange={e => setNewCatName(e.target.value)}
                className="input-field"
                placeholder="Ex: Eletrônicos..."
                required 
                autoFocus
              />
              <button type="submit" className="btn-submit small">Salvar</button>
            </form>
          </div>
        )}

        {error && <div className="error-banner"><AlertCircle size={20} /> {error}</div>}

        <div className="main-form-card">
          <h2 className="form-section-title"><Plus size={20} /> Novo Produto</h2>
          
          <form onSubmit={handleCreateProduct} className="form-layout">
            <div className="input-group flex-grow">
              <label>Nome</label>
              <input 
                type="text" 
                value={newName}
                onChange={e => setNewName(e.target.value)}
                className="input-field"
                required 
              />
            </div>
            
            <div className="input-group price-group">
              <label>Preço (R$)</label>
              <input 
                type="number" 
                value={newPrice}
                onChange={e => setNewPrice(e.target.value)}
                className="input-field"
                step="0.01"
                required 
              />
            </div>

            <div className="input-group category-group">
              <label>Categoria</label>
              <select 
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="input-field select-field"
                required
              >
                <option value="" disabled>Selecione...</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="checkbox-container">
              <input 
                type="checkbox" 
                id="stock"
                checked={inStock}
                onChange={e => setInStock(e.target.checked)}
                className="checkbox-input"
              />
              <label htmlFor="stock">Em Estoque</label>
            </div>

            <button type="submit" className="btn-submit">Cadastrar</button>
          </form>
        </div>

        {/* GRID DE PRODUTOS */}
        <div className="list-header">
          <h2 className="list-title"><LayoutGrid size={20} /> Catálogo ({products.length})</h2>
        </div>

        {loading ? (
          <div className="loading-state">Carregando dados...</div>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                
                <div className="card-header">
                  <h3 className="product-name" title={product.name}>{product.name}</h3>
                  
                  <div className="header-actions">
                    <span className={`stock-badge ${product.in_stock ? 'in-stock' : 'out-stock'}`}>
                      {product.in_stock ? 'Em Estoque' : 'Esgotado'}
                    </span>
                    
                    <button 
                      onClick={() => handleDeleteProduct(product.id)}
                      className="btn-icon-delete"
                      title="Excluir produto"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                
                <div className="card-footer">
                  <p className="product-price">R$ {product.price}</p>
                  <p className="product-category">
                    {product.category_name || 'Geral'}
                  </p>
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