import {
  ChangeEvent,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from 'react';

import getGamesBySearch from '../utils/getGamesBySearch';
import reducer, { initialState } from './reducer';
import { useNavigate, useSearchParams } from 'react-router-dom';

const useSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchWord, setSearchWord] = useState<string>('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const key = searchParams.get('key');
  console.log(key);

  const searchWordChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchWord(e.target.value);
    },
    [setSearchWord]
  );

  const clearSearchWord = useCallback(() => setSearchWord(''), []);

  const handleSearch = useCallback(async () => {
    if (key!.trim().length > 0) {
      setSearchWord(key!);

      dispatch({ type: 'get_games_start' });
      try {
        dispatch({ type: 'reset_games' });
        const { results, next } = await getGamesBySearch(searchWord);
        console.log(results);

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
    }
  }, [searchWord, key]);

  const handleSearchGames = useCallback(async (): Promise<void> => {
    navigate({
      pathname: '/search',
      search: `?key=${searchWord}`,
    });
  }, [searchWord, navigate]);

  useEffect(() => {
    if (key) handleSearch();
  }, [key, handleSearch]);

  return {
    ...state,
    searchWord,
    setSearchWord,
    searchWordChange,
    clearSearchWord,
    handleSearchGames,
  };
};

export default useSearch;
