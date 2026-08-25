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

/** Per-locale URL overrides for a page whose paths are not simple mirrors. */
export type LocaleAlternates = Partial<Record<Locale, string>>;

/**
 * The URL of the current page in every locale.
 *
 * The default assumes mirrored slugs, which holds for every page on the site.
 * Pages that cannot mirror pass an override: the shared 404, which exists at one
 * URL but stands in for all three, and later any content entry whose slug is
 * translated. Without the override a page would advertise `hreflang` alternates
 * that 404, and the language switcher would send visitors to a dead end.
 */
export function localeUrls(
  pathname: string,
  override?: LocaleAlternates,
): Record<Locale, string> {
  const bare = stripLocaleFromPath(pathname);
  return Object.fromEntries(
    LOCALES.map((l) => [l, override?.[l] ?? withLocale(l, bare)]),
  ) as Record<Locale, string>;
}
