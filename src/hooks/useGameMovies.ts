import { useEffect, useState } from 'react';
import { Movie, ApiResponse } from '../types';
import { gameMoviesURL, API_KEY } from '../api/rawgApi';

const useGameMovies = (slug: string | undefined) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!slug) return;

    let cancelled = false;
    setIsLoading(true);

    const url = `${gameMoviesURL(slug)}?${new URLSearchParams({ key: API_KEY })}`;
    fetch(url)
      .then((res) => res.json() as Promise<ApiResponse<Movie[]>>)
      .then((data) => {
        if (!cancelled) setMovies(data.results);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { movies, isLoading };
};

export default useGameMovies;
