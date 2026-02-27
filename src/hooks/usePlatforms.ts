import { useEffect, useState } from 'react';
import { API_KEY, PLATFORMS_URL } from '../api';
import { Platform } from '../types';

const CACHE_KEY = 'sidebar:platforms';

const readCache = (): Platform[] => {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
};

const usePlatforms = () => {
  const [platforms, setPlatforms] = useState<Platform[]>(readCache);

  useEffect(() => {
    if (platforms.length > 0) return;
    const fetchPlatforms = async () => {
      try {
        const res = await fetch(`${PLATFORMS_URL}?key=${API_KEY}&page_size=40`);
        if (!res.ok) return;
        const data = await res.json();
        setPlatforms(data.results);
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(data.results));
      } catch (err) {
        console.error(err);
      }
    };
    fetchPlatforms();
  }, [platforms.length]);

  return { platforms };
};

export default usePlatforms;
