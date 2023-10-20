import { FC } from 'react';
import { TagButton } from '../../ui';
import { CategoryPath } from '../../../types/Game';
import { Link } from 'react-router-dom';

type Props = {
  currentTaglinePath: CategoryPath;
  onTagChange: (categoryPathName: CategoryPath) => void;
};

const SwitchTaglineCategory: FC<Props> = ({
  currentTaglinePath,
  onTagChange,
}) => {
  return (
    <div className="games__text">
      <div className="games__tagline">
        <TagButton
          categoryPathName="popular-games"
          currentTaglinePath={currentTaglinePath}
          onTagChange={onTagChange}
        />
        <TagButton
          categoryPathName="new-games"
          currentTaglinePath={currentTaglinePath}
          onTagChange={onTagChange}
        />
        <TagButton
          categoryPathName="upcoming-games"
          currentTaglinePath={currentTaglinePath}
          onTagChange={onTagChange}
        />
      </div>
      <Link to={currentTaglinePath}>View more</Link>
    </div>
  );
};

export default SwitchTaglineCategory;
