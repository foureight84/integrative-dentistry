#!/usr/bin/env node
/**
 * thumbs — one gallery thumbnail per variant, from the real page.
 *
 * Shot at the design base (1440x900), first fold only, reduced motion forced so
 * entrances are settled. Written straight to JPEG at 1x: an earlier version shot
 * at 2x and re-encoded through a canvas in a second page, which meant pushing a
 * multi-megabyte base64 PNG across the browser bridge per variant and stalled.
 * The screenshot is already the encode.
 *
 * Waits only on in-fold images: see the decode() note in the loop.
 *
 *   node tools/thumbs.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

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

const variants = fs.readdirSync(path.join(ROOT, 'variants')).filter((d) => /^v\d+$/.test(d)).sort();
const chromium = await loadChromium();
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });

for (const id of variants) {
  if (process.stdout.isTTY) process.stdout.write(`${id}  ...`);
  // domcontentloaded, never 'load': one variant attaches a video to its closing
  // fold, and a page waiting on media never settles.
  await page.goto(pathToFileURL(path.join(ROOT, 'variants', id, 'index.html')).href, { waitUntil: 'domcontentloaded', timeout: 20000 });
  // decode() on a below-fold loading="lazy" image never settles: the browser has
  // not started that fetch and will not while the image stays out of view, and
  // page.evaluate carries no timeout of its own, so awaiting it hangs the run
  // forever with nothing printed. The thumbnail is the first fold only, so wait
  // on the images in the fold -- the ones that actually load -- and cap even
  // those, in case one is a broken src that neither resolves nor rejects.
  await page.evaluate(async () => {
    const capped = (p, ms) => Promise.race([p, new Promise((r) => setTimeout(r, ms))]);
    const inFold = [...document.images].filter((i) => i.getBoundingClientRect().top < innerHeight);
    await capped(Promise.all(inFold.map((i) => i.decode().catch(() => {}))), 5000);
    await new Promise((r) => setTimeout(r, 400));
  });
  const file = path.join(ROOT, 'assets', 'derived', `thumb.${id}--1440.jpg`);
  await page.screenshot({ path: file, type: 'jpeg', quality: 78 });
  console.log(`${process.stdout.isTTY ? '\r' : ''}${id}  1440x900  ${(fs.statSync(file).size / 1024).toFixed(0)}KB`);
}
await browser.close();
