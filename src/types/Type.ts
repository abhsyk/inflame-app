export type Game = {
  id: number;
  slug: string;
  name: string;
  rating: number;
  ratings_count: number;
  background_image: string;
  released: string;
  tba: boolean;
};

export type CategoryName = 'Popular' | 'New' | 'Upcoming';
export type CategoryPath =
  | 'popular-games'
  | 'new-games'
  | 'upcoming-games'
  | 'search';
