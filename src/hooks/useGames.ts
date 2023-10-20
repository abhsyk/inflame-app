import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CategoryPath, Game } from '../types';
import getGamesByCategory from '../utils/getGamesByCategory';
import useSearch from './useSearch';

const useGames = (categoryPath?: CategoryPath) => {
  const { searchWord, setSearchWord } = useSearch();
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isNextLoading, setNextIsLoading] = useState<boolean>(false);
  const { categoryId } = useParams<{ categoryId: CategoryPath }>();
  const path: CategoryPath = (categoryPath || categoryId)!;
  const searchKey = new URLSearchParams(window.location.search).get('key')!;
  const [nextPage, setNextPage] = useState<string>();

  const handleGetGamesByCategory = useCallback(async (): Promise<void> => {
    if (path === 'search') setSearchWord(searchKey);

    setIsLoading(true);
    try {
      setGames([]); // reset

      if (path !== 'search' || searchWord.trim().length > 0) {
        const { results, next } = await getGamesByCategory(path, searchWord);
        setGames(results);
        setNextPage(next);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }, [path, searchWord, setSearchWord, searchKey]);

  const handleNextPage = useCallback(async () => {
    setNextIsLoading(true);
    try {
      const res = await fetch(nextPage!);
      const data = await res.json();
      setGames((prev) => [...prev, ...data.results]);
      setNextPage(data.next);
      setNextIsLoading(false);
    } catch (error) {
      setNextIsLoading(false);
      console.log(error);
    }
  }, [nextPage]);

  useEffect(() => {
    if (path) handleGetGamesByCategory();
  }, [path, handleGetGamesByCategory]);

  return {
    games,
    isLoading,
    handleGetGamesByCategory,
    handleNextPage,
    isNextLoading,
  };
};

export default useGames;
