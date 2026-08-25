import type { HomeCopy } from './en';

export const ptBR = {
  meta: {
    title: 'Numeric Oasis Technologies',
    description:
      'Parceira no Atlassian Marketplace. Seis apps em Forge para Jira e Confluence Cloud, liderados pelo OnBudget, que transforma o trabalho já registrado no Jira em orçamentos, previsões e relatórios de custo.',
  },
  hero: {
    eyebrow: 'Parceira no Atlassian Marketplace',
    headline: 'Saiba quanto o trabalho no seu Jira realmente custa.',
    lede: 'Construímos apps em Forge para Jira e Confluence Cloud. O OnBudget, nosso carro-chefe, transforma o trabalho que seu time já registra em orçamentos, previsões e relatórios de custo, sem pedir que ninguém preencha um campo novo.',
    primary: 'Conheça o OnBudget',
    secondary: 'Ver os seis apps',
  },
  proof: {
    label: 'Como nossos apps são construídos',
    items: [
      'Runs on Atlassian',
      'Feito em Forge',
      'Somente Cloud',
      'Somente leitura sempre que possível',
      'Jira e Confluence',
      'Parceira no Atlassian Marketplace',
    ],
  },
  problem: {
    eyebrow: 'Por que criamos o OnBudget',
    headline: 'O Jira sabe o que aconteceu. Ele não sabe quanto custou.',
    body: 'Os dados de entrega ficam no Jira. O dinheiro fica em uma planilha que alguém exporta na sexta e que já está errada na segunda. Pior: os times que nunca adotaram pontos de história ou apontamento de horas simplesmente não aparecem nessa planilha.',
    link: 'Veja como o OnBudget responde a isso',
  },
  portfolio: {
    eyebrow: 'Os apps',
    headline: 'Seis apps para Jira e Confluence Cloud.',
    lede: 'Cada um resolve um problema que o produto original deixa em aberto, e cada um roda dentro da Atlassian e não ao lado dela.',
  },
  how: {
    eyebrow: 'Como trabalhamos',
    headline: 'Só Forge, e isso é uma restrição deliberada.',
    paragraphs: [
      'Todo app que publicamos roda em Atlassian Forge, o que significa que ele executa dentro da infraestrutura da Atlassian e não em um servidor nosso. Não há um terceiro para o seu time de segurança avaliar, não há saída de dados para documentar, e não há um tempo de atividade separado com que se preocupar.',
      'Também significa que pedimos as permissões mais estreitas que dão conta do recado. Quatro dos nossos seis apps são somente leitura. Os dois que escrevem dizem exatamente o que escrevem e por quê, nas próprias páginas, porque uma promessa genérica de privacidade que é falsa para um app é pior do que promessa nenhuma.',
      'Somos parceiros no Atlassian Marketplace, trabalhamos de Canoas, no sul do Brasil, e atendemos suporte em inglês, português e espanhol.',
    ],
    link: 'Mais sobre o time',
  },
  blog: {
    eyebrow: 'Do blog',
    headline: 'Anotações da oficina.',
    link: 'Todos os posts',
  },
  cta: {
    headline: 'Instale pelo Marketplace, ou tire uma dúvida antes.',
    body: 'Todo app tem período de teste gratuito, e o app gratuito nem precisa disso. Se preferir falar com uma pessoa antes de instalar qualquer coisa, também funciona.',
    primary: 'Ver os seis apps',
    secondary: 'Tirar uma dúvida',
  },
} as const satisfies HomeCopy;
