import { Game } from './Game';

interface SetBookmarksAction {
  type: 'set_bookmarks';
  payload: Game;
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

export type Action =
  | SetBookmarksAction
  | SetHasNotification
  | SetAddedGameNameAction
  | SetIsUserInfoOpenAction;

export interface GamesContextState {
  bookmarks: Game[];
  addedGameName: string;
  hasNotification: boolean;
  isUserInfoOpen: boolean;
}

export interface GamesContextModifier {
  handleAddBookmark: (game: Game) => void;
  handleUserInfoOpen: (isOpen: boolean) => void;
}

export type GamesProviderContext = GamesContextState & GamesContextModifier;
