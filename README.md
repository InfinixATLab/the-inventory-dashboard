* IMPORTANTE: Não inicie este desafio sem autorização. O desafio só poderá ser iniciado no dia e horário agendado. Entre em contato via email ou whatsapp:
  - administrativo@infinixassessoria.com.br
  - (21) 99515-2411

# THE INVENTORY DASHBOARD

## Sobre
**Stack**: Python + Django + DRF + SQlite + React + TailwindCSS + Axios + TypeScript
**Escopo**: Site completo para criação e listagem de produtos.

## Requisitos Essenciais (Timebox 4h)

#### Backend

1. Configuração Inicial: Crie um app **products**, e defina o modelo Product com os campos:
    - name: CharField
    - price: Float (2 decimal fields)
    - in_stock (boolean)
2. Configure **CORS**. O backend deve aceitar requisições do localhost.
3. API (DRF):
    - Defina *serializers* para *Product*.
    - O serializador de *Product* deve exibir o nome da categoria, não apenas seu ID.
    - Use **ViewSets** para fornercer funcionalidade CRUD completa para *Product*.
    - Configure urls.

#### Frontend
1. Listagem: Ao carregar a página, buscar os pordutos e exibí-los em cards simples (Nome, Preço e um "badge" verde/vermelho para estoque).
2. Criação: Um formulário simples acima da lista com inputs para Nome, Preço e um Checkbox para Estoque.
3. Atualização (Tela de Criação): Ao salvar o produto com sucesso, a lista deve ser atualizada ( seja via novo fetch ou adicionando ao estado local).

#### Git
O desafio exige que *ambos* os servidores rodem simultaneamente. O FICHA-CANDIDATO.md deve explicar como rodar o projeto. (Ex: "Abra dois terminais...").

#### Bônus (Desejáveis):
    - Docker Compose: Um arquivo docker-compose.yml que sobe o banco, o back e o front com um comando.
    - Validação de Erro: Se o backend recusar o produto (ex: preço negativo), o frontend deve mostrar um toast ou mensagem de erro vermelha, não apenas falhar silenciosamente.

# Rubrica de Avaliação

| Dimensão Avaliada                        | Peso  | Pontuação (1-5) | Descrição da Avaliação (O que procurar)                                                                                                                                                                                                 |
|------------------------------------------|-------|-----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **1. Funcionalidade (Requisitos Essenciais)** | 40%  | [1-5]           | **5 (Excelente):** Cumpriu 100% dos requisitos essenciais. A aplicação roda de primeira, sem bugs óbvios. Trata estados de loading/error.<br>**3 (Satisfatório):** Cumpriu a maioria (80%+) dos requisitos. Funcionalidade principal funciona, mas com bugs menores.<br>**1 (Inaceitável):** Não roda ou a funcionalidade principal está quebrada. O avaliador não consegue testar a solução. |
| **2. Qualidade de Código e Estrutura**       | 20%  | [1-5]           | **5 (Excelente):** Código limpo, legível e idiomático. Segue princípios (ex: DRY). Estrutura de pastas lógica e escalável. Tipagem (TS) útil e precisa. Separação clara de responsabilidades.<br>**3 (Satisfatório):** Código funciona, mas com repetição ou "code smells". Estrutura de pastas aceitável, mas confusa. Tipagem usada com alguns `any`.<br>**1 (Inaceitável):** "Código espaguete". Variáveis ruins. Lógica de negócio misturada com UI. "Sopa de arquivos" na raiz. |
| **3. Processo e Comunicação (Git & README)** | 30%  | [1-5]           | **5 (Excelente):** Commits atômicos, frequentes e bem descritos. PR bem escrito. README completo com setup e explicações de design.<br>**3 (Satisfatório):** Usa Git, mas commits grandes (ex: "implementa home e função de agendar tarefas e remove var desnecessária"). README mínimo com instruções básicas.<br>**1 (Inaceitável):** Um único commit ("final"). Nenhum README ou instruções. Demonstra falta de profissionalismo e comunicação. |
| **4. Bônus e Resolução de Problemas**        | 10%  | [1-5]           | **5 (Excelente):** Implementou requisitos bônus funcionando. README explica como utilizar.<br>**3 (Satisfatório):** Tentou implementar bônus, mas não funcionou. README explica falha e plano.<br>**1 (Inaceitável):** Ignorou bônus ou implementou com falhas e sem explicação no README. |

## Instruções sobre "README-CANDIDATO" (Timebox 30min):
Preencha este arquivo com informações claras e concisas, separadas pelas seguintes seções:

#### Seção 1: Instruções para rodar
- Quais variáveis de ambiente são necessárias?
- Como instalar dependências?
- Como rodar o projeto?

#### Seção 2: Decisões de design
- Qual foi a maior dificuldade que você encontrou e como superou?
- O que você não teve tempo de fazer (dentro do timebox) e como você faria se tivesse mais tempo?

#### Seção 3: Link para Deploy (Bônus)
- Cole aqui o link do projeto hospedado ou instrua como rodar via Docker.

#### Seção final: Recomendações
- Escreva aqui dicas, melhorias e recomendações sobre este desafio.

## Considerações finais:
**NÃO UTILIZE IA PARA O PREENCHIMENTO DO FICHA-CANDIDATO. USE SUAS PALAVRAS, SE DEFENDA, MOSTRE QUE VOCÊ É RESPONSÁVEL PELOS SEUS ERROS E ACERTOS.**
Este desafio não foi pensado para encontrar quem o finaliza 100% ou quem o termina mais rápido. Estamos buscando um desenvolvedor sério, que saiba como desenvolver soluções mesmo que para apenas 50% do projeto. Não queremos nenhum dev que dependa 100% de IA ou de terceiros, mas sim aquele que sabe priorizar, desenvolver e pesquisar.
