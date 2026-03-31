
## Seção 1: Instruções para Rodar

### Opção A:

Esta opção sobe o Backend (Porta 8000) e o Frontend (Porta 5173) simultaneamente com um único comando, sem necessidade de instalar Python ou Node.js localmente.


1.  Na raiz do projeto, execute:
    ```bash
    docker-compose up -d --build
    ```
2.  Aguarde o build terminar.
3.  **Acesse:**
      - 🖥️ **Frontend (Aplicação):** http://localhost:5173
      - 📘 **Backend (Swagger Docs):** http://localhost:8000/api/docs/

---

## Seção 2: Decisões de Design e Arquitetura

### 1\. Backend: API Robusta e Documentada

  - **Ambíguidade Resolvida:** O desafio pedia campos simples para o Produto, mas exigia que o serializer exibisse o *"nome da categoria"*. Para atender a isso corretamente, criei um modelo dedicado `Category` e um relacionamento `ForeignKey`.
  - **Serializer:** Implementei uma lógica onde o produto aceita o `category_id` na escrita, mas retorna o `category_name` na leitura.
  - **Paginação:** Ativei `PageNumberPagination` globalmente no DRF. Isso previne problemas de performance caso o catálogo cresça.
  - **Swagger:** Integrei o `drf-spectacular` para gerar documentação interativa automática, facilitando o teste dos endpoints sem depender de Postman.

### 2\. Frontend: Clean Code e Separação de Responsabilidades

  - **TypeScript:** Utilizei interfaces estritas (`Product`, `Category`) para garantir a integridade dos dados trafegados.
  - **Serviços:** Isolei a lógica do Axios em `services/api.ts`, centralizando a configuração de URL base e Headers.

-----

## Seção 3: Link para Deploy 

O projeto está totalmente configurado para deploy via **Docker**.

O arquivo `docker-compose.yml` na raiz orquestra os dois serviços. Para um deploy em produção (ex: Render, AWS), basta apontar para o repositório e utilizar o `Dockerfile` de cada serviço (`Dockerfile.backend` e `Dockerfile.frontend`).

**Para avaliação imediata, utilize o comando:**
`docker-compose up -d`


---
## Seção Final: Recomendações e Melhorias

Estas seriam as evoluções prioritárias para elevar o nível do projeto:

1.  **Separação de Responsabilidades:**
    Atualmente a lógica reside no `App.tsx`. Para escalar, eu seria necessário refatorar em componentes menores

2.  **Testes de Backend:** 
    Implementaria o suite de testes para os endpoints do backend.

4.  **Filtros e Busca (Backend):**
    Implementaria o `django-filter` para permitir filtragem dinâmica na URL e busca textual para encontrar produtos por nome ou descrição.