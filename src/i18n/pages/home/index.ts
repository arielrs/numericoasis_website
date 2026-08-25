import type { Locale } from '../../config';
import { en, type HomeCopy } from './en';
import { ptBR } from './pt-BR';
import { es } from './es';

export const home: Record<Locale, HomeCopy> = { en, 'pt-BR': ptBR, es };
