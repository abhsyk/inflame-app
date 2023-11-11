import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ApiResponse, CategoryPath, Game } from '../types';
import { BASE_URL } from '../api';
import getParams, { getSearchParams } from '../utils/getParams';

const useGames = (categoryPath?: CategoryPath) => {
  const navigate = useNavigate();
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isNextLoading, setIsNextLoading] = useState<boolean>(false);
  const { categoryId } = useParams<{ categoryId: CategoryPath }>();
  const path: CategoryPath = (categoryPath || categoryId)!;
  const [nextPage, setNextPage] = useState<string>();
  const [count, setCount] = useState<number>(0);

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
    const params = getParams(path);
    await fetcher<Game[]>(`${BASE_URL}?${new URLSearchParams(params)}`);
  }, [path, fetcher]);

  const handleNextPage = useCallback(async () => {
    await fetcher<Game[]>(nextPage!, true);
  }, [nextPage, fetcher]);

  const handleSearchGames = useCallback(
    async (searchWord: string) => {
      if (searchWord) {
        navigate(`/search?key=${searchWord}`);
        const params = getSearchParams(searchWord);
        await fetcher<Game[]>(`${BASE_URL}?${new URLSearchParams(params)}`);
      }
    },
    [fetcher, navigate]
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
