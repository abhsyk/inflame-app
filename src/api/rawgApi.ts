export const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
export const BASE_URL = `https://api.rawg.io/api/games`;

const getCurrentMonth = (): number => {
  const month = new Date().getMonth() + 1;
  if (month < 10) return Number(`0${month}`);
  else return month;
};

const getCurrentDay = (): number => {
  const day = new Date().getDate();
  if (day < 10) return Number(`0${day}`);
  else return day;
};

const currentYear = new Date().getFullYear();
const currentMonth = getCurrentMonth();
const currentDay = getCurrentDay();
export const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
export const lastYear = `${currentYear - 1}-${currentMonth}-${currentDay}`;
export const nextYear = `${currentYear + 1}-${currentMonth}-${currentDay}`;

export const gameDetailURL = (slug: string) => `${BASE_URL}/${slug}`;

export const gameScreenshotURL = (slug: string) =>
  `${BASE_URL}/${slug}/screenshots`;

export const searchGameURL = (searchWord: string, page: number) =>
  `${BASE_URL}?search=${searchWord}&ordering=-rating&page=${page}&page_size=12`;
