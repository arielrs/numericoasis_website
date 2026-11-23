import type { BlogCopy } from './en';

export const ptBR = {
  meta: {
    crumb: 'Blog',
    title: 'Guias e notícias Atlassian, software e jogos',
    metaDescription:
      'Guias e notícias para admins de Jira, Confluence, JSM e Rovo, e artigos sobre software sob medida e a indústria de games, do time da Numeric Oasis.',
    description:
      'Guias e notícias para administradores do Atlassian Cloud sobre Jira, Confluence, Jira Service Management e Rovo, e artigos sobre software sob medida e a indústria de games, do time da Numeric Oasis.',
  },
  index: {
    eyebrow: 'Da oficina',
    headline: 'Anotações da oficina.',
    lede: 'Guias e notícias para administradores do Atlassian Cloud, anotações sobre desenvolvimento de software sob medida e artigos sobre a indústria de games. Cada um responde à pergunta nas primeiras linhas e traz as fontes.',
    empty: 'Nada publicado ainda.',
    allTags: 'Todos os posts',
    tagsLabel: 'Navegar por tema',
  },
  tagPage: {
    eyebrow: 'Tema',
    headlinePrefix: 'Posts marcados com',
    metaDescription: (label: string) =>
      `Todos os posts com a tag ${label}. Anotações da Numeric Oasis sobre software sob medida, trabalho com Atlassian e desenvolvimento de jogos.`,
    backToBlog: 'Todos os posts',
    empty: 'Nada publicado sobre este tema ainda.',
  },
  post: {
    backToBlog: 'Todos os posts',
    updated: 'Atualizado',
    readingTime: (minutes: number) => `${minutes} min de leitura`,
    by: 'Por',
    share: 'Compartilhar',
    shareOnLinkedIn: 'Compartilhar no LinkedIn',
    shareByEmail: 'Compartilhar por e-mail',
    previous: 'Anterior',
    next: 'Próximo',
    related: 'Leitura relacionada',
    cta: {
      onbudget: {
        headline: 'Quer isso sem a planilha?',
        body: 'O OnBudget transforma o trabalho que seu time já registra no Jira em orçamentos, previsões e relatórios de custo. Funciona com os campos que o seu time já preenche, e lê o seu Jira em vez de editar.',
        primary: 'Veja o que o OnBudget faz',
        secondary: 'Fale com a gente',
      },
      general: {
        headline: 'A gente constrói apps do Atlassian Marketplace.',
        body: 'Apps em Forge para Jira e Confluence Cloud que rodam dentro do seu próprio ambiente Atlassian. Seus dados ficam onde já estão, e a sua análise de segurança cobre uma plataforma que você já aprovou.',
        primary: 'Veja nossos apps',
        secondary: 'Fale com a gente',
      },
      customDev: {
        headline: 'Você também tem os seus vinte por cento?',
        body: 'Criamos as aplicações web, as integrações e as ferramentas internas que fecham a lacuna que o produto que você comprou deixou aberta. Entregas pequenas, testadas e documentadas, em três idiomas.',
        primary: 'Desenvolvimento sob medida',
        secondary: 'Fale com a gente',
      },
      consulting: {
        headline: 'Planejando uma migração, ou arrumando a casa depois de uma?',
        body: 'Avaliamos migrações do Data Center para o Cloud, dimensionamos a reescrita do ScriptRunner, tiramos equipes de outras ferramentas e limpamos o que a migração deixa para trás. Você fala com quem faz o trabalho.',
        primary: 'Serviços Atlassian',
        secondary: 'Fale com a gente',
      },
      studio: {
        headline: 'Jogue o que o nosso Estúdio de Jogos faz.',
        body: 'Kindelve é uma descida a masmorras com coleção de criaturas que roda em qualquer navegador, de graça, em cinco idiomas. A página do estúdio mostra o jogo, como ele é feito e o que vem a seguir.',
        primary: 'O Estúdio de Jogos',
        secondary: 'Fale com o estúdio',
      },
    },
  },
  pagination: {
    label: 'Paginação',
    previous: 'Posts mais recentes',
    next: 'Posts mais antigos',
    page: (current: number, total: number) => `Página ${current} de ${total}`,
  },
  tags: {
    onbudget: 'OnBudget',
    'jira-cost-management': 'Custos no Jira',
    'confluence-governance': 'Governança no Confluence',
    'jira-administration': 'Administração do Jira',
    forge: 'Forge',
    marketplace: 'Atlassian Marketplace',
    'atlassian-cloud': 'Atlassian Cloud',
    'how-to': 'Como fazer',
    'product-updates': 'Novidades dos apps',
    'custom-development': 'Desenvolvimento sob medida',
    'atlassian-consulting': 'Consultoria Atlassian',
    'cloud-migration': 'Migração para o Cloud',
    'game-development': 'Desenvolvimento de jogos',
    'atlassian-news': 'Notícias da Atlassian',
    'jira-service-management': 'Jira Service Management',
    'rovo-and-ai': 'Rovo e IA',
  },
} as const satisfies BlogCopy;
