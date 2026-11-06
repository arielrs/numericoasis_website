import type { AtlassianCopy } from './en';

export const ptBR = {
  meta: {
    crumb: 'Atlassian',
    title: 'Consultoria Atlassian e apps em Forge',
    metaDescription:
      'Migração de Jira e Confluence para o Cloud, administração e limpeza de licenças, nossos apps no Marketplace e apps em Forge sob medida que reduzem a conta.',
    description:
      'A Numeric Oasis avalia e executa migrações de Jira e Confluence do Data Center para o Cloud, dimensiona reescritas do ScriptRunner, tira equipes de outras ferramentas, organiza a administração e as licenças, publica apps em Forge no Atlassian Marketplace e cria apps em Forge sob medida que substituem várias assinaturas.',
  },
  hero: {
    eyebrow: 'Atlassian',
    headline: 'Jira e Confluence, da migração até o último custom field.',
    lede: 'Trabalhamos dentro das ferramentas da Atlassian há quinze anos, como administradores, consultores e parceiros do Marketplace. Levamos você para o Cloud, mantemos o site organizado depois que você chega lá, e criamos o app de que você precisa quando o Marketplace não tem, ou cobra caro demais pela parte que você usa.',
    primary: 'Fale com a gente',
    secondary: 'Veja nossos apps',
  },
  consulting: {
    eyebrow: 'Consultoria',
    headline: 'Migrações, faxinas e a administração entre uma e outra.',
    items: [
      {
        title: 'Migrações do Data Center para o Cloud',
        body: 'Uma avaliação antes de qualquer coisa mudar de lugar: cada app mapeado para o seu caminho no Cloud, cada script dimensionado para a sua reescrita, cada macro do Confluence conferida para ver se sobrevive à viagem. Depois, a migração em si, em ondas ensaiadas, com um plano para a manhã seguinte.',
      },
      {
        title: 'Reescritas do ScriptRunner',
        body: 'O ScriptRunner no Cloud não é a versão do Data Center em outro endereço. Fazemos o inventário do que você tem, dizemos o que aposentar, o que se traduz e o que precisa ser reescrito, e dimensionamos tudo com honestidade antes de você se comprometer com uma data.',
      },
      {
        title: 'Saída de outras ferramentas',
        body: 'Planilhas que viraram sistema, ferramentas de projeto que ficaram caras demais, wikis sem dono. Mapeamos o que vai para o Jira e o Confluence, o que vai de outro jeito, e o que simplesmente deve ser desligado.',
      },
      {
        title: 'Administração e governança',
        body: 'Esquemas que foram se desviando, permissões que ninguém sabe explicar, regras de automação que disparam para ninguém e licenças pagas para quem já saiu. Arrumamos, registramos o porquê e deixamos regras que mantêm tudo arrumado.',
      },
    ],
  },
  apps: {
    eyebrow: 'Apps no Marketplace',
    headline: 'Nossos apps para Jira e Confluence Cloud.',
    lede: 'Feitos em Forge, então rodam dentro do seu próprio ambiente Atlassian e os seus dados ficam lá. Cada um faz um trabalho do começo ao fim, e cada um diz na própria página exatamente o que guarda.',
    link: 'Todos os apps',
  },
  custom: {
    eyebrow: 'Apps em Forge sob medida',
    headline: 'Pague pela parte que você usa.',
    paragraphs: [
      'A maioria dos sites Atlassian carrega apps do Marketplace comprados por causa de um recurso cada, e cada um deles é cobrado por usuário no site inteiro. Muitas vezes, dois ou três desses podem ser substituídos por um único app pequeno em Forge, feito exatamente para o que as suas equipes fazem com eles.',
      'Partimos do seu inventário de apps e do seu log de auditoria: o que está instalado, o que é usado, por quantas pessoas e quanto custa no seu plano. Depois você recebe uma recomendação com os números: quais apps manter, quais tirar e quais substituir. Um app sob medida roda em Forge, dentro da Atlassian, então passa pela sua análise de segurança do mesmo jeito que os nossos.',
    ],
    points: [
      'Um inventário de apps com uso e custo reais',
      'Um app em Forge no lugar de várias assinaturas',
      'Roda dentro da Atlassian, como todo app que entregamos',
    ],
    link: 'Leia: como reduzir o seu parque de apps Atlassian',
  },
  posts: {
    eyebrow: 'Do blog',
    headline: 'Anotações sobre trabalho com Atlassian.',
    link: 'Todos os posts de consultoria Atlassian',
  },
  cta: {
    heading: 'Planejando uma migração, ou arrumando a casa depois de uma?',
    body: 'Conte onde o seu site está e onde ele precisa chegar, em português, inglês ou espanhol. Você vai falar com as pessoas que fazem o trabalho.',
    primary: 'Fale com a gente',
  },
} as const satisfies AtlassianCopy;
