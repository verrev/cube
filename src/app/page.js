'use client';
import Player, { usePlayer } from '@/components/player';
import Results from '@/components/results';
import Steps from '@/components/steps';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

const useSteps = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepTimes, setStepTimes] = useState({});
  const { player } = usePlayer();
  const onKeypress = useCallback(
    (e) => {
      if (e.code === 'Space') {
        if (currentStep === 0) {
          setStepTimes({ [currentStep]: new Date() });
        } else {
          setStepTimes({ ...stepTimes, [currentStep]: new Date() });
        }
        if (currentStep > Steps.length - 1) {
          fetch('/api', {
            method: 'POST',
            body: JSON.stringify(stepTimes),
            headers: {
              'X-player': player,
            },
          });
          setCurrentStep(0);
        } else {
          setCurrentStep(currentStep + 1);
        }
      }
      // if (e.code === 'KeyR') {
      //   setCurrentStep(0);
      //   setStepTimes({});
      // }
    },
    [currentStep, stepTimes, player]
  );
  useEffect(() => {
    document.addEventListener('keypress', onKeypress);
    return () => {
      document.removeEventListener('keypress', onKeypress);
    };
  }, [onKeypress]);
  return { currentStep, stepTimes };
};

const Home = () => {
  const { currentStep, stepTimes } = useSteps();
  return (
    <main className="relative flex justify-center">
      <Link href="/leaderboard" className="absolute font-mono text-xs right-2">
        Leaderboard
      </Link>
      <div className="w-full max-w-3xl p-4 md:p-16">
        <div className="mb-4">
          {Steps[currentStep]?.component() || (
            <p className="text-xl font-bold text-emerald-400">Done!</p>
          )}
        </div>
        <Results currentStep={currentStep} stepTimes={stepTimes} />
        {currentStep === 0 && <Player />}
      </div>
    </main>
  );
};

export default Home;
