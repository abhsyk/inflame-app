import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CategoryPath, Game } from '../types';
import getGamesByCategory from '../utils/getGamesByCategory';
import { getCategoryName } from '../utils/getCategoryName';

const useGames = (categoryPath?: CategoryPath) => {
  const [games, setGames] = useState<Game[]>([]);
  const [categoryName, setCategoryName] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { categoryId } = useParams<{ categoryId: CategoryPath }>();
  const path: CategoryPath = (categoryPath || categoryId)!;

  const handleGetGamesByCategory = useCallback(async () => {
    setIsLoading(true);
    try {
      setGames([]);
      const games = await getGamesByCategory(path);
      setGames(games);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }, [path]);

  useEffect(() => {
    if (path) {
      setCategoryName(getCategoryName(path)!);
      handleGetGamesByCategory();
    }
  }, [path, handleGetGamesByCategory]);

  return { games, categoryName, isLoading };
};

export default useGames;
