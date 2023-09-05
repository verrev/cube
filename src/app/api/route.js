import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import getResults from '@/getResults';
import Steps from '@/components/steps';
import crypto from 'crypto';

export const GET = async (_) => {
  return NextResponse.json(await getResults());
};

export const DELETE = async (request) => {
  try {
    if (
      !crypto.timingSafeEqual(
        Buffer.from(process.env.API_KEY),
        Buffer.from(request.headers.get('X-api-key'))
      )
    ) {
      return new NextResponse(null, { status: 400 });
    }

    const { player, resultId } = await request.json();
    const results = await kv.get(player);
    const newResults = results.filter((result) => result.id !== resultId);
    if (results.length !== newResults.length) {
      await kv.set(player, newResults);
      return new NextResponse(null, { status: 200 });
    }
  } catch (e) {
    console.log(e);
  }
  return new NextResponse(null, { status: 400 });
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
    3333
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
