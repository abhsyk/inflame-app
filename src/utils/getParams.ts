import { API_KEY, currentDate, lastThirtyDays, lastThreeMonths, lastYear, nextYear } from '../api';
import { CategoryPath } from '../types';

const params = { page_size: String(12), key: API_KEY };
const trendingGamesParams = {
  dates: `${lastThirtyDays},${currentDate}`,
  ordering: '-added',
  ...params,
};
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
  platforms?: string,
  page?: number
) => {
  return {
    search: searchWord,
    ordering,
    ...(genres ? { genres } : {}),
    ...(platforms ? { platforms } : {}),
    ...(page && page > 1 ? { page: String(page) } : {}),
    ...params,
  };
};

const getParams = (
  categoryPath: CategoryPath,
  ordering?: string,
  genres?: string,
  platforms?: string,
  page?: number
) => {
  let base: Record<string, string> | undefined;
  switch (categoryPath) {
    case 'trending-games':
      base = trendingGamesParams;
      break;
    case 'top-rated':
      base = popularGamesParams;
      break;
    case 'new-releases':
      base = newGamesParams;
      break;
    case 'coming-soon':
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
    ...(page && page > 1 ? { page: String(page) } : {}),
  };
};

export default getParams;
