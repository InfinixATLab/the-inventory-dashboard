# **Inventory Dashboard — Desafio Técnico**

Aplicação completa para cadastro, edição, exclusão e listagem de produtos.  
Stack utilizada:

- **Django + Django REST Framework**  
- **SQLite**  
- **React + TypeScript**  
- **Axios**  
- **TailwindCSS**  
- **React Hot Toast**  

---

# **1. Instruções para rodar o projeto**

## **Requisitos**

### 🔧 **Backend (Django + DRF)**

- Python 3.10+  
- Pip  
- Virtualenv VENV (recomendado)  

### 🔧 **React + TypeScript + vite**

- Node V.20+ (22+ recomendado)  
- npm  

---

### **Passo a passo (Utilizando Docker)**

**1.** Clone o Repositório e caminhe até o diretório do projeto:

```
    git clone <Link do repositório>
        #ou
    git clone -b <nome da branch> <Link do repositorio> # caso os arquivos sejam da branch errada
    
    cd <Pasta do projeto>
```

**2.** Dentro do diretório clonado rode o seguinte comando do docker:

-   Abra um terminal e execute:



```
    docker-compose up --build

```

-   As aplicações deverão rodar nas seguintes portas:

```
    http://localhost:8000/   # BackEnd Python
    http://localhost:5173/   # FrontEnd React

```

### **Passo a passo (Sem uso de Docker)**

**1.** Clone o Repositório e caminhe até o diretório do projeto:



```
    git clone <Link do repositório>
    cd <Pasta do projeto>

```

**2.** Instale as Dependências necessárias para o projeto funcionar

#### Dependências do FrontEnd (React):

-   Abra um terminal e caminhe até o seguinte diretório:



```
    cd frontend   # Caminhe até o diretório
    npm install   # Instale as dependências

```

#### Dependências do BackEnd (Python + Django + DRF):

-   Abra outro terminal e caminhe até o seguinte diretório:



```
    cd api   # Caminhe até o diretório
    python -m venv venv   # Crie um ambiente virtual VENV
        
    ./env/Scripts/activate  # Ative o ambiente virtual
    #ou 
    sorce /env/Scripts/activate

```

-   Após a criação do ambiente virtual instale as requirements.txt:


```
    pip install -r requirements.txt

```

**3.** Rode as aplicações separadamente

### FrontEnd

-   Com o terminal do frontend utilize o seguinte comando:



```
    npm run dev

```

-   A aplicação deverá rodar na seguinte porta:



```
    http://localhost:5173/

```

### BackEnd

-   No terminal do backend rode o comando para iniciar a aplicação:



```
    # Certifique-se que esta no diretorio primeiro do back end "/api" não acesse a segunda pasta /api
    python manage.py runserver   # Utilize este comando para iniciar a aplicação

```

-   O backend deverá rodar na seguinte porta:



```
    http://localhost:8000/

```

**4.** Acesse o FrontEnd

-   Após todos os passos anteriores acesse o frontend para utilizar a aplicação:



```
    http://localhost:5173/

```

### **Variáveis de ambiente**

Nenhuma variável especial é necessária.

**Dificuldades enfrentadas e como foram resolvidas**
====================================================

### 🔸 **1\. Comunicação entre modal e o componente principal**

Resolvi isso passando callbacks (`onClose`, `onSaved`) para garantir que o estado do pai seja atualizado sempre que o formulário é enviado.

### 🔸 **2\. Validação do formulário**

Para evitar estados inválidos (como preço negativo ou campos vazios), optei por validar diretamente no submit e exibir erros com Toasts.

**O que não deu pra fazer**
===========================

-   Implementar **validações customizadas no backend** (ex: impedir preço negativo).

Se tivesse mais tempo, eu:

-   Criaria `/api/v1/...` com versionamento.

-   Adicionaria filtro por categoria e busca.

**Deploy**
==========

No momento, o projeto roda apenas localmente. Via docker ou terminais separados.

