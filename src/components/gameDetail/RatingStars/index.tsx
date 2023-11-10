import { FC } from 'react';
import { Game } from '../../../types';
import { StarFullIcon, StarHalfIcon } from '../../ui';

type Props = {
  rating: Game['rating'] | undefined;
  ratingsCount: Game['ratings_count'] | undefined;
};

const RatingStars: FC<Props> = ({ rating, ratingsCount }) => {
  return (
    <>
      {rating ? (
        <div className="stars">
          {getStars(rating).map((s, i) =>
            s === 'full' ? <StarFullIcon key={i} /> : <StarHalfIcon key={i} />
          )}
          <span>( {ratingsCount} )</span>
        </div>
      ) : null}
    </>
  );
};

const getStars = (rating: number) => {
  const fullStar = Math.floor(rating);
  const hasHalfStar = fullStar < rating;
  const fullStars = Array(fullStar).fill('full');
  const stars = hasHalfStar ? [...fullStars, 'half'] : fullStars;
  return stars;
};

export default RatingStars;
