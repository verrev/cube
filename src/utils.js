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
  }).then((res) => res.json());

export const setKey = (key, value) =>
  fetch(`https://l8.ee/xxx?key=${key}`, {
    method: 'post',
    headers: {
      'X-api-key': process.env.KV_API_KEY,
      'Content-type': 'application/json',
    },
    body: JSON.stringify(value),
  });
