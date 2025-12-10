

---

# The Inventory Dashboard

Este projeto é uma aplicação simples para gerenciamento de produtos, usando Django no backend e React com Vite no frontend. Ele permite cadastrar, listar e remover produtos de forma rápida, funcionando tanto localmente quanto via Docker.

---

# Seção 1: Instruções para Rodar

## Variáveis de ambiente

O projeto funciona sem necessidade de variáveis externas.
O backend usa SQLite por padrão e já vem configurado.
O frontend acessa diretamente a URL `http://localhost:8000/api/`.

Em um ambiente de produção, seria ideal mover:

* `SECRET_KEY` (Django)
* `DEBUG`
* URL base da API (no frontend)

---

## Instalando dependências

### Backend (Django)

```bash
cd api
python -m venv venv
source venv/bin/activate   
pip install -r requirements.txt
```

### Frontend (React)

```bash
cd frontend
npm install
```

---

## Rodando o projeto

### Backend

```bash
cd api
python manage.py migrate
python manage.py runserver
```

A API fica acessível em:

```
http://localhost:8000/api/products/
```

### Frontend

```bash
cd frontend
npm run dev
```

O frontend fica em:

```
http://localhost:5173/
```

---

# Seção 2: Decisões de Design

## Maior dificuldade e como foi resolvida

Uma parte que deu trabalho foi integrar o backend com o frontend, principalmente na parte de configuração. No backend, principalmente, foi necessário estruturar o modelo de produtos, isso incluiu criar o modelo de categorias e ligar ao produto, mas de maneira opcional para não quebrar o funcionamento básico.

Também acabei adicionando pequenas validações (como não permitir preço negativo), além de deixar o serializer organizado para evitar erros no frontend.

No frontend, a maior preocupação foi garantir que o envio de dados fosse funcional, com um feedback rapido. Usei React com hooks, Axios para requisições e Toastify para mensagens, o que ajudou a simplificar bastante a lógica e agilizar o processo

No final, a maior dificuldade foi amarrar tudo, especialmente entre os componentes do Django e SQlite

---

## O que ficou faltando (por falta de tempo) e como seria feito

Algumas melhorias ficaram de fora por causa do tempo:

### No backend

* **Paginação**: API retorna tudo de uma vez. Não seria complicado adicionar rotas via DRF.
* **Autenticação**: não tem login. Se tivesse tempo, usaria JWT para cadastros de contas.
* **Testes**: o projeto não tem testes reais. Seriam criados testes de modelo, serializer e views.

### No frontend

* **Tela de categorias**: o backend suporta, mas não existe tela para isso.
* **Filtros e busca**: seria útil para listas maiores.

### Infraestrutura

* Configurar variáveis de ambiente reais.
* Melhorar o setup do Docker para ambiente de produção, com Nginx como proxy reverso.

---

# Seção 3: Como Rodar via Docker (Deploy / Bônus)

O projeto já vem com `Dockerfile` no backend e no frontend, além de um `docker-compose.yml` que sobe tudo.

Para iniciar tudo com Docker:

```bash
docker-compose up --build
```

Depois disso:

* Backend: [http://localhost:8000/api/products/](http://localhost:8000/api/products/)
* Frontend: [http://localhost:5173/](http://localhost:5173/)

Para rodar em segundo plano:

```bash
docker-compose up -d
```

Para parar:

```bash
docker-compose down
```

---

# Recomendações

Algumas coisas que podem ser melhoradas nas próximas versões:

* Mover tudo que é configuração sensível para variáveis de ambiente.
* Criar uma documentação da API (Swagger/Spectacular).
* Adicionar testes automatizados, pelo menos para o backend.
* Implementar filtros e paginação no frontend.
* Criar uma interface para cadastrar e listar categorias.
* Melhorar o layout geral e adicionar uma experiência de loading mais completa.
* Configurar CI/CD (GitHub Actions) para validar testes e build automaticamente.
