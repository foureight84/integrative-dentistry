/**
 * v5 — Chairside
 *
 * Grid row:    ratio 1.618 · radius 24 · container 960/1180/1400 · gap 48
 *              motion brisk [160,240,320] · ground carbon, ink paper-2, accent blue ×2
 * Format:      one-page, proof-first — the page opens with what patients say and
 *              then explains why they say it
 * Prohibition: never more than two columns. No card field, no three-up grid, no
 *              four-up team. Everything is one column or two, which is what makes
 *              a twelve-item service list become a run of rows and the team become
 *              a pair of columns.
 * Grounded in: grid only
 *
 * The golden-ratio scale is the loudest thing here: at 1.618 the display size is
 * four times the body, so hierarchy is carried almost entirely by size, which is
 * the opposite of v4's 1.125.
 */

import { BOOK, TEL, diffs, doctors, dl, faqList, faqs, heroProof, hygienists, img, officeSpecs, officeTech, prices, quotes, rows, services, table, testimonials, values, visitSteps } from './blocks.mjs';

export const SYSTEM = `
/* v5 — Chairside
   Grid row:    ratio 1.618 · radius 24 · container 960 · gap 48 · brisk
   Prohibition: never more than two columns
   Grounded in: grid only

   Palette mapping, re-keyed and re-measured for THIS mapping:
     ink    paper-2 on carbon     14.34   body and headings
     ink    paper-2 on carbon-2   13.51   on a panel
     muted  slate-400 on carbon    6.47   secondary
     muted  slate-400 on carbon-2  6.10   secondary on a panel
     accent blue on carbon         4.51   the eyebrow, on the ground only
     ink-black on blue             5.34   the primary button's label
   blue on carbon-2 is 4.25 — under AA for normal text, so the accent never
   appears as type on a panel. That one number is why the eyebrows sit on the
   ground and the panels carry no colour at all.
   Accent budget: 2 — the primary button and the section eyebrow. */
:root{
  --ratio:1.618;
  --t-xs:.688rem; --t-sm:.75rem; --t-base:1rem; --t-md:1.618rem;
  --t-lg:2.618rem; --t-xl:4.236rem;
  --t-display:clamp(2.618rem,1.2rem + 4.4vw,4.236rem);
  --lh-tight:1.02; --lh-body:1.66; --tr-display:-0.028em; --tr-body:0;
  --measure:58ch;

  --s-1:4px; --s-2:8px; --s-3:12px; --s-4:16px; --s-5:22px;
  --s-6:30px; --s-7:40px; --s-8:44px;
  --section-gap:48px; --card-pad:26px; --element-gap:18px;

  --r-button:24px; --r-card:24px; --r-input:24px; --r-image:24px;
  --hairline:1px; --bw-2:2px;
  --shadow-1:none; --shadow-2:none;

  --container:960px; --container-wide:1180px; --container-ultra:1400px; --gutter:24px;

  --d-fast:160ms; --d-base:240ms; --d-slow:320ms;
  --ease-out:cubic-bezier(.3,.7,.4,1); --ease-inout:cubic-bezier(.5,0,.3,1);
  --stagger:45ms;

  --ground:var(--carbon);
  --surface:var(--carbon-2);
  --outer:var(--ink-black);
  --ink:var(--paper-2);
  --ink-muted:var(--slate-400);
  --accent:var(--blue);
  --on-accent:var(--ink-black);
  --rule:rgba(233,239,246,.14);
  --rule-strong:rgba(233,239,246,.34);
}
@media (prefers-reduced-motion:reduce){
  :root{ --d-fast:1ms; --d-base:1ms; --d-slow:1ms; --stagger:0ms; }
}
`.trim();

export const CSS = `
html,body{background:var(--outer)}
main,.mast,.foot{background:var(--ground)}
/* A narrow page on an unbounded ground reads as an absence. This one is a sheet:
   the outer ground is the locked ink-black, the page is carbon, and the join is
   a hairline. The column stays deliberately narrow — that is the direction, not
   an oversight — and the space beside it is a margin because there is an edge. */
.sheet{max-width:var(--container-ultra);margin-inline:auto;
 border-inline:var(--hairline) solid var(--rule)}
@media (max-width:1500px){ html,body{background:var(--ground)} .sheet{border-inline:0} }

body{color:var(--ink);font:var(--t-base)/var(--lh-body) var(--font-body);-webkit-font-smoothing:antialiased}
h1,h2,h3{font-family:var(--font-display);font-weight:600;line-height:var(--lh-tight);
 letter-spacing:var(--tr-display)}
p{max-width:var(--measure)}

.wrap{width:min(100% - var(--gutter)*2, var(--container));max-width:var(--container);margin-inline:auto}
@media (max-width:560px){ :root{--gutter:16px} }
@media (min-width:1800px){ .wrap{width:min(100% - var(--gutter)*2, var(--container-wide));max-width:var(--container-wide)} }
@media (min-width:2400px){ .wrap{width:min(100% - var(--gutter)*2, var(--container-ultra));max-width:var(--container-ultra)} }

.sec{padding-block:var(--section-gap);background:var(--ground)}
.sec--panel{background:var(--surface)}
.sec--tight > .wrap{width:min(100% - var(--gutter)*2, 640px)}

@media (max-width:900px){
  [style*="grid-template-columns"]{grid-template-columns:minmax(0,1fr) !important}
  [style*="position:sticky"]{position:static !important}
}

.eyebrow{font:700 var(--t-xs)/1 var(--font-body);letter-spacing:.2em;text-transform:uppercase;
 color:var(--accent);margin-bottom:var(--s-5)}
.sec--panel .eyebrow{color:var(--ink-muted)}
.h2{font-size:var(--t-md);margin-bottom:var(--s-5);max-width:18ch}
.lede{font-size:var(--t-base);color:var(--ink-muted)}

/* Masthead. */
.mast{position:sticky;top:0;z-index:50;background:var(--ground);
 border-bottom:var(--hairline) solid var(--rule)}
.mast__in{display:flex;align-items:center;gap:var(--s-5);min-height:64px}
.mast__logo{display:inline-flex;align-items:center;min-height:48px;flex:0 0 auto}
.mast__logo img{width:168px;filter:invert(1)}
.mast__nav{display:flex;gap:var(--s-5);margin-left:auto;min-width:0}
.mast__nav a{display:inline-flex;align-items:center;min-height:48px;font-size:var(--t-sm);
 color:var(--ink-muted);text-decoration:none;transition:color var(--d-fast) var(--ease-out)}
.mast__nav a:hover{color:var(--ink)}
.mast__tel{display:inline-flex;align-items:center;min-height:48px;font-size:var(--t-sm);
 font-weight:600;text-decoration:none;white-space:nowrap}
@media (max-width:980px){ .mast__nav{display:none} }
@media (max-width:600px){
  .mast__in{flex-wrap:wrap;gap:var(--s-3);min-height:0;padding-block:var(--s-3)}
  .mast__logo img{width:150px}
  .mast__tel{margin-left:auto}
  .mast .btn{flex:1 1 100%}
}

.btn{display:inline-flex;align-items:center;justify-content:center;min-height:48px;
 padding:0 var(--s-6);border-radius:var(--r-button);font:600 var(--t-sm)/1 var(--font-body);
 text-decoration:none;transition:background-color var(--d-fast) var(--ease-out)}
.btn--primary{background:var(--accent);color:var(--on-accent)}
.btn--primary:hover{background:var(--ink)}
.btn--line{border:var(--hairline) solid var(--rule-strong);color:var(--ink)}
.btn--line:hover{background:var(--surface)}
.row-cta{display:flex;flex-wrap:wrap;gap:var(--s-4)}
@media (max-width:430px){ .btn{padding:0 var(--s-5);max-width:100%} .row-cta{flex-direction:column;align-items:stretch} }

/* Hero — the biggest type in the set, and almost nothing else. */
.hero{display:grid;gap:var(--s-7);align-items:center;padding-block:var(--s-7) var(--section-gap)}
.hero h1{font-size:var(--t-display);margin-bottom:var(--s-5);max-width:9ch}
.hero__sub{font-size:var(--t-base);color:var(--ink-muted);margin-bottom:var(--s-6);max-width:none}
.hero__art{border-radius:var(--r-image);overflow:hidden}
.hero__art img{width:100%;height:clamp(240px,26vw,360px);object-fit:cover}
.facts{display:grid;gap:var(--s-4);margin-top:var(--s-7)}
.facts > div{background:var(--surface);border-radius:var(--r-card);padding:var(--s-5) var(--s-6)}
.facts dt{font:600 var(--t-base)/1.3 var(--font-display);margin-bottom:var(--s-1)}
.facts dd{margin:0;font-size:var(--t-sm);color:var(--ink-muted);max-width:none}

/* Proof first — the page opens with what patients said. */
.qs{display:grid;gap:var(--s-6);max-width:62ch;margin-inline:auto}
.qs figure{margin:0}
.qs blockquote p{font-family:var(--font-display);font-size:var(--t-md);line-height:1.28;
 letter-spacing:var(--tr-display);max-width:none}
.qs figcaption{margin-top:var(--s-4);font:700 var(--t-xs)/1 var(--font-body);letter-spacing:.2em;
 text-transform:uppercase;color:var(--ink-muted)}
.qs__head{max-width:62ch;margin-inline:auto}
.qs__src{max-width:62ch;margin-inline:auto;margin-top:var(--s-6);font-size:var(--t-xs);
 letter-spacing:.2em;text-transform:uppercase;color:var(--ink-muted)}

/* A pinned label rail — the only two-track device this variant allows itself. */
.rail{align-self:start}
.stack{display:grid;gap:var(--s-5)}
.stack > div{background:var(--surface);border-radius:var(--r-card);padding:var(--card-pad)}
.stack h3{font-size:var(--t-base);margin-bottom:var(--s-3)}
.stack p{font-size:var(--t-sm);color:var(--ink-muted);max-width:none}

/* Rows. */
.idx{border-top:var(--hairline) solid var(--rule-strong)}
.idx li{display:grid;grid-template-columns:minmax(0,3.5ch) minmax(0,1fr);gap:var(--s-2) var(--s-5);
 padding-block:var(--s-5);border-bottom:var(--hairline) solid var(--rule)}
.idx .num{font:600 var(--t-sm)/1.6 var(--font-body);color:var(--ink-muted);font-variant-numeric:tabular-nums}
.idx h3{font-size:var(--t-base)}
.idx p{grid-column:2;font-size:var(--t-sm);color:var(--ink-muted);max-width:none}
.idx--pair li{grid-template-columns:minmax(0,18ch) minmax(0,1fr);gap:var(--s-5)}
.idx--pair p{grid-column:2}
@media (max-width:640px){
  .idx--pair li{grid-template-columns:1fr}
  .idx--pair p{grid-column:1}
}
.idx__more{margin-top:var(--s-5);font-size:var(--t-sm);color:var(--ink-muted);max-width:none}

.split{display:grid;gap:var(--s-7)}
.split__body p{max-width:none}
.split__body p + p{margin-top:var(--s-5)}
.pull{margin-top:var(--s-6);background:var(--surface);border-radius:var(--r-card);
 padding:var(--card-pad);font-family:var(--font-display);font-size:var(--t-base);line-height:1.4;
 max-width:none}
.figure{border-radius:var(--r-image);overflow:hidden;background:var(--surface)}
.figure img{width:100%;height:auto;max-width:512px}
.figure figcaption{padding:var(--s-5) var(--s-6);font-size:var(--t-sm);color:var(--ink-muted)}

/* People — two columns, never four. */
.team{display:grid;gap:var(--s-5);grid-template-columns:repeat(2,minmax(0,1fr))}
@media (max-width:760px){ .team{grid-template-columns:1fr} }
/* On a panel section a panel-coloured card is invisible. The people sit on the
   ground instead, which is the only surface pair this variant has. */
.sec--panel .person{background:var(--ground)}
.person{background:var(--surface);border-radius:var(--r-card);padding:var(--card-pad);
 display:grid;grid-template-columns:72px minmax(0,1fr);gap:var(--s-5);align-content:start}
.person img{width:72px;height:72px;object-fit:cover;border-radius:var(--r-button);background:var(--ground)}
.person h3{font-size:var(--t-base)}
.person .role{font-size:var(--t-sm);color:var(--ink-muted);margin-top:var(--s-1)}
.person .bio{grid-column:1/-1;font-size:var(--t-sm);color:var(--ink-muted);max-width:none}
.person blockquote{grid-column:1/-1;font-family:var(--font-display);font-size:var(--t-base);
 line-height:1.4}
.emeritus{margin-top:var(--s-5);font-size:var(--t-sm);color:var(--ink-muted);max-width:none}

/* Prices. */
.ptable{font-size:var(--t-sm);background:var(--surface);border-radius:var(--r-card);overflow:hidden}
.ptable caption{text-align:left;padding:var(--s-5) var(--s-6);
 font:600 var(--t-base)/1.3 var(--font-display)}
.ptable thead th{font-size:var(--t-xs);letter-spacing:.2em;text-transform:uppercase;
 color:var(--ink-muted);text-align:left;padding:var(--s-3) var(--s-6)}
.ptable th,.ptable td{text-align:left;vertical-align:top;padding:var(--s-5) var(--s-6);
 border-bottom:var(--hairline) solid var(--rule)}
.ptable tbody th{width:34%;font-weight:700}
.ptable td{color:var(--ink-muted)}
.ptable tbody tr:last-child th,.ptable tbody tr:last-child td{border-bottom:0}
@media (max-width:560px){
  .ptable thead{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}
  .ptable tbody th,.ptable tbody td{display:block;width:auto}
  .ptable tbody th{padding-bottom:var(--s-2);border-bottom:0}
}

/* Questions. */
.faqs{max-width:70ch;margin-inline:auto}
.faqs details{border-bottom:var(--hairline) solid var(--rule)}
.faqs details:first-child{border-top:var(--hairline) solid var(--rule)}
.faqs summary{cursor:pointer;list-style:none;padding-block:var(--s-5);display:flex;gap:var(--s-5);
 align-items:baseline;font:600 var(--t-base)/1.45 var(--font-body);min-height:44px}
.faqs summary::-webkit-details-marker{display:none}
.faqs summary::after{content:"+";margin-left:auto;color:var(--ink-muted);font-weight:400}
.faqs details[open] summary::after{content:"\\2013"}
.faqs details p{padding-bottom:var(--s-5);font-size:var(--t-sm);color:var(--ink-muted);max-width:none}
.faqs__head{max-width:70ch;margin-inline:auto}

/* Close. */
.close{max-width:52ch;margin-inline:auto;text-align:center}
.close h2{font-size:var(--t-md);margin:0 auto var(--s-5);max-width:none}
.close p{margin-inline:auto;color:var(--ink-muted);max-width:none}
.close .row-cta{justify-content:center;margin-block:var(--s-6) var(--s-4)}
.close__note{font-size:var(--t-sm)}

/* Footer. */
.foot{border-top:var(--hairline) solid var(--rule);padding-block:var(--s-8)}
.foot__grid{display:grid;gap:var(--s-6);grid-template-columns:repeat(2,minmax(0,1fr))}
@media (max-width:520px){ .foot__grid{grid-template-columns:1fr} }
.foot img{width:160px;filter:invert(1);margin-bottom:var(--s-4)}
.foot h2{font-size:var(--t-xs);letter-spacing:.2em;text-transform:uppercase;color:var(--ink-muted);
 margin-bottom:var(--s-4)}
.foot p,.foot a,.foot li{font-size:var(--t-sm);color:var(--ink-muted)}
.foot a{text-decoration:none}
.foot ul{display:grid;gap:var(--s-1);list-style:none;padding:0}
.foot ul a{display:inline-flex;align-items:center;min-height:44px}
.foot a:hover{color:var(--ink)}
.foot__base{margin-top:var(--s-6);padding-top:var(--s-5);border-top:var(--hairline) solid var(--rule);
 display:flex;flex-wrap:wrap;gap:var(--s-5);justify-content:space-between;font-size:var(--t-sm);
 color:var(--ink-muted)}
.tagline{font-size:var(--t-sm);color:var(--ink-muted)}
`.trim();

// --------------------------------------------------------------------------

const NAV = [['nav.2', '#services'], ['nav.1', '#philosophy'], ['nav.3', '#team'], ['nav.4', '#office'], ['nav.5', '#faq']];

const body = (d) => {
  const P = '../../';
  const doc = doctors(d);
  const hyg = hygienists(d);
  const card = (p) => `<article class="person">
        ${img(p.asset, { sizes: '72px', prefix: P })}
        <div><h3 data-copy="${p.nk}">${p.name}</h3>${p.rk ? `<p class="role" data-copy="${p.rk}">${p.role}</p>` : ''}</div>
        ${p.q ? `<blockquote data-copy="team.1.quote">${p.q}</blockquote>` : ''}
        <p class="bio" data-copy="${p.bk}">${p.bio}</p>
      </article>`;
  return `
<div class="sheet">
<header class="mast"><div class="wrap mast__in">
  <a class="mast__logo" href="#main">${img('img.brand.wordmark', { sizes: '168px', loading: 'eager', decorative: true, prefix: P })}<span class="vh" data-copy="brand.name">${d.t('brand.name')}</span></a>
  <nav class="mast__nav" aria-label="Main">${NAV.map(([k, href]) => `<a href="${href}" data-copy="${k}">${d.t(k)}</a>`).join('')}</nav>
  <a class="mast__tel" href="${TEL}" data-copy="contact.phone">${d.t('contact.phone')}</a>
  <a class="btn btn--primary" href="${BOOK}" data-copy="nav.cta">${d.t('nav.cta')}</a>
</div></header>

<main id="main">

<section id="hero" class="wrap hero rv" style="grid-template-columns:minmax(0,7fr) minmax(0,5fr)">
  <div>
    <p class="eyebrow" data-copy="hero.eyebrow">${d.t('hero.eyebrow')}</p>
    <h1 data-copy="hero.h1">${d.t('hero.h1')}</h1>
    <p class="hero__sub" data-copy="hero.sub">${d.t('hero.sub')}</p>
    <div class="row-cta">
      <a class="btn btn--primary" href="${BOOK}" data-copy="hero.cta.primary">${d.t('hero.cta.primary')}</a>
      <a class="btn btn--line" href="${TEL}" data-copy="hero.cta.secondary">${d.t('hero.cta.secondary')}</a>
    </div>
  </div>
  <figure class="hero__art">${img('img.hero.landscape.tall', { sizes: '(max-width:900px) 92vw, 38vw', loading: 'eager', prefix: P })}</figure>
</section>

<section id="reviews" class="sec sec--panel rv">
  <div class="wrap">
    <div class="qs__head"><p class="eyebrow" data-copy="proof.eyebrow">${d.t('proof.eyebrow')}</p></div>
    <div class="qs">${quotes(testimonials(d), {})}</div>
    <p class="qs__src" data-copy="proof.source">${d.t('proof.source')}</p>
  </div>
</section>

<section id="welcome" class="sec rv">
  <div class="wrap" style="max-width:62ch">
    <p class="eyebrow" data-copy="welcome.eyebrow">${d.t('welcome.eyebrow')}</p>
    <h2 class="h2" style="max-width:none" data-copy="welcome.h2">${d.t('welcome.h2')}</h2>
    <p class="lede" style="max-width:none" data-copy="welcome.body">${d.t('welcome.body')}</p>
    <div class="row-cta" style="margin-top:var(--s-6)">
      <a class="btn btn--line" href="${TEL}" data-copy="welcome.cta">${d.t('welcome.cta')}</a>
    </div>
    ${dl(heroProof(d), { cls: 'facts' })}
  </div>
</section>

<section id="different" class="sec rv">
  <div class="wrap split" style="grid-template-columns:minmax(0,4fr) minmax(0,7fr)">
    <div class="rail" style="position:sticky;top:96px">
      <p class="eyebrow" data-copy="diff.eyebrow">${d.t('diff.eyebrow')}</p>
      <h2 class="h2" data-copy="diff.h2">${d.t('diff.h2')}</h2>
      <p class="lede" data-copy="diff.intro">${d.t('diff.intro')}</p>
    </div>
    <div>
      <div class="stack">
        ${diffs(d).map((i) => `<div><h3 data-copy="${i.tk}">${i.t}</h3><p data-copy="${i.bk}">${i.b}</p></div>`).join('')}
      </div>
      <p class="lede" style="margin-top:var(--s-5);max-width:none" data-copy="diff.closing">${d.t('diff.closing')}</p>
    </div>
  </div>
</section>

<section id="services" class="sec sec--panel rv">
  <div class="wrap">
    <p class="eyebrow" data-copy="svc.eyebrow">${d.t('svc.eyebrow')}</p>
    <h2 class="h2" data-copy="svc.h2">${d.t('svc.h2')}</h2>
    <p class="lede" style="margin-bottom:var(--s-6);max-width:none" data-copy="svc.intro">${d.t('svc.intro')}</p>
    ${rows(services(d), { cls: 'idx', num: true })}
    <p class="idx__more" data-copy="svc.more">${d.t('svc.more')}</p>
  </div>
</section>

<section id="philosophy" class="sec rv">
  <div class="wrap split" style="grid-template-columns:minmax(0,5fr) minmax(0,7fr)">
    <div>
      <p class="eyebrow" data-copy="phil.eyebrow">${d.t('phil.eyebrow')}</p>
      <h2 class="h2" data-copy="phil.h2">${d.t('phil.h2')}</h2>
      <figure class="figure" style="margin-top:var(--s-6)">
        ${img('img.work.microscopy', { sizes: '(max-width:900px) 92vw, 38vw', prefix: P })}
        <figcaption data-copy="fig.microscopy.caption">${d.t('fig.microscopy.caption')}</figcaption>
      </figure>
    </div>
    <div class="split__body">
      <p data-copy="phil.body.1">${d.t('phil.body.1')}</p>
      <p data-copy="phil.body.2">${d.t('phil.body.2')}</p>
      <p data-copy="phil.body.3">${d.t('phil.body.3')}</p>
      <p class="pull" data-copy="phil.pull">${d.t('phil.pull')}</p>
    </div>
  </div>
</section>

<section id="team" class="sec sec--panel rv">
  <div class="wrap">
    <p class="eyebrow" data-copy="team.eyebrow">${d.t('team.eyebrow')}</p>
    <h2 class="h2" data-copy="team.h2">${d.t('team.h2')}</h2>
    <p class="lede" style="margin-bottom:var(--s-6);max-width:none" data-copy="team.intro">${d.t('team.intro')}</p>
    <div class="team" style="grid-template-columns:repeat(2,minmax(0,1fr))">
      ${doc.map(card).join('')}
    </div>
    <p class="eyebrow" style="margin-top:var(--s-7)" data-copy="team.hyg.eyebrow">${d.t('team.hyg.eyebrow')}</p>
    <div class="team">
      ${hyg.map((p) => card({ ...p, role: null, rk: null })).join('')}
    </div>
    <p class="emeritus" data-copy="team.emeritus">${d.t('team.emeritus')}</p>
  </div>
</section>

<section id="office" class="sec rv">
  <div class="wrap split" style="grid-template-columns:minmax(0,4fr) minmax(0,7fr)">
    <div class="rail" style="position:sticky;top:96px">
      <p class="eyebrow" data-copy="office.eyebrow">${d.t('office.eyebrow')}</p>
      <h2 class="h2" data-copy="office.h2">${d.t('office.h2')}</h2>
      <p class="pull" data-copy="fig.office.caption">${d.t('fig.office.caption')}</p>
    </div>
    <div>
      <p class="lede" style="max-width:none" data-copy="office.body.1">${d.t('office.body.1')}</p>
      <p class="lede" style="margin-top:var(--s-5);max-width:none" data-copy="office.body.2">${d.t('office.body.2')}</p>
      ${rows(officeSpecs(d), { cls: 'idx idx--pair' })}
      ${rows(officeTech(d), { cls: 'idx idx--pair' })}
    </div>
  </div>
</section>

<section id="values" class="sec sec--panel sec--tight rv">
  <div class="wrap">
    <p class="eyebrow" data-copy="values.eyebrow">${d.t('values.eyebrow')}</p>
    <h2 class="h2" data-copy="values.h2">${d.t('values.h2')}</h2>
    ${rows(values(d), { cls: 'idx idx--pair' })}
  </div>
</section>

<section id="visit" class="sec rv">
  <div class="wrap">
    <p class="eyebrow" data-copy="visit.eyebrow">${d.t('visit.eyebrow')}</p>
    <h2 class="h2" data-copy="visit.h2">${d.t('visit.h2')}</h2>
    <div class="split" style="grid-template-columns:minmax(0,1fr) minmax(0,1fr)">
      ${rows(visitSteps(d), { cls: 'idx idx--pair' })}
      ${table(prices(d), { cls: 'ptable', caption: 'What a first appointment costs', headings: ['Item', 'Detail'] })}
    </div>
  </div>
</section>

<section id="faq" class="sec sec--panel rv">
  <div class="wrap">
    <div class="faqs__head">
      <p class="eyebrow" data-copy="faq.eyebrow">${d.t('faq.eyebrow')}</p>
      <h2 class="h2" data-copy="faq.h2">${d.t('faq.h2')}</h2>
    </div>
    ${faqList(faqs(d), { cls: 'faqs' })}
  </div>
</section>

<section id="book" class="sec rv">
  <div class="wrap"><div class="close">
    <p class="eyebrow" data-copy="cta.final.eyebrow">${d.t('cta.final.eyebrow')}</p>
    <h2 data-copy="cta.final.h2">${d.t('cta.final.h2')}</h2>
    <p data-copy="cta.final.body">${d.t('cta.final.body')}</p>
    <div class="row-cta">
      <a class="btn btn--primary" href="${BOOK}" data-copy="cta.final.primary">${d.t('cta.final.primary')}</a>
      <a class="btn btn--line" href="${TEL}" data-copy="cta.final.secondary">${d.t('cta.final.secondary')}</a>
    </div>
    <p class="close__note" data-copy="cta.final.note">${d.t('cta.final.note')}</p>
  </div></div>
</section>

</main>

<footer class="foot"><div class="wrap">
  <div class="foot__grid">
    <div>${img('img.brand.wordmark', { sizes: '160px', decorative: true, prefix: P })}<p class="tagline" data-copy="brand.tagline">${d.t('brand.tagline')}</p></div>
    <div><h2>Visit</h2><p data-copy="contact.neighborhood">${d.t('contact.neighborhood')}</p><p data-copy="contact.address">${d.t('contact.address')}</p><p data-copy="contact.hours">${d.t('contact.hours')}</p>
      <ul style="margin-top:var(--s-4)"><li><a href="${TEL}"><span data-copy="contact.phone">${d.t('contact.phone')}</span></a></li><li><a href="mailto:${d.t('contact.email')}" data-copy="contact.email">${d.t('contact.email')}</a></li></ul></div>
  </div>
  <div class="foot__base"><span data-copy="footer.legal">${d.t('footer.legal')}</span><span data-copy="footer.hipaa">${d.t('footer.hipaa')}</span></div>
</div></footer>
</div>`;
};

export const PAGES = [
  {
    file: 'index.html',
    title: 'Integrative Dentistry — Holistic and Biological Dentistry in Seattle',
    description: 'A Seattle holistic dental practice treating the mouth as part of the whole body. Metal-free, mercury-free, BPA-free and fluoride-free care, safe amalgam removal, and biological therapies in a low-toxicity office.',
    body,
  },
];
