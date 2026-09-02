#!/usr/bin/env node
/**
 * render — the source of truth for every file in ../assets/motion.
 *
 * Each entry names the variant it was art-directed for, the composition, and one
 * sentence on what it means. A line that cannot be given that sentence is a line
 * whose asset should not ship. Nothing here is rendered by hand: if an asset has
 * to change, it changes in this file and this is re-run, so the script can never
 * describe a mapping the tree does not have.
 *
 * The public dir points at the shared asset tree rather than a copy: one asset,
 * one copy, and the composition reads the practice's own photograph directly.
 *
 *   node render.mjs
 */
import { execFileSync } from 'node:child_process';

const JOBS = [
  {
    // v2 — the closing fold. The practice's own photograph of a reflection in
    // still water arrives fractionally large and soft and settles into itself,
    // while one arc — derived from the brush ring's geometry and left open where
    // the mark is open — is drawn around it. It plays once and rests.
    variant: 'v2',
    composition: 'StillWater',
    video: '../assets/motion/close--v2.mp4',
    poster: '../assets/motion/close--v2-poster.jpg',
    posterFrame: 140,
  },
];

for (const job of JOBS) {
  const common = ['--scale=0.75', '--public-dir=../assets/source', '--log=error'];
  execFileSync('npx', ['remotion', 'render', job.composition, job.video, '--codec=h264', '--crf=31', ...common], { stdio: 'inherit' });
  // The poster is taken from the RESOLVED frame, never frame 0: it is what a
  // reduced-motion reader, a paused tab and a slow first paint all get instead
  // of the video, so it has to be a finished image on its own.
  execFileSync('npx', ['remotion', 'still', job.composition, job.poster, `--frame=${job.posterFrame}`, '--jpeg-quality=76', ...common], { stdio: 'inherit' });
  console.log(`${job.variant}  ${job.composition} → ${job.video}`);
}
