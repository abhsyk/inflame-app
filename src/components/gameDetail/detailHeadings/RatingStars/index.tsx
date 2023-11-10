import { FC } from 'react';
import { Game } from '../../../../types';
import { StarFullIcon, StarHalfIcon } from '../../../ui';
import styled from 'styled-components';

type Props = {
  rating: Game['rating'] | undefined;
  ratingsCount: Game['ratings_count'] | undefined;
};

const RatingStars: FC<Props> = ({ rating, ratingsCount }) => {
  return (
    <>
      {rating ? (
        <Container>
          {getStars(rating).map((s, i) =>
            s === 'full' ? <StarFullIcon key={i} /> : <StarHalfIcon key={i} />
          )}
          <span>( {ratingsCount} )</span>
        </Container>
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

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1.2rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 3rem;

  svg {
    font-size: 2rem;
    color: rgba(215, 27, 174, 0.9);
  }

  span {
    font-family: var(--font-secondary);
    font-size: 1.6rem;
    color: #ddd;
    margin-left: 1rem;
  }
`;

export default RatingStars;
