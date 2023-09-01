'use client';

const SyntheticSpace = () => {
  const isMobile =
    typeof navigator !== 'undefined' &&
    /Android|iPhone/i.test(navigator.userAgent);
  if (!isMobile) {
    return null;
  }
  return (
    <button
      className="fixed bottom-0 left-0 right-0 h-16 text-lg font-bold bg-green-500"
      type="button"
      onClick={() => {
        document.dispatchEvent(
          new KeyboardEvent('keypress', { code: 'Space' })
        );
      }}
    >
      D O N E
    </button>
  );
};

export default SyntheticSpace;
