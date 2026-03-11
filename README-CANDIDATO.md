# THE INVENTORY DASHBOARD - Relatório de Candidato

Este projeto é uma solução full-stack para o desafio técnico "The Inventory Dashboard", utilizando Django no backend e React com TypeScript no frontend.

---

## SEÇÃO 1 - Instruções para rodar

### 🐳 Via Docker Compose (Recomendado)
A maneira mais simples de rodar o projeto completo:
```bash
docker-compose up --build
```
- **Backend:** http://localhost:8000
- **Frontend:** http://localhost:5173

### 🛠️ Rodando Manualmente (Sem Docker)

#### 1. Prepara o Backend (Terminal 1)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # No Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

#### 2. Prepara o Frontend (Terminal 2)
```bash
cd frontend
npm install
npm run dev
```

---

## SEÇÃO 2 - Decisões de Design

### Estrutura de Pastas
A estrutura foi organizada seguindo padrões de separação de responsabilidades:
- `backend/core/`: Configurações centrais do Django (settings, urls, wsgi).
- `backend/products/`: App modular para gerenciamento de produtos.
- `frontend/src/services/`: Camada de abstração para chamadas API via Axios.
- `frontend/src/hooks/`: Lógica de estado e efeitos centralizada em hooks customizados (`useProducts`).
- `frontend/src/components/`: Componentes UI atômicos e reutilizáveis.

### Centralização de Estado com Custom Hook
O hook `useProducts.ts` centraliza toda a lógica de:
- Busca de dados (fetch).
- CRUD (create, delete, update).
- Gerenciamento de loading, erros e notificações (toasts).
Isso mantém os componentes (`App.tsx`, `ProductForm.tsx`) focados apenas em renderização (View), facilitando a manutenção e testes.

### Tratamento de Erros
Implementado em múltiplas camadas:
1. **Backend:** Validação no `serializers.py` do DRF, garantindo que preços negativos retornem HTTP 400.
2. **Frontend:** O `useProducts` captura as respostas de erro do Axios e extrai mensagens amigáveis para exibir no componente `Toast`.

### O que seria feito com mais tempo?
- **Paginação e Filtros:** Implementar busca por nome e filtro por status de estoque no backend.
- **Autenticação:** Adicionar JWT para proteger rotas da API.
- **Testes:** Cobertura de testes unitários com Pytest (backend) e Vitest/Testing Library (frontend).
- **CI/CD:** Pipeline automatizada para linting e deploy.

---

## SEÇÃO 3 - Link para Deploy
infelizmente não consegui fazer o deploy, mas vou deixar o link do github.
https://github.com/AdrielLuniere/the-inventory-dashboard
pois ja estou com dois projetos em andamento, 
Frontend: Vercel (é imbatível para React).
Backend: Railway.
por isso que ainda nao fiz o deploy, mas assim que liberar, eu irei colocamos no ar.

---

## SEÇÃO FINAL - Recomendações
Para este desafio, a stack escolhida (Django + React 19 + Tailwind v4) oferece um excelente balanço entre produtividade e performance. Sugiro adicionar um endpoint de "Dashboard Stats" (ex: total de itens, valor total em estoque) para enriquecer a experiência visual.
OBS: É, demorei 4 meses pra fazer isso, não consegui terminar a tempo, sei que fui desclassificado, mas não desisti, espero que gostem.

---
**Candidato:** Adriel Luniere
**Data:** Março 2026
