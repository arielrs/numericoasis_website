import type { Locale } from '../../config';
import { en, type BlogCopy } from './en';
import { ptBR } from './pt-BR';
import { es } from './es';

export const blog: Record<Locale, BlogCopy> = { en, 'pt-BR': ptBR, es };
