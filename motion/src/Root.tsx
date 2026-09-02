import { Composition } from 'remotion';
import { StillWater } from './StillWater';

/**
 * One project for the whole brand. Compositions are per asset, and every asset
 * is argued in ../motion/BRIEFS.md before it is rendered.
 */
export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="StillWater"
      component={StillWater}
      durationInFrames={150}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
