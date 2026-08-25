import type { BlogCopy } from './en';

export const ptBR = {
  meta: {
    crumb: 'Blog',
    title: 'Blog',
    description:
      'Anotações sobre visibilidade de custos na Atlassian, governança no Confluence e saúde da configuração do Jira, do time que constrói seis apps no Marketplace.',
  },
  index: {
    eyebrow: 'Da oficina',
    headline: 'Anotações da oficina.',
    lede: 'O que aprendemos construindo apps em Forge, e o que vivemos tendo que explicar duas vezes. Basicamente sobre saber quanto o seu trabalho na Atlassian custa, manter o Confluence governável, e impedir que a configuração do Jira apodreça em silêncio.',
    empty: 'Nada publicado ainda.',
    allTags: 'Todos os posts',
    tagsLabel: 'Navegar por tema',
  },
  tagPage: {
    eyebrow: 'Tema',
    headlinePrefix: 'Posts marcados com',
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
  },
} as const satisfies BlogCopy;
