import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useMemo,
  useReducer,
} from 'react';
import { Game, GamesProviderContext } from '../types';
import reducer, { initialState } from './reducer';

export const GamesContext = createContext<GamesProviderContext | null>(null);

const GamesContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleLogin = useCallback((): void => dispatch({ type: 'login' }), []);

  const handleAddBookmark = useCallback((game: Game): (() => void) => {
    dispatch({ type: 'set_bookmarks', payload: game });
    dispatch({ type: 'set_added_games_name', payload: game.name });
    dispatch({ type: 'set_has_notification', payload: true });

    const timer = setTimeout((): void => {
      dispatch({ type: 'set_has_notification', payload: false });
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleRemoveBookmark = useCallback((gameId: number): void => {
    dispatch({ type: 'remove_bookmark', payload: gameId });
  }, []);

  const handleUserInfoOpen = useCallback((isOpen: boolean): void => {
    dispatch({
      type: 'set_is_user_info_open',
      payload: isOpen,
    });
  }, []);

  const config = useMemo(() => {
    return {
      ...state,
      handleAddBookmark,
      handleRemoveBookmark,
      handleUserInfoOpen,
      handleLogin,
    };
  }, [
    state,
    handleAddBookmark,
    handleUserInfoOpen,
    handleLogin,
    handleRemoveBookmark,
  ]);

  return (
    <GamesContext.Provider value={config}>{children}</GamesContext.Provider>
  );
};

export default GamesContextProvider;
