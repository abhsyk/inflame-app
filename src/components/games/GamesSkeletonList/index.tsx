import { FC } from 'react';
import styled from 'styled-components';
import GameItemSkeleton from '../GameItemSkeleton';

type Props = { count?: number };

const GamesSkeletonList: FC<Props> = ({ count = 6 }) => (
  <StyledList>
    {Array.from({ length: count }, (_, i) => (
      <GameItemSkeleton key={i} />
    ))}
  </StyledList>
);

const StyledList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, 37.3rem);
  gap: 2rem;
  margin-top: 1rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fit, minmax(37.3rem, 1fr));
  }

  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`;

export default GamesSkeletonList;
