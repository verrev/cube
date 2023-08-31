import Steps from '@/components/steps';
import {
  differenceInSeconds,
  formatDuration,
  intervalToDuration,
} from 'date-fns';

const STEP_COLORS = [
  'text-red-200',
  'text-red-300',
  'text-amber-200',
  'text-amber-300',
  'text-amber-400',
  'text-green-300',
  'text-green-400',
  'text-green-500',
];

const Results = ({ currentStep, stepTimes }) =>
  currentStep < 2 ? null : (
    <div className="pt-2 text-xl border-t-2">
      {[...new Array(Object.keys(stepTimes).length - 1)].map((_, i) => (
        <div key={i} className="flex justify-between">
          <p>
            <p className={`text-xl ${STEP_COLORS[i]}`}>{Steps[i + 1].name}</p>
          </p>
          {differenceInSeconds(stepTimes[i + 1], stepTimes[i])} s
        </div>
      ))}
      {currentStep === Steps.length && (
        <div className="pt-2 mt-2 border-t-2">
          <div className="flex justify-between font-bold text-emerald-400">
            <p>Total</p>
            <p>
              {formatDuration(
                intervalToDuration({
                  start: stepTimes[0],
                  end: stepTimes[currentStep - 1],
                })
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );

export default Results;
