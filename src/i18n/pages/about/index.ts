import type { Locale } from '../../config';
import { en, type AboutCopy } from './en';
import { ptBR } from './pt-BR';
import { es } from './es';

export const about: Record<Locale, AboutCopy> = { en, 'pt-BR': ptBR, es };
