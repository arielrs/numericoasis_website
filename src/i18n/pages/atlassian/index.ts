import type { Locale } from '../../config';
import { en, type AtlassianCopy } from './en';
import { ptBR } from './pt-BR';
import { es } from './es';

export const atlassian: Record<Locale, AtlassianCopy> = { en, 'pt-BR': ptBR, es };
