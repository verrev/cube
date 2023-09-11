'use client';
import { useEffect, useState } from 'react';
import { formatDuration, intervalToDuration } from 'date-fns';

const Timer = ({ startTime }) => {
  const [currentTime, setCurrentTime] = useState(startTime);
  useEffect(() => {
    setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
  }, [setCurrentTime]);
  return (
    <div className="absolute font-mono text-xs right-1 md:bottom-2 bottom-20 text-slate-600">
      {formatDuration(
        intervalToDuration({
          start: startTime,
          end: currentTime,
        })
      )}
    </div>
  );
};

export default Timer;
