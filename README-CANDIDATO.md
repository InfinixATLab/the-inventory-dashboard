# 📄 README-CANDIDATO

  

## Instruções para Rodar

#### **Variáveis de ambiente necessárias**

O projeto não necessita de variáveis de ambiente adicionais.  
O backend utiliza SQLite como banco padrão e não exige configuração extra.

#### **Instalar dependências**

  #### **Backend (Django + DRF)**
  1.  Abra um novo terminal na pasta do projeto
  2. 
```
cd api
pip install django djangorestframework
pip install django-cors-headers
```

  #### **Rodar Backend**
  1. 
```
python manage.py migrate
python manage.py runserver

```


  #### **Rodar Frontend**
  1. ```cd frontend npm install```

#### **Frontend (React + Vite + Tailwind + TypeScript)**
  1.  Abra um novo terminal na pasta do projeto
  2. ```npm run dev```

## Decisões de Design

  

#### **Estrutura de pastas escolhida**

Optei por manter uma arquitetura clara e separada entre frontend e backend, seguindo o padrão do projeto base entregue:

  
project/
├── api/
│   ├── api/            # Apps Django (products, categories, etc)
│   ├── core/           # Configurações gerais do backend
│   ├── db.sqlite3      # Banco de dados local
│   └── manage.py
│
└── frontend/
    ├── src/
    │   ├── components/   # Formulários, Cards de produto, etc
    │   ├── pages/        # Página principal (CRUD de produtos)
    │   ├── services/     # Axios centralizado para a API
    │   ├── interfaces/   # Tipagens TypeScript
    │   └── styles/       # Configuração de Tailwind
    └── index.html

  
Essa organização facilita:
- facilita localização rápida dos arquivos
- Independência entre frontend e backend
- Clareza na manutenção
  

#### **Maior dificuldade e como foi superada**

  Minha maior dificuldade foi **não apenas entender a lógica de programação**, mas principalmente **como aplicar TypeScript e trabalhar com React**, por não conhecer o framework previamente.  
No backend, eu conhecia somente o básico de Python, o que tornou o início um pouco mais desafiador.

Superei isso utilizando **IA como apoio**, entendendo a lógica necessária e aprendendo a estruturar melhor os prompts para direcionar as soluções, resolvendo bugs e garantindo que o fluxo do sistema seguisse o objetivo solicitado.  
Com isso, consegui evoluir rapidamente ao longo do desafio.

#### **O que não deu tempo de fazer**

Por ainda não dominar Docker, optei por não criar um **script docker-compose** para subir backend, banco e frontend com um único comando.

Preferi ser conservador para não comprometer o funcionamento geral do sistema.
 

## Recomendações

Nenhuma recomendação adicional.  
Eu já tinha consciência de que seria um desafio lidar com tecnologias que ainda não domino completamente, mas isso me motivou bastante.  
O desafio foi muito interessante e aumentou minha vontade de continuar estudando e elevando meu nível de conhecimento.

  

## Considerações finais:

Gostei muito de realizar este desafio.  
Espero que o resultado tenha sido animador e que eu possa ter a oportunidade de contribuir com a equipe caso seja selecionado.

Agradeço a oportunidade e reafirmo que o desafio foi motivador, educativo e muito bem estruturado.