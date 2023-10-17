export type Game = {
  id: number;
  title: string;
  image: string;
  release: string;
};

export type CategoryName = 'Popular' | 'New' | 'Upcoming';
export type CategoryPath = 'popular-games' | 'new-games' | 'upcoming-games';
