#!/usr/bin/env node
/**
 * shot — the visual pass, as a person would see it.
 *
 * The device sweep shoots immediately, so every `loading="lazy"` image below the
 * fold is still `complete:false` and paints nothing: those shots are for the
 * probe, not for looking at. This one scrolls the whole page in steps, waits for
 * every image to decode, returns to the top and then captures, so a hole in the
 * picture is a real hole.
 *
 *   node tools/shot.mjs variants/v1/index.html 1440 900 [--motion]
 */
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

async function loadChromium() {
  const t = async (s) => { try { const m = await import(s); return m?.chromium ?? m?.default?.chromium ?? null; } catch { return null; } };
  for (const m of ['playwright', 'playwright-core']) { const c = await t(m); if (c) return c; }
  const cands = [];
  try { cands.push(path.join(execSync('npm root -g', { encoding: 'utf8' }).trim(), 'playwright')); } catch {}
  const n = path.join(process.env.HOME || '', '.npm', '_npx');
  if (fs.existsSync(n)) for (const h of fs.readdirSync(n)) for (const m of ['playwright', 'playwright-core']) cands.push(path.join(n, h, 'node_modules', m));
  for (const d of cands) { if (!fs.existsSync(d)) continue; const c = await t(pathToFileURL(path.join(d, 'index.js')).href); if (c) return c; }
  throw new Error('playwright not found');
}

const [rel, w = '1440', h = '900'] = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const motion = process.argv.includes('--motion');
const chromium = await loadChromium();
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: +w, height: +h },
  deviceScaleFactor: 1,
  reducedMotion: motion ? 'no-preference' : 'reduce',
});
await page.goto(pathToFileURL(path.resolve(rel)).href, { waitUntil: 'load' });
await page.evaluate(async () => {
  const step = Math.round(innerHeight * 0.8);
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    scrollTo({ top: y, behavior: 'instant' });
    await new Promise((r) => setTimeout(r, 60));
  }
  await Promise.all([...document.images].map((i) => i.decode().catch(() => {})));
  scrollTo({ top: 0, behavior: 'instant' });
  await new Promise((r) => setTimeout(r, 200));
});
const shots = path.resolve('shots');
fs.mkdirSync(shots, { recursive: true });
const name = rel.replace(/[\/]/g, '-').replace(/\.html$/, '') + `--${w}x${h}${motion ? '-motion' : ''}.png`;
await page.screenshot({ path: path.join(shots, name), fullPage: true });
console.log(path.join('shots', name));
await browser.close();
