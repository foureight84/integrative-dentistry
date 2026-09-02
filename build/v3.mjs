/**
 * v3 — The Reference
 *
 * Grid row:    ratio 1.5 · radius 2 · container 1120/1320/1520 · gap 64
 *              motion near-still [80,120,160] · ground paper-2, ink slate-900, accent blue-deep ×1
 * Format:      multi-page — four pages with their own folds and their own CTAs,
 *              because this direction is a reference document and a reference is
 *              consulted, not scrolled
 * Prohibition: no shadow, and nothing animates position. Every entrance is opacity
 *              alone; separation is done with hairlines and ground, never elevation.
 * Grounded in: grid only
 */

import { BOOK, TEL, diffs, doctors, faqList, faqs, heroProof, hygienists, img, officeSpecs, officeTech, prices, quotes, rows, services, table, testimonials, values, visitSteps } from './blocks.mjs';

export const SYSTEM = `
/* v3 — The Reference
   Grid row:    ratio 1.5 · radius 2 · container 1120 · gap 64 · near-still
   Prohibition: no shadow; nothing animates position
   Grounded in: grid only

   Palette mapping, re-keyed and re-measured for THIS mapping:
     ink    slate-900 on paper-2  15.42   body and headings
     muted  slate-700 on paper-2   8.95   secondary
     ink    slate-900 on paper    17.06   on the raised sheet
     muted  slate-700 on paper     9.90
     accent blue-deep on paper-2   5.79   one instance: the primary button's fill
     paper on blue-deep            6.41   its label
   Accent budget: ONE blue fill per page, on that page's single most important
   action — the hero button on the front page, the masthead button everywhere
   else. Every other control is a line button, and every rule, marker and active
   state is drawn in the ink. A page with one blue thing on it has an answer to
   "where do I press"; a page with four has a colour scheme. */
:root{
  --ratio:1.5;
  --t-xs:.667rem; --t-sm:.75rem; --t-base:1rem; --t-md:1.5rem;
  --t-lg:2.25rem; --t-xl:3.375rem;
  --t-display:clamp(2.25rem,1.4rem + 2.6vw,3.375rem);
  --lh-tight:1.1; --lh-body:1.55; --tr-display:-0.012em; --tr-body:0;
  --measure:66ch;

  --s-1:4px; --s-2:8px; --s-3:12px; --s-4:16px; --s-5:20px;
  --s-6:28px; --s-7:40px; --s-8:56px;
  --section-gap:64px; --element-gap:16px;

  --r-button:2px; --r-card:2px; --r-input:2px; --r-image:2px;
  --hairline:1px; --bw-2:2px;
  --shadow-1:none; --shadow-2:none;

  /* The base is deliberately narrow — this is a reference document and it is
     read at 1120. The ultra step is not a change of mind: above 2400px a sheet
     that stays at 1520 is a strip in a field, and the surround stops reading as
     a margin at all. */
  --container:1120px; --container-wide:1320px; --container-ultra:1880px; --gutter:32px;

  --d-fast:80ms; --d-base:120ms; --d-slow:160ms;
  --ease-out:linear; --ease-inout:linear; --stagger:30ms;

  --ground:var(--paper-2);
  --surface:var(--paper);
  --ink:var(--slate-900);
  --ink-muted:var(--slate-700);
  --accent:var(--blue-deep);
  --on-accent:var(--paper);
  --rule:color-mix(in srgb, var(--slate-900) 20%, transparent);
  --rule-strong:color-mix(in srgb, var(--slate-900) 42%, transparent);
}
@media (prefers-reduced-motion:reduce){
  :root{ --d-fast:1ms; --d-base:1ms; --d-slow:1ms; --stagger:0ms; }
}
`.trim();

export const CSS = `
/* This variant is a document, and a document is allowed to stay narrow. What it
   is NOT allowed to do is float in an undeclared field: on a very wide display a
   1520px column on an unbounded ground reads as an image that failed to load.
   So the page is given a SHEET — a deeper ground outside, the page ground inside,
   with a hairline edge. Space outside a boundary is a margin; space inside an
   undeclared one is an absence.
   The outer tone is derived from the locked hexes: 12% slate-900 in paper-2,
   written as its literal so a contrast probe can read it. */
html,body{background:#cfd5de}
main,.mast,.foot{background:var(--ground)}
.sheet{max-width:var(--container-ultra);margin-inline:auto;
 border-inline:var(--hairline) solid var(--rule)}
@media (max-width:1800px){ html,body{background:var(--ground)} .sheet{border-inline:0} }
body{color:var(--ink);font:var(--t-base)/var(--lh-body) var(--font-body);-webkit-font-smoothing:antialiased}
h1,h2,h3{font-family:var(--font-display);font-weight:600;line-height:var(--lh-tight);
 letter-spacing:var(--tr-display)}
p{max-width:var(--measure)}

.wrap{width:min(100% - var(--gutter)*2, var(--container));max-width:var(--container);margin-inline:auto}
@media (max-width:560px){ :root{--gutter:16px} }
@media (min-width:1800px){ .wrap{width:min(100% - var(--gutter)*2, var(--container-wide));max-width:var(--container-wide)} }
@media (min-width:2400px){ .wrap{width:min(100% - var(--gutter)*2, var(--container-ultra));max-width:var(--container-ultra)} }

.sec{padding-block:var(--section-gap);background:var(--ground)}
.sec--sheet{background:var(--surface);border-block:var(--hairline) solid var(--rule)}
/* Each text-led section is capped to the width its own content actually paints
   and centred there. Centring the wrap alone does nothing when the ink inside is
   narrower than the wrap — the gutters have to be measured on the glyphs. */
.sec--col > .wrap{width:min(100% - var(--gutter)*2, 780px)}
.sec--tight > .wrap{width:min(100% - var(--gutter)*2, 680px)}
.sec--narrow > .wrap{width:min(100% - var(--gutter)*2, 560px)}
/* A section whose content cannot fill the ultra step does not take it. The
   container steps up so that pages which CAN use the room do; a spec list of
   twelve-word definitions cannot, and stretching it just moves the empty half
   from outside the sheet to inside it. */
.sec--base > .wrap{width:min(100% - var(--gutter)*2, var(--container));max-width:var(--container)}
.sec--narrow p{max-width:none}
.sec--tight .idx--pair li{grid-template-columns:minmax(0,18ch) minmax(0,1fr)}

/* This variant may not animate position: the reveal is opacity only. */
.js .rv,.js .rv.in{transform:none}

@media (max-width:900px){
  [style*="grid-template-columns"]{grid-template-columns:minmax(0,1fr) !important}
}

.label{font:600 var(--t-xs)/1 var(--font-body);letter-spacing:.16em;text-transform:uppercase;
 color:var(--ink-muted);margin-bottom:var(--s-5)}
.h2{font-size:var(--t-md);margin-bottom:var(--s-5)}
.lede{font-size:var(--t-base);color:var(--ink-muted)}
.rule{border:0;border-top:var(--hairline) solid var(--rule);margin-block:var(--s-7)}

/* Masthead — a document header: a rule, a wordmark, and where you are. */
.mast{background:var(--surface);border-bottom:var(--hairline) solid var(--rule-strong)}
.mast__in{display:flex;align-items:center;gap:var(--s-6);min-height:64px;flex-wrap:wrap}
.mast__logo{display:inline-flex;align-items:center;min-height:48px;flex:0 0 auto}
.mast__logo img{width:176px}
.mast__nav{display:flex;gap:var(--s-6);margin-left:auto;min-width:0;flex-wrap:wrap}
.mast__nav a{display:inline-flex;align-items:center;min-height:48px;font:600 var(--t-sm)/1 var(--font-body);
 letter-spacing:.06em;color:var(--ink-muted);text-decoration:none;
 border-bottom:var(--bw-2) solid transparent;transition:color var(--d-fast) var(--ease-out)}
.mast__nav a:hover{color:var(--ink)}
.mast__nav a[aria-current="page"]{color:var(--ink);border-bottom-color:var(--ink)}
.mast__tel{display:inline-flex;align-items:center;min-height:48px;font-size:var(--t-sm);
 font-weight:600;text-decoration:none;white-space:nowrap}
@media (max-width:1000px){ .mast__nav{width:100%;margin-left:0;gap:var(--s-5);order:3;
 border-top:var(--hairline) solid var(--rule)} }

.btn{display:inline-flex;align-items:center;justify-content:center;min-height:44px;
 padding:0 var(--s-6);border-radius:var(--r-button);font:600 var(--t-sm)/1 var(--font-body);
 letter-spacing:.04em;text-decoration:none;transition:background-color var(--d-fast) var(--ease-out)}
.btn--primary{background:var(--accent);color:var(--on-accent)}
.btn--primary:hover{background:var(--slate-900)}
.btn--line{border:var(--hairline) solid var(--rule-strong);color:var(--ink)}
.btn--line:hover{background:var(--ground)}
.row-cta{display:flex;flex-wrap:wrap;gap:var(--s-4)}
@media (max-width:430px){ .btn{padding:0 var(--s-5);max-width:100%} .row-cta{flex-direction:column;align-items:stretch} }

/* Hero — a title block, not a stage. */
.hero{display:grid;gap:var(--s-8);align-items:end;padding-block:var(--s-8) var(--section-gap)}
.hero h1{font-size:var(--t-display);margin-bottom:var(--s-5)}
.hero__sub{font-size:var(--t-md);line-height:1.3;color:var(--ink-muted);max-width:26ch;
 font-family:var(--font-display);font-weight:400}
.hero__cta{margin-top:var(--s-7)}
.facts{border-top:var(--hairline) solid var(--rule-strong);margin-top:var(--s-8);padding-top:var(--s-5)}
.facts > div{display:grid;grid-template-columns:minmax(0,14ch) minmax(0,1fr);gap:var(--s-5);
 padding-block:var(--s-4);border-bottom:var(--hairline) solid var(--rule)}
.facts dt{font-weight:700;font-size:var(--t-sm);letter-spacing:.04em}
.facts dd{margin:0;font-size:var(--t-sm);color:var(--ink-muted)}
@media (max-width:560px){ .facts > div{grid-template-columns:1fr;gap:var(--s-1)} }

/* Index rows — the shape this variant leans on. */
.idx{border-top:var(--hairline) solid var(--rule-strong)}
.idx li{display:grid;grid-template-columns:minmax(0,3.5ch) minmax(0,20ch) minmax(0,1fr);
 gap:var(--s-6);padding-block:var(--s-5);border-bottom:var(--hairline) solid var(--rule)}
.idx .num{font:600 var(--t-sm)/1.5 var(--font-body);color:var(--ink-muted);font-variant-numeric:tabular-nums}
.idx h3{font-size:var(--t-base);font-weight:600}
.idx p{font-size:var(--t-sm);color:var(--ink-muted);max-width:none}
.idx--pair li{grid-template-columns:minmax(0,24ch) minmax(0,1fr)}
@media (max-width:760px){
  .idx li,.idx--pair li{grid-template-columns:minmax(0,3.5ch) minmax(0,1fr);row-gap:var(--s-2)}
  .idx p{grid-column:2}
  .idx--pair li{grid-template-columns:1fr}
  .idx--pair p{grid-column:1}
}
.idx__more{margin-top:var(--s-6);font-size:var(--t-sm);color:var(--ink-muted);max-width:none}

/* Two-track editorial split. */
/* No align-items:start on a two-track row. A rail is shorter than the body it
   sits beside by definition, and pinning it to the top makes the grid child end
   hundreds of pixels above its row — which is indistinguishable, to a probe and
   to a reader, from a column that failed to fill. Let the boxes stretch; the
   text still starts at the top. */
.split{display:grid;gap:var(--s-8)}
.split__body p + p{margin-top:var(--s-5)}
.split__body p{max-width:none}
.pull{margin-top:var(--s-7);padding-top:var(--s-5);border-top:var(--bw-2) solid var(--ink);
 font-family:var(--font-display);font-size:var(--t-md);line-height:1.25;max-width:none}

.figure{border:var(--hairline) solid var(--rule);background:var(--surface);border-radius:var(--r-image)}
.figure img{width:100%;height:auto;max-width:512px}
.figure figcaption{padding:var(--s-5);font-size:var(--t-sm);color:var(--ink-muted);
 border-top:var(--hairline) solid var(--rule)}

/* Directory — people as a reference listing, not a card wall. */
.dir{border-top:var(--hairline) solid var(--rule-strong)}
.dir li{display:grid;grid-template-columns:88px minmax(0,20ch) minmax(0,1fr);gap:var(--s-6);
 padding-block:var(--s-6);border-bottom:var(--hairline) solid var(--rule)}
.dir__ph img{width:88px;height:88px;object-fit:cover;border-radius:var(--r-image);background:var(--ground)}
.dir h3{font-size:var(--t-base);font-weight:600}
.dir .role{font-size:var(--t-sm);color:var(--ink-muted);margin-top:var(--s-2)}
.dir .bio{font-size:var(--t-sm);color:var(--ink-muted);max-width:none}
.dir blockquote{font-family:var(--font-display);font-size:var(--t-base);line-height:1.35;
 margin-bottom:var(--s-4)}
@media (max-width:760px){
  .dir li{grid-template-columns:64px minmax(0,1fr);row-gap:var(--s-3)}
  .dir__ph img{width:64px;height:64px}
  .dir .bio,.dir blockquote{grid-column:2}
}
.emeritus{margin-top:var(--s-6);font-size:var(--t-sm);color:var(--ink-muted);max-width:none}

/* Table — prices, which are genuinely tabular. */
.ptable{font-size:var(--t-sm);border-top:var(--bw-2) solid var(--ink)}
.ptable caption{text-align:left;font:600 var(--t-base)/1.3 var(--font-display);padding-bottom:var(--s-5)}
.ptable thead th{font-size:var(--t-xs);letter-spacing:.16em;text-transform:uppercase;
 color:var(--ink-muted);text-align:left;padding-block:var(--s-3);
 border-bottom:var(--hairline) solid var(--rule)}
.ptable th,.ptable td{text-align:left;vertical-align:top;padding:var(--s-5) var(--s-6) var(--s-5) 0;
 border-bottom:var(--hairline) solid var(--rule)}
.ptable tbody th{width:30%;font-weight:700}
.ptable td{color:var(--ink-muted)}
@media (max-width:560px){
  .ptable thead{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}
  .ptable tbody th,.ptable tbody td{display:block;width:auto}
  .ptable tbody th{padding-bottom:var(--s-2);border-bottom:0}
}

/* Questions. */
.faqs{border-top:var(--hairline) solid var(--rule-strong)}
.faqs details{border-bottom:var(--hairline) solid var(--rule)}
.faqs summary{cursor:pointer;list-style:none;padding-block:var(--s-5);display:flex;gap:var(--s-5);
 align-items:baseline;font:600 var(--t-base)/1.4 var(--font-body)}
.faqs summary::-webkit-details-marker{display:none}
.faqs summary::after{content:"+";margin-left:auto;color:var(--ink-muted);font-weight:400}
.faqs details[open] summary::after{content:"\\2013"}
.faqs details p{padding-bottom:var(--s-5);font-size:var(--t-sm);color:var(--ink-muted);max-width:none}

/* Quotes — set as evidence, in the smallest possible frame. */
.qs{display:grid;gap:var(--s-7)}
.qs figure{margin:0;padding-top:var(--s-5);border-top:var(--hairline) solid var(--rule)}
.qs blockquote p{font-size:var(--t-base);max-width:none}
.qs figcaption{margin-top:var(--s-4);font:600 var(--t-xs)/1 var(--font-body);letter-spacing:.16em;
 text-transform:uppercase;color:var(--ink-muted)}
.qs__src{margin-top:var(--s-6);font-size:var(--t-xs);letter-spacing:.16em;text-transform:uppercase;
 color:var(--ink-muted)}

/* Close. */
.close h2{font-size:var(--t-lg);margin-bottom:var(--s-5)}
.close p{max-width:52ch}
.close .row-cta{margin-block:var(--s-7) var(--s-5)}
.close__note{font-size:var(--t-sm);color:var(--ink-muted)}

/* Footer. */
.foot{background:var(--surface);border-top:var(--hairline) solid var(--rule-strong);
 padding-block:var(--s-8)}
.foot__grid{display:grid;gap:var(--s-7);grid-template-columns:repeat(4,minmax(0,1fr));align-items:start}
@media (max-width:820px){ .foot__grid{grid-template-columns:repeat(2,minmax(0,1fr))} }
@media (max-width:520px){ .foot__grid{grid-template-columns:1fr} }
.foot__mark{display:flex;align-items:center;gap:var(--s-4);margin-bottom:var(--s-4)}
.foot__mark img{margin:0}
.foot__mark .mark{width:44px}
.foot img{width:168px;margin-bottom:var(--s-4)}
.foot h2{font-size:var(--t-xs);letter-spacing:.16em;text-transform:uppercase;color:var(--ink-muted);
 margin-bottom:var(--s-4)}
.foot p,.foot a,.foot li{font-size:var(--t-sm);color:var(--ink-muted)}
.foot a{text-decoration:none}
.foot ul{display:grid;gap:var(--s-1);list-style:none;padding:0}
.foot ul a{display:inline-flex;align-items:center;min-height:44px}
.foot a:hover{color:var(--ink);text-decoration:underline}
.foot__base{margin-top:var(--s-8);padding-top:var(--s-5);border-top:var(--hairline) solid var(--rule);
 display:flex;flex-wrap:wrap;gap:var(--s-5);justify-content:space-between;font-size:var(--t-sm);
 color:var(--ink-muted)}
.tagline{font-size:var(--t-sm);color:var(--ink-muted)}
`.trim();

// --------------------------------------------------------------------------

/** Four real pages, so the nav is a real nav: it says where you are. */
const PAGEMAP = [
  { id: 'home', href: 'index.html', up: '' },
  { id: 'services', href: 'services/index.html', up: '../' },
  { id: 'practice', href: 'practice/index.html', up: '../' },
  { id: 'visit', href: 'visit/index.html', up: '../' },
];
const NAV = [
  ['nav.2', 'services'],
  ['nav.1', 'practice'],
  ['nav.5', 'visit'],
];

const chrome = (d, { keyed, here }) => {
  const page = PAGEMAP.find((p) => p.id === here);
  const up = page.up;
  const P = `../../${up ? '../' : ''}`;
  const k = (key) => (keyed ? ` data-copy="${key}"` : '');
  const link = ([key, id]) => {
    const t = PAGEMAP.find((p) => p.id === id);
    return `<a href="${up}${t.href}"${id === here ? ' aria-current="page"' : ''}${k(key)}>${d.t(key)}</a>`;
  };
  return {
    P,
    head: `<header class="mast"><div class="wrap mast__in">
  <a class="mast__logo" href="${up}index.html">${img('img.brand.wordmark', { sizes: '176px', loading: 'eager', decorative: true, prefix: P })}<span class="vh"${k('brand.name')}>${d.t('brand.name')}</span></a>
  <nav class="mast__nav" aria-label="Main">${NAV.map(link).join('')}
    <a href="${up}practice/index.html#team"${k('nav.3')}>${d.t('nav.3')}</a>
    <a href="${up}practice/index.html#office"${k('nav.4')}>${d.t('nav.4')}</a>
  </nav>
  <a class="mast__tel" href="${TEL}"${k('contact.phone')}>${d.t('contact.phone')}</a>
  <a class="btn ${here === 'home' ? 'btn--line' : 'btn--primary'}" href="${BOOK}"${k('nav.cta')}>${d.t('nav.cta')}</a>
</div></header>`,
    foot: `<footer class="foot"><div class="wrap">
  <div class="foot__grid">
    <div><span class="foot__mark">${img('img.brand.mark', { sizes: '44px', cls: 'mark', decorative: true, prefix: P })}${img('img.brand.wordmark', { sizes: '168px', decorative: true, prefix: P })}</span><p class="tagline"${k('brand.tagline')}>${d.t('brand.tagline')}</p></div>
    <div><h2>Visit</h2><p${k('contact.neighborhood')}>${d.t('contact.neighborhood')}</p><p${k('contact.address')}>${d.t('contact.address')}</p><p${k('contact.hours')}>${d.t('contact.hours')}</p></div>
    <div><h2>Contact</h2><ul><li><a href="${TEL}"><span${k('contact.phone')}>${d.t('contact.phone')}</span></a></li><li><a href="mailto:${d.t('contact.email')}"${k('contact.email')}>${d.t('contact.email')}</a></li></ul></div>
    <div><h2>Pages</h2><ul>${PAGEMAP.slice(1).map((p) => `<li><a href="${up}${p.href}">${d.t(p.id === 'services' ? 'nav.2' : p.id === 'practice' ? 'nav.1' : 'nav.5')}</a></li>`).join('')}</ul></div>
  </div>
  <div class="foot__base"><span${k('footer.legal')}>${d.t('footer.legal')}</span><span${k('footer.hipaa')}>${d.t('footer.hipaa')}</span></div>
</div></footer>`,
  };
};

const home = (d) => {
  const c = chrome(d, { keyed: true, here: 'home' });
  return `${c.head}
<div class="sheet">
<main id="main">

<section id="hero" class="wrap hero rv" style="grid-template-columns:minmax(0,7fr) minmax(0,4fr)">
  <div>
    <p class="label" data-copy="hero.eyebrow">${d.t('hero.eyebrow')}</p>
    <h1 data-copy="hero.h1">${d.t('hero.h1')}</h1>
    <p class="lede" data-copy="hero.sub">${d.t('hero.sub')}</p>
    <div class="row-cta hero__cta">
      <a class="btn btn--primary" href="${BOOK}" data-copy="hero.cta.primary">${d.t('hero.cta.primary')}</a>
      <a class="btn btn--line" href="${TEL}" data-copy="hero.cta.secondary">${d.t('hero.cta.secondary')}</a>
    </div>
  </div>
  <div>
    <p class="hero__sub" data-copy="welcome.h2">${d.t('welcome.h2')}</p>
    <dl class="facts">
      ${heroProof(d).map((i) => `<div><dt data-copy="${i.tk}">${i.t}</dt><dd data-copy="${i.dk}">${i.b}</dd></div>`).join('')}
    </dl>
  </div>
</section>

<section id="different" class="sec sec--sheet rv">
  <div class="wrap split" style="grid-template-columns:minmax(0,4fr) minmax(0,7fr)">
    <div>
      <p class="label" data-copy="diff.eyebrow">${d.t('diff.eyebrow')}</p>
      <h2 class="h2" data-copy="diff.h2">${d.t('diff.h2')}</h2>
      <p class="lede" data-copy="diff.intro">${d.t('diff.intro')}</p>
    </div>
    <div>
      ${rows(diffs(d), { cls: 'idx idx--pair' })}
      <p class="lede" style="margin-top:var(--s-6);max-width:none" data-copy="diff.closing">${d.t('diff.closing')}</p>
    </div>
  </div>
</section>

<section id="welcome" class="sec sec--col rv">
  <div class="wrap">
    <p class="label" data-copy="welcome.eyebrow">${d.t('welcome.eyebrow')}</p>
    <p style="font-size:var(--t-md);line-height:1.4;font-family:var(--font-display);max-width:none" data-copy="welcome.body">${d.t('welcome.body')}</p>
    <p style="margin-top:var(--s-7)"><a class="btn btn--line" href="${TEL}" data-copy="welcome.cta">${d.t('welcome.cta')}</a></p>
  </div>
</section>

<section id="book" class="sec sec--sheet close sec--narrow rv">
  <div class="wrap">
    <p class="label" data-copy="cta.final.eyebrow">${d.t('cta.final.eyebrow')}</p>
    <h2 data-copy="cta.final.h2">${d.t('cta.final.h2')}</h2>
    <p data-copy="cta.final.body">${d.t('cta.final.body')}</p>
    <div class="row-cta">
      <a class="btn btn--line" href="${BOOK}" data-copy="cta.final.primary">${d.t('cta.final.primary')}</a>
      <a class="btn btn--line" href="${TEL}" data-copy="cta.final.secondary">${d.t('cta.final.secondary')}</a>
    </div>
    <p class="close__note" data-copy="cta.final.note">${d.t('cta.final.note')}</p>
  </div>
</section>

</main>
${c.foot}
</div>`;
};

const servicesPage = (d) => {
  const c = chrome(d, { keyed: false, here: 'services' });
  return `${c.head}
<div class="sheet">
<main id="main">

<section id="services" class="sec rv">
  <div class="wrap">
    <p class="label" data-copy="svc.eyebrow">${d.t('svc.eyebrow')}</p>
    <h1 style="font-size:var(--t-lg);margin-bottom:var(--s-5)" data-copy="svc.h2">${d.t('svc.h2')}</h1>
    <p class="lede" style="margin-bottom:var(--s-8)" data-copy="svc.intro">${d.t('svc.intro')}</p>
    ${rows(services(d), { cls: 'idx', num: true })}
    <p class="idx__more" data-copy="svc.more">${d.t('svc.more')}</p>
  </div>
</section>

<section id="philosophy" class="sec sec--sheet rv">
  <div class="wrap split" style="grid-template-columns:minmax(0,4fr) minmax(0,7fr)">
    <div>
      <p class="label" data-copy="phil.eyebrow">${d.t('phil.eyebrow')}</p>
      <h2 class="h2" data-copy="phil.h2">${d.t('phil.h2')}</h2>
      <p class="pull" data-copy="phil.pull">${d.t('phil.pull')}</p>
    </div>
    <div class="split__body">
      <p data-copy="phil.body.1">${d.t('phil.body.1')}</p>
      <p data-copy="phil.body.2">${d.t('phil.body.2')}</p>
      <p data-copy="phil.body.3">${d.t('phil.body.3')}</p>
      <figure class="figure" style="margin-top:var(--s-7)">
        ${img('img.work.microscopy', { sizes: '(max-width:900px) 92vw, 46vw', prefix: c.P })}
        <figcaption data-copy="fig.microscopy.caption">${d.t('fig.microscopy.caption')}</figcaption>
      </figure>
    </div>
  </div>
</section>

</main>
${c.foot}
</div>`;
};

const practicePage = (d) => {
  const c = chrome(d, { keyed: false, here: 'practice' });
  const people = [...doctors(d), ...hygienists(d).map((h) => ({ ...h, role: null, rk: null }))];
  return `${c.head}
<div class="sheet">
<main id="main">

<section id="office" class="sec sec--base rv">
  <div class="wrap">
    <p class="label" data-copy="office.eyebrow">${d.t('office.eyebrow')}</p>
    <h1 style="font-size:var(--t-lg);margin-bottom:var(--s-5)" data-copy="office.h2">${d.t('office.h2')}</h1>
    <p class="lede" data-copy="office.body.1">${d.t('office.body.1')}</p>
    <p class="lede" style="margin-top:var(--s-5)" data-copy="office.body.2">${d.t('office.body.2')}</p>
    <p class="pull" data-copy="fig.office.caption">${d.t('fig.office.caption')}</p>
    ${rows(officeSpecs(d), { cls: 'idx idx--pair' })}
    ${rows(officeTech(d), { cls: 'idx idx--pair', title: 'h3' })}
  </div>
</section>

<section id="team" class="sec sec--sheet rv">
  <div class="wrap">
    <p class="label" data-copy="team.eyebrow">${d.t('team.eyebrow')}</p>
    <h2 class="h2" data-copy="team.h2">${d.t('team.h2')}</h2>
    <p class="lede" style="margin-bottom:var(--s-7)" data-copy="team.intro">${d.t('team.intro')}</p>
    <ol class="dir">
      ${people.map((p) => `<li>
        <div class="dir__ph">${img(p.asset, { sizes: '88px', prefix: c.P })}</div>
        <div><h3 data-copy="${p.nk}">${p.name}</h3>${p.rk ? `<p class="role" data-copy="${p.rk}">${p.role}</p>` : ''}</div>
        <div>${p.q ? `<blockquote data-copy="team.1.quote">${p.q}</blockquote>` : ''}<p class="bio" data-copy="${p.bk}">${p.bio}</p></div>
      </li>`).join('')}
    </ol>
    <p class="label" style="margin-top:var(--s-7)" data-copy="team.hyg.eyebrow">${d.t('team.hyg.eyebrow')}</p>
    <p class="emeritus" data-copy="team.emeritus">${d.t('team.emeritus')}</p>
  </div>
</section>

<section id="values" class="sec sec--tight rv">
  <div class="wrap">
    <p class="label" data-copy="values.eyebrow">${d.t('values.eyebrow')}</p>
    <h2 class="h2" data-copy="values.h2">${d.t('values.h2')}</h2>
    ${rows(values(d), { cls: 'idx idx--pair' })}
  </div>
</section>

</main>
${c.foot}
</div>`;
};

const visitPage = (d) => {
  const c = chrome(d, { keyed: false, here: 'visit' });
  return `${c.head}
<div class="sheet">
<main id="main">

<section id="visit" class="sec rv">
  <div class="wrap">
    <p class="label" data-copy="visit.eyebrow">${d.t('visit.eyebrow')}</p>
    <h1 style="font-size:var(--t-lg);margin-bottom:var(--s-7)" data-copy="visit.h2">${d.t('visit.h2')}</h1>
    <div style="display:grid;gap:var(--s-8);grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:start">
      ${rows(visitSteps(d), { cls: 'idx idx--pair' })}
      ${table(prices(d), { cls: 'ptable', caption: 'What a first appointment costs', headings: ['Item', 'Detail'] })}
    </div>
  </div>
</section>

<section id="faq" class="sec sec--sheet sec--col rv">
  <div class="wrap">
    <p class="label" data-copy="faq.eyebrow">${d.t('faq.eyebrow')}</p>
    <h2 class="h2" data-copy="faq.h2">${d.t('faq.h2')}</h2>
    ${faqList(faqs(d), { cls: 'faqs' })}
  </div>
</section>

<section id="reviews" class="sec sec--col rv">
  <div class="wrap">
    <p class="label" data-copy="proof.eyebrow">${d.t('proof.eyebrow')}</p>
    <div class="qs">${quotes(testimonials(d), {})}</div>
    <p class="qs__src" data-copy="proof.source">${d.t('proof.source')}</p>
  </div>
</section>

</main>
${c.foot}
</div>`;
};

const DESC = 'A Seattle holistic dental practice treating the mouth as part of the whole body. Metal-free, mercury-free, BPA-free and fluoride-free care, safe amalgam removal, and biological therapies in a low-toxicity office.';

export const PAGES = [
  { file: 'index.html', title: 'Integrative Dentistry — Holistic and Biological Dentistry in Seattle', description: DESC, body: home },
  { file: 'services/index.html', title: 'Services — Integrative Dentistry', description: 'Conventional dentistry, practiced biologically: safe mercury removal, zirconia implants, ozone, PRF, airway and TMJ work.', body: servicesPage },
  { file: 'practice/index.html', title: 'The practice — Integrative Dentistry', description: 'The office and its low-toxicity build-out, the technology, the doctors and hygienists, and the values the practice runs on.', body: practicePage },
  { file: 'visit/index.html', title: 'Your first visit — Integrative Dentistry', description: 'What to expect at a first appointment, what it costs, how insurance works, and the questions patients ask before they call.', body: visitPage },
];
