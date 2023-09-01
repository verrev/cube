import { v4 as uuidv4 } from 'uuid';
import { kv } from '@vercel/kv';
import Steps from '@/components/steps';
import { formatDuration, intervalToDuration } from 'date-fns';

const getResults = async () => {
  const players = Object.keys((await kv.get('PLAYERS')) || {});

  const resultsPromises = [];
  for (const player of players) {
    resultsPromises.push(
      new Promise(async (resolve, reject) => {
        try {
          resolve({ player, ...(await kv.get(player)) });
        } catch (e) {
          console.log(e);
          reject(null);
        }
      })
    );
  }
  const rawResults = await Promise.all(resultsPromises);

  const results = [];
  rawResults.filter(Boolean).forEach((result) => {
    const { player, ...solves } = result;
    for (const solve in solves) {
      results.push({
        id: uuidv4(),
        player,
        time: formatDuration(
          intervalToDuration({
            start: new Date(solves[solve].stepTimes[Steps.length - 1]),
            end: new Date(solves[solve].stepTimes[0]),
          })
        ),
        attemptedAt: solves[solve].attemptedAt,
      });
    }
  });

  return results.sort((a, b) => a.time - b.time);
};

export default getResults;
