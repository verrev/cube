import jwt from 'jsonwebtoken';

export const isServer = typeof window === 'undefined';

export const stringToColour = (string) => {
  let hash = 0;
  string.split('').forEach((char) => {
    hash = char.charCodeAt(0) + ((hash << 5) - hash);
  });
  let colour = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    colour += value.toString(16).padStart(2, '0');
  }
  return colour;
};

export const getKey = (key) =>
  fetch(`https://l8.ee/xxx?key=${key}`, {
    headers: {
      'X-api-key': process.env.KV_API_KEY,
      'Content-type': 'application/json',
    },
    cache: 'no-store',
  }).then((res) => res.json());

export const setKey = (key, value) =>
  fetch(`https://l8.ee/xxx?key=${key}`, {
    method: 'post',
    headers: {
      'X-api-key': process.env.KV_API_KEY,
      'Content-type': 'application/json',
    },
    body: JSON.stringify(value),
    cache: 'no-store',
  });

export const getPlayer = () => {
  try {
    let token;
    if (isServer) {
      // TODO: Figure out how to render client components exactly the same on the server but without event handlers
      // const { cookies } = await import('next/headers');
      // token = cookies().get('Authorization').value.split(' ')[1];
    } else {
      token = decodeURI(
        document.cookie
          .match('(^|;)\\s*' + 'Authorization' + '\\s*=\\s*([^;]+)')
          ?.pop() || ''
      ).split(' ')[1];
    }

    return jwt.decode(token).player;
  } catch (_) {
    return null;
  }
};
