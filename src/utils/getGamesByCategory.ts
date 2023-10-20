import { ApiResponse, CategoryPath } from '../types';
import { API_KEY, currentDate, lastYear, nextYear } from '../api';
import { server } from './server';

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

const searchGamesParams = (searchWord?: string) => {
  return {
    search: searchWord,
    ordering: 'ratings_count',
    ...params,
  };
};

const getParams = (categoryPath: CategoryPath, searchWord?: string) => {
  switch (categoryPath) {
    case 'popular-games':
      return popularGamesParams;
    case 'new-games':
      return newGamesParams;
    case 'upcoming-games':
      return upcomingGamesParams;

    default:
      return searchGamesParams(searchWord);
  }
};

const getGamesByCategory = async (
  categoryPath: CategoryPath,
  searchWord?: string
): Promise<ApiResponse> => {
  const params = getParams(categoryPath, searchWord);
  const { data } = await server<ApiResponse>({ params });

  return data;
};

export default getGamesByCategory;
