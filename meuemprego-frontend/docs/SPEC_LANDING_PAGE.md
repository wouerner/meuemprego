# Especificação Técnica e de Design: Landing Page (Home Page)
## Marketplace de Job Hunting (V5 - Conversão Bidirecional)

---

### 1. Objetivos da Landing Page
A **Landing Page** atua como a página inicial (`/`) do sistema. Seu principal objetivo é converter dois públicos-alvo distintos simultaneamente:
1. **Candidatos / Profissionais**: Motivados a buscar assessoria de carreira ou cadastrar seu perfil para receber abordagens diretas de recrutadores e consultores via WhatsApp/LinkedIn.
2. **Job Hunters / Career Coaches**: Motivados a cadastrar seus perfis de consultoria para captar novos clientes e acessar uma vitrine com centenas de profissionais interessados em assessoria.

---

### 2. Proposta de Valor e Mensagem Principal
- **Para Candidatos**: *"Conecte-se com os melhores Job Hunters do mercado e acelere sua carreira. Sem intermediários, sem comissões e 100% gratuito."*
- **Para Job Hunters**: *"Expanda sua carteira de clientes de assessoria de carreira e acesse diretamente profissionais ativos buscando orientação profissional."*

---

### 3. Estrutura das Seções da Landing Page

#### Seção 1: Hero Section (Destaque Principal Glassmorphic)
- **Badges**: `"Marketplace 100% Gratuito"`, `"Duplo Fluxo Bidirecional"`, `"Conexão Direta via WhatsApp & LinkedIn"`.
- **Título de Impacto**: *"A Ponte Direta Entre Talentos e Consultores de Carreira"*.
- **Sub-título**: *"Busque Job Hunters especializados na sua área ou cadastre seu perfil para receber propostas diretas de assessoria no seu WhatsApp ou LinkedIn."*
- **Botões Duplos de CTA (Call to Action)**:
  - CTA Candidato (Primário): *"Quero Acelerar Minha Carreira"* ➔ Redireciona para `/cadastro?tipo=candidato` ou `/candidatos`.
  - CTA Job Hunter (Secundário Glass): *"Sou Consultor / Cadastrar Perfil"* ➔ Redireciona para `/cadastro?tipo=hunter` ou `/hunters`.
- **Visual**: Card em vidro fumê com esferas animadas de luz neon e contador de acessos/conexões em tempo real.

#### Seção 2: Como Funciona (O Duplo Fluxo Gratuito)
Visualização em 2 colunas espelhadas:
- **Caminho 1: Para Candidatos**:
  1. *Explore o Catálogo público de Job Hunters.*
  2. *Filtre por especialidade e senioridade.*
  3. *Inicie uma conversa direta via WhatsApp ou LinkedIn com o consultor.*
- **Caminho 2: Para Job Hunters**:
  1. *Cadastre seu perfil de consultoria.*
  2. *Acesse a Vitrine de Talentos ativos buscando assessoria.*
  3. *Aborde os candidatos diretamente sem taxas de intermediação.*

#### Seção 3: Indicadores de Impacto & Prova Social
- **Cards de Métricas**:
  - `+1.450` Conexões Diretas Realizadas
  - `+380` Job Hunters e Coaches Credenciados
  - `98.4%` Taxa de Satisfação nos Atendimentos
  - `< 1h` Tempo Médio para Primeira Abordagem

#### Seção 4: Vitrine de Destaques (Preview dos Catálogos)
- **Preview do Catálogo de Hunters**: Carrossel / Cards com consultores em destaque e botão "Ver Todos os Hunters".
- **Preview da Vitrine de Candidatos**: Cards de talentos com opt-in ativo e botão "Ver Vitrine de Talentos".

#### Seção 5: Diferenciais Competitivos
- 🔒 **Conformidade LGPD**: Seus contatos visíveis apenas para profissionais credenciados.
- ⚡ **Sem Intermediários**: Converse diretamente sem plataformas de chat fechadas.
- 💸 **100% Gratuito no MVP**: Sem comissões veladas ou mensalidades de cadastro.

#### Seção 6: Perguntas Frequentes (FAQ)
Accordion interativo respondendo dúvidas de candidatos (Ex: "Os consultores cobram pelos serviços?", "Meus dados ficam seguros?") e de Job Hunters (Ex: "Como me credenciar?", "Como funciona a moderação?").

#### Seção 7: CTA Final & Rodapé
Card de encerramento com chamada dupla para cadastro e links rápidos de navegação.

---

### 4. Requisitos de Performance e Usabilidade
- **Mobile First**: Totalmente adaptado para smartphones.
- **Micro-animações**: Efeitos suaves ao passar o mouse sobre os cards de vidro (`.glass-panel-hover`).
- **Navegação Sem Fricção**: Acesso em 1 clique para os catálogos e formulários de cadastro.
