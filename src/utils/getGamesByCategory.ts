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

const getParams = (categoryPath: CategoryPath) => {
  switch (categoryPath) {
    case 'popular-games':
      return popularGamesParams;
    case 'new-games':
      return newGamesParams;
    case 'upcoming-games':
      return upcomingGamesParams;
  }
};

const getGamesByCategory = async (
  categoryPath: CategoryPath
): Promise<ApiResponse<any>> => {
  const params = getParams(categoryPath);
  const { data } = await server<ApiResponse<any>>({ params });

  return data;
};

export default getGamesByCategory;
