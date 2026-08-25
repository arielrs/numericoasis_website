/**
 * Resolves the Open Graph image and its real dimensions.
 *
 * SEO.astro used to hardcode og:image:width/height to 1731x909, which is
 * correct only for the default LinkedIn card and wrong for every blog hero,
 * since those are passed through at 1200px wide.
 */
import { getImage } from 'astro:assets';
import { SITE } from '../consts';
import type { OgImage } from './schema';

const DEFAULT_OG: OgImage = {
  url: `${SITE.url}/og/linkedin_logo.jpg`,
  width: 1731,
  height: 909,
};

export async function resolveOgImage(image?: ImageMetadata | string): Promise<OgImage> {
  if (!image) return DEFAULT_OG;

  if (typeof image === 'string') {
    // A path into public/, whose dimensions we cannot read at build time.
    return { ...DEFAULT_OG, url: new URL(image, SITE.url).toString() };
  }

  // Derived from the source rather than read back off getImage: its `options`
  // do not carry the height Astro computes, and a wrong og:image:height is
  // exactly the bug this helper exists to fix.
  const width = Math.min(1200, image.width);
  const height = Math.round((image.height / image.width) * width);

  // jpg deliberately: several social scrapers still fail on webp and avif.
  const out = await getImage({ src: image, width, height, format: 'jpg' });

  return { url: new URL(out.src, SITE.url).toString(), width, height };
}
