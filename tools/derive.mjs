#!/usr/bin/env node
/**
 * derive — every image rendition the variants reference, and the manifest that
 * records what was actually written.
 *
 * This is the source of truth for the derived asset tree. Nothing under
 * assets/derived/ is produced by hand: if a rendition needs to change, it
 * changes here and this is re-run, so the manifest can never describe files
 * that do not exist.
 *
 * macOS `sips` cannot write webp, so encoding runs through Chromium's canvas —
 * which also gives correct alpha compositing for the circular portrait cutouts
 * and lets a crop be art-directed from the focal point recorded in the asset
 * manifest rather than centre-cropped blindly.
 *
 * Two rules, both learned the hard way:
 *   - the width ladder is filtered ONCE, here, and the widths actually written
 *     are recorded in assets/renditions.json. The markup helper reads that file
 *     rather than re-deriving the rule, so a source narrower than the smallest
 *     rung can never produce an empty srcset.
 *   - a source is never upscaled. The native width is always emitted, even when
 *     it is below every rung.
 *
 *   node tools/derive.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

/**
 * Playwright is not a dependency of anything here, so find it wherever the run
 * already put it — the same three places the skill's own sweep looks, since
 * VERIFY.md installs it with `npx --yes playwright`.
 */
async function loadChromium() {
  const tryImport = async (spec) => {
    try {
      const m = await import(spec);
      return m?.chromium ?? m?.default?.chromium ?? null;
    } catch {
      return null;
    }
  };
  for (const mod of ['playwright', 'playwright-core']) {
    const c = await tryImport(mod);
    if (c) return c;
  }
  const candidates = [];
  try {
    candidates.push(path.join(execSync('npm root -g', { encoding: 'utf8' }).trim(), 'playwright'));
  } catch {}
  const npxCache = path.join(process.env.HOME || '', '.npm', '_npx');
  if (fs.existsSync(npxCache)) {
    for (const hash of fs.readdirSync(npxCache)) {
      for (const mod of ['playwright', 'playwright-core']) candidates.push(path.join(npxCache, hash, 'node_modules', mod));
    }
  }
  for (const dir of candidates) {
    if (!fs.existsSync(dir)) continue;
    const c = await tryImport(pathToFileURL(path.join(dir, 'index.js')).href);
    if (c) return c;
  }
  throw new Error('playwright not found — run: npx --yes playwright install chromium');
}

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'assets', 'source');
const OUT = path.join(ROOT, 'assets', 'derived');

/** key → source file, the width ladder it is allowed, and its treatment. */
const ASSETS = [
  // Brand. The mark is capped by the brand lock at 150px; there is no larger file.
  // logo.png is NOT transparent — it is black line art on an opaque white plate,
  // which is only visible the moment it is placed on anything but white. The
  // white is keyed out here into alpha so the glyphs can sit on any ground and
  // be tinted. Nothing is redrawn or re-spaced: the letterforms are the file's,
  // and the alpha is derived from their own luminance.
  { key: 'img.brand.wordmark', file: 'logo.png', widths: [560, 1120], max: 1120, alpha: true, keyWhite: true },
  { key: 'img.brand.mark', file: 'IDNewLogoFINAL-150x150-1.png', widths: [150, 300], alpha: true },

  // People. Portraits are circular cutouts; alpha is preserved and nothing is cropped.
  { key: 'img.team.birrer', file: 'BramleyCircle-340.png', widths: [300, 340], alpha: true },
  { key: 'img.team.cao', file: 'CaoCircle.png', widths: [300], alpha: true },
  { key: 'img.team.do', file: 'DavidDoHeadshot2-340.png', widths: [300, 340], alpha: true },
  { key: 'img.team.daneals', file: 'jeannette.png', widths: [300], alpha: true },
  { key: 'img.team.emily', file: 'EmilyCircleHeadshot.png', widths: [300, 600], alpha: true, circle: true },
  { key: 'img.team.lydia', file: 'LydiaCircleHeadshot.png', widths: [300, 552], alpha: true, circle: true },
  { key: 'img.team.morgan', file: 'MorganCircleHeadshot.png', widths: [300, 620], max: 620, alpha: true, circle: true },  // nominally 1250px, actually soft

  // The group photograph, wide crop only — the 4:3 rendition was emitted and
  // referenced by nothing, and a rendition no page reaches is weight plus noise
  // in the asset audit that a genuinely orphaned file can then hide in.
  { key: 'img.team.group.wide', file: 'IDGroupPhotoFinal-scaled.jpg', widths: [1200, 1800, 2400], max: 2400, focal: [0.5, 0.34], aspect: 21 / 9 },

  // The only real photograph of the practice at work. 512px is the ceiling.
  { key: 'img.work.microscopy', file: 'plaque-microscopy-2.png', widths: [512], focal: [0.58, 0.4] },

  // Mood, not evidence. Panoramic only — a square crop loses the inversion.
  { key: 'img.hero.landscape', file: 'HomepagePicCrop-scaled.jpg', widths: [1200, 1800, 2560], focal: [0.5, 0.22] },
  { key: 'img.hero.landscape.tall', file: 'HomepagePicCrop-scaled.jpg', widths: [800, 1200], max: 1200, focal: [0.5, 0.3], aspect: 4 / 3 },

  // No rendition of the Google Reviews badge is emitted. It is another company's
  // trademark and its artwork contains five gold stars; this practice publishes
  // no rating anywhere, so the badge would assert a score that does not exist.
  // The attribution ships as text, which is what the deck actually froze.
];

const chromium = await loadChromium();
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('about:blank');

const manifest = {};
let wrote = 0;

for (const a of ASSETS) {
  const src = path.join(SRC, a.file);
  if (!fs.existsSync(src)) throw new Error(`missing source: ${a.file}`);
  const bytes = fs.readFileSync(src).toString('base64');
  const mime = /\.png$/i.test(a.file) ? 'image/png' : 'image/jpeg';

  const natural = await page.evaluate(
    ([data, m]) =>
      new Promise((res, rej) => {
        const img = new Image();
        img.onload = () => res([img.naturalWidth, img.naturalHeight]);
        img.onerror = () => rej(new Error('decode failed'));
        img.src = `data:${m};base64,${data}`;
      }),
    [bytes, mime],
  );

  // Filter the ladder once. Never upscale; always emit the native width so a
  // small source still produces at least one rendition.
  // The ceiling is the smaller of what the file holds and what the asset manifest
  // says the file can honestly carry — several sources are nominally large and
  // actually soft, and the manifest records that per asset.
  const geom = a.aspect ? Math.min(natural[0], Math.round(natural[1] * a.aspect)) : natural[0];
  const cap = Math.min(geom, a.max ?? geom);
  const fits = a.widths.filter((w) => w <= cap);
  const ladder = [...new Set(fits.length ? fits : [cap])].sort((x, y) => x - y);

  const rows = [];
  for (const w of ladder) {
    const out = await page.evaluate(
      ([data, m, width, aspect, focal, alpha, circle, keyWhite]) =>
        new Promise((res, rej) => {
          const img = new Image();
          img.onload = () => {
            let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
            if (aspect) {
              // Art-direct the crop from the recorded focal point, not the centre.
              if (sw / sh > aspect) { sw = Math.round(sh * aspect); sx = Math.round((img.naturalWidth - sw) * focal[0]); }
              else { sh = Math.round(sw / aspect); sy = Math.round((img.naturalHeight - sh) * focal[1]); }
            }
            const h = Math.round((sh / sw) * width);
            let src = img;
            if (keyWhite) {
              // Key at NATIVE resolution and downsample the result: keying after
              // a resample turns every antialiased edge pixel into a halo.
              const k = document.createElement('canvas');
              k.width = img.naturalWidth; k.height = img.naturalHeight;
              const kx = k.getContext('2d');
              kx.drawImage(img, 0, 0);
              const d0 = kx.getImageData(0, 0, k.width, k.height);
              const px = d0.data;
              for (let i = 0; i < px.length; i += 4) {
                const ink = 255 - Math.min(px[i], px[i + 1], px[i + 2]);
                px[i] = 0; px[i + 1] = 0; px[i + 2] = 0; px[i + 3] = ink;
              }
              kx.putImageData(d0, 0, 0);
              src = k;
            }
            const c = document.createElement('canvas');
            c.width = width; c.height = h;
            const ctx = c.getContext('2d');
            ctx.imageSmoothingQuality = 'high';
            if (!alpha) { ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, width, h); }
            ctx.drawImage(src, sx, sy, sw, sh, 0, 0, width, h);
            if (circle) {
              // Clip to the inscribed circle: several portraits carry stray
              // shapes baked into the transparent corners of the source.
              ctx.globalCompositeOperation = 'destination-in';
              ctx.beginPath();
              ctx.arc(width / 2, h / 2, Math.min(width, h) / 2, 0, Math.PI * 2);
              ctx.fill();
              ctx.globalCompositeOperation = 'source-over';
            }
            res([c.toDataURL('image/webp', 0.86), width, h]);
          };
          img.onerror = () => rej(new Error('decode failed'));
          img.src = `data:${m};base64,${data}`;
        }),
      [bytes, mime, w, a.aspect ?? null, a.focal ?? [0.5, 0.5], !!a.alpha, !!a.circle, !!a.keyWhite],
    );
    const file = `${a.key}--${out[1]}.webp`;
    fs.writeFileSync(path.join(OUT, file), Buffer.from(out[0].split(',')[1], 'base64'));
    rows.push({ w: out[1], h: out[2], file: `assets/derived/${file}` });
    wrote++;
  }
  manifest[a.key] = { source: `assets/source/${a.file}`, natural: { w: natural[0], h: natural[1] }, renditions: rows };
  console.log(`${a.key.padEnd(26)} ${natural[0]}×${natural[1]} → ${rows.map((r) => `${r.w}×${r.h}`).join(' ')}`);
}

fs.writeFileSync(path.join(ROOT, 'assets', 'renditions.json'), JSON.stringify(manifest, null, 2) + '\n');
await browser.close();
console.log(`\n${wrote} renditions · assets/renditions.json written`);
