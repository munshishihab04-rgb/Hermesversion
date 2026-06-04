import React, { useEffect, useState } from 'react';

const STORAGE_KEY = 'licenvo_promo_end';
const DURATION_MS = 24 * 60 * 60 * 1000; // 24 ore

function getOrCreateEnd(): number {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    const end = parseInt(stored, 10);
    if (end > Date.now()) return end;
  }
  const newEnd = Date.now() + DURATION_MS;
  localStorage.setItem(STORAGE_KEY, String(newEnd));
  return newEnd;
}

function calcTime(end: number) {
  const diff = Math.max(0, end - Date.now());
  return {
    h: Math.floor(diff / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
  };
}

export default function CountdownTimer() {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const end = getOrCreateEnd();
    setTime(calcTime(end));
    const interval = setInterval(() => {
      const t = calcTime(end);
      setTime(t);
      if (t.h === 0 && t.m === 0 && t.s === 0) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <span className="font-mono font-bold tabular-nums">
      {pad(time.h)}:{pad(time.m)}:{pad(time.s)}
    </span>
  );
}
