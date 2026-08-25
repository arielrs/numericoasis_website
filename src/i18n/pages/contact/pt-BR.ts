import type { ContactCopy } from './en';

export const ptBR = {
  meta: {
    crumb: 'Contato',
    title: 'Contato',
    description:
      'O suporte de todos os apps da Numeric Oasis passa pelo nosso portal de Jira Service Management. Dúvidas de pré-venda, avaliação e parcerias vão para contact@numericoasis.com. Atendemos em inglês, português e espanhol.',
  },
  hero: {
    eyebrow: 'Contato',
    headline: 'Dois caminhos, dependendo do que você precisa.',
    lede: 'Atendemos em inglês, português e espanhol.',
  },
  support: {
    label: 'Já usa um dos nossos apps',
    headline: 'O suporte passa pelo portal.',
    body: 'Abra o chamado no nosso portal de Jira Service Management, e não por e-mail. Lá o pedido vira um ticket, entra em uma fila e ganha histórico, que é o que você quer quando algo quebrou. O portal cobre os seis apps.',
    cta: 'Abrir um chamado de suporte',
    includeTitle: 'Com estes dados normalmente pulamos uma ida e volta',
    include: [
      'A URL do seu site Atlassian',
      'Qual app, e a versão que aparece no anúncio do Marketplace',
      'O que você esperava que acontecesse',
      'O que aconteceu no lugar, com uma captura de tela se houver o que capturar',
    ],
  },
  sales: {
    label: 'Avaliando, ou pensando no assunto',
    headline: 'Pré-venda fala com uma pessoa.',
    body: 'Dúvidas sobre se um app serve, o que ele consegue medir, como ele lida com permissões, licenciamento por volume ou parcerias: mande um e-mail. Respondemos em até um dia útil.',
    cta: 'Enviar um e-mail',
    subject: 'Dúvida sobre os apps Atlassian de vocês',
    includeTitle: 'Vale mencionar',
    include: [
      'Qual app ou qual problema você quer resolver',
      'Jira, Confluence, ou os dois',
      'Mais ou menos quantas pessoas usariam',
      'O que você já tentou',
    ],
  },
  elsewhere: {
    label: 'Em outros lugares',
    marketplace: 'Nossos apps no Atlassian Marketplace',
    linkedin: 'Numeric Oasis no LinkedIn',
    location: 'Onde estamos',
  },
} as const satisfies ContactCopy;
