import { API_KEY, BASE_URL } from '../api';
import { Game } from '../types';

const fetchUrls = {
  detail: `?${new URLSearchParams({ key: API_KEY })}`,
  screenshots: `/screenshots?${new URLSearchParams({ key: API_KEY })}`,
  stores: `/stores?${new URLSearchParams({ key: API_KEY })}`,
};

const getGameDetail = async (gameId: string): Promise<Game> => {
  const responses = Object.entries(fetchUrls).map(async ([key, url]) => {
    try {
      const res = await fetch(`${BASE_URL}/${gameId}${url}`);
      const data = await res.json();
      return { key, data };
    } catch (error) {
      console.log(error);
    }
  });

  return Promise.all(responses).then((results) => {
    const fetchResults = { ...results[0]?.data, ...results[1]?.data, ...results[2]?.data };
    fetchResults['screenshots'] = results[1]?.data['results'];
    fetchResults['stores'] = results[2]?.data['results'];
    delete fetchResults['results'];

    return fetchResults;
  });
};

export default getGameDetail;
