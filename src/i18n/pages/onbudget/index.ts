import type { Locale } from '../../config';
import { en, type OnBudgetCopy } from './en';
import { ptBR } from './pt-BR';
import { es } from './es';

export const onbudget: Record<Locale, OnBudgetCopy> = { en, 'pt-BR': ptBR, es };
