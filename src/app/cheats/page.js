import { Move, Sticker } from '@/components/steps';
import Link from 'next/link';

const yellowCrossAlgo = () => (
  <>
    <Move move="F" />
    <Move move="U" />
    <Move move="R" />
    <Move move="U'" />
    <Move move="R'" />
    <Move move="F'" />
  </>
);

const yellowFaceAlgo = () => (
  <>
    <Move move="RT" />
    <Move move="U" />
    <Move move="R" />
    <Move move="U2" />
    <Move move="R'" />
  </>
);

const topLayerCornerAlgo = () => (
  <>
    <Move move="L'" />
    <Move move="U" />
    <Move move="R" />
    <Move move="U'" />
    <Move move="L" />
    <Move move="U2" />
    <Move move="R'" />
    <Move move="U" />
    <Move move="R" />
    <Move move="U2" />
    <Move move="R'" />
  </>
);

const topLayerEdgeCWAlgo = () => (
  <>
    <Move move="F2" />
    <Move move="U" />
    <Move move="R'" />
    <Move move="L" />
    <Move move="F2" />
    <Move move="L'" />
    <Move move="R" />
    <Move move="U" />
    <Move move="F2" />
  </>
);

const topLayerEdgeCCWAlgo = () => (
  <>
    <Move move="F2" />
    <Move move="U'" />
    <Move move="R'" />
    <Move move="L" />
    <Move move="F2" />
    <Move move="L'" />
    <Move move="R" />
    <Move move="U'" />
    <Move move="F2" />
  </>
);

const Cheats = () => {
  return (
    <main className="flex justify-center font-mono text-xs">
      <Link href="/" className="absolute text-xs right-28">
        Home
      </Link>
      <Link href="/leaderboard" className="absolute text-xs right-2">
        Leaderboard
      </Link>
      <Link href="/scramble" className="absolute text-xs">
        Scramble
      </Link>
      <div className="w-full max-w-6xl p-4 md:p-12">
        <div className="my-8 text-base text-center">
          Cheat sheet for algorithms. (The most difficult ones)
        </div>
        <div className="flex flex-col mb-4 text-xl">
          {/* Yellow cross */}
          <div className="mb-12">
            <div className="mb-4 font-bold text-amber-200">Yellow cross</div>
            No edges / Line / 9 & 12 <Sticker color="bg-yellow-400" />
            <div className="mt-4">{yellowCrossAlgo()}</div>
          </div>
          {/* Yellow face */}
          <div className="mb-12">
            <div className="mb-4 font-bold text-amber-200">Yellow face</div>
            No fish: left face has <Sticker color="bg-yellow-400" /> on Top
            right corner
            <div className="mt-4">Fish: nose in left bottom corner</div>
            <div className="mt-4">{yellowFaceAlgo()}</div>
          </div>
          {/* Top layer corners */}
          <div className="mb-12">
            <div className="mb-4 font-bold text-amber-200">
              Top layer corners
            </div>
            No faces have matching corners
            <div className="mt-4">Some: hold in left hand</div>
            <div className="mt-4">{topLayerCornerAlgo()}</div>
          </div>
          {/* Top layer edges */}
          <div className="mb-8">
            <div className="mb-4 font-bold text-amber-200">Top layer edges</div>
            No faces / Some (Counter Clockwise)
            <div className="mt-4">{topLayerEdgeCCWAlgo()}</div>
            <div className="mt-8">Some (Clockwise)</div>
            <div className="mt-4">{topLayerEdgeCWAlgo()}</div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cheats;
