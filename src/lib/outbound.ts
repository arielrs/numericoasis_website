/**
 * Attribution for links that leave the site.
 *
 * Every conversion this business has ends on a domain it does not own: the
 * Atlassian Marketplace listing, or the Jira Service Management portal. Nothing
 * in our own analytics can see what happens after the click, and the Marketplace
 * vendor console reports a referrer but cannot tell us which page or which
 * button sent the visitor.
 *
 * These parameters close that gap without a tag, a cookie or a consent prompt.
 * They are read by the destination, not by us, so they work from the first day
 * of ad spend and they keep working for organic and AI referral traffic that a
 * Google tag would never attribute at all.
 *
 * utm_source is the site rather than the medium, deliberately: paid traffic is
 * already separated by Google Ads auto-tagging on the way in, so what we need
 * here is which of OUR surfaces produced the exit, not which channel produced
 * the visit.
 */
type Slot =
  | 'app-card'
  | 'hero'
  | 'sticky'
  | 'footer-cta'
  | 'footer-nav'
  | 'doc-article'
  | 'doc-index'
  | 'focus-section'
  | 'support';

/**
 * @param url      the destination, absolute
 * @param campaign the page doing the sending, e.g. 'onbudget' or 'home'
 * @param slot     where on that page the link sits
 */
export function outbound(url: string, campaign: string, slot: Slot): string {
  // Never rewrite a link that already carries its own parameters, and never
  // touch a relative URL: both would silently corrupt the href.
  if (!/^https?:\/\//.test(url)) return url;

  const u = new URL(url);
  if (u.searchParams.has('utm_source')) return url;

  u.searchParams.set('utm_source', 'numericoasis');
  u.searchParams.set('utm_medium', 'site');
  u.searchParams.set('utm_campaign', campaign);
  u.searchParams.set('utm_content', slot);
  return u.toString();
}
