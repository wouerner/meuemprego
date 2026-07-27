# meuemprego.pro - Especificação de Requisitos & Arquitetura (MVP V5)
## Marketplace de Job Hunting (Duplo Fluxo Gratuito)

---

### 1. Visão Geral do Sistema
O **meuemprego.pro** é um marketplace de Job Hunting que opera com duplo fluxo de conexão bidirecional:
1. **Fluxo Candidato → Hunter**: Candidatos navegam no catálogo público de consultores e iniciam contato direto via WhatsApp ou LinkedIn.
2. **Fluxo Hunter → Candidato**: Candidatos cadastram seus perfis na vitrine de talentos ("Solicitar contato de Hunters") e consultores credenciados entram em contato diretamente via WhatsApp ou LinkedIn.

---

### 2. Visão Geral dos Perfis de Usuário
- **Candidato / Profissional**: Cria seu perfil profissional, disponibiliza links obrigatorios de contato (LinkedIn/WhatsApp), cadastra seu CPF (para prevenção de duplicidades), busca consultores no catálogo e pode **ativar ou pausar/desativar a qualquer momento a solicitação de contato** para parar de receber abordagens de Job Hunters.
- **Job Hunter / Career Coach**: Cria seu perfil público de consultor, cadastra seu CPF, busca profissionais na vitrine de candidatos interessados em assessoria e entra em contato diretamente via LinkedIn ou WhatsApp.
- **Administrador**: Modera perfis cadastrados (candidatos e hunters), garante a veracidade das informações, evita duplicidades e acompanha métricas de uso da plataforma.

---

### 3. Matriz de Requisitos Funcionais (RF) e Não Funcionais (RNF)

| Código | Requisito | Descrição | Status MVP |
| :--- | :--- | :--- | :--- |
| **RF-001** | Cadastro de Candidatos e Hunters | Cadastro gratuito com preenchimento obrigatório de links do LinkedIn e número de WhatsApp. | **MVP V5** |
| **RF-002** | Perfil do Candidato / Solicitação | Preenchimento de objetivo de carreira, senioridade, área, momento profissional e opt-in "Solicitar contato de Hunters". | **MVP V5** |
| **RF-003** | Curadoria e Aprovação de Perfis | Administrador valida cadastros de Hunters e modera candidatos para evitar spam. | **MVP V5** |
| **RF-004** | Catálogo Público de Job Hunters | Catálogo de consultores com filtros por área de especialização, senioridade e modelo de atendimento. | **MVP V5** |
| **RF-005** | Vitrine de Candidatos (Talent Pool) | Lista buscável de profissionais solicitando suporte de carreira, acessível para Job Hunters cadastrados. | **MVP V5** |
| **RF-006** | Redirecionamento para Contato Externo | Redirecionamento direto para o perfil do LinkedIn ou conversa pré-formatada no WhatsApp do destinatário. | **MVP V5** |
| **RF-007** | Métricas de Interação e Transbordo | Registro interno da quantidade de cliques e redirecionamentos para LinkedIn e WhatsApp (mensuração de tração). | **MVP V5** |
| **RF-008** | Validação de CPF Único e Anti-Duplicidade | Preenchimento obrigatório de CPF válido no cadastro de Candidatos e Hunters para impedir perfis duplicados. | **MVP V5** |
| **RF-009** | Paginação de Listas e Logs | Paginação em lote no Catálogo de Hunters (RF-004), Vitrine de Candidatos (RF-005) e Logs de Transbordo (RF-007). | **MVP V5** |
| **RF-010** | Pausa e Desativação de Abordagens | O candidato pode desativar a solicitação de contato a qualquer momento no perfil ou App Bar, ocultando seu perfil da Vitrine de Talentos e bloqueando novas abordagens. | **MVP V5** |
| **RF-011** | Autenticação e Login de Usuários | Tela de login (`/login`) no meuemprego.pro com validação de credenciais (E-mail/CPF e Senha), login social (LinkedIn/Google) e seleção de perfil ativo. | **MVP V5** |
| **RNF-001** | Consentimento e Privacidade LGPD | Aceite explícito dos termos de privacidade para disponibilização do LinkedIn e WhatsApp exclusivamente para contato profissional. | **MVP V5** |
| **RNF-002** | Criptografia e Proteção de Dados | Protocolo TLS 1.3 (HTTPS) em trânsito e proteção contra acesso não autorizado. | **MVP V5** |
| **RNF-003** | Navegação Rápida | Buscas em ambos os catálogos respondem em menos de 1 segundo para 95% das requisições (< 100ms no cliente). | **MVP V5** |
| **RNF-004** | Interface Mobile First | Interface focada em dispositivos móveis com acionamento nativo dos aplicativos do WhatsApp e LinkedIn. | **MVP V5** |
| **RNF-005** | Sigilo e Proteção do CPF | O número do CPF é utilizado unicamente para verificação interna de duplicidade e NUNCA é exibido publicamente para terceiros. | **MVP V5** |

---

### 4. Arquitetura da Aplicação (Vue 3 + Vuetify + Pinia)

#### Estrutura de Pastas no Projeto
```
frontend/
├── docs/
│   ├── ESPECIFICACAO_REQUISITOS_V5.md
│   └── SPEC_LANDING_PAGE.md
├── src/
│   ├── components/
│   │   ├── GlassChartWidget.vue
│   │   ├── GlassCustomizer.vue
│   │   ├── GlassStatCard.vue
│   │   ├── GlassTasksWidget.vue
│   │   └── WhatsAppContactModal.vue
│   ├── pages/
│   │   ├── admin.vue           # Painel de Curadoria & Moderação (RF-003)
│   │   ├── cadastro.vue        # Cadastro & Pausa de Contatos (RF-001, RF-002, RF-010, RNF-001)
│   │   ├── candidatos.vue      # Vitrine de Candidatos com Paginação (RF-005, RF-009)
│   │   ├── hunters.vue         # Catálogo Público de Job Hunters (RF-004)
│   │   ├── index.vue           # Landing Page de Atração Dupla meuemprego.pro
│   │   ├── login.vue           # Tela de Login com Autenticação (RF-011)
│   │   └── metricas.vue        # Métricas, Filtros & Logs Paginados (RF-007)
│   ├── stores/
│   │   ├── auth.ts             # Perfil, Role Ativa e Autenticação
│   │   ├── candidates.ts       # Store de Candidatos & Filtros
│   │   ├── hunters.ts          # Store de Hunters & Curadoria
│   │   └── metrics.ts          # Rastreamento de Cliques, URLs WhatsApp & Exportação CSV
│   ├── styles/
│   │   └── glassmorphism.css   # Sistema de Design Glassmorphic
│   ├── types/
│   │   └── index.ts            # Interfaces TypeScript & Algoritmo de Validação de CPF
│   ├── App.vue                 # Alternador Rápido de Status de Abordagens no App Bar
│   └── main.ts
└── package.json
```

---

### 5. Execução e Testes Automatizados

#### Executar Testes Unitários:
```bash
npm run test
```

#### Rodar Servidor de Desenvolvimento:
```bash
npm run dev
```

#### Gerar Build de Produção:
```bash
npm run build
```
