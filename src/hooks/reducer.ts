import { Game } from '../types';

type Actions =
  | { type: 'get_games_start' | 'reset_games' | 'get_next_page_start' }
  | {
      type: 'get_games_complete' | 'get_next_page_complete';
      payload: { games: Game[]; nextPageUrl: string };
    }
  | { type: 'get_games_error' | 'get_next_page_error'; payload: string };

interface State {
  games: Game[];
  isLoading: boolean;
  nextPageUrl: string | null;
  isNextPageLoading: boolean;
  errorMsg: string | null;
}

export const initialState: State = {
  games: [],
  isLoading: false,
  nextPageUrl: null,
  isNextPageLoading: false,
  errorMsg: null,
};

const reducer = (state: State = initialState, action: Actions) => {
  switch (action.type) {
    case 'get_games_start':
      return { ...state, isLoading: true };
    case 'get_games_complete': {
      const { games, nextPageUrl } = action.payload;
      console.log(games);

      return {
        ...state,
        games,
        nextPageUrl,
        isLoading: false,
      };
    }
    case 'get_next_page_start':
      return { ...state, isNextPageLoading: true };
    case 'get_next_page_complete': {
      const { games, nextPageUrl } = action.payload;
      return {
        ...state,
        games: [...state.games, ...games],
        nextPageUrl,
        isNextPageLoading: false,
      };
    }
    case 'reset_games':
      return { ...state, games: [] };
    case 'get_games_error':
      return { ...state, isLoading: false, errorMsg: action.payload };
    case 'get_next_page_error':
      return { ...state, isNextPageLoading: false, errorMsg: action.payload };
    default:
      return state;
  }
};

export default reducer;
