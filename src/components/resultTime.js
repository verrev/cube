'use client';
import { usePlayer } from '@/components/player';

const ResultTime = ({ result }) => {
  const { player } = usePlayer();
  return (
    <div className="text-right">
      {result.time}
      {player === 'rahamees' && (
        <button
          type="button"
          onClick={() => {
            fetch('/api', {
              method: 'DELETE',
              body: JSON.stringify({
                player: result.player,
                resultId: result.id,
              }),
            });
          }}
          className="w-4 h-4 ml-2 align-middle cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="var(--color-primary)"
          >
            <g data-name="Layer 2">
              <g data-name="trash-2">
                <path d="M21 6h-5V4.33A2.42 2.42 0 0 0 13.5 2h-3A2.42 2.42 0 0 0 8 4.33V6H3a1 1 0 0 0 0 2h1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8h1a1 1 0 0 0 0-2zM10 4.33c0-.16.21-.33.5-.33h3c.29 0 .5.17.5.33V6h-4zM18 19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V8h12z" />
                <path d="M9 17a1 1 0 0 0 1-1v-4a1 1 0 0 0-2 0v4a1 1 0 0 0 1 1zM15 17a1 1 0 0 0 1-1v-4a1 1 0 0 0-2 0v4a1 1 0 0 0 1 1z" />
              </g>
            </g>
          </svg>
        </button>
      )}
    </div>
  );
};

export default ResultTime;
