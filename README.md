# THE INVENTORY DASHBOARD

#### Seção 1: Instruções para rodar
Não são necessárias variáveis de ambiente para a execução local.

**Opção 1: Rodando Localmente (Sem Docker)**

1.  **Instalar Dependências:**
    *   **Backend (API):** Navegue até a pasta `api` e instale as dependências Python.
        ```bash
        cd api
        pip install -r requirements.txt
        ```
    *   **Frontend:** Navegue até a pasta `frontend` e instale as dependências Node.js.
        ```bash
        cd frontend
        npm install
        ```

2.  **Rodar o Projeto:**
    *   **Backend (API):** Na pasta `api`, aplique as migrações e inicie o servidor Django.
        ```bash
        # Dentro da pasta /api
        python manage.py migrate
        python manage.py runserver
        ```
        O backend estará disponível em `http://localhost:8000`. Mantenha esse terminal aberto.

    *   **Frontend:** Abra um novo terminal, vá para a pasta `frontend` e inicie o servidor de desenvolvimento Vite.
        ```bash
        # Dentro da pasta /frontend
        npm run dev
        ```
        O frontend estará disponível em `http://localhost:5173`.

#### Seção 2: Decisões de design
*   **Qual foi a maior dificuldade que você encontrou e como superou?**
    A principal dificuldade foi a integração full-stack para a funcionalidade de "Categorias", especialmente por ser um primeiro contato mais aprofundado com Django/DRF. Superei isso dividindo o problema: primeiro, foquei em criar o endpoint da API no backend para expor as categorias. Em seguida, no frontend, implementei a chamada a essa API com `useEffect` para buscar os dados e popular dinamicamente o campo de seleção no formulário, garantindo a comunicação correta entre as duas partes da aplicação.

*   **O que você não teve tempo de fazer e como você faria se tivesse mais tempo?**
    Dado o tempo, foquei no fluxo principal de criação e listagem. Com mais tempo, eu implementaria:
    1. **Deploy:**  Não deu tempo de fazer o deploy, comecei a fazer o backend pelo render, mas acabou não dando tempo.
    2.  **Edição e Exclusão de Produtos:** Adicionaria botões de "Editar" e "Excluir" em cada card de produto, criando os respectivos modais/páginas e endpoints na API para as operações de `UPDATE` e `DELETE`.
    3.  **Validação de Formulário Avançada:** Substituiria a validação manual por uma biblioteca como `Zod` ou `React Hook Form` para fornecer feedback de erro por campo e regras mais complexas (ex: preço mínimo).
    4.  **Feedback ao Usuário (Toasts):** Integraria uma biblioteca como `react-toastify` para exibir notificações de sucesso ou erro de forma mais elegante após o envio do formulário, em vez de apenas texto estático.
    4.  **Paginação:** Na listagem de produtos, implementaria a paginação no backend (usando a paginação do Django REST Framework) e no frontend para lidar com grandes volumes de dados de forma eficiente.

#### Seção 3: Link para Deploy (Bônus)
O projeto está totalmente containerizado com Docker, facilitando a execução em qualquer ambiente.

**Opção 2: Rodando com Docker**

1.  **Pré-requisito:** Ter o Docker e o Docker Compose instalados.

2.  **Rodar com Docker Compose:** No terminal, na raiz do projeto, execute o comando:
    ```bash
    docker-compose up --build
    ```
    O Docker irá construir as imagens e iniciar os contêineres. O frontend estará acessível em `http://localhost:5173` e o backend em `http://localhost:8000`.

#### Seção final: Recomendações
Este é um excelente desafio para avaliar habilidades full-stack em um contexto prático. Algumas sugestões para futuras versões:

*   **Testes:** Incluir um requisito para a escrita de testes unitários (ex: para um helper de formatação no frontend ou para um `serializer` no backend) e/ou testes de integração (ex: testar a criação de um produto via API) para avaliar a qualidade e a robustez do código.
*   **Complexidade do Modelo:** Adicionar um relacionamento `ManyToMany` (ex: `Tags`) ao modelo `Product` para testar o conhecimento do candidato em cenários de dados mais complexos.
*   **Clareza nos Requisitos:** Para funcionalidades que envolvem relacionamentos entre dados (como Produtos e Categorias), seria útil detalhar um pouco mais os endpoints de API esperados ou fornecer um mini-diagrama do modelo de dados. Isso ajudaria a alinhar as expectativas sobre a implementação.
