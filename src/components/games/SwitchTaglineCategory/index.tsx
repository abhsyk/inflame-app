import { FC, useState } from 'react';
import { TagButton } from '../../ui';
import { CategoryPath } from '../../../types/Type';
import { Link } from 'react-router-dom';

const SwitchTaglineCategory: FC = () => {
  const [currentTaglinePath, setCurrentTaglinePath] =
    useState<CategoryPath>('popular-games');

  return (
    <div className="games__text">
      <div className="games__tagline">
        <TagButton
          categoryPathName="popular-games"
          currentTaglinePath={currentTaglinePath}
          onTagChange={setCurrentTaglinePath}
        />
        <TagButton
          categoryPathName="new-games"
          currentTaglinePath={currentTaglinePath}
          onTagChange={setCurrentTaglinePath}
        />
        <TagButton
          categoryPathName="upcoming-games"
          currentTaglinePath={currentTaglinePath}
          onTagChange={setCurrentTaglinePath}
        />
      </div>
      <Link to={currentTaglinePath}>View more</Link>
    </div>
  );
};

export default SwitchTaglineCategory;
