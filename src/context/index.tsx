import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import {
  Game,
  Action,
  GamesProviderContext,
  GamesContextState,
} from '../types';

const GamesContext = createContext<Partial<GamesProviderContext>>({});

const initialState: GamesContextState = {
  bookmarks: [],
  hasNotification: false,
  addedGameName: '',
  isUserInfoOpen: false,
};

const reducer = (state: GamesContextState, action: Action) => {
  switch (action.type) {
    case 'set_bookmarks':
      return {
        ...state,
        bookmarks: [action.payload, ...state.bookmarks],
      };
    case 'set_has_notification':
      return {
        ...state,
        hasNotification: !state.hasNotification,
      };
    case 'set_added_games_name':
      return {
        ...state,
        addedGameName: action.payload,
      };
    case 'set_is_user_info_open':
      return {
        ...state,
        isUserInfoOpen: action.payload,
      };
    default:
      return state;
  }
};

export const GamesContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleAddBookmark = useCallback((game: Game) => {
    dispatch({ type: 'set_bookmarks', payload: game });
    dispatch({ type: 'set_added_games_name', payload: game.name });
    dispatch({ type: 'set_has_notification', payload: true });
    const timer = setTimeout(() => {
      dispatch({ type: 'set_has_notification', payload: false });
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleUserInfoOpen = useCallback(
    (isOpen: boolean) => {
      const { isUserInfoOpen } = state;
      console.log(isUserInfoOpen);

      dispatch({
        type: 'set_is_user_info_open',
        payload: isOpen,
      });
    },
    [state.isUserInfoOpen]
  );

  const config = useMemo(() => {
    return {
      ...state,
      handleAddBookmark,
      handleUserInfoOpen,
    };
  }, [state]);

  return (
    <GamesContext.Provider value={config}>{children}</GamesContext.Provider>
  );
};

export const useGameProvider = () => {
  return useContext(GamesContext) as GamesProviderContext;
};
