import { LOCALES, DEFAULT_LOCALE, type Locale } from './config';

const NON_DEFAULT = LOCALES.filter((l) => l !== DEFAULT_LOCALE);
const LOCALE_PREFIX_RE = new RegExp(`^/(?:${NON_DEFAULT.join('|')})(?=/|$)`);
const CONTENT_LOCALE_PREFIX_RE = new RegExp(`^(?:${LOCALES.join('|')})/`, 'i');

export function detectLangFromPath(pathname: string): Locale {
  const match = pathname.match(LOCALE_PREFIX_RE);
  if (match) {
    const candidate = match[0].slice(1) as Locale;
    if (LOCALES.includes(candidate)) return candidate;
  }
  return DEFAULT_LOCALE;
}

export function stripLocaleFromPath(pathname: string): string {
  const stripped = pathname.replace(LOCALE_PREFIX_RE, '');
  if (stripped === '' || stripped === '/') return '/';
  return stripped.startsWith('/') ? stripped : `/${stripped}`;
}

export function withLocale(lang: Locale, bare: string): string {
  const path = bare.startsWith('/') ? bare : `/${bare}`;
  if (lang === DEFAULT_LOCALE) return path;
  if (path === '/') return `/${lang}/`;
  return `/${lang}${path}`;
}

export function contentSlug(id: string): string {
  return id.replace(CONTENT_LOCALE_PREFIX_RE, '');
}
