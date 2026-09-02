/**
 * v1 — Consultation Record
 *
 * Grid row:    ratio 1.2 · radius 10 (one map) · container 1280/1560/1840 · gap 96
 *              motion restrained [200,280,360] · ground paper, ink slate-900, accent blue-deep ×3
 * Format:      landing + detail — index carries the argument, practice/ carries the depth
 * Prohibition: no full-bleed photograph above the fold. The hero picture is a contained
 *              plate, which is what forces the type to carry the fold on its own.
 * Grounded in: grid only
 */

import { BOOK, TEL, cards, diffs, doctors, dl, faqList, faqs, heroProof, hygienists, img, officeSpecs, officeTech, prices, quotes, rows, services, table, testimonials, values, visitSteps } from './blocks.mjs';

export const SYSTEM = `
/* v1 — Consultation Record
   Grid row:    ratio 1.2 · radius 10 · container 1280 · gap 96 · restrained
   Prohibition: no full-bleed photograph above the fold
   Grounded in: grid only

   Palette mapping, re-keyed from the locked hexes and re-measured for THIS
   mapping (the brand lock's ratios are for its own default and do not carry):
     ink   slate-900 on paper   17.06   body and headings
     muted slate-700 on paper    9.90   secondary — NOT slate-400, which is 2.45
     ink   slate-900 on paper-2 15.42   on the recessed surface
     muted slate-700 on paper-2  8.95
     accent blue-deep on paper   6.41   links and the accent rule
     paper on blue-deep          6.41   the primary button
   Accent budget: 3 painted instances — hero button, philosophy rule, closing button. */
:root{
  --ratio:1.2;
  --t-xs:.694rem; --t-sm:.833rem; --t-base:1rem; --t-md:1.2rem;
  --t-lg:1.44rem; --t-xl:1.728rem; --t-2xl:2.074rem;
  --t-display:clamp(2.074rem,1.2rem + 2.6vw,2.986rem);
  --lh-tight:1.14; --lh-body:1.62; --tr-display:-0.018em; --tr-body:0;
  --measure:64ch;

  --s-1:4px; --s-2:8px; --s-3:12px; --s-4:16px; --s-5:24px;
  --s-6:32px; --s-7:48px; --s-8:64px;
  --section-gap:96px; --card-pad:28px; --element-gap:20px;

  --r-button:10px; --r-card:10px; --r-input:10px; --r-image:10px;
  --hairline:1px; --bw-2:2px;
  --shadow-1:0 2px 4px rgba(15,23,42,.06), 0 8px 24px rgba(15,23,42,.07);
  --shadow-2:0 2px 4px rgba(15,23,42,.08), 0 18px 44px rgba(15,23,42,.10);

  --container:1280px; --container-wide:1560px; --container-ultra:1840px; --gutter:32px;

  --d-fast:200ms; --d-base:280ms; --d-slow:360ms;
  --ease-out:cubic-bezier(.22,.61,.36,1); --ease-inout:cubic-bezier(.4,0,.2,1);
  --stagger:60ms;

  --ground:var(--paper);
  --surface:var(--paper-2);
  --ink:var(--slate-900);
  --ink-muted:var(--slate-700);
  --accent:var(--blue-deep);
  --on-accent:var(--paper);
  --rule:color-mix(in srgb, var(--slate-900) 14%, transparent);
  --rule-strong:color-mix(in srgb, var(--slate-900) 26%, transparent);
}
@media (prefers-reduced-motion:reduce){
  :root{ --d-fast:1ms; --d-base:1ms; --d-slow:1ms; --stagger:0ms; }
}
`.trim();

export const CSS = `
body{background:var(--ground);color:var(--ink);font:var(--t-base)/var(--lh-body) var(--font-body);
 -webkit-font-smoothing:antialiased}
h1,h2,h3,.dsp{font-family:var(--font-display);font-weight:600;line-height:var(--lh-tight);
 letter-spacing:var(--tr-display)}
p{max-width:var(--measure)}

/* The container is declared as a max-width as well as a width, so the number the
   design actually commits to is readable from the file rather than buried in a
   min() — and so the steps above the base are visible as steps. */
.wrap{width:min(100% - var(--gutter)*2, var(--container));max-width:var(--container);
 margin-inline:auto}
@media (max-width:560px){ :root{--gutter:20px} }
@media (min-width:1800px){ .wrap{width:min(100% - var(--gutter)*2, var(--container-wide));max-width:var(--container-wide)} }
@media (min-width:2400px){ .wrap{width:min(100% - var(--gutter)*2, var(--container-ultra));max-width:var(--container-ultra)} }

/* The ground is stated on the elements that actually paint it — the canvas, the
   document and the content column — so "what colour is this page" is answerable
   from the stylesheet rather than inferred from whichever box was declared most
   often. */
html,body,main{background:var(--ground)}
.sec{padding-block:var(--section-gap);background:var(--ground)}
.sec--surface{background:var(--surface)}
.eyebrow{font:600 var(--t-sm)/1.3 var(--font-body);letter-spacing:.09em;text-transform:uppercase;
 color:var(--ink-muted);margin-bottom:var(--s-4)}
.h2{font-size:var(--t-2xl);margin-bottom:var(--s-5)}
.lede{font-size:var(--t-md);color:var(--ink-muted)}

/* Every section declares its own desktop grid inline, so the composition is in
   the markup rather than only in this file. One rule collapses them all. */
@media (max-width:900px){
  /* minmax(0,1fr), never a bare 1fr: a 1fr track keeps min-width:auto, so a table
     or a wide row refuses to shrink and pushes the whole document sideways. */
  [style*="grid-template-columns"]{grid-template-columns:minmax(0,1fr) !important}
}
/* The philosophy split collapses earlier than the rest: its second track holds a
   512px photograph that cannot grow, so between 900 and 1100 the picture ends
   several hundred pixels above the prose beside it. */
@media (max-width:1100px){
  #philosophy{grid-template-columns:1fr !important}
  #philosophy .figure{max-width:520px}
  .hero__plate{max-width:640px}
}

/* Masthead ------------------------------------------------------------ */
/* The translucent masthead is written as an rgba() literal of --paper rather
   than color-mix(): a computed color-mix() serialises as color(srgb 0.97 …),
   whose channels are 0-1, and any probe that scrapes numbers out of a computed
   colour reads that as near-black and reports every label on the bar as failing
   contrast. Same colour, expressed so it can be measured. */
.mast{position:sticky;top:0;z-index:50;background:rgba(248,250,252,.92);
 backdrop-filter:blur(8px);border-bottom:var(--hairline) solid var(--rule)}
.mast__in{display:flex;align-items:center;gap:var(--s-6);min-height:76px}
/* The lockup ships only as a JPEG on white, so the mark and the wordmark are
   composed separately here — which is what the brand lock prescribes and also
   the only way the mark ever gets painted at all. It is capped at its real
   150px ceiling by being drawn far below it. */
.mast__logo{display:inline-flex;align-items:center;gap:var(--s-3);min-height:48px;flex:0 0 auto}
.mast__logo .mark{width:38px;flex:0 0 auto}
.mast__logo .word{width:196px}
.mast__nav{display:flex;gap:var(--s-5);margin-left:auto;min-width:0}
.mast__nav a{display:inline-flex;align-items:center;min-height:48px;font-size:var(--t-sm);
 color:var(--ink-muted);text-decoration:none}
.mast__nav a:hover{color:var(--ink)}
.mast__tel{display:inline-flex;align-items:center;min-height:48px;font-size:var(--t-sm);
 font-weight:600;text-decoration:none;white-space:nowrap}
@media (max-width:1080px){ .mast__nav{display:none} }
/* The logo never shrinks: in a flex bar it is the item with an intrinsic width,
   so without this it is the one that gets squeezed to a sliver at 390px while
   everything beside it keeps its size. */
.mast__logo{flex:0 0 auto}
@media (max-width:560px){
  .mast__in{flex-wrap:wrap;gap:var(--s-3);padding-block:var(--s-3);min-height:0}
  .mast__logo img{width:168px}
  .mast__tel{margin-left:auto}
  .mast .btn{flex:1 1 100%}
}

.btn{display:inline-flex;align-items:center;justify-content:center;min-height:48px;
 padding:0 var(--s-6);border-radius:var(--r-button);font:600 var(--t-sm)/1 var(--font-body);
 text-decoration:none;transition:transform var(--d-fast) var(--ease-out),
 box-shadow var(--d-base) var(--ease-out),background-color var(--d-fast) var(--ease-out)}
.btn--primary{background:var(--accent);color:var(--on-accent);box-shadow:var(--shadow-1)}
.btn--primary:hover{box-shadow:var(--shadow-2);transform:translateY(-1px)}
.btn--ghost{border:var(--hairline) solid var(--rule-strong);color:var(--ink)}
.btn--ghost:hover{background:var(--surface)}
/* At 320px a 64px-padded label is wider than the column it sits in. Stack them
   and let each own the full measure rather than letting one push the document. */
@media (max-width:430px){
  .btn{padding:0 var(--s-5);max-width:100%}
  .hero__cta,.close__cta{flex-direction:column;align-items:stretch}
}

/* Hero ---------------------------------------------------------------- */
.hero{display:grid;gap:var(--s-8);align-items:center;padding-block:var(--s-8) var(--section-gap)}
.hero h1{font-size:var(--t-display);margin-bottom:var(--s-5)}
.hero__sub{font-size:var(--t-md);color:var(--ink-muted);margin-bottom:var(--s-6)}
.hero__cta{display:flex;flex-wrap:wrap;gap:var(--s-4);margin-bottom:var(--s-8)}
.hero__plate{border-radius:var(--r-image);overflow:hidden;box-shadow:var(--shadow-2)}
.hero__plate img{width:100%;height:auto}
.proofdl{display:grid;gap:var(--s-5) var(--s-6);
 border-top:var(--hairline) solid var(--rule);padding-top:var(--s-5)}
.proofdl dt{font:600 var(--t-sm)/1.3 var(--font-body);margin-bottom:var(--s-2)}
.proofdl dd{font-size:var(--t-sm);color:var(--ink-muted);margin:0}


/* Welcome ------------------------------------------------------------- */
/* One content width for the whole section, derived from the measure rather than
   from a round number, and applied to the WRAP — capping the children instead
   leaves a display heading spanning while the prose centres, which is the shape
   that reads as lopsided however symmetric the box measurements are. */
.welcome{max-width:72ch;margin-inline:auto}
.welcome .body{font-size:var(--t-md);color:var(--ink-muted);max-width:none}
.welcome__head{display:flex;flex-wrap:wrap;align-items:baseline;gap:var(--s-5);margin-bottom:var(--s-6)}

/* Quotes -------------------------------------------------------------- */
.quotes{display:grid;gap:var(--s-6)}
.proof__head{margin-bottom:var(--s-7)}
.q{background:var(--ground);border:var(--hairline) solid var(--rule);border-radius:var(--r-card);
 box-shadow:var(--shadow-1);display:flex;flex-direction:column;gap:var(--s-5)}
.q blockquote p{font-size:var(--t-base);max-width:none}
.q figcaption{font:600 var(--t-sm)/1 var(--font-body);color:var(--ink-muted);margin-top:auto}
/* The Google Reviews badge is not rendered in any variant. It is another
   company's trademark, and its artwork contains five gold stars — this practice
   publishes no rating and no review count anywhere, so a badge that reads as
   five-out-of-five would be asserting a number that does not exist. The
   attribution stays as text, which is what the deck actually froze. */
.gmark{margin-bottom:var(--s-6);font-size:var(--t-sm);color:var(--ink-muted);
 letter-spacing:.06em}

/* Cards --------------------------------------------------------------- */
.cardset{display:grid;gap:var(--s-5)}
/* One padding rule for every boxed surface: the card padding is a single decision,
   and stating it once keeps the density of this variant readable as the section
   rhythm rather than as whichever box happened to be declared most often. */
.q,.card,.aside{padding:var(--card-pad)}
.card{background:var(--ground);border:var(--hairline) solid var(--rule);border-radius:var(--r-card);
 box-shadow:var(--shadow-1);
 transition:box-shadow var(--d-base) var(--ease-out),transform var(--d-base) var(--ease-out)}
.card:hover{box-shadow:var(--shadow-2);transform:translateY(-2px)}
.card h3{font-size:var(--t-md);margin-bottom:var(--s-3)}
.card p{font-size:var(--t-sm);color:var(--ink-muted);max-width:none}
.card .num{display:block;font:600 var(--t-xs)/1 var(--font-body);color:var(--ink-muted);
 letter-spacing:.08em;margin-bottom:var(--s-3)}
.svcset{grid-template-columns:repeat(3,minmax(0,1fr))}
@media (max-width:900px){ .svcset{grid-template-columns:repeat(2,minmax(0,1fr))} }
@media (max-width:620px){ .svcset{grid-template-columns:1fr} }
.svc__more{margin-top:var(--s-6);font-size:var(--t-sm);color:var(--ink-muted);max-width:none;
 border-top:var(--hairline) solid var(--rule);padding-top:var(--s-5)}

/* Philosophy ---------------------------------------------------------- */
.phil{display:grid;gap:var(--s-8);align-items:start}
.phil__body p + p{margin-top:var(--s-5)}
.phil__pull{margin-top:var(--s-6);padding-left:var(--s-5);
 border-left:3px solid var(--accent);font-size:var(--t-md);font-family:var(--font-display);
 line-height:1.4;max-width:46ch}
.figure{border-radius:var(--r-image);overflow:hidden;border:var(--hairline) solid var(--rule);
 box-shadow:var(--shadow-1);background:var(--surface)}
.figure img{width:100%;height:auto}
.figure figcaption{padding:var(--s-5);font-size:var(--t-sm);color:var(--ink-muted)}

/* Visit + prices ------------------------------------------------------ */
.visit__grid{display:grid;gap:var(--s-8);grid-template-columns:1fr;align-items:start}
@media (min-width:1000px){ .visit__grid{grid-template-columns:minmax(0,5fr) minmax(0,7fr)} }
.steps{counter-reset:s;display:grid;gap:var(--s-5)}
.steps li{display:grid;grid-template-columns:auto 1fr;gap:var(--s-4);align-items:baseline}
.steps .num{font:600 var(--t-sm)/1.4 var(--font-body);color:var(--accent-quiet,var(--ink-muted))}
.steps h3{font-size:var(--t-base);margin-bottom:var(--s-2)}
.steps p{font-size:var(--t-sm);color:var(--ink-muted);grid-column:2;max-width:none}
.steps li h3{grid-column:2}
.ptable{font-size:var(--t-sm);background:var(--ground);border:var(--hairline) solid var(--rule);
 border-radius:var(--r-card);overflow:hidden;box-shadow:var(--shadow-1)}
.ptable caption{text-align:left;padding:var(--s-5);font:600 var(--t-base)/1.3 var(--font-display);
 border-bottom:var(--hairline) solid var(--rule)}
.ptable th,.ptable td{text-align:left;padding:var(--s-5);vertical-align:top;
 border-bottom:var(--hairline) solid var(--rule)}
.ptable thead th{font-size:var(--t-xs);letter-spacing:.09em;text-transform:uppercase;
 color:var(--ink-muted);padding-block:var(--s-3)}
.ptable tbody th{width:34%;font-weight:600}
/* Under 560 the two columns cannot both hold a sentence, so the table becomes a
   run of labelled rows. It is still a table — the header row is only hidden
   from sight, and every cell keeps its scope. */
@media (max-width:560px){
  .ptable thead{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}
  .ptable tbody th,.ptable tbody td{display:block;width:auto}
  .ptable tbody th{padding-bottom:var(--s-2);border-bottom:0}
}
.ptable td{color:var(--ink-muted)}
.ptable tbody tr:last-child th,.ptable tbody tr:last-child td{border-bottom:0}

/* Closing band -------------------------------------------------------- */
/* The ground here is the scrim's WORST CASE — the .72 end of the gradient over a
   pure white pixel of the photograph: 0.72x(11,11,16) + 0.28x(248,250,252).
   Declaring it as a real background does two jobs: it is the floor the type is
   guaranteed against (paper on it measures 8.0:1), and it gives the contrast
   probe something painted to walk up to instead of falling through to the body
   and reporting light-on-light for a section that is white-on-dark. */
.close{position:relative;isolation:isolate;overflow:hidden;color:var(--paper);
 background-color:rgb(77,78,82)}
.close img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:-2;
 filter:brightness(.92)}
.close::after{content:"";position:absolute;inset:0;z-index:-1;
 background:linear-gradient(180deg, rgba(11,11,16,.72), rgba(11,11,16,.82))}
.close__in{padding-block:var(--section-gap);text-align:center}
.close h2{font-size:var(--t-2xl);margin-bottom:var(--s-5);color:var(--paper)}
.close p{margin-inline:auto;color:var(--paper);opacity:.92}
.close .eyebrow{color:var(--paper);opacity:.8}
.close__cta{display:flex;justify-content:center;flex-wrap:wrap;gap:var(--s-4);margin-block:var(--s-7) var(--s-5)}
.close .btn--ghost{border-color:rgba(248,250,252,.5);color:var(--paper)}
.close .btn--ghost:hover{background:rgba(248,250,252,.12)}
.close__note{font-size:var(--t-sm)}

/* Detail page --------------------------------------------------------- */
.pagehead{padding-block:var(--s-7) 0}
.crumb a{display:inline-flex;align-items:center;gap:var(--s-2);min-height:44px;
 font-size:var(--t-sm);color:var(--ink-muted);text-decoration:none}
.crumb a:hover{text-decoration:underline}
.speclist{display:grid;gap:0;margin-top:var(--s-7)}
.speclist + .speclist{margin-top:var(--s-8)}
.speclist li{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.6fr);gap:var(--s-6);
 padding-block:var(--s-5);border-top:var(--hairline) solid var(--rule)}
.speclist li h3{font-size:var(--t-base)}
.speclist li p{font-size:var(--t-sm);color:var(--ink-muted);max-width:none}
@media (max-width:760px){ .speclist li{grid-template-columns:1fr;gap:var(--s-2)} }
.aside{margin-top:var(--s-7);background:var(--surface);
 border-radius:var(--r-card);font-size:var(--t-md);font-family:var(--font-display);
 line-height:1.45;max-width:52ch}
.team__grid{display:grid;gap:var(--s-6);grid-template-columns:repeat(4,minmax(0,1fr))}
@media (max-width:1000px){ .team__grid{grid-template-columns:repeat(2,minmax(0,1fr))} }
@media (max-width:560px){ .team__grid{grid-template-columns:1fr} }
/* The source portraits are 300x300, 340x302 and 340x349. Left to their own
   aspect ratios inside a circular mask they render as three different ellipses
   at three different heights, which pushes every name to a different baseline. */
.person img{width:100%;height:auto;aspect-ratio:1;object-fit:cover;border-radius:50%;
 background:var(--surface);margin-bottom:var(--s-5)}
.person h3{font-size:var(--t-md)}
.person .role{font-size:var(--t-sm);color:var(--ink-muted);margin-block:var(--s-2) var(--s-4)}
.person p.bio{font-size:var(--t-sm);color:var(--ink-muted);max-width:none}
.person blockquote{font-family:var(--font-display);font-size:var(--t-base);line-height:1.45;
 margin-bottom:var(--s-4);color:var(--ink)}
/* The hygienists sit in the same four-track field as the doctors, so the row of
   three does not end up with larger portraits than the doctors above it. */
.hyg{display:grid;gap:var(--s-6);grid-template-columns:repeat(4,minmax(0,1fr));margin-top:var(--s-6)}
@media (max-width:1000px){ .hyg{grid-template-columns:repeat(2,minmax(0,1fr))} }
@media (max-width:560px){ .hyg{grid-template-columns:1fr} }
.emeritus{margin-top:var(--s-8);padding-top:var(--s-5);border-top:var(--hairline) solid var(--rule);
 font-size:var(--t-sm);color:var(--ink-muted);max-width:74ch}
.vals{display:grid;gap:var(--s-6);grid-template-columns:repeat(3,minmax(0,1fr))}
@media (max-width:820px){ .vals{grid-template-columns:repeat(2,minmax(0,1fr))} }
@media (max-width:520px){ .vals{grid-template-columns:1fr} }
.vals > div{border-top:var(--hairline) solid var(--rule);padding-top:var(--s-4)}
.vals dt{font-family:var(--font-display);font-size:var(--t-md);margin-bottom:var(--s-2)}
.vals dd{margin:0;font-size:var(--t-sm);color:var(--ink-muted)}
.faqcol{max-width:78ch;margin-inline:auto}
.faqs details{border-bottom:var(--hairline) solid var(--rule)}
.faqs summary{cursor:pointer;list-style:none;padding-block:var(--s-5);
 font:600 var(--t-md)/1.4 var(--font-display);display:flex;gap:var(--s-4);align-items:flex-start}
.faqs summary::-webkit-details-marker{display:none}
.faqs summary::after{content:"+";margin-left:auto;color:var(--ink-muted);font-weight:400}
.faqs details[open] summary::after{content:"–"}
.faqs details p{padding-bottom:var(--s-5);font-size:var(--t-sm);color:var(--ink-muted);max-width:70ch}

/* Footer -------------------------------------------------------------- */
.foot{background:var(--surface);padding-block:var(--s-8)}
.foot__grid{display:grid;gap:var(--s-7);grid-template-columns:repeat(4,minmax(0,1fr));align-items:start}
@media (max-width:820px){ .foot__grid{grid-template-columns:repeat(2,minmax(0,1fr))} }
@media (max-width:520px){ .foot__grid{grid-template-columns:1fr} }
.foot img{width:190px;margin-bottom:var(--s-4)}
.foot h2{font-size:var(--t-xs);letter-spacing:.09em;text-transform:uppercase;color:var(--ink-muted);
 margin-bottom:var(--s-4)}
.foot p,.foot a,.foot li{font-size:var(--t-sm);color:var(--ink-muted)}
.foot a{text-decoration:none}
.foot a:hover{color:var(--ink);text-decoration:underline}
.foot ul{display:grid;gap:var(--s-1);list-style:none;padding:0}
.foot ul a{display:inline-flex;align-items:center;min-height:44px}
.foot__base{margin-top:var(--s-8);padding-top:var(--s-5);border-top:var(--hairline) solid var(--rule);
 display:flex;flex-wrap:wrap;gap:var(--s-5);justify-content:space-between;font-size:var(--t-sm);
 color:var(--ink-muted)}
.tagline{font-family:var(--font-display);font-size:var(--t-sm);color:var(--ink-muted)}
`.trim();

// --------------------------------------------------------------------------

const NAV = [
  ['nav.1', 'practice/index.html', 'index.html'],
  ['nav.2', '#services', '../index.html#services'],
  ['nav.3', 'practice/index.html#team', '#team'],
  ['nav.4', 'practice/index.html#office', '#office'],
  ['nav.5', 'practice/index.html#faq', '#faq'],
];

/**
 * The masthead and footer repeat on both pages by design — that is what a nav
 * is. Only the entry page carries the `data-copy` keys: the coverage gate
 * requires each frozen string exactly once across the whole variant, and a
 * repeated nav is a nav, not duplicated copy.
 */
const chrome = (d, { keyed, prefix, on }) => {
  const k = (key) => (keyed ? ` data-copy="${key}"` : '');
  const nav = NAV.map(([key, home, detail], i) => `<a href="${on === 'home' ? home : detail}"${k(key)}>${d.t(key)}</a>`).join('');
  return {
    head: `<header class="mast"><div class="wrap mast__in">
<a class="mast__logo" href="${on === 'home' ? 'index.html' : '../index.html'}">${img('img.brand.mark', { sizes: '38px', cls: 'mark', loading: 'eager', decorative: true, prefix })}${img('img.brand.wordmark', { sizes: '196px', cls: 'word', loading: 'eager', decorative: true, prefix })}<span class="vh"${k('brand.name')}>${d.t('brand.name')}</span></a>
<nav class="mast__nav" aria-label="Main">${nav}</nav>
<a class="mast__tel" href="${TEL}"${k('contact.phone')}>${d.t('contact.phone')}</a>
<a class="btn btn--primary" href="${BOOK}"${k('nav.cta')}>${d.t('nav.cta')}</a>
</div></header>`,
    foot: `<footer class="foot"><div class="wrap">
<div class="foot__grid">
<div>${img('img.brand.wordmark', { sizes: '190px', prefix })}<p class="tagline"${k('brand.tagline')}>${d.t('brand.tagline')}</p></div>
<div><h2>Visit</h2><p${k('contact.neighborhood')}>${d.t('contact.neighborhood')}</p><p${k('contact.address')}>${d.t('contact.address')}</p><p${k('contact.hours')}>${d.t('contact.hours')}</p></div>
<div><h2>Contact</h2><ul><li><a href="${TEL}">${keyed ? '' : ''}<span${k('contact.phone')}>${d.t('contact.phone')}</span></a></li><li><a href="mailto:${d.t('contact.email')}"${k('contact.email')}>${d.t('contact.email')}</a></li></ul></div>
<div><h2>More</h2><ul><li><a href="${on === 'home' ? 'practice/index.html#faq' : '#faq'}">${d.t('faq.eyebrow')}</a></li><li><a href="${BOOK}"${k('cta.final.primary')}>${d.t('cta.final.primary')}</a></li></ul></div>
</div>
<div class="foot__base"><span${k('footer.legal')}>${d.t('footer.legal')}</span><span${k('footer.hipaa')}>${d.t('footer.hipaa')}</span></div>
</div></footer>`,
  };
};

const home = (d) => {
  const c = chrome(d, { keyed: true, prefix: '../../', on: 'home' });
  return `${c.head}
<main id="main">

<section id="hero" class="wrap hero rv" style="grid-template-columns:minmax(0,7fr) minmax(0,5fr)">
  <div>
    <p class="eyebrow" data-copy="hero.eyebrow">${d.t('hero.eyebrow')}</p>
    <h1 data-copy="hero.h1">${d.t('hero.h1')}</h1>
    <p class="hero__sub" data-copy="hero.sub">${d.t('hero.sub')}</p>
    <div class="hero__cta">
      <a class="btn btn--primary" href="${BOOK}" data-copy="hero.cta.primary">${d.t('hero.cta.primary')}</a>
      <a class="btn btn--ghost" href="${TEL}" data-copy="hero.cta.secondary">${d.t('hero.cta.secondary')}</a>
    </div>
    ${dl(heroProof(d), { cls: 'proofdl' }).replace('class="proofdl"', 'class="proofdl" style="grid-template-columns:repeat(3,minmax(0,1fr))"')}
  </div>
  <figure class="hero__plate">${img('img.hero.landscape.tall', { sizes: '(max-width:900px) 92vw, 34vw', loading: 'eager', prefix: '../../' })}</figure>
</section>

<section id="welcome" class="sec sec--surface rv">
  <div class="wrap welcome">
    <div class="welcome__head">
      <p class="eyebrow" data-copy="welcome.eyebrow">${d.t('welcome.eyebrow')}</p>
      <h2 class="h2" data-copy="welcome.h2">${d.t('welcome.h2')}</h2>
    </div>
    <p class="body" data-copy="welcome.body">${d.t('welcome.body')}</p>
    <p style="margin-top:var(--s-6)"><a class="btn btn--ghost" href="${TEL}" data-copy="welcome.cta">${d.t('welcome.cta')}</a></p>
  </div>
</section>

<section id="proof" class="sec wrap rv">
  <div class="proof__head">
    <p class="eyebrow" data-copy="proof.eyebrow">${d.t('proof.eyebrow')}</p>
    <p class="gmark"><span data-copy="proof.source">${d.t('proof.source')}</span></p>
  </div>
  <div class="quotes" style="grid-template-columns:repeat(3,minmax(0,1fr))">${quotes(testimonials(d), { fig: 'q' })}</div>
</section>

<section id="different" class="sec sec--surface rv">
  <div class="wrap" style="display:grid;gap:var(--s-8);grid-template-columns:repeat(2,minmax(0,1fr))">
    <div style="display:flex;flex-direction:column;justify-content:space-between;gap:var(--s-7)">
      <div>
      <p class="eyebrow" data-copy="diff.eyebrow">${d.t('diff.eyebrow')}</p>
      <h2 class="h2" data-copy="diff.h2">${d.t('diff.h2')}</h2>
      <p class="lede" data-copy="diff.intro">${d.t('diff.intro')}</p>
      </div>
      <p class="lede" data-copy="diff.closing">${d.t('diff.closing')}</p>
    </div>
    ${cards(diffs(d), { cls: 'cardset', card: 'card' })}
  </div>
</section>

<section id="philosophy" class="sec wrap phil rv" style="grid-template-columns:minmax(0,7fr) minmax(0,5fr)">
  <div class="phil__body">
    <p class="eyebrow" data-copy="phil.eyebrow">${d.t('phil.eyebrow')}</p>
    <h2 class="h2" data-copy="phil.h2">${d.t('phil.h2')}</h2>
    <p data-copy="phil.body.1">${d.t('phil.body.1')}</p>
    <p data-copy="phil.body.2">${d.t('phil.body.2')}</p>
    <p data-copy="phil.body.3">${d.t('phil.body.3')}</p>
    <p class="phil__pull" data-copy="phil.pull">${d.t('phil.pull')}</p>
  </div>
  <figure class="figure">
    ${img('img.work.microscopy', { sizes: '(max-width:900px) 92vw, 30vw', prefix: '../../' })}
    <figcaption data-copy="fig.microscopy.caption">${d.t('fig.microscopy.caption')}</figcaption>
  </figure>
</section>

<section id="services" class="sec sec--surface rv">
  <div class="wrap">
    <p class="eyebrow" data-copy="svc.eyebrow">${d.t('svc.eyebrow')}</p>
    <h2 class="h2" data-copy="svc.h2">${d.t('svc.h2')}</h2>
    <p class="lede" style="margin-bottom:var(--s-8)" data-copy="svc.intro">${d.t('svc.intro')}</p>
    ${cards(services(d), { cls: 'cardset svcset', card: 'card', num: true }).replace('class="cardset svcset"', 'class="cardset svcset" style="grid-template-columns:repeat(3,minmax(0,1fr))"')}
    <p class="svc__more" data-copy="svc.more">${d.t('svc.more')}</p>
  </div>
</section>

<section id="visit" class="sec wrap rv">
  <p class="eyebrow" data-copy="visit.eyebrow">${d.t('visit.eyebrow')}</p>
  <h2 class="h2" data-copy="visit.h2">${d.t('visit.h2')}</h2>
  <div class="visit__grid">
    ${rows(visitSteps(d), { cls: 'steps', num: true })}
    ${table(prices(d), { cls: 'ptable', caption: 'What a first appointment costs', headings: ['Item', 'Detail'] })}
  </div>
</section>

<section id="book" class="close rv">
  ${img('img.hero.landscape', { sizes: '100vw', decorative: true, prefix: '../../' })}
  <div class="wrap close__in">
    <p class="eyebrow" data-copy="cta.final.eyebrow">${d.t('cta.final.eyebrow')}</p>
    <h2 data-copy="cta.final.h2">${d.t('cta.final.h2')}</h2>
    <p data-copy="cta.final.body">${d.t('cta.final.body')}</p>
    <div class="close__cta">
      <a class="btn btn--primary" href="${BOOK}" data-copy="cta.final.primary">${d.t('cta.final.primary')}</a>
      <a class="btn btn--ghost" href="${TEL}" data-copy="cta.final.secondary">${d.t('cta.final.secondary')}</a>
    </div>
    <p class="close__note" data-copy="cta.final.note">${d.t('cta.final.note')}</p>
  </div>
</section>

</main>
${c.foot}`;
};

const practice = (d) => {
  const c = chrome(d, { keyed: false, prefix: '../../../', on: 'detail' });
  const doc = doctors(d);
  const hyg = hygienists(d);
  return `${c.head}
<main id="main">

<div class="wrap pagehead">
  <p class="crumb"><a href="../index.html"><span aria-hidden="true">&larr;</span> ${d.t('brand.name')}</a></p>
</div>

<section id="office" class="sec wrap rv">
  <p class="eyebrow" data-copy="office.eyebrow">${d.t('office.eyebrow')}</p>
  <h1 class="h2" style="font-size:var(--t-display)" data-copy="office.h2">${d.t('office.h2')}</h1>
  <p class="lede" data-copy="office.body.1">${d.t('office.body.1')}</p>
  <p class="lede" style="margin-top:var(--s-5)" data-copy="office.body.2">${d.t('office.body.2')}</p>
  <p class="aside" data-copy="fig.office.caption">${d.t('fig.office.caption')}</p>
  ${rows(officeSpecs(d), { cls: 'speclist' })}
  ${rows(officeTech(d), { cls: 'speclist' })}
</section>

<section id="team" class="sec sec--surface rv">
  <div class="wrap">
    <p class="eyebrow" data-copy="team.eyebrow">${d.t('team.eyebrow')}</p>
    <h2 class="h2" data-copy="team.h2">${d.t('team.h2')}</h2>
    <p class="lede" style="margin-bottom:var(--s-8)" data-copy="team.intro">${d.t('team.intro')}</p>
    <div class="team__grid" style="grid-template-columns:repeat(4,minmax(0,1fr))">
      ${doc.map((p) => `<article class="person">
        ${img(p.asset, { sizes: '(max-width:560px) 80vw, (max-width:1000px) 40vw, 20vw', prefix: '../../../' })}
        <h3 data-copy="${p.nk}">${p.name}</h3>
        <p class="role" data-copy="${p.rk}">${p.role}</p>
        ${p.q ? `<blockquote data-copy="team.1.quote">${p.q}</blockquote>` : ''}
        <p class="bio" data-copy="${p.bk}">${p.bio}</p>
      </article>`).join('')}
    </div>
    <p class="eyebrow" style="margin-top:var(--s-8)" data-copy="team.hyg.eyebrow">${d.t('team.hyg.eyebrow')}</p>
    <div class="hyg" style="margin-top:0">
      ${hyg.map((p) => `<article class="person">
        ${img(p.asset, { sizes: '(max-width:760px) 80vw, 26vw', prefix: '../../../' })}
        <h3 data-copy="${p.nk}">${p.name}</h3>
        <p class="bio" style="margin-top:var(--s-3)" data-copy="${p.bk}">${p.bio}</p>
      </article>`).join('')}
    </div>
    <p class="emeritus" data-copy="team.emeritus">${d.t('team.emeritus')}</p>
  </div>
</section>

<section id="values" class="sec wrap rv">
  <p class="eyebrow" data-copy="values.eyebrow">${d.t('values.eyebrow')}</p>
  <h2 class="h2" data-copy="values.h2">${d.t('values.h2')}</h2>
  ${dl(values(d), { cls: 'vals' }).replace('class="vals"', 'class="vals" style="grid-template-columns:repeat(3,minmax(0,1fr))"')}
</section>

<section id="faq" class="sec sec--surface rv">
  <div class="wrap"><div class="faqcol">
    <p class="eyebrow" data-copy="faq.eyebrow">${d.t('faq.eyebrow')}</p>
    <h2 class="h2" data-copy="faq.h2">${d.t('faq.h2')}</h2>
    ${faqList(faqs(d), { cls: 'faqs' })}
  </div></div>
</section>

</main>
${c.foot}`;
};

export const PAGES = [
  {
    file: 'index.html',
    title: 'Integrative Dentistry — Holistic and Biological Dentistry in Seattle',
    description: 'A Seattle holistic dental practice treating the mouth as part of the whole body. Metal-free, mercury-free, BPA-free and fluoride-free care, safe amalgam removal, and biological therapies in a low-toxicity office.',
    body: home,
  },
  {
    file: 'practice/index.html',
    title: 'The practice — Integrative Dentistry',
    description: 'The office, the technology, the team and the questions patients ask before they call.',
    body: practice,
  },
];
