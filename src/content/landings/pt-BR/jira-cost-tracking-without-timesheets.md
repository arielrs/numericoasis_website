---
lang: pt-BR
translationKey: jira-cost-tracking-without-timesheets
title: "Controle de custos no Jira sem apontamento de horas"
metaTitle: "Controle de custos no Jira sem timesheets"
description: "Custeie o trabalho no Jira sem pedir que ninguém aponte horas. O OnBudget precifica um sinal que o seu time já produz: itens de trabalho concluídos ou resolvidos, itens parados nos status que você escolher, ou um campo numérico já existente, e acompanha isso contra um orçamento."
metaDescription: "Custeie o trabalho no Jira sem timesheet. Precifique itens concluídos, itens em um status ou um campo numérico e acompanhe orçado versus real com previsão."
eyebrow: "Controle de custos no Jira"
app: "onbudget"
updatedDate: 2026-09-01
draft: false
---
Dá para custear o trabalho no Jira sem nenhum timesheet. Em vez de derivar o gasto de horas que alguém digitou, precifique um sinal que o seu time já produz: itens de trabalho concluídos ou resolvidos, precificados por item; itens de trabalho parados nos status que você escolher, precificados por item; ou um campo numérico já existente, precificado por unidade. É isso que o OnBudget faz. Você define um orçamento e uma moeda, escolhe um desses sinais e recebe orçado versus real, um status de saúde e uma previsão linear. Ninguém registra nada novo, nenhum campo personalizado é criado e nada no seu Jira muda.

## Para quem é esta página

Times de marketing, suporte e operações que têm orçamento e nunca usaram pontos de história nem worklogs. O trabalho já está no Jira: as solicitações, as campanhas, os chamados, tudo registrado, em status, com datas. O que não está registrado é o dinheiro, e o jeito de sempre de acrescentá-lo é pedir que o time comece a apontar horas.

Se você precisa dizer quanto custou uma campanha ou um trimestre de suporte, e o seu time não vai preencher timesheet, esta página é o outro caminho.

## Por que o conselho de sempre não serve aqui

Controle de custos normalmente deriva o gasto das horas apontadas: horas multiplicadas por uma taxa. A pré-condição está embutida no método. Alguém precisa apontar as horas, todo dia, com precisão, e continuar apontando. Onde esse hábito já existe, ele é o método preferível, porque uma taxa horária é mais fina do que qualquer contagem, e o OnBudget precifica worklogs com tabelas de valores exatamente para esse caso.

Onde o hábito não existe, o método não degrada com elegância. Ele produz um número que reflete quem lembrou de apontar, e não quem fez o trabalho, e não tem nada a dizer sobre o trimestre passado, porque os dados começam no dia em que o hábito começa. Então olhe para o que o seu Jira já guarda.

## Sinal um: itens de trabalho concluídos ou resolvidos, precificados por item

O OnBudget conta os itens de trabalho concluídos ou resolvidos dentro do escopo que você definiu e coloca um preço em cada um.

Um exemplo prático, com números ilustrativos. Um time de suporte custou R$ 170.000 para operar no último trimestre e fechou 340 chamados, então cada chamado custou aproximadamente R$ 500. Precifique itens concluídos a R$ 500 e o relatório passa a acompanhar o gasto contra o orçamento dali em diante. Ou deixe o custo unitário em branco, e o próprio OnBudget divide o orçamento total pela quantidade total.

Uma média por item é defensável quando os itens são comparáveis: um tipo de trabalho, um time, um tipo de solicitação. Filas de suporte, tarefas de campanha e solicitações de mudança normalmente se qualificam. Ela não é defensável quando um item de trabalho é a correção de um erro de digitação e o seguinte é uma migração de três semanas: tirar a média entre esses dois produz um número confiante que não significa nada. A correção é o escopo, não o método. Estreite o relatório até que os itens sejam parecidos, e rode vários em vez de um só.

## Sinal dois: itens de trabalho parados nos status que você escolher, precificados por item

A segunda contagem precifica itens de trabalho pelo status em que eles estão agora, para os status que você escolher. Ela custeia trabalho em andamento, e não trabalho terminado.

Isso responde a outra pergunta. Não quanto gastamos, mas quanto está comprometido neste momento. Quarenta itens parados em Em andamento e Aguardando revisão, precificados por item, são o valor preso em voo agora, e acompanhados semana a semana mostram se esse comprometimento está crescendo.

Leia pelo que é: um retrato do presente, não do esforço decorrido. Ela precifica a etapa, não a duração.

## Sinal três: um campo numérico já existente, precificado por unidade

Se alguém do seu time já digita uma quantidade em um campo, isso é um sinal de custo. Licenças solicitadas, assentos, unidades enviadas, horas cotadas, tiragens de impressão. Aponte o OnBudget para o campo, dê a ele um custo por unidade, e ele precifica. Esse costuma ser o mais preciso dos três: um número que uma pessoa digitou de propósito quase sempre significa alguma coisa específica. O risco é que campos opcionais tendem a ficar metade vazios, e é para isso que serve a próxima seção.

## Confira a cobertura antes de se comprometer

Antes de você montar o relatório, o OnBudget amostra os seus dados reais e diz que fatia dos seus itens de trabalho carrega cada sinal. Três métodos medidos sobre os mesmos dados podem pontuar de forma bem diferente, e você vê todos lado a lado antes de escolher.

O modo de falha mais comum não é escolher o método errado. É escolher um, construir em cima dele e descobrir uma semana depois que metade dos itens não carrega valor nenhum, ou seja, metade do trabalho foi precificada como zero e o orçamento parecia saudável. A cobertura coloca essa descoberta antes do trabalho, e não depois. Leia os números ao pé da letra: 47 por cento significa que menos da metade dos itens no escopo carrega um valor. Estreite o escopo até a cobertura ficar alta, ou custeie o sinal que pontuar mais alto.

## Quatro passos, e uma prévia antes de salvar

O construtor tem quatro passos. Escolha de onde vêm os números: projetos inteiros, que o Jira agora chama de spaces, ou itens de trabalho escolhidos por chave, prefixo ou texto do resumo, ou uma consulta JQL validada enquanto você digita, com um botão para puxar sub-tarefas e tudo que está sob um epic. Defina o orçamento, a moeda e os dois limites. Escolha o método de custo, com a cobertura mostrada antes da escolha. Adicione um período e um horizonte de previsão, depois veja a prévia do relatório inteiro e gere de novo até ficar certo, antes de salvar qualquer coisa.

Não existe um passo em que você configura o Jira, porque não há nada para configurar. É essa a diferença entre um primeiro relatório levar minutos e um primeiro relatório levar uma solicitação de mudança.

## Como ler o resultado

Orçado versus real, em uma de 18 moedas, com formatos de número, de decimal e de data definidos por relatório. Dois limites decidem quando um relatório fica âmbar e quando fica vermelho. Em risco vem por padrão em 80 por cento do orçamento consumido, e acima do orçamento em 100 por cento, e os dois são seus para mudar. O status de risco também sobe quando a previsão projeta um estouro, embora uma previsão sozinha nunca deixe um relatório vermelho. Eles comandam a etiqueta de saúde, a cor do medidor e a ordenação da tela inicial, então os relatórios que precisam de atenção sobem para o topo de uma lista longa.

A previsão é um ritmo linear a partir do gasto registrado até agora, projetado até a data final do relatório, ou para 30, 60 ou 90 dias à frente, ou desligada. Ela diz o que acontece se o ritmo atual se mantiver.

Todo relatório traz uma linha de parâmetros que explicita o escopo, o método e a moeda por trás do número. Clique em uma barra ou em uma fatia de um detalhamento e os itens de trabalho correspondentes abrem no Jira. O detalhamento item a item por trás dos totais sai em CSV, gerado no seu navegador.

## Do que você abre mão

Uma média por item é mais grosseira do que uma taxa horária. Ela é uma média, então está certa para um conjunto de itens e errada sobre qualquer item isolado. Se você precisa do custo de uma peça específica de trabalho, isto aqui não vai dar.

Ela não sabe dizer quem gastou o tempo. Uma contagem conhece o item, não o esforço por trás dele nem a pessoa que o forneceu, então não existe detalhamento por pessoa sem worklogs.

Ela não enxerga esforço que não gerou item de trabalho. Trabalho que ninguém registrou é invisível aqui, exatamente como é invisível no Jira.

O OnBudget não registra tempo. Ele não é uma ferramenta de apontamento de horas. Ele lê o que foi parar nos worklogs do Jira e coloca preço nisso. Não faz faturamento nem acompanhamento de receita, e não converte entre moedas, deliberadamente, porque uma taxa de câmbio inventada é pior do que nenhuma taxa de câmbio.

Se a disciplina de timesheet já funciona na sua organização, use-a e precifique os worklogs. Se ela não funciona, uma contagem que você consegue defender vale mais do que um número por hora que ninguém preencheu.

## Requisitos e encaixe

O OnBudget é um app para Jira Cloud e também atende o Jira Service Management. Ele é construído sobre o Atlassian Forge, então é só Cloud: não existe versão para Data Center nem para Server, e rodar inteiramente no Forge é o que o torna elegível para o programa Runs on Atlassian.

Ele pede read:jira-work, read:jira-user e storage:app. Somente leitura no Jira: nenhum campo personalizado novo, nenhuma alteração em esquema de telas, nada gravado de volta. Ele guarda a configuração dos seus relatórios e nada mais, nunca o conteúdo dos itens de trabalho e nunca o resultado de um relatório, e desinstalar apaga tudo o que ele guardava. A interface está em inglês, português e espanhol. O OnBudget é pago, com teste gratuito, no Atlassian Marketplace.

## Teste com os seus próprios dados

Como ele é somente leitura, o custo de descobrir é um teste gratuito e uma conferência de cobertura. Monte um relatório sobre um espaço, olhe a cobertura antes de se comprometer com um método, e decida se o número que ele produz é um número que você defenderia.

[Comece o teste gratuito no Atlassian Marketplace](https://marketplace.atlassian.com/apps/2136850574/onbudget-cost-tracking-budget-reports-for-jira?utm_source=numericoasis&utm_medium=site&utm_campaign=jira-cost-tracking-without-timesheets&utm_content=hero)
