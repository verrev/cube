import { Steps } from '@/components';
import { formatDuration, intervalToDuration } from 'date-fns';
import { getKey, setKey } from '@/utils';

const formatDistanceLocale = {
  xSeconds: '{{count}}s',
  xMinutes: '{{count}}m',
};

const formatDurationLocale = {
  formatDistance: (token, count) =>
    formatDistanceLocale[token].replace('{{count}}', count),
};

const getResults = async () => {
  const players = Object.keys((await getKey('PLAYERS')) || {});
  const resultsPromises = [];
  for (const player of players) {
    resultsPromises.push(
      new Promise(async (resolve, reject) => {
        try {
          resolve({ player, ...(await getKey(player)) });
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
      const start = new Date(solves[solve].stepTimes[Steps.length - 1]);
      const end = new Date(solves[solve].stepTimes[0]);
      results.push({
        id: solves[solve].id,
        player,
        time: formatDuration(
          intervalToDuration({
            start,
            end,
          }),
          {
            format: ['minutes', 'seconds'],
            locale: formatDurationLocale,
          }
        ),
        timeInMs: start.getTime() - end.getTime(),
        attemptedAt: solves[solve].attemptedAt,
      });
    }
  });
  return results.sort((a, b) => a.timeInMs - b.timeInMs);
};

export default getResults;
