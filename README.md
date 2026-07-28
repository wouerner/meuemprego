# 🚀 MeuEmprego.pro - Monorepo

Monorepo principal da plataforma **MeuEmprego.pro**, estruturado utilizando **Git Submodules** para conectar o projeto Frontend (Vue 3 / Vite) e o Backend (Go API).

---

## 📂 Arquitetura do Repositório

```text
meuemprego.pro/ (Monorepo Raiz)
├── meuemprego-frontend/   [Submódulo Git -> git@github.com:wouerner/meuemprego-frontend.git]
│   ├── src/               # Aplicação Vue 3 + Vuetify + TypeScript
│   ├── package.json
│   └── vite.config.mts
├── meuemprego-backend/    [Submódulo Git -> git@github.com:wouerner/meuemprego-backend.git]
│   ├── cmd/api/           # Entrypoint da API em Go
│   ├── internal/          # Camadas (handlers, services, repositories, domain)
│   ├── docker-compose.yml # Serviços PostgreSQL + Go API
│   └── go.mod
├── .gitmodules            # Mapeamento dos submódulos Git
├── Makefile               # Automação de comandos para desenvolvedores
├── README.md              # Documentação principal do monorepo
└── docs/                  # Guias e especificações
    └── MONOREPO_GUIDE.md  # Guia detalhado do fluxo Git Submodules
```

---

## ⚡ Início Rápido (Quick Start)

### 1. Clonar o Monorepo com Submódulos

Ao clonar o repositório pela primeira vez, utilize o parâmetro `--recursive` para baixar o código dos submódulos automaticamente:

```bash
git clone --recursive git@github.com:wouerner/meuemprego.git
cd meuemprego.pro
```

*(Caso tenha clonado sem o `--recursive`, rode `make setup` ou `git submodule update --init --recursive`)*.

### 2. Configurar o Ambiente de Desenvolvimento

Rode o comando `setup` para instalar dependências do Frontend (NPM), baixar módulos Go do Backend e criar o arquivo `.env` inicial:

```bash
make setup
```

---

## 🛠️ Executando a Aplicação Localmente

Você pode utilizar os comandos simplificados do **Makefile**:

### 🚀 Rodar Frontend e Backend Simultaneamente
Executa a API em Go (com suporte a hot-reload se tiver o `air` instalado) e o servidor Vite do Frontend em paralelo no terminal:

```bash
make dev
```
> *Pressione `Ctrl+C` a qualquer momento para encerrar ambos os serviços.*

### 🐳 Rodar Backend via Docker e Frontend Localmente
Sobe o banco PostgreSQL e a API em Go dentro de containers Docker e roda o Frontend localmente:

```bash
make dev-docker
```

### 💻/🐹 Rodar Projetos Individualmente
- **Apenas Frontend**: `make dev-frontend` (Porta padrão: `http://localhost:3000` ou `5173`)
- **Apenas Backend**: `make dev-backend` (Porta padrão: `http://localhost:8080`)

---

## 📜 Comandos Disponíveis no Makefile

Execute `make help` a qualquer momento para visualizar a lista formatada:

| Comando | Descrição |
| :--- | :--- |
| `make setup` | Inicializa submódulos, instala dependências e prepara `.env` |
| `make dev` | Executa Frontend e Backend simultaneamente em paralelo |
| `make dev-docker` | Sobe o banco Postgres e Backend via Docker Compose + Frontend local |
| `make dev-frontend` | Executa apenas o servidor dev do Frontend (Vite) |
| `make dev-backend` | Executa apenas a API em Go |
| `make test` | Executa as suítes de testes unitários do Frontend e Backend |
| `make build` | Compila o Frontend (dist) e o Backend Go (bin/api) para produção |
| `make update-submodules` | Atualiza os submódulos para os commits mais recentes das remotes `master` |
| `make status` | Exibe o status Git do monorepo e dos submódulos |
| `make clean` | Limpa arquivos temporários e artefatos de build |

---

## 🔀 Fluxo de Trabalho com Git Submodules

Como cada subpasta (`meuemprego-frontend` e `meuemprego-backend`) é um repositório Git independente:

1. **Fazer alterações em um projeto específico**:
   - Entre na pasta correspondente (ex: `cd meuemprego-frontend`).
   - Faça as alterações, faça commit e push normalmente para a branch `master` do repositório dele.

2. **Atualizar o ponteiro do Monorepo**:
   - Volte para a raiz do monorepo (`cd ..`).
   - Execute `git status` para ver que o submódulo foi atualizado.
   - Faça commit no monorepo atualizando o ponteiro:
     ```bash
     git add meuemprego-frontend
     git commit -m "chore: update frontend submodule reference"
     git push origin master
     ```

Para um guia completo sobre submodules, veja [docs/MONOREPO_GUIDE.md](file:///home/wouerner/dev/wouerner/meuemprego.pro/docs/MONOREPO_GUIDE.md).
