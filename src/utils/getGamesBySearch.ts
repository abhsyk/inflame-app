import { API_KEY } from '../api';
import { ApiResponse } from '../types';
import { server } from './server';

const params = { page_size: String(9), key: API_KEY };
const searchGamesParams = (searchWord: string) => {
  return {
    search: searchWord,
    ordering: 'ratings_count',
    ...params,
  };
};

const getGamesBySearch = async (searchWord: string): Promise<ApiResponse> => {
  const params = searchGamesParams(searchWord);
  console.log(params);
  const { data } = await server<ApiResponse>({ params });
  // const res = await fetch(`${BASE_URL}?${new URLSearchParams(params)}`);
  // const data: ApiResponse = await res.json();

  return data;
};

export default getGamesBySearch;
