import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import { Game, GamesProviderContext } from '../types';
import reducer, { initialState } from './reducer';

const GamesContext = createContext<Partial<GamesProviderContext>>({});

const GamesContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleLogin = useCallback(() => dispatch({ type: 'login' }), []);

  const handleAddBookmark = useCallback((game: Game) => {
    dispatch({ type: 'set_bookmarks', payload: game });
    dispatch({ type: 'set_added_games_name', payload: game.name });
    dispatch({ type: 'set_has_notification', payload: true });

    const timer = setTimeout(() => {
      dispatch({ type: 'set_has_notification', payload: false });
    }, 6500);

    return () => clearTimeout(timer);
  }, []);

  const handleRemoveBookmark = useCallback((gameId: number) => {
    dispatch({ type: 'remove_bookmark', payload: gameId });
  }, []);

  const handleUserInfoOpen = useCallback((isOpen: boolean) => {
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

export const useGameProvider = () => {
  return useContext(GamesContext) as GamesProviderContext;
};
