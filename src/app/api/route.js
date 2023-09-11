import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import getResults from '@/getResults';
import { Steps } from '@/components';
import { getKey, setKey } from '@/utils';

export const KvKey = {
  PLAYERS: 'PLAYERS',
};

export const GET = async (_) => {
  try {
    return new NextResponse(null, { status: 400 });
  } catch (e) {
    console.log(e);
  }
  return NextResponse.json(await getResults());
};

const verifyAndGetPlayer = (req) => {
  const token = req.cookies.get('Authorization').value.split(' ')[1];
  const { player } = jwt.verify(token, process.env.JWT_SECRET);
  return player;
};

export const DELETE = async (req) => {
  try {
    const player = verifyAndGetPlayer(req);
    const { resultId } = await req.json();
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

export const POST = async (req) => {
  try {
    const player = verifyAndGetPlayer(req);
    const body = await req.json();
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
  } catch (e) {
    console.log(e);
  }
  return new NextResponse(null, { status: 400 });
};
