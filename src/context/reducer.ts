import { Action, GamesContextState } from '../types';

export const initialState: GamesContextState = {
  bookmarks: [],
  hasNotification: false,
  addedGameName: '',
  isUserInfoOpen: false,
  isLoggedIn: false,
};

const reducer = (state: GamesContextState = initialState, action: Action) => {
  switch (action.type) {
    case 'set_bookmarks': {
      const newBookmark = action.payload;
      const existingBookmark = state.bookmarks.find(
        (b) => b.id === newBookmark.id
      );
      if (existingBookmark) return state;
      return {
        ...state,
        bookmarks: [newBookmark, ...state.bookmarks],
      };
    }

    case 'remove_bookmark': {
      const removeBookmarkId = action.payload;
      const updatedBookmarks = state.bookmarks.filter(
        (b) => b.id !== removeBookmarkId
      );
      return {
        ...state,
        bookmarks: updatedBookmarks,
      };
    }
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
    case 'login':
      return { ...state, isLoggedIn: !state.isLoggedIn };
    default:
      return state;
  }
};

export default reducer;
