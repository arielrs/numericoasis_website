import type { Locale } from '../../config';
import { en, type CustomDevCopy } from './en';
import { ptBR } from './pt-BR';
import { es } from './es';

export const customDev: Record<Locale, CustomDevCopy> = { en, 'pt-BR': ptBR, es };
