import type { CustomDevCopy } from './en';

export const ptBR = {
  meta: {
    crumb: 'Desenvolvimento sob medida',
    title: 'Desenvolvimento de software sob medida',
    metaDescription:
      'Aplicações web, integrações e ferramentas internas, em entregas pequenas com testes e documentação. Software sob medida da Numeric Oasis.',
    description:
      'A Numeric Oasis cria aplicações web sob medida, integrações entre os sistemas que você já paga, ferramentas internas e sites em vários idiomas. Entregas pequenas, um teste para cada correção e documentação que a sua equipe consegue ler, direto de Canoas, no Brasil.',
  },
  hero: {
    eyebrow: 'Desenvolvimento sob medida',
    headline: 'Software feito para o jeito que você já trabalha.',
    lede: 'O produto que você comprou cobre a maior parte do trabalho. O resto é onde a sua equipe perde a semana: a exportação que alguém roda à mão toda sexta, os dois sistemas que discordam sobre o mesmo cliente, a planilha que ninguém tem coragem de mexer. Nós criamos o software que fecha essa lacuna.',
    primary: 'Conte o que você precisa',
    secondary: 'Como trabalhamos',
  },
  build: {
    eyebrow: 'O que criamos',
    headline: 'Quatro tipos de trabalho, todos terminados.',
    items: [
      {
        title: 'Aplicações web',
        body: 'Portais para clientes, fluxos de pedido e de agendamento, e painéis com os números que a sua equipe de fato usa para decidir. Feitos primeiro para o navegador, então não há nada para instalar nem para manter atualizado na máquina de ninguém.',
      },
      {
        title: 'Integrações',
        body: 'A conexão entre dois sistemas que você já paga, feita para o seu modelo de dados e não para o de um fornecedor, com as novas tentativas, os registros e a conciliação que a tornam confiável às três da manhã.',
      },
      {
        title: 'Ferramentas internas',
        body: 'A pequena aplicação que substitui a planilha que todo mundo tem medo de editar. Ela parte dessa planilha, mantém o que funciona nela e acrescenta a validação, o histórico e as permissões que ela nunca teve.',
      },
      {
        title: 'Sites e plataformas de conteúdo',
        body: 'Sites estáticos rápidos em vários idiomas, com verificações no build que se recusam a publicar um link quebrado, uma tradução faltando ou uma cor ilegível. Este site é um deles.',
      },
    ],
  },
  how: {
    eyebrow: 'Como trabalhamos',
    headline: 'Entregas pequenas, testes de verdade, nenhuma surpresa.',
    steps: [
      {
        title: 'Definir a menor coisa útil',
        body: 'Começamos pela versão que já vale a pena por si só, e escrevemos o que fica de fora dela. Uma lista curta do que não vamos construir é a parte mais útil de qualquer escopo.',
      },
      {
        title: 'Entregar em semanas',
        body: 'A primeira versão chega cedo a quem vai usá-la. O que essas pessoas fazem com ela decide a próxima versão com mais segurança do que qualquer plano escrito antes de elas a terem nas mãos.',
      },
      {
        title: 'Toda correção vem com um teste',
        body: 'Um bug é corrigido escrevendo primeiro um teste que falha por causa dele, e depois fazendo esse teste passar. O teste fica, e é por isso que o mesmo bug não volta.',
      },
      {
        title: 'Documentado ao longo do caminho',
        body: 'Cada entrega diz o que mudou e o que não mudou. Quando o projeto termina, a sua equipe herda um software que consegue ler, e não uma caixa-preta com o nosso telefone colado nela.',
      },
    ],
  },
  proof: {
    eyebrow: 'O que já entregamos',
    headline: 'Nossos próprios produtos são o portfólio.',
    paragraphs: [
      'Construímos os nossos produtos do jeito que construiríamos os seus, e eles são públicos, então você pode julgar o trabalho em si e não uma descrição dele.',
      'Seis apps em Forge no Atlassian Marketplace, cada um documentado na nossa wiki. Este site, em três idiomas, com verificações no build que impedem um link quebrado, uma tradução faltando ou uma cor ilegível de ir ao ar. E Kindelve, um jogo de navegador cuja simulação dá a mesma resposta em qualquer aparelho, e cujo servidor prova uma pontuação do ranking rodando a partida de novo.',
    ],
    apps: 'Nossos apps no Marketplace',
    studio: 'O Estúdio de Jogos',
  },
  posts: {
    eyebrow: 'Do blog',
    headline: 'Anotações sobre construir software.',
    link: 'Todos os posts de desenvolvimento sob medida',
  },
  cta: {
    heading: 'Conte o que você anda contornando.',
    body: 'Descreva o trabalho que as suas ferramentas atuais deixam por fazer, em português, inglês ou espanhol. Quem responde é uma pessoa que constrói software, e não uma fila de vendas.',
    primary: 'Fale com a gente',
  },
} as const satisfies CustomDevCopy;
