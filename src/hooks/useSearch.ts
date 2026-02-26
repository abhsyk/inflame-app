import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import useGames from './useGames';
import { useNavigate, useSearchParams } from 'react-router-dom';

const useSearch = () => {
  const { handleSearchGames } = useGames();
  const [searchParams] = useSearchParams();
  const [searchWord, setSearchWord] = useState<string>(searchParams.get('q') ?? '');
  const navigate = useNavigate();

  useEffect(() => {
    setSearchWord(searchParams.get('q') ?? '');
  }, [searchParams]);

  const searchWordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  }, []);

  const clearSearchWord = useCallback(() => setSearchWord(''), []);

  const searchGames = useCallback(() => {
    navigate(`/search?q=${searchWord}`);
    handleSearchGames(searchWord);
  }, [searchWord, navigate, handleSearchGames]);

  return {
    searchWord,
    setSearchWord,
    searchWordChange,
    clearSearchWord,
    searchGames,
  };
};

export default useSearch;
