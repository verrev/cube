'use client';
import { Move } from '@/components/steps';
import Link from 'next/link';
// https://js.cubing.net/cubing/
import TwistyPlayer from 'cubing/twisty';
import { randomScrambleForEvent } from 'cubing/scramble';
import { useEffect, useState } from 'react';

const Cheats = () => {
  const [scrambleString, setScrambleString] = useState('');

  useEffect(() => {
    randomScrambleForEvent('333').then((alg) => {
      setScrambleString(alg.toString());
    });
  }, []);

  const scrambled = () => (
    <>
      {scrambleString.split(' ').map((move, index) => (
        <Move key={index} move={move} />
      ))}
    </>
  );

  return (
    <main className="flex justify-center font-mono text-xs main-container">
      <Link href="/" className="absolute text-xs right-28">
        Home
      </Link>
      <Link href="/leaderboard" className="absolute text-xs right-2">
        Leaderboard
      </Link>
      <Link href="/cheats" className="absolute text-xs">
        Cheats
      </Link>
      <div className="w-full max-w-6xl p-4 text-xl text-center md:p-12">
        {/* Daily scramble test */}
        <div className="mb-8">Daily scramble test</div>
        <div>
          <div className="mb-8">{scrambled()}</div>
        </div>
        <div className="flex justify-center mb-16">
          <twisty-player
            alg={scrambleString}
            background="black"
            control-panel="none"
          />
        </div>
      </div>
    </main>
  );
};

export default Cheats;
