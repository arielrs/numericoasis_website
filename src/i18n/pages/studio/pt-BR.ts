import type { StudioCopy } from './en';

export const ptBR = {
  meta: {
    crumb: 'Estúdio de Jogos',
    title: 'Estúdio de Jogos: o jogo que estamos criando',
    metaDescription:
      'O Estúdio de Jogos da Numeric Oasis cria Kindelve, uma descida a masmorras com coleção de criaturas, jogada no navegador. Em teste aberto e de graça.',
    description:
      'O Estúdio de Jogos da Numeric Oasis é a frente de jogos da Numeric Oasis Technologies, em Canoas, no Brasil. Ele está criando Kindelve, uma descida a masmorras com coleção de criaturas que roda no navegador, em qualquer celular ou computador.',
  },
  hero: {
    eyebrow: 'Estúdio de Jogos da Numeric Oasis',
    headline: 'Fazemos jogos como fazemos apps.',
    lede: 'Pequenos, terminados e feitos para rodar no aparelho que a pessoa já tem. O estúdio tem um jogo em teste aberto e uma longa lista de coisas que ele não vai fazer com você.',
  },
  why: {
    eyebrow: 'Por que um estúdio',
    headline: 'A mesma empresa, outro ofício.',
    paragraphs: [
      'A Numeric Oasis Technologies cria apps em Forge para Jira e Confluence Cloud desde 2011. O Estúdio de Jogos é uma frente separada debaixo do mesmo teto: as mesmas pessoas, o mesmo padrão de engenharia, voltados para algo que ninguém precisa instalar.',
      'Um jogo é um teste mais duro da mesma disciplina. Um app recebe perdão por uma tela lenta; um jogo não recebe perdão por um quadro perdido. Por isso o estúdio trabalha como o resto da casa: em entregas pequenas que saem de verdade, com a simulação coberta por testes e o conteúdo como dados, não como código.',
    ],
  },
  game: {
    eyebrow: 'Em teste aberto',
    name: 'Kindelve',
    tagline: 'Despeje criaturas em uma fenda e decida o quanto fundo é fundo o suficiente.',
    paragraphs: [
      'Você é o Warden de uma fenda no chão. Você manda criaturas para baixo, elas lutam sozinhas para descer mais, e você decide o que desce, o que ele leva e quando parar. Uma descida dura minutos. O que ela deixa para trás dura semanas.',
      'Por baixo disso há cerca de novecentas criaturas para conhecer, linhagens que evoluem conforme a profundeza as reescreve, vinte e duas keystones que mudam o que a criatura está fazendo em vez de quanto ela faz, e um Trial diário em que todo Warden desce na mesma profundeza e o quadro é resolvido por prova, não por confiança.',
    ],
    factsHeading: 'Em resumo',
    facts: [
      { label: 'Onde', value: 'Qualquer navegador atual, celular ou computador. Nada para instalar' },
      { label: 'Situação', value: 'Teste aberto, com novidades quase toda semana' },
      { label: 'Idiomas', value: 'Inglês, português, espanhol, francês e japonês' },
      { label: 'Preço', value: 'De graça, sem publicidade e sem nada para comprar' },
    ],
    play: 'Jogar Kindelve',
    docs: 'Ler a documentação',
  },
  principles: {
    eyebrow: 'Como ele é feito',
    headline: 'Quatro compromissos, escritos no código e não em uma promessa.',
    items: [
      {
        title: 'A profundeza é a mesma para todos',
        body: 'A simulação usa números inteiros, um gerador com semente e nenhum relógio, então a mesma descida dá o mesmo resultado em qualquer aparelho. É isso que permite ao quadro diário aceitar uma pontuação rodando ela de novo, em vez de acreditar na sua palavra.',
      },
      {
        title: 'Dinheiro compra tempo e vaidade, nunca poder',
        body: 'Hoje não há nada para comprar. Quando houver, vai encurtar um caminho que você já podia andar, e nunca vai ser um caminho que só quem paga recebe. A regra é verificada por um teste, não guardada em um documento.',
      },
      {
        title: 'Feito para um celular intermediário',
        body: 'Seis andares de criaturas animadas, efeitos e números ao mesmo tempo é fácil num computador e realmente difícil num celular, então o celular é o alvo do projeto e o computador fica com a sobra. Retrato primeiro, alcance do dedo e nenhum gesto que precise de mouse.',
      },
      {
        title: 'Cinco idiomas, e não no fim da fila',
        body: 'Todo texto que o jogador lê sai nos cinco idiomas de uma vez, conferido por uma verificação que falha quando falta algum. Os nomes das criaturas ficam em inglês em todos eles, porque são nomes e não palavras.',
      },
    ],
  },
  next: {
    eyebrow: 'O que vem agora',
    headline: 'Sendo construído agora.',
    items: [
      'Uma conta e um save em todos os aparelhos, com entrada por link de e-mail ou pelo Google, e um nome para o seu Warden. O save que você já tem é adotado, não substituído.',
      'Um servidor que guarda o progresso e prova uma descida rodando ela de novo, para que um navegador perdido pare de custar um mês e um ranking valha a confiança.',
      'Aplicativos para celular e depois Steam, a partir da mesma versão. O jogo é escrito uma vez e cada plataforma é uma casca fina em volta dele.',
    ],
  },
  cta: {
    heading: 'Desça e veja.',
    body: 'Ele roda na mesma aba em que você está lendo isto, não há nada para instalar, e a primeira descida leva uns dois minutos.',
    play: 'Jogar Kindelve',
    docs: 'Ler a documentação',
    contact: 'Falar com o estúdio',
  },
} as const satisfies StudioCopy;
