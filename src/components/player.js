'use client';
import { getPlayer } from '@/utils';
import { useState } from 'react';

const Player = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const player = getPlayer();
  if (player || isSubmitted) {
    return null;
  }
  return (
    <form
      className="flex flex-col mt-16"
      onSubmit={(e) => {
        e.preventDefault();
        fetch('/api/login', {
          method: 'PUT',
          body: JSON.stringify(Object.fromEntries(new FormData(e.target))),
          cache: 'no-store',
        }).then((res) => {
          if (res.status < 400) {
            setIsSubmitted(true);
          }
        });
      }}
    >
      <label htmlFor="player" className="flex items-center text-sm font-bold">
        Player
      </label>
      <input
        name="player"
        type="text"
        className="h-8 p-2 rounded-md bg-slate-200 text-slate-900"
        maxLength={15}
      />
      <label htmlFor="email" className="flex items-center text-sm font-bold">
        Email
      </label>
      <input
        name="email"
        type="email"
        className="h-8 p-2 rounded-md bg-slate-200 text-slate-900"
      />
      <button className="h-10 p-2 mt-8 text-sm font-bold rounded-md bg-slate-200 text-slate-900">
        Save
      </button>
    </form>
  );
};

export default Player;
