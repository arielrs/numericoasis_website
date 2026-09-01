import type { Locale } from '../../config';
import { en, type PrivacyCopy } from './en';
import { ptBR } from './pt-BR';
import { es } from './es';

export const privacy: Record<Locale, PrivacyCopy> = { en, 'pt-BR': ptBR, es };
