import { ChangeEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useSearch = () => {
  const [searchWord, setSearchWord] = useState<string>('');
  const navigate = useNavigate();

  const searchWordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  }, []);

  const clearSearchWord = useCallback(() => setSearchWord(''), []);

  const searchGames = useCallback(() => {
    navigate(`/search?key=${searchWord}`);
  }, [searchWord, navigate]);

  return {
    searchWord,
    setSearchWord,
    searchWordChange,
    clearSearchWord,
    searchGames,
  };
};

export default useSearch;
