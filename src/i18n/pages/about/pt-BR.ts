import type { AboutCopy } from './en';

export const ptBR = {
  meta: {
    crumb: 'Sobre',
    title: 'Sobre nós, e o que cada app guarda',
    metaDescription:
      'Quem constrói nossos apps do Atlassian Marketplace, como eles são feitos em Forge e o que exatamente cada app guarda. Escrito para a revisão de segurança.',
    description:
      'A Numeric Oasis é parceira no Atlassian Marketplace e constrói apps em Forge para Jira e Confluence Cloud, de Canoas, no Brasil. Como construímos, o que cada app guarda e como falar com a gente.',
  },
  hero: {
    eyebrow: 'Sobre a Numeric Oasis',
    headline: 'O time por trás dos apps.',
    lede: 'Construímos e damos suporte a apps em Forge para Jira e Confluence Cloud. Time pequeno, foco estreito, e uma recusa deliberada a rodar qualquer coisa fora da infraestrutura da Atlassian.',
  },
  standing: {
    eyebrow: 'Onde estamos',
    headline: 'Parceira no Atlassian Marketplace.',
    paragraphs: [
      'Tudo o que publicamos passa pelo Atlassian Marketplace, o que significa que a Atlassian cuida de licenciamento, cobrança e distribuição, e você compra nossos apps do mesmo jeito que compra qualquer outro. Nossa página de fornecedor lista tudo o que já publicamos.',
      'Não temos nível de parceria, e não vamos sugerir que temos. O que temos é o selo Runs on Atlassian em todos os apps que publicamos, que é uma afirmação sobre onde o código roda e não um prêmio comercial.',
    ],
    link: 'Nossa página no Marketplace',
  },
  build: {
    eyebrow: 'Como construímos',
    headline: 'Só Forge, com as permissões mais estreitas possíveis.',
    paragraphs: [
      'Forge significa que nosso código roda dentro da Atlassian e não em uma infraestrutura nossa. Não há um host terceiro para o seu time de segurança avaliar, não há saída de dados para documentar, e não há nada seu em um banco de dados que a gente opera.',
      'As permissões seguem o mesmo princípio. Pedimos os escopos mais estreitos que dão conta do trabalho, e dizemos, app por app, o que cada um realmente guarda. Uma promessa única de privacidade para uma linha inteira de apps é sempre falsa para pelo menos um deles, então não fazemos essa promessa.',
    ],
  },
  dataTable: {
    eyebrow: 'O que cada app guarda',
    headline: 'App por app, em linguagem simples.',
    lede: 'A maioria dos nossos apps não guarda nada sobre o seu conteúdo. As exceções estão na tabela, e cada uma é deliberada: um aceite que não diz quem aceitou não é um aceite, e uma trilha de auditoria que não diz quem fez a mudança não é uma trilha de auditoria.',
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
    intro: 'O nome tem duas metades, e as duas são intencionais.',
    numericLabel: 'Numeric',
    numeric:
      'é o lado de engenharia. Rigor, dados em que dá para confiar, decisões apoiadas em algo além de achismo. É o que nos faz cuidadosos com os detalhes que decidem se uma plataforma ainda funciona no terceiro ano: a trilha de auditoria que prova o que mudou, a checagem de permissão que se sustenta quando alguém compartilha um relatório, a limpeza de campos que não quebra um esquema de telas.',
    oasisLabel: 'Oasis',
    oasis:
      'é o que queremos que os apps pareçam. A maioria dos administradores Atlassian que nos encontra já está soterrada: apps demais, configurações pela metade demais, fornecedores demais que não atendem uma ligação. Tentamos ser o oposto disso. Escopo estreito, afirmações honestas incluindo o não honesto, e contato direto com quem escreve o código.',
    close: 'Software que deixa a parte técnica calma. É essa a marca inteira.',
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
