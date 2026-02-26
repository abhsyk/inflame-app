import { useEffect, useState } from 'react';
import { Game, ApiResponse } from '../types';
import { gameSeriesURL, API_KEY } from '../api/rawgApi';

const useGameSeries = (slug: string | undefined) => {
  const [series, setSeries] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!slug) return;

    let cancelled = false;
    setIsLoading(true);

    const url = `${gameSeriesURL(slug)}?${new URLSearchParams({ key: API_KEY, page_size: '10' })}`;
    fetch(url)
      .then((res) => res.json() as Promise<ApiResponse<Game[]>>)
      .then((data) => {
        if (!cancelled) setSeries(data.results);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { series, isLoading };
};

export default useGameSeries;
