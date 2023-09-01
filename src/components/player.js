import { useEffect, useState } from 'react';

export const usePlayer = () => {
  const [player, setPlayer] = useState(window.localStorage.getItem('player'));
  useEffect(() => {
    const onStorageChange = () => {
      setPlayer(window.localStorage.getItem('player'));
    };
    window.addEventListener('storage', onStorageChange);
    return () => {
      window.removeEventListener('storage', onStorageChange);
    };
  }, []);
  return player;
};

const Player = () => {
  const player = usePlayer();
  if (player) {
    return null;
  }
  return (
    <form
      className="flex mt-16"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const { player: formPlayer } = Object.fromEntries(formData);
        if (formPlayer) {
          window.localStorage.setItem('player', formPlayer);
          window.dispatchEvent(new Event('storage'));
        }
      }}
    >
      <label for="player" className="flex items-center mr-2 text-sm font-bold">
        Player
      </label>
      <input
        name="player"
        type="text"
        className="h-8 p-2 mr-2 rounded-md bg-slate-100 text-slate-900"
        maxLength={15}
      ></input>
      <button className="h-8 p-2 text-sm font-bold rounded-md bg-slate-100 text-slate-900">
        Save
      </button>
    </form>
  );
};

export default Player;
