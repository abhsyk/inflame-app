import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CategoryPath, Game } from '../types';
import getGamesByCategory from '../utils/getGamesByCategory';
import useSearch from './useSearch';

const useGames = (categoryPath?: CategoryPath) => {
  const { searchWord, setSearchWord } = useSearch();
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { categoryId } = useParams<{ categoryId: CategoryPath }>();
  const path: CategoryPath = (categoryPath || categoryId)!;
  const searchKey = new URLSearchParams(window.location.search).get('key')!;

  const handleGetGamesByCategory = useCallback(async () => {
    if (path === 'search') setSearchWord(searchKey);

    setIsLoading(true);
    try {
      setGames([]);

      if (path !== 'search' || searchWord.trim().length > 0) {
        const games = await getGamesByCategory(path, searchWord);
        setGames(games);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }, [path, searchWord, setSearchWord, searchKey]);

  useEffect(() => {
    if (path) handleGetGamesByCategory();
  }, [path, handleGetGamesByCategory]);

  return { games, isLoading, handleGetGamesByCategory };
};

export default useGames;
