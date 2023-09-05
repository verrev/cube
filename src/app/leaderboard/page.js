import ResultTime from '@/components/resultTime';
import getResults from '@/getResults';
import { stringToColour } from '@/utils';
import { formatInTimeZone } from 'date-fns-tz';

const Leaderboard = async () => {
  const results = await getResults();
  return (
    <main className="flex justify-center">
      <div className="w-full max-w-3xl p-4 md:p-16">
        <div className="mb-4">
          <div className="flex justify-between text-lg">
            <div>
              <div className="font-bold text-yellow-400">Player</div>
              {results.map((result, i) => (
                <div key={result.id}>
                  {i + 1}.{' '}
                  <b style={{ color: stringToColour(result.player) }}>
                    {result.player}
                  </b>
                </div>
              ))}
            </div>
            <div>
              <div className="font-bold text-center text-yellow-400">
                Attempted at
              </div>
              {results.map((result) => (
                <div
                  key={result.id}
                  className="text-center"
                  style={{ color: stringToColour(result.player) }}
                >
                  {formatInTimeZone(
                    result.attemptedAt,
                    'Europe/Tallinn',
                    'dd.MM.yy HH:mm'
                  )}
                </div>
              ))}
            </div>
            <div>
              <div className="font-bold text-right text-yellow-400">Time</div>
              {results.map((result) => (
                <ResultTime key={result.id} result={result} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Leaderboard;
