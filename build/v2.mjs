/**
 * v2 — Still Water
 *
 * Grid row:    ratio 1.333 · radius 0 everywhere · container 1440/1720/2040 · gap 128
 *              motion cinematic [700,900,1200] · ground ink-black, ink paper, accent blue ×2
 * Format:      one-page story scroll — a single argument that builds and would be
 *              ruined by being cut into pages
 * Prohibition: no card, no shadow, no corner radius. Nothing is separated by a box;
 *              everything is separated by ground, rule and space, which is the whole
 *              reason this variant looks the way it does.
 * Grounded in: grid only
 */

import { BOOK, TEL, diffs, doctors, dl, faqList, faqs, heroProof, hygienists, img, officeSpecs, officeTech, prices, quotes, rows, services, table, testimonials, values, visitSteps } from './blocks.mjs';

export const SYSTEM = `
/* v2 — Still Water
   Grid row:    ratio 1.333 · radius 0 · container 1440 · gap 128 · cinematic
   Prohibition: no card, no shadow, no corner radius
   Grounded in: grid only

   Palette mapping, re-keyed and re-measured for THIS mapping:
     ink    paper on ink-black     18.77   body and headings
     ink    paper on carbon        15.86   on the raised band
     muted  slate-400 on ink-black  7.66   secondary — the inverse of v1, where
                                           slate-400 on paper is 2.45 and unusable
     muted  slate-400 on carbon     6.47
     accent blue on ink-black       5.34   links and rules
     ink-black on blue              5.34   the primary button
   blue-deep is unusable here: 2.93 on this ground. The accent swaps with the
   ground, which is exactly why the mapping is per variant.
   Accent budget: the primary button and nothing else. Every rule, eyebrow and
   border on the page is drawn in the ink at low alpha, so the one blue thing on
   any screen is the thing to press. */
:root{
  --ratio:1.333;
  --t-xs:.563rem; --t-sm:.75rem; --t-base:1rem; --t-md:1.333rem;
  --t-lg:1.777rem; --t-xl:2.369rem; --t-2xl:3.157rem;
  --t-display:clamp(2.369rem,1.1rem + 4.2vw,4.209rem);
  --lh-tight:1.04; --lh-body:1.7; --tr-display:-0.03em; --tr-body:.004em;
  --measure:60ch;

  --s-1:4px; --s-2:8px; --s-3:12px; --s-4:16px; --s-5:28px;
  --s-6:40px; --s-7:64px; --s-8:96px;
  --section-gap:128px; --element-gap:24px;

  --r-button:0; --r-card:0; --r-input:0; --r-image:0;
  --hairline:1px; --bw-2:2px;
  --shadow-1:none; --shadow-2:none;

  --container:1440px; --container-wide:1720px; --container-ultra:2040px; --gutter:40px;

  --d-fast:700ms; --d-base:900ms; --d-slow:1200ms;
  --ease-out:cubic-bezier(.16,1,.3,1); --ease-inout:cubic-bezier(.65,0,.35,1);
  --stagger:90ms;

  --ground:var(--ink-black);
  --surface:var(--carbon);
  --ink:var(--paper);
  --ink-muted:var(--slate-400);
  --accent:var(--blue);
  --on-accent:var(--ink-black);
  --rule:rgba(248,250,252,.16);
  --rule-strong:rgba(248,250,252,.42);
}
@media (prefers-reduced-motion:reduce){
  :root{ --d-fast:1ms; --d-base:1ms; --d-slow:1ms; --stagger:0ms; }
}
`.trim();

export const CSS = `
body{background:var(--ground);color:var(--ink);font:var(--t-base)/var(--lh-body) var(--font-body);
 letter-spacing:var(--tr-body);-webkit-font-smoothing:antialiased}
h1,h2,h3{font-family:var(--font-display);font-weight:500;line-height:var(--lh-tight);
 letter-spacing:var(--tr-display)}
p{max-width:var(--measure)}

/* The container as a max-width as well as a width — the number this variant
   commits to should be readable from the file, not buried inside a min(). */
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
.sec--raised{background:var(--surface)}
/* A capped column inside a 1440 container is not a centred section: content
   whose width is set by a measure does not grow with its container, so every
   pixel the container gains lands on ONE side of it. The fix is to cap the WRAP
   to the width the type actually paints and centre that — never to cap the
   children, which leaves a display heading spanning while the prose sits left.
   Sections that genuinely fill the container (the hero, the index, the team
   field, the full-bleed band) keep the full wrap. */
.sec--col > .wrap{width:min(100% - var(--gutter)*2, 1160px)}
.sec--narrow > .wrap{width:min(100% - var(--gutter)*2, 640px)}
/* The rule under an eyebrow is a system element that appears on every section,
   so it is drawn in the ink, not the accent: an accent that paints twelve times
   is a default, not a decision. The accent is spent on the primary button and
   nothing else. */
.eyebrow{display:inline-block;font:500 var(--t-sm)/1 var(--font-body);letter-spacing:.22em;
 text-transform:uppercase;color:var(--ink-muted);padding-bottom:var(--s-3);
 border-bottom:var(--hairline) solid var(--rule-strong);margin-bottom:var(--s-6)}
.h2{font-size:var(--t-xl);margin-bottom:var(--s-6);max-width:20ch}
.head{display:grid;grid-template-columns:minmax(0,4fr) minmax(0,7fr);gap:var(--s-8);
 align-items:end;margin-bottom:var(--s-8)}
.head .h2{margin-bottom:0}
.head .lede{max-width:none}
@media (max-width:1000px){ .head{grid-template-columns:1fr;gap:var(--s-5);align-items:start} }
.lede{font-size:var(--t-md);color:var(--ink-muted);line-height:1.55;max-width:52ch}

/* The shape of every section is declared inline on the element that is the grid,
   so the composition lives in the markup. One rule collapses them together. */
@media (max-width:1000px){
  /* minmax(0,1fr), never a bare 1fr: a 1fr track keeps min-width:auto, so a table
     or a wide row refuses to shrink and pushes the whole document sideways. */
  [style*="grid-template-columns"]{grid-template-columns:minmax(0,1fr) !important}
  [style*="position:sticky"]{position:static !important}
}

/* Masthead — no shadow, no radius, no fill: a rule and the ground. */
.mast{position:absolute;top:0;left:0;right:0;z-index:50}
.mast__in{display:flex;align-items:center;gap:var(--s-6);min-height:96px}
.mast__logo{display:inline-flex;align-items:center;min-height:48px;flex:0 0 auto}
.mast__logo img{width:210px;filter:invert(1)}
.mast__nav{display:flex;gap:var(--s-6);margin-left:auto;min-width:0}
.mast__nav a{display:inline-flex;align-items:center;min-height:48px;font-size:var(--t-sm);
 letter-spacing:.1em;text-transform:uppercase;color:var(--paper);text-decoration:none;opacity:.78;
 transition:opacity var(--d-fast) var(--ease-out)}
.mast__nav a:hover{opacity:1}
.mast__tel{display:inline-flex;align-items:center;min-height:48px;font-size:var(--t-sm);
 letter-spacing:.06em;color:var(--paper);text-decoration:none}
@media (max-width:1180px){ .mast__nav{display:none} }
@media (max-width:620px){
  .mast__in{flex-wrap:wrap;gap:var(--s-3);min-height:0;padding-top:var(--s-4)}
  .mast__logo img{width:170px}
  .mast__tel{margin-left:auto}
}

.btn{display:inline-flex;align-items:center;justify-content:center;min-height:52px;
 padding:0 var(--s-6);border-radius:var(--r-button);font:500 var(--t-sm)/1 var(--font-body);
 letter-spacing:.12em;text-transform:uppercase;text-decoration:none;
 transition:background-color var(--d-fast) var(--ease-out),color var(--d-fast) var(--ease-out)}
.btn--primary{background:var(--accent);color:var(--on-accent)}
.btn--primary:hover{background:var(--paper)}
.btn--line{border:var(--hairline) solid var(--rule-strong);color:var(--paper)}
.btn--line:hover{background:var(--paper);color:var(--ink-black)}
@media (max-width:430px){ .btn{padding:0 var(--s-5);max-width:100%} .row-cta{flex-direction:column;align-items:stretch} }

/* 1 — Hero: the picture carries the fold, the type sits in it. --------- */
.hero{position:relative;isolation:isolate;min-height:min(100svh,900px);display:flex;
 align-items:flex-end;overflow:hidden;color:var(--paper);
 /* The declared floor: the .74 end of the scrim over a pure white pixel of the
    photograph — 0.74x(11,11,16) + 0.26x(248,250,252). Paper on it is 8.4:1, and
    it gives the contrast probe a painted ground instead of the body's. */
 background-color:rgb(73,73,77)}
.hero img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:-2;
 filter:brightness(1.04)}
.hero::after{content:"";position:absolute;inset:0;z-index:-1;
 background:linear-gradient(180deg,rgba(11,11,16,.74) 0%,rgba(11,11,16,.62) 38%,rgba(11,11,16,.92) 100%)}
.hero__in{padding-block:var(--s-8) var(--s-7);width:100%}
.hero h1{font-size:var(--t-display);max-width:11ch;margin-bottom:var(--s-6)}
.hero__sub{font-size:var(--t-md);max-width:44ch;margin-bottom:var(--s-7);color:var(--paper)}
/* Solid colours, never opacity, for anything carrying text over the scrim: the
   composited result is what a reader sees, and it is also the only thing a
   contrast probe can measure from the computed style. */
.hero .eyebrow{color:var(--paper);border-bottom-color:var(--rule-strong)}
.row-cta{display:flex;flex-wrap:wrap;gap:var(--s-4)}
.hero__proof{display:grid;gap:var(--s-5) var(--s-7);margin-top:var(--s-8);
 border-top:var(--hairline) solid var(--rule-strong);padding-top:var(--s-5)}
.hero__proof dt{font:500 var(--t-base)/1.2 var(--font-display);margin-bottom:var(--s-2)}
.hero__proof dd{margin:0;font-size:var(--t-sm);color:var(--paper);max-width:26ch}

/* 2 — Welcome ---------------------------------------------------------- */
.stmt{max-width:none;font-family:var(--font-display);font-size:var(--t-lg);line-height:1.25;
 letter-spacing:var(--tr-display)}
.welcome__body{font-size:var(--t-md);color:var(--ink-muted);line-height:1.6;max-width:none}

/* 3 — Philosophy: a rail that holds while the argument scrolls past ---- */
.phil__rail{align-self:start}
.phil__body p{font-size:var(--t-md);line-height:1.62;max-width:none}
.phil__body p + p{margin-top:var(--s-6)}
.phil__pull{margin-top:var(--s-7);font-family:var(--font-display);font-size:var(--t-lg);
 line-height:1.3;color:var(--paper);max-width:22ch}

/* 4 — Differences ------------------------------------------------------ */
.diffs > div{padding-top:var(--s-5);border-top:var(--hairline) solid var(--rule)}
.diffs h3{font-size:var(--t-md);margin-bottom:var(--s-4)}
.diffs p{color:var(--ink-muted);max-width:none}
.diffs{display:grid;gap:var(--s-7)}

/* 5 — Services as an index, not a card field --------------------------- */
.index{border-top:var(--hairline) solid var(--rule)}
.index li{display:grid;grid-template-columns:5ch minmax(0,22ch) minmax(0,1fr);gap:var(--s-6);
 padding-block:var(--s-5);border-bottom:var(--hairline) solid var(--rule);align-items:baseline}
.index .num{font:500 var(--t-sm)/1.6 var(--font-body);color:var(--ink-muted);letter-spacing:.1em}
.index h3{font-size:var(--t-md)}
.index p{font-size:var(--t-base);color:var(--ink-muted);max-width:none}
@media (max-width:820px){
  .index li{grid-template-columns:4ch minmax(0,1fr);row-gap:var(--s-3)}
  .index p{grid-column:2}
}
/* At 320 a 4ch rail plus a 28px gap leaves the row wider than the document. */
@media (max-width:430px){
  .index li,.steps li{grid-template-columns:1fr;gap:var(--s-2)}
  .index p,.steps p,.index h3,.steps h3{grid-column:1}
}
.index__more{margin-top:var(--s-6);font-size:var(--t-sm);color:var(--ink-muted);max-width:none}

/* 6 — The one photograph of the work ----------------------------------- */
.work figure{margin:0}
.work img{width:100%;height:auto}
.work figcaption{margin-top:var(--s-5);font-size:var(--t-sm);color:var(--ink-muted);max-width:none}
.work img{max-width:512px}
.work .lede{max-width:none}

/* 7 — Full-bleed people ------------------------------------------------ */
.band{position:relative;overflow:hidden;background-color:var(--surface)}
.band img{width:100%;height:clamp(320px,46vw,620px);object-fit:cover;object-position:50% 34%}

/* 8 — Team ------------------------------------------------------------- */
.team{display:grid;gap:var(--s-7) var(--s-6)}
.person img{width:100%;height:auto;aspect-ratio:1;object-fit:cover;margin-bottom:var(--s-5)}
.person h3{font-size:var(--t-md)}
.person .role{font-size:var(--t-sm);color:var(--ink-muted);margin-block:var(--s-2) var(--s-4)}
.person .bio{font-size:var(--t-sm);color:var(--ink-muted);max-width:none;line-height:1.65}
.person blockquote{font-family:var(--font-display);font-size:var(--t-base);line-height:1.35;
 margin-bottom:var(--s-4)}
.hyg{display:grid;gap:var(--s-7) var(--s-6);grid-template-columns:repeat(4,minmax(0,1fr));margin-top:var(--s-8)}
@media (max-width:1000px){ .hyg{grid-template-columns:repeat(2,minmax(0,1fr))} }
@media (max-width:560px){ .hyg{grid-template-columns:1fr} }
.emeritus{margin-top:var(--s-8);padding-top:var(--s-5);border-top:var(--hairline) solid var(--rule);
 font-size:var(--t-sm);color:var(--ink-muted);max-width:72ch}

/* 9 — Office ----------------------------------------------------------- */
.specs li{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.5fr);gap:var(--s-6);
 padding-block:var(--s-5);border-bottom:var(--hairline) solid var(--rule)}
.specs li h3{font-size:var(--t-base)}
.specs li p{font-size:var(--t-sm);color:var(--ink-muted);max-width:none}
.office .lede{max-width:none}
.specs{border-top:var(--hairline) solid var(--rule)}
.specs + .specs{margin-top:var(--s-7)}
@media (max-width:760px){ .specs li{grid-template-columns:1fr;gap:var(--s-2)} }
.office__note{margin-top:var(--s-7);font-family:var(--font-display);font-size:var(--t-md);
 line-height:1.35;color:var(--paper);max-width:none;padding-left:var(--s-5);
 border-left:var(--hairline) solid var(--rule-strong)}

/* 10 — Values ---------------------------------------------------------- */
.vals{display:grid;gap:var(--s-7) var(--s-6)}
.vals > div{padding-top:var(--s-4);border-top:var(--hairline) solid var(--rule)}
.vals dt{font-family:var(--font-display);font-size:var(--t-md);margin-bottom:var(--s-3)}
.vals dd{margin:0;font-size:var(--t-sm);color:var(--ink-muted)}

/* 11 — Quotes at full size, one after another -------------------------- */
.qs{display:grid;gap:var(--s-8);max-width:76ch;margin-inline:auto}
.qs figure{margin:0}
.qs blockquote p{font-family:var(--font-display);font-size:var(--t-lg);line-height:1.32;
 letter-spacing:var(--tr-display);max-width:none}
.qs figcaption{margin-top:var(--s-5);font-size:var(--t-sm);letter-spacing:.12em;
 text-transform:uppercase;color:var(--ink-muted)}
/* No Google badge in any variant: it is a third-party trademark whose artwork
   contains five stars, and this practice has published no rating. */
.qs__src{max-width:76ch;margin:var(--s-8) auto 0;text-align:center;font-size:var(--t-sm);
 letter-spacing:.16em;text-transform:uppercase;color:var(--ink-muted)}
.qs__head{max-width:76ch;margin-inline:auto;margin-bottom:var(--s-8)}

/* 12 — Visit and cost -------------------------------------------------- */
.visit{display:grid;gap:var(--s-8)}
.steps{display:grid;gap:var(--s-6);border-top:var(--hairline) solid var(--rule)}
.steps li{display:grid;grid-template-columns:4ch minmax(0,1fr);gap:var(--s-5);padding-top:var(--s-5)}
.steps .num{font:500 var(--t-sm)/1.5 var(--font-body);color:var(--ink-muted)}
.steps h3{font-size:var(--t-md);margin-bottom:var(--s-3)}
.steps p{grid-column:2;font-size:var(--t-sm);color:var(--ink-muted);max-width:none}
.ptable{font-size:var(--t-base);border-top:var(--hairline) solid var(--rule-strong)}
.ptable caption{text-align:left;font:500 var(--t-md)/1.3 var(--font-display);padding-bottom:var(--s-5)}
.ptable thead th{font-size:var(--t-sm);letter-spacing:.16em;text-transform:uppercase;
 color:var(--ink-muted);text-align:left;padding-block:var(--s-4);
 border-bottom:var(--hairline) solid var(--rule)}
.ptable th,.ptable td{text-align:left;vertical-align:top;padding:var(--s-5) var(--s-5) var(--s-5) 0;
 border-bottom:var(--hairline) solid var(--rule)}
.ptable tbody th{width:32%;font-weight:500;font-family:var(--font-display);font-size:var(--t-md)}
@media (max-width:560px){
  .ptable thead{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}
  .ptable tbody th,.ptable tbody td{display:block;width:auto}
  .ptable tbody th{padding-bottom:var(--s-2);border-bottom:0}
}
.ptable td{color:var(--ink-muted);font-size:var(--t-sm)}

/* 13 — Questions ------------------------------------------------------- */
.faqs{max-width:80ch;margin-inline:auto;border-top:var(--hairline) solid var(--rule)}
.faqs details{border-bottom:var(--hairline) solid var(--rule)}
.faqs summary{cursor:pointer;list-style:none;padding-block:var(--s-5);display:flex;gap:var(--s-5);
 align-items:flex-start;font:500 var(--t-md)/1.35 var(--font-display)}
.faqs summary::-webkit-details-marker{display:none}
.faqs summary::after{content:"";flex:0 0 auto;margin-left:auto;width:14px;height:14px;
 border-right:var(--hairline) solid var(--ink-muted);border-bottom:var(--hairline) solid var(--ink-muted);
 transform:rotate(45deg);margin-top:.5em;transition:transform var(--d-fast) var(--ease-out)}
.faqs details[open] summary::after{transform:rotate(-135deg)}
.faqs details p{padding-bottom:var(--s-6);font-size:var(--t-base);color:var(--ink-muted);max-width:68ch}
.faqs__head{max-width:80ch;margin-inline:auto}

/* 14 — Close ----------------------------------------------------------- */
/* The rendered piece is the ground of this fold, not an ornament parked beside
   it. The poster still is in the MARKUP with the video attached by script only
   when motion is allowed, never a <video poster> paused down — a poster is only
   shown before playback begins, so pausing leaves the reader on whatever frame
   it reached. Both switches are written at the specificity they have to beat, or
   the page ships the still and the video stacked.
   The declared floor is the composition's own lightest composite: its scrim's
   .76 end over a pure white pixel, rgb(68,68,73). Paper on it is 9.2:1. */
.close{position:relative;isolation:isolate;overflow:hidden;text-align:center;
 background-color:rgb(68,68,73)}
.close > img.close__still,.close > video.close__film{position:absolute;inset:0;width:100%;
 height:100%;object-fit:cover;z-index:-2;max-width:none}
.close::after{content:"";position:absolute;inset:0;z-index:-1;
 background:linear-gradient(180deg,rgba(11,11,16,.34) 0%,rgba(11,11,16,.62) 100%)}
.close.is-film > img.close__still{display:none}
@media (prefers-reduced-motion:reduce){ .close.is-film > img.close__still{display:block} }
.close h2{font-size:var(--t-2xl);max-width:16ch;margin-inline:auto;margin-bottom:var(--s-6)}
/* Over the film the muted ink measures 3.8:1 against the declared floor, so this
   fold carries full-strength paper for every line. Re-keying a ground moves every
   pair with it — the section's palette is not the page's. */
.close p,.close .eyebrow,.close__note{color:var(--paper)}
.close p{margin-inline:auto;font-size:var(--t-md)}
.close .row-cta{justify-content:center;margin-block:var(--s-7) var(--s-5)}
/* Written at the specificity it has to beat: .close p is (0,1,1) and a bare
   .close__note is (0,1,0), so the note would otherwise keep the 21px body size
   and break the phone number across two lines. */
.close p.close__note{font-size:var(--t-sm)}
.close .eyebrow{margin-inline:auto;display:block;width:fit-content}

/* Footer --------------------------------------------------------------- */
.foot{background:var(--ground);border-top:var(--hairline) solid var(--rule);padding-block:var(--s-8)}
.foot__grid{display:grid;gap:var(--s-7);grid-template-columns:repeat(4,minmax(0,1fr));align-items:start}
@media (max-width:820px){ .foot__grid{grid-template-columns:repeat(2,minmax(0,1fr))} }
@media (max-width:520px){ .foot__grid{grid-template-columns:1fr} }
.foot img{width:190px;filter:invert(1);margin-bottom:var(--s-4)}
.foot h2{font-size:var(--t-sm);letter-spacing:.18em;text-transform:uppercase;color:var(--ink-muted);
 margin-bottom:var(--s-4)}
.foot p,.foot a,.foot li{font-size:var(--t-sm);color:var(--ink-muted)}
.foot a{text-decoration:none}
.foot ul{display:grid;gap:var(--s-1);list-style:none;padding:0}
.foot ul a{display:inline-flex;align-items:center;min-height:44px}
.foot a:hover{color:var(--paper)}
.foot__base{margin-top:var(--s-8);padding-top:var(--s-5);border-top:var(--hairline) solid var(--rule);
 display:flex;flex-wrap:wrap;gap:var(--s-5);justify-content:space-between;font-size:var(--t-sm);
 color:var(--ink-muted)}
.tagline{font-size:var(--t-sm);color:var(--ink-muted);letter-spacing:.04em}
`.trim();

// --------------------------------------------------------------------------

const NAV = [['nav.1', '#philosophy'], ['nav.2', '#services'], ['nav.3', '#team'], ['nav.4', '#office'], ['nav.5', '#faq']];

const body = (d) => {
  const P = '../../';
  const doc = doctors(d);
  const hyg = hygienists(d);
  return `
<header class="mast"><div class="wrap mast__in">
  <a class="mast__logo" href="#main">${img('img.brand.wordmark', { sizes: '210px', loading: 'eager', decorative: true, prefix: P })}<span class="vh" data-copy="brand.name">${d.t('brand.name')}</span></a>
  <nav class="mast__nav" aria-label="Main">${NAV.map(([k, href]) => `<a href="${href}" data-copy="${k}">${d.t(k)}</a>`).join('')}</nav>
  <a class="mast__tel" href="${TEL}" data-copy="contact.phone">${d.t('contact.phone')}</a>
  <a class="btn btn--primary" href="${BOOK}" data-copy="nav.cta">${d.t('nav.cta')}</a>
</div></header>

<main id="main">

<section id="hero" class="hero">
  ${img('img.hero.landscape', { sizes: '100vw', loading: 'eager', decorative: true, prefix: P })}
  <div class="wrap hero__in">
    <p class="eyebrow" data-copy="hero.eyebrow">${d.t('hero.eyebrow')}</p>
    <h1 data-copy="hero.h1">${d.t('hero.h1')}</h1>
    <p class="hero__sub" data-copy="hero.sub">${d.t('hero.sub')}</p>
    <div class="row-cta">
      <a class="btn btn--primary" href="${BOOK}" data-copy="hero.cta.primary">${d.t('hero.cta.primary')}</a>
      <a class="btn btn--line" href="${TEL}" data-copy="hero.cta.secondary">${d.t('hero.cta.secondary')}</a>
    </div>
    ${dl(heroProof(d), { cls: 'hero__proof' }).replace('class="hero__proof"', 'class="hero__proof" style="grid-template-columns:repeat(3,minmax(0,1fr))"')}
  </div>
</section>

<section id="welcome" class="sec sec--narrow rv"><div class="wrap">
  <p class="eyebrow" data-copy="welcome.eyebrow">${d.t('welcome.eyebrow')}</p>
  <h2 class="stmt" data-copy="welcome.h2">${d.t('welcome.h2')}</h2>
  <p class="welcome__body" style="margin-top:var(--s-6)" data-copy="welcome.body">${d.t('welcome.body')}</p>
  <p style="margin-top:var(--s-7)"><a class="btn btn--line" href="${TEL}" data-copy="welcome.cta">${d.t('welcome.cta')}</a></p>
</div></section>

<section id="philosophy" class="sec sec--raised sec--col rv">
  <div class="wrap" style="display:grid;gap:var(--s-8);grid-template-columns:minmax(0,4fr) minmax(0,7fr)">
    <div class="phil__rail" style="position:sticky;top:var(--s-8)">
      <p class="eyebrow" data-copy="phil.eyebrow">${d.t('phil.eyebrow')}</p>
      <h2 class="h2" data-copy="phil.h2">${d.t('phil.h2')}</h2>
      <p class="phil__pull" data-copy="phil.pull">${d.t('phil.pull')}</p>
    </div>
    <div class="phil__body">
      <p data-copy="phil.body.1">${d.t('phil.body.1')}</p>
      <p data-copy="phil.body.2">${d.t('phil.body.2')}</p>
      <p data-copy="phil.body.3">${d.t('phil.body.3')}</p>
    </div>
  </div>
</section>

<section id="different" class="sec sec--col rv"><div class="wrap">
  <div class="head">
    <div>
      <p class="eyebrow" data-copy="diff.eyebrow">${d.t('diff.eyebrow')}</p>
      <h2 class="h2" data-copy="diff.h2">${d.t('diff.h2')}</h2>
    </div>
    <p class="lede" data-copy="diff.intro">${d.t('diff.intro')}</p>
  </div>
  <div class="diffs" style="grid-template-columns:repeat(2,minmax(0,1fr))">
    ${diffs(d).map((i) => `<div><h3 data-copy="${i.tk}">${i.t}</h3><p data-copy="${i.bk}">${i.b}</p></div>`).join('')}
  </div>
  <p class="lede" style="margin-top:var(--s-8);max-width:none" data-copy="diff.closing">${d.t('diff.closing')}</p>
</div></section>

<section id="services" class="sec sec--raised rv">
  <div class="wrap">
    <div class="head">
      <div>
        <p class="eyebrow" data-copy="svc.eyebrow">${d.t('svc.eyebrow')}</p>
        <h2 class="h2" data-copy="svc.h2">${d.t('svc.h2')}</h2>
      </div>
      <p class="lede" data-copy="svc.intro">${d.t('svc.intro')}</p>
    </div>
    ${rows(services(d), { cls: 'index', num: true })}
    <p class="index__more" data-copy="svc.more">${d.t('svc.more')}</p>
  </div>
</section>

<section id="work" class="sec sec--col work rv"><div class="wrap" style="display:grid;gap:var(--s-8);grid-template-columns:minmax(0,5fr) minmax(0,6fr);align-items:center">
  <figure>
    ${img('img.work.microscopy', { sizes: '(max-width:1000px) 92vw, 40vw', prefix: P })}
    <figcaption data-copy="fig.microscopy.caption">${d.t('fig.microscopy.caption')}</figcaption>
  </figure>
  <div>
    <p class="eyebrow" data-copy="proof.eyebrow">${d.t('proof.eyebrow')}</p>
    <h2 class="h2" data-copy="team.h2">${d.t('team.h2')}</h2>
    <p class="lede" data-copy="team.intro">${d.t('team.intro')}</p>
  </div>
</div></section>

<section id="people" class="band rv">
  ${img('img.team.group.wide', { sizes: '100vw', prefix: P })}
</section>

<section id="team" class="sec wrap rv">
  <p class="eyebrow" data-copy="team.eyebrow">${d.t('team.eyebrow')}</p>
  <div class="team" style="grid-template-columns:repeat(4,minmax(0,1fr))">
    ${doc.map((p) => `<article class="person">
      ${img(p.asset, { sizes: '(max-width:560px) 84vw, (max-width:1000px) 42vw, 21vw', prefix: P })}
      <h3 data-copy="${p.nk}">${p.name}</h3>
      <p class="role" data-copy="${p.rk}">${p.role}</p>
      ${p.q ? `<blockquote data-copy="team.1.quote">${p.q}</blockquote>` : ''}
      <p class="bio" data-copy="${p.bk}">${p.bio}</p>
    </article>`).join('')}
  </div>
  <p class="eyebrow" style="margin-top:var(--s-8)" data-copy="team.hyg.eyebrow">${d.t('team.hyg.eyebrow')}</p>
  <div class="hyg" style="margin-top:0">
    ${hyg.map((p) => `<article class="person">
      ${img(p.asset, { sizes: '(max-width:560px) 84vw, (max-width:1000px) 42vw, 21vw', prefix: P })}
      <h3 data-copy="${p.nk}">${p.name}</h3>
      <p class="bio" style="margin-top:var(--s-3)" data-copy="${p.bk}">${p.bio}</p>
    </article>`).join('')}
  </div>
  <p class="emeritus" data-copy="team.emeritus">${d.t('team.emeritus')}</p>
</section>

<section id="office" class="sec sec--raised sec--col office rv">
  <div class="wrap" style="display:grid;gap:var(--s-8);grid-template-columns:minmax(0,4fr) minmax(0,6fr)">
    <div>
      <p class="eyebrow" data-copy="office.eyebrow">${d.t('office.eyebrow')}</p>
      <h2 class="h2" data-copy="office.h2">${d.t('office.h2')}</h2>
      <p class="office__note" data-copy="fig.office.caption">${d.t('fig.office.caption')}</p>
    </div>
    <div>
      <p class="lede" data-copy="office.body.1">${d.t('office.body.1')}</p>
      <p class="lede" style="margin-top:var(--s-5)" data-copy="office.body.2">${d.t('office.body.2')}</p>
      ${rows(officeSpecs(d), { cls: 'specs' })}
      ${rows(officeTech(d), { cls: 'specs' })}
    </div>
  </div>
</section>

<section id="values" class="sec sec--col rv"><div class="wrap">
  <p class="eyebrow" data-copy="values.eyebrow">${d.t('values.eyebrow')}</p>
  <h2 class="h2" data-copy="values.h2">${d.t('values.h2')}</h2>
  ${dl(values(d), { cls: 'vals' }).replace('class="vals"', 'class="vals" style="grid-template-columns:repeat(3,minmax(0,1fr))"')}
</div></section>

<section id="reviews" class="sec sec--raised rv">
  <div class="wrap">
    <div class="qs__head"><p class="eyebrow" data-copy="proof.eyebrow">${d.t('proof.eyebrow')}</p></div>
    <div class="qs">${quotes(testimonials(d), {})}</div>
    <p class="qs__src"><span data-copy="proof.source">${d.t('proof.source')}</span></p>
  </div>
</section>

<section id="visit" class="sec sec--col rv"><div class="wrap">
  <p class="eyebrow" data-copy="visit.eyebrow">${d.t('visit.eyebrow')}</p>
  <h2 class="h2" data-copy="visit.h2">${d.t('visit.h2')}</h2>
  <div class="visit" style="grid-template-columns:minmax(0,1fr) minmax(0,1fr)">
    ${rows(visitSteps(d), { cls: 'steps', num: true })}
    ${table(prices(d), { cls: 'ptable', caption: 'What a first appointment costs', headings: ['Item', 'Detail'] })}
  </div>
</div></section>

<section id="faq" class="sec sec--raised rv">
  <div class="wrap">
    <div class="faqs__head">
      <p class="eyebrow" data-copy="faq.eyebrow">${d.t('faq.eyebrow')}</p>
      <h2 class="h2" data-copy="faq.h2">${d.t('faq.h2')}</h2>
    </div>
    ${faqList(faqs(d), { cls: 'faqs' })}
  </div>
</section>

<section id="book" class="sec sec--narrow close rv">
  <img class="close__still" src="${P}assets/motion/close--v2-poster.jpg" alt="" aria-hidden="true" width="1440" height="810" decoding="async">
  <div class="wrap">
  <p class="eyebrow" data-copy="cta.final.eyebrow">${d.t('cta.final.eyebrow')}</p>
  <h2 data-copy="cta.final.h2">${d.t('cta.final.h2')}</h2>
  <p data-copy="cta.final.body">${d.t('cta.final.body')}</p>
  <div class="row-cta">
    <a class="btn btn--primary" href="${BOOK}" data-copy="cta.final.primary">${d.t('cta.final.primary')}</a>
    <a class="btn btn--line" href="${TEL}" data-copy="cta.final.secondary">${d.t('cta.final.secondary')}</a>
  </div>
  <p class="close__note" data-copy="cta.final.note">${d.t('cta.final.note')}</p>
</div></section>

</main>

<footer class="foot"><div class="wrap">
  <div class="foot__grid">
    <div>${img('img.brand.wordmark', { sizes: '190px', decorative: true, prefix: P })}<p class="tagline" data-copy="brand.tagline">${d.t('brand.tagline')}</p></div>
    <div><h2>Visit</h2><p data-copy="contact.neighborhood">${d.t('contact.neighborhood')}</p><p data-copy="contact.address">${d.t('contact.address')}</p><p data-copy="contact.hours">${d.t('contact.hours')}</p></div>
    <div><h2>Contact</h2><ul><li><a href="${TEL}"><span data-copy="contact.phone">${d.t('contact.phone')}</span></a></li><li><a href="mailto:${d.t('contact.email')}" data-copy="contact.email">${d.t('contact.email')}</a></li></ul></div>
    <div><h2>More</h2><ul><li><a href="#faq">${d.t('faq.eyebrow')}</a></li><li><a href="${BOOK}" data-copy="cta.final.primary">${d.t('cta.final.primary')}</a></li></ul></div>
  </div>
  <div class="foot__base"><span data-copy="footer.legal">${d.t('footer.legal')}</span><span data-copy="footer.hipaa">${d.t('footer.hipaa')}</span></div>
</div></footer>`;
};

/**
 * The rendered fold is an upgrade applied at runtime, never a downgrade. A
 * reader with reduced motion, no JavaScript, or a slow first paint keeps the
 * poster — which is the resolved frame, and a finished image on its own.
 */
export const BODY_END = `<script>
(function(){
  if (matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  var s = document.getElementById('book');
  if (!s) return;
  var v = document.createElement('video');
  v.className = 'close__film';
  v.autoplay = true; v.muted = true; v.playsInline = true; v.setAttribute('aria-hidden','true');
  v.preload = 'metadata';
  v.poster = '../../assets/motion/close--v2-poster.jpg';
  v.src = '../../assets/motion/close--v2.mp4';
  v.addEventListener('loadeddata', function(){ s.classList.add('is-film'); });
  s.insertBefore(v, s.firstChild);
})();
</script>`;

export const PAGES = [
  {
    file: 'index.html',
    title: 'Integrative Dentistry — Holistic and Biological Dentistry in Seattle',
    description: 'A Seattle holistic dental practice treating the mouth as part of the whole body. Metal-free, mercury-free, BPA-free and fluoride-free care, safe amalgam removal, and biological therapies in a low-toxicity office.',
    body,
  },
];
