import { User } from 'firebase/auth';
import { Game } from './Game';

interface SetBookmarksAction {
  type: 'set_bookmarks';
  payload: Game;
}

interface RemoveBookmarkAction {
  type: 'remove_bookmark';
  payload: Game['id'];
}

interface SetHasNotification {
  type: 'set_has_notification';
  payload: boolean;
}

interface SetAddedGameNameAction {
  type: 'set_added_games_name';
  payload: string;
}

interface SetIsUserInfoOpenAction {
  type: 'set_is_user_info_open';
  payload: boolean;
}

interface SetUserAction {
  type: 'set_user';
  payload: User | null;
}

interface SetBookmarksAllAction {
  type: 'set_bookmarks_all';
  payload: Game[];
}

export type Action =
  | SetBookmarksAction
  | RemoveBookmarkAction
  | SetHasNotification
  | SetAddedGameNameAction
  | SetIsUserInfoOpenAction
  | SetUserAction
  | SetBookmarksAllAction;

export interface GamesContextState {
  bookmarks: Game[];
  addedGameName: string;
  hasNotification: boolean;
  isUserInfoOpen: boolean;
  user: User | null;
  isAuthLoading: boolean;
}

export interface GamesContextModifier {
  handleAddBookmark: (game: Game) => Promise<void>;
  handleRemoveBookmark: (gameId: Game['id']) => Promise<void>;
  handleUserInfoOpen: (isOpen: boolean) => void;
  handleLoginWithEmail: (email: string, password: string) => Promise<void>;
  handleLoginWithGoogle: () => Promise<void>;
  handleSignupWithEmail: (email: string, password: string) => Promise<void>;
  handleLogout: () => Promise<void>;
}

export type GamesProviderContext = GamesContextState & GamesContextModifier;
