import { FC } from 'react';
import styled, { css, keyframes } from 'styled-components';

const shimmer = keyframes`
  0% { background-position: -800px 0; }
  100% { background-position: 800px 0; }
`;

const shimmerBg = css`
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.04) 0%,
    rgba(255, 255, 255, 0.12) 50%,
    rgba(255, 255, 255, 0.04) 100%
  );
  background-size: 800px 100%;
  animation: ${shimmer} 1.4s infinite linear;
`;

const GameItemSkeleton: FC = () => (
  <StyledSkeleton>
    <ImageArea />
    <InfoArea>
      <Line width="75%" height="2rem" />
      <Line width="50%" height="1.3rem" />
      <Line width="40%" height="1.6rem" />
    </InfoArea>
  </StyledSkeleton>
);

const StyledSkeleton = styled.li`
  list-style: none;
  width: 37.3rem;
  height: 37.6rem;
  border-radius: 1rem;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0.4rem 1rem rgba(0, 0, 0, 0.25);
  justify-self: center;
  display: flex;
  flex-direction: column;

  @media (max-width: 1200px) {
    width: 100%;
  }

  @media (max-width: 800px) {
    height: 25rem;
  }
`;

const ImageArea = styled.div`
  width: 100%;
  flex: 0 0 23.6rem;
  ${shimmerBg}

  @media (max-width: 800px) {
    flex: 0 0 16rem;
  }
`;

const InfoArea = styled.div`
  flex: 1;
  padding: 1rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: rgba(255, 255, 255, 0.05);
`;

const Line = styled.div<{ width?: string; height?: string }>`
  border-radius: 0.4rem;
  width: ${({ width }) => width ?? '100%'};
  height: ${({ height }) => height ?? '1.6rem'};
  ${shimmerBg}
`;

export default GameItemSkeleton;
