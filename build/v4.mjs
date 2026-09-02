/**
 * v4 — Dispensary
 *
 * Grid row:    ratio 1.125 · radius 999 buttons / 16 cards · container 1600/1880/2200
 *              gap 160 · motion active [380,520,680] · ground slate-900, ink paper, accent blue ×4
 * Format:      hub — a short front page that routes, with the substance on three spokes
 * Prohibition: no border, anywhere. Every boundary on this page is a change of
 *              surface, which is why the cards are what they are and why the
 *              spacing has to do more work than usual.
 * Grounded in: grid only
 *
 * The tight 1.125 scale is the other half of that idea: headings are barely
 * larger than body text, so hierarchy has to come from weight, surface and
 * space. It is the opposite problem from v2, and it produces a different page.
 */

import { BOOK, TEL, cards, diffs, doctors, dl, faqList, faqs, heroProof, hygienists, img, officeSpecs, officeTech, prices, quotes, rows, services, table, testimonials, values, visitSteps } from './blocks.mjs';

export const SYSTEM = `
/* v4 — Dispensary
   Grid row:    ratio 1.125 · radius 999/16 · container 1600 · gap 160 · active
   Prohibition: no border anywhere — separation by surface only
   Grounded in: grid only

   Palette mapping, re-keyed and re-measured for THIS mapping:
     ink    paper on slate-900    17.06   body and headings
     ink    paper on slate-800    13.98   on a card
     muted  slate-400 on slate-900 6.96   secondary
     muted  slate-400 on slate-800 5.71   secondary on a card
     accent blue on slate-900      4.85   the section eyebrows
     accent blue on ink-black      5.34   the eyebrow inside a recessed panel
     ink-black on blue             5.34   the primary button's label
   blue on slate-800 measures 3.98 — large text and UI only. That single number
   decides where the accent may and may not go in this variant: the eyebrows sit
   on the ground and on the recess, never on a card, and every numeral, marker
   and disclosure glyph that would have been blue is muted ink instead.
   Accent budget: 2 — the primary button and the section eyebrows. */
:root{
  --ratio:1.125;
  --t-xs:.79rem; --t-sm:.889rem; --t-base:1.0625rem; --t-md:1.195rem;
  --t-lg:1.345rem; --t-xl:1.513rem; --t-2xl:1.702rem;
  --t-display:clamp(1.702rem,1.1rem + 1.9vw,2.421rem);
  --lh-tight:1.2; --lh-body:1.68; --tr-display:-0.006em; --tr-body:0;
  --measure:62ch;

  --s-1:4px; --s-2:8px; --s-3:12px; --s-4:20px; --s-5:28px;
  --s-6:40px; --s-7:64px; --s-8:96px;
  --section-gap:160px; --card-pad:36px; --element-gap:24px;

  --r-button:999px; --r-card:16px; --r-input:999px; --r-image:16px;
  --hairline:0; --bw-2:2px;   /* no borders anywhere: this is the prohibition */
  --shadow-1:none; --shadow-2:none;

  --container:1600px; --container-wide:1880px; --container-ultra:2200px; --gutter:40px;

  --d-fast:380ms; --d-base:520ms; --d-slow:680ms;
  --ease-out:cubic-bezier(.2,.8,.2,1); --ease-inout:cubic-bezier(.6,0,.2,1);
  --stagger:70ms;

  --ground:var(--slate-900);
  --surface:var(--slate-800);
  --recess:var(--ink-black);
  --ink:var(--paper);
  --ink-muted:var(--slate-400);
  --accent:var(--blue);
  --on-accent:var(--ink-black);
}
@media (prefers-reduced-motion:reduce){
  :root{ --d-fast:1ms; --d-base:1ms; --d-slow:1ms; --stagger:0ms; }
}
`.trim();

export const CSS = `
html,body,main{background:var(--ground)}
body{color:var(--ink);font:var(--t-base)/var(--lh-body) var(--font-body);-webkit-font-smoothing:antialiased}
h1,h2,h3{font-family:var(--font-display);font-weight:600;line-height:var(--lh-tight);
 letter-spacing:var(--tr-display)}
p{max-width:var(--measure)}

.wrap{width:min(100% - var(--gutter)*2, var(--container));max-width:var(--container);margin-inline:auto}
@media (max-width:560px){ :root{--gutter:20px} }
@media (min-width:1800px){ .wrap{width:min(100% - var(--gutter)*2, var(--container-wide));max-width:var(--container-wide)} }
@media (min-width:2400px){ .wrap{width:min(100% - var(--gutter)*2, var(--container-ultra));max-width:var(--container-ultra)} }

.sec{padding-block:var(--section-gap);background:var(--ground)}
.sec--recess{background:var(--recess)}
.sec--col > .wrap{width:min(100% - var(--gutter)*2, 900px)}

@media (max-width:1000px){
  [style*="grid-template-columns"]{grid-template-columns:minmax(0,1fr) !important}
}

.eyebrow{font:700 var(--t-xs)/1 var(--font-body);letter-spacing:.2em;text-transform:uppercase;
 color:var(--accent);margin-bottom:var(--s-5)}
.h2{font-size:var(--t-2xl);margin-bottom:var(--s-5)}
.lede{font-size:var(--t-md);color:var(--ink-muted)}

/* Masthead — a pill of surface floating on the ground, no rule under it. */
.mast{padding-block:var(--s-4);background:var(--ground);position:sticky;top:0;z-index:50}
.mast__in{display:flex;align-items:center;gap:var(--s-5);min-height:72px;background:var(--surface);
 border-radius:var(--r-button);padding-inline:var(--s-5) var(--s-3)}
.mast__logo{display:inline-flex;align-items:center;min-height:48px;flex:0 0 auto}
.mast__logo img{width:184px;filter:invert(1)}
.mast__nav{display:flex;gap:var(--s-2);margin-left:auto;min-width:0}
.mast__nav a{display:inline-flex;align-items:center;min-height:48px;padding-inline:var(--s-4);
 border-radius:var(--r-button);font:600 var(--t-sm)/1 var(--font-body);color:var(--ink-muted);
 text-decoration:none;transition:background-color var(--d-fast) var(--ease-out),color var(--d-fast) var(--ease-out)}
.mast__nav a:hover{background:var(--recess);color:var(--ink)}
/* The current page is marked with a filled pill and full-strength ink, not with
   the accent: blue on this card surface is 3.98:1, and a nav label is text. */
.mast__nav a[aria-current="page"]{background:var(--recess);color:var(--ink)}
.mast__tel{display:inline-flex;align-items:center;min-height:48px;padding-inline:var(--s-4);
 font-size:var(--t-sm);font-weight:600;text-decoration:none;white-space:nowrap}
@media (max-width:1120px){ .mast__nav{display:none} }
@media (max-width:620px){
  .mast__in{flex-wrap:wrap;border-radius:var(--r-card);padding:var(--s-3) var(--s-4);min-height:0}
  .mast__logo img{width:156px}
  .mast__tel{margin-left:auto}
  .mast .btn{flex:1 1 100%}
}

.btn{display:inline-flex;align-items:center;justify-content:center;min-height:52px;
 padding:0 var(--s-6);border-radius:var(--r-button);font:600 var(--t-sm)/1 var(--font-body);
 text-decoration:none;transition:transform var(--d-fast) var(--ease-out),
 background-color var(--d-fast) var(--ease-out)}
.btn--primary{background:var(--accent);color:var(--on-accent)}
.btn--primary:hover{background:var(--paper);transform:translateY(-2px)}
.btn--soft{background:var(--surface);color:var(--ink)}
.btn--soft:hover{background:var(--recess);transform:translateY(-2px)}
.row-cta{display:flex;flex-wrap:wrap;gap:var(--s-4)}
@media (max-width:430px){ .btn{padding:0 var(--s-5);max-width:100%} .row-cta{flex-direction:column;align-items:stretch} }

/* Hero. */
/* The right track carries a picture rather than three short facts. A panel whose
   text is four words wide leaves the section's ink stopping a quarter of the way
   from the right edge however wide the panel's own box is — the balance a reader
   sees is the glyph run, not the box that holds it. The facts run full width
   underneath, where each one has a third of the page to fill. */
.hero{display:grid;gap:var(--s-8);align-items:center;padding-block:var(--s-7) var(--section-gap)}
.hero h1{font-size:var(--t-display);margin-bottom:var(--s-5);max-width:14ch}
.hero__sub{font-size:var(--t-md);color:var(--ink-muted);margin-bottom:var(--s-7);max-width:46ch}
.hero__art{border-radius:var(--r-card);overflow:hidden;background:var(--surface)}
.hero__art img{width:100%;height:clamp(300px,30vw,460px);object-fit:cover}
.hero__plate{grid-column:1/-1;display:grid;gap:var(--s-5);margin-top:var(--s-7)}
.hero__plate > div{background:var(--surface);border-radius:var(--r-card);padding:var(--s-5) var(--s-6)}
.hero__plate dt{font:600 var(--t-md)/1.25 var(--font-display);margin-bottom:var(--s-2)}
.hero__plate dd{margin:0;font-size:var(--t-sm);color:var(--ink-muted);max-width:none}

/* Cards — the only separation device this variant has. */
.cardset{display:grid;gap:var(--s-5)}
.card{background:var(--surface);border-radius:var(--r-card);padding:var(--card-pad);
 transition:transform var(--d-base) var(--ease-out),background-color var(--d-base) var(--ease-out)}
.card:hover{transform:translateY(-4px);background:var(--recess)}
.card h3{font-size:var(--t-lg);margin-bottom:var(--s-3)}
.card p{font-size:var(--t-sm);color:var(--ink-muted);max-width:none}
.card .num{display:block;font:700 var(--t-xs)/1 var(--font-body);letter-spacing:.16em;
 color:var(--ink-muted);margin-bottom:var(--s-4)}
/* The one signature gesture, and the reason this variant ships no render: the
   field arrives as its own recess and each cell settles to the card surface in
   turn. It is the page's own grid made briefly visible and then resolving into
   the composition the content sits on — the same anchor a rendered piece would
   have used, done in eight lines that stay sharp at 2200px. */
.js .cardset .card,.js .team .person,.js .vals > div{background:var(--recess);
 transition:background-color var(--d-slow) var(--ease-out),transform var(--d-base) var(--ease-out)}
.js .rv.in .cardset .card,.js .rv.in .team .person,.js .rv.in .vals > div{background:var(--surface)}
.js .rv.in .cardset .card:nth-child(3n+2){transition-delay:calc(var(--stagger)*1)}
.js .rv.in .cardset .card:nth-child(3n+3){transition-delay:calc(var(--stagger)*2)}
.js .rv.in .team .person:nth-child(even){transition-delay:calc(var(--stagger)*1)}
@media (prefers-reduced-motion:reduce){
  .js .cardset .card,.js .team .person,.js .vals > div{background:var(--surface);transition:none}
}
.svcset{grid-template-columns:repeat(3,minmax(0,1fr))}
@media (max-width:1100px){ .svcset{grid-template-columns:repeat(2,minmax(0,1fr))} }
@media (max-width:660px){ .svcset{grid-template-columns:1fr} }
.svc__more{margin-top:var(--s-6);font-size:var(--t-sm);color:var(--ink-muted);max-width:none;
 background:var(--surface);border-radius:var(--r-card);padding:var(--card-pad)}

/* Routing panels on the hub page. */
.route{display:grid;gap:var(--s-5)}
.route a{display:block;background:var(--surface);border-radius:var(--r-card);padding:var(--card-pad);
 text-decoration:none;min-height:44px;
 transition:transform var(--d-base) var(--ease-out),background-color var(--d-base) var(--ease-out)}
.route a:hover{transform:translateY(-4px);background:var(--recess)}
.route h3{font-size:var(--t-xl);margin-bottom:var(--s-3)}
.route p{font-size:var(--t-sm);color:var(--ink-muted);max-width:none}
.route .go{display:inline-block;margin-top:var(--s-5);font:700 var(--t-xs)/1 var(--font-body);
 letter-spacing:.2em;text-transform:uppercase;color:var(--ink-muted)}

/* Split panels. */
.split{display:grid;gap:var(--s-8)}
.panel{background:var(--surface);border-radius:var(--r-card);padding:var(--card-pad)}
.panel p{max-width:none}
.panel p + p{margin-top:var(--s-5)}
.pull{font-family:var(--font-display);font-size:var(--t-xl);line-height:1.3;
 background:var(--recess);border-radius:var(--r-card);padding:var(--card-pad);max-width:none}
.figure{background:var(--surface);border-radius:var(--r-card);overflow:hidden}
.figure img{width:100%;height:auto;max-width:512px}
.figure figcaption{padding:var(--s-5) var(--s-6);font-size:var(--t-sm);color:var(--ink-muted)}

/* Spec rows — surface stripes, since there are no rules to divide them. */
.specs{display:grid;gap:var(--s-2)}
.specs li{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.6fr);gap:var(--s-6);
 background:var(--surface);border-radius:var(--r-card);padding:var(--s-5) var(--s-6)}
.specs li:nth-child(even){background:var(--recess)}
.specs li h3{font-size:var(--t-base)}
.specs li p{font-size:var(--t-sm);color:var(--ink-muted);max-width:none}
@media (max-width:760px){ .specs li{grid-template-columns:1fr;gap:var(--s-2)} }

/* People. */
.team{display:grid;gap:var(--s-5)}
.person{background:var(--surface);border-radius:var(--r-card);padding:var(--card-pad)}
.person img{width:112px;height:112px;object-fit:cover;border-radius:var(--r-button);
 background:var(--recess);margin-bottom:var(--s-5)}
.person h3{font-size:var(--t-lg)}
.person .role{font-size:var(--t-sm);color:var(--ink-muted);margin-block:var(--s-2) var(--s-4)}
.person .bio{font-size:var(--t-sm);color:var(--ink-muted);max-width:none}
.person blockquote{font-family:var(--font-display);font-size:var(--t-base);line-height:1.4;
 margin-bottom:var(--s-4)}
.hyg{display:grid;gap:var(--s-5);grid-template-columns:repeat(4,minmax(0,1fr));margin-top:var(--s-5)}
@media (max-width:1000px){ .hyg{grid-template-columns:repeat(2,minmax(0,1fr))} }
@media (max-width:560px){ .hyg{grid-template-columns:1fr} }
.emeritus{margin-top:var(--s-5);background:var(--recess);border-radius:var(--r-card);
 padding:var(--card-pad);font-size:var(--t-sm);color:var(--ink-muted);max-width:none}

/* Values. */
.vals{display:grid;gap:var(--s-5)}
.vals > div{background:var(--surface);border-radius:var(--r-card);padding:var(--card-pad)}
.vals dt{font-family:var(--font-display);font-size:var(--t-lg);margin-bottom:var(--s-3)}
.vals dd{margin:0;font-size:var(--t-sm);color:var(--ink-muted)}

/* Steps and the price table. */
.steps{display:grid;gap:var(--s-4)}
.steps li{background:var(--surface);border-radius:var(--r-card);padding:var(--s-5) var(--s-6);
 display:grid;grid-template-columns:auto minmax(0,1fr);gap:var(--s-5)}
.steps .num{font:700 var(--t-xs)/1.6 var(--font-body);letter-spacing:.16em;color:var(--ink-muted)}
.steps h3{font-size:var(--t-base);margin-bottom:var(--s-2)}
.steps p{grid-column:2;font-size:var(--t-sm);color:var(--ink-muted);max-width:none}
.ptable{font-size:var(--t-sm);background:var(--surface);border-radius:var(--r-card);overflow:hidden}
.ptable caption{text-align:left;padding:var(--s-6);font:600 var(--t-md)/1.3 var(--font-display);
 background:var(--recess)}
.ptable thead th{font-size:var(--t-xs);letter-spacing:.16em;text-transform:uppercase;
 color:var(--ink-muted);text-align:left;padding:var(--s-4) var(--s-6)}
.ptable th,.ptable td{text-align:left;vertical-align:top;padding:var(--s-5) var(--s-6)}
.ptable tbody tr:nth-child(even){background:var(--recess)}
.ptable tbody th{width:32%;font-weight:700}
.ptable td{color:var(--ink-muted)}
@media (max-width:560px){
  .ptable thead{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}
  .ptable tbody th,.ptable tbody td{display:block;width:auto}
  .ptable tbody th{padding-bottom:var(--s-2)}
}

/* Questions — each one its own panel, because there are no rules to separate them. */
.faqs{display:grid;gap:var(--s-3)}
.faqs details{background:var(--surface);border-radius:var(--r-card)}
.faqs details[open]{background:var(--recess)}
.faqs summary{cursor:pointer;list-style:none;padding:var(--s-5) var(--s-6);display:flex;
 gap:var(--s-5);align-items:baseline;font:600 var(--t-md)/1.4 var(--font-display);min-height:44px}
.faqs summary::-webkit-details-marker{display:none}
.faqs summary::after{content:"+";margin-left:auto;color:var(--ink-muted);font-weight:400}
.faqs details[open] summary::after{content:"\\2013"}
.faqs details p{padding:0 var(--s-6) var(--s-6);font-size:var(--t-sm);color:var(--ink-muted);max-width:none}

/* Quotes. */
.qs{display:grid;gap:var(--s-5)}
.qs figure{margin:0;background:var(--surface);border-radius:var(--r-card);padding:var(--card-pad);
 display:flex;flex-direction:column;gap:var(--s-5)}
.qs blockquote p{font-size:var(--t-base);max-width:none}
.qs figcaption{margin-top:auto;font:700 var(--t-xs)/1 var(--font-body);letter-spacing:.16em;
 text-transform:uppercase;color:var(--ink-muted)}
.qs__src{margin-top:var(--s-5);font-size:var(--t-xs);letter-spacing:.16em;text-transform:uppercase;
 color:var(--ink-muted)}

/* Close. */
/* The closing panel is the deepest surface on the page, which is also what makes
   its blue eyebrow legible: 5.34:1 on the recess against 3.98 on a card. */
.close{background:var(--recess);border-radius:var(--r-card);padding:var(--s-8) var(--card-pad);
 text-align:center}
.close h2{font-size:var(--t-2xl);margin-bottom:var(--s-5)}
.close p{margin-inline:auto;color:var(--ink-muted);max-width:56ch}
.close .row-cta{justify-content:center;margin-block:var(--s-7) var(--s-5)}
.close__note{font-size:var(--t-sm)}

/* Footer. */
.foot{padding-block:var(--s-8);background:var(--recess)}
.foot__grid{display:grid;gap:var(--s-7);grid-template-columns:repeat(4,minmax(0,1fr));align-items:start}
@media (max-width:820px){ .foot__grid{grid-template-columns:repeat(2,minmax(0,1fr))} }
@media (max-width:520px){ .foot__grid{grid-template-columns:1fr} }
.foot img{width:176px;filter:invert(1);margin-bottom:var(--s-4)}
.foot h2{font-size:var(--t-xs);letter-spacing:.2em;text-transform:uppercase;color:var(--ink-muted);
 margin-bottom:var(--s-4)}
.foot p,.foot a,.foot li{font-size:var(--t-sm);color:var(--ink-muted)}
.foot a{text-decoration:none}
.foot ul{display:grid;gap:var(--s-1);list-style:none;padding:0}
.foot ul a{display:inline-flex;align-items:center;min-height:44px}
.foot a:hover{color:var(--ink)}
.foot__base{margin-top:var(--s-8);display:flex;flex-wrap:wrap;gap:var(--s-5);
 justify-content:space-between;font-size:var(--t-sm);color:var(--ink-muted)}
.tagline{font-size:var(--t-sm);color:var(--ink-muted)}
`.trim();

// --------------------------------------------------------------------------

const SPOKES = [
  { id: 'care', href: 'care/index.html', nav: 'nav.2' },
  { id: 'practice', href: 'practice/index.html', nav: 'nav.1' },
  { id: 'visit', href: 'visit/index.html', nav: 'nav.5' },
];

const chrome = (d, { keyed, here }) => {
  const up = here === 'home' ? '' : '../';
  const P = here === 'home' ? '../../' : '../../../';
  const k = (key) => (keyed ? ` data-copy="${key}"` : '');
  return {
    P, up,
    head: `<header class="mast"><div class="wrap mast__in">
  <a class="mast__logo" href="${up}index.html">${img('img.brand.wordmark', { sizes: '184px', loading: 'eager', decorative: true, prefix: P })}<span class="vh"${k('brand.name')}>${d.t('brand.name')}</span></a>
  <nav class="mast__nav" aria-label="Main">
    ${SPOKES.map((s) => `<a href="${up}${s.href}"${s.id === here ? ' aria-current="page"' : ''}${k(s.nav)}>${d.t(s.nav)}</a>`).join('')}
    <a href="${up}practice/index.html#team"${k('nav.3')}>${d.t('nav.3')}</a>
    <a href="${up}practice/index.html#office"${k('nav.4')}>${d.t('nav.4')}</a>
  </nav>
  <a class="mast__tel" href="${TEL}"${k('contact.phone')}>${d.t('contact.phone')}</a>
  <a class="btn btn--primary" href="${BOOK}"${k('nav.cta')}>${d.t('nav.cta')}</a>
</div></header>`,
    foot: `<footer class="foot"><div class="wrap">
  <div class="foot__grid">
    <div>${img('img.brand.wordmark', { sizes: '176px', decorative: true, prefix: P })}<p class="tagline"${k('brand.tagline')}>${d.t('brand.tagline')}</p></div>
    <div><h2>Visit</h2><p${k('contact.neighborhood')}>${d.t('contact.neighborhood')}</p><p${k('contact.address')}>${d.t('contact.address')}</p><p${k('contact.hours')}>${d.t('contact.hours')}</p></div>
    <div><h2>Contact</h2><ul><li><a href="${TEL}"><span${k('contact.phone')}>${d.t('contact.phone')}</span></a></li><li><a href="mailto:${d.t('contact.email')}"${k('contact.email')}>${d.t('contact.email')}</a></li></ul></div>
    <div><h2>Pages</h2><ul>${SPOKES.map((s) => `<li><a href="${up}${s.href}">${d.t(s.nav)}</a></li>`).join('')}</ul></div>
  </div>
  <div class="foot__base"><span${k('footer.legal')}>${d.t('footer.legal')}</span><span${k('footer.hipaa')}>${d.t('footer.hipaa')}</span></div>
</div></footer>`,
  };
};

const home = (d) => {
  const c = chrome(d, { keyed: true, here: 'home' });
  return `${c.head}
<main id="main">

<section id="hero" class="wrap hero rv" style="grid-template-columns:minmax(0,1fr) minmax(0,1fr)">
  <div>
    <p class="eyebrow" data-copy="hero.eyebrow">${d.t('hero.eyebrow')}</p>
    <h1 data-copy="hero.h1">${d.t('hero.h1')}</h1>
    <p class="hero__sub" data-copy="hero.sub">${d.t('hero.sub')}</p>
    <div class="row-cta">
      <a class="btn btn--primary" href="${BOOK}" data-copy="hero.cta.primary">${d.t('hero.cta.primary')}</a>
      <a class="btn btn--soft" href="${TEL}" data-copy="hero.cta.secondary">${d.t('hero.cta.secondary')}</a>
    </div>
  </div>
  <figure class="hero__art">${img('img.hero.landscape.tall', { sizes: '(max-width:1000px) 92vw, 46vw', loading: 'eager', prefix: '../../' })}</figure>
  ${dl(heroProof(d), { cls: 'hero__plate' }).replace('class="hero__plate"', 'class="hero__plate" style="grid-template-columns:repeat(3,minmax(0,1fr))"')}
</section>

<section id="welcome" class="sec sec--recess sec--col rv">
  <div class="wrap">
    <p class="eyebrow" data-copy="welcome.eyebrow">${d.t('welcome.eyebrow')}</p>
    <h2 class="h2" data-copy="welcome.h2">${d.t('welcome.h2')}</h2>
    <p class="lede" style="max-width:none" data-copy="welcome.body">${d.t('welcome.body')}</p>
    <p style="margin-top:var(--s-7)"><a class="btn btn--soft" href="${TEL}" data-copy="welcome.cta">${d.t('welcome.cta')}</a></p>
  </div>
</section>

<section id="different" class="sec rv">
  <div class="wrap">
    <p class="eyebrow" data-copy="diff.eyebrow">${d.t('diff.eyebrow')}</p>
    <h2 class="h2" data-copy="diff.h2">${d.t('diff.h2')}</h2>
    <p class="lede" style="margin-bottom:var(--s-7)" data-copy="diff.intro">${d.t('diff.intro')}</p>
    ${cards(diffs(d), { cls: 'cardset', card: 'card' }).replace('class="cardset"', 'class="cardset" style="grid-template-columns:repeat(4,minmax(0,1fr))"')}
    <p class="lede" style="margin-top:var(--s-6);max-width:none" data-copy="diff.closing">${d.t('diff.closing')}</p>
  </div>
</section>

<section id="routes" class="sec sec--recess rv">
  <div class="wrap">
    <p class="eyebrow" data-copy="proof.eyebrow">${d.t('proof.eyebrow')}</p>
    <div class="qs" style="grid-template-columns:repeat(3,minmax(0,1fr))">${quotes(testimonials(d), {})}</div>
    <p class="qs__src" data-copy="proof.source">${d.t('proof.source')}</p>
  </div>
</section>

<section id="book" class="sec rv">
  <div class="wrap"><div class="close">
    <p class="eyebrow" data-copy="cta.final.eyebrow">${d.t('cta.final.eyebrow')}</p>
    <h2 data-copy="cta.final.h2">${d.t('cta.final.h2')}</h2>
    <p data-copy="cta.final.body">${d.t('cta.final.body')}</p>
    <div class="row-cta">
      <a class="btn btn--primary" href="${BOOK}" data-copy="cta.final.primary">${d.t('cta.final.primary')}</a>
      <a class="btn btn--soft" href="${TEL}" data-copy="cta.final.secondary">${d.t('cta.final.secondary')}</a>
    </div>
    <p class="close__note" data-copy="cta.final.note">${d.t('cta.final.note')}</p>
  </div></div>
</section>

</main>
${c.foot}`;
};

const carePage = (d) => {
  const c = chrome(d, { keyed: false, here: 'care' });
  return `${c.head}
<main id="main">

<section id="services" class="sec rv">
  <div class="wrap">
    <p class="eyebrow" data-copy="svc.eyebrow">${d.t('svc.eyebrow')}</p>
    <h1 class="h2" data-copy="svc.h2">${d.t('svc.h2')}</h1>
    <p class="lede" style="margin-bottom:var(--s-7)" data-copy="svc.intro">${d.t('svc.intro')}</p>
    ${cards(services(d), { cls: 'cardset svcset', card: 'card', num: true }).replace('class="cardset svcset"', 'class="cardset svcset" style="grid-template-columns:repeat(3,minmax(0,1fr))"')}
    <p class="svc__more" data-copy="svc.more">${d.t('svc.more')}</p>
  </div>
</section>

<section id="philosophy" class="sec sec--recess rv">
  <div class="wrap split" style="grid-template-columns:minmax(0,1fr) minmax(0,1fr)">
    <div>
      <p class="eyebrow" data-copy="phil.eyebrow">${d.t('phil.eyebrow')}</p>
      <h2 class="h2" data-copy="phil.h2">${d.t('phil.h2')}</h2>
      <p class="pull" data-copy="phil.pull">${d.t('phil.pull')}</p>
      <figure class="figure" style="margin-top:var(--s-5)">
        ${img('img.work.microscopy', { sizes: '(max-width:1000px) 92vw, 44vw', prefix: c.P })}
        <figcaption data-copy="fig.microscopy.caption">${d.t('fig.microscopy.caption')}</figcaption>
      </figure>
    </div>
    <div class="panel">
      <p data-copy="phil.body.1">${d.t('phil.body.1')}</p>
      <p data-copy="phil.body.2">${d.t('phil.body.2')}</p>
      <p data-copy="phil.body.3">${d.t('phil.body.3')}</p>
    </div>
  </div>
</section>

</main>
${c.foot}`;
};

const practicePage = (d) => {
  const c = chrome(d, { keyed: false, here: 'practice' });
  const doc = doctors(d);
  const hyg = hygienists(d);
  return `${c.head}
<main id="main">

<section id="office" class="sec rv">
  <div class="wrap split" style="grid-template-columns:minmax(0,1fr) minmax(0,1fr)">
    <div>
      <p class="eyebrow" data-copy="office.eyebrow">${d.t('office.eyebrow')}</p>
      <h1 class="h2" data-copy="office.h2">${d.t('office.h2')}</h1>
      <p class="lede" style="max-width:none" data-copy="office.body.1">${d.t('office.body.1')}</p>
      <p class="lede" style="margin-top:var(--s-5);max-width:none" data-copy="office.body.2">${d.t('office.body.2')}</p>
      <p class="pull" style="margin-top:var(--s-6)" data-copy="fig.office.caption">${d.t('fig.office.caption')}</p>
    </div>
    <div>
      ${rows(officeSpecs(d), { cls: 'specs' })}
      <div style="height:var(--s-5)"></div>
      ${rows(officeTech(d), { cls: 'specs' })}
    </div>
  </div>
</section>

<section id="team" class="sec sec--recess rv">
  <div class="wrap">
    <p class="eyebrow" data-copy="team.eyebrow">${d.t('team.eyebrow')}</p>
    <h2 class="h2" data-copy="team.h2">${d.t('team.h2')}</h2>
    <p class="lede" style="margin-bottom:var(--s-7)" data-copy="team.intro">${d.t('team.intro')}</p>
    <div class="team" style="grid-template-columns:repeat(4,minmax(0,1fr))">
      ${doc.map((p) => `<article class="person">
        ${img(p.asset, { sizes: '112px', prefix: c.P })}
        <h3 data-copy="${p.nk}">${p.name}</h3>
        <p class="role" data-copy="${p.rk}">${p.role}</p>
        ${p.q ? `<blockquote data-copy="team.1.quote">${p.q}</blockquote>` : ''}
        <p class="bio" data-copy="${p.bk}">${p.bio}</p>
      </article>`).join('')}
    </div>
    <p class="eyebrow" style="margin-top:var(--s-7)" data-copy="team.hyg.eyebrow">${d.t('team.hyg.eyebrow')}</p>
    <div class="hyg" style="margin-top:0">
      ${hyg.map((p) => `<article class="person">
        ${img(p.asset, { sizes: '112px', prefix: c.P })}
        <h3 data-copy="${p.nk}">${p.name}</h3>
        <p class="bio" style="margin-top:var(--s-3)" data-copy="${p.bk}">${p.bio}</p>
      </article>`).join('')}
    </div>
    <p class="emeritus" data-copy="team.emeritus">${d.t('team.emeritus')}</p>
  </div>
</section>

<section id="values" class="sec rv">
  <div class="wrap">
    <p class="eyebrow" data-copy="values.eyebrow">${d.t('values.eyebrow')}</p>
    <h2 class="h2" data-copy="values.h2">${d.t('values.h2')}</h2>
    ${dl(values(d), { cls: 'vals' }).replace('class="vals"', 'class="vals" style="grid-template-columns:repeat(3,minmax(0,1fr))"')}
  </div>
</section>

</main>
${c.foot}`;
};

const visitPage = (d) => {
  const c = chrome(d, { keyed: false, here: 'visit' });
  return `${c.head}
<main id="main">

<section id="visit" class="sec rv">
  <div class="wrap">
    <p class="eyebrow" data-copy="visit.eyebrow">${d.t('visit.eyebrow')}</p>
    <h1 class="h2" style="margin-bottom:var(--s-7)" data-copy="visit.h2">${d.t('visit.h2')}</h1>
    <div class="split" style="grid-template-columns:minmax(0,1fr) minmax(0,1fr)">
      ${rows(visitSteps(d), { cls: 'steps', num: true })}
      ${table(prices(d), { cls: 'ptable', caption: 'What a first appointment costs', headings: ['Item', 'Detail'] })}
    </div>
  </div>
</section>

<section id="faq" class="sec sec--recess sec--col rv">
  <div class="wrap">
    <p class="eyebrow" data-copy="faq.eyebrow">${d.t('faq.eyebrow')}</p>
    <h2 class="h2" data-copy="faq.h2">${d.t('faq.h2')}</h2>
    ${faqList(faqs(d), { cls: 'faqs' })}
  </div>
</section>

</main>
${c.foot}`;
};

const DESC = 'A Seattle holistic dental practice treating the mouth as part of the whole body. Metal-free, mercury-free, BPA-free and fluoride-free care, safe amalgam removal, and biological therapies in a low-toxicity office.';

export const PAGES = [
  { file: 'index.html', title: 'Integrative Dentistry — Holistic and Biological Dentistry in Seattle', description: DESC, body: home },
  { file: 'care/index.html', title: 'Care — Integrative Dentistry', description: 'Conventional dentistry, practiced biologically: safe mercury removal, zirconia implants, ozone, PRF, airway and TMJ work.', body: carePage },
  { file: 'practice/index.html', title: 'The practice — Integrative Dentistry', description: 'The office and its low-toxicity build-out, the technology, the doctors and hygienists, and the values the practice runs on.', body: practicePage },
  { file: 'visit/index.html', title: 'Your first visit — Integrative Dentistry', description: 'What to expect at a first appointment, what it costs, how insurance works, and the questions patients ask before they call.', body: visitPage },
];
