# ==============================================================================
# Makefile - MeuEmprego.pro Monorepo
# ==============================================================================
# Utilitário para desenvolvedores iniciarem, testarem e construírem o projeto
# contendo Frontend (Vue 3 / Vite) e Backend (Go API).
# ==============================================================================

.PHONY: help setup dev dev-docker dev-backend dev-frontend build test clean update-submodules status push

# Cores para o terminal
CYAN    := \033[36m
GREEN   := \033[32m
YELLOW  := \033[33m
RED     := \033[31m
RESET   := \033[0m

help: ## ❓ Exibe esta lista de comandos disponíveis
	@echo ""
	@echo "  $(CYAN)=======================================================$(RESET)"
	@echo "  $(GREEN)🚀 MeuEmprego.pro - Comandos do Monorepo$(RESET)"
	@echo "  $(CYAN)=======================================================$(RESET)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(CYAN)%-20s$(RESET) %s\n", $$1, $$2}'
	@echo ""

setup: ## 🛠️ Inicializa submódulos, instala dependências e configura arquivos .env
	@echo "$(GREEN)🔄 Inicializando submódulos Git...$(RESET)"
	git submodule update --init --recursive
	@echo "$(GREEN)📦 Instalando dependências do Frontend...$(RESET)"
	cd meuemprego-frontend && npm install
	@echo "$(GREEN)🐹 Baixando módulos do Backend Go...$(RESET)"
	cd meuemprego-backend && go mod download
	@if [ ! -f meuemprego-backend/.env ]; then \
		echo "$(YELLOW)📝 Criando meuemprego-backend/.env a partir do .env.example...$(RESET)"; \
		cp meuemprego-backend/.env.example meuemprego-backend/.env; \
	fi
	@echo "$(GREEN)✅ Setup concluído com sucesso!$(RESET)"

dev: ## 🚀 Executa Frontend (Vite) e Backend (Go) simultaneamente
	@echo "$(GREEN)🐳 Garantindo que o PostgreSQL esteja em execução (Docker)...$(RESET)"
	cd meuemprego-backend && docker compose up -d postgres
	@echo "$(GREEN)⏳ Aguardando PostgreSQL ficar saudável...$(RESET)"
	@for i in $$(seq 1 30); do \
		status=$$(docker inspect --format '{{.State.Health.Status}}' runter_postgres 2>/dev/null || echo starting); \
		[ "$$status" = "healthy" ] && break; \
		sleep 1; \
	done; \
	[ "$$status" = "healthy" ] || (echo "$(RED)❌ PostgreSQL não ficou saudável a tempo$(RESET)" && exit 1)
	@echo "$(GREEN)🚀 Iniciando Frontend (Vite) e Backend (Go API) simultaneamente...$(RESET)"
	@echo "$(YELLOW)Pressione Ctrl+C para encerrar ambos os serviços.$(RESET)"
	@(trap 'kill 0' INT TERM; \
		(cd meuemprego-backend && (if command -v air >/dev/null 2>&1; then air; else go run cmd/api/main.go; fi)) & \
		(cd meuemprego-frontend && npm run dev) & \
		wait)

dev-docker: ## 🐳 Inicia o Backend via Docker Compose e o Frontend localmente
	@echo "$(GREEN)🐳 Subindo banco PostgreSQL e API Backend via Docker Compose...$(RESET)"
	cd meuemprego-backend && docker compose up -d --build
	@echo "$(GREEN)💻 Iniciando Frontend em modo dev...$(RESET)"
	cd meuemprego-frontend && npm run dev

dev-backend: ## 🐹 Executa apenas a API Backend Go (com Air ou go run)
	@echo "$(GREEN)🐳 Garantindo que o PostgreSQL esteja em execução (Docker)...$(RESET)"
	cd meuemprego-backend && docker compose up -d postgres
	@echo "$(GREEN)🐹 Iniciando Backend Go...$(RESET)"
	cd meuemprego-backend && (if command -v air >/dev/null 2>&1; then air; else go run cmd/api/main.go; fi)

dev-frontend: ## 💻 Executa apenas o Frontend Vue 3 (Vite)
	@echo "$(GREEN)💻 Iniciando Frontend Vite...$(RESET)"
	cd meuemprego-frontend && npm run dev

build: ## 🏗️ Compila os projetos Frontend e Backend para produção
	@echo "$(GREEN)🏗️ Compilando Frontend...$(RESET)"
	cd meuemprego-frontend && npm run build
	@echo "$(GREEN)🏗️ Compilando Backend Go...$(RESET)"
	cd meuemprego-backend && go build -o bin/api cmd/api/main.go
	@echo "$(GREEN)✅ Build concluído com sucesso!$(RESET)"

test: ## 🧪 Executa os testes unitários de ambos os projetos
	@echo "$(GREEN)🧪 Executando testes do Frontend...$(RESET)"
	cd meuemprego-frontend && npm run test
	@echo "$(GREEN)🧪 Executando testes do Backend...$(RESET)"
	cd meuemprego-backend && go test -v ./...
	@echo "$(GREEN)✅ Todos os testes concluídos!$(RESET)"

update-submodules: ## 🔄 Atualiza submódulos para os commits mais recentes da remote master
	@echo "$(GREEN)🔄 Atualizando submódulos para o topo da branch remote...$(RESET)"
	git submodule update --remote --merge
	@echo "$(GREEN)✅ Submódulos atualizados!$(RESET)"

push: ## 📤 Envia commits dos submódulos (backend + frontend) e do monorepo raiz
	@for repo in meuemprego-backend meuemprego-frontend .; do \
		echo "$(GREEN)🚀 Enviando $$repo...$(RESET)"; \
		if [ -n "$$(cd $$repo && git status --porcelain)" ]; then \
			echo "$(YELLOW)⚠️  $$repo tem alterações não commitadas — pulando.$(RESET)"; \
			continue; \
		fi; \
		(cd $$repo && git push origin master) || exit 1; \
	done
	@echo "$(GREEN)✅ Push concluído em todos os repositórios!$(RESET)"

status: ## 📊 Exibe o status do Git no Monorepo e em todos os submódulos
	@echo "$(CYAN)--- Status do Monorepo Raiz ---$(RESET)"
	git status -s
	@echo "$(CYAN)--- Status dos Submódulos ---$(RESET)"
	git submodule status

clean: ## 🧹 Remove artefatos de compilação e arquivos temporários
	@echo "$(YELLOW)🧹 Limpando artefatos de build...$(RESET)"
	rm -rf meuemprego-frontend/dist
	rm -rf meuemprego-backend/bin
	rm -rf meuemprego-backend/tmp
	@echo "$(GREEN)✅ Limpeza concluída!$(RESET)"
