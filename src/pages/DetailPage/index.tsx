import { FC, useCallback, useEffect, useState } from 'react';
import { Layout } from '../../components/common';
import {
  LinkIcon,
  LoadingDots,
  StarFullIcon,
  StarHalfIcon,
} from '../../components/ui';
import { useParams } from 'react-router-dom';
import getGameDetail from '../../utils/getGameDetail';
import { Game } from '../../types';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { smallImage } from '../../utils/smallImage';
import NotFoundImage from '../../assets/images/not-found.jpg';
import { Publishers } from '../../components/gameDetail';

const getStars = (rating: number) => {
  const stars = [];
  const fullStar = Math.floor(rating);
  const halfStar = fullStar < rating;

  for (let i = 1; i <= fullStar; i++) {
    stars.push('full');
  }
  if (halfStar) {
    stars.push('half');
  }

  return stars;
};

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
                <div className="genre">
                  {game?.genres.map((g) => (
                    <p key={g.id}>{g.name}</p>
                  ))}
                </div>

                {game?.rating ? (
                  <div className="stars">
                    {getStars(game.rating).map((s, i) =>
                      s === 'full' ? (
                        <StarFullIcon key={i} />
                      ) : (
                        <StarHalfIcon key={i} />
                      )
                    )}
                    <span>( {game?.ratings_count} )</span>
                  </div>
                ) : null}
              </div>
              <div className="detail__third-row">
                <p className="detail__release">
                  Release date:
                  <span> {game?.tba ? 'To be announced' : dotDate}</span>
                </p>
                <div className="platforms">
                  {game?.platforms
                    ? game?.platforms.map((p) => (
                        <p key={p.platform.id}>{p.platform.name}</p>
                      ))
                    : null}
                </div>
              </div>
            </div>
          </div>

          <div className="banner">
            {game?.background_image ? (
              <img
                src={smallImage(game?.background_image, 1280)}
                alt={game?.name}
              />
            ) : (
              <img src={NotFoundImage} alt={game?.name} className="not-found" />
            )}
          </div>

          {game?.description_raw ? (
            <p className="description">{game?.description_raw}</p>
          ) : null}

          <div className="screenshots__wrapper">
            {game?.screenshots.map((s) => (
              <motion.img
                key={s.id}
                src={s.image}
                variants={imgAnim}
                initial="hidden"
                animate="show"
              />
            ))}
          </div>

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

      .publisher {
        display: flex;
        padding: 0.1rem 1.8rem;
        margin: 0 1rem;
        background-color: #68fabd;
        transform: skewX(-45deg);
        gap: 1.5rem;

        p {
          font-size: 1.4rem;
          color: #222;
          transform: skewX(45deg);
          text-transform: uppercase;
          font-weight: 600;
        }
      }

      .genre {
        flex: 1;
        display: flex;
        gap: 0.5rem;

        p {
          border: 0.1rem solid #efefef;
          padding: 0.2rem 1rem;
          font-size: 1.2rem;
          border-radius: 1rem;
        }
      }

      .stars {
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
      }
    }
    &__third-row {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .platforms {
        display: flex;
        justify-self: end;
        gap: 0.5rem;

        p {
          font-size: 1.2rem;
          color: #222;
          padding: 0.2rem 1.2rem;
          background-color: var(--color-white);
          border-radius: 1rem;
        }
      }
    }

    &__release {
      font-size: 1.4rem;

      span {
        font-weight: 600;
      }
    }
  }

  .banner {
    width: 100%;
    max-height: 48rem;
    margin-top: 1rem;
    overflow: hidden;
    border: 0.1rem solid rgba(255, 255, 255, 0.3);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
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

  .screenshots__wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(40rem, 1fr));

    img {
      width: 100%;
      height: 28.5rem;
      object-fit: cover;
      filter: grayscale(0.7);
      border: 0.1rem solid rgba(255, 255, 255, 0.3);
      transition: all 0.2s;

      &:hover {
        transform: scale(1.1);
        border: 0.1rem solid rgba(255, 255, 255, 0.7);
        filter: grayscale(0);
      }
    }
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

const imgAnim = {
  hidden: { scale: 0.9 },
  show: {
    scale: 1,
    transition: { duration: 0.2 },
  },
};

export default DetailPage;
