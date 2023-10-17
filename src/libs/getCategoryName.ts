import { CategoryName, CategoryPath } from '../types/Type';

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
