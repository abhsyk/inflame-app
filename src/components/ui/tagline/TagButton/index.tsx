import { FC, PropsWithChildren } from 'react';
import { CategoryName, CategoryPath } from '../../../../types/Game';
import { getCategoryName } from '../../../../utils/getCategoryName';

type Props = {
  categoryPathName: CategoryPath;
  currentTaglinePath: CategoryPath;
  onTagChange: (categoryPathName: CategoryPath) => void;
};

const TagButton: FC<PropsWithChildren<Props>> = ({
  categoryPathName,
  currentTaglinePath,
  onTagChange,
}) => {
  const categoryName: CategoryName = getCategoryName(categoryPathName)!;

  return (
    <button
      className={`${categoryPathName === currentTaglinePath ? 'active' : ''}`}
      onClick={() => onTagChange(categoryPathName)}
    >
      {categoryName}
    </button>
  );
};

export default TagButton;
