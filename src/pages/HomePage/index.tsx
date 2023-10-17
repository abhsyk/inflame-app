import { FC, useState } from 'react';
import { Layout } from '../../components/common';
import {
  Carousel,
  GamesList,
  SwitchTaglineCategory,
} from '../../components/games';
import { CategoryPath } from '../../types/Type';
import useGames from '../../hooks/useGames';
import { LoadingDots } from '../../components/ui';

const HomePage: FC = () => {
  const [currentTaglinePath, setCurrentTaglinePath] =
    useState<CategoryPath>('popular-games');
  const { games, isLoading } = useGames(currentTaglinePath);

  return (
    <Layout>
      <Carousel />
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
