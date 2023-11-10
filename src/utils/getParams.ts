import { API_KEY, currentDate, lastYear, nextYear } from '../api';
import { CategoryPath } from '../types';

const params = { page_size: String(9), key: API_KEY };
const popularGamesParams = {
  dates: `${lastYear},${currentDate}`,
  ordering: '-rating',
  ...params,
};

const newGamesParams = {
  dates: `${currentDate},${nextYear}`,
  ordering: 'released',
  ...params,
};

const upcomingGamesParams = {
  dates: `${currentDate},${nextYear}`,
  ordering: '-added',
  ...params,
};

export const getSearchParams = (searchWord: string) => {
  return {
    search: searchWord,
    ordering: 'ratings_count',
    ...params,
  };
};

const getParams = (categoryPath: CategoryPath) => {
  switch (categoryPath) {
    case 'popular-games':
      return popularGamesParams;
    case 'new-games':
      return newGamesParams;
    case 'upcoming-games':
      return upcomingGamesParams;
    default:
      return;
  }
};

export default getParams;
