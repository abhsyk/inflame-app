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
import { AnimatePresence, motion } from 'framer-motion';

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
  }, [params.id]);

  const dotDate = game?.released
    ? game?.released.replace(/-0|-/gi, '.')
    : game?.released;

  if (isLoading) {
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
          className="details"
          variants={detailAnim}
          initial="hidden"
          animate="show"
        >
          <div className="details__top">
            <div className="details__info">
              <h1 className="details__heading">{game?.name}</h1>
              <p className="details__release">
                Release date:
                <span> {game?.tba ? 'To be announced' : dotDate}</span>
              </p>
            </div>
            <div className="details__icons">
              <div className="stars">
                <StarFullIcon />
                <StarFullIcon />
                <StarFullIcon />
                <StarFullIcon />
                <StarHalfIcon />
                <span>( {game?.ratings_count} )</span>
              </div>
              <div className="console">
                <img
                  src="src/assets/images/game-console-icon.svg"
                  alt="Game console"
                />
                <img
                  src="src/assets/images/game-console-icon.svg"
                  alt="Game console"
                />
              </div>
            </div>
          </div>

          <div className="banner">
            <img src={game?.background_image} alt={game?.name} />
          </div>

          <p className="description">{game?.description_raw}</p>

          <motion.div
            className="screenshot__wrapper"
            // variants={screenshotsAnim}
            // initial="hidden"
            // animate="show"
          >
            <AnimatePresence>
              {game?.screenshots.map((s) => (
                <motion.img key={s.id} src={s.image} variants={imgAnim} />
              ))}
            </AnimatePresence>
          </motion.div>

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
          style={{
            background: `url(${game?.background_image}) center`,
            backgroundSize: 'cover',
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            zIndex: -10,
          }}
        />
      </Container>
    </Layout>
  );
};

const Container = styled.section`
  position: relative;

  &::after {
    content: attr(data-content);
    background: url(attr(data-content));
    background-size: 'cover';
    width: 100%;
    min-height: 100vh;
  }

  .details {
    max-width: 120rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }

  .details__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 3rem;
  }

  .details__info {
    color: #efefef;
  }

  .details__heading {
    font-size: 4rem;
    font-weight: 400;
  }

  .details__release {
    font-size: 1.4rem;

    span {
      font-weight: 600;
    }
  }

  .details__icons {
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 1rem;
  }

  .stars {
    display: flex;
    padding: 0.5rem 1.2rem;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 3rem;

    svg {
      font-size: 3rem;
      color: rgba(215, 27, 174, 0.9);
    }

    span {
      font-size: 2rem;
      color: #ddd;
      margin-left: 1rem;
    }
  }

  .console {
    align-self: flex-end;
    display: flex;
    gap: 1.5rem;
  }

  .banner {
    width: 100%;
    height: 48rem;
    margin-top: 1rem;
    overflow: hidden;
    border: 0.1rem solid rgba(255, 255, 255, 0.3);

    img {
      width: 100%;
      object-fit: cover;
    }
  }

  .description {
    font-family: var(--font-secondary);
    column-count: 2;
    column-gap: 3rem;
    background-color: #232323;
    font-size: 1.6rem;
    line-height: 1.8;
    color: #efefef;
    padding: 3rem;
  }

  .screenshot__wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(40rem, 1fr));
    box-shadow: 0 0.4rem 1rem rgba(0, 0, 0, 0.25);

    & img {
      width: 100%;
      height: 28.5rem;
      object-fit: cover;
      border: 0.1rem solid rgba(255, 255, 255, 0.3);
      transition: all 0.2s;

      &:hover {
        transform: scale(1.1);
        border: 0.1rem solid rgba(255, 255, 255, 0.7);
      }
    }
  }

  .link {
    display: flex;
    gap: 0.5rem;
    justify-content: end;
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
  hidden: { opacity: 0, y: 300 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

// const screenshotsAnim = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     transition: { delayChildren: 0, staggerChildren: 0.1 },
//   },
// };

const imgAnim = {
  hidden: { scale: 0.9 },
  show: {
    scale: 1,
    transition: { duration: 0.2 },
  },
};

export default DetailPage;
