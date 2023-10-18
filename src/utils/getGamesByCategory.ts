import axios from 'axios';
import { CategoryPath, Game } from '../types';
import { BASE_URL, currentDate, lastYear, nextYear } from '../api';

const popularGamesParams = {
  dates: `${lastYear},${currentDate}`,
  ordering: '-rating',
  page_size: 9,
};

const newGamesParams = {
  dates: `${currentDate},${nextYear}`,
  ordering: 'released',
  page_size: 9,
};

const upcomingGamesParams = {
  dates: `${currentDate},${nextYear}`,
  ordering: '-added',
  page_size: 9,
};

const searchGamesParams = (searchWord?: string) => {
  return {
    search: searchWord,
    ordering: 'ratings_count',
    page_size: 9,
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
): Promise<Game[]> => {
  const params = getParams(categoryPath, searchWord);
  const { data } = await axios.get(BASE_URL, { params });
  const games: Game[] = data.results;
  return games;
};

export default getGamesByCategory;
