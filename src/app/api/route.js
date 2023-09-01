import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import getResults from '@/getResults';
import Steps from '@/components/steps';

export const GET = async (_) => {
  // const players = Object.keys((await kv.get('PLAYERS')) || {});
  // for (const player of players) {
  //   await kv.del(player);
  // }
  return NextResponse.json(await getResults());
};

export const POST = async (request) => {
  const rawPlayer = request.headers.get('X-player');
  if (!rawPlayer) {
    return new NextResponse(null, { status: 400 });
  }
  const player = rawPlayer.slice(0, 15);
  kv.set('PLAYERS', { ...((await kv.get('PLAYERS')) || {}), [player]: true });
  const body = await request.json();
  if (
    new Date(body[Steps.length - 1]).getTime() - new Date(body[0]).getTime() >
    2000
  ) {
    kv.set(player, [
      ...((await kv.get(player)) || []),
      { stepTimes: body, attemptedAt: new Date() },
    ]);
  } else {
    console.log('Will not save SUS attempt', { body, player });
  }
  return new NextResponse(null, { status: 200 });
};
