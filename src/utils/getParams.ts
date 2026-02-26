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

const getParams = (
  categoryPath: CategoryPath,
  ordering?: string,
  genres?: string,
  platforms?: string
) => {
  let base: Record<string, string> | undefined;
  switch (categoryPath) {
    case 'popular-games':
      base = popularGamesParams;
      break;
    case 'new-games':
      base = newGamesParams;
      break;
    case 'upcoming-games':
      base = upcomingGamesParams;
      break;
    default:
      return;
  }
  return {
    ...base,
    ...(ordering ? { ordering } : {}),
    ...(genres ? { genres } : {}),
    ...(platforms ? { platforms } : {}),
  };
};

export default getParams;
