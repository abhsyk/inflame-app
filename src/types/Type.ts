export type Game = {
  id: number;
  slug: string;
  name: string;
  rating: number;
  ratings_count: number;
  background_image: string;
  released: string;
  tba: boolean;
  description_raw: string;
  screenshots: {
    id: number;
    image: string;
  }[];
  website: string;
};

export type CategoryName = 'Popular' | 'New' | 'Upcoming';
export type CategoryPath =
  | 'popular-games'
  | 'new-games'
  | 'upcoming-games'
  | 'search';

export interface ApiFetcherOptions {
  params?: {
    page_size: string;
    dates?: string;
    ordering: string;
    search?: string;
  };
  url?: string;
}

export interface ApiFetcherResults<T> {
  data: T;
}

export interface ApiResponse {
  count: number;
  next: string;
  previous: string | null;
  results: Game[];
}
