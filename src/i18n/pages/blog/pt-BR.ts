import type { BlogCopy } from './en';

export const ptBR = {
  meta: {
    crumb: 'Blog',
    title: 'Custo, administração e governança no Jira',
    metaDescription:
      'Anotações sobre visibilidade de custos, governança no Confluence e saúde da configuração do Jira, do time que constrói apps no Atlassian Marketplace.',
    description:
      'Anotações sobre visibilidade de custos na Atlassian, governança no Confluence e saúde da configuração do Jira, do time que constrói apps no Atlassian Marketplace.',
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
    metaDescription: (label: string) =>
      `Todos os posts com a tag ${label}. Anotações do time que constrói apps do Atlassian Marketplace para Jira e Confluence Cloud.`,
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
        body: 'O OnBudget transforma o trabalho que seu time já registra no Jira em orçamentos, previsões e relatórios de custo. Sem campos personalizados novos, e nada muda no seu Jira.',
        primary: 'Veja o que o OnBudget faz',
        secondary: 'Fale com a gente',
      },
      general: {
        headline: 'A gente constrói apps do Atlassian Marketplace.',
        body: 'Apps em Forge para Jira e Confluence Cloud que rodam dentro do seu próprio ambiente Atlassian. Seus dados ficam onde já estão, e não há servidor de fornecedor para a segurança aprovar.',
        primary: 'Veja nossos apps',
        secondary: 'Fale com a gente',
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
  },
} as const satisfies BlogCopy;
