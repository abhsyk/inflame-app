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

interface LoginAction {
  type: 'login';
}

export type Action =
  | SetBookmarksAction
  | RemoveBookmarkAction
  | SetHasNotification
  | SetAddedGameNameAction
  | SetIsUserInfoOpenAction
  | LoginAction;

export interface GamesContextState {
  bookmarks: Game[];
  addedGameName: string;
  hasNotification: boolean;
  isUserInfoOpen: boolean;
  isLoggedIn: boolean;
}

export interface GamesContextModifier {
  handleAddBookmark: (game: Game) => void;
  handleRemoveBookmark: (gameId: Game['id']) => void;
  handleUserInfoOpen: (isOpen: boolean) => void;
  handleLogin: () => void;
}

export type GamesProviderContext = GamesContextState & GamesContextModifier;
