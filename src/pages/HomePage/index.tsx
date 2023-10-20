import { FC, useState } from 'react';
import { Layout } from '../../components/common';
import {
  Carousel,
  GamesList,
  SwitchTaglineCategory,
} from '../../components/games';
import { CategoryPath } from '../../types/Game';
import useGames from '../../hooks/useGames';
import { LoadingDots } from '../../components/ui';
import { motion } from 'framer-motion';

const HomePage: FC = () => {
  const [currentTaglinePath, setCurrentTaglinePath] =
    useState<CategoryPath>('popular-games');
  const { games, isLoading } = useGames(currentTaglinePath);
  const { games: carouselGames, isLoading: isCarouselLoading } =
    useGames('popular-games');

  if (isCarouselLoading) {
    return (
      <Layout>
        <LoadingDots />
      </Layout>
    );
  }

  return (
    <Layout>
      <Carousel games={carouselGames} />
      <motion.section
        className="games"
        variants={variants}
        initial="hidden"
        animate="show"
      >
        <SwitchTaglineCategory
          currentTaglinePath={currentTaglinePath}
          onTagChange={setCurrentTaglinePath}
        />
        {!!games && games.length > 0 ? (
          <GamesList games={games.slice(0, 6)} />
        ) : null}
        {isLoading && <LoadingDots />}
      </motion.section>
    </Layout>
  );
};

const variants = {
  hidden: { y: 200, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.6 } },
};

export default HomePage;
