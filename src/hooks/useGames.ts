import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ApiResponse, CategoryPath, Game } from '../types';
import { BASE_URL } from '../api';
import getParams, { getSearchParams } from '../utils/getParams';

type CategoryFilters = { ordering?: string; genres?: string; platforms?: string; page?: number };

type CacheData = { games: Game[]; nextPage: string | null; count: number };

const getSessionCache = (key: string): CacheData | null => {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
};

const useGames = (categoryPath?: CategoryPath, filters?: CategoryFilters) => {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isNextLoading, setIsNextLoading] = useState<boolean>(false);
  const { categoryId } = useParams<{ categoryId: CategoryPath }>();
  const path: CategoryPath = (categoryPath || categoryId)!;
  const [nextPage, setNextPage] = useState<string>();
  const [count, setCount] = useState<number>(0);
  const { ordering: filterOrdering, genres: filterGenres, platforms: filterPlatforms, page: filterPage } = filters || {};
  const initialPageRef = useRef(filterPage || 1);
  const cacheKeyRef = useRef('');

  // フィルター変更時はページを1にリセット、それ以外はfilterPageを反映
  useEffect(() => {
    initialPageRef.current = filterPage || 1;
  }, [filterOrdering, filterGenres, filterPlatforms, filterPage]);

  // games/nextPage/count が変わるたびにキャッシュを更新
  useEffect(() => {
    if (games.length > 0 && cacheKeyRef.current) {
      try {
        sessionStorage.setItem(cacheKeyRef.current, JSON.stringify({ games, nextPage: nextPage ?? null, count }));
      } catch { /* ignore */ }
    }
  }, [games, nextPage, count]);

  const fetcher = useCallback(
    async <T>(
      url: string,
      isNext: boolean = false
    ): Promise<ApiResponse<T>> => {
      !isNext ? setIsLoading(true) : setIsNextLoading(true);
      try {
        !isNext && setGames([]); // reset
        const res = await fetch(url);
        if (!res.ok)
          throw new Error('Something went wrong with fetching games.');
        const data = await res.json();
        setGames(isNext ? (prev) => [...prev, ...data.results] : data.results);
        setNextPage(data.next);
        setCount(data.count);
        return data;
      } catch (err) {
        if (err instanceof Error) {
          console.error(err);
        }
        return Promise.reject(err);
      } finally {
        !isNext ? setIsLoading(false) : setIsNextLoading(false);
      }
    },
    []
  );

  const handleGetGamesByCategory = useCallback(async (): Promise<void> => {
    if (path === 'search') return;
    const totalPages = initialPageRef.current;
    const key = `games:${path}:${filterOrdering || ''}:${filterGenres || ''}:${filterPlatforms || ''}:${totalPages}`;
    cacheKeyRef.current = key;
    const cached = getSessionCache(key);
    if (cached) {
      setGames(cached.games);
      setNextPage(cached.nextPage ?? undefined);
      setCount(cached.count);
      return;
    }
    for (let p = 1; p <= totalPages; p++) {
      const params = getParams(path, filterOrdering, filterGenres, filterPlatforms, p);
      await fetcher<Game[]>(`${BASE_URL}?${new URLSearchParams(params)}`, p > 1);
    }
  }, [path, fetcher, filterOrdering, filterGenres, filterPlatforms]);

  const handleNextPage = useCallback(async () => {
    initialPageRef.current += 1;
    cacheKeyRef.current = `games:${path}:${filterOrdering || ''}:${filterGenres || ''}:${filterPlatforms || ''}:${initialPageRef.current}`;
    await fetcher<Game[]>(nextPage!, true);
  }, [nextPage, fetcher, path, filterOrdering, filterGenres, filterPlatforms]);

  const handleSearchGames = useCallback(
    async (searchWord: string, ordering = '-rating', genres?: string, platforms?: string, totalPages = 1) => {
      if (searchWord) {
        const key = `games:search:${searchWord}:${ordering || ''}:${genres || ''}:${platforms || ''}`;
        cacheKeyRef.current = key;
        const cached = getSessionCache(key);
        if (cached) {
          setGames(cached.games);
          setNextPage(cached.nextPage ?? undefined);
          setCount(cached.count);
          return;
        }
        for (let p = 1; p <= totalPages; p++) {
          const params = getSearchParams(searchWord, ordering, genres, platforms, p);
          await fetcher<Game[]>(`${BASE_URL}?${new URLSearchParams(params)}`, p > 1);
        }
      }
    },
    [fetcher]
  );

  useEffect(() => {
    if (path) handleGetGamesByCategory();
  }, [path, handleGetGamesByCategory]);

  return {
    games,
    isLoading,
    handleGetGamesByCategory,
    handleNextPage,
    isNextLoading,
    handleSearchGames,
    nextPage,
    count,
  };
};

export default useGames;
