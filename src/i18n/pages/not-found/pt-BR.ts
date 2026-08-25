import type { NotFoundCopy } from './en';

export const ptBR = {
  title: 'Página não encontrada',
  description: 'Essa página não existe na Numeric Oasis.',
  eyebrow: '404',
  headline: 'Não encontramos essa página.',
  body: 'O link pode estar desatualizado, ou talvez tenhamos reorganizado o site. Volte para a página inicial ou escolha uma das seções abaixo.',
  home: 'Voltar ao início',
  apps: 'Ver os apps',
  blog: 'Ler o blog',
} as const satisfies NotFoundCopy;
