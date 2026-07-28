# 📚 Guia do Desenvolvedor - Git Submodules no Monorepo

Este documento contém boas práticas e instruções detalhadas para trabalhar com a estrutura de **Git Submodules** adotada no projeto **MeuEmprego.pro**.

---

## 🎯 Conceito Principal

No nosso ecossistema:
- **Monorepo Raiz** (`meuemprego.pro`): Atua como um repositório orquestrador que referencia versões específicas (hashes de commit) de cada submódulo.
- **Frontend** (`meuemprego-frontend`): Repositório independente versionado em `git@github.com:wouerner/meuemprego-frontend.git`.
- **Backend** (`meuemprego-backend`): Repositório independente versionado em `git@github.com:wouerner/meuemprego-backend.git`.

---

## 🔄 Fluxo de Desenvolvimento Diário

### 1. Clonar e Atualizar o Projeto

Para obter todo o código atualizado (raiz e submódulos):

```bash
# Se estiver clonando do zero:
git clone --recursive git@github.com:wouerner/meuemprego.git

# Se já possui o projeto clonado e quer atualizar tudo:
git pull origin master
git submodule update --init --recursive --merge
```

Ou simplesmente rode:
```bash
make update-submodules
```

---

## ✏️ Trabalhando nos Projetos (Frontend / Backend)

### Fazendo alterações no Frontend ou Backend:

1. **Navegue até a pasta do projeto**:
   ```bash
   cd meuemprego-frontend # ou cd meuemprego-backend
   ```

2. **Verifique se está na branch `master`**:
   ```bash
   git checkout master
   git pull origin master
   ```

3. **Realize suas alterações, faça commit e push no submódulo**:
   ```bash
   git add .
   git commit -m "feat: adiciona nova funcionalidade"
   git push origin master
   ```

4. **Atualize o ponteiro no Monorepo Raiz**:
   Como o submódulo mudou de commit, a raiz do monorepo agora registra uma alteração na referência do submódulo.
   ```bash
   cd .. # Voltar para a raiz meuemprego.pro
   git status
   git add meuemprego-frontend
   git commit -m "chore: update frontend submodule reference to latest master"
   git push origin master
   ```

---

## 🛠️ Resolução de Problemas Frequentes (Troubleshooting)

### ⚠️ Submódulo em estado "Detached HEAD"
Se ao entrar no submódulo você visualizar `HEAD detached at <hash>`:
```bash
cd meuemprego-frontend # ou meuemprego-backend
git checkout master
git pull origin master
```

### ⚠️ Submódulo mostrando alterações não salvas após `git pull` na raiz
Execute:
```bash
git submodule update --init --recursive
```

---

## ⚙️ Dicas de Produtividade

- **Rodar a aplicação com Make**: Sempre utilize `make dev` na raiz para levantar os dois serviços simultaneamente sem precisar abrir múltiplos terminais.
- **Verificar o status global**: Utilize `make status` para visualizar em uma só tela o estado do Git do monorepo e de cada submódulo.
