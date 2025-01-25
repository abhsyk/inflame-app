import { FC } from 'react';
import styled from 'styled-components';

type Props = { center?: boolean; size?: number };

const LoadingDots: FC<Props> = ({ center = false, size = 10 }) => {
  const customStyle = { width: size, height: size };
  return (
    <Container
      style={
        center
          ? { minHeight: 'unset', gap: size * 1.2 }
          : { gap: size * 1.2, margin: '2rem 0 1rem' }
      }
    >
      <div className="dot dot-1" style={customStyle}></div>
      <div className="dot dot-2" style={customStyle}></div>
      <div className="dot dot-3" style={customStyle}></div>
    </Container>
  );
};

const Container = styled.div`
  /* min-height: calc(100vh - 18rem); */
  display: flex;
  justify-content: center;

  .dot {
    background-color: var(--color-white);
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
