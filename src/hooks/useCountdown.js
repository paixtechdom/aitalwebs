import { useState, useEffect } from 'react';

function pad(n) {
  return String(Math.max(0, n)).padStart(2, '0');
}

export function useCountdown(deadline) {
  const [units, setUnits] = useState({ d: '00', h: '00', m: '00', s: '00' });

  useEffect(() => {
    function tick() {
      const diff = deadline.getTime() - Date.now();
      if (diff <= 0) {
        setUnits({ d: '00', h: '00', m: '00', s: '00' });
        return;
      }
      setUnits({
        d: pad(Math.floor(diff / 86_400_000)),
        h: pad(Math.floor((diff % 86_400_000) / 3_600_000)),
        m: pad(Math.floor((diff % 3_600_000) / 60_000)),
        s: pad(Math.floor((diff % 60_000) / 1_000)),
      });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [deadline]);

  return units;
}
