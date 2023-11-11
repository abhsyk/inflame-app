import { FC, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import getGameDetail from '../../utils/getGameDetail';
import type { Game } from '../../types';
import { Layout } from '../../components/common';
import { BookmarkBtn, LinkIcon, LoadingDots } from '../../components/ui';
import {
  BackgroundImage,
  Banner,
  Screenshots,
  DetailHeadings,
} from '../../components/gameDetail';
import useGamesContext from '../../hooks/useGamesContext';

const DetailPage: FC = () => {
  const [game, setGame] = useState<Game>();
  const params = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isLoggedIn } = useGamesContext();

  const handleGetGameDetail = useCallback(async () => {
    setIsLoading(true);
    const data = await getGameDetail(params.id!);
    console.log(data);

    setGame(data);
    setIsLoading(false);
  }, [params.id]);

  useEffect(() => {
    if (params.id) handleGetGameDetail();
  }, [params.id, handleGetGameDetail]);

  return (
    <Layout>
      {!game && isLoading ? (
        <LoadingDots />
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
                dangerouslySetInnerHTML={{ __html: game.description }}
              />
            ) : null}
            <Screenshots screenshots={game?.screenshots} />
            {game?.website ? (
              <div className="link">
                <LinkIcon />
                <a href={game?.website}> {game?.website} </a>
              </div>
            ) : null}
          </motion.div>
          <BackgroundImage image={game?.background_image} />
          {isLoggedIn && game ? <BookmarkBtn game={game} isDetail /> : null}
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
    padding: 3rem 0;
    display: flex;
    flex-direction: column;
  }

  .description {
    font-family: var(--font-secondary);
    /* column-count: 2; */
    /* column-gap: 3rem; */
    background-color: rgba(35, 35, 35, 0.7);
    font-size: 1.6rem;
    line-height: 1.8;
    color: #efefef;
    padding: 4rem 6rem;
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
