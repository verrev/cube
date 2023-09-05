import { NextResponse } from 'next/server';
import getResults from '@/getResults';
import { Steps } from '@/components';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { getKey, setKey } from '@/utils';

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
    const results = await getKey(player);
    const newResults = results.filter((result) => result.id !== resultId);
    if (results.length !== newResults.length) {
      await setKey(player, newResults);
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
  await setKey('PLAYERS', {
    ...((await getKey('PLAYERS')) || {}),
    [player]: true,
  });
  const body = await request.json();
  if (
    new Date(body[Steps.length - 1]).getTime() - new Date(body[0]).getTime() >
    9999
  ) {
    await setKey(player, [
      ...((await getKey(player)) || []),
      { id: uuidv4(), stepTimes: body, attemptedAt: new Date() },
    ]);
  } else {
    console.log('Will not save SUS attempt', { body, player });
  }
  return new NextResponse(null, { status: 200 });
};
