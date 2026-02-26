import { API_KEY, currentDate, lastThreeMonths, lastYear, nextYear } from '../api';
import { CategoryPath } from '../types';

const params = { page_size: String(9), key: API_KEY };
const popularGamesParams = {
  dates: `${lastYear},${currentDate}`,
  ordering: '-rating',
  ...params,
};

const newGamesParams = {
  dates: `${lastThreeMonths},${currentDate}`,
  ordering: '-released',
  ...params,
};

const upcomingGamesParams = {
  dates: `${currentDate},${nextYear}`,
  ordering: '-added',
  ...params,
};

export const getSearchParams = (
  searchWord: string,
  ordering = '-rating',
  genres?: string,
  platforms?: string
) => {
  return {
    search: searchWord,
    ordering,
    ...(genres ? { genres } : {}),
    ...(platforms ? { platforms } : {}),
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
