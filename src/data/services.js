export const services = [
  {
    id: 'landing-page',
    title: 'Landing Page',
    subtitle: 'Conversão Focada',
    description: 'Página web única, focada e estratégica, desenvolvida com um objetivo específico de conversão. Design persuasivo, CTA destacado e performance otimizada.',
    features: [
      'Página única otimizada para conversão',
      'Design persuasivo e responsivo',
      'Call-to-Action destacado',
      'Carregamento ultra-rápido',
      'Mobile-first'
    ],
    tech: ['React.js', 'PHP', 'HTML5', 'CSS3', 'Tailwind CSS'],
    price: 'R$ 1.500 - R$ 5.000',
    deadline: '5-12 dias úteis',
    icon: 'landing'
  },
  {
    id: 'site-seo',
    title: 'Site com SEO',
    subtitle: 'Presença Digital Estratégica',
    description: 'Site institucional completo com arquitetura profissional e otimizado para motores de busca, garantindo visibilidade orgânica no Google.',
    features: [
      'Múltiplas páginas estruturadas',
      'SEO On-Page completo',
      'Performance técnica otimizada',
      'Google Analytics e Search Console',
      'Design responsivo profissional'
    ],
    tech: ['React.js', 'PHP', 'MySQL', 'HTML5', 'CSS3'],
    price: 'R$ 3.500 - R$ 10.000',
    deadline: '15-30 dias úteis',
    icon: 'site'
  },
  {
    id: 'sistema',
    title: 'Sistema Web',
    subtitle: 'Automação e Gestão',
    description: 'Aplicação web customizada para resolver necessidades específicas do seu negócio, automatizando processos e aumentando a eficiência operacional.',
    features: [
      'Sistema de Agendamento',
      'Controle de Estoque',
      'Portal do Cliente',
      'Gestão de Pedidos',
      'Integrações com APIs'
    ],
    tech: ['React.js', 'Node.js', 'PostgreSQL', 'JWT'],
    price: 'R$ 5.000 - R$ 12.000',
    deadline: '20-40 dias úteis',
    icon: 'system'
  },
  {
    id: 'automacao',
    title: 'Automação N8N',
    subtitle: 'Eficiência Inteligente',
    description: 'Automação de processos empresariais usando N8N, conectando diferentes ferramentas e eliminando tarefas repetitivas com workflows inteligentes.',
    features: [
      'Automação de vendas e leads',
      'Integração entre sistemas',
      'Notificações automáticas',
      'Workflows personalizados',
      'Conexão com WhatsApp, CRM, E-commerce'
    ],
    tech: ['N8N', 'APIs', 'WhatsApp', 'CRM'],
    price: 'R$ 2.000 - R$ 8.000',
    deadline: '7-20 dias úteis',
    icon: 'automation'
  }
]

export const funnelQuestions = {
  details: {
    'landing-page': [
      { id: 'type', label: 'Tipo de Landing Page', type: 'select', options: ['Landing Page Básica', 'Landing Page Avançada'] },
      { id: 'goal', label: 'Objetivo principal', type: 'select', options: ['Captura de leads', 'Venda direta', 'Evento/Lançamento', 'Institucional', 'Outro'] },
      { id: 'hasReference', label: 'Tem alguma referência/inspiração?', type: 'text', placeholder: 'Cole o link ou descreva...' }
    ],
    'site-seo': [
      { id: 'pages', label: 'Quantas páginas precisa?', type: 'select', options: ['5-8 páginas', '10-15 páginas', 'Não sei ainda'] },
      { id: 'hasBlog', label: 'Precisa de blog?', type: 'select', options: ['Sim', 'Não', 'Talvez'] },
      { id: 'hasReference', label: 'Tem alguma referência/inspiração?', type: 'text', placeholder: 'Cole o link ou descreva...' }
    ],
    'sistema': [
      { id: 'systemType', label: 'Tipo de sistema', type: 'select', options: ['Agendamento', 'Controle de Estoque', 'Gestão de Pedidos', 'Portal do Cliente', 'E-commerce', 'Outro'] },
      { id: 'users', label: 'Quantos usuários vão usar?', type: 'select', options: ['1-5', '5-20', '20-100', '100+'] },
      { id: 'details', label: 'Descreva brevemente o que precisa', type: 'textarea', placeholder: 'Ex: Preciso de um sistema para...' }
    ],
    'automacao': [
      { id: 'automationType', label: 'O que deseja automatizar?', type: 'select', options: ['Vendas/Leads', 'Atendimento WhatsApp', 'E-commerce', 'Gestão interna', 'Integrações', 'Outro'] },
      { id: 'tools', label: 'Quais ferramentas já usa?', type: 'text', placeholder: 'Ex: WhatsApp, Google Sheets, CRM...' },
      { id: 'details', label: 'Descreva o processo atual', type: 'textarea', placeholder: 'Ex: Hoje recebo leads por...' }
    ]
  }
}
