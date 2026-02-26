import { useEffect, useState } from 'react';
import { API_KEY, PLATFORMS_URL } from '../api';
import { Platform } from '../types';

const usePlatforms = () => {
  const [platforms, setPlatforms] = useState<Platform[]>([]);

  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const res = await fetch(`${PLATFORMS_URL}?key=${API_KEY}&page_size=40`);
        if (!res.ok) return;
        const data = await res.json();
        setPlatforms(data.results);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPlatforms();
  }, []);

  return { platforms };
};

export default usePlatforms;
