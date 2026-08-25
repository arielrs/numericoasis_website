import type { Locale } from '../../config';
import { en, type AppsIndexCopy } from './en';
import { ptBR } from './pt-BR';
import { es } from './es';

export const appsIndex: Record<Locale, AppsIndexCopy> = { en, 'pt-BR': ptBR, es };
