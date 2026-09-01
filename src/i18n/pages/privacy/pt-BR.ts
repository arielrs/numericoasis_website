import type { PrivacyCopy } from './en';

export const ptBR = {
  meta: {
    crumb: 'Privacidade',
    title: 'Política de privacidade deste site',
    metaDescription:
      'O que o numericoasis.com coleta e quem processa. Analytics sem cookies sempre, e medição de anúncios que você desliga quando quiser.',
    description:
      'O que o numericoasis.com coleta, o que não coleta e quais processadores estão envolvidos. O analytics é sem cookies e está sempre ligado. Você desliga a medição de anúncios quando quiser, e ela nunca começa sem consentimento onde a lei exige consentimento primeiro. Cada app tem a sua própria política de privacidade, separada desta.',
  },
  hero: {
    eyebrow: 'Privacidade',
    headline: 'O que este site coleta, e o que não coleta.',
    lede: 'Resumo: nenhuma conta, nenhum formulário, nenhum perfil. Analytics sem cookies sempre, e medição de anúncios sob o seu controle.',
  },
  updated: 'Última atualização',
  updatedDate: '2026-09-01',
  scope: {
    heading: 'O que esta política cobre',
    body: 'Esta política cobre o numericoasis.com, o site que você está lendo. Ela não cobre o que os nossos apps fazem dentro do seu site Atlassian. Cada app guarda coisas diferentes e é avaliado separadamente, então cada um publica a sua própria política de privacidade.',
    linkLabel: 'Políticas de privacidade dos apps',
    linkHref: '/documentation/',
  },
  sections: [
    {
      heading: 'Não pedimos nada a você',
      body: 'Não há conta para criar, newsletter para assinar nem formulário de contato. O site é um conjunto de arquivos estáticos. Se quiser falar com a gente, você manda um e-mail ou abre um chamado, e nos dois casos é você que decide o que contar.',
    },
    {
      heading: 'Analytics, sempre ligado e sem cookies',
      body: 'Usamos o Cloudflare Web Analytics em todas as páginas. Ele não grava cookies, não guarda identificador nenhum no seu aparelho e não segue você entre sites. Ele reporta contagens agregadas: quais páginas foram vistas, aproximadamente de onde vieram os acessos e quão rápido as páginas carregaram. Não conseguimos identificar ninguém a partir disso, e a Cloudflare também não faria isso por nós.',
    },
    {
      heading: 'Medição de anúncios, e a escolha que você tem',
      body: 'Quando anunciamos, precisamos saber quais anúncios levam a algum lugar. Se você permitir, carregamos a tag do Google, que grava cookies e informa ao Google Analytics e ao Google Ads que uma visita chegou e que alguém clicou para uma das nossas listagens no Atlassian Marketplace. Onde a lei exige consentimento antes, o que para nós significa o Espaço Econômico Europeu, o Reino Unido, a Suíça e o Brasil, nada é guardado até você dizer sim: se ignorar o aviso ali, a tag roda sem armazenamento, contando que algo aconteceu sem guardar nada no seu aparelho e sem identificar você. Nos outros lugares ela começa ligada e o aviso a desliga, então se você escolher Agora não, paramos de medir e apagamos os cookies do Google já gravados. Você pode reabrir essa escolha a qualquer momento no botão abaixo.',
    },
    {
      heading: 'O que vemos e o que não vemos sobre uma instalação',
      body: 'A instalação de um app acontece no Atlassian Marketplace, que é um site da Atlassian, não nosso. Nunca vemos isso acontecer. O que vemos é que alguém saiu da nossa página em direção a uma listagem. Adicionamos parâmetros a esses links de saída para que o Marketplace possa nos dizer qual das nossas páginas enviou o visitante, e esses parâmetros descrevem a página, não a pessoa.',
    },
    {
      heading: 'Logs de servidor',
      body: 'O site é hospedado no GitHub Pages e entregue pela Cloudflare. Os dois mantêm logs operacionais de curta duração, que normalmente incluem um endereço IP, para segurança e prevenção de abuso. Não temos acesso a esses logs e não os recebemos.',
    },
    {
      heading: 'E-mail e suporte',
      body: 'Se você escrever para contact@numericoasis.com, guardamos a mensagem enquanto a conversa for útil e a usamos para responder você. Se você abrir um chamado, ele fica no nosso projeto de Jira Service Management, que é um serviço Atlassian Cloud, e é mantido como parte do histórico de suporte daquele app.',
    },
    {
      heading: 'Quem processa dados para nós',
      body: 'Cloudflare, para analytics e entrega. GitHub, para hospedagem. Google, para medição de anúncios, que você pode desligar. Atlassian, para o portal de suporte e o Marketplace. Não vendemos dados, e não há nenhuma rede de publicidade neste site além da tag do Google descrita acima.',
    },
    {
      heading: 'Os seus direitos',
      body: 'Pela LGPD e pelo GDPR, você pode perguntar o que temos sobre você, pedir uma cópia, pedir correção ou pedir exclusão. Para este site, a resposta honesta quase sempre é que não temos nada, porque nunca coletamos nada que identifique você. Quando temos algo, é uma conversa por e-mail ou um chamado que você mesmo abriu. Escreva para contact@numericoasis.com e respondemos em até trinta dias.',
    },
    {
      heading: 'Crianças',
      body: 'Estas são ferramentas de trabalho para administradores Atlassian. O site não é dirigido a crianças e não coletamos nada delas conscientemente.',
    },
    {
      heading: 'Mudanças',
      body: 'Quando esta política mudar, mudamos a data no topo da página. Se a mudança for relevante, por exemplo se passarmos a coletar algo novo, vamos dizer isso na página em vez de editar em silêncio.',
    },
  ],
  manage: {
    heading: 'Mudou de ideia',
    body: 'Reabra o aviso de cookies e escolha de novo. Escolher Agora não também apaga os cookies do Google já gravados.',
    cta: 'Gerenciar cookies',
  },
  contact: {
    heading: 'Dúvidas sobre qualquer um destes pontos',
    body: 'Escreva para a gente. Uma pergunta sobre privacidade vai para uma pessoa, não para uma fila.',
    cta: 'Mande um e-mail',
    subject: 'Dúvida sobre privacidade',
  },
} as const satisfies PrivacyCopy;
