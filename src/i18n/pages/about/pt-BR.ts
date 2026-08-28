import type { AboutCopy } from './en';

export const ptBR = {
  meta: {
    crumb: 'Sobre',
    title: 'Sobre nós, e o que cada app guarda',
    metaDescription:
      'Quem constrói nossos apps do Atlassian Marketplace, como eles rodam dentro da Atlassian e o que cada app guarda. A página para o seu time de segurança.',
    description:
      'A Numeric Oasis é parceira no Atlassian Marketplace e constrói apps em Forge para Jira e Confluence Cloud, de Canoas, no Brasil. Como construímos, o que cada app guarda e como falar com a gente.',
  },
  hero: {
    eyebrow: 'Sobre a Numeric Oasis',
    headline: 'O time por trás dos apps.',
    lede: 'Construímos e damos suporte a apps em Forge para Jira e Confluence Cloud. Todos rodam dentro do seu próprio ambiente Atlassian, levam o selo Runs on Atlassian e têm suporte de quem escreveu o código.',
  },
  standing: {
    eyebrow: 'Onde estamos',
    headline: 'Parceira no Atlassian Marketplace.',
    paragraphs: [
      'Tudo o que publicamos passa pelo Atlassian Marketplace, o que significa que a Atlassian cuida de licenciamento, cobrança e distribuição, e você compra nossos apps do mesmo jeito que compra qualquer outro. Nossa página de fornecedor lista tudo o que já publicamos.',
      'Todo app que publicamos leva o selo Runs on Atlassian, a marca da Atlassian para apps cujo código roda em Forge dentro da infraestrutura da Atlassian. Não há servidor de fornecedor no caminho e nada seu sai do seu site.',
    ],
    link: 'Nossa página no Marketplace',
  },
  build: {
    eyebrow: 'Como construímos',
    headline: 'Feito para passar na sua revisão de segurança.',
    paragraphs: [
      'Forge significa que nosso código roda dentro da infraestrutura da Atlassian e não em um servidor nosso. Quem revisa não tem host de terceiros para avaliar, nada saindo da Atlassian para documentar, e nada seu em um banco de dados que a gente opera. A maior parte do questionário é respondida por onde o código roda.',
      'As permissões seguem o mesmo princípio. Cada app pede os escopos de que precisa para fazer o seu trabalho, e cada um diz na própria página exatamente o que guarda. A tabela abaixo põe todos lado a lado, para você conferir tudo em um lugar só.',
    ],
  },
  dataTable: {
    eyebrow: 'O que cada app guarda',
    headline: 'App por app, em linguagem simples.',
    lede: 'A maioria dos nossos apps não guarda nada sobre o seu conteúdo. Os que guardam dados pessoais guardam porque o trabalho exige: um aceite que não diz quem aceitou não é um aceite, e uma trilha de auditoria que não diz quem fez a mudança não é uma trilha de auditoria.',
    columns: {
      app: 'App',
      host: 'Produto',
      personalData: 'Guarda dados pessoais',
    },
    yes: 'Sim, por design',
    no: 'Não',
  },
  support: {
    eyebrow: 'Suporte',
    headline: 'Um portal, três idiomas.',
    body: 'O suporte de todos os apps passa pelo mesmo portal de Jira Service Management, então os chamados entram em uma fila e não em uma caixa de entrada. Atendemos em inglês, português e espanhol.',
    link: 'Abrir o portal de suporte',
  },
  name: {
    eyebrow: 'O nome',
    headline: 'Por que Numeric Oasis',
    intro: 'O nome tem duas metades, e as duas querem dizer alguma coisa.',
    numericLabel: 'Numeric',
    numeric:
      'é o lado de engenharia. Rigor, dados em que dá para confiar, decisões apoiadas em algo além de achismo. É o que nos faz cuidadosos com os detalhes que decidem se uma plataforma ainda funciona no terceiro ano: a trilha de auditoria que prova o que mudou, a checagem de permissão que se sustenta quando alguém compartilha um relatório, a limpeza de campos que não quebra um esquema de telas.',
    oasisLabel: 'Oasis',
    oasis:
      'é o que queremos que os apps pareçam. A maioria dos administradores Atlassian que nos encontra já está soterrada: apps demais, configurações pela metade demais, fornecedores demais que não atendem uma ligação. Tentamos ser o oposto disso. Um trabalho por app, afirmações que você pode conferir na listagem, e contato direto com quem escreve o código.',
    close: 'Software que deixa a parte técnica calma.',
  },
  where: {
    eyebrow: 'Onde estamos',
    headlinePrefix: 'Trabalhando de',
    paragraphs: [
      'Nossos clientes estão espalhados por seis continentes, então a maior parte do nosso trabalho é assíncrona e a maior parte do assíncrono é por escrito. Isso dá janelas de resposta previsíveis para todo mundo sem empurrar ninguém para uma reunião em horário ruim.',
    ],
    contactLead: 'Fale com a gente em',
    contactMid: 'ou pela nossa',
    contactLink: 'página de contato',
  },
} as const satisfies AboutCopy;
