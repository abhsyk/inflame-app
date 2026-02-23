import { Action, GamesContextState } from '../types';

export const initialState: GamesContextState = {
  bookmarks: [],
  hasNotification: false,
  addedGameName: '',
  isUserInfoOpen: false,
  user: null,
  isAuthLoading: true,
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
        hasNotification: action.payload,
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
    case 'set_user':
      return { ...state, user: action.payload, isAuthLoading: false };
    case 'set_bookmarks_all':
      return { ...state, bookmarks: action.payload };
    default:
      return state;
  }
};

export default reducer;
