import { useEffect, useState } from 'react';

const STRATAGEM_STATS_STORAGE_KEY = 'stragatems.localStats.v1';

const loadStoredStratagemStats = () => {
  if (typeof window === 'undefined') return {};

  try {
    const raw = window.localStorage.getItem(STRATAGEM_STATS_STORAGE_KEY);
    if (!raw) return {};

    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch (error) {
    console.warn('Failed to read stored stratagem stats', error);
    return {};
  }
};

const useStratagemStats = () => {
  const [stratagemStats, setStratagemStats] = useState(loadStoredStratagemStats);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      window.localStorage.setItem(
        STRATAGEM_STATS_STORAGE_KEY,
        JSON.stringify(stratagemStats)
      );
    } catch (error) {
      console.warn('Failed to persist stratagem stats', error);
    }
  }, [stratagemStats]);

  return { stratagemStats, setStratagemStats };
};

export default useStratagemStats;
