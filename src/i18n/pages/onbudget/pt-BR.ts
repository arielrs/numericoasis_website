import type { OnBudgetCopy } from './en';

export const ptBR = {
  meta: {
    crumb: 'OnBudget',
    title: 'OnBudget: orçamento e relatórios de custo no Jira',
  },
  hero: {
    eyebrow: 'App do Atlassian Marketplace para Jira Cloud',
    headline: 'Orçamento e relatórios de custo no Jira, para finanças e PMO.',
    lede: 'O OnBudget transforma em dinheiro o trabalho que seu time já registra no Jira. Antes de qualquer coisa ele analisa uma amostra dos seus dados e mostra que parcela dos work items carrega cada sinal de custo, para você descobrir que a cobertura de apontamentos é baixa antes de montar um orçamento em cima dela.',
    ctaSecondary: 'Veja como um relatório é montado',
  },
  problem: { eyebrow: 'A lacuna' },
  steps: {
    eyebrow: 'Como funciona',
    headline: 'Quatro passos de um espaço do Jira até um orçamento que você consegue defender.',
  },
  methods: {
    eyebrow: 'Custeio',
    headline: 'Escolha o sinal que seu time já produz.',
    lede: 'A parte difícil de custear trabalho no Jira não é a aritmética. É que cada time mede uma coisa diferente, e metade deles não mede nada. O OnBudget analisa seus dados e mostra qual porcentagem dos seus itens de trabalho carrega cada sinal, antes de você construir qualquer coisa em cima disso.',
  },
  dashboard: {
    eyebrow: 'Painéis',
    headline: 'O painel é seu para reorganizar.',
    lede: 'Nove tipos de gadget, cada um com seus formatos de gráfico. Arraste um para outra posição, redimensione pelo canto, clone, remova, ou alterne entre barra, linha, área, pizza, rosca, tabela e número puro. Salve o layout quando ele passar a fazer sentido para você.',
  },
  sharing: {
    eyebrow: 'Compartilhamento',
    headline: 'Um relatório compartilhado respeita quem lê, não quem criou.',
    body: 'A maioria das ferramentas de relatório entrega uma fotografia do que o autor conseguia ver. O OnBudget não faz isso. Quando alguém abre um relatório que você compartilhou, ele é recalculado com as permissões do Jira dessa pessoa, então ninguém vê itens de trabalho que já não pudesse abrir no Jira. Se quem está lendo não tem acesso a parte do escopo, o relatório avisa em vez de simplesmente mostrar um número menor.',
  },
  scale: {
    eyebrow: 'Em escala',
    headline: 'Feito para o centésimo relatório, não para o primeiro.',
    lede: 'Uma ferramenta de orçamento é fácil de gostar com três relatórios abertos e difícil de conviver com cinquenta. É isto que o app oferece depois que o portfólio cresce.',
  },
  security: {
    eyebrow: 'Segurança e dados',
    headline: 'Somente leitura, e tudo permanece dentro da Atlassian.',
    scopes: 'Permissões solicitadas',
  },
  languages: {
    eyebrow: 'Idiomas',
    headline: 'Ele fala o idioma em que seu time presta contas.',
    body: 'Toda a interface está disponível em inglês, português e espanhol, e cada relatório carrega sua própria moeda, seu formato de número e seu formato de data. Um orçamento em reais é lido como um orçamento em reais, e não como uma planilha americana com os separadores trocados.',
  },
  faq: {
    eyebrow: 'Perguntas',
    headline: 'O que as pessoas perguntam antes de instalar.',
  },
  cta: {
    headline: 'Instale, ou tire uma dúvida antes.',
    body: 'Ele está no Atlassian Marketplace com período de teste gratuito, e é lá que ficam os preços atuais. Se preferir conversar, atendemos em inglês, português e espanhol.',
    primary: 'Instalar pelo Atlassian Marketplace',
    secondary: 'Tirar uma dúvida',
  },
  alsoSee: {
    eyebrow: 'Nossos outros apps',
    headline: 'O resto do que fazemos.',
    link: 'Ver todos os nossos apps',
  },
} as const satisfies OnBudgetCopy;
