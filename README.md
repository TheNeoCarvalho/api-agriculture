# 🌾 Agriculture API

API RESTful para gerenciamento de produtores rurais, propriedades, safras e culturas plantadas. Desenvolvida com NestJS, PostgreSQL, Prisma ORM e Docker.

---

## Funcionalidades

- Cadastro, edição e exclusão de produtores rurais
- Validação de CPF ou CNPJ (com regras específicas)
- Cadastro de propriedades rurais com:
  - Nome da fazenda
  - Cidade e Estado
  - Área total, agricultável e de vegetação (com validações)
- Cadastro de safras (ex.: Safra 2021, Safra 2022)
- Registro de culturas por safra e por propriedade

---

## Arquitetura

O projeto segue uma arquitetura modular baseada nos princípios do NestJS:

### Padrões Utilizados
- **Modular**: Cada funcionalidade principal é um módulo independente
- **MVC (Model-View-Controller)**: Separação clara entre modelos (entities), controladores e serviços
- **DTO Pattern**: Objetos de transferência de dados para validação e tipagem
- **Dependency Injection**: Injeção de dependências para melhor acoplamento
- **Guard Pattern**: Proteção de rotas usando JWT Guards

---

### Estrutura de Camadas
```
└── src/
    │
    ├── modules/
    |   └── auth/                      # Módulo de Autenticação
    │        ├── dtos/               # Data Transfer Objects
    │        ├── guards/             # JWT Guards
    │        ├── strategies/         # Estratégias de autenticação
    │        ├── controllers/        # Controlador de autenticação
    |        ├── services/           # Serviço de autenticação
    │        └── auth.module.ts      # Módulo de autenticação
    |   
    ├── producers/             # Módulo de Produtores
    │       ├── dto/           # DTOs de produtores
    │       ├── entities/      # Entidades do TypeORM
    │       ├── controllers/
    │       ├── services/
    │       └── producers.module.ts
    │
    ├── crop/                  # Módulo de Produtores
    │       ├── dto/           # DTOs de cultivos
    │       ├── entities/      # Entidades do TypeORM
    │       ├── conntrollers/
    │       ├── services/
    │       └── crop.module.ts
    |
    ├── planting/              # Módulo de Plantações
    │       ├── dto/           # DTOs de Plantações
    │       ├── entities/      # Entidades do TypeORM
    │       ├── controllers/
    │       ├── services/
    │       └── planting.module.ts
    |
    ├── property/              # Módulo de Propriedades
    │       ├── dto/           # DTOs de Propriedades
    │       ├── entities/      # Entidades do TypeORM
    │       ├── controllers/
    │       ├── services/
    │       └── property.module.ts
    |
    ├── season/                # Módulo de Safras
    │       ├── dto/           # DTOs de Safras
    │       ├── entities/      # Entidades do TypeORM
    │       ├── controllers/
    │       ├── services/
    │       └── season.module.ts
    |
    ├── user/                  # Módulo de Usuários
    │       ├── dto/           # DTOs de Usuários
    │       ├── entities/      # Entidades do TypeORM
    │       ├── controllers/
    │       ├── services/
    │       └── user.module.ts
    |
    ├── config/                 # Configurações da aplicação
    │   ├── typeorm.config.ts   # Configuração do TypeORM
    │   └── database.config.ts   # Configuração das migrations
    │
    └── database/
        └── migrations/        # Migrations do TypeORM
```

---

## Tecnologias utilizadas

- [NestJS](https://nestjs.com/) com TypeScript
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Swagger (OpenAPI)](https://swagger.io/)
- [Jest](https://jestjs.io/) para testes
- [Logger](https://docs.nestjs.com/techniques/logger) para logs

---

## Pré-requisitos

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/en/) (apenas se rodar fora do Docker)
- [Yarn](https://yarnpkg.com/) ou [npm](https://www.npmjs.com/)

---

## Rodando com Docker

### 1. Clone o repositório

```bash
git clone https://github.com/TheNeoCarvalho/app-agriculture.git
cd app-agriculture
```

### 2. Copie o arquivo de variáveis ambiente

```bash
cp .env.example .env
```

### 3. Suba os containers
```bash
docker-compose up -d
```

Rode as migrações do Prisma
```bash
docker exec -it app-agriculture-api npx prisma migrate deploy
```

## Acessando a aplicação
API: http://localhost:3000/api

Documentação Swagger: http://localhost:3000/api/docs

## Testes

### Executar todos os testes:
```bash
yarn test
# ou
npm run test
```

#### API versionada com Swagger

#### Logs estruturados com Logger

#### Testes unitários

#### Separação por módulos/domínios

#### DTOs e validações com class-validator

## Autor
Francisco Manoel Carvalho 
#### Acesse o [Github](https://github.com/TheNeoCarvalho) do projeto