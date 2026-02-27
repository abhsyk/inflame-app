import { CategoryName, CategoryPath } from '../types/Game';

export const getCategoryName = (
  categoryId: CategoryPath
): CategoryName | null => {
  switch (categoryId) {
    case 'top-rated':
      return 'Top Rated';
    case 'new-releases':
      return 'New Releases';
    case 'coming-soon':
      return 'Coming Soon';
    default:
      return null;
  }
};
