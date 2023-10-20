import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Game } from '../types';

interface GamesProviderContext {
  bookmarks: Game[];
  addedGameName: string;
  hasNotification: boolean;
  handleAddBookmark: (game: Game) => void;
}

const GamesContext = createContext<Partial<GamesProviderContext>>({});

export const GamesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<Game[]>([]);
  const [hasNotification, setHasNotification] = useState<boolean>(false);
  const [addedGameName, setAddedGameName] = useState<string>('');

  const handleAddBookmark = useCallback((game: Game) => {
    setBookmarks((prev) => [game, ...prev]);
    setAddedGameName(game.name);
    setHasNotification(true);
    const timer = setTimeout(() => {
      setHasNotification(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const config = useMemo(() => {
    return {
      bookmarks,
      addedGameName,
      hasNotification,
      handleAddBookmark,
    };
  }, [bookmarks, hasNotification]);

  return (
    <GamesContext.Provider value={config}>{children}</GamesContext.Provider>
  );
};

export const useGameProvider = () => {
  return useContext(GamesContext) as GamesProviderContext;
};
