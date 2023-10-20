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
      <section className="games">
        <SwitchTaglineCategory
          currentTaglinePath={currentTaglinePath}
          onTagChange={setCurrentTaglinePath}
        />
        {!!games && games.length > 0 ? (
          <GamesList games={games.slice(0, 6)} />
        ) : null}
        {isLoading && <LoadingDots />}
      </section>
    </Layout>
  );
};

export default HomePage;
