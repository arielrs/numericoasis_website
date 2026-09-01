---
lang: es
translationKey: jira-cost-tracking-without-timesheets
title: "Control de costes en Jira sin partes de horas"
metaTitle: "Control de costes en Jira sin partes de horas"
description: "Costea el trabajo de Jira sin pedirle a nadie que registre horas. OnBudget pone precio a una señal que tu equipo ya produce: elementos de trabajo cerrados o resueltos, elementos parados en los estados que elijas, o un campo numérico ya existente, y lo sigue contra un presupuesto."
metaDescription: "Costea el trabajo de Jira sin partes de horas. Pon precio a elementos cerrados, a un estado o a un campo numérico y sigue el presupuesto con pronóstico."
eyebrow: "Control de costes en Jira"
app: "onbudget"
updatedDate: 2026-09-01
draft: false
---
Puedes costear el trabajo de Jira sin ningún parte de horas. En lugar de deducir el gasto de unas horas que alguien escribió, pon precio a una señal que tu equipo ya produce: elementos de trabajo cerrados o resueltos, con precio por elemento; elementos de trabajo parados en los estados que elijas, con precio por elemento; o un campo numérico ya existente, con precio por unidad. Eso es lo que hace OnBudget. Fijas un presupuesto y una moneda, eliges una de esas señales y obtienes presupuestado frente a real, un estado de salud y un pronóstico lineal. Nadie registra nada nuevo, no se crea ningún campo personalizado y nada cambia en tu Jira.

## Para quién es esta página

Equipos de marketing, soporte y operaciones que tienen presupuesto y nunca han usado puntos de historia ni worklogs. El trabajo ya está en Jira: las solicitudes, las campañas, los tickets, todo registrado, en estados, con fechas. Lo que no está registrado es el dinero, y la forma habitual de añadirlo es pedirle al equipo que empiece a registrar horas.

Si tienes que decir cuánto costó una campaña o un trimestre de soporte, y tu equipo no va a rellenar partes de horas, esta página es la otra ruta.

## Por qué el consejo habitual no encaja

El control de costes, control de costos en buena parte de América Latina, deduce normalmente el gasto de las horas registradas: horas por una tarifa. La condición previa está incorporada al método. Alguien tiene que registrar las horas, cada día, con precisión, y seguir haciéndolo. Donde ese hábito ya existe es el método preferible, porque una tarifa por hora es más fina que cualquier recuento, y OnBudget pone precio a los worklogs con tarifarios precisamente para ese caso.

Donde el hábito no existe, el método no se degrada con elegancia. Produce un número que refleja quién se acordó de registrar, no quién hizo el trabajo, y no puede decir nada del trimestre pasado, porque los datos empiezan el día en que empieza el hábito. Así que mira lo que tu Jira ya guarda.

## Señal uno: elementos de trabajo cerrados o resueltos, con precio por elemento

OnBudget cuenta los elementos de trabajo cerrados o resueltos dentro del alcance que has definido y pone precio a cada uno.

Un ejemplo trabajado, con cifras ilustrativas. Un equipo de soporte costó 170.000 euros el trimestre pasado y cerró 340 tickets, así que un ticket costó unos 500 euros. Pon precio a los elementos cerrados a 500 euros y el informe sigue el gasto contra el presupuesto a partir de ahí. O deja el coste unitario en blanco y OnBudget reparte él mismo el presupuesto total entre la cantidad total.

Una media por elemento es defendible cuando los elementos son comparables: un tipo de trabajo, un equipo, un tipo de solicitud. Las colas de soporte, las tareas de campaña y las solicitudes de cambio suelen cumplirlo. No es defendible cuando un elemento es corregir una errata y el siguiente es una migración de tres semanas: promediar entre esos dos produce un número seguro de sí mismo que no significa nada. La solución es el alcance, no el método. Estrecha el informe hasta que los elementos se parezcan, y ejecuta varios en lugar de uno.

## Señal dos: elementos de trabajo parados en los estados que elijas, con precio por elemento

El segundo recuento pone precio a los elementos de trabajo por el estado en el que están ahora, para los estados que elijas. Costea el trabajo en curso, no el trabajo terminado.

Eso responde a otra pregunta. No cuánto hemos gastado, sino cuánto está comprometido ahora mismo. Cuarenta elementos parados en En curso y En revisión, con precio por elemento, son el valor que está atado en vuelo en este momento, y vigilados semana a semana muestran si ese compromiso crece.

Léelo por lo que es: una foto del presente, no del esfuerzo transcurrido. Pone precio a la etapa, no a la duración.

## Señal tres: un campo numérico ya existente, con precio por unidad

Si alguien de tu equipo ya escribe una cantidad en un campo, eso es una señal de coste. Licencias solicitadas, puestos, unidades enviadas, horas cotizadas, tiradas de impresión. Apunta OnBudget al campo, dale un coste por unidad y lo valora. Suele ser la más precisa de las tres: un número que una persona ha escrito a propósito casi siempre significa algo concreto. El riesgo es que los campos opcionales tienden a estar medio vacíos, y para eso está la sección siguiente.

## Comprueba la cobertura antes de comprometerte

Antes de construir el informe, OnBudget muestrea tus datos reales y te dice qué proporción de tus elementos de trabajo lleva cada señal. Tres métodos medidos sobre los mismos datos pueden puntuar de forma muy distinta, y los ves todos uno al lado del otro antes de elegir.

El fallo habitual no es elegir el método equivocado. Es elegir uno, construir sobre él y descubrir una semana después que la mitad de los elementos no lleva ningún valor, así que la mitad del trabajo se valoró a cero y el presupuesto parecía sano. La cobertura pone ese descubrimiento antes del trabajo y no después. Lee las cifras al pie de la letra: un 47 por ciento significa que menos de la mitad de los elementos del alcance llevan un valor. Estrecha el alcance hasta que la cobertura sea alta, o costea la señal que puntúe más alto.

## Cuatro pasos, y una vista previa antes de guardar

El constructor tiene cuatro pasos. Elige de dónde salen los números: proyectos enteros, que Jira ahora llama spaces, o elementos de trabajo elegidos por clave, prefijo o texto del resumen, o una consulta JQL validada mientras escribes, con un interruptor para incluir subtareas y todo lo que cuelga de un epic. Define el presupuesto, la moneda y los dos umbrales. Elige el método de coste, con la cobertura a la vista antes de elegir. Añade un periodo y un horizonte de previsión, y después revisa la vista previa del informe entero y vuelve a generarlo hasta que cuadre, antes de guardar nada.

No hay ningún paso en el que configures Jira, porque no hay nada que configurar. Esa es la diferencia entre que un primer informe lleve minutos y que lleve una solicitud de cambio.

## Cómo leer el resultado

Presupuestado frente a real, en una de 18 monedas, con formatos de número, decimal y fecha definidos por informe. Dos umbrales deciden cuándo un informe pasa a ámbar y cuándo pasa a rojo. En riesgo viene por defecto al 80 por ciento del presupuesto consumido, y por encima del presupuesto al 100 por ciento, y los dos son tuyos para cambiarlos. El estado de riesgo también se activa cuando la previsión proyecta un sobrecoste, aunque una previsión por sí sola nunca pone un informe en rojo. Gobiernan la etiqueta de salud, el color del medidor y el orden de la pantalla de inicio, así que los informes que piden atención suben a lo alto de una lista larga.

El pronóstico es un ritmo lineal a partir del gasto registrado hasta ahora, proyectado hasta la fecha de fin del informe, o a 30, 60 o 90 días vista, o apagado. Dice qué pasa si se mantiene el ritmo actual.

Cada informe lleva una fila de parámetros que detalla el alcance, el método y la moneda exactos que hay detrás del número. Haz clic en una barra o en una porción de un desglose y los elementos de trabajo correspondientes se abren en Jira. El desglose elemento a elemento que hay tras los totales se exporta a CSV, generado en tu navegador.

## A qué renuncias

Una media por elemento es más tosca que una tarifa por hora. Es una media, así que acierta sobre un conjunto de elementos y se equivoca sobre cualquiera en concreto. Si necesitas el coste de una pieza de trabajo específica, esto no te lo va a dar.

No puede decirte quién gastó el tiempo. Un recuento conoce el elemento, no el esfuerzo que hay detrás ni la persona que lo puso, así que no hay desglose por persona sin worklogs.

No puede ver el esfuerzo que no generó ningún elemento de trabajo. El trabajo que nadie registró es invisible aquí, exactamente igual que es invisible en Jira.

OnBudget no registra tiempo. No es una herramienta de control horario. Lee lo que haya acabado en los worklogs de Jira y le pone precio. No hace facturación ni seguimiento de ingresos, y no convierte entre monedas, deliberadamente, porque un tipo de cambio inventado es peor que ningún tipo de cambio.

Si en tu organización ya funciona la disciplina de los partes de horas, úsala y pon precio a los worklogs. Si no funciona, un recuento que puedes defender vale más que una cifra por hora que nadie ha rellenado.

## Requisitos y encaje

OnBudget es una app para Jira Cloud y da soporte a Jira Service Management. Está construida sobre Atlassian Forge, así que es solo Cloud: no hay versión para Data Center ni para Server, y funcionar por completo sobre Forge es lo que la hace elegible para el programa Runs on Atlassian.

Pide read:jira-work, read:jira-user y storage:app. Solo lectura sobre Jira: ningún campo personalizado nuevo, ningún cambio en el esquema de pantallas, nada escrito de vuelta. Guarda la configuración de tus informes y nada más, nunca el contenido de los elementos de trabajo y nunca el resultado de un informe, y desinstalarla borra todo lo que guardaba. La interfaz está en inglés, portugués y español. OnBudget es de pago, con prueba gratuita, en el Atlassian Marketplace.

## Pruébalo con tus propios datos

Como es de solo lectura, el coste de averiguarlo es una prueba gratuita y una comprobación de cobertura. Construye un informe sobre un espacio, mira la cobertura antes de comprometerte con un método, y decide si el número que produce es uno que defenderías.

[Empieza la prueba gratuita en el Atlassian Marketplace](https://marketplace.atlassian.com/apps/2136850574/onbudget-cost-tracking-budget-reports-for-jira?utm_source=numericoasis&utm_medium=site&utm_campaign=jira-cost-tracking-without-timesheets&utm_content=hero)
