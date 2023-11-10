import { useCallback, useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ApiResponse, CategoryPath, Game } from '../types';
import { BASE_URL } from '../api';
import getParams, { getSearchParams } from '../utils/getParams';

interface State {
  popular: Game[];
  new: Game[];
  upcoming: Game[];
  search: Game[];
  isLoading: boolean;
  isNextLoading: boolean;
  nextPage: string | null;
  count: number;
}

const initialState: State = {
  popular: [],
  new: [],
  upcoming: [],
  search: [],
  isLoading: false,
  isNextLoading: false,
  nextPage: null,
  count: 0,
};

type Actions =
  | {
      type:
        | 'set_popular'
        | 'set_new'
        | 'set_upcoming'
        | 'set_search'
        | 'next_popular'
        | 'next_new'
        | 'next_upcoming'
        | 'next_search';
      payload: Game[];
    }
  | { type: 'fetch_start' | 'next_start' };

const reducer = (state: State = initialState, action: Actions) => {
  switch (action.type) {
    case 'set_popular':
      return { ...state, popular: action.payload, isLoading: false };
    case 'set_new':
      return { ...state, new: action.payload, isLoading: false };
    case 'set_upcoming':
      return { ...state, upcoming: action.payload, isLoading: false };
    case 'set_search':
      return { ...state, search: action.payload, isLoading: false };
    case 'next_popular':
      return {
        ...state,
        popular: [...state.popular, ...action.payload],
        isNextLoading: false,
      };
    case 'next_new':
      return {
        ...state,
        new: [...state.new, ...action.payload],
        isNextLoading: false,
      };
    case 'next_upcoming':
      return {
        ...state,
        upcoming: [...state.upcoming, ...action.payload],
        isNextLoading: false,
      };
    case 'next_search':
      return {
        ...state,
        search: [...state.search, ...action.payload],
        isNextLoading: false,
      };
    case 'fetch_start':
      return { ...state, isLoading: true };
    case 'next_start':
      return { ...state, isNextLoading: true };
    default:
      return state;
  }
};

const useGames = (categoryPath?: CategoryPath) => {
  const navigate = useNavigate();
  // const [games, setGames] = useState<Game[]>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [isNextLoading, setIsNextLoading] = useState<boolean>(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { categoryId } = useParams<{ categoryId: CategoryPath }>();
  const path: CategoryPath = (categoryPath || categoryId)!;
  const [nextPage, setNextPage] = useState<string>();
  const [count, setCount] = useState<number>(0);

  console.log(path);

  const handleSetGames = useCallback(
    (data: Game[], isNext: boolean) => {
      switch (path) {
        case 'popular-games':
          dispatch({
            type: isNext ? 'next_popular' : 'set_popular',
            payload: data,
          });
          break;
        case 'new-games':
          dispatch({ type: isNext ? 'next_new' : 'set_new', payload: data });
          break;
        case 'upcoming-games':
          dispatch({
            type: isNext ? 'next_upcoming' : 'set_upcoming',
            payload: data,
          });
          break;
        case 'search':
          dispatch({
            type: isNext ? 'next_search' : 'set_search',
            payload: data,
          });
          break;
        default:
          break;
      }
    },
    [path]
  );

  const fetcher = useCallback(
    async <T>(
      url: string,
      isNext: boolean = false
    ): Promise<ApiResponse<T>> => {
      !isNext
        ? dispatch({ type: 'fetch_start' })
        : dispatch({ type: 'next_start' });
      try {
        // !isNext && setGames([]); // reset
        const res = await fetch(url);
        if (!res.ok)
          throw new Error('Something went wrong with fetching games.');
        const data = await res.json();
        console.log(data.results);

        // setGames(isNext ? (prev) => [...prev, ...data.results] : data.results);
        handleSetGames(data.results, isNext);
        setNextPage(data.next);
        setCount(data.count);
        return data;
      } catch (err) {
        if (err instanceof Error) {
          console.error(err);
        }
        return Promise.reject(err);
      } finally {
        // !isNext ? setIsLoading(false) : setIsNextLoading(false);
      }
    },
    [handleSetGames]
  );

  const handleGetGamesByCategory = useCallback(async (): Promise<void> => {
    if (
      path === 'search' ||
      (path === 'popular-games' && state.popular.length) ||
      (path === 'new-games' && state.new.length) ||
      (path === 'upcoming-games' && state.upcoming.length)
    )
      return;
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
    ...state,
    handleGetGamesByCategory,
    handleNextPage,
    handleSearchGames,
    nextPage,
    count,
    path,
  };
};

export default useGames;
