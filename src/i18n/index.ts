import { en, type Dictionary } from './en';
import { ptBR } from './pt-BR';
import { es } from './es';
import { DEFAULT_LOCALE, type Locale } from './config';

export type { Dictionary };

const dicts: Record<Locale, Dictionary> = {
  en,
  'pt-BR': ptBR,
  es,
};

export function useTranslations(lang: Locale): Dictionary {
  return dicts[lang] ?? dicts[DEFAULT_LOCALE];
}

export * from './config';
export * from './paths';
