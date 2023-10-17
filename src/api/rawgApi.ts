const BASE_URL = 'https://api.rawg.io/api/games';
const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

const getCurrentMonth = () => {
  const month = new Date().getMonth() + 1;
  if (month < 10) {
    return `0${month}`;
  } else {
    return month;
  }
};

const getCurrentDay = () => {
  const day = new Date().getDate();
  if (day < 10) {
    return `0${day}`;
  } else {
    return day;
  }
};

const currentYear = new Date().getFullYear();
const currentMonth = getCurrentMonth();
const currentDay = getCurrentDay();
const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
const lastYear = `${currentYear - 1}-${currentMonth}-${currentDay}`;
const nextYear = `${currentYear + 1}-${currentMonth}-${currentDay}`;

export const popularGamesURL = (page: number = 1) =>
  `${BASE_URL}?key=${API_KEY}&dates=${lastYear},${currentDate}&ordering=-rating&page=${page}&page_size=9`;
export const upcomingGamesURL = (page: number = 1) =>
  `${BASE_URL}?key=${API_KEY}&dates=${currentDate},${nextYear}&ordering=-added&page=${page}&page_size=9`;
export const newGamesURL = (page: number = 1) =>
  `${BASE_URL}?key=${API_KEY}&dates=${currentDate},${nextYear}&ordering=released&page=${page}&page_size=9`;

export const gameDetailURL = (slug: string) =>
  `${BASE_URL}/${slug}?key=${API_KEY}`;

export const gameScreenshotURL = (slug: string) =>
  `${BASE_URL}/${slug}/screenshots?key=${API_KEY}`;

export const searchGameURL = (searchWord: string, page: number) =>
  `${BASE_URL}?search=${searchWord}&ordering=-rating&page=${page}&page_size=12&key=${API_KEY}`;
