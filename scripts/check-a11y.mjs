/**
 * Accessibility gate, axe-core driven.
 *
 * Replaces pa11y, which was giving a false all-clear. pa11y uses
 * HTML_CodeSniffer, and HTML_CodeSniffer silently skips any element whose
 * computed colour it cannot parse. Every colour on this site is `oklch()`, so
 * on a live run of /apps/ it produced 93 messages containing exactly ZERO
 * contrast pass/fail evaluations across ~200 text elements. It was hiding a
 * 2.55:1 failure on the only call to action on every app card.
 *
 * axe-core parses oklch(), and additionally carries two rules that caught real
 * defects here and that HTML_CodeSniffer has no equivalent for:
 *   - scrollable-region-focusable (the markdown table scrolled by mouse only)
 *   - aria-required-children     (a role="listbox" containing no options)
 *
 * Not wired into `prebuild`, deliberately: it needs a browser, and the build
 * gate is meant to stay fast. Run it before shipping anything that touches
 * markup or colour:
 *
 *     npx astro preview --port 4321   (in one shell)
 *     npm run a11y                    (in another)
 */
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const axeSource = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');

const BASE = process.env.A11Y_BASE ?? 'http://localhost:4321';

/** One per page shape, plus a non-English page, since copy length changes layout. */
const PAGES = [
  '/',
  '/onbudget/',
  '/apps/',
  '/apps/field-scout/',
  '/about/',
  '/contact/',
  '/blog/',
  '/blog/what-does-your-jira-work-actually-cost/',
  '/blog/tag/onbudget/',
  // The documentation is a page shape of its own: a sidebar, a breadcrumb
  // trail, an on-this-page rail, and 22,000 words of migrated tables.
  '/documentation/',
  '/documentation/onbudget/overview/',
  '/documentation/legal/terms/',
  // A group index: new route shape, and the sidebar toggle is new markup.
  '/documentation/onbudget/',
  // The landings collection is a new route template, not a variation on an
  // existing one, so both a default-locale and a prefixed-locale render.
  '/jira-cost-tracking-without-timesheets/',
  '/pt-BR/jira-cost-tracking-without-timesheets/',
  // The new long-form posts carry comparison tables, which the migrated
  // documentation did not have outside the docs section.
  '/blog/how-to-choose-a-cost-tracking-app-for-jira/',
  '/documentation/onbudget/what-onbudget-does-not-do/',
  // The privacy policy. It carries the Manage cookies control, and under
  // `npm run a11y:consent` it also carries the banner itself. Under a plain
  // run the banner is not in the build at all, because no tag id is set: see
  // scripts/a11y-consent.mjs.
  '/privacy/',
  '/pt-BR/privacy/',
  '/pt-BR/onbudget/',
  '/es/apps/atelier/',
  '/404.html',
];

/** Desktop and the narrow viewport, because the mobile menu is a different DOM. */
const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 375, height: 667 },
];

const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

const browser = await chromium.launch();
const failures = [];
let checked = 0;

for (const viewport of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
  });
  const page = await context.newPage();

  for (const path of PAGES) {
    const response = await page.goto(BASE + path, { waitUntil: 'networkidle' });
    if (!response || response.status() >= 400) {
      failures.push(`${path} [${viewport.name}]: HTTP ${response?.status() ?? 'no response'}`);
      continue;
    }

    // Settle the scroll reveals before scanning.
    //
    // axe reads computed style, so an element still at opacity 0 waiting for
    // an IntersectionObserver would be judged as invisible text and fail
    // colour contrast. Scrolling to the bottom and back triggers every
    // observer, which also makes this a truer audit: it measures the page a
    // reader actually ends up looking at, not just its first screen.
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.8;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      }
      window.scrollTo(0, 0);
    });
    // Long enough for the slowest choreography on the site to finish.
    //
    // Get this wrong and the gate fails intermittently on colour contrast,
    // because axe judges a half-revealed element as invisible text. The two
    // things it has to outlast:
    //   scroll reveal   900ms transition + up to 5 x 70ms group stagger = 1250ms
    //   hero entrance   1050ms delay + 450ms on the last element        = 1500ms
    //   queued reveal   2000ms hero window + 8 x 80ms batch order
    //                   + 350ms group stagger + 8 x 98ms words + 450ms = 4224ms
    // It used to wait 1200ms against a comment claiming a 700ms reveal, which
    // was already 50ms short of the real worst case and passing on luck. The
    // numbers above are the current ones: the hero choreography was cut by a
    // quarter, and the scroll reveal deliberately was not.
    await page.waitForTimeout(4600);

    // On mobile, open the menu so its contents are actually in the tree.
    if (viewport.name === 'mobile') {
      const toggle = page.locator('[aria-controls="mobile-menu"], button[aria-expanded]').first();
      if (await toggle.count()) await toggle.click().catch(() => {});
    }

    await page.evaluate(axeSource);
    const results = await page.evaluate(
      (tags) => window.axe.run(document, { runOnly: { type: 'tag', values: tags } }),
      TAGS,
    );

    checked += 1;
    for (const violation of results.violations) {
      for (const node of violation.nodes) {
        failures.push(
          `${path} [${viewport.name}] ${violation.id} (${violation.impact})\n` +
            `      ${violation.help}\n` +
            `      ${node.target.join(' ')}\n` +
            `      ${(node.failureSummary ?? '').split('\n').slice(1, 3).join(' ').trim()}`,
        );
      }
    }
  }

  await context.close();
}

await browser.close();

if (failures.length) {
  console.error(`\ncheck-a11y failed (${failures.length}):\n${failures.map((f) => `  x ${f}`).join('\n')}\n`);
  process.exit(1);
}
console.log(`check-a11y: ${checked} page renders clean against ${TAGS.join(', ')}`);
