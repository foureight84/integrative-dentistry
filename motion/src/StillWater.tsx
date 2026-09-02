import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

/**
 * StillWater — the closing fold of v2.
 *
 * Anchors, both named before the studio was opened:
 *   · the canonical photograph — the practice's own hero image, a stand of
 *     conifers reflected in genuinely still water. The gesture is the water
 *     arriving at that stillness.
 *   · the mark's own geometry — one arc, swept and left open at the same angle
 *     the brush ring is open. Derived from the mark, never a redraw of it: no
 *     brush texture, no letterform, no grey.
 *
 * It plays once and rests. There is no loop, so there is no seam to hide and
 * the poster frame is simply the resolved image — which is also exactly what a
 * reduced-motion reader, a paused tab and a slow first paint all get.
 *
 * Palette is read from the frozen brand tokens; nothing here invents a colour.
 */

const INK_BLACK = '#0B0B10';
const BLUE = '#3B82F6';

/** Where the real mark's ring is open, in degrees, measured clockwise from 12. */
const SWEEP_FROM = 208;
const SWEEP_DEGREES = 302;

export const StillWater: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  const cx = width / 2;
  const cy = height / 2;
  const r = height * 0.34;
  const circumference = 2 * Math.PI * r;
  const arcLength = circumference * (SWEEP_DEGREES / 360);

  return (
    <AbsoluteFill style={{ backgroundColor: INK_BLACK }}>
      {/* The photograph settles: it arrives fractionally large and soft and
          eases to its true size over the whole five seconds, so the movement is
          never legible as movement — only as the surface going still. */}
      <AbsoluteFill
        style={{
          scale: interpolate(frame, [0, 4 * fps], [1.055, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            output: 'perceptual-scale',
          }),
          filter: `blur(${interpolate(frame, [0, 2.4 * fps], [7, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}px)`,
        }}
      >
        <Img
          src={staticFile('HomepagePicCrop-scaled.jpg')}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </AbsoluteFill>

      {/* The scrim deepens as the image resolves. Its floor is the same one the
          page declares: 0.74 ink-black over a white pixel, which carries paper
          at 8.4:1. It only ever gets darker than that. */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, rgba(11,11,16,${interpolate(frame, [0, 3 * fps], [0.62, 0.76], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })}) 0%, rgba(11,11,16,0.9) 100%)`,
        }}
      />

      {/* One arc, derived from the mark's geometry: swept clockwise and left
          open where the ring is open. Drawn with stroke-dashoffset off the
          frame, because a CSS transition does not render. */}
      <AbsoluteFill>
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          <g transform={`rotate(${SWEEP_FROM} ${cx} ${cy})`}>
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={BLUE}
              strokeWidth={3}
              strokeLinecap="round"
              opacity={interpolate(frame, [12, 26], [0, 0.9], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })}
              strokeDasharray={`${arcLength} ${circumference}`}
              strokeDashoffset={interpolate(frame, [14, 3 * fps], [arcLength, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              })}
              transform={`rotate(-90 ${cx} ${cy})`}
            />
          </g>
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
