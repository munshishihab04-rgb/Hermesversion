import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  /** Durata iniziale in secondi (default: 2 ore) */
  initialSeconds?: number;
  label?: string;
}

export default function CountdownTimer({ initialSeconds = 7200, label = "Prezzo speciale valido per" }: CountdownTimerProps) {
  const [seconds, setSeconds] = useState(() => {
    // Persistiamo il timer nel sessionStorage così non si resetta ad ogni navigazione
    const saved = sessionStorage.getItem('licenvo_countdown');
    if (saved) {
      const { end } = JSON.parse(saved);
      const remaining = Math.max(0, Math.floor((end - Date.now()) / 1000));
      if (remaining > 0) return remaining;
    }
    const end = Date.now() + initialSeconds * 1000;
    sessionStorage.setItem('licenvo_countdown', JSON.stringify({ end }));
    return initialSeconds;
  });

  useEffect(() => {
    if (seconds <= 0) return;
    const interval = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(interval);
          // Resetta per la prossima sessione
          sessionStorage.removeItem('licenvo_countdown');
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const pad = (n: number) => String(n).padStart(2, '0');

  if (seconds <= 0) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div className="flex items-center gap-1">
        <span className="countdown-digit">{pad(h)}</span>
        <span className="text-sm font-bold text-foreground">:</span>
        <span className="countdown-digit">{pad(m)}</span>
        <span className="text-sm font-bold text-foreground">:</span>
        <span className="countdown-digit">{pad(s)}</span>
      </div>
    </div>
  );
}
