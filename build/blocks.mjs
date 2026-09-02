/**
 * blocks — this deck's sections, as content.
 *
 * Project-specific because the keys are. What lives here is *what a section is
 * made of and what it means*; wrappers, headings, order and shape belong to the
 * variant, which is what lets the same content be a table in one variant, a run
 * of rows in the next and a card field in the third.
 *
 * Two conventions the gates depend on:
 *   - every element rendering a frozen string carries `data-copy`
 *   - every canonical image carries `data-asset`
 *
 * And one the variance gate depends on: a section's desktop grid template is
 * declared INLINE on the element that defines its shape, never only in the
 * stylesheet. `variance.mjs` classifies a section by reading its own markup, so
 * a layout that lives entirely in `<head>` measures as a plain band and a set of
 * genuinely different compositions reports as a monoculture. The collapse to one
 * column at small sizes is a single rule in the shell of each variant.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const RENDITIONS = JSON.parse(fs.readFileSync(path.join(ROOT, 'assets', 'renditions.json'), 'utf8'));

/**
 * Alt text, exactly as frozen in the asset manifest. One place, so a picture and
 * its accessible name cannot drift apart, and so re-reading the manifest is the
 * only way this changes.
 */
const ALT = {
  'img.brand.wordmark': 'Integrative Dentistry',
  'img.brand.mark': 'Integrative Dentistry',
  'img.team.group': 'Three Integrative Dentistry doctors standing in front of an ivy wall',
  'img.team.group.wide': 'Three Integrative Dentistry doctors standing in front of an ivy wall',
  'img.team.birrer': 'Dr. Bramley Birrer',
  'img.team.cao': 'Dr. Christine Cao',
  'img.team.do': 'Dr. David Do',
  'img.team.daneals': 'Dr. Jeannette Daneals, ND',
  'img.team.emily': 'Emily, dental hygienist',
  'img.team.lydia': 'Lydia, dental hygienist',
  'img.team.morgan': 'Morgan, dental hygienist',
  'img.work.microscopy': 'A clinician in scrubs pointing at live plaque microscopy on a chairside monitor',
  'img.hero.landscape': 'Conifers reflected upside down in still teal water',
  'img.hero.landscape.tall': 'Conifers reflected upside down in still teal water',
  'img.proof.google': 'Google Reviews',
};

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/**
 * One canonical image.
 *
 * `sizes` is a required parameter rather than a constant inside the helper: the
 * same asset is painted at very different widths by different call sites, and a
 * shared `sizes` string is how a page ends up choosing a candidate for 46vw and
 * painting it at 100vw. The srcset is read from the manifest the derive step
 * wrote — the width rule is never re-derived here.
 */
export function img(key, { sizes, cls = '', loading = 'lazy', alt, decorative = false, prefix = '../../' } = {}) {
  const entry = RENDITIONS[key];
  if (!entry) throw new Error(`no rendition for asset key: ${key}`);
  const { renditions } = entry;
  const largest = renditions[renditions.length - 1];
  const srcset = renditions.map((r) => `${prefix}${r.file} ${r.w}w`).join(', ');
  const label = decorative ? '' : esc(alt ?? ALT[key] ?? '');
  return (
    `<img${cls ? ` class="${cls}"` : ''} data-asset="${key}" src="${prefix}${largest.file}"` +
    ` srcset="${srcset}" sizes="${sizes}" width="${largest.w}" height="${largest.h}"` +
    ` loading="${loading}" decoding="async" alt="${label}"${decorative ? ' aria-hidden="true"' : ''}>`
  );
}

/** The real width of a rendition, for a caller that needs to reason about it. */
export const widest = (key) => RENDITIONS[key].renditions[RENDITIONS[key].renditions.length - 1];

// ---------------------------------------------------------------------------
// Content — the deck, grouped the way a page actually needs it
// ---------------------------------------------------------------------------

const range = (n) => Array.from({ length: n }, (_, i) => i + 1);

/** Term/definition pairs. A short bold label over a sentence is a `dt`, not a heading. */
const pairSet = (d, mk, n) => range(n).map((i) => ({ tk: mk(i, 'term'), dk: mk(i, 'def'), t: d.t(mk(i, 'term')), b: d.t(mk(i, 'def')) }));

export const heroProof = (d) => pairSet(d, (i, s) => `hero.proof.${i}.${s}`, 3);
export const officeSpecs = (d) => pairSet(d, (i, s) => `office.spec.${i}.${s}`, 4);
export const officeTech = (d) => pairSet(d, (i, s) => `office.tech.${i}.${s}`, 6);
export const values = (d) => pairSet(d, (i, s) => `values.${i}.${s}`, 6);
export const visitSteps = (d) => pairSet(d, (i, s) => `visit.${i}.${s}`, 4);

export const prices = (d) =>
  ['exam', 'cleaning', 'insurance'].map((k) => ({
    tk: `price.${k}.term`, dk: `price.${k}.def`, t: d.t(`price.${k}.term`), b: d.t(`price.${k}.def`),
  }));

export const diffs = (d) =>
  range(4).map((i) => ({ tk: `diff.${i}.title`, bk: `diff.${i}.body`, t: d.t(`diff.${i}.title`), b: d.t(`diff.${i}.body`) }));

export const services = (d) =>
  range(12).map((i) => ({ tk: `svc.${i}.title`, bk: `svc.${i}.body`, t: d.t(`svc.${i}.title`), b: d.t(`svc.${i}.body`), n: i }));

export const faqs = (d) =>
  range(8).map((i) => ({ qk: `faq.${i}.q`, ak: `faq.${i}.a`, q: d.t(`faq.${i}.q`), a: d.t(`faq.${i}.a`), n: i }));

export const testimonials = (d) =>
  range(3).map((i) => ({ qk: `testimonial.${i}.quote`, ak: `testimonial.${i}.attr`, q: d.t(`testimonial.${i}.quote`), a: d.t(`testimonial.${i}.attr`), n: i }));

/** The practising doctors, each with the portrait the manifest ties to them. */
export const doctors = (d) => [
  { n: 1, asset: 'img.team.birrer', quote: 'team.1.quote' },
  { n: 2, asset: 'img.team.cao' },
  { n: 3, asset: 'img.team.do' },
  { n: 4, asset: 'img.team.daneals' },
].map((x) => ({
  ...x,
  nk: `team.${x.n}.name`, rk: `team.${x.n}.role`, bk: `team.${x.n}.bio`,
  name: d.t(`team.${x.n}.name`), role: d.t(`team.${x.n}.role`), bio: d.t(`team.${x.n}.bio`),
  q: x.quote ? d.t(x.quote) : null,
}));

export const hygienists = (d) => [
  { n: 1, asset: 'img.team.emily' },
  { n: 2, asset: 'img.team.lydia' },
  { n: 3, asset: 'img.team.morgan' },
].map((x) => ({
  ...x,
  nk: `team.hyg.${x.n}.name`, bk: `team.hyg.${x.n}.bio`,
  name: d.t(`team.hyg.${x.n}.name`), bio: d.t(`team.hyg.${x.n}.bio`),
}));

/** Where the practice's two live links point. Not copy — destinations. */
export const BOOK = 'https://dental4.me/integrativedentistry';
export const TEL = 'tel:+12063676453';

// ---------------------------------------------------------------------------
// Shapes — generic renderers a variant composes. Every one takes its own class
// names, so two variants using the same shape still look nothing alike.
// ---------------------------------------------------------------------------

/**
 * A term/definition run. Deliberately `dl`, never a stack of `h3`s: these are
 * labels, not sections a reader could navigate to, and marking them as headings
 * invents outline entries and skips a level under the page's `h1`.
 *
 * Each pair is wrapped in a `<div>` — which HTML explicitly allows inside a `dl`
 * — because a bare `dt`/`dd` run inside a grid lays out as one row of terms and
 * one row of definitions, silently pairing every label with the wrong sentence.
 */
export const dl = (items, { cls = '', dt = '', dd = '', pair = '' } = {}) =>
  `<dl${cls ? ` class="${cls}"` : ''}>` +
  items.map((i) => `<div${pair ? ` class="${pair}"` : ''}>` +
    `<dt${dt ? ` class="${dt}"` : ''} data-copy="${i.tk}">${i.t}</dt>` +
    `<dd${dd ? ` class="${dd}"` : ''} data-copy="${i.dk}">${i.b}</dd></div>`).join('') +
  '</dl>';

/** A run of rows: an index, a numbered contents, a spec sheet. */
export const rows = (items, { cls = '', row = '', num = false, title = 'h3', tcls = '', bcls = '' } = {}) =>
  `<ol${cls ? ` class="${cls}"` : ''}>` +
  items.map((i, n) => `<li${row ? ` class="${row}"` : ''}>` +
    (num ? `<span class="num" aria-hidden="true">${String(n + 1).padStart(2, '0')}</span>` : '') +
    `<${title}${tcls ? ` class="${tcls}"` : ''} data-copy="${i.tk}">${i.t}</${title}>` +
    `<p${bcls ? ` class="${bcls}"` : ''} data-copy="${i.bk ?? i.dk}">${i.b}</p></li>`).join('') +
  '</ol>';

/**
 * A field of cards.
 *
 * `<div>` and `<article>` rather than `<ul>` and `<li>`: a run of six or more
 * list items is how the variance classifier recognises a *list*, so marking a
 * card field as a list makes a grid measure as the shape it is not. Rows below
 * are the list; this is the grid, and the distinction is real in the markup as
 * well as in the fingerprint.
 */
export const cards = (items, { cls = '', card = '', cols = 3, title = 'h3', tcls = '', bcls = '', num = false } = {}) =>
  `<div class="${cls}">` +
  items.map((i, n) => `<article${card ? ` class="${card}"` : ''}>` +
    (num ? `<span class="num" aria-hidden="true">${String(n + 1).padStart(2, '0')}</span>` : '') +
    `<${title}${tcls ? ` class="${tcls}"` : ''} data-copy="${i.tk}">${i.t}</${title}>` +
    `<p${bcls ? ` class="${bcls}"` : ''} data-copy="${i.bk ?? i.dk}">${i.b}</p></article>`).join('') +
  '</div>';

/** A real table. Used where the content is genuinely tabular — what things cost. */
export const table = (items, { cls = '', caption = '', headings = ['', ''] } = {}) =>
  `<table${cls ? ` class="${cls}"` : ''}>` +
  (caption ? `<caption>${caption}</caption>` : '') +
  `<thead><tr><th scope="col">${headings[0]}</th><th scope="col">${headings[1]}</th></tr></thead><tbody>` +
  items.map((i) => `<tr><th scope="row" data-copy="${i.tk}">${i.t}</th><td data-copy="${i.dk ?? i.bk}">${i.b}</td></tr>`).join('') +
  '</tbody></table>';

/**
 * Questions and answers. `<details>` is the honest element — it is keyboard
 * operable, it works with no JavaScript, and it is findable by the browser's own
 * find-in-page in every current engine.
 */
export const faqList = (items, { cls = '', item = '', q = '', a = '' } = {}) =>
  `<div${cls ? ` class="${cls}"` : ''}>` +
  items.map((i) => `<details${item ? ` class="${item}"` : ''}${i.n === 1 ? ' open' : ''}>` +
    `<summary${q ? ` class="${q}"` : ''}><span data-copy="${i.qk}">${i.q}</span></summary>` +
    `<p${a ? ` class="${a}"` : ''} data-copy="${i.ak}">${i.a}</p></details>`).join('') +
  '</div>';

/** Quotes, with the site's own attribution and no rating anywhere near them. */
export const quotes = (items, { cls = '', fig = '', quote = '', attr = '' } = {}) =>
  items.map((i) => `<figure${fig ? ` class="${fig}"` : ''}>` +
    `<blockquote${quote ? ` class="${quote}"` : ''}><p data-copy="${i.qk}">${i.q}</p></blockquote>` +
    `<figcaption${attr ? ` class="${attr}"` : ''} data-copy="${i.ak}">${i.a}</figcaption></figure>`).join('');
