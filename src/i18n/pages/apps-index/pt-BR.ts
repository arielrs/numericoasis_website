import type { AppsIndexCopy } from './en';

export const ptBR = {
  meta: {
    title: 'Todos os nossos apps para Jira e Confluence',
    crumb: 'Apps',
    metaDescription:
      'Nossos apps no Atlassian Marketplace, feitos em Forge para Jira e Confluence Cloud: relatórios de custo e orçamento, governança e administração diária.',
    description:
      'Apps da Numeric Oasis no Atlassian Marketplace, construídos em Forge para Jira e Confluence Cloud. Controle de orçamento, governança no Confluence, mapa de dependências, auditoria de configuração e limpeza de campos personalizados.',
  },
  eyebrow: 'Atlassian Marketplace',
  headline: 'Apps para Jira e Confluence Cloud.',
  lede: 'Todos são construídos em Forge, então rodam dentro da Atlassian e não ao lado dela. Seus dados ficam no seu tenant, não há um terceiro para homologar, e as atualizações chegam sem janela de manutenção.',
  groups: {
    jira: 'Para o Jira',
    confluence: 'Para o Confluence',
  },
  cta: {
    headline: 'Não sabe qual deles você precisa?',
    body: 'Todo app pago tem período de teste gratuito no Atlassian Marketplace, e o gratuito não exige cadastro nenhum. Se preferir descrever o problema antes, conte pra gente: apontamos o app que resolve, ou dizemos que nenhum dos nossos resolve.',
    primary: 'Fale com a gente',
    secondary: 'Ver todos os nossos apps no Marketplace',
  },
  builtFor: 'Feito para',
  readMore: 'Saiba mais',
} as const satisfies AppsIndexCopy;
