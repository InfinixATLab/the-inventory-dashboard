
# The Inventory Dashboard

Aplicação completa para gestão de produtos, composta por uma API em Django/DRF e um frontend em React + TypeScript. O projeto permite criar, listar e remover produtos, exibindo informações básicas como nome, preço e disponibilidade em estoque.

## Tecnologias Utilizadas

**Backend**

* Python 3.11
* Django 5
* Django REST Framework
* django-cors-headers
* SQLite
* Gunicorn (produção)

**Frontend**

* React 19
* TypeScript
* Vite
* TailwindCSS
* Axios
* React Toastify

**Infraestrutura**

* Docker e Docker Compose
* Nginx (servidor do frontend)

---

## Como rodar o projeto

### 1. Executando com Docker (recomendado)

Requisitos:

* Docker
* Docker Compose

Passos:

```bash
docker-compose up --build
```

Serviços disponíveis:

* Backend Django: [http://localhost:8000/api/products/](http://localhost:8000/api/products/)
* Frontend React: [http://localhost:5173/](http://localhost:5173/)

As migrações são executadas automaticamente na inicialização.

---

### 2. Execução manual (sem Docker)

#### Backend

```bash
cd api
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

A API ficará disponível em:

```
http://localhost:8000/api/products/
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend disponível em:

```
http://localhost:5173/
```

---

## Funcionalidades

### Backend

* CRUD completo de produtos via ViewSet
* Modelo de **Product** com:

  * name
  * price
  * in_stock
  * category (opcional)
* Serializers com validação (ex.: preço não pode ser negativo)
* CORS liberado para desenvolvimento
* Endpoints gerados automaticamente pelo router do DRF

### Frontend

* Formulário para criação de produtos
* Listagem em cards responsivos
* Atualização automática após criação
* Exclusão com confirmação
* Feedback visual com Toastify
* Layout com TailwindCSS

---

## Decisões de Design

* O backend foi separado no app `products` para facilitar manutenção e escalabilidade.
* O modelo inclui `category` para permitir expansão futura, embora a criação de categorias não esteja implementada no frontend.
* A opção por React + Vite garante desenvolvimento rápido, HMR eficiente e build otimizado.
* Para simplicidade, o frontend usa Axios configurado com uma instância base e React Toastify para mensagens de feedback.
* O projeto adota organização clara de componentes e estilos com TailwindCSS, evitando dependência de bibliotecas adicionais de UI.

---

## Possíveis Melhorias

* Criar uma seção de gerenciamento de categorias no frontend.
* Implementar paginação no backend para listas maiores.
* Implementar testes automatizados tanto no Django quanto no React.
* Adicionar autenticação JWT para controlar acesso.
* Criar ambientes de staging e produção no Docker com variáveis configuráveis.

---

## Deploy

O projeto já possui `Dockerfile` no backend e no frontend, e um `docker-compose.yml` capaz de subir todo o ambiente. Para deploy em produção, basta adaptar o compose para uso de volumes, HTTPS e rede externa.

---

## Considerações Finais

O projeto apresenta uma arquitetura simples e bem organizada, capaz de servir tanto como prova técnica quanto como base para um sistema real de inventário. O fluxo de criação, listagem e remoção está funcionando de ponta a ponta, e a separação entre backend e frontend permite evolução independente das camadas.
