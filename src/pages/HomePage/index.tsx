import { FC, useEffect, useState } from 'react';
import type { CategoryPath, Game } from '../../types';
import useGames from '../../hooks/useGames';
import { Layout } from '../../components/common';
import { Carousel, GamesList } from '../../components/games';
import { LoadingDots, SwitchTaglineCategory } from '../../components/ui';
import { Categories } from '../../styles/GlobalStyles';

const HomePage: FC = () => {
  const [currentTaglinePath, setCurrentTaglinePath] =
    useState<CategoryPath>('popular-games');
  const { games, isLoading } = useGames(currentTaglinePath);
  const [carouselGames, setCarouselGames] = useState<Game[]>([]);

  useEffect(() => {
    if (currentTaglinePath === 'popular-games' && games.length > 0) {
      setCarouselGames(games);
    }
  }, [games, currentTaglinePath]);

  if (carouselGames.length === 0 && isLoading) {
    return (
      <Layout>
        <LoadingDots />
      </Layout>
    );
  }

  return (
    <Layout>
      <Carousel games={carouselGames} />
      <Categories variants={variants} initial="hidden" animate="show">
        <SwitchTaglineCategory
          currentTaglinePath={currentTaglinePath}
          onTagChange={setCurrentTaglinePath}
        />
        {!!games && games.length > 0 ? (
          <GamesList games={games.slice(0, 6)} />
        ) : null}
        {isLoading && <LoadingDots />}
      </Categories>
    </Layout>
  );
};

const variants = {
  hidden: { y: 200, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.6 } },
};

export default HomePage;
