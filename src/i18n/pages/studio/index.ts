import type { Locale } from '../../config';
import { en, type StudioCopy } from './en';
import { ptBR } from './pt-BR';
import { es } from './es';

export const studio: Record<Locale, StudioCopy> = { en, 'pt-BR': ptBR, es };
