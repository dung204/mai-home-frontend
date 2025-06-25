'use client';

type Mode = 'fixed' | 'range';

export function ModeSelector({ mode, setMode }: { mode: Mode; setMode: (mode: Mode) => void }) {
  return (
    <div className="flex">
      <button
        type="button"
        onClick={() => setMode('fixed')}
        className={`cursor-pointer rounded-l-lg border border-r-0 p-1.5 text-sm transition-all select-none ${
          mode === 'fixed' ? 'bg-primary text-primary-foreground font-medium' : ''
        }`}
      >
        Cố định
      </button>
      <button
        type="button"
        onClick={() => setMode('range')}
        className={`cursor-pointer rounded-r-lg border p-1.5 text-sm select-none ${
          mode === 'range' ? 'bg-primary text-primary-foreground font-medium' : ''
        }`}
      >
        Khoảng
      </button>
    </div>
  );
}
