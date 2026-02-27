import { useEffect, useState } from 'react';
import { API_KEY, GENRES_URL } from '../api';
import { Genre } from '../types';

const CACHE_KEY = 'sidebar:genres';

const readCache = (): Genre[] => {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
};

const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>(readCache);

  useEffect(() => {
    if (genres.length > 0) return;
    const fetchGenres = async () => {
      try {
        const res = await fetch(`${GENRES_URL}?key=${API_KEY}&page_size=40`);
        if (!res.ok) return;
        const data = await res.json();
        setGenres(data.results);
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(data.results));
      } catch (err) {
        console.error(err);
      }
    };
    fetchGenres();
  }, [genres.length]);

  return { genres };
};

export default useGenres;
