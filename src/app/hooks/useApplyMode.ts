import { useState, useEffect } from 'react';

// March 15, 2026 00:00 IST = March 14, 2026 18:30 UTC
const APPLY_LAUNCH = new Date('2026-03-14T18:30:00Z');

export function useApplyMode() {
  const [isApplyMode, setIsApplyMode] = useState(false);

  useEffect(() => {
    const check = () => setIsApplyMode(new Date() >= APPLY_LAUNCH);
    check();
    const interval = setInterval(check, 60000);
    return () => clearInterval(interval);
  }, []);

  return isApplyMode;
}
