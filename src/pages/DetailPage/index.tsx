import { FC, useCallback, useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import getGameDetail from '../../utils/getGameDetail';
import type { Game } from '../../types';
import { Layout } from '../../components/common';
import { LinkIcon } from '../../components/ui';
import {
  BackgroundImage,
  Banner,
  Screenshots,
  DetailHeadings,
  SeriesCarousel,
  Trailers,
  DetailPageSkeleton,
} from '../../components/gameDetail';
import useGameSeries from '../../hooks/useGameSeries';
import useGameMovies from '../../hooks/useGameMovies';

const DetailPage: FC = () => {
  const [game, setGame] = useState<Game>();
  const params = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { series } = useGameSeries(game?.slug);
  const { movies } = useGameMovies(game?.slug);

  const handleGetGameDetail = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getGameDetail(params.id!);
      setGame(data);
    } finally {
      setIsLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    if (params.id) handleGetGameDetail();
  }, [params.id, handleGetGameDetail]);

  return (
    <Layout>
      {!game && isLoading ? (
        <DetailPageSkeleton />
      ) : (
        <Container>
          <motion.div
            className="detail"
            variants={variants}
            initial="hidden"
            animate="show"
          >
            <DetailHeadings game={game} />
            <Banner image={game?.background_image} name={game?.name} />
            {game?.description ? (
              <p
                className="description"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(game.description) }}
              />
            ) : null}
            <Screenshots screenshots={game?.screenshots} />
            <Trailers movies={movies} />
            {game?.website ? (
              <div className="link">
                <LinkIcon />
                <a href={game?.website}> {game?.website} </a>
              </div>
            ) : null}
            <SeriesCarousel games={series} />
          </motion.div>
          <BackgroundImage image={game?.background_image} />
        </Container>
      )}
    </Layout>
  );
};

const Container = styled.section`
  position: relative;
  min-height: 100vh;
  z-index: 10;

  .detail {
    max-width: 120rem;
    margin: 0 auto;
    padding: 3rem 2rem;
    display: flex;
    flex-direction: column;

    @media (max-width: 600px) {
      padding: 2rem 1.6rem;
    }
  }

  .description {
    font-family: var(--font-secondary);
    background-color: rgba(35, 35, 35, 0.7);
    font-size: 1.6rem;
    line-height: 1.8;
    color: #efefef;
    padding: 4rem 6rem;

    @media (max-width: 800px) {
      padding: 3rem 2.4rem;
      font-size: 1.5rem;
    }

    @media (max-width: 600px) {
      padding: 2rem 1.6rem;
      font-size: 1.4rem;
    }

    p {
      margin-bottom: 1.6rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
    /* border-left: 0.1rem solid rgba(255, 255, 255, 0.3);
    border-right: 0.1rem solid rgba(255, 255, 255, 0.3); */
    /* text-indent: 1rem; */
  }

  .link {
    display: flex;
    gap: 0.5rem;
    justify-content: start;
    margin-top: 3rem;

    svg {
      font-size: 2rem;
      color: var(--color-white);
    }

    a {
      color: #efefef;
      font-size: 1.4rem;
    }
  }
`;

const variants = {
  hidden: { opacity: 0, y: 250 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default DetailPage;
