# Portfolio React

Portfolio pessoal desenvolvido com React e Vite, apresentando meus projetos, serviços e experiência profissional como desenvolvedor web.

## Tecnologias

- **React 19** — Componentização, Hooks (useState, useEffect, useRef)
- **Vite 8** — Build tool com HMR
- **CSS3** — Custom Properties, Grid, Flexbox, animações e transições
- **Canvas API** — Partículas interativas no background
- **Intersection Observer** — Animações on scroll

## Funcionalidades

- Loading screen animada
- Cursor customizado com efeito de follower
- Partículas interativas que respondem ao mouse
- Animações de entrada por scroll (fade-up, fade-down, fade-left, fade-right)
- Menu hambúrguer responsivo com navegação smooth scroll
- Destaque automático da seção ativa no header
- Formulário de contato integrado com FormSubmit.co
- Funil de orçamento em 4 etapas com envio via WhatsApp
- Design responsivo (mobile-first)
- Tipografia fluida com `clamp()`

## Seções

| Seção | Descrição |
|-------|-----------|
| **Hero** | Apresentação, CTA de contato e download de CV |
| **Sobre** | Bio pessoal, estatísticas e conquistas |
| **Skills** | Frontend e Backend com barras de progresso |
| **Portfólio** | Projetos em destaque com links e tecnologias |
| **Serviços** | 4 serviços com preço, prazo e funil de orçamento |
| **Experiência** | Timeline profissional |
| **Contato** | Formulário, dados de contato e redes sociais |

## Serviços Oferecidos

- **Landing Page** — R$ 1.500 - R$ 5.000 | 5-12 dias úteis
- **Site com SEO** — R$ 3.500 - R$ 10.000 | 15-30 dias úteis
- **Sistema Web** — R$ 5.000 - R$ 12.000 | 20-40 dias úteis
- **Automação N8N** — R$ 2.000 - R$ 8.000 | 7-20 dias úteis

## Estrutura do Projeto

```
src/
├── components/           # Componentes React
│   ├── Header.jsx        # Navegação com menu mobile
│   ├── Hero.jsx          # Seção principal
│   ├── About.jsx         # Sobre mim
│   ├── Skills.jsx        # Competências
│   ├── Portfolio.jsx     # Projetos
│   ├── Services.jsx      # Serviços
│   ├── ServiceFunnel.jsx # Modal de orçamento (4 etapas)
│   ├── Experience.jsx    # Experiência profissional
│   ├── Contact.jsx       # Contato
│   ├── Footer.jsx        # Rodapé
│   ├── LoadingScreen.jsx # Tela de carregamento
│   ├── CustomCursor.jsx  # Cursor animado
│   ├── ParticlesCanvas.jsx # Partículas interativas
│   └── BackToTop.jsx     # Botão voltar ao topo
├── data/                 # Dados estáticos
│   ├── projects.js       # Projetos do portfólio
│   ├── skills.js         # Skills e níveis
│   ├── services.js       # Serviços e perguntas do funil
│   └── experiences.js    # Histórico profissional
├── hooks/                # Custom hooks
│   └── useScrollAnimation.js
├── styles/               # Estilos CSS
│   ├── style.css         # Estilos globais e design system
│   ├── responsive.css    # Media queries
│   └── services.css      # Estilos da seção de serviços
├── App.jsx               # Componente principal
└── main.jsx              # Entry point
```

## Design System

- **Cores:** Preto (#0a0a0a) + Dourado (#FFD700) com gradientes
- **Fontes:** Montserrat (corpo) + Playfair Display (títulos)
- **Efeitos:** Glass-morphism, sombras douradas, transições suaves

## Como Rodar

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview
```

## Deploy

O projeto está configurado para deploy na **Vercel**. Basta conectar o repositório GitHub e o framework Vite será detectado automaticamente.

## Contato

- **LinkedIn:** [Alexandre Carvalho Jr.](https://www.linkedin.com/in/alexandre-carvalhojr/)
