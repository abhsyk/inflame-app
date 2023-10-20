import { CategoryName, CategoryPath } from '../types/Game';

export const getCategoryName = (
  categoryId: CategoryPath
): CategoryName | null => {
  switch (categoryId) {
    case 'popular-games':
      return 'Popular';
    case 'new-games':
      return 'New';
    case 'upcoming-games':
      return 'Upcoming';
    default:
      return null;
  }
};
