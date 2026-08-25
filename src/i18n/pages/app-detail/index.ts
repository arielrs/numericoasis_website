import type { Locale } from '../../config';
import { en, type AppDetailCopy } from './en';
import { ptBR } from './pt-BR';
import { es } from './es';

export const appDetail: Record<Locale, AppDetailCopy> = { en, 'pt-BR': ptBR, es };
