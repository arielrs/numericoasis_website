/**
 * Submits the sitemap's URLs to IndexNow after a deploy.
 *
 * Consumed by Bing, Yandex, Seznam and Naver. Google does not use IndexNow. The
 * reason to bother is that Bing's index is what ChatGPT search reads, so this is
 * the shortest path from "published" to "an assistant can cite it".
 *
 * Lives in a file rather than inline in the workflow: the first version was an
 * inline shell block with jq and line continuations, and the escaping mangled
 * the YAML badly enough that GitHub could not parse the workflow at all, which
 * silently blocked every deploy.
 */
const SITE = 'https://numericoasis.com';
const key = process.env.INDEXNOW_KEY;

if (!key) {
  console.log('INDEXNOW_KEY is not set. Skipping.');
  process.exit(0);
}

const sitemap = await fetch(`${SITE}/sitemap-0.xml`);
if (!sitemap.ok) {
  console.error(`Could not read the sitemap: HTTP ${sitemap.status}`);
  process.exit(1);
}

const xml = await sitemap.text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).slice(0, 10000);

if (urlList.length === 0) {
  console.error('The sitemap contained no URLs. Not submitting.');
  process.exit(1);
}

console.log(`Submitting ${urlList.length} URLs to IndexNow.`);

const response = await fetch('https://api.indexnow.org/IndexNow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: 'numericoasis.com',
    key,
    keyLocation: `${SITE}/${key}.txt`,
    urlList,
  }),
});

// 200 is accepted, 202 is accepted with the key still being validated.
console.log(`IndexNow responded HTTP ${response.status}`);
if (response.status !== 200 && response.status !== 202) {
  console.error(await response.text());
  process.exit(1);
}
