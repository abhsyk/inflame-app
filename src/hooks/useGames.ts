import { useCallback, useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { CategoryPath } from '../types';
import getGamesByCategory from '../utils/getGamesByCategory';
import reducer, { initialState } from './reducer';
import useSearch from './useSearch';

const useGames = (categoryPath?: CategoryPath) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { categoryId } = useParams<{ categoryId: CategoryPath }>();
  const path: CategoryPath = (categoryPath || categoryId)!;
  const { handleSearchGames } = useSearch();

  const handleGetGamesByCategory = useCallback(async (): Promise<void> => {
    if (path === 'search') return handleSearchGames();

    dispatch({ type: 'get_games_start' });
    try {
      dispatch({ type: 'reset_games' });
      const { results, next } = await getGamesByCategory(path);
      dispatch({
        type: 'get_games_complete',
        payload: { games: results, nextPageUrl: next },
      });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({ type: 'get_games_error', payload: error.message });
        console.log(error);
      }
    }
  }, [path, handleSearchGames]);

  const handleNextPage = useCallback(async (): Promise<void> => {
    dispatch({ type: 'get_next_page_start' });
    try {
      const res = await fetch(state.nextPageUrl!);
      const data = await res.json();
      const { results, next } = data;
      dispatch({
        type: 'get_next_page_complete',
        payload: {
          games: results,
          nextPageUrl: next,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({ type: 'get_next_page_error', payload: error.message });
        console.log(error);
      }
    }
  }, [state.nextPageUrl]);

  useEffect(() => {
    if (path) handleGetGamesByCategory();
  }, [path, handleGetGamesByCategory]);

  return {
    ...state,
    handleNextPage,
  };
};

export default useGames;
