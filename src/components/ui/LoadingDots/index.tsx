import { FC } from 'react';
import styled from 'styled-components';

type Props = { center?: boolean };

const LoadingDots: FC<Props> = ({ center = false }) => {
  return (
    <Container style={center ? { minHeight: 'unset' } : {}}>
      <div className="dot dot-1"></div>
      <div className="dot dot-2"></div>
      <div className="dot dot-3"></div>
    </Container>
  );
};

const Container = styled.div`
  min-height: calc(100vh - 18rem);
  display: flex;
  justify-content: center;
  margin: 2rem 0 1rem;

  .dot {
    width: 1.2rem;
    height: 1.2rem;
    background-color: var(--color-white);
    margin-left: 1rem;
    border-radius: 50%;
    animation: pulse 1s linear infinite;
  }

  .dot-1 {
    animation-delay: 0.2s;
  }

  .dot-2 {
    animation-delay: 0.4s;
  }

  .dot-3 {
    animation-delay: 0.6s;
  }

  @keyframes pulse {
    0%,
    100% {
      transform: scale(0.5);
    }
    50% {
      transform: scale(1);
    }
  }
`;

export default LoadingDots;
