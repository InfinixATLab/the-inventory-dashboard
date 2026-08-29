import { useState } from 'react';
import api from '../services/api';
import type { Category } from '../types/Product';

interface CategoryManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onCategoryCreated: (newCat: Category) => void;
  onCategoryUpdated: (updatedCat: Category) => void;
  onCategoryDeleted: (deletedId: number) => void;
}

export const CategoryManagerModal: React.FC<CategoryManagerModalProps> = ({
  isOpen,
  onClose,
  categories,
  onCategoryCreated,
  onCategoryUpdated,
  onCategoryDeleted,
}) => {
  const [newCatName, setNewCatName] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState('');
  const [loadingAction, setLoadingAction] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const showNotification = (msg: string, isError = false) => {
    if (isError) {
      setError(msg);
      setTimeout(() => setError(null), 3000);
    } else {
      setSuccess(msg);
      setTimeout(() => setSuccess(null), 2500);
    }
  };

  // Criar categoria
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    setLoadingAction(true);
    setError(null);
    try {
      const response = await api.post<Category>('categories/', {
        name: newCatName.trim(),
      });
      onCategoryCreated(response.data);
      setNewCatName('');
      showNotification('Categoria criada com sucesso!');
    } catch (err: unknown) {
      console.error(err);
      showNotification('Falha ao criar categoria. Verifique se o nome já existe.', true);
    } finally {
      setLoadingAction(false);
    }
  };

  // Iniciar edição
  const startEditing = (cat: Category) => {
    setEditingId(cat.id);
    setEditingName(cat.name);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingName('');
  };

  // Salvar edição
  const handleUpdate = async (id: number) => {
    if (!editingName.trim()) return;

    setLoadingAction(true);
    try {
      const response = await api.put<Category>(`categories/${id}/`, {
        name: editingName.trim(),
      });
      onCategoryUpdated(response.data);
      setEditingId(null);
      setEditingName('');
      showNotification('Categoria atualizada com sucesso!');
    } catch (err: unknown) {
      console.error(err);
      showNotification('Falha ao atualizar categoria.', true);
    } finally {
      setLoadingAction(false);
    }
  };

  // Excluir categoria
  const handleDelete = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja excluir esta categoria? Os produtos associados podem ser afetados.')) {
      return;
    }

    setLoadingAction(true);
    try {
      await api.delete(`categories/${id}/`);
      onCategoryDeleted(id);
      showNotification('Categoria removida.');
    } catch (err: unknown) {
      console.error(err);
      showNotification('Falha ao excluir categoria.', true);
    } finally {
      setLoadingAction(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800/80 bg-gradient-to-r from-slate-900 to-slate-800/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-purple-500/20 font-bold">
              🏷️
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">Gerenciar Categorias</h3>
              <p className="text-xs text-slate-400">Crie, edite ou remova categorias do inventário</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Feedback messages */}
        {error && (
          <div className="mx-5 mt-4 p-3 bg-rose-950/60 border border-rose-800/80 rounded-xl text-rose-300 text-xs flex items-center gap-2">
            <svg className="w-4 h-4 text-rose-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="mx-5 mt-4 p-3 bg-emerald-950/60 border border-emerald-800/80 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{success}</span>
          </div>
        )}

        {/* Form para Adicionar Nova Categoria */}
        <form onSubmit={handleCreate} className="p-5 border-b border-slate-800/60 flex gap-2.5">
          <input
            type="text"
            placeholder="Nome da nova categoria..."
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            disabled={loadingAction}
            className="flex-1 px-4 py-2.5 bg-slate-800/60 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 transition-all"
          />
          <button
            type="submit"
            disabled={loadingAction || !newCatName.trim()}
            className="px-4 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl shadow-md shadow-purple-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Criar</span>
          </button>
        </form>

        {/* Listagem de Categorias */}
        <div className="flex-1 overflow-y-auto p-5 space-y-2.5">
          {categories.length === 0 ? (
            <p className="text-center py-6 text-xs text-slate-500 font-medium">
              Nenhuma categoria cadastrada até o momento.
            </p>
          ) : (
            categories.map((cat) => (
              <div
                key={cat.id}
                className="flex items-center justify-between p-3.5 bg-slate-800/40 hover:bg-slate-800/70 border border-slate-800 rounded-xl transition-all group"
              >
                {editingId === cat.id ? (
                  <div className="flex-1 flex items-center gap-2 mr-2">
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className="flex-1 px-3 py-1.5 bg-slate-800 border border-purple-500 rounded-lg text-sm text-white focus:outline-none"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => handleUpdate(cat.id)}
                      disabled={loadingAction || !editingName.trim()}
                      className="p-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs"
                      title="Salvar"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={cancelEditing}
                      className="p-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-xs"
                      title="Cancelar"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    <span className="text-sm font-semibold text-slate-200">{cat.name}</span>
                  </div>
                )}

                {editingId !== cat.id && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => startEditing(cat)}
                      title="Editar nome"
                      className="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-indigo-950/40 rounded-lg transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      title="Excluir categoria"
                      className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/40 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-sm font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-all"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};

export default CategoryManagerModal;
