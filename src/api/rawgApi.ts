export const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
export const BASE_URL = `https://api.rawg.io/api/games`;
export const GENRES_URL = `https://api.rawg.io/api/genres`;
export const PLATFORMS_URL = `https://api.rawg.io/api/platforms`;

const getCurrentMonth = (): string => {
  const month = new Date().getMonth() + 1;
  if (month < 10) return `0${month}`;
  else return String(month);
};

const getCurrentDay = (): string => {
  const day = new Date().getDate();
  if (day < 10) return `0${day}`;
  else return String(day);
};

const currentYear = new Date().getFullYear();
const currentMonth = getCurrentMonth();
const currentDay = getCurrentDay();
export const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
export const lastYear = `${currentYear - 1}-${currentMonth}-${currentDay}`;
export const nextYear = `${currentYear + 1}-${currentMonth}-${currentDay}`;

const threeMonthsAgoDate = new Date();
threeMonthsAgoDate.setMonth(threeMonthsAgoDate.getMonth() - 3);
const tmaYear = threeMonthsAgoDate.getFullYear();
const tmaMonth = String(threeMonthsAgoDate.getMonth() + 1).padStart(2, '0');
const tmaDay = String(threeMonthsAgoDate.getDate()).padStart(2, '0');
export const lastThreeMonths = `${tmaYear}-${tmaMonth}-${tmaDay}`;

const thirtyDaysAgoDate = new Date();
thirtyDaysAgoDate.setDate(thirtyDaysAgoDate.getDate() - 30);
const tdaYear = thirtyDaysAgoDate.getFullYear();
const tdaMonth = String(thirtyDaysAgoDate.getMonth() + 1).padStart(2, '0');
const tdaDay = String(thirtyDaysAgoDate.getDate()).padStart(2, '0');
export const lastThirtyDays = `${tdaYear}-${tdaMonth}-${tdaDay}`;

export const gameDetailURL = (slug: string) => `${BASE_URL}/${slug}`;

export const gameScreenshotURL = (slug: string) =>
  `${BASE_URL}/${slug}/screenshots`;

export const gameSeriesURL = (slug: string) =>
  `${BASE_URL}/${slug}/game-series`;

export const gameMoviesURL = (slug: string) =>
  `${BASE_URL}/${slug}/movies`;

export const searchGameURL = (searchWord: string, page: number) =>
  `${BASE_URL}?search=${searchWord}&ordering=-rating&page=${page}&page_size=12`;
