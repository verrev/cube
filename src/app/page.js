'use client';
import Results from '@/components/results';
import Steps from '@/components/steps';
import { useCallback, useEffect, useState } from 'react';

const useSteps = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepTimes, setStepTimes] = useState({});
  const onKeypress = useCallback(
    (e) => {
      if (e.code === 'Space') {
        if (currentStep === 0) {
          setStepTimes({ [currentStep]: new Date() });
        } else {
          setStepTimes({ ...stepTimes, [currentStep]: new Date() });
        }
        setCurrentStep(currentStep > Steps.length - 1 ? 0 : currentStep + 1);
      }
      if (e.code === 'KeyR') {
        setCurrentStep(0);
        setStepTimes({});
      }
    },
    [currentStep, stepTimes]
  );
  useEffect(() => {
    document.addEventListener('keypress', onKeypress);
    return () => {
      document.removeEventListener('keypress', onKeypress);
    };
  }, [onKeypress]);
  return { currentStep, stepTimes };
};

export default function Home() {
  const { currentStep, stepTimes } = useSteps();
  return (
    <main className="flex justify-center">
      <div className="w-full max-w-3xl p-4 md:p-16">
        <div className="mb-4">
          {Steps[currentStep]?.component() || (
            <p className="text-xl font-bold text-emerald-400">Done!</p>
          )}
        </div>
        <Results currentStep={currentStep} stepTimes={stepTimes} />
      </div>
    </main>
  );
}
