import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import {
  loginWithEmail,
  signupWithEmail,
  loginWithGoogle,
  logout,
} from '../services/authService';
import {
  addBookmarkToFirestore,
  removeBookmarkFromFirestore,
  fetchBookmarksFromFirestore,
} from '../services/bookmarkService';
import { Game, GamesProviderContext } from '../types';
import reducer, { initialState } from './reducer';

export const GamesContext = createContext<GamesProviderContext | null>(null);

const GamesContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      dispatch({ type: 'set_user', payload: firebaseUser });
      if (firebaseUser) {
        const bookmarks = await fetchBookmarksFromFirestore(firebaseUser.uid);
        dispatch({ type: 'set_bookmarks_all', payload: bookmarks });
      } else {
        dispatch({ type: 'set_bookmarks_all', payload: [] });
      }
    });
    return unsubscribe;
  }, []);

  const handleLoginWithEmail = useCallback(
    async (email: string, password: string): Promise<void> => {
      await loginWithEmail(email, password);
    },
    []
  );

  const handleLoginWithGoogle = useCallback(async (): Promise<void> => {
    await loginWithGoogle();
  }, []);

  const handleSignupWithEmail = useCallback(
    async (email: string, password: string): Promise<void> => {
      await signupWithEmail(email, password);
    },
    []
  );

  const handleLogout = useCallback(async (): Promise<void> => {
    await logout();
  }, []);

  const handleAddBookmark = useCallback(
    async (game: Game): Promise<void> => {
      if (!state.user) return;
      dispatch({ type: 'set_bookmarks', payload: game });
      dispatch({ type: 'set_added_games_name', payload: game.name });
      dispatch({ type: 'set_has_notification', payload: true });

      const timer = setTimeout((): void => {
        dispatch({ type: 'set_has_notification', payload: false });
      }, 2500);

      try {
        await addBookmarkToFirestore(state.user.uid, game);
      } catch {
        dispatch({ type: 'remove_bookmark', payload: game.id });
        clearTimeout(timer);
        dispatch({ type: 'set_has_notification', payload: false });
      }
    },
    [state.user]
  );

  const handleRemoveBookmark = useCallback(
    async (gameId: number): Promise<void> => {
      if (!state.user) return;
      dispatch({ type: 'remove_bookmark', payload: gameId });
      try {
        await removeBookmarkFromFirestore(state.user.uid, gameId);
      } catch {
        const bookmarks = await fetchBookmarksFromFirestore(state.user.uid);
        dispatch({ type: 'set_bookmarks_all', payload: bookmarks });
      }
    },
    [state.user]
  );

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
      handleLoginWithEmail,
      handleLoginWithGoogle,
      handleSignupWithEmail,
      handleLogout,
    };
  }, [
    state,
    handleAddBookmark,
    handleRemoveBookmark,
    handleUserInfoOpen,
    handleLoginWithEmail,
    handleLoginWithGoogle,
    handleSignupWithEmail,
    handleLogout,
  ]);

  return (
    <GamesContext.Provider value={config}>{children}</GamesContext.Provider>
  );
};

export default GamesContextProvider;
