import type { Locale } from '../../config';
import { en, type ContactCopy } from './en';
import { ptBR } from './pt-BR';
import { es } from './es';

export const contact: Record<Locale, ContactCopy> = { en, 'pt-BR': ptBR, es };
