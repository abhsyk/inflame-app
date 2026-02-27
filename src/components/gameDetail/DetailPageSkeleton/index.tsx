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

const DetailPageSkeleton: FC = () => (
  <Container>
    <Inner>
      {/* DetailHeadings */}
      <HeadingsArea>
        <TitleRow>
          <Block width="55%" height="4rem" />
          <Block width="3.6rem" height="3.6rem" radius="50%" />
        </TitleRow>
        <Row>
          <Block width="18rem" height="2rem" />
          <Block width="12rem" height="2rem" />
          <Block width="10rem" height="2rem" />
        </Row>
        <Row>
          <Block width="14rem" height="1.6rem" />
          <Block width="20rem" height="1.6rem" />
        </Row>
      </HeadingsArea>

      {/* Banner */}
      <BannerBlock />

      {/* Description */}
      <DescriptionArea>
        <Block width="100%" height="1.5rem" />
        <Block width="100%" height="1.5rem" />
        <Block width="100%" height="1.5rem" />
        <Block width="75%" height="1.5rem" />
      </DescriptionArea>

      {/* Screenshots */}
      <ScreenshotsGrid>
        <ScreenshotBlock />
        <ScreenshotBlock />
        <ScreenshotBlock />
      </ScreenshotsGrid>
    </Inner>
  </Container>
);

const Container = styled.section`
  position: relative;
  min-height: 100vh;
  z-index: 10;
`;

const Inner = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 600px) {
    padding: 2rem 1.6rem;
  }
`;

const Block = styled.div<{ width?: string; height?: string; radius?: string }>`
  border-radius: ${({ radius }) => radius ?? '0.4rem'};
  width: ${({ width }) => width ?? '100%'};
  height: ${({ height }) => height ?? '1.6rem'};
  flex-shrink: 0;
  ${shimmerBg}
`;

const HeadingsArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  flex-wrap: wrap;
`;

const BannerBlock = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 0.4rem;
  ${shimmerBg}
`;

const DescriptionArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 4rem 6rem;
  background-color: rgba(35, 35, 35, 0.7);

  @media (max-width: 800px) {
    padding: 3rem 2.4rem;
  }

  @media (max-width: 600px) {
    padding: 2rem 1.6rem;
  }
`;

const ScreenshotsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ScreenshotBlock = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  ${shimmerBg}
`;

export default DetailPageSkeleton;
