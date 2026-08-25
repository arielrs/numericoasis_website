import type { AppsIndexCopy } from './en';

export const ptBR = {
  meta: {
    title: 'Apps',
    crumb: 'Apps',
    description:
      'Seis apps da Numeric Oasis no Atlassian Marketplace, construídos em Forge para Jira e Confluence Cloud. Controle de orçamento, governança no Confluence, mapa de dependências, auditoria de configuração e limpeza de campos personalizados.',
  },
  eyebrow: 'Atlassian Marketplace',
  headline: 'Seis apps para Jira e Confluence Cloud.',
  lede: 'Todos são construídos em Forge, então rodam dentro da Atlassian e não ao lado dela. Seus dados ficam no seu tenant, não há um terceiro para homologar, e as atualizações chegam sem janela de manutenção.',
  groups: {
    jira: 'Para o Jira',
    confluence: 'Para o Confluence',
  },
  flagshipBadge: 'Carro-chefe',
  builtFor: 'Feito para',
  readMore: 'Saiba mais',
} as const satisfies AppsIndexCopy;
