/**
 * Accessibility gate with the consent banner forced on.
 *
 * The banner renders only when a Google tag id exists, and the shipped default
 * is empty, so the ordinary `npm run a11y` cannot reach it: it scans a build
 * where the markup was never emitted. The gate's own page list carried a
 * comment claiming otherwise, which is worse than no coverage, because it reads
 * as coverage.
 *
 * This rebuilds with A11Y_FORCE_CONSENT=1, which emits the banner and its
 * script and no tag, then runs the same axe pass over it. Once real ids are
 * pasted into src/consts.ts the ordinary gate covers the banner on every build
 * and this stops being necessary.
 *
 * A tiny runner rather than a dependency: npm scripts on Windows go through
 * cmd.exe, where `VAR=1 command` is not a thing.
 */
import { spawnSync } from 'node:child_process';

const env = { ...process.env, A11Y_FORCE_CONSENT: '1' };
const run = (cmd, args) =>
  spawnSync(cmd, args, { stdio: 'inherit', env, shell: process.platform === 'win32' });

console.log('Building with the consent banner forced on...');
const build = run('npx', ['astro', 'build']);
if (build.status !== 0) process.exit(build.status ?? 1);

const gate = run('node', ['scripts/check-a11y.mjs']);
process.exit(gate.status ?? 1);
