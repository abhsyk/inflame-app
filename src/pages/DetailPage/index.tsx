import { FC, useCallback, useEffect, useState } from 'react';
import { Layout } from '../../components/common';
import { LinkIcon, LoadingDots } from '../../components/ui';
import { useParams } from 'react-router-dom';
import getGameDetail from '../../utils/getGameDetail';
import { Game } from '../../types';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  Banner,
  Genres,
  Platforms,
  Publishers,
  RatingStars,
  Screenshots,
} from '../../components/gameDetail';

const DetailPage: FC = () => {
  const [game, setGame] = useState<Game>();
  const params = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGetGameDetail = useCallback(async () => {
    setIsLoading(true);
    const data = await getGameDetail(params.id!);
    setGame(data);
    setIsLoading(false);
  }, [params.id]);

  useEffect(() => {
    if (params.id) handleGetGameDetail();
  }, [params.id, handleGetGameDetail]);

  const dotDate = game?.released
    ? game?.released.replace(/-0|-/gi, '.')
    : game?.released;

  if (!game && isLoading) {
    return (
      <Layout>
        <LoadingDots />
      </Layout>
    );
  }

  return (
    <Layout>
      <Container>
        <motion.div
          className="detail"
          variants={detailAnim}
          initial="hidden"
          animate="show"
        >
          <div className="detail__top">
            <div className="detail__info">
              <h1 className="detail__heading">{game?.name}</h1>
              <div className="detail__second-row">
                <Publishers publishers={game?.publishers} />
                <Genres genres={game?.genres} />
                <RatingStars
                  rating={game?.rating}
                  ratingsCount={game?.ratings_count}
                />
              </div>
              <div className="detail__third-row">
                <p className="detail__release">
                  Release date:
                  <span> {game?.tba ? 'To be announced' : dotDate}</span>
                </p>
                <Platforms platforms={game?.platforms} />
              </div>
            </div>
          </div>
          <Banner image={game?.background_image} name={game?.name} />
          {game?.description_raw ? (
            <p className="description">{game?.description_raw}</p>
          ) : null}
          <Screenshots screenshots={game?.screenshots} />
          <div className="link">
            {game?.website ? (
              <>
                <LinkIcon />
                <a href="#"> {game?.website} </a>
              </>
            ) : null}
          </div>
        </motion.div>
        <div
          className="background"
          style={{
            background: `url(${game?.background_image}) center`,
            backgroundSize: 'cover',
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            zIndex: -10,
            filter: 'blur(5px)',
            opacity: '0.2',
          }}
        />
      </Container>
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
    padding-top: 3rem;
    display: flex;
    flex-direction: column;

    &__info {
      color: #efefef;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    &__heading {
      font-size: 4rem;
      font-weight: 400;
    }

    &__second-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
    }

    &__third-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__release {
      font-size: 1.4rem;

      span {
        font-weight: 600;
      }
    }
  }

  .description {
    font-family: var(--font-secondary);
    column-count: 2;
    column-gap: 3rem;
    background-color: rgba(35, 35, 35, 0.7);
    font-size: 1.6rem;
    line-height: 1.8;
    color: #efefef;
    padding: 3rem;
    border-left: 0.1rem solid rgba(255, 255, 255, 0.3);
    border-right: 0.1rem solid rgba(255, 255, 255, 0.3);
  }

  .link {
    display: flex;
    gap: 0.5rem;
    justify-content: start;
    margin: 3rem 0;

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

const detailAnim = {
  hidden: { opacity: 0, y: 250 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default DetailPage;
