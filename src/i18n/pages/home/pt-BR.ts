import type { HomeCopy } from './en';

export const ptBR = {
  meta: {
    title: 'Numeric Oasis Technologies',
    description:
      'A Numeric Oasis é parceira no Atlassian Marketplace e constrói apps em Forge para Jira e Confluence Cloud. No momento, a maior parte da nossa atenção está no OnBudget, que transforma o trabalho já registrado no Jira em orçamentos, previsões e relatórios de custo.',
  },
  hero: {
    eyebrow: 'Parceira no Atlassian Marketplace',
    headline: 'Os apps Atlassian que a gente sempre quis que existissem.',
    lede: 'Quinze anos dentro do Jira e do Confluence ensinaram onde estão as lacunas, principalmente vendo times contornarem sempre as mesmas. Agora construímos os apps que fecham essas lacunas, e cada um deles roda dentro da Atlassian e não ao lado dela.',
    primary: 'Ver o que fazemos',
    secondary: 'Como trabalhamos',
    iconsLabel: 'Nossos apps',
  },
  proof: {
    label: 'Como nossos apps são construídos',
    items: [
      'Runs on Atlassian',
      'Feito em Forge',
      'Somente Cloud',
      'Somente leitura sempre que possível',
      'Jira e Confluence',
      'Suporte em três idiomas',
    ],
  },
  focus: {
    eyebrow: 'Onde está nossa atenção agora',
    headline: 'O Jira sabe o que aconteceu. Ele não sabe quanto custou.',
    body: 'Os dados de entrega ficam no Jira. O dinheiro fica em uma planilha que alguém exporta na sexta e que já está errada na segunda. Pior: os times que nunca adotaram pontos de história ou apontamento de horas simplesmente não aparecem nessa planilha.',
    body2: 'O OnBudget é o app que estamos empurrando com mais força no momento, porque é o que resolve o maior problema, na nossa opinião. Ele transforma o trabalho que seu time já registra em orçamentos, previsões e relatórios de custo, sem pedir que ninguém preencha um campo novo.',
    link: 'Veja o que o OnBudget faz',
  },
  portfolio: {
    eyebrow: 'Os apps',
    headline: 'Apps para Jira e Confluence Cloud.',
    lede: 'Cada um fecha uma lacuna que o produto original deixa em aberto. E vêm mais por aí.',
  },
  how: {
    eyebrow: 'Como trabalhamos',
    headline: 'Só Forge, e isso é uma restrição deliberada.',
    paragraphs: [
      'Todo app que publicamos roda em Atlassian Forge, o que significa que ele executa dentro da infraestrutura da Atlassian e não em um servidor nosso. Não há um terceiro para o seu time de segurança avaliar, não há saída de dados para documentar, e não há um tempo de atividade separado com que se preocupar.',
      'Também significa que pedimos as permissões mais estreitas que dão conta do recado. A maioria dos nossos apps só lê. Os que escrevem dizem exatamente o que escrevem e por quê, nas próprias páginas, porque uma promessa genérica de privacidade que é falsa para um app é pior do que promessa nenhuma.',
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
    body: 'Todo app pago tem período de teste gratuito, e o app gratuito nem precisa disso. Se preferir falar com uma pessoa antes de instalar qualquer coisa, também funciona.',
    primary: 'Ver o que fazemos',
    secondary: 'Tirar uma dúvida',
  },
} as const satisfies HomeCopy;
