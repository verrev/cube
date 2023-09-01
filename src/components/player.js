import { useEffect, useState } from 'react';

export const usePlayer = () => {
  const [player, setPlayer] = useState(
    typeof window !== 'undefined' && window.localStorage.getItem('player')
  );
  useEffect(() => {
    const onStorageChange = () => {
      setPlayer(
        typeof window !== 'undefined' && window.localStorage.getItem('player')
      );
    };
    typeof window !== 'undefined' &&
      window.addEventListener('storage', onStorageChange);
    return () => {
      typeof window !== 'undefined' &&
        window.removeEventListener('storage', onStorageChange);
    };
  }, []);
  return {
    player,
    setPlayer: (formPlayer) => {
      typeof window !== 'undefined' &&
        window.localStorage.setItem('player', formPlayer);
      typeof window !== 'undefined' &&
        window.dispatchEvent(new Event('storage'));
    },
  };
};

const Player = () => {
  const { player, setPlayer } = usePlayer();
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
          setPlayer(formPlayer);
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
