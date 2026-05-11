# TrainerLink

Plataforma de agendamento e acompanhamento de treinos entre alunos e personal trainers. O backend expõe uma API REST construída com Node.js + Express e persiste os dados em PostgreSQL.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Runtime | Node.js 20+ |
| Framework | Express 4 |
| Banco de dados | PostgreSQL 16 |
| Driver DB | node-postgres (pg) |
| Containerização | Docker + Docker Compose |
| Variáveis de ambiente | dotenv |

---

## Rodando com Docker Compose

Pré-requisitos: **Docker** e **Docker Compose** instalados.

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/trainerlink.git
cd trainerlink

# 2. Copie e ajuste as variáveis de ambiente
cp .env.example .env

# 3. Suba o banco de dados
docker-compose up -d

# 4. Aplique o schema
psql $DATABASE_URL -f src/db/schema.sql

# 5. Instale as dependências e inicie a API
npm install
npm run dev
```

A API estará disponível em `http://localhost:3000`.

> O serviço `postgres` fica disponível em `localhost:5432` com usuário, senha e banco todos iguais a `trainerlink`.

---

## Rodando sem Docker

Pré-requisitos: **Node.js 20+** e uma instância PostgreSQL acessível.

### Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:

| Variável | Descrição | Exemplo |
|---|---|---|
| `DATABASE_URL` | Connection string do PostgreSQL | `postgres://user:pass@localhost:5432/trainerlink` |
| `PORT` | Porta em que a API vai escutar | `3000` |

```bash
# 1. Instale as dependências
npm install

# 2. Crie o banco e aplique o schema
psql $DATABASE_URL -f src/db/schema.sql

# 3. Inicie a API
npm run dev   # desenvolvimento (nodemon)
npm start     # produção
```

---

## Endpoints

Base URL: `http://localhost:3000/api`

### Usuários

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/usuarios` | Cadastra um novo usuário (aluno ou personal) |
| `GET` | `/personals` | Lista todos os usuários do tipo personal |

### Agendamentos

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/agendamentos` | Aluno cria uma solicitação de agendamento |
| `GET` | `/agendamentos` | Lista agendamentos; aceita `?aluno_id=` ou `?personal_id=` |
| `GET` | `/agendamentos/:id` | Busca um agendamento pelo ID |
| `PATCH` | `/agendamentos/:id/status` | Atualiza o status (`confirmado`, `recusado`, `concluido`) |

### Treinos

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/treinos` | Personal registra o treino de uma sessão concluída |
| `GET` | `/treinos?aluno_id=` | Lista o histórico de treinos de um aluno |

---

## Estrutura de pastas

```
trainerlink/
├── src/
│   ├── index.js                  # Entrada da aplicação (Express + middlewares)
│   ├── db/
│   │   ├── index.js              # Pool de conexão (node-postgres)
│   │   └── schema.sql            # DDL: tabelas, ENUMs e trigger
│   ├── models/
│   │   ├── usuarios.js           # Queries de usuários
│   │   ├── agendamentos.js       # Queries de agendamentos
│   │   └── treinos.js            # Queries de treinos
│   ├── controllers/
│   │   ├── usuariosController.js
│   │   ├── agendamentosController.js
│   │   └── treinosController.js
│   └── routes/
│       ├── index.js              # Agrega e exporta todos os routers
│       ├── usuarios.js
│       ├── personals.js
│       ├── agendamentos.js
│       └── treinos.js
├── trainerlink.postman_collection.json
├── docker-compose.yml
├── .env.example
├── package.json
└── README.md
```
