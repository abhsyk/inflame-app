import { FC, useCallback, useEffect, useState } from 'react';
import { Layout } from '../../components/common';
import { LinkIcon, LoadingDots } from '../../components/ui';
import { useParams } from 'react-router-dom';
import getGameDetail from '../../utils/getGameDetail';
import { Game } from '../../types';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  BackgroundImage,
  Banner,
  Screenshots,
} from '../../components/gameDetail';
import DetailHeadings from '../../components/gameDetail/detailHeadings/DetailHeadings';

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

  return (
    <Layout>
      {!game && isLoading ? (
        <LoadingDots />
      ) : (
        <Container>
          <motion.div
            className="detail"
            variants={detailAnim}
            initial="hidden"
            animate="show"
          >
            <DetailHeadings game={game} />
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
    padding-top: 3rem;
    display: flex;
    flex-direction: column;
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
