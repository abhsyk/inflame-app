import { useEffect, useState } from 'react';
import { API_KEY, GENRES_URL } from '../api';
import { Genre } from '../types';

const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(`${GENRES_URL}?key=${API_KEY}&page_size=40`);
        if (!res.ok) return;
        const data = await res.json();
        setGenres(data.results);
      } catch (err) {
        console.error(err);
      }
    };
    fetchGenres();
  }, []);

  return { genres };
};

export default useGenres;
