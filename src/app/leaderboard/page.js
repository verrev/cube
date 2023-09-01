import getResults from '@/getResults';
import { format, formatDuration } from 'date-fns';

const Leaderboard = async () => {
  const results = await getResults();
  return (
    <main className="flex justify-center">
      <div className="w-full max-w-3xl p-4 md:p-16">
        <div className="mb-4">
          <div className="flex justify-between text-lg">
            <div>
              <div className="font-bold text-yellow-400">Player</div>
              {results.map((result) => (
                <div key={result.id}>{result.player}</div>
              ))}
            </div>
            <div>
              <div className="font-bold text-center text-yellow-400">
                Attempted at
              </div>
              {results.map((result) => (
                <div key={result.id} className="text-center">
                  {format(new Date(result.attemptedAt), 'dd.MM.yy HH:mm')}
                </div>
              ))}
            </div>
            <div>
              <div className="font-bold text-right text-yellow-400">Time</div>
              {results.map((result) => (
                <div key={result.id} className="text-right">
                  {result.time}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Leaderboard;
