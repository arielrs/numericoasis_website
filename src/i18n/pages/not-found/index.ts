import type { Locale } from '../../config';
import { en, type NotFoundCopy } from './en';
import { ptBR } from './pt-BR';
import { es } from './es';

export const notFound: Record<Locale, NotFoundCopy> = { en, 'pt-BR': ptBR, es };
