# README-CANDIDATO.md
## Como rodar o projeto
Existem duas formas de rodar o projeto, nativamente ou via Docker.

## Nativamente
### Como instalar dependências

#### Frontend
No terminal:
```
cd frontend
npm install
```

#### Backend
No terminal:
```
cd api
pip install -r requirements.txt
python manage.py migrate
```

### Como inicializar o projeto
Abra duas abas do terminal:
Em uma na pasta api:
```
python manage.py runserver
```
Na outra aba na pasta frontend:
```
npm run dev
```
## Via Docker
Basta rodar no terminal dentro da pasta raiz do projeto:
```
docker compose up --build
```

## Decisões de design

Meu design no código focou em dividir o frontend em pastas com funcionalidade no em cada uma delas e seus respectivos códigos, (O View Set facilitou o backend para mim, então atrito para fazer essa parte foi baixo):
 - Components
 - Services(código para interagir com a api feita com drf via axios)
 - Types
 - Utils(funções mais específicas, como formatar dinheiro)
 - Pages

### Maior(es) dificuldade(s)
- No frontend foi organizar em pastas diferentes de forma a deixar o software modificável para futuras features sem deixar o código mal feito/desorganizado. Para resolver isto usei como referência um outro projeto do que tenho no GitHub que tinha feito em React Native e usei um sistema de pastas similar.

### Faltou fazer
- Aplicar SEO(tags otimizadas para) no HTML / TSX
  Usaria como referência os projetos que tenho no GitHub para aplicar essa tags.
- Finalizar esse bônus: validação de erro: Se o backend recusar o produto (ex: preço negativo), o frontend deve mostrar um toast ou mensagem de erro vermelha, não apenas falhar silenciosamente.
  Iria procurar na documentação para implementar e caso surgisse erros, iria pedir ajuda das IAs.
- Revisar todo o código(incluindo Dockerfile(s))

