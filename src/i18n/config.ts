export const LOCALES = ['en', 'pt-BR', 'es'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

export const OG_LOCALE_MAP: Record<Locale, string> = {
  en: 'en_US',
  'pt-BR': 'pt_BR',
  es: 'es_ES',
};

export const HTML_LANG_MAP: Record<Locale, string> = {
  en: 'en',
  'pt-BR': 'pt-BR',
  es: 'es',
};

export const BCP47_MAP: Record<Locale, string> = {
  en: 'en-US',
  'pt-BR': 'pt-BR',
  es: 'es-ES',
};

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'EN',
  'pt-BR': 'PT',
  es: 'ES',
};

export const LOCALE_FULL_LABELS: Record<Locale, string> = {
  en: 'English',
  'pt-BR': 'Português (Brasil)',
  es: 'Español',
};
