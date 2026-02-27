import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import useGames from './useGames';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { autoCompleteGameURL } from '../api/rawgApi';

type Suggestion = {
  name: string;
  slug: string;
};

const useSearch = () => {
  const { handleSearchGames } = useGames();
  const [searchParams] = useSearchParams();
  const [searchWord, setSearchWord] = useState<string>(searchParams.get('q') ?? '');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isSuggestLoading, setIsSuggestLoading] = useState(false);
  const navigate = useNavigate();
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  // 検索実行後の searchParams 同期時はオートコンプリートをスキップする
  const skipSuggestRef = useRef(false);

  useEffect(() => {
    skipSuggestRef.current = true;
    setSearchWord(searchParams.get('q') ?? '');
    setSuggestions([]);
  }, [searchParams]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (skipSuggestRef.current) {
      skipSuggestRef.current = false;
      return;
    }

    if (searchWord.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    let cancelled = false;
    debounceRef.current = setTimeout(() => {
      setIsSuggestLoading(true);
      fetch(autoCompleteGameURL(searchWord))
        .then((res) => res.json())
        .then((data) => {
          if (!cancelled) {
            setSuggestions(
              (data.results ?? []).map((g: Suggestion) => ({ name: g.name, slug: g.slug }))
            );
          }
        })
        .catch(() => {
          if (!cancelled) setSuggestions([]);
        })
        .finally(() => {
          if (!cancelled) setIsSuggestLoading(false);
        });
    }, 300);

    return () => {
      cancelled = true;
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchWord]);

  const searchWordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  }, []);

  const clearSearchWord = useCallback(() => {
    setSearchWord('');
    setSuggestions([]);
  }, []);

  const clearSuggestions = useCallback(() => setSuggestions([]), []);

  const searchGames = useCallback(() => {
    setSuggestions([]);
    navigate(`/search?q=${searchWord}`);
    handleSearchGames(searchWord);
  }, [searchWord, navigate, handleSearchGames]);

  const selectSuggestion = useCallback(
    (name: string) => {
      setSearchWord(name);
      setSuggestions([]);
      navigate(`/search?q=${name}`);
      handleSearchGames(name);
    },
    [navigate, handleSearchGames]
  );

  return {
    searchWord,
    setSearchWord,
    searchWordChange,
    clearSearchWord,
    searchGames,
    suggestions,
    isSuggestLoading,
    clearSuggestions,
    selectSuggestion,
  };
};

export default useSearch;
